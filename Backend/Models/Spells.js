const mongoose = require("mongoose");

const SpellsSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	effect: { type: String, required: true },
	school: { type: String, required: true },
	hitDice: { type: Number, default: 0 },
	dmgType: { type: String, default: null },
	modifier: { type: String, required: true },
	desc: { type: String, required: true },
});

const Spells = mongoose.model("Spells", SpellsSchema, "Spells");
module.exports = Spells;
