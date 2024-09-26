const mongoose = require("mongoose");

const ClassesSchema = new mongoose.Schema({
	name: { type: String, required: true },
	stats: {
		str: { type: Number, required: true },
		dex: { type: Number, required: true },
		con: { type: Number, required: true },
		int: { type: Number, required: true },
		wis: { type: Number, required: true },
		cha: { type: Number, required: true },
	},
	hitDice: { type: Number, required: true },
	proficiencies: { type: [String], required: true },
	primaryAbility: { type: String, required: true },
	savingThrows: { type: [String], required: true },
});

const Classes = mongoose.model("Classes", ClassesSchema, "Classes");
module.exports = Classes;
