<?php
namespace PakuPaku;

class PakuPakuGame
{
    //symbols
    const PAC_SYMBOL = "ᗧ";
    const FRUIT_SYMBOL = "@";
    const GHOST_SYMBOL = "ᗣ";
    const PELLET_SYMBOL = "⚬";
    const EATEN_PELLET_SYMBOL = "-";

    //game piece positions
    private $fruit;
    private $pac;
    private $ghost;

    //game board containing all the pieces
    private $gameBoard = [];

    //variables to hold game flags
    private $level;
    private $levelCounter;
    private $nextLevelFlag;
    private $gameOverFlag;
    private $direction;

    //initial game parameters
    private $gameSize;    

    public function __construct($gamesize = 15) {
        $this->gameSize = $gamesize;
        $this->pac = new Paku(0, 1.5);
        $this->ghost = new Ghost(0, 2);
        $this->initialize();
    }

    public function getGameBoard() {
        return $this->gameBoard;
    }

    public function setDirection($newDirection) {
        $this->direction = $newDirection;
    }

    public function isGameOver() {
        return $this->gameOverFlag;
    }

    public function isNextLevel() {
        return $this->nextLevelFlag;
    }

    private function initialize() {
        $this->level = 0;
        $this->levelCounter = 0;
        $this->direction = true;
        $this->nextLevelFlag = false;
        $this->gameOverFlag = false;
        $this->pac->setLastSymbol(self::EATEN_PELLET_SYMBOL);
        $this->ghost->setLastSymbol(self::GHOST_SYMBOL);
        $this->createGame();
    }

    private function initializeNextLevel() {
        $this->nextLevelFlag = false;
        $this->gameOverFlag = false;
        $this->level++;
        $this->levelCounter = 0;
        $this->pac->setLastSymbol(self::EATEN_PELLET_SYMBOL);
        $this->ghost->setLastSymbol(self::GHOST_SYMBOL);
        $this->createGame();
    }

    private function createGame() {
        $output = array_fill(0, $this->gameSize, self::PELLET_SYMBOL);

        $pacPos = rand(0, $this->gameSize);
        $fruitPos = rand(0, $this->gameSize);
        $ghostPos = rand(0, $this->gameSize);

        while ($fruitPos == $pacPos) {
            $fruitPos = rand(0, $this->gameSize);
        }

        while ($ghostPos == $fruitPos || $ghostPos == $pacPos) {
            $ghostPos = rand(0, $this->gameSize);
        }

        $this->pac->setPosition($pacPos);
        $this->ghost->setPosition($ghostPos);
        $this->fruit = $fruitPos;

        $output[$pacPos] = self::PAC_SYMBOL;
        $output[$ghostPos] = self::GHOST_SYMBOL;
        $output[$fruitPos] = self::FRUIT_SYMBOL;

        $this->gameBoard = $output;
    }

    //updates the game state to the next cycle
    //returns points so that engine class can calculate score
    public function update() {
        $nextSymbolEaten = self::EATEN_PELLET_SYMBOL;
        $gameOverResult = $this->isGameOver();

        $pacResult = $this->pac->move($this->gameBoard, $this->direction);
        $ghostResult = $this->ghost->move($this->gameBoard);

        if ($ghostResult != null) {
            $gameOverResult = $gameOverResult || $ghostResult;
        }

        if ($pacResult != null) {
            $gameOverResult = $gameOverResult || $pacResult[0];

            $nextSymbolEaten = $pacResult[1];

            if (!$gameOverResult && ++$this->levelCounter >= ($this->gameSize-1)) {
                $this->nextLevelFlag = true;
            }
        }

        //set flag based on results from ghost and pacman turns
        $this->gameOverFlag = $gameOverResult;

        return $nextSymbolEaten;

    }
}