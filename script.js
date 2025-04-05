//your JS code here. If required.
function Random() {
	return Math.floor(Math.random() * 3) + 1;
}

async function Promisetime() {
	return new Promise((resolve) => {
		const delay = Random() * 1000;
		setTimeout(() => {
			resolve(delay / 1000); // resolve seconds
		}, delay);
	});
}

let a = document.createElement("table");
document.getElementById("output").append(a);

async function runExample() {
	let times = [];

	for (let i = 1; i <= 3; i++) {
		let start = performance.now();
		const result = await Promisetime();
		let end = performance.now();

		const timeTaken = ((end - start) / 1000).toFixed(2); // seconds
		times.push(parseFloat(timeTaken));

		let row = a.insertRow();
		let cell = row.insertCell();
		cell.textContent = `Promise${i}: ${timeTaken}s`;
	}

	// Add final row with max time
	let maxTime = Math.max(...times).toFixed(2);
	let finalRow = a.insertRow();
	let finalCell = finalRow.insertCell();
	finalCell.textContent = `Total (max) time: ${maxTime}s`;
}

runExample();