import React, { useState, useEffect } from "react";
import AnimatedText from "../Components/animatedText";

import images from "../Utils/images";
import castle from "../assets/castle.png";

const Home = () => {
	const [data, setData] = useState(null);
	const [die, setDie] = useState(images[0]);

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:3000/roll/d20");
			const fetchedData = await response.json();
			console.log(fetchedData);
			setData(fetchedData[0]);
			if (fetchedData[0]?.results[0]?.value !== undefined) {
				setDieImage(fetchedData[0].results[0].value);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const setDieImage = (roll) => {
		setDie(images[roll]);
		console.log(images[roll]);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div
			className="hero min-h-screen"
			style={{ backgroundImage: `url(${castle})` }}
		>
			<div className="hero-content flex-col-reverse lg:flex-row-reverse gap-x-48">
				<div className="flex flex-col items-center max-w-56">
					<h1 className="text-success text-5xl border-b-4 border-primary border-double">
						D20
					</h1>
					<img src={die} className="max-w-sm py-4" />
					{data && (
						<>
							{data.results[0].value === 20 ? (
								<h1 className="text-green-500 text-3xl text-nowrap">
									Critical Hit!
								</h1>
							) : data.results[0].value === 1 ? (
								<h1 className="text-error text-3xl text-nowrap">
									Critical Fail!
								</h1>
							) : (
								<h1 className="text-accent text-3xl text-nowrap">
									You rolled a {data.results[0].value}!
								</h1>
							)}
						</>
					)}
				</div>
				<div className="border-l-4 border-accent border-double pl-6">
					<h1 className="text-5xl font-bold text-primary">
						Welcome to RPGenius!
					</h1>
					<h2 className="py-6 text-accent text-4xl flex items-center">
						Generate: <span className="mr-2"></span>
						<AnimatedText />
					</h2>
					<div className="flex justify-start flex-col items-start gap-4 py-8">
						<button
							className="btn bg-green-500 text-black hover:scale-110 hover:bg-green-800 text-xl"
							onClick={fetchData}
						>
							Roll the dice!
						</button>
						<button className="btn btn-warning btn-md hover:scale-110 hover:btn-secondary text-lg">
							Read Docs
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
