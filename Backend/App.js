const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import and use routes
const diceRoutes = require("./Routes/Dice");
const classRoutes = require("./Routes/Classes");

app.use("/roll", diceRoutes);
app.use("/classes", classRoutes);

module.exports = app;
