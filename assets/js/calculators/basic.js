export function loadBasicCalculator(container) {
  container.innerHTML = `
    <div class="calculator">
      <div id="display" class="display">0</div>
      <div class="buttons">
        <button class="num">7</button>
        <button class="num">8</button>
        <button class="num">9</button>
        <button class="op">/</button>

        <button class="num">4</button>
        <button class="num">5</button>
        <button class="num">6</button>
        <button class="op">*</button>

        <button class="num">1</button>
        <button class="num">2</button>
        <button class="num">3</button>
        <button class="op">-</button>

        <button class="num">0</button>
        <button class="num">.</button>
        <button id="clear">C</button>
        <button class="op">+</button>

        <button id="equals" style="grid-column: span 4;">=</button>
      </div>
    </div>
  `;

  const display = container.querySelector("#display");
  let currentInput = ""; // Stores the whole expression as string

  // Numbers
  container.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
      currentInput += btn.innerText;
      display.innerText = currentInput;
    });
  });

  // Operators
  container.querySelectorAll(".op").forEach(btn => {
    btn.addEventListener("click", () => {
      const lastChar = currentInput.slice(-1);
      // Prevent multiple operators in a row
      if ("+-*/".includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + btn.innerText;
      } else {
        currentInput += btn.innerText;
      }
      display.innerText = currentInput;
    });
  });

  // Clear
  container.querySelector("#clear").addEventListener("click", () => {
    currentInput = "";
    display.innerText = "0";
  });

  // Equals
  container.querySelector("#equals").addEventListener("click", () => {
    try {
      const result = eval(currentInput); // Simple evaluation
      display.innerText = result;
      currentInput = result.toString();
    } catch {
      display.innerText = "Error";
      currentInput = "";
    }
  });
}
