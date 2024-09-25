const express = require("express");
const router = express.Router();
const classes = require("../Models/Classes");

router.get("/", (req, res) => {
	res.json(classes);
});

router.get("/:name", (req, res) => {
	const request = req.params.name;
	const className = request.charAt(0).toUpperCase() + request.slice(1);
	const foundClass = classes.find(
		(c) => c.name.toLowerCase() === className.toLowerCase()
	);

	if (foundClass) {
		res.json(foundClass);
	} else {
		res.status(404).json({ error: `Class ${className} not found` });
	}
});

router.get("/id/:id", (req, res) => {
	const classId = parseInt(req.params.id, 10);
	const foundClass = classes.find((c) => c.id === classId);

	if (foundClass) {
		res.json(foundClass);
	} else {
		res.status(404).json({ error: `Class with ID ${classId} not found` });
	}
});

module.exports = router;
