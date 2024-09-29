import { useState, useEffect } from "react";
import { GiPerson } from "react-icons/gi";

import JsonViewer from "./JSONViwer";

const Classes = () => {
	const classes = ["Fighter", "Rogue", "Wizard", "Cleric", "Barbarian", "Bard"];

	const [data, setData] = useState(null);
	const [selectedClass, setSelectedClass] = useState("Fighter");

	const handleSelectClass = (c) => {
		setSelectedClass(c);
	};

	const fetchClassData = async () => {
		try {
			const response = await fetch(
				"http://localhost:3000/classes?name=" + selectedClass
			);
			const fetchedData = await response.json();
			setData(fetchedData[0]);
			console.log(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchClassData();
	}, []);

	return (
		<div className="card lg:card-side bg-neutral shadow-[0_10px_60px_1px_rgba(0,0,0,0.3)] font-press-start w-[60rem] border-4 border-accent border-double shadow-accent flex items-center">
			<div className="flex flex-col items-center justify-start p-8">
				<h2 className="card-title text-accent text-xl pb-6 w-64 text-center justify-center">
					{data && data.name}
				</h2>
				{data && (
					<>
						<div className="flex justify-center gap-8 items-center">
							<div className="flex flex-col">
								{Object.entries(data.stats).map(([statName, statValue]) => (
									<div key={statName} className="flex">
										<p className="text-[yellow]">{statName}:</p>
										<p className="text-primary">{statValue}</p>
									</div>
								))}
							</div>
							<div className="flex flex-col items-center">
								<div className="badge badge-error badge-sm mt-6">
									HP: D{data.hitDice}
								</div>
								<div className="badge badge-success badge-sm my-2">
									{data.primaryAbility}
								</div>
							</div>
						</div>
						<div className="flex flex-col mt-6 text-sm items-center">
							<p className="text-green-500">Saving Throws:</p>
							{data.savingThrows.map((save) => (
								<p key={save} className="text-white">
									{save}
								</p>
							))}
						</div>
						<div className="flex flex-col mt-6 text-sm items-center">
							<p className="text-green-500">Proficiencies:</p>
							{data.proficiencies.map((save) => (
								<p key={save} className="text-white">
									{save}
								</p>
							))}
						</div>
					</>
				)}
			</div>
			<div className="card-body text-primary w-[48rem]">
				<div role="tablist" className="tabs tabs-boxed">
					<input
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab"
						aria-label="Selection"
						defaultChecked
					/>
					<div role="tabpanel" className="tab-content p-10 h-[26rem]">
						<div className="border-l-4 border-secondary pl-6">
							{classes.map((c) => (
								<div className="form-control" key={c}>
									<label className="label cursor-pointer">
										<span className="label-text text-accent text-lg">{c}</span>
										<input
											type="radio"
											name="class-radio"
											className="radio radio-primary"
											checked={selectedClass === c}
											onChange={() => handleSelectClass(c)}
										/>
									</label>
								</div>
							))}
						</div>
						<div className="flex justify-center">
							<button
								className="btn bg-green-500 text-lg text-black hover:scale-110 hover:bg-green-700 m-4 mt-6"
								onClick={fetchClassData}
							>
								<GiPerson />
								Select Class
							</button>
						</div>
					</div>
					<input
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab"
						aria-label="Request"
					/>
					<div
						role="tabpanel"
						className="tab-content p-10 min-h-96 h-[26rem] font-mono"
					>
						{data && (
							<>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/classes?name={data.name}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">/classes?id={data._id}</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/classes?hitDice={data.hitDice}
										</div>
									</div>
								</div>
								<div className="mockup-browser bg-base-300 border max-w-[30rem] my-3">
									<div className="mockup-browser-toolbar">
										<div className="input text-sm">
											/classes?primaryAbility={data.primaryAbility}
										</div>
									</div>
								</div>
							</>
						)}
						<p className="text-white mt-8 font-press-start text-sm">
							Classes can be accessed by using /classes. Classes can be filtered
							by name, id, hit dice, and primary abilities.
						</p>
					</div>
					<input
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab"
						aria-label="Response"
					/>
					<div role="tabpanel" className="tab-content p-10 min-h-96 h-[26rem]">
						<h4 className="text-accent p-0 text-xl">JSON:</h4>
						{data && <JsonViewer json={data} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Classes;
