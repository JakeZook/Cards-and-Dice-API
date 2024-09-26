const express = require("express");
const router = express.Router();
const Classes = require("../Models/Classes");

// Get all classes or filter
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

		// Filter by primaryAbility
		if (req.query.primaryAbility) {
			query.primaryAbility = req.query.primaryAbility;
		}

		const results = await Classes.find(query);

		if (results.length > 0) {
			res.json(results);
		} else {
			res.status(404).json({ error: "No Classes found matching the criteria" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
