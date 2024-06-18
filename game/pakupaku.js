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

//score of current run
var score = 0;
//cumulative best score
var highScore = 0;
//keeps track of level
var level = 1;
//keeps track of points needed to advance to the next level
var levelCounter = 0;

var gameSize = 15;

//flags to check game state
var nextLevelFlag = false;
var gameOverFlag = false;

//id's to keep track of the intervals
var pacIntId;
var ghostIntId;

//direction of movement for pacman
var direction = true;

//flag to disable the start action while a game is in progress
var mask = false;

document.addEventListener('DOMContentLoaded', async () => {

    //wait for graphics module to load correctly
    await graphics.graphicsInitialized;

    document.addEventListener('keydown', function(event) {
        //console.log("Key pressed:", event.key);
        if (event.key === 'ArrowLeft') {
            direction = true;
        } else if (event.key === 'ArrowRight') {
            direction = false;
        } else if (event.key === ' ') {
            if (!mask) {
                mask = true;
                play();
            }
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
        //stop pacman and ghost from moving
        clearInterval(pacIntId);
        clearInterval(ghostIntId);

        //display game over message
        graphics.displayGameOver();

        //reset game logic
        gameOverFlag = false;
        nextLevelFlag = false;
        score = 0;
        level = 0;
        levelCounter = 0;
        lastPacSymbol = eatenPelletSymbol;
        lastGhostSymbol = pelletSymbol;

        //initialize next game if player wants to retry
        createGame(gameSize);

        //enable start action
        mask = false;
        return true;
    } else if (nextLevelFlag) {
        //stop pacman and ghost from moving
        clearInterval(pacIntId);
        clearInterval(ghostIntId);

        //reset necessary game logic for next level
        gameOverFlag = false;
        nextLevelFlag = false;
        level++;
        levelCounter = 0;
        lastPacSymbol = eatenPelletSymbol;
        lastGhostSymbol = pelletSymbol;

        //create next level (new game) and restart the motion of pacman and ghost
        createGame(gameSize);
        play();
        return true;
    }
    return false;
}

function displayGame() {
    graphics.updateScore(score, highScore);
    graphics.updateGame(game);
}

function moveLeft() {
    var n = game.length;

    switch (game[(pac - 1 + n) % n]) {
        case pelletSymbol:
        case fruitSymbol:
            game[pac] = lastPacSymbol;

            lastPacSymbol = eatenPelletSymbol;

            //increase score
            score++;

            //increase highscore if current score caught up
            if (highScore < score) {
                highScore = score;
            }

            if (++levelCounter >= n-2) {
                nextLevelFlag = true;
            }
            break;
        case ghostSymbol:
            gameOverFlag = true;
            game[pac] = lastPacSymbol;
            return;
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

            //increase score
            score++;

            //increase highscore if current score caught up
            if (highScore < score) {
                highScore = score;
            }

            if (++levelCounter >= n-2) {
                nextLevelFlag = true;
            }
            break;
        case ghostSymbol:
            gameOverFlag = true;
            game[pac] = lastPacSymbol;
            return;
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

    //get rid of previous message when the game starts
    graphics.clearMessage();

    pacIntId = setInterval(() => {
        pacman()
    }, 1000);

    ghostIntId = setInterval(() => {
        phantom()
    }, 1500);
}