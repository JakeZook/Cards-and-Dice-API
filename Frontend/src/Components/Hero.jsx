import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { IoDiceSharp } from "react-icons/io5";
import { GiRuleBook } from "react-icons/gi";
import AnimatedText from "./animatedText";

import images from "../Utils/images";
import castle from "../assets/castle.png";

const Hero = () => {
	const [data, setData] = useState(null);
	const [die, setDie] = useState(images[0]);
	const [tempData, setTempData] = useState(null);
	const [isRolling, setIsRolling] = useState(false);

	const rollD20 = async () => {
		setIsRolling(true);
		try {
			const response = await fetch("http://localhost:3000/roll/d20");
			const fetchedData = await response.json();
			setTempData(fetchedData[0]);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const updateDieAndText = () => {
		if (tempData?.results[0]?.value !== undefined) {
			setDie(images[tempData.results[0].value]);
			setData(tempData);
		}
		setIsRolling(false);
	};

	return (
		<div
			className="hero min-h-screen font-press-start"
			style={{ backgroundImage: `url(${castle})` }}
		>
			<div className="hero-content flex-col-reverse lg:flex-row-reverse gap-x-48 bg-base-100 bg-opacity-85 p-16 rounded-[5rem]">
				<div className="flex flex-col items-center max-w-56">
					<h1 className="text-success text-3xl border-b-4 border-primary border-double">
						D20
					</h1>
					<motion.img
						src={die}
						className="max-w-sm py-4"
						animate={
							isRolling
								? {
										rotate: [0, 15, -15, 15, -15, 0],
										x: [-3, 3, -5, 5, -3, 0],
										y: [-3, 3, -5, 5, -3, 0],
								  }
								: {}
						}
						transition={{
							duration: 0.6,
							ease: "easeInOut",
						}}
						onAnimationComplete={updateDieAndText}
					/>
					{data ? (
						<>
							{data.results[0].value === 20 ? (
								<motion.h1
									key={data.results[0].value}
									className="text-green-500 text-xl text-nowrap"
									initial={{ y: -100, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										duration: 0.4,
										type: "spring",
										stiffness: 800,
										damping: 30,
									}}
								>
									Critical Hit!
								</motion.h1>
							) : data.results[0].value === 1 ? (
								<motion.h1
									key={data.results[0].value}
									className="text-error text-xl text-nowrap"
									initial={{ y: -100, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										duration: 0.4,
										type: "spring",
										stiffness: 800,
										damping: 30,
									}}
								>
									Critical Fail!
								</motion.h1>
							) : (
								<motion.h1
									key={data.results[0].value}
									className="text-accent text-xl text-nowrap"
									initial={{ y: -100, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										duration: 0.4,
										type: "spring",
										stiffness: 800,
										damping: 30,
									}}
								>
									You rolled a {data.results[0].value}!
								</motion.h1>
							)}
						</>
					) : (
						<motion.h1
							key="default"
							className="text-accent text-xl text-nowrap"
							initial={{ y: -100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{
								duration: 0.4,
								type: "spring",
								stiffness: 800,
								damping: 30,
							}}
						>
							Roll the dice!
						</motion.h1>
					)}
				</div>
				<div className="border-l-4 border-accent border-double pl-6">
					<h1 className="text-3xl font-bold text-primary">
						Welcome to RPGenius!
					</h1>
					<h2 className="py-6 text-accent text-2xl flex items-center">
						Generate: <span className="mr-2"></span>
						<AnimatedText />
					</h2>
					<div className="flex justify-start flex-col items-start gap-4 py-8">
						<button
							className="btn bg-green-500 text-black hover:scale-110 hover:bg-green-800 text-lg"
							onClick={rollD20}
							disabled={isRolling}
						>
							<IoDiceSharp />
							Roll the dice!
						</button>
						<button className="btn btn-warning btn-md hover:scale-110 hover:btn-warning-content text-md">
							<GiRuleBook />
							Read Docs
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
