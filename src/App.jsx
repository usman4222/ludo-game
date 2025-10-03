import "./App.css";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import Dice from "./components/Dice";
import Settings from "./components/Settings";
import { GameProvider, useGameContext } from "./context/GameContext";
import GameOver from "./components/GameOver";
import PlayerChance from "./components/PlayerChance";
import Setup from "./components/Setup";

// Custom modal component
const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  const { gameStarted, resetGame } = useGameContext();
  const [boardRotate, setBoardRotate] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Native browser refresh/close warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (gameStarted) {
        e.preventDefault();
        e.returnValue = "Are you sure? Game will reset!";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [gameStarted]);

  // In-app Refresh Game button
  const handleRefreshClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    resetGame(); // Reset game state
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  if (!gameStarted) {
    return (
      <div className="setup-screen">
        <Setup />
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <ConfirmModal
          message="Are you sure? Game will reset!"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
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
        {/* In-app Refresh Game button */}
        <button onClick={handleRefreshClick} className="refresh-game-btn">
          Refresh Game
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <div className="App">
        <AppContent />
      </div>
    </GameProvider>
  );
}

export default App;
