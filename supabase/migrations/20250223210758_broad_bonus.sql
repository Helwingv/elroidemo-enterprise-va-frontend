/*
  # Health Records and Related Tables Schema

  1. New Tables
    - `providers`
      - Stores healthcare provider information
    - `health_records`
      - Stores patient health records and vital signs
    - `appointments`
      - Manages medical appointments
    - `user_providers`
      - Junction table for user-provider relationships
    - `marketplace_items`
      - Stores items available in the marketplace
    - `user_marketplace_items`
      - Junction table for user-marketplace item relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for public provider and marketplace item viewing
*/

-- Providers Table (Create this first as it's referenced by other tables)
CREATE TABLE IF NOT EXISTS providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  logo_url text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Health Records Table
CREATE TABLE IF NOT EXISTS health_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  record_type text NOT NULL,
  value text NOT NULL,
  status text,
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id uuid REFERENCES providers(id),
  title text NOT NULL,
  description text,
  appointment_date timestamptz NOT NULL,
  status text DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User-Provider Relationship Table
CREATE TABLE IF NOT EXISTS user_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  access_status text DEFAULT 'granted',
  data_types jsonb DEFAULT '[]',
  last_sync timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, provider_id)
);

-- Marketplace Items Table
CREATE TABLE IF NOT EXISTS marketplace_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  duration text NOT NULL,
  image_url text,
  partner_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User-Marketplace Items Relationship Table
CREATE TABLE IF NOT EXISTS user_marketplace_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id uuid REFERENCES marketplace_items(id) ON DELETE CASCADE,
  purchase_date timestamptz DEFAULT now(),
  expiry_date timestamptz,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_id)
);

-- Enable Row Level Security
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_marketplace_items ENABLE ROW LEVEL SECURITY;

-- Health Records Policies
CREATE POLICY "Users can view their own health records"
  ON health_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health records"
  ON health_records
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health records"
  ON health_records
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Appointments Policies
CREATE POLICY "Users can view their own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Providers Policies
CREATE POLICY "Anyone can view providers"
  ON providers
  FOR SELECT
  TO authenticated
  USING (true);

-- User-Providers Policies
CREATE POLICY "Users can view their provider relationships"
  ON user_providers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their provider relationships"
  ON user_providers
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Marketplace Items Policies
CREATE POLICY "Anyone can view marketplace items"
  ON marketplace_items
  FOR SELECT
  TO authenticated
  USING (true);

-- User-Marketplace Items Policies
CREATE POLICY "Users can view their marketplace purchases"
  ON user_marketplace_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their marketplace purchases"
  ON user_marketplace_items
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);