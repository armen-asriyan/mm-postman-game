const background = document.getElementById("background");
const gameContainer = document.getElementById("game-container");

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
  playMusic();
});

function createImages() {
  const currentImages = background.getElementsByClassName("symbol");
  if (currentImages.length >= 5) {
    background.removeChild(currentImages[0]);
  }

  const img = document.createElement("img");
  img.src = symbols[Math.floor(Math.random() * symbols.length)];
  img.style.left = Math.random() * 96 + "%";
  img.style.top = Math.random() * 91 + "%";
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

// function playMusic() {
//   let intro = new Audio("audio/music-intro.wav");
//   let music = new Audio("audio/music.wav");
//   intro.play();
//   intro.loop = false;

//   intro.onended = function () {
//     music.play();
//     music.loop = true;
//   };
// }
