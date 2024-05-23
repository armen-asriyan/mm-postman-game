const background = document.getElementById("background");

const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

const audioPrompt = document.getElementById("audio-prompt");

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const arrow = document.getElementById("arrow");
const chevron = document.querySelector(".chevron");

const rules = document.getElementById("rules");
const postman = document.querySelector(".postman");

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
  backgroundSymbols();
});

function backgroundSymbols() {
  const currentImages = background.getElementsByClassName("symbol");
  if (currentImages.length >= 5) {
    background.removeChild(currentImages[0]);
  }

  const img = document.createElement("img");
  img.src = symbols[Math.floor(Math.random() * symbols.length)];
  img.style.left = Math.random() * 85 + "%";
  img.style.top = Math.random() * 85 + "%";
  img.style.filter = "blur(0.9px)";
  img.className = "symbol";
  img.alt = "";
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

setInterval(backgroundSymbols, 1000);

//DIALOG BOX

let dialogBoxWidth = canvas.width - 100;
let dialogBoxHeight = 250;

const dialogBoxX = 55;
const dialogBoxY = canvas.height - dialogBoxHeight - 50;

ctx.strokeStyle = "rgba(0 0 0 / 0.8)";
ctx.fillStyle = "rgba(0 0 0 / 0.8)";
ctx.beginPath();

// roundRect(x, y, width, height, radii)
ctx.roundRect(dialogBoxX, dialogBoxY, dialogBoxWidth, dialogBoxHeight, [30]);
ctx.stroke();
ctx.fill();

// DIALOG BOX TEXT
const textX = dialogBoxX + 40;
const textY = dialogBoxY + 60;

ctx.filter = "blur(1.1px)";
ctx.fillStyle = "white";
ctx.font = "bold 2em ChiaroStd-B";

// DIALOG BOX QUESTION
let firstPart = "Would you like to have ";
let audioPart = "audio";
ctx.fillText(firstPart, textX, textY);

// Calculate the width of the of the text
let firstPartWidth = ctx.measureText(firstPart).width;
let audioPartWidth = ctx.measureText(audioPart).width;

// Change color for the word "audio"
ctx.fillStyle = "red";

// Draw the word "audio" immediately after the first part of the text
ctx.fillText(audioPart, textX + firstPartWidth, textY);

ctx.fillStyle = "white";
ctx.fillText("?", textX + (audioPartWidth + firstPartWidth), textY);

const buttonX = dialogBoxX + 30;
const buttonY = dialogBoxY + 120;
const buttonWidth = 100;
const buttonHeight = 30;

// Draw the "Yes" button
ctx.fillStyle = "#48ff4a";
ctx.fillText("Yes", buttonX + 30, buttonY + 20);

// Draw the "No" button
ctx.fillText("No", buttonX + 30, buttonY + 70);
