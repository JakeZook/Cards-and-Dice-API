import { useState, useEffect } from "react";

import JsonViewer from "./JSONViwer";

const Weapons = () => {
	const weaponTypes = ["Simple", "Martial", "Bows"];

	const [data, setData] = useState(null);
	const [weapon, setWeapon] = useState(null);
	const [weaponType, setWeaponType] = useState("Simple");

	const fetchWeaponsByType = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/weapons?type=${weaponType}`
			);
			const fetchedData = await response.json();
			console.log("Fetched Data:", fetchedData);
			if (fetchedData.length > 0) {
				const randomWeapon = chooseRandomWeapon(fetchedData);
				setWeapon(randomWeapon);
			} else {
				console.log("No weapons found for this type.");
				setWeapon(null);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleSelectWeaponType = (type) => {
		setWeaponType(type);
	};

	const chooseRandomWeapon = (weapons) => {
		return weapons[Math.floor(Math.random() * weapons.length)];
	};

	useEffect(() => {
		fetchWeaponsByType();
	}, []);

	useEffect(() => {
		console.log("Selected Weapon:", weapon);
	}, [weapon]);

	return (
		<div className="card lg:card-side bg-neutral shadow-[0_10px_60px_1px_rgba(0,0,0,0.3)] font-press-start w-[60rem] border-4 border-accent border-double shadow-accent flex items-center">
			<div className="flex flex-col items-center justify-start p-8">
				{weapon && (
					<>
						<h2 className="card-title text-accent text-xl pb-2 w-64 text-center justify-center">
							{weapon.name}
						</h2>
						<h3 className="text-green-500 text-lg">{weapon.modifier}</h3>
						<p className="text-error text-sm text-center">
							{weapon.minDmg}-{weapon.maxDmg} {weapon.damageType}
						</p>
						{weapon.properties.map((prop) => (
							<div key={prop} className="badge badge-primary badge-sm mt-2">
								{prop}
							</div>
						))}
						<h3 className="mt-6 text-yellow-500">Actions:</h3>
						{weapon.actions.map((action) => (
							<div
								key={action._id}
								className="mt-6 text-center border-b-4 border-accent pb-2"
							>
								<h4 className="text-accent text-lg">{action.name}</h4>
								<h4 className="text-green-500 text-lg">{action.type}</h4>
								<h4 className="text-error text-lg">{action.dmgDice} DMG</h4>
								{action.uses != null ? (
									<h4 className="text-primary text-lg">{action.uses} Uses</h4>
								) : null}
							</div>
						))}
					</>
				)}
			</div>
			<div className="card-body text-primary w-[48rem]">
				<div role="tablist" className="tabs tabs-boxed">
					<input
						type="radio"
						name="weaponTabs"
						role="tab"
						className="tab"
						aria-label="Selection"
						defaultChecked
					/>
					<div role="tabpanel" className="tab-content p-10 h-[26rem]">
						<div className="border-l-4 border-secondary pl-6">
							{weaponTypes.map((c) => (
								<div className="form-control" key={c}>
									<label className="label cursor-pointer">
										<span className="label-text text-accent text-lg">{c}</span>
										<input
											type="radio"
											name="weapon-radio"
											className="radio radio-primary"
											checked={weaponType === c}
											onChange={() => handleSelectWeaponType(c)}
										/>
									</label>
								</div>
							))}
						</div>
						<div className="flex justify-center">
							<button
								className="btn bg-green-500 text-lg text-black hover:scale-110 hover:bg-green-700 m-4 mt-6"
								onClick={fetchWeaponsByType}
							>
								Generate Weapon
							</button>
						</div>
					</div>
					<input
						type="radio"
						name="weaponTabs"
						role="tab"
						className="tab"
						aria-label="Request"
					/>
					<div
						role="tabpanel"
						className="tab-content p-10 min-h-96 h-[26rem] font-mono"
					>
						{weapon && (
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
						)}
						<p className="text-white mt-8 font-press-start text-sm">
							Weapons can be accessed by using /weapons. Weapons can be filtered
							by name, id, weapon type, and damage type.
						</p>
					</div>
					<input
						type="radio"
						name="weaponTabs"
						role="tab"
						className="tab"
						aria-label="Response"
					/>
					<div role="tabpanel" className="tab-content p-10 min-h-96 h-[26rem]">
						<h4 className="text-accent p-0 text-xl">JSON:</h4>
						{weapon && <JsonViewer json={weapon} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Weapons;
