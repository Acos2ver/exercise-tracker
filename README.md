# Exercise Tracker - MERN Stack Application

A full-stack Single Page Application (SPA) for tracking fitness exercises with complete CRUD functionality built using the MERN stack (MongoDB, Express, React, Node.js).

## Overview

This application enables users to log and manage their workout exercises with detailed tracking of repetitions, weight, units, and dates. The project demonstrates proficiency in full-stack development, RESTful API design, and modern web technologies.

## Features

### Frontend (React)
- **Exercise Dashboard**: Display all exercises in a dynamic table with real-time updates
- **Create Exercise**: Add new exercises with validation
- **Edit Exercise**: Update existing exercises with pre-populated forms
- **Delete Exercise**: Remove exercises with immediate feedback
- **Responsive Navigation**: Seamless page transitions using React Router

### Backend (REST API)
- **RESTful API**: Five endpoints supporting full CRUD operations
- **Data Validation**: Comprehensive request validation for all operations
- **MongoDB Integration**: Persistent storage with Mongoose ODM
- **Error Handling**: Proper HTTP status codes and error messages

## Tech Stack

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)

**Frontend:**
- React 18 with functional components and hooks
- React Router DOM for navigation
- React Icons for UI elements
- Vite for build tooling
- Fetch API for HTTP requests

**Backend:**
- Node.js with Express framework
- MongoDB with Mongoose ODM
- ES Modules syntax
- Async/await for asynchronous operations

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/exercises` | Create a new exercise |
| GET | `/exercises` | Retrieve all exercises |
| GET | `/exercises/:_id` | Retrieve a specific exercise |
| PUT | `/exercises/:_id` | Update an exercise |
| DELETE | `/exercises/:_id` | Delete an exercise |

## Data Model

Each exercise includes the following properties:
```javascript
{
  name: String,        // Exercise name
  reps: Number,        // Number of repetitions (> 0)
  weight: Number,      // Weight used (> 0)
  unit: String,        // "kgs" or "lbs"
  date: String,        // Format: MM-DD-YY
  _id: ObjectId        // MongoDB unique identifier
}
```

## Key Features

### Request Validation
- Validates all required fields for POST and PUT requests
- Ensures proper data types and formats
- Returns appropriate HTTP status codes (201, 200, 400, 404)
- Custom date format validation (MM-DD-YY)

### State Management
- Lifted state for passing exercise data to Edit page
- No redundant API calls for pre-populating forms
- React hooks (useState, useEffect, useNavigate)

### User Experience
- Pre-populated edit forms with existing data
- Alert messages for operation success/failure
- Automatic navigation after CRUD operations
- Select dropdown for unit selection (kgs/lbs)

## Project Structure
```
exercise-tracker/
├── backend/
│   ├── exercises_controller.mjs    # Route handlers
│   ├── exercises_model.mjs         # Mongoose models
│   ├── exercises_main.mjs          # Express server
│   └── .env                        # Environment variables
│
└── frontend/
    ├── src/
    │   ├── App.jsx                 # Main app component
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── EditExercisePage.jsx
    │   │   └── CreateExercisePage.jsx
    │   └── components/
    │       ├── Navigation.jsx
    │       ├── ExerciseList.jsx
    │       └── Exercise.jsx
    └── vite.config.js
```

## Installation & Setup

### Backend
```bash
cd backend
npm install
# Update .env with your MongoDB connection string
npm start  # Server runs on port 3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev  # App runs on port 5173
```

## Technical Highlights

- **Separation of Concerns**: Model-View-Controller architecture with clear separation between controller and model code
- **Modern JavaScript**: ES6+ features including async/await, arrow functions, destructuring
- **Component Reusability**: Modular React components for maintainability
- **RESTful Design**: Following REST conventions for predictable API behavior
- **Error Handling**: Comprehensive validation and error responses
- **Proxy Configuration**: Vite proxy for seamless frontend-backend communication

## Development Practices

- Function-based React components with hooks
- Async/await for all asynchronous operations
- No direct Mongoose calls in controller code
- Proper use of HTTP status codes
- Input validation and sanitization
- Semantic HTML5 elements

## Skills Demonstrated

- Full-stack web development (MERN)
- RESTful API design and implementation
- Database modeling and operations
- React component lifecycle and hooks
- Client-server communication
- Form validation and error handling
- Responsive UI design
- Git version control

---

**Project Type**: Academic Portfolio | **Stack**: MERN | **Focus**: Full-Stack Development
