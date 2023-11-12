import '../css/common.css';

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let isColorRunning = null;
let body = document.querySelector('body');

btnStart.addEventListener('click', startInterval);

btnStop.addEventListener('click', stopInterval);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function startInterval() {
  isColorRunning = setInterval(changeColor, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function stopInterval() {
  clearInterval(isColorRunning);
  btnStop.disabled = true;
  btnStart.disabled = false;
}
