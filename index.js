const express = require("express");
const app = express();
const port = 3000;

// Helper function to roll a die
function rollDie(sides) {
	return Math.floor(Math.random() * sides) + 1;
}

// Helper function to generate a visual representation of a die
function getDieVisual(value, sides) {
	const visuals = {
		4: [" ▲ ", "▲ ▲", "▲▲▲"],
		6: ["[1]", "[2]", "[3]", "[4]", "[5]", "[6]"],
		8: ["<1>", "<2>", "<3>", "<4>", "<5>", "<6>", "<7>", "<8>"],
		10: ["{1}", "{2}", "{3}", "{4}", "{5}", "{6}", "{7}", "{8}", "{9}", "{0}"],
		12: [
			"{1}",
			"{2}",
			"{3}",
			"{4}",
			"{5}",
			"{6}",
			"{7}",
			"{8}",
			"{9}",
			"{10}",
			"{11}",
			"{12}",
		],
		20: [
			"(1)",
			"(2)",
			"(3)",
			"(4)",
			"(5)",
			"(6)",
			"(7)",
			"(8)",
			"(9)",
			"(10)",
			"(11)",
			"(12)",
			"(13)",
			"(14)",
			"(15)",
			"(16)",
			"(17)",
			"(18)",
			"(19)",
			"(20)",
		],
	};
	return visuals[sides] ? visuals[sides][value - 1] : `(${value})`;
}

app.get("/roll/:dice", (req, res) => {
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
				visual: getDieVisual(rollValue, sides),
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

app.listen(port, () => {
	console.log(`Dice roller API running at http://localhost:${port}`);
});
