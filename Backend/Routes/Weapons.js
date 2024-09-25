const express = require("express");
const router = express.Router();
const weapons = require("../Models/Weapons");

router.get("/", (req, res) => {
	res.json(weapons);
});

router.get("/:name", (req, res) => {
	const request = req.params.name;
	const weaponName = request.charAt(0).toUpperCase() + request.slice(1);
	const foundWeapon = weapons.find(
		(w) => w.name.toLowerCase() === weaponName.toLowerCase()
	);

	if (foundWeapon) {
		res.json(foundWeapon);
	} else {
		res.status(404).json({ error: `Weapon ${weaponName} not found` });
	}
});

router.get("/id/:id", (req, res) => {
	const weaponId = parseInt(req.params.id, 10);
	const foundWeapon = weapons.find((w) => w.id === weaponId);

	if (foundWeapon) {
		res.json(foundWeapon);
	} else {
		res.status(404).json({ error: `Weapon with ID ${weaponId} not found` });
	}
});

router.get("/type/:type", (req, res) => {
	const request = req.params.type;
	const weaponType = request.charAt(0).toUpperCase() + request.slice(1);
	const foundWeapons = weapons.filter(
		(w) => w.type.toLowerCase() === weaponType.toLowerCase()
	);

	if (foundWeapons.length > 0) {
		res.json(foundWeapons);
	} else {
		res.status(404).json({ error: `Weapons of type ${weaponType} not found` });
	}
});

router.get("/damageType/:damageType", (req, res) => {
	const request = req.params.damageType;
	const weaponDamageType = request.charAt(0).toUpperCase() + request.slice(1);
	const foundWeapons = weapons.filter(
		(w) => w.damageType.toLowerCase() === weaponDamageType.toLowerCase()
	);

	if (foundWeapons.length > 0) {
		res.json(foundWeapons);
	} else {
		res.status(404).json({
			error: `Weapons with damage type ${weaponDamageType} not found`,
		});
	}
});

router.get("/modifier/:modifier", (req, res) => {
	const request = req.params.modifier;
	const weaponModifier = request.charAt(0).toUpperCase() + request.slice(1);
	const foundWeapons = weapons.filter(
		(w) => w.modifier.toLowerCase() === weaponModifier.toLowerCase()
	);

	if (foundWeapons.length > 0) {
		res.json(foundWeapons);
	} else {
		res
			.status(404)
			.json({ error: `Weapons with modifier ${weaponModifier} not found` });
	}
});

router.get("/properties/:property", (req, res) => {
	const request = req.params.property;
	const weaponProperty = request.charAt(0).toUpperCase() + request.slice(1);
	const foundWeapons = weapons.filter((w) =>
		w.properties.includes(weaponProperty)
	);

	if (foundWeapons.length > 0) {
		res.json(foundWeapons);
	} else {
		res
			.status(404)
			.json({ error: `Weapons with property ${weaponProperty} not found` });
	}
});

module.exports = router;
