-- Migration 004: Consolidate user authentication into farmers table
-- All authentication (email, password hash) is managed directly in the farmers table.
-- This migration ensures backward compatibility for migration runners.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers' AND column_name = 'password') THEN
        ALTER TABLE farmers ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers' AND column_name = 'email') THEN
        ALTER TABLE farmers ADD COLUMN email VARCHAR(150) UNIQUE;
    END IF;
END $$;
