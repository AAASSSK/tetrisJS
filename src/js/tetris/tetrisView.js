import { GRID, COLORS } from "./config.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
let rAF;
let SynTetris;

export const tetrisView = function () {
  const tetrisValue = SynTetris;
  rAF = requestAnimationFrame(tetrisView);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the playfield
  const playField = tetrisValue.playField;
  for (let top = 0; top < playField.getDy(); top++) {
    for (let left = 0; left < playField.getDx(); left++) {
      if (playField.getArray()[top][left]) {
        const name = playField.getArray()[top][left];
        context.fillStyle = COLORS[name];
        //creates a grid effect
        context.fillRect(left * GRID, top * GRID, GRID - 1, GRID - 1);
      }
    }
  }
  const curTetris = tetrisValue.curTetris;
  context.fillStyle = COLORS[curTetris.nameT];
  for (let top = 0; top < curTetris.matrix.getDy(); top++) {
    for (let left = 0; left < curTetris.matrix.getDx(); left++) {
      if (curTetris.matrix.getArray()[top][left]) {
        // drawing 1 px smaller than the grid creates a grid effect
        context.fillRect(
          (curTetris.left + left) * GRID,
          (curTetris.top + top) * GRID,
          GRID - 1,
          GRID - 1
        );
      }
    }
  }
};

export const showGameOver = function () {
  cancelAnimationFrame(rAF);
  document.querySelector(".button--start").classList.remove("button--active");
  context.fillStyle = "black";
  context.globalAlpha = 0.75;
  context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
  context.globalAlpha = 1;
  context.fillStyle = "white";
  context.font = "36px monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2);
};

export const GameResetView = function () {
  cancelAnimationFrame(rAF);
  context.clearRect(0, 0, canvas.width, canvas.height);
};

export const SynchronizeTetrisValue = function (tetrisValue) {
  SynTetris = tetrisValue;
};
