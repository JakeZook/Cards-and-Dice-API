const mongoose = require("mongoose");
const connectDB = require("./db");

const Armor = require("./Models/Armor");
const Classes = require("./Models/Classes");
const Monsters = require("./Models/Monsters");
const Weapons = require("./Models/Weapons");
const Spells = require("./Models/Spells");
const Consumables = require("./Models/Consumables");

const armorData = require("./Data/Armor");
const classesData = require("./Data/Classes");
const monstersData = require("./Data/Monsters");
const weaponsData = require("./Data/Weapons");
const spellsData = require("./Data/Spells");
const consumablesData = require("./Data/Consumables");

const seedDatabase = async () => {
	try {
		// Connect to database
		connectDB();

		// Clear existing data
		await Armor.deleteMany({});
		await Classes.deleteMany({});
		await Monsters.deleteMany({});
		await Weapons.deleteMany({});
		await Spells.deleteMany({});
		await Consumables.deleteMany({});

		// Insert new data
		await Armor.insertMany(armorData);
		await Classes.insertMany(classesData);
		await Monsters.insertMany(monstersData);
		await Weapons.insertMany(weaponsData);
		await Spells.insertMany(spellsData);
		await Consumables.insertMany(consumablesData);

		console.log("Database seeded successfully");
	} catch (err) {
		console.error(err.message);
	}
};

seedDatabase();
