-- Clear existing data first
TRUNCATE pest_alerts RESTART IDENTITY;

INSERT INTO pest_alerts (pest_name, affected_crop, crop_id, region, severity, description) VALUES
(
  'Fall Armyworm', 'Maize', 3,
  'Karnataka, Andhra Pradesh', 'High',
  'Widespread infestation reported. Apply recommended pesticides immediately.'
),
(
  'Brown Plant Hopper', 'Rice', 2,
  'Tamil Nadu, Kerala', 'Medium',
  'Moderate spread detected. Monitor fields closely and drain excess water.'
),
(
  'Aphids', 'Wheat', 1,
  'Punjab, Haryana', 'Low',
  'Minor presence observed. Use neem-based sprays as a precaution.'
),
(
  'Whitefly', 'Cotton', 5,
  'Gujarat, Rajasthan', 'High',
  'Severe outbreak reported. Consult local agricultural officer immediately.'
),
(
  'Stem Borer', 'Sugarcane', 6,
  'Uttar Pradesh, Bihar', 'Medium',
  'Moderate infestation detected. Apply carbofuran granules near root zone.'
);