const daysInput = document.getElementById('days');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const daysElement = document.querySelector('.days');
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');

let totalSeconds;
let interval;

function updateTimer() {
  if (totalSeconds < 0) {
    clearInterval(interval);
    clearInputs();
    return;
  }

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  daysElement.textContent = padZero(days);
  hoursElement.textContent = padZero(hours);
  minutesElement.textContent = padZero(minutes);
  secondsElement.textContent = padZero(seconds);

  totalSeconds--;
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}

function startTimer() {
  const days = parseInt(daysInput.value) || 0;
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  if (!seconds && !minutes && !hours && !days) {
    alert('Please enter at least the seconds value.');
    return;
  }

  totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;

  interval = setInterval(updateTimer, 1000);
  disableInputs();
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
}

function pauseTimer() {
  clearInterval(interval);
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetTimer() {
  clearInterval(interval);
  totalSeconds = 0;
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  enableInputs();
  clearInputs();
  startButton.disabled = true;
  pauseButton.disabled = true;
  resetButton.disabled = true;
}

function enableButtons() {
  const seconds = parseInt(secondsInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const hours = parseInt(hoursInput.value) || 0;
  const days = parseInt(daysInput.value) || 0;

  if (seconds || minutes || hours || days) {
    startButton.disabled = false;
    resetButton.disabled = false;
  } else {
    startButton.disabled = true;
    resetButton.disabled = true;
  }
  pauseButton.disabled = true;
}

function disableInputs() {
  daysInput.disabled = true;
  hoursInput.disabled = true;
  minutesInput.disabled = true;
  secondsInput.disabled = true;
}

function enableInputs() {
  daysInput.disabled = false;
  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
}

function clearInputs() {
  daysInput.value = '';
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
}

daysInput.addEventListener('input', enableButtons);
hoursInput.addEventListener('input', enableButtons);
minutesInput.addEventListener('input', enableButtons);
secondsInput.addEventListener('input', enableButtons);
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);