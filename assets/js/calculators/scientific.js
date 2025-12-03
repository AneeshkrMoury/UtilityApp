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
        <button onclick="applyFunc('factorial')">x!</button>

        <button onclick="appendNumber('3.1416')">π</button>
        <button onclick="applyPercent()">%</button>
        <button id="toggle-degrad">Deg</button>
      </div>
    </div>
  `;

  const display = container.querySelector("#display");
  let currentInput = "";
  let isDeg = true;

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

  // Operators
  window.appendOperator = (op) => {
    if (!currentInput) return;
    const lastChar = currentInput.slice(-1);
    if ("+-*/".includes(lastChar)) {
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

  // Scientific functions
  window.applyFunc = (fn) => {
    if (!currentInput) return;
    try {
      const match = currentInput.match(/([0-9.]+)$/);
      if (!match) return;
      let num = parseFloat(match[0]);
      let result;

      switch (fn) {
        case "sin":
          result = isDeg ? Math.sin(num * Math.PI / 180) : Math.sin(num); break;
        case "cos":
          result = isDeg ? Math.cos(num * Math.PI / 180) : Math.cos(num); break;
        case "tan":
          result = isDeg ? Math.tan(num * Math.PI / 180) : Math.tan(num); break;
        case "log":
          result = Math.log10(num); break;
        case "ln":
          result = Math.log(num); break;
        case "sqrt":
          result = Math.sqrt(num); break;
        case "factorial":
          result = 1;
          for (let i = 1; i <= num; i++) result *= i;
          break;
      }

      currentInput = currentInput.slice(0, -match[0].length) + result;
      display.innerText = currentInput;
    } catch {
      display.innerText = "Error";
      currentInput = "";
    }
  };

  // Advanced Percentage
  window.applyPercent = () => {
    if (!currentInput) return;
    try {
      const match = currentInput.match(/([0-9.]+)$/);
      if (!match) return;
      const num = parseFloat(match[0]);
      let percentValue = num / 100;

      // Check previous operator for advanced calculation
      const operatorMatch = currentInput.match(/([0-9.]+)([+\-*/])$/);
      if (operatorMatch) {
        const prevNum = parseFloat(operatorMatch[1]);
        percentValue = prevNum * (num / 100);
      }

      currentInput = currentInput.slice(0, -match[0].length) + percentValue;
      display.innerText = currentInput;
    } catch {
      display.innerText = "Error";
      currentInput = "";
    }
  };

  // Calculate
  window.calculate = () => {
    if (!currentInput) return;
    try {
      const expr = currentInput.replace(/π/g, "3.1416");
      const result = Function(`"use strict"; return (${expr})`)();
      display.innerText = result;
      currentInput = result.toString();
    } catch {
      display.innerText = "Error";
      currentInput = "";
    }
  };
}
