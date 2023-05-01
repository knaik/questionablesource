// ==UserScript==
// @name         Lichess timer
// @version      1.0
// @description  Show a timer,stopwatch for puzzles
// @author       Karan Naik
// @match        https://lichess.org/training*
// ==/UserScript==

var timeout = 30000; // maximum time for solving puzzle (milliseconds)
var interval = 30; // polling interval for threads
// css style for time display
var style = 'z-index:999; position:fixed; bottom:0; left:5%; font-size:1000%;';

function isSolvingPuzzle() {
  var element = document.querySelector('div.view_solution');
  return (element !== null);
}

function isPuzzleWrong() {
  //var element = document.querySelector('div.icon');
  //return (element !== null && element.innerHTML === "✗");
}

function makePuzzleFail() {
}

function countDown() {
  var currTimestamp = new Date();
  time = Math.max((currTimestamp - timestamp), 0);
}

function checkPuzzleFail() {
}

function updateDisplay() {
  var timeMinutes = Math.floor(time / 60000);
  var timeSeconds = Math.floor((time % 60000) / 1000);
  var timeMillis = time % 1000;
  var timeMinutesStr = "" + timeMinutes;
  var timeSecondsStr;
  if (timeSeconds < 10) {
    timeSecondsStr = "0" + timeSeconds;
  } else {
    timeSecondsStr = "" + timeSeconds;
  }
  var timeMillisStr = "" + Math.floor(timeMillis / 100);
  if (time > 0) {
    displayMinutes.innerHTML = timeMinutesStr;
    displaySeparator.innerHTML = ":";
    displaySeconds.innerHTML = timeSecondsStr;
    displayMillis.innerHTML = timeMillisStr;
  } else {
    displayMinutes.innerHTML = "";
    displaySeparator.innerHTML = "";
    displaySeconds.innerHTML = "";
    displayMillis.innerHTML = "";
  }
  display.style.removeProperty("visibility");
  display.style.removeProperty("color");
  displayMillis.style.visibility = "hidden";
  if (time > 180000) {
    display.style.color = "#F9FAF0";
   // displayMillis.style.removeProperty("visibility");
  } else if (time > 90000) {
    display.style.color = "#F9FAF0";
   // displayMillis.style.removeProperty("visibility");
  } else if (time > 45000) {
    display.style.color = "#F9FAF0";
   // displayMillis.style.removeProperty("visibility");
  } else if (time > 15000) {
    display.style.color = "#F9FAF0";
   // displayMillis.style.removeProperty("visibility");
  }
}

function puzzleThread() {
  countDown();
  checkPuzzleFail();
  updateDisplay();
}

function managerThread() {
  if (puzzleThreadId === null) {
    if (isSolvingPuzzle()) {
      timestamp = new Date();
      time = timeout;
      puzzleThreadId = setInterval(puzzleThread, interval);
    }
  } else {
    if (!isSolvingPuzzle()) {
      display.style.removeProperty("visibility"); // could have been hidden when blinking
      clearInterval(puzzleThreadId);
      puzzleThreadId = null;
    }
  }
}

var display = document.createElement('div');
var displayMinutes = document.createElement('span');
var displaySeparator = document.createElement('span');
var displaySeconds = document.createElement('span');
var displayMillis = document.createElement('span');
displayMillis.style['font-size'] = "50%";
display.appendChild(displayMinutes);
display.appendChild(displaySeparator);
display.appendChild(displaySeconds);
display.appendChild(displayMinutes);
display.appendChild(displaySeparator);
display.appendChild(displaySeconds);
display.appendChild(displayMillis);
display.setAttribute('style', style);
document.body.appendChild(display);

var timestamp = null;
var time = null;
var puzzleThreadId = null;

setInterval(managerThread, interval);
