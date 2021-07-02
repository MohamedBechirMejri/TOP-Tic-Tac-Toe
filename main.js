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
  let counter = 0;
  let winner = "D"; //draw
  let pickOrder = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };

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
        let id = square.getAttribute("id");
        pickOrder[id] = sign;
        ++counter;
        if (
          (pickOrder[1] === pickOrder[2] && pickOrder[2] === pickOrder[3]) ||
          (pickOrder[4] === pickOrder[5] && pickOrder[5] === pickOrder[6]) ||
          (pickOrder[7] === pickOrder[8] && pickOrder[8] === pickOrder[9]) ||
          (pickOrder[1] === pickOrder[4] && pickOrder[4] === pickOrder[7]) ||
          (pickOrder[2] === pickOrder[5] && pickOrder[5] === pickOrder[8]) ||
          (pickOrder[3] === pickOrder[6] && pickOrder[6] === pickOrder[9]) ||
          (pickOrder[1] === pickOrder[5] && pickOrder[5] === pickOrder[9]) ||
          (pickOrder[3] === pickOrder[5] && pickOrder[5] === pickOrder[7])
        ) {
          winner = sign;
          endGame(winner);
        } else if (counter == 9) {
          endGame(winner);
        }
        sign === "X" ? (sign = "O") : (sign = "X");
        //TODO show which one's turn
      },
      { once: true }
    );
  });
};
game();
const endGame = (winner) => {
  const status = document.querySelector("h4");
  winner === "X"
    ? (status.innerText = `playerx is the winner`)
    : winner === "O"
    ? (status.innerText = `playero is the winner`)
    : (status.innerText = `it's a draw`);
};
