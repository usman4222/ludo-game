import { useState } from "react";
import { useGameContext } from "../context/GameContext";
import ludoHero from "../assests/ludo-hero.jpg";
import "../styles/Setup.css";

const Setup = () => {
  const { setupPlayers, startGame, gameStarted } = useGameContext();
  const [selectedCount, setSelectedCount] = useState(null);

  return (
    <div className="setup-container">
      <div className="setup-card">
        {/* Hero Image */}
        <div className="setup-header">
          <img src={ludoHero} alt="Ludo Game" className="setup-banner" />
          <h1 className="setup-title">LUDO GAME</h1>
        </div>

        {/* Player Selection */}
        <div className="setup-selection">
          <p className="setup-subtitle">Select Number of Players</p>
          <div className="setup-buttons">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => {
                  setSelectedCount(count);
                  setupPlayers(count);
                }}
                className={`setup-btn ${selectedCount === count ? "active" : ""}`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        {selectedCount && !gameStarted ? (
          <button onClick={startGame} className="start-btn">
            ▶ Start Game
          </button>
        ) : (
          !gameStarted && (
            <div className="hint-text">👆 Choose player count to continue</div>
          )
        )}

        {/* Rules */}
        {/* <div className="setup-rules">
          <p className="rules-title">Game Rules</p>
          <ul>
            <li>• Roll a 6 to enter tokens from home</li>
            <li>• Land on opponent's token to send them home</li>
            <li>• Safe spots are marked with stars ⭐</li>
            <li>• Get all 4 tokens to finish to win! 🏆</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Setup;
