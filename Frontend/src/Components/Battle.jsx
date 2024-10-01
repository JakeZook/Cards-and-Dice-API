import React, { useState, useEffect } from "react";

const Battle = () => {
	const [battleStarted, setBattleStarted] = useState(false);
	const [pickedClass, setPickedClass] = useState(null);
	const [weapon, setWeapon] = useState(null);
	const [armor, setArmor] = useState(null);
	const [spell, setSpell] = useState(null);
	const [monster, setMonster] = useState(null);
	const [monsterHP, setMonsterHP] = useState(null);
	const [currentMonsterHP, setCurrentMonsterHP] = useState(null);
	const [healthPercentage, setHealthPercentage] = useState(null);
	const [roll, setRoll] = useState(null);

	const handleBattleStart = () => {
		setBattleStarted(true);

		const pickedClass = JSON.parse(localStorage.getItem("class"));
		setPickedClass(pickedClass);

		const pickedWeapon = JSON.parse(localStorage.getItem("weapon"));
		setWeapon(pickedWeapon);

		const pickedArmor = JSON.parse(localStorage.getItem("armor"));
		setArmor(pickedArmor);

		const pickedSpell = JSON.parse(localStorage.getItem("spell"));
		setSpell(pickedSpell);

		const pickedMonster = JSON.parse(localStorage.getItem("monster"));
		setMonster(pickedMonster);

		getMonsterHP(pickedMonster);
	};

	const getMonsterHP = (monster) => {
		const maxHP = monster.hitDice + monster.modifier;
		const currentHP = maxHP;

		setMonsterHP(maxHP);
		setCurrentMonsterHP(currentHP);

		const healthPer = (currentHP / maxHP) * 100;
		setHealthPercentage(healthPer);
	};

	const handleActionClick = async (dmgDice) => {
		try {
			const response = await fetch(`http://localhost:3000/roll/${dmgDice}`);
			const fetchedData = await response.json();
			setRoll(fetchedData[0]);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleDoDamage = (roll) => {
		const damage = roll.results[0].value;
		const newHP = currentMonsterHP - damage;
		setCurrentMonsterHP(newHP);

		const healthPer = (newHP / monsterHP) * 100;
		setHealthPercentage(healthPer);
	};

	useEffect(() => {
		if (roll) {
			handleDoDamage(roll);
		}
	}, [roll]);

	return (
		<div className="card lg:card-side bg-neutral shadow-[0_10px_60px_1px_rgba(0,0,0,0.3)] font-press-start w-[60rem] border-4 border-accent border-double shadow-accent flex justify-center items-center">
			{!battleStarted && (
				<div className="flex flex-col items-center justify-center p-8">
					<h2 className="card-title text-accent text-xl pb-6 w-64 text-center justify-center">
						Battle
					</h2>
					<button
						className="btn btn-error btn-lg hover:bg-red-700 hover:scale-110"
						onClick={handleBattleStart}
					>
						Start Battle
					</button>
				</div>
			)}
			{battleStarted && (
				<>
					<div className="card-body text-primary w-[48rem]">
						<div role="tablist" className="tabs tabs-boxed">
							<input
								type="radio"
								name="battleTabs"
								role="tab"
								className="tab"
								aria-label="Selection"
								defaultChecked
							/>
							<div role="tabpanel" className="tab-content p-10 h-[26rem]">
								{weapon && (
									<div>
										{weapon.actions.map((action, index) => (
											<div key={index} className="mb-6">
												<p className="text-lg text-primary">{action.name}</p>
												<p className="text-sm text-green-500">{action.type}</p>
												<p className="text-sm text-error">{action.dmgDice}</p>
												<p className="text-sm text-yellow-500">
													Uses: {action.uses || "Unlimited"}
												</p>
												<button
													className="btn btn-md mt-2 px-4 py-2 bg-green-500 text-black rounded-lg hover:scale-110 hover:bg-green-700"
													onClick={() => handleActionClick(action.dmgDice)}
												>
													Use {action.name}
												</button>
											</div>
										))}
									</div>
								)}
							</div>
							<input
								type="radio"
								name="battleTabs"
								role="tab"
								className="tab"
								aria-label="Request"
							/>
							<div
								role="tabpanel"
								className="tab-content p-10 min-h-96 h-[26rem] font-mono"
							>
								{/* {weapon && (
									<>
										<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
											<div className="mockup-browser-toolbar">
												<div className="input text-sm">
													/weapons?name={weapon.name}
												</div>
											</div>
										</div>
										<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
											<div className="mockup-browser-toolbar">
												<div className="input text-sm">
													/weapons?id={weapon._id}
												</div>
											</div>
										</div>
										<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
											<div className="mockup-browser-toolbar">
												<div className="input text-sm">
													/weapons?type={weapon.type}
												</div>
											</div>
										</div>
										<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
											<div className="mockup-browser-toolbar">
												<div className="input text-sm">
													/weapons?damageType={weapon.damageType}
												</div>
											</div>
										</div>
									</>
								)} */}
								<p className="text-white mt-8 font-press-start text-sm">
									Weapons can be accessed by using /weapons. Weapons can be
									filtered by name, id, weapon type, and damage type.
								</p>
							</div>
							<input
								type="radio"
								name="battleTabs"
								role="tab"
								className="tab"
								aria-label="Response"
							/>
							<div
								role="tabpanel"
								className="tab-content p-10 min-h-96 h-[26rem]"
							>
								<h4 className="text-accent p-0 text-xl">JSON:</h4>
								{/* {weapon && <JsonViewer json={weapon} />} */}
							</div>
						</div>
					</div>
					<div className="flex flex-col items-center justify-start p-8">
						{monster && (
							<>
								<h2 className="card-title text-accent text-xl w-64 text-center justify-center">
									{monster.name}
								</h2>
								<h3 className="card-title text-white text-xs pb-8 text-center justify-center">
									AC: {monster.ac}
								</h3>
								<img
									src={monster.img}
									className="mask mask-circle max-h-64 max-w-64"
									alt="Image of monster"
								/>
								<div className="p-4 w-full max-w-md">
									<div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
										<div
											className={`h-full bg-green-500 transition-all duration-300`}
											style={{ width: `${healthPercentage}%` }}
										/>
									</div>
									<p className="text-xs text-center mt-4">
										Health: {currentMonsterHP}/{monsterHP}
									</p>
								</div>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Battle;
