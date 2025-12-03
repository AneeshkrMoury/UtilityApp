import { loadBasicCalculator } from "./calculators/basic.js";
import { loadScientificCalculator } from "./calculators/scientific.js";
import { loadCurrencyConverter } from "./converters/currency.js";
import { loadUnitConverter } from "./converters/unit.js";
import { loadNumberSystem } from "./tools/number-system.js";

// Main container
const moduleContainer = document.getElementById("module-container");

// Sidebar buttons
document.querySelectorAll("[data-module]").forEach(btn => {
  btn.addEventListener("click", () => loadModule(btn.dataset.module));
});
// Sidebar button highlight fix
const sidebarButtons = document.querySelectorAll("aside button");
sidebarButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    sidebarButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Module loader function
function loadModule(name) {
  if (name === "basic") loadBasicCalculator(moduleContainer);
  if (name === "scientific") loadScientificCalculator(moduleContainer);
  if (name === "currency") loadCurrencyConverter(moduleContainer);
  if (name === "unit") loadUnitConverter(moduleContainer);
  if (name === "numbersystem") loadNumberSystem(moduleContainer);
}

// Theme toggle
const themeSwitch = document.getElementById("theme-switch");
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode"));
});

// Load saved theme
if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark-mode");
  themeSwitch.checked = true;
}

// Load default module
loadBasicCalculator(moduleContainer);
