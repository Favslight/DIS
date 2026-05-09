Registration App (React + Fastify + MongoDB)
Author: Samuel Ebiloma

# Registration App (React + Fastify + MongoDB)

Author: Samuel Ebiloma

Project Overview

This project is a simple full-stack registration application.

A user fills a registration form on the frontend, submits the form, and the backend receives the data, validates it, hashes the password for security, and stores the user inside MongoDB.

The main goal of this project is to demonstrate how:
- A React frontend communicates with a backend API
- A Fastify server handles requests
- MongoDB stores user data
- Passwords are secured using bcrypt
- Frontend and backend work together in a complete flow

Technologies Used

Frontend
- React
- Vite
- Fetch API

Backend
- Node.js
- Fastify
- MongoDB
- Mongoose
- bcrypt

Project Structure

project-folder/
│
├── frontend/
│   ├── src/
│   ├── public
│
├── backend/
│   ├── models/
│   │   └── Registration.js
│   │
│   ├── routes/
│   │   └── registerRoute.js
│   │
│   ├── server.js
│   └── .env
│
└── README.md

What This Application Does

The application allows users to:
1. Enter their Full Name, Email, and Password
2. Submit the registration form
3. Send the data to the backend
4. Save the user information into MongoDB
5. Receive a success or error response

How To Run The Project

Step 1 — Clone The Project

git clone <your-repository-url>

Step 2 — Install Backend Dependencies

cd backend
npm install

Step 3 — Create Environment Variables

Create a .env file inside the backend folder.

Example:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Step 4 — Start The Backend Server

npm run dev

Backend runs on:
http://localhost:5000

Step 5 — Install Frontend Dependencies

cd frontend
npm install

Step 6 — Start The Frontend

npm run dev

Frontend runs on:
http://localhost:5173

API Endpoint

POST /api/register

Request Body

{
  "fullName": "Samuel Ebiloma",
  "email": "samuel@example.com",
  "password": "12345678"
}

How Backend And Frontend Communicate

The frontend and backend communicate using HTTP requests.

Step-By-Step Communication Flow

1. User fills the form
2. React stores the input data using useState
3. User clicks submit
4. React sends a POST request using fetch()
5. Fastify backend receives the request
6. Backend validates the data
7. Password is hashed using bcrypt
8. Data is saved in MongoDB
9. Backend sends response
10. Frontend displays success or error message

Complete Data Flow

User → React Form → Fastify Backend → MongoDB Database
                     ↓
               Password Hashed
                     ↓
         Response Sent Back To React

Explanation Of Important Backend Files

backend/server.js
- Starts the Fastify server
- Connects MongoDB
- Registers routes
- Starts application

backend/routes/registerRoute.js
- Handles registration logic
- Validates request data
- Hashes password
- Saves user
- Sends response

backend/models/Registration.js
- Defines MongoDB schema
- Adds validation rules
- Prevents duplicate emails
- Exports Mongoose model

How I Would Teach This To A Complete Beginner

I would break everything into 3 parts:

1. Frontend
The frontend is what the user sees. It collects user data and sends it to the backend.

2. Backend
The backend works behind the scenes. It validates data, hashes passwords, and saves information.

3. Database
The database stores user information permanently.

Beginner Analogy

React Frontend = Receptionist
Fastify Backend = Office Staff
MongoDB = File Storage Room

Simple Beginner Flow

User fills form
↓
React sends data
↓
Fastify checks data
↓
bcrypt protects password
↓
MongoDB stores data
↓
Backend sends response
↓
React shows message

Why I Chose These Technologies

Why I Chose React
- Easy form handling
- Simple state management
- Automatic UI updates
- Beginner-friendly
- Widely used

Why I Chose Fastify
- Lightweight
- Very fast
- Simple route structure
- Good API performance

Why I Chose MongoDB
- Stores JSON-like data
- Flexible structure
- Works naturally with JavaScript

Why I Chose Mongoose
- Adds structure to MongoDB
- Provides validation
- Makes database operations easier

Why I Chose bcrypt
- Protects passwords
- Improves security
- Trusted standard in Node.js applications

Final Summary

This project demonstrates the complete flow of a basic full-stack registration system.

The frontend collects user data.
The backend validates and processes the data.
bcrypt protects the password.
MongoDB stores the information.
Finally, the backend sends a response and the frontend updates the user interface.

Short Memory Line

"Frontend sends, backend checks, bcrypt protects, database stores, frontend displays."
