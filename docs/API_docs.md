# AgriGuide API Documentation

## Base URL

http://localhost:5000/api

---

## Farmers

### Get all farmers

GET /farmers
**Response:**

```json
[
  {
    "id": 1,
    "name": "Test Farmer",
    "phone": "9999999999",
    "location": "Pune, Maharashtra",
    "created_at": "2026-04-25T00:00:00.000Z"
  }
]
```

### Get farmer by ID

GET /farmers/:id

### Create farmer

POST /farmers
**Body:**

```json
{
  "name": "Ravi Kumar",
  "phone": "9876543210",
  "location": "Nagpur, Maharashtra"
}
```

### Update farmer

PUT /farmers/:id
**Body:**

```json
{
  "name": "Ravi Kumar",
  "phone": "9876543210",
  "location": "Pune, Maharashtra"
}
```

### Delete farmer

DELETE /farmers/:id

---

## Soil Data

### Get all soil data

GET /soil

### Get soil data by farmer

GET /soil/farmer/:farmer_id

### Create soil data

POST /soil
**Body:**

```json
{
  "farmer_id": 1,
  "soil_type": "loamy",
  "ph": 6.5,
  "nitrogen": 100,
  "phosphorus": 50,
  "potassium": 35,
  "location": "Pune, Maharashtra",
  "season": "rabi"
}
```

### Delete soil data

DELETE /soil/:id

---

## Recommendations

### Get crop recommendations

POST /recommendations
**Body:**

```json
{
  "farmer_id": 1,
  "soil_id": null,
  "soil_type": "loamy",
  "ph": 6.5,
  "nitrogen": 100,
  "phosphorus": 50,
  "potassium": 35,
  "season": "rabi"
}
```

**Response:**

```json
[
  {
    "crop_name": "Wheat",
    "suitability_score": 95,
    "reason": "Best suited for rabi season with loamy or clay loam soil."
  }
]
```

### Get recommendations by farmer

GET /recommendations/farmer/:farmer_id

---

## Crops

### Get all crops

GET /crops

### Get crop by name

GET /crops/:name
**Example:**
GET /crops/Wheat

---

## Weather

### Get weather by location

GET /weather?location=Pune
**Response:**

```json
{
  "location": "Pune, India",
  "temperature": 39.8,
  "humidity": 12,
  "rainfall": 0,
  "wind_speed": 12
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "message": "Error description here"
}
```

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Created               |
| 400         | Bad Request           |
| 404         | Not Found             |
| 500         | Internal Server Error |
