CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES farmers(id) ON DELETE CASCADE,
    soil_id INTEGER REFERENCES soil_data(id) ON DELETE CASCADE,
    crop_name VARCHAR(100),
    suitability_score DECIMAL(5,2),
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);