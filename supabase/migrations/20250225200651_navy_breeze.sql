/*
  # Health Enterprise Schema Update

  1. New Tables
    - `health_insights`
      - Stores patient health trends and analytics
      - Supports real-time monitoring and alerts
    - `data_mappings`
      - Tracks data ingestion and mapping status
      - Supports VA data integration
    - `data_validation_logs`
      - Records data validation checks and results
      - Ensures data quality and accuracy
    - `integration_status`
      - Monitors integration status with external systems
      - Tracks data synchronization

  2. Security
    - Enable RLS on all new tables
    - Add policies for VA personnel and healthcare providers
    - Ensure HIPAA compliance in data access

  3. Changes
    - Add data mapping status tracking
    - Add integration monitoring capabilities
    - Add health insights aggregation
*/

-- Health Insights Table
CREATE TABLE IF NOT EXISTS health_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  metric_name text NOT NULL,
  metric_value jsonb NOT NULL,
  trend_data jsonb,
  alert_threshold jsonb,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Data Mappings Table
CREATE TABLE IF NOT EXISTS data_mappings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  veteran_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  source_system text NOT NULL,
  data_type text NOT NULL,
  mapping_status text NOT NULL,
  last_sync timestamptz,
  error_details text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Data Validation Logs
CREATE TABLE IF NOT EXISTS data_validation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mapping_id uuid REFERENCES data_mappings(id) ON DELETE CASCADE,
  validation_type text NOT NULL,
  status text NOT NULL,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Integration Status
CREATE TABLE IF NOT EXISTS integration_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  system_name text NOT NULL,
  status text NOT NULL,
  last_sync_attempt timestamptz,
  next_sync_scheduled timestamptz,
  error_log jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE health_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_validation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_status ENABLE ROW LEVEL SECURITY;

-- Health Insights Policies
CREATE POLICY "Users can view own health insights"
  ON health_insights
  FOR SELECT
  TO authenticated
  USING (auth.uid() = patient_id);

CREATE POLICY "Healthcare providers can view assigned patient insights"
  ON health_insights
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_providers
      WHERE user_id = patient_id
      AND provider_id = auth.uid()
      AND access_status = 'granted'
    )
  );

-- Data Mappings Policies
CREATE POLICY "Veterans can view own data mappings"
  ON data_mappings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = veteran_id);

CREATE POLICY "VA personnel can view all data mappings"
  ON data_mappings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'va_personnel'
    )
  );

-- Data Validation Logs Policies
CREATE POLICY "VA personnel can view validation logs"
  ON data_validation_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'va_personnel'
    )
  );

-- Integration Status Policies
CREATE POLICY "VA personnel can view integration status"
  ON integration_status
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'va_personnel'
    )
  );

-- Indexes for Performance
CREATE INDEX idx_health_insights_patient ON health_insights(patient_id);
CREATE INDEX idx_data_mappings_veteran ON data_mappings(veteran_id);
CREATE INDEX idx_data_validation_mapping ON data_validation_logs(mapping_id);
CREATE INDEX idx_integration_status_system ON integration_status(system_name);

-- Functions for Health Insights
CREATE OR REPLACE FUNCTION check_health_alerts()
RETURNS trigger
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if new metric value exceeds threshold
  IF (NEW.metric_value->>'value')::numeric > (NEW.alert_threshold->>'max')::numeric THEN
    INSERT INTO notifications (user_id, title, message, type)
    VALUES (
      NEW.patient_id,
      'Health Alert',
      format('Metric %s has exceeded threshold', NEW.metric_name),
      'alert'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger for Health Alerts
CREATE TRIGGER health_insights_alert
  AFTER INSERT OR UPDATE ON health_insights
  FOR EACH ROW
  EXECUTE FUNCTION check_health_alerts();