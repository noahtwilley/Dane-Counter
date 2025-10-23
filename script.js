let count = 0;

const countDisplay = document.getElementById("count");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const resetBtn = document.getElementById("reset");
const stepSelect = document.getElementById("step");

function speak(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(text));
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

function updateDisplay() {
  countDisplay.textContent = count;
}

function getStep() {
  return parseInt(stepSelect.value);
}

incBtn.addEventListener("click", () => {
  count += getStep();
  updateDisplay();
  speak(count);
});

decBtn.addEventListener("click", () => {
  count -= getStep();
  updateDisplay();
  speak(count);
});

resetBtn.addEventListener("click", () => {
  count = 0;
  updateDisplay();
  speak("zero");
});
