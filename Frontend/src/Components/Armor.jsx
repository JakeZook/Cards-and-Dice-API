import { useState, useEffect } from "react";

import JsonViewer from "./JSONViwer";

const Armor = () => {
	const armorTypes = ["Light", "Medium", "Heavy"];

	const [armor, setArmor] = useState(null);
	const [armorType, setArmorType] = useState("Light");

	const fetchArmorByType = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/armor?type=${armorType}`
			);
			const fetchedData = await response.json();
			console.log("Fetched Data:", fetchedData);
			if (fetchedData.length > 0) {
				const randomArmor = chooseRandomArmor(fetchedData);
				setArmor(randomArmor);
			} else {
				console.log("No armor found for this type.");
				setArmor(null);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleSelectArmorType = (type) => {
		setArmorType(type);
	};

	const chooseRandomArmor = (armors) => {
		return armors[Math.floor(Math.random() * armors.length)];
	};

	useEffect(() => {
		fetchArmorByType();
	}, []);

	useEffect(() => {
		console.log("Selected Armor:", armor);
	}, [armor]);

	return (
		<div className="card lg:card-side bg-neutral shadow-[0_10px_60px_1px_rgba(0,0,0,0.3)] font-press-start w-[60rem] border-4 border-accent border-double shadow-accent flex items-center">
			<div className="flex flex-col items-center justify-start p-8">
				{armor && (
					<>
						<h2 className="card-title text-accent text-xl pb-6 w-64 text-center justify-center">
							{armor.name}
						</h2>
						<h3 className="text-green-500 text-lg">{armor.type}</h3>
						<h3 className="text-primary text-md">Armor Class: {armor.ac}</h3>
						<p className="text-yellow-500 text-sm text-center mt-8">
							Cost: {armor.cost}
						</p>
						<p className="text-white text-sm text-center">
							Weight: {armor.weight}
						</p>
						<p className="text-primary text-sm text-center mb-12">
							Req. Strength: {armor.reqStrength}
						</p>
						{armor.stealthDisadvantage == false ? (
							<p className="text-green-500 text-sm text-center">
								No Stealth Disadvantage
							</p>
						) : (
							<p className="text-error text-sm text-center">
								Stealth Disadvantage
							</p>
						)}
					</>
				)}
			</div>
			<div className="card-body text-primary w-[48rem]">
				<div role="tablist" className="tabs tabs-boxed">
					<input
						type="radio"
						name="armorTabs"
						role="tab"
						className="tab"
						aria-label="Selection"
						defaultChecked
					/>
					<div role="tabpanel" className="tab-content p-10 h-[26rem]">
						<div className="border-l-4 border-secondary pl-6">
							{armorTypes.map((c) => (
								<div className="form-control" key={c}>
									<label className="label cursor-pointer">
										<span className="label-text text-accent text-lg">{c}</span>
										<input
											type="radio"
											name="armor-radio"
											className="radio radio-primary"
											checked={armorType === c}
											onChange={() => handleSelectArmorType(c)}
										/>
									</label>
								</div>
							))}
						</div>
						<div className="flex justify-center">
							<button
								className="btn bg-green-500 text-lg text-black hover:scale-110 hover:bg-green-700 m-4 mt-6"
								onClick={fetchArmorByType}
							>
								Generate Armor
							</button>
						</div>
					</div>
					<input
						type="radio"
						name="armorTabs"
						role="tab"
						className="tab"
						aria-label="Request"
					/>
					<div
						role="tabpanel"
						className="tab-content p-10 min-h-96 h-[26rem] font-mono"
					>
						{armor && (
							<>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/armor?name={armor.name}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/armor?cost={armor.cost}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/armor?weight={armor.weight}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/armor?stealthDisadvantage={armor.stealthDisadvantage}
										</div>
									</div>
								</div>
							</>
						)}
						<p className="text-white mt-4 font-press-start text-sm">
							Armor can be accessed by using /armor. Armor can be filtered by
							name, id, type, AC modifier, weight, cost, required strength, and
							stealth disadvantage.
						</p>
					</div>
					<input
						type="radio"
						name="armorTabs"
						role="tab"
						className="tab"
						aria-label="Response"
					/>
					<div role="tabpanel" className="tab-content p-10 min-h-96 h-[26rem]">
						<h4 className="text-accent p-0 text-xl">JSON:</h4>
						{armor && <JsonViewer json={armor} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Armor;
