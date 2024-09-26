const express = require("express");
const router = express.Router();
const Armor = require("../Models/Armor");

// Get all armors or filter
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

		// Filter by AC modifier
		if (req.query.ac) {
			query.ac = { $lte: parseInt(req.query.ac, 10) };
		}

		// Filter by weight
		if (req.query.weight) {
			query.weight = { $lte: parseInt(req.query.weight, 10) };
		}

		// Filter by cost
		if (req.query.cost) {
			query.cost = { $lte: parseInt(req.query.cost, 10) };
		}

		// Filter by required strength
		if (req.query.str) {
			query.reqStrength = { $lte: parseInt(req.query.str, 10) };
		}

		// Filter by stealth disadvantage
		if (req.query.stealth) {
			query.stealthDisadvantage = req.query.stealth === "true";
		}

		const results = await Armor.find(query);

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
