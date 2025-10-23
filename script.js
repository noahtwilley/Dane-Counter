// --- State ---
let count = 0;

// --- DOM Elements ---
const countDisplay = document.getElementById("count");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const resetBtn = document.getElementById("reset");

// --- Core Functions ---
function speak(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(text));
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

function updateDisplay() {
  countDisplay.textContent = count;
}

// --- Event Handlers ---
function increment() {
  count++;
  updateDisplay();
  speak(count);
}

function decrement() {
  count--;
  updateDisplay();
  speak(count);
}

function resetCounter() {
  count = 0;
  updateDisplay();
  speak("zero");
}

// --- Event Listeners ---
incBtn.addEventListener("click", increment);
decBtn.addEventListener("click", decrement);
resetBtn.addEventListener("click", resetCounter);
