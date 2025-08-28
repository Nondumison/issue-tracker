# Backend - Issue Tracker

Built with **Express.js**, **Drizzle ORM**, and **PostgreSQL**.

## Features

- User registration and authentication (JWT)
- CRUD operations for issues
- Status filtering
- Password hashing with bcrypt

## Environment Variables

## Create a `.env` file in `server/`:
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/issue_tracker
JWT_SECRET=your_jwt_secret
PORT=3001


## Run locally

```bash
npm install
npm run start
```
Backend API will be available at http://localhost:3001/api.

## Database

### Uses PostgreSQL
Migrations handled with Drizzle Kit

# Generate a new migration based on schema changes
npm run generate

# Apply migrations to the database
npm run migrate

# Push the schema directly to the database
npm run push

