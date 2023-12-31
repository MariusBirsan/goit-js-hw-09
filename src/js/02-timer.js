import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataObj = {
    days: document.querySelector("span[data-days]"),
    seconds: document.querySelector("span[data-seconds]"),
    minutes: document.querySelector("span[data-minutes]"),
    hours: document.querySelector("span[data-hours]"),
    btn: document.querySelector("button[data-start]"),
  };
  
  let timerId = null;
  dataObj.btn.setAttribute("disabled", true);

  dataObj.btn.addEventListener("click", timerStart);
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
      const currentDate = new Date();
      console.log(selectedDates[0]);
      if (selectedDates[0] - currentDate > 0) {
        dataObj.btn.disabled = false;
      } else {
        dataObj.btn.disabled = true;
        Notify.failure("Please choose a date in the future", {
          timeout: 1500,
          width: "400px",
        });
      }
    },
  };
  
  const frame = flatpickr("#datetime-picker", options);
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }
  
  function timerStart() {
    const selectedDate = frame.selectedDates[0];
  
    timerId = setInterval(() => {
      const current = new Date();
      const diff = selectedDate - current;
      dataObj.btn.disabled = true;
  
      if (diff < 0) {
        clearInterval(timerId);
        Notify.success("Time end");
        return;
      }
      showTime(convertMs(diff));
    }, 1000);
  }
  
  function showTime({ days, hours, minutes, seconds }) {
    dataObj.days.textContent = addLeadingZero(days);
    dataObj.hours.textContent = addLeadingZero(hours);
    dataObj.minutes.textContent = addLeadingZero(minutes);
    dataObj.seconds.textContent = addLeadingZero(seconds);
  }
  
  