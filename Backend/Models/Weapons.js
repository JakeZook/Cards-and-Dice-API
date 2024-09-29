const mongoose = require("mongoose");

const WeaponsSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	maxDmg: { type: Number, required: true },
	minDmg: { type: Number, required: true },
	damageType: { type: String, required: true },
	modifier: { type: String, required: true },
	properties: { type: [String], required: true },
	actions: [
		{
			name: { type: String, required: true },
			type: { type: String, required: true },
			dmgDice: { type: String, required: true },
			uses: { type: Number, default: null },
		},
	],
});

const Weapons = mongoose.model("Weapons", WeaponsSchema, "Weapons");
module.exports = Weapons;
