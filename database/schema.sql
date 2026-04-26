-- AgriGuide Database Schema
-- 1. Crops Table (Independent)
-- Added UNIQUE name, updated_at, and image_url
CREATE TABLE crops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    season VARCHAR(20) CHECK (season IN ('kharif', 'rabi', 'zaid')),
    suitable_soil TEXT[], -- PostgreSQL Array type
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

-- 2. Farmer Table (Combined Farmer/User Auth)
CREATE TABLE farmers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Soil Data Table
-- Added Indexing for location and season
CREATE TABLE soil_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    soil_type VARCHAR(50) NOT NULL,
    ph DECIMAL(3,1) NOT NULL,
    nitrogen DECIMAL(6,2) NOT NULL,
    phosphorus DECIMAL(6,2) NOT NULL,
    potassium DECIMAL(6,2) NOT NULL,
    location VARCHAR(150),
    season VARCHAR(20) CHECK (season IN ('kharif', 'rabi', 'zaid')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_soil_location ON soil_data(location);
CREATE INDEX idx_soil_season ON soil_data(season);

-- 4. Recommendations Table
-- Added soil_snapshot (JSONB) to preserve context even if soil_data is deleted
CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    soil_id INTEGER REFERENCES soil_data(id) ON DELETE SET NULL, 
    crop_name VARCHAR(100),
    suitability_score DECIMAL(5,2),
    reason TEXT,
    soil_snapshot JSONB, -- Stores {ph: 6.5, n: 100, p: 50, k: 30}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Pest Alerts Table
-- Linked to crops.id via Foreign Key
CREATE TABLE pest_alerts (
    id SERIAL PRIMARY KEY,
    pest_name VARCHAR(100) NOT NULL,
    crop_id INTEGER REFERENCES crops(id) ON DELETE SET NULL,
    region VARCHAR(150),
    severity VARCHAR(10) CHECK (severity IN ('Low', 'Medium', 'High')),
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);