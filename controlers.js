const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const progressPoint = document.getElementById('progress-point');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let isDragging = false;

// Play or pause the audio
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = `<i class="fa fa-pause" aria-hidden="true"  id="play-pause-btn">`;
  } else {
    audio.pause();
    playPauseBtn.innerHTML = `<i class="fa fa-play" aria-hidden="true"  id="play-pause-btn">`;
  }
});

// Update progress bar and time
audio.addEventListener('timeupdate', updateProgress);

// Set duration when metadata is loaded
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Seek in the audio when clicking on the progress bar
progressContainer.addEventListener('click', (e) => {
  seekAudio(e.offsetX);
});

// Drag the progress point
progressPoint.addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    seekAudio(offsetX);
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
  }
});

// Update progress bar and current time
function updateProgress() {
  if (!isDragging) {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    progressPoint.style.left = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
  }
}

// Seek audio based on click or drag position
function seekAudio(offsetX) {
  const width = progressContainer.clientWidth;
  const duration = audio.duration;
  const newTime = (offsetX / width) * duration;

  // Update audio time and progress bar
  audio.currentTime = newTime;
  const progressPercent = (newTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  progressPoint.style.left = `${progressPercent}%`;
}

// Format time in minutes:seconds
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}