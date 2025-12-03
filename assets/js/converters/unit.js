export function loadUnitConverter(container) {
  container.innerHTML = `
    <div class="unit-converter">
      <h2>Area / Unit Converter</h2>
      <input type="number" id="unit-value" placeholder="Value">
      <select id="unit-from">
        <option value="m2">m²</option>
        <option value="cm2">cm²</option>
        <option value="km2">km²</option>
        <option value="ft2">ft²</option>
      </select>
      <select id="unit-to">
        <option value="m2">m²</option>
        <option value="cm2">cm²</option>
        <option value="km2">km²</option>
        <option value="ft2">ft²</option>
      </select>
      <button id="unit-convert-btn">Convert</button>
      
      <div class="result-box" id="unit-result">Result: -</div>
    </div>
  `;

  const valueInput = container.querySelector("#unit-value");
  const fromSelect = container.querySelector("#unit-from");
  const toSelect = container.querySelector("#unit-to");
  const resultDiv = container.querySelector("#unit-result");
  const convertBtn = container.querySelector("#unit-convert-btn");

  const conversionRates = {
    "m2": 1,
    "cm2": 0.0001,
    "km2": 1e6,
    "ft2": 0.092903
  };

  convertBtn.addEventListener("click", () => {
    const value = parseFloat(valueInput.value);
    if (isNaN(value)) {
      resultDiv.innerText = "Please enter a valid value";
      return;
    }

    const from = fromSelect.value;
    const to = toSelect.value;

    const result = value * conversionRates[from] / conversionRates[to];
    resultDiv.innerText = `Result: ${result.toFixed(4)} ${to}`;
  });
}
