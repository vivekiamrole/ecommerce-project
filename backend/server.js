



require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce API is running"
  });
});

// Product API
app.use("/api/products", productRoutes);

// User API
app.use("/api/users", userRoutes);

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
