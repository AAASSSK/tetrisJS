export class Matrix {
  _matrix;
  constructor(dy, dx, arr = undefined) {
    this._dy = dy;
    this._dx = dx;
    this._arr = arr;
    this._matrix = arr ? this._allocWithArr() : this._alloc();
  }
  _alloc() {
    const matrix = new Array(this._dy);
    for (let i = 0; i < this._dy; i++) {
      matrix[i] = new Array(this._dx).fill(0);
    }
    return matrix;
  }
  _allocWithArr() {
    const matrix = this._alloc();
    for (let y = 0; y < this._dy; y++)
      for (let x = 0; x < this._dx; x++) {
        matrix[y][x] = this._arr[y * this._dx + x];
      }
    return matrix;
  }

  clip(top, left, bottom, right) {
    const cy = bottom - top;
    const cx = right - left;
    const temp = new Matrix(cy, cx);
    for (let y = 0; y < cy; y++) {
      for (let x = 0; x < cx; x++) {
        temp.getArray()[y][x] = this._matrix[top + y][left + x];
      }
    }
    return temp;
  }

  paste(matrix, top, left) {
    for (let y = 0; y < matrix.getDy(); y++) {
      for (let x = 0; x < matrix.getDx(); x++) {
        this._matrix[y + top][x + left] = matrix.getArray()[y][x];
      }
    }
  }

  getArray() {
    return this._matrix;
  }
  getDy() {
    return this._dy;
  }
  getDx() {
    return this._dx;
  }
}
