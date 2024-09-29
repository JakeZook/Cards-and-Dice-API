import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Hero, Classes } from "../Components";
const Home = () => {
	return (
		<div>
			<Hero />
			<div className="flex justify-center flex-col items-center bg-base-300">
				<h1 className="text-5xl text-accent my-12 bg-neutral rounded-full p-8 border-b-4 border-double border-accent">
					Explore the API on a quest!
				</h1>
				<div className="mb-12">
					<h2 className="text-primary text-2xl text-center pb-8">
						First, choose a class!
					</h2>
					<Classes />
				</div>
			</div>
		</div>
	);
};

export default Home;
