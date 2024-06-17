import {pacSymbol, fruitSymbol, ghostSymbol, pelletSymbol, eatenPelletSymbol} from './pakupaku.js';

const gameOverMessage = "Game Over";
const startupMessage = "Press [Spacebar] to Start";

const pulseClassName = "pulse";

let currScore;
let hiScore;
let message;
let board;

//make sure that the element variables are initialized before being used in the module
export const graphicsInitialized = new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', function() {
        currScore = document.getElementById('current-score');
        hiScore = document.getElementById('hi-score');
        message = document.getElementById('message');
        board = document.getElementById('game-board');
        resolve();
    });
});

export function updateScore(score) {
    currScore.textContent = score.toString();
}

export function updateGame(game) {
    //clear previous frame
    board.innerHTML = "";

    for (let i = 0; i < game.length; i++) {
        let styling = getStyling(game[i]);
        board.innerHTML += `<div class="${styling}">${game[i]}</div>`;
    }
}

export function displayGameOver() {
    message.textContent = gameOverMessage;
}

export function displayStartupMessage() {
    message.textContent = startupMessage;
    message.classList.add(pulseClassName);
}

export function clearMessage() {
    message.textContent = "";
    message.classList.remove(pulseClassName);
}

/* Helper Functions */
function getStyling(elem) {
    switch (elem) {
        case pacSymbol:
            return 'pac';
        case fruitSymbol:
            return 'fruit';
        case ghostSymbol:
            return 'ghost';
        case pelletSymbol:
            return 'pellet';
        case eatenPelletSymbol:
            return '';
    }
}