function successful() {
// Parse tokens whenever the user types in the textarea
parseSMS();
}

function parseSMS() {
var sms = document.getElementById("tokenbox").value;
var tokens = sms.match(/(\d{4}-\d{4}-\d{4}-\d{4}-\d{4},?)+/g);
var sequence = sms.match(/SquNo:([\d=]+)/);
var meterNo = sms.match(/Meter No:(\d+)/);
var vendingAmt = sms.match(/Vending Amt:(\d+\.\d+)/);
var enrgCost = sms.match(/Enrg Cost: (\d+\.\d+)/);
var totalCharge = sms.match(/Total Charge:(\d+\.\d+)/);
var demandCharge = sms.match(/Demand Charge:(\d+)/);
var meterRent = sms.match(/Meter Rent 1P:(\d+)/);
var rebate = sms.match(/Rebate:(-\d+\.\d+)/);
var vat = sms.match(/VAT:(\d+\.\d+)/);

// Remove any trailing commas
var tokensString = tokens[0].replace(/,$/, "");

// Split the tokens string into an array of tokens
var tokenArray = tokensString.split(",");

// Create a table row for each token
var tokensTableBody = document.getElementById("tableData");
tokensTableBody.innerHTML = ""; // Clear existing rows

tokenArray.forEach(function (token) {
var tokenParts = token.split("-");
var row = document.createElement("tr");

tokenParts.forEach(function (part) {
var cell = document.createElement("td");
cell.textContent = part;
row.appendChild(cell);
});

tokensTableBody.appendChild(row);
});

document.getElementById("info").innerHTML = `
<li><b>Meter No: </b>${meterNo ? meterNo[1] : "N/A"}</li>
<li><b>Vending Amt:</b> ${vendingAmt ? vendingAmt[1] : "N/A"}</li>
<li><b>Enrg Cost: </b>${enrgCost ? enrgCost[1] : "N/A"}</li>
<li><b>Total Charge:</b> ${
totalCharge ? totalCharge[1] : "N/A"
}</li>
<li><b>Demand Charge: </b>${
demandCharge ? demandCharge[1] : "N/A"
}</li>
<li><b>Meter Rent:</b> ${meterRent ? meterRent[1] : "N/A"}</li>
<li><b>Rebate:</b> ${rebate ? rebate[1] : "N/A"}</li>
<li><b>VAT:</b> ${vat ? vat[1] : "N/A"}</li>
`;

document.getElementById(
"sequence"
).innerHTML = `<li><b>Sequence Number:</b> ${sequence ? sequence[1] : "N/A"}`;
}
