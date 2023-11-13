import { Notify } from "notiflix/build/notiflix-notify-aio";

const formInput = document.querySelector("form");

formInput.addEventListener("click", submitBtn);

function submitBtn(e) {
  e.preventDefault();
  let delay = Number(formInput.delay.value);
  for (let i = 1; i < formInput.amount.value; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += Number(formInput.step.value);
  }
}

function createPromise(position, delay) {
  const promiseOutput = { position, delay };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(promiseOutput);
      } else {
        reject(promiseOutput);
      }
    }, delay);
  });
}