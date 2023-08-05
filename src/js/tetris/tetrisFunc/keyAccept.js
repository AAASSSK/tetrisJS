import { rotate, undoRotate } from "./rotateTetris.js";
import { isValidMove } from "./isValidMove.js";

export const keyAccept = function (tetrisValue) {
  const curTetris = tetrisValue.curTetris;
  const key = tetrisValue.key;
  if (key === "a" || key === "d") {
    const col = key === "a" ? curTetris.left - 1 : curTetris.left + 1;

    if (isValidMove(tetrisValue, undefined, col)) {
      curTetris.left = col;
    }
  }
  if (key === "w") {
    rotate(tetrisValue);
    if (!isValidMove(tetrisValue)) {
      undoRotate(tetrisValue);
    }
  }
  if (key === "s") {
    const row = curTetris.top + 1;
    if (!isValidMove(tetrisValue, row)) {
      tetrisValue.touchDown = true;
    } else {
      curTetris.top = row;
    }
  }
  if (key === " ") {
    let row = curTetris.top;
    while (isValidMove(tetrisValue, row)) {
      row += 1;
    }
    curTetris.top = row - 1;
    tetrisValue.touchDown = true;
    //make new
  }
};
