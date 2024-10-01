import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
	Hero,
	Classes,
	Weapons,
	Armor,
	Spells,
	Monsters,
	Battle,
} from "../Components";

const Home = () => {
	return (
		<div>
			<Hero />
			<div className="flex justify-center flex-col items-center bg-base-300">
				<h1 className="text-5xl text-accent my-12 bg-neutral rounded-full p-8 border-b-4 border-double border-accent">
					Explore the API on a quest!
				</h1>
				<div className="mb-12">
					<h2 className="text-primary text-4xl text-center pb-16">
						First, choose a class!
					</h2>
					<Classes />
					<h2 className="text-primary text-4xl text-center pb-16 mt-16">
						Next, you'll need a weapon!
					</h2>
					<Weapons />
					<h2 className="text-primary text-4xl text-center pb-16 mt-16">
						Protect yourself with some armor!
					</h2>
					<Armor />
					<h2 className="text-primary text-4xl text-center pb-16 mt-16">
						Learn a spell!
					</h2>
					<Spells />
					<h2 className="text-primary text-4xl text-center pb-16 mt-16">
						Oh no! A monster!
					</h2>
					<Monsters />
					<h2 className="text-primary text-4xl text-center pb-16 mt-16">
						Ready to fight?
					</h2>
					<Battle />
				</div>
			</div>
		</div>
	);
};

export default Home;
