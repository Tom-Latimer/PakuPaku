import * as graphics from './graphics.js';

//interval for main game loop
var gameLoop;

//flag to disable the start action while a game is in progress
var mask = false;

$(async function() {
    //wait for graphics module to load correctly
    await graphics.graphicsInitialized;

    $(document).on('keydown',function(event) {
        if (event.key === 'ArrowLeft') {
            sendDirectionRequest(true);
        } else if (event.key === 'ArrowRight') {
            sendDirectionRequest(false);
        } else if (event.key === ' ') {
            if (!mask) {
                mask = true;
                play();
            }
        }
    });

    getGameFrame(true);
    graphics.displayStartupMessage();
});

function play() {
    //get rid of previous message when the game starts
    graphics.clearMessage();

    gameLoop = setInterval(() => {
        getGameFrame(false);
    }, 1000);
}

function sendDirectionRequest(direction) {
    $.ajax({
        url: '/public/api.php',
        method: 'POST',
        data: {
            action: 'changeDirection',
            value: direction
        },
        success: function(response) {
            // Parse the JSON response
            var result = JSON.parse(response);

            if (result.status === 'success') {
                console.log(result.message); // Handle success
            } else {
                console.error(result.message); // Handle error
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX Error:', status, error);
        }
    });
}

function getGameFrame(snapshot) {
    $.ajax({
        url: "/public/api.php",
        method: "GET",
        data: {
            action: 'gameData',
            snapshot: snapshot
        },
        success: function(response) {
            console.log(response);
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
        
            if (response.gameOver) {
                clearInterval(gameLoop);
                graphics.displayGameOver();
                mask = false;
                return;
            }
        
            graphics.updateScore(response.score, response.highscore);
            graphics.updateGame(response.gameBoard);
        },
        error: function(xhr, status, error) {
            console.error('AJAX Error:', status, error);
        }
    });
}