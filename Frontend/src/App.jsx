import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [data, setData] = useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:3000/roll/3d12");
			const fetchedData = await response.json();
			console.log(fetchedData); // { message: 'Hello from the backend!' }
			setData(fetchedData[0]);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>{data ? `${data.rolled}${data.dieType}` : "Loading..."}</h1>
			<h2>
				{data
					? data.results.map((result, index) => (
							<span key={index}>{result.value} </span>
					  ))
					: "Loading..."}
			</h2>

			<div className="card">
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
