const mongoose = require("mongoose");

const WeaponsSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	maxDmg: { type: Number, required: true },
	minDmg: { type: Number, required: true },
	damageType: { type: String, required: true },
	modifier: { type: String, required: true },
	properties: { type: [String], required: true },
});

const Weapons = mongoose.model("Weapons", WeaponsSchema, "Weapons");
module.exports = Weapons;
