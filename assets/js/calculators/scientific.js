export function loadScientificCalculator(container) {
  container.innerHTML = `
    <div class="calculator scientific">
      <div class="display" id="display">0</div>
      <div class="buttons-6col">

        <button onclick="appendNumber('7')">7</button>
        <button onclick="appendNumber('8')">8</button>
        <button onclick="appendNumber('9')">9</button>
        <button onclick="appendOperator('/')">/</button>
        <button onclick="applyFunc('sin')">sin</button>
        <button onclick="applyFunc('cos')">cos</button>

        <button onclick="appendNumber('4')">4</button>
        <button onclick="appendNumber('5')">5</button>
        <button onclick="appendNumber('6')">6</button>
        <button onclick="appendOperator('*')">*</button>
        <button onclick="applyFunc('tan')">tan</button>
        <button onclick="applyFunc('log')">log</button>

        <button onclick="appendNumber('1')">1</button>
        <button onclick="appendNumber('2')">2</button>
        <button onclick="appendNumber('3')">3</button>
        <button onclick="appendOperator('-')">-</button>
        <button onclick="applyFunc('ln')">ln</button>
        <button onclick="applyFunc('sqrt')">√</button>

        <button onclick="appendNumber('0')">0</button>
        <button onclick="appendNumber('.')">.</button>
        <button onclick="clearDisplay()">C</button>
        <button onclick="calculate()">=</button>
        <button onclick="appendOperator('+')">+</button>
        <button onclick="appendOperator('!')">x!</button>

        <button onclick="appendNumber('3.1416')">π</button>
        <button onclick="applyPercent()">%</button>
        <button id="toggle-degrad">Deg</button>
      </div>
    </div>
  `;

  const display = container.querySelector("#display");
  let currentInput = "";
  let isDeg = true;

  // ⭐ Formatting (like basic calculator)
  function formatNumber(num) {
    if (!isFinite(num)) return "Error";
    return parseFloat(num.toFixed(6)).toString();
  }

  // DEG/RAD toggle
  const toggleBtn = container.querySelector("#toggle-degrad");
  toggleBtn.addEventListener("click", () => {
    isDeg = !isDeg;
    toggleBtn.innerText = isDeg ? "Deg" : "Rad";
  });

  // Numbers
  window.appendNumber = (num) => {
    currentInput += num;
    display.innerText = currentInput;
  };

  // Operators + postfix ! support
  window.appendOperator = (op) => {
    const last = currentInput.slice(-1);

    // postfix factorial logic
    if (op === "!") {
      if (!/^[0-9.]$/.test(last)) return;
      currentInput += "!";
      display.innerText = currentInput;
      return;
    }

    // prevent two operators in a row
    if ("+-*/".includes(last)) {
      currentInput = currentInput.slice(0, -1) + op;
    } else {
      currentInput += op;
    }

    display.innerText = currentInput;
  };

  // Clear
  window.clearDisplay = () => {
    currentInput = "";
    display.innerText = "0";
  };

  // Factorial calculate
  function factorial(n) {
    if (n < 0) return NaN;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }

  // Replace all n! in expression
  function processFactorials(expr) {
    return expr.replace(/(\d+)!/g, (_, num) => factorial(Number(num)));
  }

  // Apply sin, cos, log, sqrt, etc.
  window.applyFunc = (fn) => {
    if (!currentInput) return;

    const match = currentInput.match(/([0-9.]+)$/);
    if (!match) return;

    let num = parseFloat(match[0]);
    let result;

    switch (fn) {
      case "sin": result = isDeg ? Math.sin(num * Math.PI/180) : Math.sin(num); break;
      case "cos": result = isDeg ? Math.cos(num * Math.PI/180) : Math.cos(num); break;
      case "tan": result = isDeg ? Math.tan(num * Math.PI/180) : Math.tan(num); break;
      case "log": result = Math.log10(num); break;
      case "ln": result = Math.log(num); break;
      case "sqrt": result = Math.sqrt(num); break;
      case "factorial": result = factorial(num); break;
    }

    const clean = formatNumber(result);

    currentInput = currentInput.slice(0, -match[0].length) + clean;
    display.innerText = clean;
  };

  // Percent
  window.applyPercent = () => {
    const match = currentInput.match(/([0-9.]+)$/);
    if (!match) return;

    let num = parseFloat(match[0]);
    let percent = num / 100;

    const opMatch = currentInput.match(/([0-9.]+)([+\-*/])$/);
    if (opMatch) {
      percent = parseFloat(opMatch[1]) * (num / 100);
    }

    const clean = formatNumber(percent);

    currentInput = currentInput.slice(0, -match[0].length) + clean;
    display.innerText = clean;
  };

  // Final calculation
  window.calculate = () => {
    if (!currentInput) return;

    try {
      let expr = currentInput.replace(/π/g, "3.1416");
      expr = processFactorials(expr);

      const raw = Function(`"use strict"; return (${expr})`)();
      const clean = formatNumber(raw);

      display.innerText = clean;
      currentInput = clean.toString();

    } catch {
      display.innerText = "Error";
      currentInput = "";
    }
  };
}
