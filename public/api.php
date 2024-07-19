<?php
use PakuPaku\PakuPakuEngine;

require_once('_config.php');

session_start();

if (isset($_SESSION['game'])) {
    $game = $_SESSION['game'];

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $action = $_POST['action'];
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $action = $_GET['action'];
    }
    error_log("Api page hit");
    switch( $action ) {
        case "reinitialize":
            $_SESSION['game'] = new PakuPakuEngine();
            return;
        case "changeDirection":
            if (isset($_POST["value"])) {
                $value = filter_var($_POST["value"], FILTER_VALIDATE_BOOLEAN);
                $game->changeDirection($value);
            }
            break;
        case "gameData":
            if (isset($_GET["snapshot"])) {
                $snapshot = $_GET["snapshot"];
                if ($snapshot == "true") {
                    $data = $game->generateGameFrame();
                } else {
                    $data = $game->updateGame();
                }
            }
            break;    
    }

    $_SESSION['game'] = $game;

    header("Content-Type: application/json");
    $encodedData = json_encode($data);
    echo $encodedData;
}