import React, { useRef } from "react";
import Move from "../utilities/Move";
import { useGameContext } from "../context/GameContext";
import "../styles/Piece.css";
import moveSoundFile from "../assests/moveSoundFile.mp3";

const Piece = ({ color, id, onClick }) => {
  const {
    currentPlayer,
    diceNumberValue,
    playerPositions,
    setDiceDisabled,
    setPlayerPositions,
    nextTurn,
    win,
    setWin,
    inactivePlayers,
  } = useGameContext();

  const moveSound = useRef(new Audio(moveSoundFile));

  function colorGenerator(color) {
    switch (color) {
      case "red":
        return "#FF0800";
      case "blue":
        return "#0000FF";
      case "green":
        return "#4CBB17";
      case "yellow":
        return "#FFC40C";
      default:
        return "white";
    }
  }

  const make_a_move = (e) => {
    if (inactivePlayers.includes(color)) return; // ⛔ Do nothing for inactive players

    Move(e, {
      currentPlayer,
      playerPositions,
      diceNumberValue,
      setDiceDisabled,
      setPlayerPositions,
      nextTurn,
      win,
      setWin,
    });

    if (onClick) onClick(id);
    else {
      const audio = moveSound.current;
      audio.currentTime = 0;
      audio.play().catch((err) => console.log("Sound play blocked:", err));
    }
  };

  return (
    <div
      id={id}
      className="piece"
      style={{
        backgroundColor: colorGenerator(color),
        opacity: inactivePlayers.includes(color) ? 0.3 : 1, // 🔹 Grey out inactive pieces
        cursor: inactivePlayers.includes(color) ? "not-allowed" : "pointer",
      }}
      onClick={make_a_move}
    >
      <div className="piece-inner"></div>
    </div>
  );
};

export default Piece;
