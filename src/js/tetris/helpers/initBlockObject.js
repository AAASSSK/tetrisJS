import { setOfBlockArrays } from "../tetrisArray.js";
import { N_DEGREES } from "../config.js";
import { Matrix } from "../matrix.js";

export const initBlockObject = function () {
  const setOfBlockObjects = {};
  for (const [nameT, value] of Object.entries(setOfBlockArrays)) {
    setOfBlockObjects[nameT] = {};
    const array = value.D0;
    let idx, size;
    for (idx = 0; array[idx] != -1; idx++);
    for (size = 0; size * size < idx; size++);
    // wallDepth = (size > wallDepth ? size : wallDepth);
    for (let d = 0; d < N_DEGREES; d++) {
      const array2 = new Array(size * size + 1);
      let k;
      for (k = 0; k < size * size; k++)
        array2[k] = value[`D${d}`][k] == 0 ? 0 : 1;
      array2[k] = -1;
      setOfBlockObjects[nameT][`D${d}`] = new Matrix(size, size, array2);
    }
  }
  return setOfBlockObjects;
};
