# AgriGuide API Documentation

## Base URL

```

http://localhost:5000/api

```

---

## Authentication

### Signup

```

POST /auth/signup

```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login

```
POST /auth/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as signup

### Get Current User

```
GET /auth/me
```

**Headers:** `Authorization: Bearer <token>`

**Response:** Farmer object

---

## Farmers

### Get all farmers

```
GET /farmers
```

### Get farmer by ID

```
GET /farmers/:id
```

### Create farmer

```
POST /farmers
```

**Body:**

```json
{
  "name": "John Doe",
  "phone": "9999999999",
  "location": "Pune, Maharashtra"
}
```

### Update farmer

```
PUT /farmers/:id
```

**Body:** Same as create

### Delete farmer

```
DELETE /farmers/:id
```

---

## Soil Data

### Get all soil data

```
GET /soil
```

### Get soil data by farmer

```
GET /soil/farmer/:farmer_id
```

### Get soil history with recommendations

```
GET /soil/history/:farmer_id
```

**Response:**

```json
[
  {
    "id": 1,
    "farmer_id": 1,
    "soil_type": "loamy",
    "ph": 6.5,
    "nitrogen": 100,
    "phosphorus": 50,
    "potassium": 35,
    "location": "Pune, Maharashtra",
    "season": "rabi",
    "created_at": "2026-04-25T13:33:05Z",
    "recommendations": [
      {
        "id": 1,
        "crop_name": "Wheat",
        "suitability_score": 95,
        "reason": "Best suited for rabi season with loamy soil."
      }
    ]
  }
]
```

### Create soil data

```
POST /soil
```

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

```
DELETE /soil/:id
```

---

## Recommendations

### Get crop recommendations

```
POST /recommendations
```

**Body:**

```json
{
  "farmer_id": 1,
  "soil_id": 1,
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

```
GET /recommendations/farmer/:farmer_id
```

---

## Crops

### Get all crops

```
GET /crops
```

### Get crop by name

```
GET /crops/:name
```

---

## Weather

### Get weather by location

```
GET /weather?location=Pune
```

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

## Market Prices

### Get market prices

```
GET /market
```

### Get market prices by commodity

```
GET /market?commodity=Wheat
```

**Response:**

```json
[
  {
    "crop": "Wheat",
    "market": "Ahirora APMC",
    "district": "Mirzapur",
    "state": "Uttar Pradesh",
    "min_price": 2425,
    "max_price": 2450,
    "price": 2450,
    "unit": "Quintal",
    "updated": "21/04/2026"
  }
]
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
| 401         | Unauthorized          |
| 404         | Not Found             |
| 500         | Internal Server Error |

```

```
