<?php
namespace PakuPaku;

use PakuPaku\PakuPakuGame;

class Paku extends GameEntity
{

    public function __construct($position, $moveDelay, $lastSymbol = PakuPakuGame::EATEN_PELLET_SYMBOL) {
        parent::__construct($position, $moveDelay, $lastSymbol);
    }

    public function move(&$game, $direction) {
        if ($this->shouldMove()) {
            if ($direction == null) {
                throw new \InvalidArgumentException("Direction must be passed to player for movement");
            }
    
            $n = count($game);
        
            $game[$this->position] = $this->lastSymbol;
    
            $outputSymbol = PakuPakuGame::PELLET_SYMBOL;
        
            $newPosition = $direction ? ($this->position - 1 + $n) % $n : ($this->position + 1) % $n;
    
            switch ($game[$newPosition]) {
                case PakuPakuGame::FRUIT_SYMBOL:
                    $outputSymbol = PakuPakuGame::FRUIT_SYMBOL;
                case PakuPakuGame::PELLET_SYMBOL:
                    $this->lastSymbol = PakuPakuGame::EATEN_PELLET_SYMBOL;
                    break;
                case PakuPakuGame::GHOST_SYMBOL;
                    return [true, PakuPakuGame::GHOST_SYMBOL];
                case PakuPakuGame::EATEN_PELLET_SYMBOL:
                    $this->lastSymbol = PakuPakuGame::EATEN_PELLET_SYMBOL;
                    $outputSymbol = PakuPakuGame::EATEN_PELLET_SYMBOL;
                    break;
            }
    
            $this->position = $newPosition;
            $game[$this->position] = PakuPakuGame::PAC_SYMBOL;

            //reset movement timer
            $this->updateLastTimeMoved();
    
            return [false, $outputSymbol];
        }
    }
}