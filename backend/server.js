import "dotenv/config";
import exp from "express";
import { connect } from "mongoose";
import { empRoute } from "./API/empApp.js";
import cors from "cors";

const app = exp();

//add cors middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : ["http://localhost:5173"],
  }),
);

//body parser middleware
app.use(exp.json());

//emp api middleware
app.use("/emp-api", empRoute);

//health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Employee API is running" });
});

//DB connection
const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/empdb";

const connectDB = async () => {
  try {
    await connect(MONGO_URI);
    console.log("DB connected");
  } catch (err) {
    console.log("err in DB connection", err.message);
    process.exit(1);
  }
};

// Connect to DB first, then start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`server listening on port ${PORT}..`));
});

//error handling middleware
app.use((err, req, res, next) => {
  console.log("err in middleware:", err.message);

  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });
});