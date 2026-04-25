CREATE TABLE soil_data (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES farmers(id) ON DELETE CASCADE,
    soil_type VARCHAR(50) NOT NULL,
    ph DECIMAL(3,1) NOT NULL,
    nitrogen DECIMAL(6,2) NOT NULL,
    phosphorus DECIMAL(6,2) NOT NULL,
    potassium DECIMAL(6,2) NOT NULL,
    location VARCHAR(150),
    season VARCHAR(20) CHECK (season IN ('kharif', 'rabi', 'zaid')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);