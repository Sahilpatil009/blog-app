# Blog App (MERN)

A full-stack blog application with user authentication, posts, likes, comments, and follower management.

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express, Mongoose, JWT, bcrypt
- Database: MongoDB

## Project Structure

```text
Blog/
  Backend/
    index.js
    controller/
    middlewares/
    models/
    Routes/
  frontend/
    src/
      components/
      pages/
      styles/
```

## Features

- User signup and login with JWT authentication
- Create, update, delete posts
- Like and unlike posts
- Add and view comments on posts
- View user profile and followers
- Follow and unfollow users

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas URI or local MongoDB connection

## Environment Variables (Backend)

Create a `.env` file inside `Backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
PORT=5000
```

## Installation

### 1. Clone and open the project

```bash
git clone <your-repo-url>
cd Blog
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running the Project

You need two terminals.

### Terminal 1: Start backend

```bash
cd Backend
node index.js
```

Backend runs at: `http://localhost:5000`

### Terminal 2: Start frontend

```bash
cd frontend
npm start
```

Frontend runs at: `http://localhost:3000`

## API Base URL

`http://localhost:5000`

## Main API Endpoints

### Auth and Users

- `POST /users/signup`
- `POST /users/login`
- `GET /users/getuser/:id`
- `GET /users/seefollowers/:id`
- `PUT /users/upadateprofile/:id` (protected)
- `GET /users/getprofile/:id` (protected)
- `DELETE /users/deleteprofile/:id` (protected)
- `POST /users/:id/addfollow` (protected)
- `DELETE /users/:id/deletefollow` (protected)

### Posts and Comments

- `POST /posts/createpost` (protected)
- `GET /posts/getallpost`
- `GET /posts/getpostbyid/:userId`
- `PUT /posts/updatepost/:id` (protected)
- `DELETE /posts/deletepost/:id` (protected)
- `POST /posts/:postId/like` (protected)
- `POST /posts/:postId/addcomments` (protected)
- `GET /posts/:postId/allcomments`

Protected routes require header:

```http
Authorization: Bearer <token>
```

## Frontend Routes (React)

- `/users/login`
- `/users/signup`
- `/posts/getallpost`
- `/posts/createpost`
- `/posts/updatepost/:id`
- `/users/getprofile/:id`
- `/users/getuser/:id`
- `/users/seefollowers/:id`
- `/users/updateprofile/:id`
- `/posts/:postId/allcomments`
- `/posts/:postId/addcomments`

## Notes

- The frontend currently calls backend APIs using hardcoded `http://localhost:5000` URLs.
- Backend route for profile update is currently `/users/upadateprofile/:id` (spelling as implemented in backend router).

## Future Improvements

- Add centralized API config via environment variables in frontend
- Add input validation and better error responses
- Add automated tests for backend and frontend
- Add file/image upload support for posts
