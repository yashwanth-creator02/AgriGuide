-- =========================
-- AgriGuide Final Schema (Safe Version)
-- =========================

-- ---------- ENUMS ----------
DO $$ BEGIN
    CREATE TYPE season_type AS ENUM ('kharif', 'rabi', 'zaid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE severity_type AS ENUM ('Low', 'Medium', 'High');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


-- ---------- CROPS ----------
CREATE TABLE IF NOT EXISTS crops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    season season_type,
    suitable_soil TEXT[],
    min_ph DECIMAL(3,1),
    max_ph DECIMAL(3,1),
    min_nitrogen DECIMAL(6,2),
    min_phosphorus DECIMAL(6,2),
    min_potassium DECIMAL(6,2),
    about TEXT,
    climate TEXT,
    diseases TEXT,
    watering TEXT,
    fertilizer TEXT,
    harvest TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------- FARMERS ----------
CREATE TABLE IF NOT EXISTS farmers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------- SOIL DATA ----------
CREATE TABLE IF NOT EXISTS soil_data (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
    soil_type VARCHAR(50) NOT NULL,
    ph DECIMAL(3,1) NOT NULL,
    nitrogen DECIMAL(6,2) NOT NULL,
    phosphorus DECIMAL(6,2) NOT NULL,
    potassium DECIMAL(6,2) NOT NULL,
    location VARCHAR(150),
    season season_type,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_soil_data_farmer_id ON soil_data(farmer_id);
CREATE INDEX IF NOT EXISTS idx_soil_data_location ON soil_data(location);
CREATE INDEX IF NOT EXISTS idx_soil_data_season ON soil_data(season);

-- ---------- RECOMMENDATIONS ----------
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
    soil_id INTEGER REFERENCES soil_data(id) ON DELETE SET NULL,
    crop_name VARCHAR(100), -- kept for backend compatibility
    suitability_score DECIMAL(5,2),
    reason TEXT,
    soil_snapshot JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_recommendations_farmer_id 
ON recommendations(farmer_id);

-- ---------- PEST ALERTS ----------
CREATE TABLE IF NOT EXISTS pest_alerts (
    id SERIAL PRIMARY KEY,
    pest_name VARCHAR(100) NOT NULL,
    affected_crop VARCHAR(100), -- kept for backend compatibility
    crop_id INTEGER REFERENCES crops(id) ON DELETE SET NULL,
    region VARCHAR(150),
    severity severity_type,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pest_crop ON pest_alerts(crop_id);

-- ---------- AUTO UPDATE TIMESTAMP FUNCTION ----------
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------- TRIGGERS ----------
DO $$ BEGIN
    CREATE TRIGGER trg_crops_updated
    BEFORE UPDATE ON crops
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER trg_farmers_updated
    BEFORE UPDATE ON farmers
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER trg_soil_updated
    BEFORE UPDATE ON soil_data
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER trg_recommendations_updated
    BEFORE UPDATE ON recommendations
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER trg_pest_updated
    BEFORE UPDATE ON pest_alerts
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();
EXCEPTION WHEN duplicate_object THEN null;
END $$;