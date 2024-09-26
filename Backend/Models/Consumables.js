const mongoose = require("mongoose");

const ConsumablesSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	effect: { type: String, required: true },
	hitDice: { type: Number, required: true },
	cost: { type: Number, required: true },
	desc: { type: String, required: true },
});

const Consumables = mongoose.model(
	"Consumables",
	ConsumablesSchema,
	"Consumables"
);
module.exports = Consumables;
