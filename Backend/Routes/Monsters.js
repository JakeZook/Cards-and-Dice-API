const express = require("express");
const router = express.Router();
const Monsters = require("../Models/Monsters");

// Get all monsters or filter
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

		// Filter by hitDice
		if (req.query.hitDice) {
			query.hitDice = req.query.hitDice;
		}

		// Filter by type
		if (req.query.type) {
			query.type = req.query.type;
		}

		// Filter by size
		if (req.query.size) {
			query.size = req.query.size;
		}

		// Filter by alignment
		if (req.query.alignment) {
			query.alignment = req.query.alignment;
		}

		// Filter by difficulty
		if (req.query.difficulty) {
			query.difficulty = req.query.difficulty;
		}

		// Filter by ac
		if (req.query.ac) {
			query.ac = req.query.ac;
		}

		// Filter by xp
		if (req.query.xp) {
			query.xp = req.query.xp;
		}

		const results = await Monsters.find(query);

		if (results.length > 0) {
			res.json(results);
		} else {
			res
				.status(404)
				.json({ error: "No Monsters found matching the criteria" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
