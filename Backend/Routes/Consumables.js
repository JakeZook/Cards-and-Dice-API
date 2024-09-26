const express = require("express");
const router = express.Router();
const Consumables = require("../Models/Consumables");

// Get all consumable or filter
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

		// Filter by hit dice
		if (req.query.hitDice) {
			query.hitDice = { $lte: parseInt(req.query.hitDice, 10) };
		}

		// Filter by cost
		if (req.query.cost) {
			query.cost = { $lte: parseInt(req.query.cost, 10) };
		}

		const results = await Consumables.find(query);

		if (results.length > 0) {
			res.json(results);
		} else {
			res.status(404).json({ error: "No armor found matching the criteria" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
