export const isValidMove = function (
  tetrisValue,
  receiveTop = undefined,
  receiveLeft = undefined
) {
  const curTetris = tetrisValue.curTetris;
  const playField = tetrisValue.playField;

  const row = receiveTop ? receiveTop : curTetris.top;
  const col = receiveLeft ? receiveLeft : curTetris.left;

  for (let top = 0; top < curTetris.matrix.getDy(); top++) {
    for (let left = 0; left < curTetris.matrix.getDx(); left++) {
      if (
        //check curTetris
        curTetris.matrix.getArray()[top][left] &&
        //outside game bound
        (col + left < 0 ||
          col + left >= playField.getDx() ||
          row + top >= playField.getDy() ||
          //collide with another piece
          playField.getArray()[row + top][col + left])
      ) {
        return false;
      }
    }
  }
  return true;
};
