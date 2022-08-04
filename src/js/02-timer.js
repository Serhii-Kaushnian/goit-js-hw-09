const { default: flatpickr } = require('flatpickr');
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const startButtonRef = document.querySelector('[data-start]');
const timerDivRef = document.querySelector('.timer');
const daysSpanRef = document.querySelector('[data-days]');
const hoursSpanRef = document.querySelector('[data-hours]');
const minutesSpanRef = document.querySelector('[data-minutes]');
const secondsSpanRef = document.querySelector('[data-seconds]');

startButtonRef.disabled = true;

let intervalIdForSetInterval;
let intervalIdForStartFromCurrentTime;
let deltaTime;
let globalCounter = 0;

const currentTime = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates[0]) {
      return;
    }

    deltaTime = selectedDates[0] - Date.now();
    if (deltaTime <= 0) {
      alertMessage();
    } else if (deltaTime > 0) {
      globalCounter = 0;
      intervalIdForStartFromCurrentTime = setInterval(
        startFromCurrentTime,
        1000
      );
      Notiflix.Notify.success('Now You can start Coundown');
      startButtonRef.disabled = false;
      dateInput.disabled = true;
      basicMarkUp(deltaTime);
    }
  },
};
const datePicker = flatpickr(dateInput, options);

function alertMessage() {
  startButtonRef.disabled = true;
  Notiflix.Notify.failure('Please choose a date in the future');
}

function basicMarkUp(deltaTime) {
  const seconds = Math.floor(deltaTime / 1000) % 60;
  const minutes = Math.floor(deltaTime / 1000 / 60) % 60;
  const hours = Math.floor(deltaTime / 1000 / 60 / 60) % 24;
  const days = Math.floor(deltaTime / 1000 / 60 / 60 / 24);

  daysSpanRef.textContent = days < 10 ? `0${days}` : days;
  hoursSpanRef.textContent = hours < 10 ? `0${hours}` : hours;
  minutesSpanRef.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsSpanRef.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

startButtonRef.addEventListener('click', () => {
  clearInterval(intervalIdForStartFromCurrentTime);
  deltaTime = deltaTime + globalCounter;
  intervalIdForSetInterval = setInterval(startCounting, 1000);
});

function startCounting() {
  startButtonRef.disabled = true;

  if (deltaTime < 2000) {
    Notiflix.Notify.success('Your Coundown fihished');
    dateInput.disabled = false;
    clearInterval(intervalIdForSetInterval);
    basicMarkUp(deltaTime);
  }

  deltaTime = deltaTime - 1000;

  basicMarkUp(deltaTime);
}

function startFromCurrentTime() {
  globalCounter -= 1000;
}
