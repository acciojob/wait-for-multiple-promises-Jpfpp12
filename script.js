//your JS code here. If required.
 function createRandomPromise(index) {
    const time = Math.floor(Math.random() * 3) + 1; // 1 to 3 seconds
    const delay = time * 1000;

    return new Promise((resolve) => {
      const start = performance.now();
      setTimeout(() => {
        const end = performance.now();
        const timeTaken = ((end - start) / 1000).toFixed(3); // Actual time in seconds
        resolve({ name: `Promise ${index}`, timeTaken: parseFloat(timeTaken) });
      }, delay);
    });
  }

  async function runPromises() {
    const tbody = document.getElementById("output");

    const promises = [
      createRandomPromise(1),
      createRandomPromise(2),
      createRandomPromise(3)
    ];

    const results = await Promise.all(promises);

    // Remove loading row
    const loadingRow = document.getElementById("loading-row");
    if (loadingRow) {
      loadingRow.remove();
    }

    // Populate each promise result
    results.forEach(result => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const timeCell = document.createElement("td");

      nameCell.textContent = result.name;
      timeCell.textContent = result.timeTaken;

      row.appendChild(nameCell);
      row.appendChild(timeCell);
      tbody.appendChild(row);
    });

    // Add total row (maximum time taken)
    const totalRow = document.createElement("tr");
    const totalLabelCell = document.createElement("td");
    const totalValueCell = document.createElement("td");

    totalLabelCell.textContent = "Total";
    const maxTime = Math.max(...results.map(r => r.timeTaken)).toFixed(3);
    totalValueCell.textContent = maxTime;

    totalRow.appendChild(totalLabelCell);
    totalRow.appendChild(totalValueCell);
    tbody.appendChild(totalRow);
  }

  runPromises();