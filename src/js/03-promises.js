import Notiflix from 'notiflix';
//------------------------------------------------------------
const refs = {
  submitButtonRef: document.querySelector('[type="submit"]'),
  formRef: document.querySelector('form'),
  firstDelayInput: document.querySelector('[name="delay"]'),
  secondDelayInput: document.querySelector('[name="step"]'),
  amountOfDelays: document.querySelector('[name="amount"]'),
};

//------------------------------------------------------------
refs.firstDelayInput.step = '500';
refs.secondDelayInput.step = '500';
//------------------------------------------------------------
let promiseCounter;
let firstIntervalId;
let secondDelayIntervalId;
//------------------------------------------------------------
refs.formRef.addEventListener('submit', onFormSubmit);
//------------------------------------------------------------
function onFormSubmit(event) {
  event.preventDefault();
  refs.submitButtonRef.disabled = true;
  promiseCounter = 1;
  firstIntervalId = setInterval(
    () => {
      createPromise(refs.firstDelayInput.value);

      clearInterval(firstIntervalId);

      if (refs.amountOfDelays.value > 1) {
        secondDelayIntervalId = setInterval(
          () => {
            secondDelayHandler(refs.secondDelayInput.value);
          },
          refs.secondDelayInput.value,
          refs.secondDelayInput.value
        );
      } else if (refs.amountOfDelays.value == 1) {
        refs.submitButtonRef.disabled = false;
      }
    },
    refs.firstDelayInput.value,
    refs.firstDelayInput.value
  );
}
//------------------------------------------------------------
function secondDelayHandler(delay) {
  console.log(promiseCounter);
  if (promiseCounter == refs.amountOfDelays.value) {
    clearInterval(secondDelayIntervalId);
    refs.formRef.reset();
    refs.submitButtonRef.disabled = false;
  }
  createPromise(delay);
}
//------------------------------------------------------------
function createPromise(delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notiflix.Notify.success(
      `Fulfilled promise ${promiseCounter} in ${delay}ms`
    );
  } else {
    Notiflix.Notify.failure(`Rejected promise ${promiseCounter} in ${delay}ms`);
  }
  promiseCounter += 1;
}
//------------------------------------------------------------
