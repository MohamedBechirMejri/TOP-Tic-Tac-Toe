//SECTION navigation
(() => {
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

  //* SingleplayerPage MultiplayerPage GamePage

  const backButtons = document.querySelectorAll(".backbutton");
  const startButtons = document.querySelectorAll(".startbutton");

  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      startPage.classList.remove("hidden");
      singleplayerPage.classList.add("hidden");
      multiplayerPage.classList.add("hidden");
      gamePage.classList.add("hidden");
    });
  });

  startButtons.forEach((button) => {
    button.addEventListener("click", () => {
      singleplayerPage.classList.add("hidden");
      multiplayerPage.classList.add("hidden");
      gamePage.classList.remove("hidden");
    });
  });
})();

//* GamePage

const game = () => {
  const playsquares = document.querySelectorAll(".playsquare");
  let sign = "X";
  let counter = 0;
  playsquares.forEach((square) => {
    square.addEventListener("click", () => {
      square.firstChild.innerText = sign;
      sign === "X" ? (sign = "O") : (sign = "X");
    });
  });
};
game();
