const background = document.getElementById("background");
const gameContainer = document.getElementById("game-container");
const audioPromptContainer = document.getElementById("audio-prompt-container");
const rulesContainer = document.getElementById("rules-container");

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

const arrow = document.getElementById("arrow");
const chevron = document.querySelector(".chevron");
const convoDone = document.querySelector(".convo-done");

const postman = document.querySelector(".postman");
const clock = document.getElementById("clock");

const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");
const text4 = document.getElementById("text4");
const text5 = document.getElementById("text5");
const text6 = document.getElementById("text6");
const text7 = document.getElementById("text7");

const timerTextSeconds = document.getElementById("seconds");
const timerTextMilliSeconds = document.getElementById("milliseconds");

let intro = new Audio("audio/music-intro.wav");
let music = new Audio("audio/music.wav");
let yah = new Audio("audio/yah.wav");
let doneAudio = new Audio("audio/done.wav");
let next = new Audio("audio/next.wav");
let timerStart = new Audio("audio/timer-sound.wav");
let timerStop = new Audio("audio/timer-stop.wav");
let win = new Audio("audio/win.wav");
let lose = new Audio("audio/lose.wav");

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
  rulesContainer.style.display = "flex"; // Display the rulesContainer dialog box
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
    audioPromptContainer.remove();
    startGame();
    yah.volume = 0.6;
    yah.play();
    text1.style.display = "block";

    setTimeout(function () {
      chevron.style.visibility = "visible";
      postman.style.animation = "none";
    }, 3200);
  };

  noButton.onclick = function () {
    isMuted = true;
    audioPromptContainer.remove();
    startGame();
    text1.style.display = "block";

    setTimeout(function () {
      chevron.style.visibility = "visible";
      postman.style.animation = "none";
    }, 3200);
  };
}

let chevronClickCount = 0;

function nextText() {
  chevron.onclick = function () {
    if (!isMuted) {
      next.volume = 0.6;
      next.play();
    }
    if (chevronClickCount === 0) {
      text1.style.display = "none";
      text2.style.display = "block";
      postman.offsetHeight; /* trigger reflow */
      postman.style.animation = null;
      chevron.style.visibility = "hidden";
      setTimeout(function () {
        chevron.style.visibility = "visible";
        postman.style.animation = "none";
      }, 3200);
      chevronClickCount++;
    } else if (chevronClickCount === 1) {
      text1.style.display = "none";
      text2.style.display = "none";
      text3.style.display = "block";
      postman.offsetHeight; /* trigger reflow */
      postman.style.animation = null;
      chevron.style.visibility = "hidden";
      setTimeout(function () {
        chevron.style.visibility = "visible";
        postman.style.animation = "none";
      }, 3200);
      chevronClickCount++;
    } else if (chevronClickCount === 2) {
      text1.style.display = "none";
      text2.style.display = "none";
      text3.style.display = "none";
      text4.style.display = "block";
      postman.offsetHeight; /* trigger reflow */
      postman.style.animation = null;

      chevron.style.visibility = "hidden";
      setTimeout(function () {
        if (!isMuted) {
          doneAudio.volume = 0.3;
          doneAudio.play();
        }
        startButton.style.visibility = "visible";
        postman.style.animation = "none";
      }, 3200);
      chevronClickCount++;
      startTimer();
    }
  };
}

let timerSeconds = 0;
let timerMilliSeconds = 0;

function startTimer() {
  startButton.onclick = function () {
    if (!isMuted) {
      music.pause();
      timerStart.volume = 0.3;
      timerStart.play();
    }
    text4.style.display = "none";
    startButton.style.display = "none";
    rulesContainer.style.display = "none";
    clock.style.display = "block";
    countUpTimer();
  };
}

function countUpTimer() {
  let startTime = Date.now();

  setInterval(function () {
    // Calculate elapsed time
    let elapsedTime = Date.now() - startTime;

    // Calculate seconds and milliseconds
    timerSeconds = Math.floor(elapsedTime / 1000);
    timerMilliSeconds = Math.floor((elapsedTime % 1000) / 10);
    // Update the display
    timerTextSeconds.innerHTML = timerSeconds.toString().padStart(2, "0") + ":";
    timerTextMilliSeconds.innerHTML = timerMilliSeconds;
    if (timerSeconds >= 3) {
      timerTextSeconds.innerHTML = "";
      timerTextMilliSeconds.innerHTML = "";
    }
  }, 10);
  setTimeout(function () {
    stopButton.style.visibility = "visible";
  }, 3000);
  showResults();
}

function showResults() {
  stopButton.onclick = function () {
    if (!isMuted) {
      timerStop.volume = 0.6;
      timerStop.play();
    }
    clock.style.display = "none";

    stopButton.style.display = "none";
    rulesContainer.style.display = "flex";
    text1.style.display = "none";
    text2.style.display = "none";
    text3.style.display = "none";
    text4.style.display = "none";
    text5.style.display = "block";
    text5.innerHTML = "Your time was " + timerSeconds + '"' + timerMilliSeconds;

    setTimeout(function () {
      chevron.style.visibility = "visible";
    }, 1000);

    if (timerSeconds === 10 && timerMilliSeconds === 0) {
      // TODO: Win text
      if (!isMuted) {
        win.play();
      }
    } else {
      // Play lose sound
      if (!isMuted) {
        setTimeout(function () {
          lose.play();
        }, 1000);
      }
      chevronClickCount = 3;
      chevron.onclick = function () {
        if (chevronClickCount === 3) {
          chevron.style.visibility = "hidden";
          text5.style.display = "none";
          text6.innerHTML = "See! I told you it's difficult!";
          text6.style.display = "block";
          postman.offsetHeight; /* trigger reflow */
          postman.style.animation = null;

          setTimeout(function () {
            chevron.style.visibility = "visible";
            postman.style.animation = "none";
          }, 1000);

          if (!isMuted) {
            next.play();
          }
          chevronClickCount++;
        } else if (chevronClickCount === 4) {
          tryAgain();
        }
      };
    }
  };
}

function tryAgain() {
  chevron.style.visibility = "hidden";
  text6.style.display = "none";
  text7.innerHTML = "Do you wanna try again?";
  text7.style.display = "block";
  postman.offsetHeight; /* trigger reflow */
  postman.style.animation = null;

  setTimeout(function () {
    postman.style.animation = "none";
    startButton.style.display = "block";
    startTimer();
    setTimeout(function () {
      stopButton.style.visibility = "visible";
    }, 3000);
  }, 1000);

  if (!isMuted) {
    next.play();
  }
  chevronClickCount++; // Increment to track the try again stage
}
