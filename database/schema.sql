-- 1. Crops Table
CREATE TABLE IF NOT EXISTS crops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    season VARCHAR(20) CHECK (season IN ('kharif', 'rabi', 'zaid')),
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

-- 2. Farmers Table (The main user table)
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

-- 3. Soil Data Table (Corrected reference to 'farmers')
CREATE TABLE IF NOT EXISTS soil_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES farmers(id) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_soil_location ON soil_data(location);
CREATE INDEX IF NOT EXISTS idx_soil_season ON soil_data(season);

-- 4. Recommendations Table (Corrected reference to 'farmers')
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES farmers(id) ON DELETE CASCADE,
    soil_id INTEGER REFERENCES soil_data(id) ON DELETE SET NULL, 
    crop_name VARCHAR(100),
    suitability_score DECIMAL(5,2),
    reason TEXT,
    soil_snapshot JSONB, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Pest Alerts Table
CREATE TABLE IF NOT EXISTS pest_alerts (
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