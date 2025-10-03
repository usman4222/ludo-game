import React from "react";
import { useGameContext } from "../context/GameContext";

import "../styles/PlayersRank.css";

const PlayersRank = () => {
  const { win, activePlayers } = useGameContext();

  return (
    <div className="players-rank">
      <p>Player's Rank</p>
      <div className="player-rank">
        {activePlayers.map((player, index) => (
          <div key={player} className="pr-position">
            <div className="pr-header">#{index + 1}</div>
            <div className="pr-name">{win[index] ? win[index] : ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersRank;
