const express = require("express");
const router = express.Router();
const Weapons = require("../Models/Weapons");

// Get all weapons or filter
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

		// Filter by damage type
		if (req.query.damageType) {
			query.damageType = req.query.damageType;
		}

		// Filter by type
		if (req.query.type) {
			query.type = new RegExp(req.query.type, "i"); // Case-insensitive regex
		}

		const results = await Weapons.find(query);

		if (results.length > 0) {
			res.json(results);
		} else {
			res.status(404).json({ error: "No Weapons found matching the criteria" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
