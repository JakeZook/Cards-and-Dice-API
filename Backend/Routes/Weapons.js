const express = require("express");
const router = express.Router();
const weapons = require("../Models/Weapons");

router.get("/", (req, res) => {
	let results = weapons;

	// Filter by name (case-insensitive)
	if (req.query.name) {
		const weaponName =
			req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
		results = results.filter(
			(w) => w.name.toLowerCase() === weaponName.toLowerCase()
		);
	}

	// Filter by id
	if (req.query.id) {
		const weaponId = parseInt(req.query.id, 10);
		results = results.filter((w) => w.id === weaponId);
	}

	// Filter by type (case-insensitive)
	if (req.query.type) {
		const weaponType =
			req.query.type.charAt(0).toUpperCase() + req.query.type.slice(1);
		results = results.filter(
			(w) => w.type.toLowerCase() === weaponType.toLowerCase()
		);
	}

	// Filter by damage type (case-insensitive)
	if (req.query.damageType) {
		const weaponDamageType =
			req.query.damageType.charAt(0).toUpperCase() +
			req.query.damageType.slice(1);
		results = results.filter(
			(w) => w.damageType.toLowerCase() === weaponDamageType.toLowerCase()
		);
	}

	// Filter by modifier (case-insensitive)
	if (req.query.modifier) {
		const weaponModifier =
			req.query.modifier.charAt(0).toUpperCase() + req.query.modifier.slice(1);
		results = results.filter(
			(w) => w.modifier.toLowerCase() === weaponModifier.toLowerCase()
		);
	}

	// Filter by properties (case-insensitive, property may be an array)
	if (req.query.property) {
		const weaponProperty =
			req.query.property.charAt(0).toUpperCase() + req.query.property.slice(1);
		results = results.filter((w) => w.properties.includes(weaponProperty));
	}

	// Check if any results found
	if (results.length > 0) {
		res.json(results);
	} else {
		res.status(404).json({ error: "No weapons found matching the criteria" });
	}
});

module.exports = router;
