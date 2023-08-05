import { N_DEGREES } from "../config.js";

// export const rotate = function (tetrisValue) {
//   const tempTetris = cloneDeep(tetrisValue);
//   const curTetris = tempTetris.curTetris;
//   curTetris.degree = (curTetris.degree + (N_DEGREES - 1)) % N_DEGREES;
//   curTetris.nameD = "D" + curTetris.degree;
//   curTetris.matrix =
//     tetrisValue.setOfBlockObjects[curTetris.nameT][curTetris.nameD];
//   console.log(tempTetris);
//   return tempTetris;
// };
export const rotate = function (tetrisValue) {
  const curTetris = tetrisValue.curTetris;
  curTetris.degree = (curTetris.degree + (N_DEGREES + 1)) % N_DEGREES;
  curTetris.nameD = "D" + curTetris.degree;
  curTetris.matrix =
    tetrisValue.setOfBlockObjects[curTetris.nameT][curTetris.nameD];
};

export const undoRotate = function (tetrisValue) {
  const curTetris = tetrisValue.curTetris;
  curTetris.degree = (curTetris.degree + (N_DEGREES + 3)) % N_DEGREES;
  curTetris.nameD = "D" + curTetris.degree;
  curTetris.matrix =
    tetrisValue.setOfBlockObjects[curTetris.nameT][curTetris.nameD];
};
