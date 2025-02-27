/*
  # Fix Authentication Setup

  1. Changes
    - Add policy existence checks
    - Ensure proper order of operations
    - Maintain existing functionality

  2. Security
    - Maintain RLS policies
    - Ensure proper access controls
*/

-- First drop existing trigger if it exists
DO $$ BEGIN
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS handle_new_user();

-- Recreate users table with proper auth reference
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  tenant text NOT NULL DEFAULT 'NBA',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notification_settings table
CREATE TABLE IF NOT EXISTS notification_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  email boolean DEFAULT false,
  sms boolean DEFAULT false,
  push boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and create new ones
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own data" ON users;
  DROP POLICY IF EXISTS "Users can update own data" ON users;
  DROP POLICY IF EXISTS "Users can read own notification settings" ON notification_settings;
  DROP POLICY IF EXISTS "Users can update own notification settings" ON notification_settings;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for notification_settings table
CREATE POLICY "Users can read own notification settings"
  ON notification_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notification settings"
  ON notification_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert into users table
  INSERT INTO public.users (id, email, name, tenant)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'tenant', 'NBA')
  );

  -- Insert default notification settings
  INSERT INTO public.notification_settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_notification_settings_user_id ON notification_settings(user_id);