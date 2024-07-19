<?php
use PakuPaku\PakuPakuEngine;

require_once('_config.php');

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

session_start();

if (!isset($_SESSION['game'])) {
    $game = new PakuPakuEngine();

    $_SESSION['game'] = $game;
} else {
    $game = $_SESSION['game'];
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PakuPaku</title>
    <link rel="stylesheet" href="../assets/styles/style.css">
    <script defer src="../assets/js/jquery-3.7.1.min.js"></script>
    <script defer type="module" src="../assets/js/graphics.js"></script>
    <script defer type="module" src="../assets/js/pakupaku.js"></script>
</head>
<body>
    <div class="game-container">
        <div class="current-score-container">
            <p id="current-score"></p>
        </div>
        <div class="hi-score-container">
            <p id="hi-score"></p>
        </div>
        <div class="message-container">
            <h1 id="message"></h1>
        </div>
        <div class="game-board-container" id="game-board">
            
        </div>
    </div>
    <div class="scanlines"></div>
</body>
</html>