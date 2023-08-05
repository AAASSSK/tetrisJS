import { SET_PLAY_FIELD_X } from "../config.js";
import { Matrix } from "../matrix.js";

export const deleteFullLines = function (tetrisValue) {
  const playField = tetrisValue.playField;
  const tempMatrix = new Matrix(1, SET_PLAY_FIELD_X);
  for (let row = playField.getDy() - 1; row >= 0; ) {
    if (playField.getArray()[row].every((cell) => !!cell)) {
      const clipedField = playField.clip(0, 0, row, this._playfieldSizeX - 1);
      playField.paste(clipedField, 1, 0);
      playField.paste(tempMatrix, 0, 0);
    } else {
      row--;
    }
  }
};
