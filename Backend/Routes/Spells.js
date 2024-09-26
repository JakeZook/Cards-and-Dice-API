const express = require("express");
const router = express.Router();
const Spells = require("../Models/Spells");

// Get all spells or filter
router.get("/", async (req, res) => {
	try {
		let query = {};

		// Filter by name (case-insensitive)
		if (req.query.name) {
			query.name = new RegExp(req.query.name, "i"); // Case-insensitive regex
		}

		// Filter by id
		if (req.query.id) {
			query._id = req.query.id;
		}

		// Filter by type (case-insensitive)
		if (req.query.type) {
			query.type = new RegExp(req.query.type, "i"); // Case-insensitive regex
		}

		// Filter by effect (case-insensitive)
		if (req.query.effect) {
			query.effect = new RegExp(req.query.effect, "i"); // Case-insensitive regex
		}

		// Filter by school (case-insensitive)
		if (req.query.school) {
			query.school = new RegExp(req.query.school, "i"); // Case-insensitive regex
		}

		// Filter by hit dice
		if (req.query.hitDice) {
			query.hitDice = { $lte: parseInt(req.query.hitDice, 10) };
		}

		// Filter by damage type (case-insensitive)
		if (req.query.dmgType) {
			query.dmgType = new RegExp(req.query.dmgType, "i"); // Case-insensitive regex
		}

		// Filter by modifier (case-insensitive)
		if (req.query.modifier) {
			query.modifier = new RegExp(req.query.modifier, "i"); // Case-insensitive regex
		}

		const results = await Spells.find(query);

		if (results.length > 0) {
			res.json(results);
		} else {
			res.status(404).json({ error: "No spells found matching the criteria" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
