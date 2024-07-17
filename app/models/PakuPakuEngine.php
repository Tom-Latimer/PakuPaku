<?php
namespace PakuPaku;

use PakuPaku\PakuPakuGame;
use SessionHandlerInterface;

session_start();  // Start the session at the beginning of the script

class PakuPakuEngine 
{
    private $game;
    private $fruitValue;
    private $score;
    private $highScore;

    public function __construct($gameSize = 15, $fruitValue = 5) {
        $this->fruitValue = $fruitValue;
        $this->score = 0;
        $this->highScore = 0;

        if (!isset($_SESSION['game'])) {
            // Initialize a new game if not present in session
            $this->game = new PakuPakuGame($gameSize);
            $_SESSION['game'] = serialize($this->game);
        } else {
            // Retrieve the game from the session
            $this->game = unserialize($_SESSION['game']);
        }
    }

    public function changeDirection($direction){
        $this->game->setDirection($direction);
        $_SESSION['game'] = serialize($this->game);  // Save the state back to session
    }

    private function calculateScore($nextSymbol) {
        $turnPoints = match($nextSymbol) {
            PakuPakuGame::FRUIT_SYMBOL => $this->fruitValue,
            PakuPakuGame::PELLET_SYMBOL => 1,
            default => 0,
        };

        $this->score += $turnPoints;

        if ($this->highScore < $this->score) {
            $this->highScore = $this->score;
        }
    }

    public function updateGame() {
        if($this->game->isGameOver()) {
            $frame = $this->generateGameFrame();
            $this->game->initialize();
            $this->score = 0;
            $_SESSION['game'] = serialize($this->game);  // Reset the game in the session
            return $frame;
        }

        if($this->game->isNextLevel()) {
            $this->game->initializeNextLevel();
            $_SESSION['game'] = serialize($this->game);
            return $this->generateGameFrame();
        }

        $this->calculateScore($this->game->update());
        $_SESSION['game'] = serialize($this->game);  // Save the state after each update

        return $this->generateGameFrame();
    }

    public function generateGameFrame() {
        $data = array(
            'score' => $this->score,
            'highscore'=> $this->highScore,
            'gameOver' => $this->game->isGameOver(),
            'gameBoard' => $this->game->getGameBoard(),
        );

        return json_encode($data);
    }
}

// Handle requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check for direction change
    if (isset($_POST['direction'])) {
        $direction = $_POST['direction'] === 'left' ? false : true;
        $_SESSION['gameEngine']->changeDirection($direction);
    }

    // Check for game reset
    if (isset($_POST['reset']) && $_POST['reset'] === 'true') {
        $_SESSION['gameEngine'] = new PakuPakuEngine();
        echo json_encode(['message' => 'Game reset']);
        exit();
    }
}

// Return the game state for GET requests
echo $_SESSION['gameEngine']->updateGame();
?>
