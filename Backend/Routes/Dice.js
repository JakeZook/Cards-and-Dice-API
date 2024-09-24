const express = require("express");
const router = express.Router();

// Helper function to roll a die
function rollDie(sides) {
	return Math.floor(Math.random() * sides) + 1;
}

router.get("/:dice", (req, res) => {
	const diceQuery = req.params.dice.toLowerCase().split(",");

	const results = diceQuery.map((die) => {
		const match = die.match(/^(\d*)d(\d+)$/);
		if (!match) {
			return { error: `Invalid format for die: ${die}` };
		}

		const numRolls = parseInt(match[1], 10) || 1;
		const sides = parseInt(match[2], 10);

		if (sides < 2) {
			return { error: `Invalid die sides: ${sides}. It must be 2 or greater.` };
		}

		const rolls = [];
		for (let i = 0; i < numRolls; i++) {
			const rollValue = rollDie(sides);
			rolls.push({
				value: rollValue,
			});
		}

		return {
			dieType: `d${sides}`,
			rolled: numRolls,
			results: rolls,
		};
	});

	res.json(results);
});

module.exports = router;
