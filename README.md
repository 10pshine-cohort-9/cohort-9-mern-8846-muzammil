# Notes App

## Project Overview

This project is a full-stack Notes Application built with the MERN stack as part of the 10Pearls SHINE Internship. The goal is to provide a secure and user-friendly platform where authenticated users can create, edit, delete, and manage notes efficiently.

The project is currently under active development and is being structured to support future enhancements such as rich text editing, dashboards, search/filtering, logging, exception handling, testing, and quality analysis.

## Current Project Status

The project is in active development.

### Completed

- Backend project setup
- Frontend project setup with React + Vite
- MongoDB connection
- User signup and signin
- JWT-based authentication
- Password hashing with bcrypt
- Authentication middleware
- Responsive login page
- Responsive signup page

### Planned / In Progress

- Notes CRUD
- Rich text editor
- Dashboard
- User profile
- Search and filter
- Real-time updates with Socket.IO
- Export and import notes
- Pino logging
- Global exception handling
- Backend unit testing with Mocha/Chai
- Frontend unit testing with Jest
- SonarQube integration

## Key Features

- User Authentication and Authorization
  - Users can sign up, log in, and log out.
  - Notes are associated with authenticated users.
- Note Management
  - Users can create, edit, and delete notes.
  - Notes will support rich text editing.
- Application Logging
  - Logging will be implemented using Pino Logger for important events, errors, and request/response activity.
- Database Design
  - The application uses MongoDB for storing users and notes.
- Exception Handling
  - Global exception handling will be implemented to ensure meaningful error responses.
- Testing and Quality Assurance
  - Backend and frontend unit tests will be added progressively.
  - SonarQube will be used for code quality analysis.

## Technology Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Pino Logger
- Socket.IO
- Multer
- Mocha
- Chai

### Frontend

- React.js
- Vite
- React Router DOM
- Jest

## Application Screens

### Sign Up / Login

- Sign-up form
- Login form
- User registration and authentication
- Redirect to the main application after successful login

### Dashboard

- List of user-specific notes
- Button to create a new note
- View and navigate to note editor

### Note Editor

- Rich text editor
- Save and cancel actions
- Create or update notes

### User Profile (Planned)

- Display user details
- Logout option

## Folder Structure

```text
backend/
  src/
    app.js
    server.js
    config/
frontend/
  src/
    api.js
    App.jsx
    pages/
      Login.jsx
      Signup.jsx
```

## Git Branching Strategy

This repository follows the 10Pearls SHINE branching strategy.

### Main Branches

- main → Production-ready code
- develop → Integration branch for ongoing development

### Feature Branches

- feature/backend/<feature-name>
- feature/frontend/<feature-name>

### Bugfix Branches

- bugfix/backend/<bug-description>
- bugfix/frontend/<bug-description>

### Example Workflow

```bash
git checkout develop
git pull origin develop
git checkout -b feature/frontend/<feature-name>
```

```bash
git add .
git commit -m "Add detailed description of the changes"
git push origin feature/frontend/<feature-name>
```

## Installation

### Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB instance

### Clone the Repository

```bash
git clone <repository-url>
cd cohort-9-mern-8846-muzammil
```

### Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Running the Application

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

## Development Workflow

1. Create a new branch from develop.
2. Implement the feature or bug fix locally.
3. Test the changes thoroughly.
4. Commit with clear and descriptive messages.
5. Open a pull request to develop.

This README should be updated progressively as the project evolves so that the documentation remains accurate and useful over time.

## Future Improvements

The project roadmap includes:

- Complete notes CRUD functionality
- Rich text editing support
- Better dashboard experience
- User profile management
- Search and filtering
- Real-time collaboration updates
- Export and import improvements
- Logging, error handling, and testing enhancements

## Author

Muzammil Hussain

10Pearls SHINE Internship
