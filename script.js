let count = 0;
let alphabetIndex = 0;
let alphabetMode = false;

const countDisplay = document.getElementById("count");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const resetBtn = document.getElementById("reset");
const stepSelect = document.getElementById("step");
const alphabetBtn = document.getElementById("alp");
const controlDiv = document.querySelector(".control");
const tabCounter = document.getElementById("tab-counter");
const tabColors = document.getElementById("tab-colors");
const screenCounter = document.getElementById("screen-counter");
const screenColors = document.getElementById("screen-colors");
const colorTiles = document.querySelectorAll(".color-tile");
const languageSelect = document.getElementById("language");
const stepLabel = document.getElementById("label-step");
const languageLabel = document.getElementById("label-language");
const colorsTitle = document.getElementById("title-colors");

const translations = {
  en: {
    tabCounter: "Counter",
    tabColors: "Colors",
    stepLabel: "Increment amount:",
    decrease: "Decrease",
    increase: "Increase",
    reset: "Reset",
    alphabet: "Alphabet",
    colorsTitle: "Colors",
    languageLabel: "Language",
    colors: {
      red: "Red",
      orange: "Orange",
      yellow: "Yellow",
      green: "Green",
      blue: "Blue",
      indigo: "Indigo",
      violet: "Violet",
    },
  },
  // no: {
  //   tabCounter: "Teller",
  //   tabColors: "Farger",
  //   stepLabel: "Øk med:",
  //   decrease: "Mindre",
  //   increase: "Mer",
  //   reset: "Nullstill",
  //   alphabet: "Alfabet",
  //   colorsTitle: "Farger",
  //   languageLabel: "Språk",
  //   colors: {
  //     red: "Rød",
  //     orange: "Oransje",
  //     yellow: "Gul",
  //     green: "Grønn",
  //     blue: "Blå",
  //     indigo: "Indigo",
  //     violet: "Fiolett",
  //   },
  // },
};

let currentLang = "en";

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  currentLang = lang;

  if (tabCounter) tabCounter.textContent = t.tabCounter;
  if (tabColors) tabColors.textContent = t.tabColors;
  if (stepLabel) stepLabel.textContent = t.stepLabel;
  if (decBtn) decBtn.textContent = t.decrease;
  if (incBtn) incBtn.textContent = t.increase;
  if (resetBtn) resetBtn.textContent = t.reset;
  if (alphabetBtn) alphabetBtn.textContent = t.alphabet;
  if (colorsTitle) colorsTitle.textContent = t.colorsTitle;
  if (languageLabel) languageLabel.textContent = t.languageLabel;

  colorTiles.forEach((tile) => {
    const key = tile.dataset.colorKey;
    if (t.colors[key]) {
      tile.textContent = t.colors[key];
    }
  });
}

function setActiveTab(tabName) {
  const isCounter = tabName === "counter";

  tabCounter.classList.toggle("active", isCounter);
  tabCounter.setAttribute("aria-selected", String(isCounter));
  tabColors.classList.toggle("active", !isCounter);
  tabColors.setAttribute("aria-selected", String(!isCounter));

  screenCounter.classList.toggle("active", isCounter);
  screenCounter.setAttribute("aria-hidden", String(!isCounter));
  screenColors.classList.toggle("active", !isCounter);
  screenColors.setAttribute("aria-hidden", String(isCounter));
}

function speak(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(text).toLowerCase()); // 👈 lowercases before speaking
  utterance.lang = currentLang === "no" ? "nb-NO" : "en-US";
  window.speechSynthesis.speak(utterance);
}

function updateDisplay() {
  if (!countDisplay) return;
  countDisplay.textContent = count;
}

function getStep() {
  if (!stepSelect) return 1;
  const step = parseInt(stepSelect.value, 10);
  return Number.isNaN(step) ? 1 : step;
}

function toLetter(index) {
  // Wraps around A-Z
  return String.fromCharCode(65 + (index % 26 + 26) % 26);
}

tabCounter.addEventListener("click", () => setActiveTab("counter"));
tabColors.addEventListener("click", () => setActiveTab("colors"));

colorTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    const key = tile.dataset.colorKey;
    const name = translations[currentLang].colors[key] || tile.textContent;
    speak(name);
  });
});

if (languageSelect) {
  languageSelect.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });

  applyLanguage(languageSelect.value);
} else {
  applyLanguage("en");
}

if (incBtn) {
  incBtn.addEventListener("click", () => {
    if (alphabetMode) {
      alphabetIndex = (alphabetIndex + 1) % 26;
      const letter = toLetter(alphabetIndex);
      if (countDisplay) countDisplay.textContent = letter;
      speak(letter);
    } else {
      count += getStep();
      updateDisplay();
      speak(count);
    }
  });
}

if (decBtn) {
  decBtn.addEventListener("click", () => {
    if (alphabetMode) {
      alphabetIndex = (alphabetIndex - 1 + 26) % 26;
      const letter = toLetter(alphabetIndex);
      if (countDisplay) countDisplay.textContent = letter;
      speak(letter);
    } else {
      count -= getStep();
      updateDisplay();
      speak(count);
    }
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (alphabetMode) {
      alphabetIndex = 0;
      if (countDisplay) countDisplay.textContent = "A";
      speak("A");
    } else {
      count = 0;
      updateDisplay();
      speak("zero");
    }
  });
}

if (alphabetBtn) {
  alphabetBtn.addEventListener("click", () => {
    alphabetMode = !alphabetMode;

    if (alphabetMode) {
      // Switch to alphabet mode
      if (countDisplay) countDisplay.textContent = "A";
      alphabetIndex = 0;
      if (controlDiv) controlDiv.style.display = "none";
      count = 0;
      alphabetBtn.textContent = "Number Mode";
      speak("A");
    } else {
      // Switch back to number mode
      if (controlDiv) controlDiv.style.display = "flex";
      if (countDisplay) countDisplay.textContent = count;
      alphabetBtn.textContent = "Alphabet Mode";
      speak(count);
    }
  });
}
