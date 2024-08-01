# PakuPaku

A repository representing the PakuPaku JS game for assignment 2 of the CSI3140 class.

## Github

You can find the GitHub repository for the project [here.](https://github.com/Tom-Latimer/PakuPaku)

## Students

- **Name:** Tom Latimer  
  **Student Number:** 300250278  

- **Name:** Ash Bhattarai  
  **Student Number:** 300236157

## Documentation

- [Design System](docs/design_system.md)

## How to Play

> **Note:** The game uses JavaScript modules which require you to clone the repo and host it on a local server.  
> The game **will not** work properly if you simply try to double click the index.html file to run it.

### Starting the Game

Once the website has been launched, the game will be displayed to you. To start the game, press the spacebar on your keyboard and PakuPaku will begin moving in a direction. After a Game Over, you can press the spacebar again to play.

![Start screen](docs/start.png)

### Moving PakuPaku

PakuPaku will move automatically once the game starts. Use the left arrow key to make him go left and the right arrow key to make him go right. You do not need to hold down the arrow keys as PakuPaku moves on his own; the arrow keys are only used to change direction.

### Levels

As PakuPaku eats all the pellets and fruit on the screen, a new level will automatically generate, and you will continue playing on it. This process repeats endlessly until PakuPaku encounters a ghost, which ends the game.

### Score

Your current score is displayed in the top left corner, while your cumulative high score is shown in the top right. Points are awarded for each pellet and fruit PakuPaku eats, with pellets worth 1 point each and fruit worth 5 points.

![In game with scoreboard](docs/game.png)

### The Goal

The goal of PakuPaku is to survive as long as possible and achieve a high score. Remember, the fruit **will not allow PakuPaku to eat the ghost; it only gives points**. Therefore, avoid the ghost at all costs as it is an immovable obstacle.

### Game Over

The game ends when PakuPaku encounters a ghost. When the game is over, the final score is displayed, and you can press the spacebar to restart the game.

![End screen](docs/gameover.png)

## Additional Features

### Responsive Design

PakuPaku is designed with responsive elements to ensure it functions well on various screen sizes. However, for the best experience, play the game on a desktop with a keyboard.

### Scoreboard

The game keeps track of your high score even after multiple plays, giving you a goal to strive for in each new game session.

## User Interface States

### Start Screen

The start screen is the first interface players see when they load the game. It features a simple layout with a prompt instructing the player to press the spacebar to begin. This screen also displays the game’s title and instructions to begin the game. The background reflects the game’s theme, creating an immediate immersion into the PakuPaku world.
![Start screen](docs/start.png)

### In-Game Interface

Once the game starts, the in-game interface takes over. This screen is where the action happens, with PakuPaku navigating through a maze, eating pellets and fruit while avoiding ghosts. Key elements include:
- **Score Display:** The current score is visible in the top left corner, constantly updating as the player collects pellets and fruit.
- **High Score Display:** The cumulative high score is shown in the top right corner, giving players a target to beat in each playthrough.
- **Maze Layout:** The maze itself, with walls, pellets, fruit, and the ghost, takes up the majority of the screen space.
- **PakuPaku Character:** The player controls this character, and its movement and direction are responsive to user input.

### Game Over Screen

When PakuPaku encounters a ghost, the game transitions to the Game Over screen. This screen clearly indicates that the game has ended and displays the player’s final score. 

- **Final Score Display:** The player’s score at the end of the game is prominently displayed.
- **Restart Prompt:** A message prompting the player to press the spacebar to try again is usually centered on the screen.
- **Visual Feedback:** The screen may include visual cues that indicate the game is over, such as a change in color scheme, an image of the ghost, or PakuPaku looking defeated.

These UI states are designed to be intuitive and provide clear feedback, guiding the player smoothly through the game from start to finish.
![Gave Over Screen](docs/gameover.png)