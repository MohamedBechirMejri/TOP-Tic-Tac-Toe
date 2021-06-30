//SECTION navigation
const startPage = document.getElementById("start-page");
const singleplayerPage = document.getElementById("singleplayer-page");
const multiplayerPage = document.getElementById("multiplayer-page");
const gamePage = document.getElementById("game-page");
// TODO work on header

//* Start Page

const singleplayerButton = document.getElementById("singleplayer-button");
const multiplayerButton = document.getElementById("multiplayer-button");

singleplayerButton.addEventListener("click", () => {
  startPage.classList.add("hidden");
  singleplayerPage.classList.remove("hidden");
});

multiplayerButton.addEventListener("click", () => {
  startPage.classList.add("hidden");
  multiplayerPage.classList.remove("hidden");
});
