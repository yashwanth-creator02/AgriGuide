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
  "password": "password123",
  "phone": "9999999999",
  "location": "Pune, Maharashtra"
}
```

**Response (201 Created):**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9999999999",
    "location": "Pune, Maharashtra"
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

**Response (200 OK):** Same as signup.

### Get Current User Profile

```
GET /auth/me
```

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9999999999",
  "location": "Pune, Maharashtra",
  "created_at": "2026-04-25T13:30:00Z"
}
```

---

## Farmers

### Get all farmers (Public directory)

```
GET /farmers
```

Returns farmer profiles without sensitive data (password hashes are never exposed).

### Get farmer by ID

```
GET /farmers/:id
```

### Update farmer profile

```
PUT /farmers/:id
PUT /farmers/profile/:id
```

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "name": "John Doe",
  "phone": "9999999999",
  "location": "Pune, Maharashtra"
}
```

### Delete farmer account

```
DELETE /farmers/:id
```

**Headers:** `Authorization: Bearer <token>`

---

## Soil Data & History

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

**Headers:** `Authorization: Bearer <token>` (optional but recommended)

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "farmer_id": 1,
    "soil_type": "Loamy",
    "ph": "6.5",
    "nitrogen": "100.00",
    "phosphorus": "50.00",
    "potassium": "35.00",
    "location": "Pune, Maharashtra",
    "season": "rabi",
    "created_at": "2026-04-25T13:33:05Z",
    "recommendations": [
      {
        "id": 1,
        "crop_name": "Wheat",
        "suitability_score": "95.00",
        "reason": "Scored 95% based on rabi season requirements and Loamy soil compatibility."
      }
    ]
  }
]
```

### Create soil test

```
POST /soil
```

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "farmer_id": 1,
  "soil_type": "Loamy",
  "ph": 6.5,
  "nitrogen": 100,
  "phosphorus": 50,
  "potassium": 35,
  "location": "Pune, Maharashtra",
  "season": "rabi"
}
```

### Delete soil entry

```
DELETE /soil/:id
DELETE /soil/history/:id
```

**Headers:** `Authorization: Bearer <token>`

---

## Recommendations

### Generate crop recommendations

```
POST /recommendations
```

**Body:**

```json
{
  "farmer_id": 1,
  "soil_id": 1,
  "soil_type": "Loamy",
  "ph": 6.5,
  "nitrogen": 100,
  "phosphorus": 50,
  "potassium": 35,
  "season": "rabi"
}
```

**Response (200 OK):**

```json
[
  {
    "user_id": 1,
    "soil_id": 1,
    "crop_name": "Wheat",
    "suitability_score": 95,
    "reason": "Scored 95% based on rabi season requirements and Loamy soil compatibility.",
    "soil_snapshot": {
      "ph": 6.5,
      "n": 100,
      "p": 50,
      "k": 35,
      "type": "Loamy"
    }
  }
]
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

## Weather & Geocoding

### Get weather by location name

```
GET /weather?location=Pune
```

**Response (200 OK):**

```json
{
  "location": "Pune, India",
  "temperature": 32.4,
  "humidity": 45,
  "rainfall": 0,
  "wind_speed": 11.2
}
```

### Reverse-geocode coordinates

```
GET /weather/reverse?lat=18.5204&lng=73.8567
```

**Response (200 OK):**

```json
{
  "city": "Pune",
  "state": "Maharashtra",
  "formatted": "Pune, Maharashtra"
}
```

---

## Market Prices (data.gov.in)

### Get market prices

```
GET /market?page=1&limit=20
GET /market?commodity=Wheat&page=1&limit=20
```

**Response (200 OK):**

```json
{
  "records": [
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
  ],
  "total": 120
}
```

---

## Pest Alerts

### Get all alerts

```
GET /pests
```

### Get alerts by severity

```
GET /pests/severity/:severity
```

Severity values: `High`, `Medium`, `Low`.

### Get alerts by crop ID

```
GET /pests/crop/:crop_id
```

---

## Error Handling

Standard error format:

```json
{
  "message": "Error description here"
}
```
