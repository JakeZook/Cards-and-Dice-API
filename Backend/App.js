const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import and use routes
const diceRoutes = require("./Routes/Dice");
app.use("/roll", diceRoutes);

module.exports = app;
