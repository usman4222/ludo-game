import "./App.css";
import { useState } from "react";
import Board from "./components/Board";
import Dice from "./components/Dice";
import Settings from "./components/Settings";
import { GameProvider, useGameContext } from "./context/GameContext";
import GameOver from "./components/GameOver";
import PlayerChance from "./components/PlayerChance";
import Setup from "./components/Setup";

function GameWrapper() {
  const { gameStarted } = useGameContext();
  const [boardRotate, setBoardRotate] = useState(0);

  if (!gameStarted) {
    return (
      <div className="setup-screen">
        <Setup />
      </div>
    );
  }

  return (
    <>
      <GameOver />
      <div className="mobile-current-player">
        <PlayerChance />
      </div>
      <div
        id="board-container"
        style={{ transform: `rotate(${boardRotate}deg)` }}
      >
        <Board />
      </div>
      <div id="second-container">
        <Settings setBoardRotate={setBoardRotate} />
        <div className="dice-container">
          <Dice />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <div className="App">
        <GameWrapper />
      </div>
    </GameProvider>
  );
}

export default App;
