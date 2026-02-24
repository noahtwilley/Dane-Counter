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
  utterance.lang = "en-US";
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
    const name = tile.dataset.color || tile.textContent;
    speak(name);
  });
});

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
