const express = require("express");
const router = express.Router();
const armor = require("../Models/Armor");

router.get("/", (req, res) => {
	let results = armor;

	// Filter by name (case-insensitive)
	if (req.query.name) {
		const armorName =
			req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
		results = results.filter(
			(a) => a.name.toLowerCase() === armorName.toLowerCase()
		);
	}

	// Filter by id
	if (req.query.id) {
		const armorId = parseInt(req.query.id, 10);
		results = results.filter((a) => a.id === armorId);
	}

	// Filter by type (case-insensitive)
	if (req.query.type) {
		const armorType =
			req.query.type.charAt(0).toUpperCase() + req.query.type.slice(1);
		results = results.filter(
			(a) => a.type.toLowerCase() === armorType.toLowerCase()
		);
	}

	// Filter by AC modifier
	if (req.query.ac) {
		const armorModifier = parseInt(req.query.ac, 10);
		results = results.filter((a) => a.ac <= armorModifier);
	}

	// Filter by weight
	if (req.query.weight) {
		const armorWeight = parseInt(req.query.weight, 10);
		results = results.filter((a) => a.weight <= armorWeight);
	}

	// Filter by cost
	if (req.query.cost) {
		const armorCost = parseInt(req.query.cost, 10);
		results = results.filter((a) => a.cost <= armorCost);
	}

	// Filter by required strength
	if (req.query.str) {
		const armorStrength = parseInt(req.query.str, 10);
		results = results.filter((a) => a.reqStrength <= armorStrength);
	}

	// Filter by stealth disadvantage
	if (req.query.stealth) {
		const armorStealth = req.query.stealth === "true";
		results = results.filter((a) => a.stealthDisadvantage !== armorStealth);
	}

	// Check if any results found
	if (results.length > 0) {
		res.json(results);
	} else {
		res.status(404).json({ error: "No armor found matching the criteria" });
	}
});

module.exports = router;
