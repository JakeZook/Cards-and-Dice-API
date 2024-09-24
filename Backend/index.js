const app = require("./App");
const port = 3000;

app.listen(port, () => {
	console.log(`Dice roller API running at http://localhost:${port}`);
});
