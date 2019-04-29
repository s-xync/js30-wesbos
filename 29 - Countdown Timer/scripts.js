const buttons = document.querySelectorAll("[data-time]");
const timeLeftDiv = document.querySelector(".display__time-left");
const endTimeDiv = document.querySelector(".display__end-time");

let countdownTimer;

function timer(seconds) {
  clearInterval(countdownTimer);

  const now = Date.now();
  const endTime = now + seconds * 1000;
  displayEndTime(endTime);
  displayTimeLeft(seconds);
  countdownTimer = setInterval(() => {
    const timeLeft = Math.round((endTime - Date.now()) / 1000);
    if (timeLeft < 0) {
      clearInterval(countdownTimer);
      displayTimeLeft(0);
      return;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}

function displayTimeLeft(timeLeft) {
  const seconds = timeLeft % 60;
  const minutes = Math.floor(timeLeft / 60);
  const display = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  document.title = display;
  timeLeftDiv.textContent = display;
}

function displayEndTime(endTime) {
  const date = new Date(endTime);
  const minutes = date.getMinutes();
  const hours = date.getHours();
  endTimeDiv.textContent = `Be Back At ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

buttons.forEach(button => {
  button.addEventListener("click", function() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  });
});

document.customForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const mins = parseInt(this.minutes.value);
  timer(mins * 60);
  this.reset();
});
