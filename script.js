const background = document.getElementById("background");
const gameContainer = document.getElementById("game-container");
const audioPrompt = document.getElementById("audio-prompt");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const arrow = document.getElementById("arrow");
const chevron = document.querySelector(".chevron");
const rules = document.getElementById("rules");
const postman = document.querySelector(".postman");

const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");

let intro = new Audio("audio/music-intro.wav");
let music = new Audio("audio/music.wav");
let yah = new Audio("audio/yah.wav");
let done = new Audio("audio/done.wav");
let next = new Audio("audio/next.wav");

let isMuted = false;

const symbols = [
  "symbols/clock.png",
  "symbols/deku.png",
  "symbols/fierce.png",
  "symbols/goron.png",
  "symbols/majora.png",
  "symbols/mirror.png",
  "symbols/moon.png",
  "symbols/ocarina.png",
  "symbols/zora.png",
];

window.addEventListener("load", (event) => {
  // playMusic();
  showArrow();
  buttonBehavior();
});

function createImages() {
  const currentImages = background.getElementsByClassName("symbol");
  if (currentImages.length >= 5) {
    background.removeChild(currentImages[0]);
  }

  const img = document.createElement("img");
  img.src = symbols[Math.floor(Math.random() * symbols.length)];
  img.style.left = Math.random() * 85 + "%";
  img.style.top = Math.random() * 85 + "%";
  img.className = "symbol";
  background.appendChild(img);

  // Fade-in effect
  setTimeout(() => {
    img.style.opacity = 0.8;
  }, 10);

  // Fade-out effect and removal
  setTimeout(() => {
    img.style.opacity = 0;
    setTimeout(() => {
      if (img.parentElement) {
        img.parentElement.removeChild(img);
      }
    }, 1000);
  }, 4000);
}

setInterval(createImages, 1000);

function startGame() {
  rules.style.display = "flex"; // Display the rules dialog box
  nextText();
}

function playMusic() {
  intro.play();
  intro.volume = 0.2;
  intro.loop = false;

  intro.onended = function () {
    music.play();
    music.volume = 0.2;
    music.loop = true;
  };
}

function showArrow() {
  yesButton.onmouseover = function () {
    arrow.style.top = "50%";
    arrow.style.visibility = "visible";
  };

  yesButton.onmouseout = function () {
    arrow.style.visibility = "hidden";
  };

  noButton.onmouseover = function () {
    arrow.style.top = "81%";
    arrow.style.visibility = "visible";
  };

  noButton.onmouseout = function () {
    arrow.style.visibility = "hidden";
  };
}

function buttonBehavior() {
  yesButton.onclick = function () {
    isMuted = false;
    playMusic();
    audioPrompt.remove();
    startGame();
    yah.play();
    yah.volume = 0.6;

    setTimeout(function () {
      chevron.style.visibility = "visible";
      postman.style.animation = "none";
    }, 3200);
  };

  noButton.onclick = function () {
    isMuted = true;
    audioPrompt.remove();
    startGame();

    setTimeout(function () {
      chevron.style.visibility = "visible";
      postman.style.animation = "none";
    }, 3200);
  };
}

function nextText() {
  chevron.onclick = function () {
    if (!isMuted) {
      next.play();
    }
    text1.style.display = "none";
    text2.style.display = "block";
    postman.offsetHeight; /* trigger reflow */
    postman.style.animation = null;
    setTimeout(function () {
      chevron.style.visibility = "visible";
      postman.style.animation = "none";
    }, 3200);
  };
}
