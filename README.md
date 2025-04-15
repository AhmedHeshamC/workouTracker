# Workout Tracker API - By Ahmed Hesham

## Overview
This API is designed for a workout tracker application allowing users to sign up, log in, and manage customized workout plans. It provides endpoints to manage exercises, workouts, and generate progress reports.

## Tech Stack
- **Backend Framework:** Node.js with Express.js
- **Database:** MySQL
- **Database Driver:** mysql2 (with Promises)
- **Authentication:** JSON Web Tokens (JWT) via jsonwebtoken
- **Password Hashing:** bcrypt
- **Security:** helmet, express-rate-limit, cors
- **Environment Configuration:** dotenv
- **Input Validation:** express-validator (to be implemented)
- **Development:** nodemon for automatic restart

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure the environment variables in `.env`:
   - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT, JWT_SECRET
3. Start the server:
   ```bash
   npm run dev
   ```
   or in production:
   ```bash
   npm start
   ```

## API Versioning
All endpoints are versioned under `/api/v1`.

## API Endpoints

### Authentication
- **POST /api/v1/auth/signup**  
  **Description:** Register a new user.  
  **Request Body Example:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "MySecurePassword123"
  }
  ```
  **Response Example (201 Created):**
  ```json
  {
    "message": "Signup successful (DB logic pending)",
    "username": "john_doe",
    "email": "john@example.com"
  }
  ```

- **POST /api/v1/auth/login**  
  **Description:** Authenticate a user and retrieve a JWT.  
  **Request Body Example:**
  ```json
  {
    "email": "john@example.com",
    "password": "MySecurePassword123"
  }
  ```
  **Response Example (200 OK):**
  ```json
  {
    "message": "Login successful (DB/JWT logic pending)",
    "accessToken": "dummy_token"
  }
  ```

### Exercises
- **GET /api/v1/exercises**  
  **Description:** Retrieve a list of available exercises. Optional query parameters include `category` and `muscleGroup`.
  **Example:**  
  Request: `GET /api/v1/exercises?category=Cardio`  
  Response:
  ```json
  {
    "message": "Get all exercises (DB logic pending)",
    "filters": {
      "category": "Cardio"
    }
  }
  ```

- **GET /api/v1/exercises/{exerciseId}**  
  **Description:** Retrieve details for a specific exercise.
  **Example:**  
  Request: `GET /api/v1/exercises/12345`  
  Response:
  ```json
  {
    "message": "Get exercise 12345 (DB logic pending)"
  }
  ```

### Workouts
- **POST /api/v1/workouts**  
  **Description:** Create a new workout plan.
  **Request Body Example:**
  ```json
  {
    "name": "Morning Routine",
    "description": "A quick morning workout",
    "scheduledAt": "2023-10-25T07:00:00Z",
    "exercises": [
      {
        "exerciseId": "ex123",
        "sets": 3,
        "reps": 12,
        "weight": 30,
        "notes": "Warm-up included"
      }
    ]
  }
  ```
  **Response Example (201 Created):**
  ```json
  {
    "message": "Workout created (DB logic pending)",
    "workoutData": { ... }
  }
  ```

- **GET /api/v1/workouts**  
  **Description:** Retrieve all workouts for the authenticated user. Supports filtering/sorting.
  **Example:**  
  Request: `GET /api/v1/workouts?sortBy=date&order=asc`  
  Response:
  ```json
  {
    "message": "Get all workouts for user {userId} (DB logic pending)",
    "filters": {
      "sortBy": "date",
      "order": "asc"
    }
  }
  ```

- **GET /api/v1/workouts/{workoutId}**  
  **Description:** Retrieve details for a specific workout.
  **Example:**  
  Request: `GET /api/v1/workouts/abc123`  
  Response:
  ```json
  {
    "message": "Get workout abc123 for user {userId} (DB logic pending)"
  }
  ```

- **PUT /api/v1/workouts/{workoutId}**  
  **Description:** Update an existing workout plan.
  **Request Body Example:**
  ```json
  {
    "name": "Updated Routine",
    "description": "Updated workout details",
    "scheduledAt": "2023-10-26T07:00:00Z",
    "comment": "Added new exercise",
    "exercises": [
      {
        "id": "we123",
        "exerciseId": "ex123",
        "sets": 4,
        "reps": 10,
        "weight": 35,
        "notes": "New note"
      }
    ]
  }
  ```
  **Response Example (200 OK):**
  ```json
  {
    "message": "Update workout abc123 (DB logic pending)",
    "updateData": { ... }
  }
  ```

- **DELETE /api/v1/workouts/{workoutId}**  
  **Description:** Delete a workout plan.
  **Example:**  
  Request: `DELETE /api/v1/workouts/abc123`  
  **Response:** HTTP 204 No Content

### Reports
- **GET /api/v1/reports/progress**  
  **Description:** Generate a progress report for the authenticated user.
  **Example:**  
  Request: `GET /api/v1/reports/progress?startDate=2023-01-01&endDate=2023-12-31`  
  **Response Example (200 OK):**
  ```json
  {
    "message": "Generate progress report for user {userId} (DB logic pending)",
    "params": {
      "startDate": "2023-01-01",
      "endDate": "2023-12-31"
    }
  }
  ```

## Security Considerations
- **Helmet:** Sets secure HTTP headers.
- **Rate Limiting:** Limits each IP to 100 requests per 15 minutes to mitigate brute-force attacks.
- **Input Validation:** Ensure that all endpoints validate user inputs using express-validator.
- **CORS:** Configured via the cors middleware; adjust allowed origins for production.
- **JWT Authentication:** All endpoints (except signup and login) require a valid JWT in the `Authorization` header.

## License
This project is licensed under the ISC License.

## Author
- Ahmed Hesham

## Project URLs
- https://roadmap.sh/projects/fitness-workout-tracker
- https://github.com/AhmedHeshamC/workouTracker