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
  no: {
    tabCounter: "Teller",
    tabColors: "Farger",
    stepLabel: "Øk med:",
    decrease: "Mindre",
    increase: "Mer",
    reset: "Nullstill",
    alphabet: "Alfabet",
    colorsTitle: "Farger",
    languageLabel: "Språk",
    colors: {
      red: "Rød",
      orange: "Oransje",
      yellow: "Gul",
      green: "Grønn",
      blue: "Blå",
      indigo: "Indigo",
      violet: "Fiolett",
    },
  },
};

let currentLang = "en";

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  currentLang = lang;

  tabCounter.textContent = t.tabCounter;
  tabColors.textContent = t.tabColors;
  stepLabel.textContent = t.stepLabel;
  decBtn.textContent = t.decrease;
  incBtn.textContent = t.increase;
  resetBtn.textContent = t.reset;
  alphabetBtn.textContent = t.alphabet;
  colorsTitle.textContent = t.colorsTitle;
  languageLabel.textContent = t.languageLabel;

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
  countDisplay.textContent = count;
}

function getStep() {
  return parseInt(stepSelect.value);
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

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

applyLanguage(languageSelect.value);

incBtn.addEventListener("click", () => {
  if (alphabetMode) {
    alphabetIndex = (alphabetIndex + 1) % 26;
    const letter = toLetter(alphabetIndex);
    countDisplay.textContent = letter;
    speak(letter);
  } else {
    count += getStep();
    updateDisplay();
    speak(count);
  }
});

decBtn.addEventListener("click", () => {
  if (alphabetMode) {
    alphabetIndex = (alphabetIndex - 1 + 26) % 26;
    const letter = toLetter(alphabetIndex);
    countDisplay.textContent = letter;
    speak(letter);
  } else {
    count -= getStep();
    updateDisplay();
    speak(count);
  }
});

resetBtn.addEventListener("click", () => {
  if (alphabetMode) {
    alphabetIndex = 0;
    countDisplay.textContent = "A";
    speak("A");
  } else {
    count = 0;
    updateDisplay();
    speak("zero");
  }
});

alphabetBtn.addEventListener("click", () => {
  alphabetMode = !alphabetMode;

  if (alphabetMode) {
    // Switch to alphabet mode
    countDisplay.textContent = "A";
    alphabetIndex = 0;
    controlDiv.style.display = "none";
    count = 0;
    alphabetBtn.textContent = "Number Mode";
    speak("A");
  } else {
    // Switch back to number mode
    controlDiv.style.display = "flex";
    countDisplay.textContent = count;
    alphabetBtn.textContent = "Alphabet Mode";
    speak(count);
  }
});
