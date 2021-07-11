//SECTION navigation

(() => {
  const startPage = document.getElementById("start-page");
  const singleplayerPage = document.getElementById("singleplayer-page");
  const multiplayerPage = document.getElementById("multiplayer-page");
  const gamePage = document.getElementById("game-page");

  const header = document.getElementById("header");
  const logo = document.getElementById("logo");
  const title = document.getElementById("title");

  //*SECTION Start Page

  const singleplayerButton = document.getElementById("singleplayer-button");
  const multiplayerButton = document.getElementById("multiplayer-button");

  singleplayerButton.addEventListener("click", () => {
    startPage.classList.add("hidden");
    singleplayerPage.classList.remove("hidden");
    title.classList.remove("hidden");
    header.classList.add("nostart-header");
    logo.classList.add("nostart-logo");
    spStart();
  });

  multiplayerButton.addEventListener("click", () => {
    startPage.classList.add("hidden");
    multiplayerPage.classList.remove("hidden");
    title.classList.remove("hidden");
    header.classList.add("nostart-header");
    logo.classList.add("nostart-logo");
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
      title.classList.add("hidden");
      header.classList.remove("nostart-header");
      logo.classList.remove("nostart-logo");
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
//*SECTION SinglePlayer Page
let spStart = () => {
  const startButton = document.getElementById("spStart");
  const restartButton = document.getElementById("restart-button");

  let difficulty = "easy";

  const startGame = () => {
    let xName = document.getElementById("spName");
    let oName = "A.I";
    game(xName.value, oName, difficulty);
  };
  startButton.addEventListener("click", () => {
    const xScore = document.getElementById("xscore");
    const oScore = document.getElementById("oscore");
    xScore.innerText = "0";
    oScore.innerText = "0";
    startGame();
  });
  restartButton.addEventListener("click", () => {
    startGame();
  });
};

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
    const xScore = document.getElementById("xscore");
    const oScore = document.getElementById("oscore");
    xScore.innerText = "0";
    oScore.innerText = "0";
    startGame();
  });
  restartButton.addEventListener("click", () => {
    startGame();
  });
};

//*SECTION GamePage

const game = (playerx, playero, difficulty) => {
  const status = document.querySelector("h4");
  const xName = document.getElementById("xname");
  const oName = document.getElementById("oname");
  const xScore = document.getElementById("xscore");
  const oScore = document.getElementById("oscore");
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
  xName.innerText = playerx;
  oName.innerText = playero;
  if (xScore.innerText === "5" || oScore.innerText === "5") {
    xScore.innerText = "0";
    oScore.innerText = "0";
  }
  playsquares.forEach((square) => {
    square.classList.remove("clicked");
    square.classList.remove("win");
    square.replaceWith(square.cloneNode(true)); // fix duplicating events
  });
  playsquares = document.querySelectorAll(".playsquare");
  playsquares.forEach((square) => {
    square.firstElementChild.innerText = "";
    square.style.pointerEvents = "";

    square.addEventListener(
      "click",
      () => {
        square.firstElementChild.innerText = sign;
        square.classList.add("clicked");
        status.innerText === `${playerx}'s turn...`
          ? (status.innerText = `${playero}'s turn...`)
          : (status.innerText = `${playerx}'s turn...`);

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
          endGame(
            winner,
            playerx,
            playero,
            status,
            playsquares,
            xScore,
            oScore,
            pickOrder
          );
        } else if (counter == 9) {
          endGame(
            winner,
            playerx,
            playero,
            status,
            playsquares,
            xScore,
            oScore,
            pickOrder
          );
        }

        sign === "X" ? (sign = "O") : (sign = "X");

        if (difficulty === "easy" && sign === "O") {
          setTimeout(() => easyAI(winner), 600);
        }
      },
      {
        once: true,
      }
    );
  });
};
const endGame = (
  winner,
  playerx,
  playero,
  status,
  playsquares,
  xScore,
  oScore,
  pickOrder
) => {
  playsquares.forEach((square) => (square.style.pointerEvents = "none"));
  switch (true) {
    case pickOrder[1] === pickOrder[2] && pickOrder[2] === pickOrder[3]:
      {
        document.getElementById("1").classList.add("win");
        document.getElementById("2").classList.add("win");
        document.getElementById("3").classList.add("win");
      }
      break;
    case pickOrder[4] === pickOrder[5] && pickOrder[5] === pickOrder[6]:
      {
        document.getElementById("4").classList.add("win");
        document.getElementById("5").classList.add("win");
        document.getElementById("6").classList.add("win");
      }
      break;
    case pickOrder[7] === pickOrder[8] && pickOrder[8] === pickOrder[9]:
      {
        document.getElementById("7").classList.add("win");
        document.getElementById("8").classList.add("win");
        document.getElementById("9").classList.add("win");
      }
      break;
    case pickOrder[1] === pickOrder[4] && pickOrder[4] === pickOrder[7]:
      {
        document.getElementById("1").classList.add("win");
        document.getElementById("4").classList.add("win");
        document.getElementById("7").classList.add("win");
      }
      break;
    case pickOrder[2] === pickOrder[5] && pickOrder[5] === pickOrder[8]:
      {
        document.getElementById("2").classList.add("win");
        document.getElementById("5").classList.add("win");
        document.getElementById("8").classList.add("win");
      }
      break;
    case pickOrder[3] === pickOrder[6] && pickOrder[6] === pickOrder[9]:
      {
        document.getElementById("3").classList.add("win");
        document.getElementById("6").classList.add("win");
        document.getElementById("9").classList.add("win");
      }
      break;
    case pickOrder[1] === pickOrder[5] && pickOrder[5] === pickOrder[9]:
      {
        document.getElementById("1").classList.add("win");
        document.getElementById("5").classList.add("win");
        document.getElementById("9").classList.add("win");
      }
      break;
    case pickOrder[3] === pickOrder[5] && pickOrder[5] === pickOrder[7]:
      {
        document.getElementById("3").classList.add("win");
        document.getElementById("5").classList.add("win");
        document.getElementById("7").classList.add("win");
      }
      break;

    default:
      break;
  }

  if (winner === "X") {
    xScore.innerText++;
    xScore.innerText === "5"
      ? (status.innerText = `Game Over, ${playerx} is the winner.`)
      : (status.innerText = `${playerx} wins this round.`);
  } else if (winner === "O") {
    oScore.innerText++;
    oScore.innerText === "5"
      ? (status.innerText = `Game Over, ${playero} is the winner.`)
      : (status.innerText = `${playero} wins this round.`);
  } else if (winner === "D") {
    status.innerText = `it's a draw`;
  }
};
const easyAI = (winner) => {
  if (winner === "X") {
    return;
  }
  for (let i = 0; i < 1000; i++) {
    let id = Math.floor(Math.random() * 9) + 1;
    let square = document.getElementById(id);

    if (square.className === "playsquare clicked") {
      continue;
    } else {
      square.click();
      return;
    }
  }
};
