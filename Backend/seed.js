const mongoose = require("mongoose");
const connectDB = require("./db");

const Armor = require("./Models/Armor");
const Classes = require("./Models/Classes");
const Monsters = require("./Models/Monsters");

const armorData = require("./Data/Armor");
const classesData = require("./Data/Classes");
const monstersData = require("./Data/Monsters");

const seedDatabase = async () => {
	try {
		// Connect to database
		connectDB();

		// Clear existing data
		await Armor.deleteMany({});
		await Classes.deleteMany({});
		await Monsters.deleteMany({});

		// Insert new data
		await Armor.insertMany(armorData);
		await Classes.insertMany(classesData);
		await Monsters.insertMany(monstersData);

		console.log("Database seeded successfully");
	} catch (err) {
		console.error(err.message);
	}
};

seedDatabase();
