const classes = [
	{
		name: "Fighter",
		stats: {
			str: 14,
			dex: 12,
			con: 16,
			int: 8,
			wis: 8,
			cha: 12,
		},
		hitDice: 10,
		proficiencies: [
			"Light Armor",
			"Medium Armor",
			"Heavy Armor",
			"Shields",
			"Simple Weapons",
			"Martial Weapons",
			"Crossbows",
		],
		primaryAbility: "Constitution",
		savingThrows: ["Strength", "Constitution"],
		startingEquipment: [
			{
				type: "Armor",
				name: "Chain Mail",
			},
			{
				type: "Armor",
				name: "Shield",
			},
			{
				type: "Weapon",
				name: "Crossbow",
			},
			{
				type: "Weapon",
				name: "Longsword",
			},
		],
	},
	{
		name: "Barbarian",
		stats: {
			str: 17,
			dex: 11,
			con: 16,
			int: 8,
			wis: 10,
			cha: 10,
		},
		hitDice: 12,
		proficiencies: [
			"Light Armor",
			"Medium Armor",
			"Shields",
			"Simple Weapons",
			"Martial Weapons",
		],
		primaryAbility: "Strength",
		savingThrows: ["Strength", "Constitution"],
		startingEquipment: [
			{
				type: "Armor",
				name: "Leather",
			},
			{
				type: "Weapon",
				name: "Greataxe",
			},
		],
	},
	{
		name: "Rogue",
		stats: {
			str: 10,
			dex: 16,
			con: 12,
			int: 12,
			wis: 8,
			cha: 14,
		},
		hitDice: 8,
		proficiencies: ["Light Armor", "Simple Weapons", "Crossbows", "Bows"],
		primaryAbility: "Dexterity",
		savingThrows: ["Dexterity", "Charisma"],
		startingEquipment: [
			{
				type: "Armor",
				name: "Padded",
			},
			{
				type: "Weapon",
				name: "Dagger",
			},
			{
				type: "Weapon",
				name: "Shortbow",
			},
		],
	},
	{
		name: "Wizard",
		stats: {
			str: 8,
			dex: 12,
			con: 14,
			int: 16,
			wis: 12,
			cha: 10,
		},
		hitDice: 6,
		proficiencies: ["Simple Weapons", "Quarterstaffs"],
		primaryAbility: "Intelligence",
		savingThrows: ["Intelligence", "Constitution"],
		startingEquipment: [
			{
				type: "Weapon",
				name: "Quarterstaff",
			},
		],
	},
	{
		name: "Bard",
		stats: {
			str: 8,
			dex: 14,
			con: 12,
			int: 10,
			wis: 12,
			cha: 16,
		},
		hitDice: 8,
		proficiencies: ["Light Armor", "Simple Weapons", "Instruments"],
		primaryAbility: "Charisma",
		savingThrows: ["Dexterity", "Charisma"],
		startingEquipment: [
			{
				type: "Armor",
				name: "Leather",
			},
			{
				type: "Weapon",
				name: "ShortSword",
			},
			{
				type: "Instrument",
				name: "Lute",
			},
		],
	},
	{
		name: "Cleric",
		stats: {
			str: 12,
			dex: 10,
			con: 14,
			int: 8,
			wis: 16,
			cha: 12,
		},
		hitDice: 8,
		proficiencies: [
			"Light Armor",
			"Medium Armor",
			"Shields",
			"Simple Weapons",
			"Bows",
		],
		primaryAbility: "Wisdom",
		savingThrows: ["Wisdom", "Constitution"],
		startingEquipment: [
			{
				type: "Armor",
				name: "Chain Shirt",
			},
			{
				type: "Weapon",
				name: "Mace",
			},
			{
				type: "Weapon",
				name: "Shield",
			},
		],
	},
];

module.exports = classes;
