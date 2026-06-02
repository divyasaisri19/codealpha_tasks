const audio = document.getElementById("audio");
const title = document.getElementById("songTitle");
const artist = document.getElementById("songArtist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const albumArt = document.getElementById("albumArt");
const playlistEl = document.getElementById("playlist");

const songs = [
  { title: "Song 1", artist: "Unknown", src: "music/song1.mp3" },
  { title: "Song 2", artist: "Unknown", src: "music/song2.mp3" },
  { title: "Song 3", artist: "Unknown", src: "music/song3.mp3" },
  { title: "Song 4", artist: "Unknown", src: "music/song4.mp3" }
];

let index = 0;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
  highlight();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
    albumArt.classList.remove("paused");
  } else {
    audio.pause();
    playBtn.innerText = "▶";
    albumArt.classList.add("paused");
  }
}

function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(songs[index]);
  audio.play();
  playBtn.innerText = "⏸";
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(songs[index]);
  audio.play();
  playBtn.innerText = "⏸";
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

// Playlist UI
function buildPlaylist() {
  songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.innerText = song.title;

    li.onclick = () => {
      index = i;
      loadSong(song);
      audio.play();
      playBtn.innerText = "⏸";
    };

    playlistEl.appendChild(li);
  });
}

function highlight() {
  document.querySelectorAll(".playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

// INIT
buildPlaylist();
loadSong(songs[index]);
albumArt.classList.add("paused");