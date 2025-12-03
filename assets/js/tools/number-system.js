export function loadNumberSystem(container) {
  container.innerHTML = `
    <div class="number-system-converter">
      <h2>Number System Converter</h2>
      <input type="number" id="num-input" placeholder="Enter number">
      <select id="from-system">
        <option value="binary">Binary</option>
        <option value="decimal" selected>Decimal</option>
        <option value="hex">Hexadecimal</option>
      </select>
      <select id="to-system">
        <option value="binary">Binary</option>
        <option value="decimal">Decimal</option>
        <option value="hex">Hexadecimal</option>
      </select>
      <button id="convert-btn">Convert</button>
      <div class="result-box" id="num-result">Result: -</div>
    </div>
  `;

  const numInput = container.querySelector("#num-input");
  const fromSelect = container.querySelector("#from-system");
  const toSelect = container.querySelector("#to-system");
  const resultDiv = container.querySelector("#num-result");
  const convertBtn = container.querySelector("#convert-btn");

  convertBtn.addEventListener("click", () => {
    let value = numInput.value.trim();
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!value) {
      resultDiv.innerText = "Please enter a number";
      return;
    }

    try {
      let decimalValue;
      switch (from) {
        case "binary":
          decimalValue = parseInt(value, 2);
          break;
        case "decimal":
          decimalValue = parseInt(value, 10);
          break;
        case "hex":
          decimalValue = parseInt(value, 16);
          break;
      }

      let result;
      switch (to) {
        case "binary":
          result = decimalValue.toString(2);
          break;
        case "decimal":
          result = decimalValue.toString(10);
          break;
        case "hex":
          result = decimalValue.toString(16).toUpperCase();
          break;
      }

      resultDiv.innerText = `Result: ${result}`;
    } catch {
      resultDiv.innerText = "Invalid number for the selected system";
    }
  });
}
