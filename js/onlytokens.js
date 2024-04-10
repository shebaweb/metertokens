function onlytokens() {
const tokenbox = document.getElementById("tokenbox").value.trim();
const rows = tokenbox.split(",");
const tableBody = document.getElementById("tableData");
tableBody.innerHTML = "";

if (!rows.length) {
return;
}

const columns = rows[0].split("-");

for (let i = 0; i < rows.length; i++) {
const tableRow = document.createElement("tr");
const codeCells = rows[i].split("-");

for (let j = 0; j < columns.length; j++) {
const tableCell = document.createElement("td");
tableCell.textContent = codeCells[j] || "";
tableRow.appendChild(tableCell);
}

tableBody.appendChild(tableRow);
}
}

onlytokens();
