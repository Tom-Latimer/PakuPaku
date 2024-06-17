import {pacSymbol, fruitSymbol, ghostSymbol, pelletSymbol, eatenPelletSymbol} from './pakupaku.js';

const gameOverMessage = "Game Over";
const startupMessage = "Press [Spacebar] to Start";

let currScore;
let hiScore;
let message;
let board;

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
    let styledGame = game.map(elem => {
        let styling = getStyling(elem);
        return `<span class="${styling}">${elem}</span>`;
    });

    board.innerHTML = styledGame.join(" ");
}

export function displayGameOver() {
    message.textContent = gameOverMessage;
}

export function displayStartupMessage() {
    message.textContent = startupMessage;
}

export function clearMessage() {
    message.textContent = "";
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