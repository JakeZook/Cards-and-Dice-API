const express = require("express");
const router = express.Router();
const monsters = require("../Models/Monsters");

router.get("/", (req, res) => {
	let results = monsters;

	// Filter by name (case-insensitive)
	if (req.query.name) {
		const monsterName =
			req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
		results = results.filter(
			(m) => m.name.toLowerCase() === monsterName.toLowerCase()
		);
	}

	// Filter by id
	if (req.query.id) {
		const monsterId = parseInt(req.query.id, 10);
		results = results.filter((m) => m.id === monsterId);
	}

	// Filter by type (case-insensitive)
	if (req.query.type) {
		const monsterType =
			req.query.type.charAt(0).toUpperCase() + req.query.type.slice(1);
		results = results.filter(
			(m) => m.type.toLowerCase() === monsterType.toLowerCase()
		);
	}

	// Filter by AC
	if (req.query.ac) {
		const monsterAC = parseInt(req.query.ac, 10);
		results = results.filter((m) => m.ac <= monsterAC);
	}

	// Filter by alignment (case-insensitive)
	if (req.query.alignment) {
		const monsterAlignment =
			req.query.alignment.charAt(0).toUpperCase() +
			req.query.alignment.slice(1);
		results = results.filter(
			(m) => m.alignment.toLowerCase() === monsterAlignment.toLowerCase()
		);
	}

	// Filter by speed
	if (req.query.speed) {
		const monsterSpeed = parseInt(req.query.speed, 10);
		results = results.filter((m) => m.speed <= monsterSpeed);
	}

	// Filter by size (case-insensitive)
	if (req.query.size) {
		const monsterSize =
			req.query.size.charAt(0).toUpperCase() + req.query.size.slice(1);
		results = results.filter(
			(m) => m.size.toLowerCase() === monsterSize.toLowerCase()
		);
	}

	if (results.length > 0) {
		res.json(results);
	} else {
		res.status(404).json({ error: "No monsters found matching the criteria" });
	}
});

module.exports = router;
