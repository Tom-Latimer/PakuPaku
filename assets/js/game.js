$(document).ready(function() {
    // Function to update the game state
    function fetchGameUpdate() {
        $.get('pakupakuengine.php', function(data) {
            var gameData = JSON.parse(data);
            $('#game-board').text(gameData.gameBoard); // Gameboard display
            $('#current-score').text("Current Score: " + gameData.score);
            $('#hi-score').text("High Score: " + gameData.highscore);
            $('#message').text(gameData.gameOver ? "Game Over!" : "Keep Going!"); // Display the game status

            if (gameData.gameOver) {
                clearInterval(gameInterval); // stop the game loop
                if (confirm('Game Over! Start a new game?')) {
                    resetGame(); // call reset
                }
            }
        });
    }

    // Function to reset the game
    function resetGame() {
        $.post('pakupakuengine.php', { reset: true }, function(response) {
            console.log(response.message); // Optional: Handle the response
            gameInterval = setInterval(fetchGameUpdate, 1000); // Restart the game loop
        }, 'json');
    }

    // Update the game state every second
    var gameInterval = setInterval(fetchGameUpdate, 1000);

    // Handle user input for changing directions
    $(document).keydown(function(e) {
        let direction = null;
        switch(e.which) {
            case 37: // left arrow key
                direction = 'left';
                break;
            case 39: // right arrow key
                direction = 'right';
                break;
        }
        if (direction) {
            $.post('pakupakuengine.php', { direction: direction });
        }
    });
});
