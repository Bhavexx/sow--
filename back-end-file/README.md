# Backend Setup for Fakturera Application

## Prerequisites
- Node.js installed
- PostgreSQL database installed and running

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a PostgreSQL database:
   ```
   createdb fakturera_db
   ```

3. Run the database schema:
   ```
   psql -U postgres -d fakturera_db -f database.sql
   ```

4. Update the `.env` file with your database credentials:
   ```
   DB_USER=your_database_user
   DB_HOST=localhost
   DB_NAME=fakturera_db
   DB_PASSWORD=your_database_password
   DB_PORT=5432
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

## Running the Application

### Development Mode
```
npm run dev
```

### Production Mode
```
npm start
```

The server will start on port 5000 (or the port specified in your .env file).

## API Endpoints

### User Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password` - Reset password

## Database Schema

The application uses a single `users` table with the following structure:

```
users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```