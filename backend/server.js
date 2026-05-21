import "dotenv/config";
import exp from "express";
import mongoose from "mongoose";
import { empRoute } from "./API/empApp.js";
import cors from "cors";

console.log("Starting server...");

const app = exp();

// CORS configuration
const defaultOrigins = ["http://localhost:5173"];
const envOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [];
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(exp.json());

// API Routes
app.use("/emp-api", empRoute);

// Health check endpoint (Render uses this to see if the app is alive)
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "online",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/empdb";

// Disable buffering so we get immediate errors if not connected
mongoose.set('bufferCommands', false);

// DB connection logic
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

// Start the server immediately
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  connectDB();
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(err.status || 500).json({
    message: "An internal error occurred",
    error: err.message
  });
});