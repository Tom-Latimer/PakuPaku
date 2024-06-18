# PakuPaku Game Design System

This design document outlines the visual and interactive components of the PakuPaku game.


## Design Principles

- **Consistency:** All design elements are consistent in style and function across different parts of the game.
- **Accessibility:** The game is accessible to players with varying abilities, ensuring a wide range of users can enjoy it.
- **Engagement:** Visuals and interactions are designed to keep players engaged and entertained throughout the game.

## Visual Styles

### Colors

- **Pac-Man Color:** `#FFFF00` (Yellow)
- **Ghost Color:** `#00FFFF` (Cyan)
- **Fruit Color:** `#FE0000` (Red)
- **Background Color:** `#0C062E` (Dark Blue)
- **Font Color:** `#F2E9E9` (Off-White)
- **Border Color:** `#67B3B5` (Teal)

### Fonts

- **Font Family:** 'Munro Regular', sans-serif
- **Usage:**
  - Game Score: 6em
  - Game Messages: 3em
  - Game Board: 4.5em


## Game Components Design

This section outlines the major components of the PakuPaku game design, including interface layout and gameplay mechanics.

### Starting a New Game

- **Action:** Players start the game by pressing spacebar.
- **UI Element:** The user is instructed to press spacebar to start in large text upon webpage load.
- **Visual Style:** Uses the primary color (`#FFFF00`), ensuring it stands out against the darker background.


### In Game Play

#### Game Board

- **Description:** The game board is the central part of the gameplay where all the action takes place. It is designed as a 1D grid-based layout where Pakupaku, ghosts, pellets, and fruits are displayed.
- **Layout:** The board is structured to facilitate smooth navigation for Pakupaku and the ghosts. Each element within the grid (pellets, fruits, ghosts) is aligned to ensure logical movement and interaction.
- **Visual Style:** 
    - **Background Color:** The screen maintains the dark theme (`#0C062E`) of the game which helps highlight the text and scores.
    - **Text Color:** The scores text are displayed in a bright color (`#F2E9E9`) for contrast against the dark background.
    - **Font Style:** The text uses a pixelated font to maintain the retro arcade aesthetic.

#### Game Controls

- **Description:** Controls allow the player to direct Pakupaku throughout the 1-D game board. The controls are designed to be intuitive, ensuring a seamless gaming experience.
- **Keyboard Controls:** Players use the left and right arrow keys to move Pakupaku left and right. The control mechanism is responsive to quick changes in direction to evade ghosts.



### Scoreboard

#### Overview

The scoreboard is an essential component of PakuPaku, displaying the current score, high score, and other relevant game information. It is strategically placed on the top of the screen to be easily viewable without interfering with gameplay.

#### Design

- **Location:** The scoreboard is positioned at the top of the game screen, ensuring it is always in the player's line of sight.
- **Functionality:** It updates dynamically to reflect the player's current score as they collect pellets and fruits, and capture ghosts.

#### Style

- **Colors:** Uses contrasting colors to ensure readability. The current score and high score are highlighted in the primary game color in contrast to the dark background of the board.
- **Typography:** The scores are displayed using large, bold fonts to ensure they are easily readable against the background.


### End of the Game

- **Description:** This screen appears when the player runs into a ghost on the 1-D board.
  
- **Layout:**
  - The screen displays the current score on the left and the high score on the right.
  - The phrase "Game Over" is prominently displayed in the center to clearly indicate the end of gameplay.

- **Style:**
  - **Background Color:** The screen maintains the dark theme (`#0C062E`) of the game which helps highlight the text and scores.
  - **Text Color:** The scores and the "Game Over" text are displayed in a bright color (`#F2E9E9`) for contrast against the dark background.
  - **Font Style:** The text uses a pixelated font to maintain the retro arcade aesthetic.

- **Functionality:**
  - **Scores Display:** The current and high scores are updated and displayed based on the final game outcomes.
  - **Restart Option:** Users can press spacebar to restart the game.


