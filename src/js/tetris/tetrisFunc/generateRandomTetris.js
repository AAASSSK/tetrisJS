import { getRandomInt } from "../helpers/getRandomInt.js";
import { N_TYPES } from "../config.js";

export const generateRandomTetris = function (tetrisValue) {
  const nameT = `T${getRandomInt(0, N_TYPES - 1)}`;
  const nameD = "D0";
  const matrix = tetrisValue.setOfBlockObjects[nameT][nameD];
  const left =
    tetrisValue.playField.getDx() / 2 - Math.ceil(matrix.getDx() / 2);
  const top = 0;
  const degree = 0;
  return {
    nameT: nameT,
    nameD: nameD,
    matrix: matrix,
    left: left,
    top: top,
    degree: degree,
  };
};
