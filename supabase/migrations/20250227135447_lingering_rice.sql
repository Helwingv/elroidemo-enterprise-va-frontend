/*
  # Create User Provider Consent table

  1. New Tables
    - `user_provider_consent`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `provider_id` (uuid)
      - `is_authorized` (boolean)
      - `authorized_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `user_provider_consent` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS user_provider_consent (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  provider_id uuid NOT NULL,
  is_authorized boolean NOT NULL DEFAULT false,
  authorized_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_provider_consent ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own consent data"
  ON user_provider_consent
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own consent data"
  ON user_provider_consent
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own consent data"
  ON user_provider_consent
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to set authorized_at when is_authorized changes to true
CREATE OR REPLACE FUNCTION set_authorized_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_authorized = true AND (OLD.is_authorized = false OR OLD.is_authorized IS NULL) THEN
    NEW.authorized_at = NOW();
  END IF;
  
  NEW.updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before insert or update
CREATE TRIGGER update_consent_authorized_at
BEFORE INSERT OR UPDATE ON user_provider_consent
FOR EACH ROW
EXECUTE FUNCTION set_authorized_at();