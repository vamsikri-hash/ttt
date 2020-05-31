/**
 * Player Factory function to return player object
 */

const Player = (name, symbol) => {
  const points = 0;

  return { name, symbol, points };
};

/**
 * Game details
 */

const GameBoard = (() => {
  const board = Array(9).fill("");

  const updateBoard = (i, sym) => {
    board[i] = sym;
  };

  return { board, updateBoard };
})();

const Game = (() => {
  let players = [];
  let current;
  let other;
  const setPlayers = (p1, p2) => {
    players.push(p1);
    players.push(p2);
  };

  const swapPlayers = (p1, p2) => {
    [current, other] = [p1, p2];
  };

  let gameb = GameBoard.board;
  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const Checkwin = () => {
    console.info(gameb);
    return winningCombo.some((combination) => {
      return combination.every((ele) => {
        console.log(ele);
        return gameb[ele] === current.symbol;
      });
    });
  };

  const Checkdraw = () => {
    return gameb.every((ele) => {
      return ele !== "";
    });
  };
  const play = () => {
    [current, other] = players;

    for (let i = 0; i < 9; i++) {
      const cell = document.getElementById(`${i}`);
      console.log(cell);
      cell.addEventListener("click", (e) => {
        handleClick(e, i);
      });
    }
  };
  function handleClick(e, i) {
    console.log(e.target.innerText);
    if (e.target.innerText) {
      alert("Are you kidding ...");
    } else {
      e.target.innerText = current.symbol;
      e.target.classList.add("loss");
      GameBoard.updateBoard(i, current.symbol);
      if (Checkwin()) {
        console.log(Checkwin());
        current.points += 1;
        point.innerText = current.points;
        message.innerHTML = `<h1> Hey! ,${current.name}  you Won. </h1>`;
        unlock.innerHTML = `<div> <h2> Do you want to continue...?</h2> <button class="start yes">Yes</button> <button class="start no">NO</button>`;
        boardContent.style.display = "none";
        unlock.style.display = "block";
        for (let i = 0; i < 9; i++) {
          const cell = document.getElementById(`${i}`);
          console.log(cell);
          cell.innerText = "";
          cell.classList.remove("loss");
          GameBoard.updateBoard(i, "");
        }

        const yes = document.querySelector(".yes");
        const no = document.querySelector(".no");
        no.addEventListener("click", () => {
          location.reload();
        });
        yes.addEventListener("click", () => {
          message.innerHTML = "";
          [current, other] = players;
          boardContent.style.display = "grid";
          unlock.style.display = "none";
        });
      } else if (Checkdraw()) {
        alert("draw");
      }
      swapPlayers(other, current);
    }
  }

  return { setPlayers, play };
})();

/**
 * From document
 */
const boardContent = document.querySelector(".board-content");
const unlock = document.querySelector(".unlock");
const player1_name = document.querySelector("#player1");
const player2_name = document.querySelector("#player2");
const start = document.querySelector(".start");
const player_form = document.querySelector(".player-form");
const player_details = document.querySelector(".player-details");
const p1 = document.querySelector(".p1-name");
const p2 = document.querySelector(".p2-name");
const message = document.querySelector(".won-message");
const point = document.querySelector(".points");
const first_player = document.querySelector(".first-player");
const second_player = document.querySelector(".second-player");
start.addEventListener("click", () => {
  startGame();
});

const startGame = () => {
  console.log("entered");

  if (player1_name.value && player2_name.value) {
    boardContent.style.display = "grid";
    unlock.style.display = "none";
    const player1 = Player(player1_name.value, "X");
    const player2 = Player(player2_name.value, "O");
    p1.innerHTML = player1.name;
    p2.innerHTML = player2.name;
    Game.setPlayers(player1, player2);
    Game.play();
    player_form.style.display = "none";
    player_details.style.display = "block";
  } else {
    alert("Empty names not allowed");
  }
};
