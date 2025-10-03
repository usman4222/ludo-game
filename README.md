# Ludo Game in React

**Project Overview**
This project is a simple Ludo game built using React. It allows 4 players to play the classic board game. The game follows the rules of traditional Ludo, with a few modifications.

## Live Demo

You can play the game live at [this link](https://ludo-game-pied.vercel.app/).

## Available Scripts
**Getting Started**

1. **Prerequisites:**
   - Node.js and npm (or yarn) installed on your system. You can download them from [https://nodejs.org/en](https://nodejs.org/en).

2. **Cloning the Repository:**
   - Open your terminal and navigate to your desired project directory.
   - Clone this repository using the following command:

     ```bash
     git clone [https://github.com/usman4222/ludo-game.git](https://github.com/usman4222/ludo-game.git)
     ```

3. **Installation:**
   - Navigate into the cloned directory:

     ```bash
     cd Ludo-react
     ```

   - Install the project's dependencies:

     ```bash
     npm install (or yarn install)
     ```

4. **Development Server:**
   - Start the development server to run the game locally:

     ```bash
     npm start (or yarn start)
     ```

   - This will typically launch the game in your default web browser at `http://localhost:3000/`.

## Rules of the Game

- The token (goti) moves out from the house when the dice indicates 6.
- Whenever a player gets a six, they get an additional chance.
- Stops exist where tokens won't attack opponent's tokens, although these stops haven't been added yet.
- The game can be played among 4 players.
- The player who secures all 4 tokens by reaching the center (the win area) of the board wins the game.

## To Play the Game

1. Click on the square dice to roll it.
2. By default, the red player moves first.
3. Click on the red token to move it according to the number indicated on the dice.
4. If the dice indicates 1 or 6, the token can be taken out of the house.
5. Unlock the dice by clicking on the tokens of the correct color.
6. Turns move in a clockwise fashion starting from red.

