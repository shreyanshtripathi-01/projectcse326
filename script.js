const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const volumeBtn = document.querySelector(".volume-btn");
const volumeSlider = document.querySelector(".volume-slider");

// Check if playing
let isPlaying = false;
// Current Song Index
let songIndex = 0;

// Music
const songs = [
  {
    name: "song-1",
    displayName: "Kesariya",
    artist: "Arjit Singh",
  },
  {
    name: "song-2",
    displayName: "Qaafirana",
    artist: "Arjit Singh",
  },
  {
    name: "song-3",
    displayName: "Chaleya",
    artist: "Arjit Singh",
  },
  {
    name: "song-4",
    displayName: "Heeriye",
    artist: "Arjit Singh",
  },
  {
    name: "song-5",
    displayName: "Shiv Samarahe",
    artist: "Hansraj Raghuvanshi",
  },
  {
    name: "song-6",
    displayName: "Jaikal Mahakal",
    artist: "Amit Trivedi",
  },
  {
    name: "song-7",
    displayName: "Babam Bam",
    artist: "Kailash Kher",
  },
  {
    name: "song-8",
    displayName: "Deva Deva",
    artist: "Arjit Singh",
  },
  {
    name: "song-9",
    displayName: "Shish Nawata Hoon",
    artist: "Jubin Nautiyal",
  },
  {
    name: "song-10",
    displayName: "Oonchi Oonchi Wadi",
    artist: "Hansraj Raghuwanshi",
  },
  {
    name: "song-11",
    displayName: "Bholenath 2 - The Destroyer",
    artist: "Shubham Tomar",
  }
];

// Random Background Color

// Update DOM
const loadSong = function (song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;

  // Check for specific song and set the background color accordingly
  if (song.name === "song-1") {
    // Set a permanent color for song-1
    document.body.style.background = "#aeb8c1";
  }

  else if (song.name === "song-2") {
    // Set a permanent color for song-2
    document.body.style.background = "#a8bcc4";
  }

  else if (song.name === "song-3") {
    // Set a permanent color for song-3
    document.body.style.background = "#e79b76";
  }

  else if (song.name === "song-4") {
    // Set a permanent color for song-4
    document.body.style.background = "#bead86";
  }

  else if (song.name === "song-5") {
    // Set a permanent color for song-5
    document.body.style.background = "#6bafbf";
  }

  else if (song.name === "song-6") {
    // Set a permanent color for song-6
    document.body.style.background = "#d0bcb2";
  }

  else if (song.name === "song-7") {
    // Set a permanent color for song-7
    document.body.style.background = "#9a5781";
  }

  else if (song.name === "song-8") {
    // Set a permanent color for song-8
    document.body.style.background = "#4c5c8b";
  }

  else if (song.name === "song-9") {
    // Set a permanent color for song-9
    document.body.style.background = "#d2e5eb";
  }

  else if (song.name === "song-10") {
    // Set a permanent color for song-10
    document.body.style.background = "#c1ab9c";
  }

  else if (song.name === "song-11") {
    // Set a permanent color for song-11
    document.body.style.background = "#a03a1f";
  }

  else {
    // Generate a random background color for other songs
    randomBgColor();
  }
};

// On Load - Select First Song
loadSong(songs[songIndex]);

// Play
const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Mute/Unmute
const toggleMute = function () {
  if (music.muted) {
    music.muted = false;
    volumeSlider.value = 50;
    volumeBtn.classList.replace("fa-volume-mute", "fa-volume-up");
    volumeBtn.setAttribute("title", "Mute");
  } else {
    music.muted = true;
    volumeSlider.value = 0;
    volumeBtn.classList.replace("fa-volume-up", "fa-volume-mute");
    volumeBtn.setAttribute("title", "Unmute");
  }
}

// Update Progress Bar & Time
const updateProgressBar = function (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Next Song
const nextSong = function () {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Previous Song
const prevSong = function () {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Set Progress Bar
const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;

  music.currentTime = (clickX / width) * duration;
};

// Set Volume
const setVolume = function () {
  music.volume = volumeSlider.value / 100;
};

// Event Listeners
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
volumeBtn.addEventListener("click", toggleMute);
progressContainer.addEventListener("click", setProgressBar);