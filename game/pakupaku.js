import * as graphics from './graphics.js';

export const pacSymbol = "ᗧ";
export const fruitSymbol = "@";
export const ghostSymbol = "ᗣ";
export const pelletSymbol = "⚬";
export const eatenPelletSymbol = "-";

//game and key piece positions
var pac;
var fruit;
var ghost;
var game;

//stores the underlying symbol that occupies the space that pacman or the ghost are currently on
var lastPacSymbol = eatenPelletSymbol;
var lastGhostSymbol = pelletSymbol;

var score = 0;
//keeps track of level
var level = 1;
//keeps track of points needed to advance to the next level
var levelCounter = 0;
var gameSize = 15;

var nextLevelFlag = false;
var gameOverFlag = false;

//id's to keep track of the intervals
var pacIntId;
var ghostIntId;

//direction of movement for pacman
var direction = true;

document.addEventListener('DOMContentLoaded', async () => {

    await graphics.graphicsInitialized;

    document.addEventListener('keydown', function(event) {
        console.log("Key pressed:", event.key);
        if (event.key === 'ArrowLeft') {
            direction = true;
        } else if (event.key === 'ArrowRight') {
            direction = false;
        } else if (event.key === ' ') {
            play();
        }
    });

    
    gameSize = 15;
    createGame(gameSize);

    graphics.displayStartupMessage();
    displayGame();
});

function createGame(n) {
    //game board
    let output = new Array(n).fill(pelletSymbol);

    pac = Math.floor(Math.random() * n);
    fruit = Math.floor(Math.random() * n);
    ghost = Math.floor(Math.random() * n);

    //assure the fruit is not overlapping with pacman
    while (fruit == pac) {
        fruit = Math.floor(Math.random() * n);
    }

    //assure the ghost doesn't overlap with fruit or pacman
    while (ghost == fruit || ghost == pac) {
        ghost = Math.floor(Math.random() * n);
    }

    output[pac] = pacSymbol;
    output[fruit] = fruitSymbol;
    output[ghost] = ghostSymbol;

    game = output;
}

function checkFlags() {
    if (gameOverFlag) {
        graphics.displayGameOver();
        clearInterval(pacIntId);
        clearInterval(ghostIntId);
        gameOverFlag = false;
        nextLevelFlag = false;
        score = 0;
        level = 0;
        levelCounter = 0;
        lastPacSymbol = eatenPelletSymbol;
        lastGhostSymbol = pelletSymbol;
        createGame(gameSize);
        return true;
    } else if (nextLevelFlag) {
        clearInterval(pacIntId);
        clearInterval(ghostIntId);
        gameOverFlag = false;
        nextLevelFlag = false;
        level++;
        levelCounter = 0;
        lastPacSymbol = eatenPelletSymbol;
        lastGhostSymbol = pelletSymbol;
        createGame(gameSize);
        play();
        return true;
    }
    return false;
}

function displayGame() {
    graphics.updateScore(score);
    graphics.updateGame(game);
}

function moveLeft() {
    var n = game.length;

    switch (game[(pac - 1 + n) % n]) {
        case pelletSymbol:
        case fruitSymbol:
            game[pac] = lastPacSymbol;

            lastPacSymbol = eatenPelletSymbol;
            score++;

            if (++levelCounter >= n-2) {
                nextLevelFlag = true;
            }
            break;
        case ghostSymbol:
            gameOverFlag = true;
            break;
        case eatenPelletSymbol:
            game[pac] = lastPacSymbol;
            lastPacSymbol = eatenPelletSymbol;
            break;
    }

    pac = (pac - 1 + n) % n;
    game[pac] = pacSymbol;
}

function moveRight() {
    var n = game.length;

    switch (game[(pac + 1) % n]) {
        case pelletSymbol:
        case fruitSymbol:
            game[pac] = lastPacSymbol;

            lastPacSymbol = eatenPelletSymbol;
            score++;

            if (++levelCounter >= n-2) {
                nextLevelFlag = true;
            }
            break;
        case ghostSymbol:
            gameOverFlag = true;
            break;
        case eatenPelletSymbol:
            game[pac] = lastPacSymbol;
            lastPacSymbol = eatenPelletSymbol;
            break;
    }

    pac = (pac + 1) % n;
    game[pac] = pacSymbol;

}

function moveGhost() {
    var direction = Math.floor(Math.random() * 2)
    var n = game.length;

    game[ghost] = lastGhostSymbol;

    if (direction == 0) {

        switch (game[(ghost - 1 + n) % n]) {
            case pelletSymbol:
                lastGhostSymbol = pelletSymbol;
                break;
            case fruitSymbol:
                lastGhostSymbol = fruitSymbol;
                break;
            case eatenPelletSymbol:
                lastGhostSymbol = eatenPelletSymbol;
                break;
            case pacSymbol:
                gameOverFlag = true;
                break;
        }

        ghost = (ghost - 1 + n) % n;
        game[ghost] = ghostSymbol;
    } else {

        switch(game[(ghost + 1) % n]) {
            case pelletSymbol:
                lastGhostSymbol = pelletSymbol;
                break;
            case fruitSymbol:
                lastGhostSymbol = fruitSymbol;
                break;
            case eatenPelletSymbol:
                lastGhostSymbol = eatenPelletSymbol;
                break;
            case pacSymbol:
                gameOverFlag = true;
                break;
        }

        ghost = (ghost + 1) % n;
        game[ghost] = ghostSymbol;
    }
}

function pacman() {

    if (checkFlags()) {
        return;
    }

    if (direction) {
        moveLeft();
    } else {
        moveRight();
    }

    displayGame();
}

function phantom() {

    if (checkFlags()) {
        return;
    }

    moveGhost();
    displayGame();
}

function play() {
    pacIntId = setInterval(() => {
        pacman()
    }, 1000);

    ghostIntId = setInterval(() => {
        phantom()
    }, 1500);
}