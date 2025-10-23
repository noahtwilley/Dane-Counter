let count = 0;
const countDisplay = document.getElementById("count");
const incBtn = document.getElementById("inc");
const resetBtn = document.getElementById("reset");

function speak(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(text));
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

function updateDisplay() {
  countDisplay.textContent = count;
}

function increment() {
  count++;
  updateDisplay();
  speak(count);
}

function resetCounter() {
  count = 0;
  updateDisplay();
  speak("zero");
}

incBtn.addEventListener("click", increment);
resetBtn.addEventListener("click", resetCounter);
