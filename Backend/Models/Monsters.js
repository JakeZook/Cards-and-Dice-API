const mongoose = require("mongoose");

const MonstersSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	size: { type: String, required: true },
	alignment: { type: String, required: true },
	difficulty: { type: String, required: true },
	ac: { type: Number, required: true },
	hitDice: { type: Number, required: true },
	modifier: { type: Number, required: true },
	xp: { type: Number, required: true },
	img: { type: String, required: true },
	stats: {
		str: { type: Number, required: true },
		dex: { type: Number, required: true },
		con: { type: Number, required: true },
		int: { type: Number, required: true },
		wis: { type: Number, required: true },
		cha: { type: Number, required: true },
	},
	actions: [
		{
			name: { type: String, required: true },
			type: { type: String, required: true },
			dmgDice: { type: Number, required: true },
			modifier: { type: Number, required: true },
			dmgType: { type: String, required: true },
			uses: { type: Number, default: null },
		},
	],
	weaknesses: { type: [String], required: true },
	resistances: { type: [String], required: true },
	immunities: { type: [String], required: true },
});

const Monsters = mongoose.model("Monsters", MonstersSchema, "Monsters");
module.exports = Monsters;
