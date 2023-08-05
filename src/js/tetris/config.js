//Tetris block color setting
export const COLORS = {
  T0: "white",
  T1: "red",
  T2: "green",
  T3: "yellow",
  T4: "blue",
  T5: "magenta",
  T6: "cyan",
};

export const TETRIS_STATE = {
  NewBlock: 0,
  Running: 1,
  Finished: 2,
};

//curTetris setting (to change this setting, frist need to change tetrisArray.js)
export const N_TYPES = 7;
export const N_DEGREES = 4;

//playfield setting
export const SET_PLAY_FIELD_X = 10;
export const SET_PLAY_FIELD_Y = 20;

export const GRID = 32;

export const GAME_MODE = {
  normalMode: 0,
  recordMode: 1,
  replayMode: 2,
};

//1 sec
export const SEND_MSG_DELAY = 1;
