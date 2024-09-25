const express = require("express");
const cors = require("cors");
const diceRoutes = require("./Routes/Dice"); // Dice routes
const classesRoutes = require("./Routes/Classes"); // Class routes

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

// Register dice and classes routes
app.use("/roll", diceRoutes);
app.use("/classes", classesRoutes);

app.listen(port, () => {
	console.log(`RPG API server running at http://localhost:${port}`);
});
