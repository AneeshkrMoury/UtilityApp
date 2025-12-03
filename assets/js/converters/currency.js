export function loadCurrencyConverter(container) {
  container.innerHTML = `
    <div class="currency-converter card-box">
      <h3>Currency Converter</h3>

      <div class="converter-group">
        <input type="number" id="amount" placeholder="Amount" />
      </div>

      <div class="converter-group">
        <select id="fromCurrency"></select>
        <select id="toCurrency"></select>
      </div>

      <!-- Button now contains spinner + text -->
      <button id="convertBtn" class="convert-btn">
        <span class="btn-text">Convert</span>
        <span class="loader"></span>
      </button>

      <div class="result-box" id="result">Result: -</div>
    </div>
  `;

  const amountInput = container.querySelector("#amount");
  const fromSelect = container.querySelector("#fromCurrency");
  const toSelect = container.querySelector("#toCurrency");
  const resultDiv = container.querySelector("#result");
  const convertBtn = container.querySelector("#convertBtn");

  const currencies = ["USD","EUR","INR","GBP","JPY","AUD","CAD","CHF","CNY","NZD"];

  currencies.forEach(cur => {
    fromSelect.innerHTML += `<option value="${cur}">${cur}</option>`;
    toSelect.innerHTML += `<option value="${cur}">${cur}</option>`;
  });

  async function convertCurrency(amount, from, to) {
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      const data = await res.json();

      console.log("Frankfurter API Response:", data); // debug

      if (data && data.rates && data.rates[to] !== undefined) {
        return data.rates[to];
      } else {
        throw new Error("Invalid data from API");
      }
    } catch (error) {
      console.error("Conversion error:", error);
      return null;
    }
  }

  // START loading effect
  function startLoading() {
    convertBtn.classList.add("loading");
  }

  // STOP loading effect
  function stopLoading() {
    convertBtn.classList.remove("loading");
  }

  convertBtn.addEventListener("click", async () => {
    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (isNaN(amount)) {
      resultDiv.innerText = "❌ Enter a valid amount";
      return;
    }

    // Start loader animation
    startLoading();
    resultDiv.innerText = "⏳ Converting...";

    const result = await convertCurrency(amount, from, to);

    // Stop loader animation
    stopLoading();

    if (result !== null) {
      resultDiv.innerText = `Result: ${result.toFixed(4)} ${to}`;
    } else {
      resultDiv.innerText = "❌ Conversion failed. Try again.";
    }
  });
}
