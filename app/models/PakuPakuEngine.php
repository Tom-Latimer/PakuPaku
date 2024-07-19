<?php
namespace PakuPaku;

use PakuPaku\PakuPakuGame;

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
        $this->game = new PakuPakuGame($gameSize);
    }

    public function changeDirection($direction){
        $this->game->setDirection($direction);
    }

    private function calculateScore($nextSymbol) {
        $turnPoints = match($nextSymbol) {
            PakuPakuGame::FRUIT_SYMBOL => $turnPoints = $this->fruitValue,
            PakuPakuGame::PELLET_SYMBOL=> $turnPoints = 1,
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
            return $frame;
        }

        if($this->game->isNextLevel()) {
            $this->game->initializeNextLevel();
            return $this->generateGameFrame();
        }

        $this->calculateScore($this->game->update());
        
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