import axios from "axios";

// Dynamically set baseURL depending on environment
const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://drivx.onrender.com/api" // deployed backend
      : "http://localhost:5000/api",     // local backend
  timeout: 120000,
});

export default API;
