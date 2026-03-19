// main backend entry point (index.js or server.js)

const express = require("express"); 
// Framework for building the server and defining routes (like /api/users, /api/posts)

const dotenv = require("dotenv"); // Loads environment variables from a .env file into process.env
const mongoose = require("mongoose"); // Connects Node.js to your MongoDB database.
const mainRouter = require("./Routes/main.router"); // adjust path if needed
const cors = require("cors"); // Middleware that allows your React frontend (on port 3000) to talk to your backend (on port 5000) safely.

dotenv.config(); // Reads the .env file and loads variables into process.env.

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (only once here)
mongoose
  .connect(process.env.MONGO_URI) // Opens a connection to your MongoDB database using the URI from .env.
  .then(() => console.log("MongoDB connected")) // Runs after successful connection (just logs confirmation).
  .catch((err) => console.error("MongoDB connection error:", err)); // Catches and logs errors (e.g., wrong URI, server down).

// Middleware
app.use(cors()); // allows frontend React app to call backend
app.use(express.json()); // parse JSON bodies
// Automatically parses incoming JSON requests so you can access data via req.body.

// Routes
app.use("/", mainRouter);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
