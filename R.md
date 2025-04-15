# API Design Document for Workout Tracker Application

---

## Proposed API Design

This section outlines the proposed RESTful API endpoints, data structures, and authentication mechanisms based on the project requirements.

### Core Entities

1.  **User:** Represents an application user (id, username, password_hash, email, created_at).
2.  **Exercise:** Represents a predefined exercise (id, name, description, category/muscle_group).
3.  **Workout:** Represents a user-created workout session (id, user_id, name, description, scheduled_at, created_at, updated_at).
4.  **WorkoutExercise:** Links a Workout to an Exercise, storing performance details (id, workout_id, exercise_id, sets, reps, weight, notes).

### Authentication Endpoints

Base Path: `/api/v1/auth`

*   **`POST /signup`**
    *   **Description:** Registers a new user.
    *   **Request Body:** `{ "username": "string", "email": "string", "password": "string" }`
    *   **Response (201 Created):** `{ "userId": "uuid", "username": "string", "email": "string" }`
    *   **Response (400 Bad Request):** Validation errors (e.g., missing fields, invalid email, username taken).
    *   **Authentication:** None required.

*   **`POST /login`**
    *   **Description:** Authenticates a user and returns a JWT.
    *   **Request Body:** `{ "email": "string", "password": "string" }`
    *   **Response (200 OK):** `{ "accessToken": "jwt_token" }`
    *   **Response (401 Unauthorized):** Invalid credentials.
    *   **Authentication:** None required.

### Exercise Endpoints

Base Path: `/api/v1/exercises`

*   **`GET /`**
    *   **Description:** Retrieves a list of all available exercises. Supports filtering by category/muscle group.
    *   **Query Parameters:** `?category=string`, `?muscleGroup=string`
    *   **Response (200 OK):** `[ { "id": "uuid", "name": "string", "description": "string", "category": "string", "muscleGroup": "string" } ]`
    *   **Authentication:** JWT required.

*   **`GET /{exerciseId}`**
    *   **Description:** Retrieves details for a specific exercise.
    *   **Response (200 OK):** `{ "id": "uuid", "name": "string", "description": "string", "category": "string", "muscleGroup": "string" }`
    *   **Response (404 Not Found):** Exercise not found.
    *   **Authentication:** JWT required.

*(Note: POST/PUT/DELETE for exercises might be admin-only, not detailed here as per user requirements focus)*

### Workout Endpoints

Base Path: `/api/v1/workouts`

*   **`POST /`**
    *   **Description:** Creates a new workout plan for the authenticated user.
    *   **Request Body:**
        ```json
        {
          "name": "string",
          "description": "string (optional)",
          "scheduledAt": "datetime (optional)",
          "exercises": [
            {
              "exerciseId": "uuid",
              "sets": "integer",
              "reps": "integer",
              "weight": "float (optional)",
              "notes": "string (optional)"
            }
            // ... more exercises
          ]
        }
        ```
    *   **Response (201 Created):** The created workout object including nested exercises.
        ```json
        {
          "id": "uuid",
          "userId": "uuid",
          "name": "string",
          "description": "string",
          "scheduledAt": "datetime",
          "createdAt": "datetime",
          "updatedAt": "datetime",
          "exercises": [
            {
              "id": "uuid", // WorkoutExercise ID
              "exerciseId": "uuid",
              "sets": "integer",
              "reps": "integer",
              "weight": "float",
              "notes": "string"
            }
          ]
        }
        ```
    *   **Response (400 Bad Request):** Validation errors (e.g., missing fields, invalid exerciseId).
    *   **Authentication:** JWT required.

*   **`GET /`**
    *   **Description:** Retrieves a list of workouts for the authenticated user. Supports sorting and filtering (e.g., by date range, scheduled status).
    *   **Query Parameters:** `?sortBy=date`, `?order=asc|desc`, `?startDate=date`, `?endDate=date`, `?status=pending|completed`
    *   **Response (200 OK):** `[ { "id": "uuid", "name": "string", "scheduledAt": "datetime", "createdAt": "datetime" } ]` (Summary view)
    *   **Authentication:** JWT required.

*   **`GET /{workoutId}`**
    *   **Description:** Retrieves details for a specific workout, including its exercises.
    *   **Response (200 OK):** Full workout object structure as shown in `POST /` response.
    *   **Response (404 Not Found):** Workout not found or doesn't belong to the user.
    *   **Authentication:** JWT required.

*   **`PUT /{workoutId}`**
    *   **Description:** Updates an existing workout plan. Allows updating details, schedule, and adding/removing/modifying exercises. Can add comments.
    *   **Request Body:** Similar to `POST /`, potentially including a `comment` field.
        ```json
        {
          "name": "string (optional)",
          "description": "string (optional)",
          "scheduledAt": "datetime (optional)",
          "comment": "string (optional)", // For adding comments during update
          "exercises": [ // Can be partial update or full replacement
            {
              "id": "uuid (optional, for existing)", // WorkoutExercise ID
              "exerciseId": "uuid",
              "sets": "integer",
              "reps": "integer",
              "weight": "float (optional)",
              "notes": "string (optional)"
            }
          ]
        }
        ```
    *   **Response (200 OK):** The updated workout object.
    *   **Response (400 Bad Request):** Validation errors.
    *   **Response (404 Not Found):** Workout not found or doesn't belong to the user.
    *   **Authentication:** JWT required.

*   **`DELETE /{workoutId}`**
    *   **Description:** Deletes a workout plan.
    *   **Response (204 No Content):** Successfully deleted.
    *   **Response (404 Not Found):** Workout not found or doesn't belong to the user.
    *   **Authentication:** JWT required.

### Reporting Endpoints

Base Path: `/api/v1/reports`

*   **`GET /progress`**
    *   **Description:** Generates a progress report for the authenticated user (e.g., workout frequency, exercise improvements over time). Specific report structure TBD.
    *   **Query Parameters:** `?startDate=date`, `?endDate=date`, `?exerciseId=uuid` (optional, for specific exercise progress)
    *   **Response (200 OK):** `{ /* Report data structure */ }`
    *   **Authentication:** JWT required.

### Security

*   All endpoints except `/api/v1/auth/signup` and `/api/v1/auth/login` require a valid JWT passed in the `Authorization: Bearer <token>` header.
*   API logic must ensure users can only access and modify their own workout data.
*   **Helmet:** Used to set various security-related HTTP headers (e.g., Content-Security-Policy, X-Content-Type-Options).
*   **Rate Limiting:** Basic rate limiting (`express-rate-limit`) is applied to API endpoints to mitigate brute-force attacks.
*   **Input Validation:** Crucial for security. Although controllers have placeholders, explicit validation (e.g., using `express-validator`) must be implemented for all user inputs to prevent injection attacks and ensure data integrity.
*   **CORS:** Configured using the `cors` middleware. Should be restricted to specific origins in production.
*   **Password Hashing:** User passwords are hashed using `bcrypt` before storing.
*   **Environment Variables:** Sensitive information like database credentials and JWT secrets are stored in environment variables (`.env`) and not hardcoded.

### Database Schema (Conceptual)

*   **Users:** `id` (PK, UUID/INT AUTO_INCREMENT), `username` (VARCHAR, UNIQUE), `email` (VARCHAR, UNIQUE), `password_hash` (VARCHAR), `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
*   **Exercises:** `id` (PK, UUID/INT AUTO_INCREMENT), `name` (VARCHAR), `description` (TEXT), `category` (VARCHAR), `muscle_group` (VARCHAR)
*   **Workouts:** `id` (PK, UUID/INT AUTO_INCREMENT), `user_id` (FK to Users), `name` (VARCHAR), `description` (TEXT), `scheduled_at` (DATETIME NULL), `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), `updated_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
*   **WorkoutExercises:** `id` (PK, UUID/INT AUTO_INCREMENT), `workout_id` (FK to Workouts ON DELETE CASCADE), `exercise_id` (FK to Exercises), `sets` (INT), `reps` (INT), `weight` (FLOAT NULL), `notes` (TEXT NULL)

### Data Seeding

*   A script/process will populate the `Exercises` table with initial data upon application setup.

### Documentation

*   API documentation will be provided using OpenAPI Specification (Swagger).

---

## Implementation Details

### Technology Stack

*   **Backend Framework:** Node.js with Express.js
*   **Database:** MySQL
*   **Database Driver:** `mysql2` (with Promises)
*   **Authentication:** JSON Web Tokens (JWT) using `jsonwebtoken`
*   **Password Hashing:** `bcrypt`
*   **Environment Variables:** `dotenv`
*   **CORS:** `cors` middleware

### Project Structure (Conceptual)

```
/workoutTracker
|-- config/
|   `-- db.js           # Database connection pool setup
|-- controllers/
|   |-- authController.js
|   |-- exerciseController.js
|   |-- workoutController.js
|   `-- reportController.js
|-- middleware/
|   `-- authMiddleware.js # JWT verification
|-- models/             # (Optional: For ORM or complex query logic)
|-- routes/
|   |-- authRoutes.js
|   |-- exerciseRoutes.js
|   |-- workoutRoutes.js
|   |-- reportRoutes.js
|   `-- index.js        # Main API router (mounted under /api/v1)
|-- utils/              # (Optional: For helpers like password hashing)
|-- .env                # Environment variables (DB credentials, JWT secret)
|-- package.json
|-- server.js           # Express server setup and entry point
`-- R.md                # This documentation file
```

### Notes

*   The provided code establishes the basic structure, routes, and controllers.
*   **Database interaction logic (SQL queries) within controllers needs to be fully implemented.** Placeholders (`TODO:`) indicate where queries should go.
*   Input validation (e.g., using `express-validator`) should be added for robustness.
*   Comprehensive error handling middleware should be implemented.
*   Consider using an ORM like Sequelize or TypeORM for more complex applications to manage models and migrations.
*   Database schema needs to be created in your MySQL instance.
*   The `comment` field mentioned in the `PUT /api/v1/workouts/{workoutId}` request body is not currently part of the conceptual schema and would need to be added if required.