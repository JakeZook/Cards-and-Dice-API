const mongoose = require("mongoose");

const ArmorSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	cost: { type: Number, required: true },
	ac: { type: Number, required: true },
	reqStrength: { type: Number, default: 0 },
	stealthDisadvantage: { type: Boolean, required: true },
	weight: { type: Number, required: true },
});

const Armor = mongoose.model("Armor", ArmorSchema, "Armor");

module.exports = Armor;
