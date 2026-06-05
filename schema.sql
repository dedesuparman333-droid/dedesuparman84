-- 1. Create a table for projects
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  link_url text NOT NULL,
  category text,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy for Public Read Access
CREATE POLICY "Public profiles are viewable by everyone."
  ON projects FOR SELECT
  USING ( true );

-- 4. Create Policy for Admin Insert/Update/Delete
-- Because this is a simple setup, we'll allow authenticated users to manage projects.
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  USING ( auth.role() = 'authenticated' );
