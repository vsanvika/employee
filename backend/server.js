import "dotenv/config";
import exp from "express";
import mongoose from "mongoose";
import { empRoute } from "./API/empApp.js";
import cors from "cors";

console.log("Starting server...");

const app = exp();

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : ["http://localhost:5173"],
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

// DB connection logic
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("Ensure MONGO_URI is set correctly in Render environment variables.");
    // We don't exit here so the server can still respond to health checks
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