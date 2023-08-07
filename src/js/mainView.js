import { Tetris } from "./tetris/tetrisController.js";
import { GAME_MODE } from "./tetris/config.js";

const startButton = document.querySelector(".button--start");
const resetButton = document.querySelector(".button--reset");
const modeButtonContainer = document.querySelector(".button-container--1");
const normalButton = document.querySelector(".button--normal");
const replayButton = document.querySelector(".button--replay");
const recordButton = document.querySelector(".button--record");
const messageContainer = document.querySelector(".message-box");

let tetris = new Tetris();
let curMode = GAME_MODE.normalMode;
let message;
let isSuccess;
const removeFocus = function (button) {
  button.blur();
};

const buttonToggle = function () {
  startButton.classList.toggle("hidden");
  resetButton.classList.toggle("hidden");
  normalButton.classList.toggle("hidden");
  replayButton.classList.toggle("hidden");
  recordButton.classList.toggle("hidden");
};

const sendMessage = function (message) {
  messageContainer.textContent = message;
};

const clearMessage = function () {
  messageContainer.textContent = "";
};

const activeButton = function (button) {
  button.classList.add("button--active");
  setTimeout(() => button.classList.remove("button--active"), 1000);
};

const createReason = function (curMode) {
  if (curMode === GAME_MODE.replayMode) return "storage is Empty!";
};

const initButtons = function () {
  startButton.addEventListener("click", function (e) {
    removeFocus(startButton);
    activeButton(startButton);
    const message = tetris.start();
    sendMessage(message);
  });

  resetButton.addEventListener("click", function (e) {
    removeFocus(resetButton);
    activeButton(resetButton);
    tetris.reset();
    normalButton.classList.remove("button--active");
    replayButton.classList.remove("button--active");
    recordButton.classList.remove("button--active");
    buttonToggle();
    clearMessage();
  });

  modeButtonContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("button--1")) return;
    document
      .querySelectorAll(".button--1")
      .forEach((cur) => cur.classList.remove("button--active"));
    e.target.classList.add("button--active");
    removeFocus(e.target);
    const mode = e.target.dataset.mode;
    curMode = GAME_MODE[`${mode}Mode`];
    isSuccess = tetris.active(curMode);
    if (isSuccess) {
      sendMessage(`${mode} mode on!`);
      buttonToggle();
    } else {
      const msg = createReason(curMode);
      sendMessage(msg);
    }
  });
};

initButtons();
