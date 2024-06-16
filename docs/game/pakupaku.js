const pacSymbol = "C";
const fruitSymbol = "@";
const ghostSymbol = "^";
const pelletSymbol = ".";
const eatenPelletSymbol = "-";

var pac;
var fruit;
var ghost;
var game;

var lastPacSymbol = eatenPelletSymbol;
var lastGhostSymbol = pelletSymbol;

var score = 0;
var levelCounter = 0;

var nextLevelFlag = false;
var gameOverFlag = false;

var pacIntId;
var ghostIntId;

var direction = true;

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        console.log("Key pressed:", event.key);
        if (event.key === 'ArrowLeft') {
            direction = true;
        } else if (event.key === 'ArrowRight') {
            direction = false;
        } else if (event.key === ' ') {
            main();
        }
    });
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

function displayGame() {
    console.clear();
    console.log(`| ${game.join(" ")} |`);
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

function play() {
    if (gameOverFlag) {
        clearInterval(pacIntId);
        clearInterval(ghostIntId);
        gameOverFlag = false;
        score = 0;
        levelCounter = 0;
        lastPacSymbol = eatenPelletSymbol;
        lastGhostSymbol = pelletSymbol;
        return;
    }

    if (nextLevelFlag) {
        clearInterval(pacIntId);
        clearInterval(ghostIntId);
        nextLevelFlag = false;
        levelCounter = 0;
        lastPacSymbol = eatenPelletSymbol;
        lastGhostSymbol = pelletSymbol;
        main();
        return;
    } 

    if (direction) {
        moveLeft(game)
    } else {
        moveRight(game)
    }

    displayGame(game);
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

function main() {
    var n = 15;
    createGame(n);

    pacIntId = setInterval(() => {
        play()
    }, 1000);

    ghostIntId = setInterval(() => {
        moveGhost();
        displayGame();
    }, 1500);
}