const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const diceRoutes = require("./Routes/Dice");
const armorRoutes = require("./Routes/Armor");
const classesRoutes = require("./Routes/Classes");
const monstersRoutes = require("./Routes/Monsters");
const weaponRoutes = require("./Routes/Weapons");
const spellsRoutes = require("./Routes/Spells");
const consumablesRoutes = require("./Routes/Consumables");

app.use("/roll", diceRoutes);
app.use("/armor", armorRoutes);
app.use("/classes", classesRoutes);
app.use("/monsters", monstersRoutes);
app.use("/weapons", weaponRoutes);
app.use("/spells", spellsRoutes);
app.use("/consumables", consumablesRoutes);

// Connect to the database and start server
const port = process.env.PORT || 3000;
connectDB();

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
