import { TETRIS_STATE } from "../config.js";

export const putTetris = function (tetrisValue) {
  const curTetris = tetrisValue.curTetris;
  for (let top = 0; top < curTetris.matrix.getDy(); top++)
    for (let left = 0; left < curTetris.matrix.getDx(); left++) {
      if (curTetris.matrix.getArray()[top][left]) {
        // game over if piece has any part offscreen
        if (curTetris.top + top === 0) {
          tetrisValue.state = TETRIS_STATE.Finished;
          return;
        }
        tetrisValue.playField.getArray()[curTetris.top + top][
          curTetris.left + left
        ] = curTetris.nameT;
      }
    }
};
