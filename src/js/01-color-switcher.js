function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButtonRef = document.querySelector('[data-start]');
const stopButtonRef = document.querySelector('[data-stop]');

function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
startButtonRef.addEventListener('click', () => {
  timerId = setInterval(changeBodyColor, 1000);
  document.querySelector('[data-start]').disabled = true;
  stopButtonRef.addEventListener(
    'click',
    () => {
      clearInterval(timerId);
      document.querySelector('[data-start]').disabled = false;
    },
    { once: true }
  );
});
