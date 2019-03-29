const video = document.querySelector(".viewer");
const toggle = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const rangeSliders = document.querySelectorAll(".player__slider");
const progressBar = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = this.paused ? "►" : "❚ ❚";
}

function skipVideo() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e) {
  const currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = currentTime;
}

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("pause", updateButton);
video.addEventListener("play", updateButton);

skipButtons.forEach(skipButton =>
  skipButton.addEventListener("click", skipVideo)
);

rangeSliders.forEach(rangeSlider => {
  rangeSlider.addEventListener("change", handleRangeUpdate);
  rangeSlider.addEventListener("mousemove", handleRangeUpdate);
});

video.addEventListener("timeupdate", handleProgress);

progress.addEventListener("click", scrub);

let mousedown = false;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
// not using mouseout because, moving mouse exactly on the progressbar is very hard
progress.addEventListener("mousemove", e => mousedown && scrub(e));
