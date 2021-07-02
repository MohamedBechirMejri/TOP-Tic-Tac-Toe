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
  let playsquares = document.querySelectorAll(".playsquare");
  let sign = "X";
  let pickOrder = [];

  playsquares.forEach((square) => {
    square.replaceWith(square.cloneNode(true)); // fix duplicating events
  });
  playsquares = document.querySelectorAll(".playsquare");
  playsquares.forEach((square) => {
    square.firstChild.innerText = "";

    square.addEventListener(
      "click",
      () => {
        square.firstChild.innerText = sign;
        pickOrder.push([square.getAttribute("id"), sign]);
        sign === "X" ? (sign = "O") : (sign = "X");

        console.log(pickOrder);
        //TODO show which one's turn
      },
      { once: true }
    );
  });
};
game();
