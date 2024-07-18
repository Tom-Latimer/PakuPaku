<?php
namespace PakuPaku;

class Ghost extends GameEntity
{
    public function __construct($position, $moveDelay, $lastSymbol = PakuPakuGame::PELLET_SYMBOL) {
        parent::__construct($position, $moveDelay, $lastSymbol);
    }

    public function move(&$game, $direction) {
        if($this->shouldMove()) {
            $n = count($game);
    
            $game[$this->position] = $this->lastSymbol;

            $direction = (bool) rand(0,1);
        
            $newPosition = $direction ? ($this->position - 1 + $n) % $n : ($this->position + 1) % $n;
            
            $gameOver = false;

            switch ($game[$newPosition]) {
                case PakuPakuGame::FRUIT_SYMBOL:
                    $this->lastSymbol = PakuPakuGame::FRUIT_SYMBOL;
                    break;
                case PakuPakuGame::PELLET_SYMBOL:
                    $this->lastSymbol = PakuPakuGame::PELLET_SYMBOL;
                    break;
                case PakuPakuGame::EATEN_PELLET_SYMBOL:
                    $this->lastSymbol = PakuPakuGame::EATEN_PELLET_SYMBOL;
                    break;
                case PakuPakuGame::PAC_SYMBOL;
                    $this->lastSymbol = PakuPakuGame::PAC_SYMBOL;
                    $gameOver = true;
                    break;
            }

            $this->position = $newPosition;
            $game[$this->position] = PakuPakuGame::GHOST_SYMBOL;

            //reset movement timer
            $this->updateLastTimeMoved();

            return $gameOver;
        }
    }
}