import { useState, useEffect } from "react";

import JsonViewer from "./JSONViwer";

const Monsters = () => {
	const monsterTypes = [
		"Beast",
		"Humanoid",
		"Undead",
		"Dragon",
		"Elemental",
		"Monstrosity",
	];

	const [monster, setMonster] = useState(null);
	const [monsterType, setMonsterType] = useState("Beast");

	const fetchMonsterByType = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/monsters?type=${monsterType}`
			);
			const fetchedData = await response.json();
			if (fetchedData.length > 0) {
				const randomMonster = chooseRandomMonster(fetchedData);
				setMonster(randomMonster);
			} else {
				setArmor(null);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleSelectMonsterType = (type) => {
		setMonsterType(type);
	};

	const chooseRandomMonster = (monster) => {
		return monster[Math.floor(Math.random() * monster.length)];
	};

	useEffect(() => {
		fetchMonsterByType();
	}, []);

	useEffect(() => {
		localStorage.setItem("monster", JSON.stringify(monster));
	}, [monster]);

	return (
		<div className="card lg:card-side bg-neutral shadow-[0_10px_60px_1px_rgba(0,0,0,0.3)] font-press-start w-[60rem] border-4 border-accent border-double shadow-accent flex items-center">
			<div className="flex flex-col items-center justify-start p-8">
				{monster && (
					<>
						<h2 className="card-title text-accent text-xl pb-6 w-64 text-center justify-center">
							{monster.name}
						</h2>
						<img
							src={monster.img}
							className="mask mask-circle max-h-64 max-w-64"
							alt="Image of monster"
						/>
						<h3 className="text-green-500 text-lg mt-4">{monster.size}</h3>
						<h3 className="text-primary text-xs text-nowrap">
							Difficulty: {monster.difficulty}
						</h3>
						<h3 className="text-error text-xs text-nowrap">
							{monster.alignment}
						</h3>
						<p className="text-white text-sm text-center">AC: {monster.ac}</p>
						<p className="text-yellow-500 text-sm text-center">
							XP: {monster.xp}
						</p>
					</>
				)}
			</div>
			<div className="card-body text-primary w-[48rem]">
				<div role="tablist" className="tabs tabs-boxed">
					<input
						type="radio"
						name="monsterTabs"
						role="tab"
						className="tab"
						aria-label="Selection"
						defaultChecked
					/>
					<div role="tabpanel" className="tab-content p-10 h-[26rem]">
						<div className="border-l-4 border-secondary pl-6">
							{monsterTypes.map((c) => (
								<div className="form-control" key={c}>
									<label className="label cursor-pointer">
										<span className="label-text text-accent text-lg">{c}</span>
										<input
											type="radio"
											name="monster-radio"
											className="radio radio-primary"
											checked={monsterType === c}
											onChange={() => handleSelectMonsterType(c)}
										/>
									</label>
								</div>
							))}
						</div>
						<div className="flex justify-center">
							<button
								className="btn bg-green-500 text-lg text-black hover:scale-110 hover:bg-green-700 m-4 mt-6"
								onClick={fetchMonsterByType}
							>
								Generate Monster
							</button>
						</div>
					</div>
					<input
						type="radio"
						name="monsterTabs"
						role="tab"
						className="tab"
						aria-label="Request"
					/>
					<div
						role="tabpanel"
						className="tab-content p-10 min-h-96 h-[26rem] font-mono"
					>
						{monster && (
							<>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/monsters?name={monster.name}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/monsters?size={monster.size}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/monsters?alignment={monster.alignment}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/monsters?difficulty={monster.difficulty}
										</div>
									</div>
								</div>
							</>
						)}
						<p className="text-white mt-2 font-press-start text-sm">
							Monsters can be accessed by using /monsters. Monsters can be
							filtered by name, id, size, type, hit dice, AC modifier,
							alignment, difficulty, and xp.
						</p>
					</div>
					<input
						type="radio"
						name="monsterTabs"
						role="tab"
						className="tab"
						aria-label="Response"
					/>
					<div
						role="tabpanel"
						className="tab-content p-10 min-h-96 h-[26rem] min-w-48"
					>
						<h4 className="text-accent p-0 text-xl">JSON:</h4>
						{monster && <JsonViewer json={monster} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Monsters;
