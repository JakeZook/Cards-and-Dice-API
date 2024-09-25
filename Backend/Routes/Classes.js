const express = require("express");
const router = express.Router();
const classes = require("../Models/Classes");

router.get("/", (req, res) => {
	let results = classes;

	// Filter by name (case-insensitive)
	if (req.query.name) {
		const className =
			req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
		results = results.filter(
			(c) => c.name.toLowerCase() === className.toLowerCase()
		);
	}

	// Filter by id
	if (req.query.id) {
		const classId = parseInt(req.query.id, 10);
		results = results.filter((c) => c.id === classId);
	}

	// Check if any results found
	if (results.length > 0) {
		res.json(results);
	} else {
		res.status(404).json({ error: "No classes found matching the criteria" });
	}
});

module.exports = router;
