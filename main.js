//SECTION navigation
(() => {
  const startPage = document.getElementById("start-page");
  const singleplayerPage = document.getElementById("singleplayer-page");
  const multiplayerPage = document.getElementById("multiplayer-page");
  const gamePage = document.getElementById("game-page");
  // TODO work on header

  //*SECTION Start Page

  const singleplayerButton = document.getElementById("singleplayer-button");
  const multiplayerButton = document.getElementById("multiplayer-button");

  singleplayerButton.addEventListener("click", () => {
    startPage.classList.add("hidden");
    singleplayerPage.classList.remove("hidden");
  });

  multiplayerButton.addEventListener("click", () => {
    startPage.classList.add("hidden");
    multiplayerPage.classList.remove("hidden");

    mpStart();
  });

  //*SECTION SingleplayerPage MultiplayerPage GamePage

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

//*SECTION MultiPlayer Page
let mpStart = () => {
  const startButton = document.getElementById("mpStart");
  const restartButton = document.getElementById("restart-button");
  const startGame = () => {
    let xName = document.getElementById("player-x-name");
    let oName = document.getElementById("player-o-name");
    game(xName.value, oName.value);
  };
  startButton.addEventListener("click", () => {
    startGame();
  });
  restartButton.addEventListener("click", () => {
    startGame();
  });
};

//*SECTION GamePage

const game = (playerx, playero) => {
  const status = document.querySelector("h4");
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
  status.innerText = `${playerx}'s turn...`;
  playsquares.forEach((square) => {
    square.replaceWith(square.cloneNode(true)); // fix duplicating events
  });
  playsquares = document.querySelectorAll(".playsquare");
  playsquares.forEach((square) => {
    square.firstChild.innerText = "";
    square.style.pointerEvents = "";

    square.addEventListener(
      "click",
      () => {
        square.firstChild.innerText = sign;
        if (status.innerText === `${playerx}'s turn...`) {
          status.innerText = `${playero}'s turn...`;
        } else {
          status.innerText = `${playerx}'s turn...`;
        }
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
          endGame(winner, playerx, playero, status, playsquares);
        } else if (counter == 9) {
          endGame(winner, playerx, playero, status, playsquares);
        }
        sign === "X" ? (sign = "O") : (sign = "X");
      },
      { once: true }
    );
  });
};
const endGame = (winner, playerx, playero, status, playsquares) => {
  playsquares.forEach((square) => (square.style.pointerEvents = "none"));

  if (winner === "X") {
    status.innerText = `${playerx} is the winner`;
  } else if (winner === "O") {
    status.innerText = `${playero} is the winner`;
  } else {
    status.innerText = `it's a draw`;
  }
};

mpStart();
