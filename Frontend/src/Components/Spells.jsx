import { useState, useEffect } from "react";

import JsonViewer from "./JSONViwer";

const Spells = () => {
	const spellTypes = ["Debuff", "Damage", "Utility", "Healing"];

	const [spell, setSpell] = useState(null);
	const [spellType, setSpellType] = useState("Damage");

	const fetchSpellsByType = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/spells?type=${spellType}`
			);
			const fetchedData = await response.json();
			if (fetchedData.length > 0) {
				const randomSpell = chooseRandomSpell(fetchedData);
				setSpell(randomSpell);
			} else {
				console.log("No spells found for this type.");
				setSpell(null);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleSelectSpellType = (type) => {
		setSpellType(type);
	};

	const chooseRandomSpell = (spells) => {
		return spells[Math.floor(Math.random() * spells.length)];
	};

	useEffect(() => {
		fetchSpellsByType();
	}, []);

	useEffect(() => {
		localStorage.setItem("spell", JSON.stringify(spell));
	}, [spell]);

	return (
		<div className="card lg:card-side bg-neutral shadow-[0_10px_60px_1px_rgba(0,0,0,0.3)] font-press-start w-[60rem] border-4 border-accent border-double shadow-accent flex items-center">
			<div className="card-body text-primary w-[48rem]">
				<div role="tablist" className="tabs tabs-boxed">
					<input
						type="radio"
						name="spellTabs"
						role="tab"
						className="tab"
						aria-label="Selection"
						defaultChecked
					/>
					<div role="tabpanel" className="tab-content p-10 h-[26rem]">
						<div className="border-l-4 border-secondary pl-6">
							{spellTypes.map((c) => (
								<div className="form-control" key={c}>
									<label className="label cursor-pointer">
										<span className="label-text text-accent text-lg">{c}</span>
										<input
											type="radio"
											name="spell-radio"
											className="radio radio-primary"
											checked={spellType === c}
											onChange={() => handleSelectSpellType(c)}
										/>
									</label>
								</div>
							))}
						</div>
						<div className="flex justify-center">
							<button
								className="btn bg-green-500 text-lg text-black hover:scale-110 hover:bg-green-700 m-4 mt-6"
								onClick={fetchSpellsByType}
							>
								Generate Spells
							</button>
						</div>
					</div>
					<input
						type="radio"
						name="spellTabs"
						role="tab"
						className="tab"
						aria-label="Request"
					/>
					<div
						role="tabpanel"
						className="tab-content p-10 min-h-96 h-[26rem] font-mono"
					>
						{spell && (
							<>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/spells?type={spell.type}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/spells?effect={spell.effect}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/spells?school={spell.school}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/spells?damageType={spell.modifier}
										</div>
									</div>
								</div>
							</>
						)}
						<p className="text-white mt-2 font-press-start text-sm">
							Spells can be accessed by using /spells. Spells can be filtered by
							name, id, type, effect, school, hit dice, modifier, and damage
							type.
						</p>
					</div>
					<input
						type="radio"
						name="spellTabs"
						role="tab"
						className="tab"
						aria-label="Response"
					/>
					<div role="tabpanel" className="tab-content p-10 min-h-96 h-[26rem]">
						<h4 className="text-accent p-0 text-xl">JSON:</h4>
						{spell && <JsonViewer json={spell} />}
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center justify-start p-8 w-72">
				{spell && (
					<>
						<h2 className="card-title text-accent text-xl pb-2 mt-6 w-64 text-center justify-center">
							{spell.name}
						</h2>
						<p className="text-green-500 text-xs text-center">{spell.effect}</p>
						{spell.hitDice && (
							<p className="text-red-500 text-xs text-center mt-6">
								d{spell.hitDice} {spell.dmgType} damage
							</p>
						)}
						<p className="text-primary text-xs text-center">{spell.school}</p>
						<p className="text-yellow-500 text-xs text-center mt-6">
							{spell.modifier}
						</p>
						<p className="text-white text-xs text-center mt-6">{spell.desc}</p>
					</>
				)}
			</div>
		</div>
	);
};

export default Spells;
