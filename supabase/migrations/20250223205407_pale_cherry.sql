/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Maps to Supabase auth.users
      - `email` (text, unique)
      - `name` (text)
      - `phone` (text, nullable)
      - `tenant` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `notification_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `email` (boolean)
      - `sms` (boolean)
      - `push` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read their own data
      - Update their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  tenant text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_auth_user FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Create notification_settings table
CREATE TABLE IF NOT EXISTS notification_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email boolean DEFAULT false,
  sms boolean DEFAULT false,
  push boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

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
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, name, tenant)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name', 
    COALESCE(new.raw_user_meta_data->>'tenant', 'NBA'));
  
  INSERT INTO notification_settings (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();