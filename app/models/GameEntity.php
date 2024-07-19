<?php
namespace PakuPaku;

abstract class GameEntity {
    protected $position;
    protected $lastSymbol;
    protected $lastTimeMoved;
    protected $movementDelay;

    public function __construct($position, $moveDelay, $lastSymbol) {
        $this->position = $position;
        $this->lastSymbol = $lastSymbol;
        $this->lastTimeMoved = round(microtime(true) * 1000);
        $this->movementDelay = $moveDelay;
    }

    public function setPosition($position) {
        $this->position = $position;
    }

    public function setLastSymbol($lastSymbol) {
        $this->lastSymbol = $lastSymbol;
    }

    protected function updateLastTimeMoved() {
        $this->lastTimeMoved = round(microtime(true) *1000);
    }

    public function shouldMove() {
        $currentTime = round(microtime(true) * 1000);
        return ($currentTime - $this->lastTimeMoved) >= $this->movementDelay;
    }

    abstract public function move(&$game, $direction);
}