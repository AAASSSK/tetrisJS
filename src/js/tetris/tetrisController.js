import {
  GAME_MODE,
  TETRIS_STATE,
  SET_PLAY_FIELD_X,
  SET_PLAY_FIELD_Y,
} from "./config.js";
import { Matrix } from "./matrix.js";
import { generateRandomTetris } from "./tetrisFunc/generateRandomTetris.js";
import { initBlockObject } from "./helpers/initBlockObject.js";
import { putTetris } from "./tetrisFunc/putTetris.js";
import {
  showGameOver,
  SynchronizeTetrisValue,
  tetrisView,
  GameResetView,
} from "./tetrisView.js";
import { keyAccept } from "./tetrisFunc/keyAccept.js";
import { deleteFullLines } from "./tetrisFunc/deleteFullLines.js";
import { isValidMove } from "./tetrisFunc/isValidMove.js";

export class Tetris {
  tetrisValue = {
    isReset: true,
    key: undefined,
    gameMode: undefined,
    setOfBlockObjects: initBlockObject(),
    state: TETRIS_STATE.NewBlock,
    playField: new Matrix(SET_PLAY_FIELD_Y, SET_PLAY_FIELD_X),
    touchDown: false,
    gameOver: false,
    keyBlockStorage: {
      block: [],
      key: [],
    },
  };
  constructor() {
    this.tetrisValue.curTetris = generateRandomTetris(this.tetrisValue);
  }

  _waitForKeyPress() {
    return new Promise((resolve) => {
      function handleKeyPress(e) {
        window.removeEventListener("keydown", handleKeyPress);
        resolve(e.key);
      }
      window.addEventListener("keydown", handleKeyPress);
    });
  }

  _throwKey() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const key = this.tetrisValue.keyBlockStorage.key.shift();
        resolve(key);
      }, 100);
    });
  }

  _throwBlock() {
    const curTetris = this.tetrisValue.keyBlockStorage.block.shift();
    //json parse로 인해 matrix프로토체인이 끊김 -> 다시 체인복구
    return {
      nameT: curTetris.nameT,
      nameD: curTetris.nameD,
      matrix:
        this.tetrisValue.setOfBlockObjects[curTetris.nameT][curTetris.nameD],
      left: curTetris.left,
      top: curTetris.top,
      degree: curTetris.degree,
    };
  }

  async _tetrisMainMethod() {
    try {
      while (!this.tetrisValue.gameOver) {
        //when finished
        if (this.tetrisValue.state === TETRIS_STATE.Finished) {
          this.tetrisValue.gameOver = true;
          break;
        }

        //when newblock state
        if (this.tetrisValue.state === TETRIS_STATE.NewBlock) {
          this.tetrisValue.state = TETRIS_STATE.Running;

          //replay block
          if (this.tetrisValue.gameMode === GAME_MODE.replayMode) {
            this.tetrisValue.curTetris = this._throwBlock();
          } else {
            this.tetrisValue.curTetris = generateRandomTetris(this.tetrisValue);
            this.tetrisValue.keyBlockStorage.block.push(
              this.tetrisValue.curTetris
            );
          }
          this.tetrisValue.touchDown = false;
        }

        //when running state
        if (this.tetrisValue.state === TETRIS_STATE.Running) {
          //check validMove
          if (isValidMove(this.tetrisValue)) {
            //replay key
            if (this.tetrisValue.gameMode === GAME_MODE.replayMode) {
              this.tetrisValue.key = await this._throwKey();
            } else {
              this.tetrisValue.key = await this._waitForKeyPress();

              //record key
              if (this.tetrisValue.gameMode === GAME_MODE.recordMode)
                this.tetrisValue.keyBlockStorage.key.push(this.tetrisValue.key);
            }
            keyAccept(this.tetrisValue);
          } else {
            this.tetrisValue.touchDown = true;
          }

          //when touchDown
          if (this.tetrisValue.touchDown) {
            putTetris(this.tetrisValue);
            if (this.tetrisValue.state === TETRIS_STATE.Finished) continue;
            else {
              this.tetrisValue.state = TETRIS_STATE.NewBlock;
              deleteFullLines(this.tetrisValue);
              continue;
            }
          }
        }
      }
      if (this.tetrisValue.gameOver) {
        //store keyBlockObject
        localStorage.setItem(
          "keyBlockObject",
          JSON.stringify(this.tetrisValue.keyBlockStorage)
        );

        //show game over
        showGameOver();
      }
    } catch (err) {
      console.error(err);
    }
  }

  //when press start button
  start() {
    if (!this.tetrisValue.isReset) return "need to reset";
    if (this.tetrisValue.gameMode === undefined) return "need to select mode";
    this.tetrisValue.isReset = false;
    this._tetrisMainMethod();
    SynchronizeTetrisValue(this.tetrisValue);
    tetrisView();
    return "DURING GAME";
  }

  //when press reset button
  reset() {
    this.tetrisValue.gameMode = undefined;
    this.tetrisValue.key = undefined;
    this.tetrisValue.setOfBlockObjects = initBlockObject();
    this.tetrisValue.state = TETRIS_STATE.NewBlock;
    this.tetrisValue.playField = new Matrix(SET_PLAY_FIELD_Y, SET_PLAY_FIELD_X);
    this.tetrisValue.touchDown = false;
    this.tetrisValue.gameOver = false;
    this.tetrisValue.isReset = true;
    this.tetrisValue.curTetris = generateRandomTetris(this.tetrisValue);
    this.tetrisValue.keyBlockStorage = {
      key: [],
      block: [],
    };
    GameResetView();
  }

  //when press replay button
  replay() {
    const storage = JSON.parse(localStorage.getItem("keyBlockObject"));
    if (!storage.block.length) {
      return false;
    }
    this.tetrisValue.keyBlockStorage = storage;
    localStorage.clear();
    this.start();
    return true;
  }

  //when press mode button
  active(mode) {
    console.log(mode);
    if (!this.tetrisValue.isReset) return false;

    if (mode === GAME_MODE.recordMode) {
      this.tetrisValue.gameMode = GAME_MODE.recordMode;
      return true;
    }
    if (mode === GAME_MODE.replayMode) {
      this.tetrisValue.gameMode = GAME_MODE.replayMode;
      return this.replay();
    }
    if (mode === GAME_MODE.normalMode) {
      this.tetrisValue.gameMode = GAME_MODE.normalMode;
      return true;
    }
  }
}
