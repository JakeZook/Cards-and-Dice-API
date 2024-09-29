import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = [
	"Characters!",
	"Dice Rolls!",
	"Monsters!",
	"Weapons!",
	"Spells!",
	"Items!",
	"Skills!",
	"Classes!",
	"Armor!",
];

const AnimatedText = () => {
	const [currentWord, setCurrentWord] = useState(words[0]);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsVisible(false);

			setTimeout(() => {
				const nextIndex = (words.indexOf(currentWord) + 1) % words.length;
				setCurrentWord(words[nextIndex]);
				setIsVisible(true);
			}, 750);
		}, 2000);

		return () => clearInterval(interval);
	}, [currentWord]);

	const variants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.p
			className="text-2xl text-green-500"
			key={currentWord}
			initial="hidden"
			animate={isVisible ? "visible" : "hidden"}
			variants={variants}
			transition={{ duration: 0.5 }}
		>
			{currentWord}
		</motion.p>
	);
};

export default AnimatedText;
