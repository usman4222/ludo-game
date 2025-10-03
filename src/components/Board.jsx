import React, { useState, useEffect, useRef } from "react";
import Piece from "./Piece";
import Home from "./Home";
import Square from "./Square";
import trackLayout from "../utilities/TrackLayout";
import { useGameContext } from "../context/GameContext";
import "../styles/Board.css";
import moveSoundFile from "../assests/moveSoundFile.mp3";

const Board = () => {
  const { playerPositions, currentPlayer, size, numPlayers } = useGameContext();
  const [layout, setLayout] = useState(trackLayout);

  const moveSound = useRef(new Audio(moveSoundFile));

  // 🔊 Play sound when pieces move
  useEffect(() => {
    if (Object.values(playerPositions).some(arr => arr.some(pos => pos !== 0))) {
      const audio = moveSound.current;
      audio.currentTime = 0;
      audio.play().catch((err) => console.warn("Audio play blocked:", err));
    }
  }, [playerPositions]);

  // Update layout with pieces
  useEffect(() => {
    const updatedLayout = { ...trackLayout };
    Object.values(updatedLayout).forEach((value) => (value.Piece = []));

    Object.entries(playerPositions).forEach(([color, positions]) => {
      positions.forEach((position, index) => {
        if (![0, 106, 206, 306, 406].includes(position)) {
          updatedLayout[position].Piece.push(`${color}-${index}`);
        }
      });
    });

    setLayout(updatedLayout);
  }, [playerPositions, currentPlayer]);

  // Define active and all players
  const activePlayers = numPlayers === 2 ? ["red", "blue"] : ["red", "green", "yellow", "blue"];
  const allPlayers = ["red", "green", "yellow", "blue"];

  return (
    <div id="board" style={{ transform: `scale(${size.board})` }}>
      {/* Homes */}
      {allPlayers.map((color) => {
        const isActive = activePlayers.includes(color);

        return (
          <Home key={color} color={color}>
            {playerPositions[color].map((position, index) => {
              if (position === 0) {
                return (
                  <Piece
                    key={index}
                    id={`${color}-${index}`}
                    color={isActive ? color : "white"} // inactive players appear white
                    disabled={!isActive} // optional: for click prevention
                  />
                );
              }
              return null;
            })}
          </Home>
        );
      })}

      <Square />

      {/* Track */}
      {Object.entries(layout).map(([key, value]) => {
        const numberOfPieces = value.Piece.length;
        const childClassName = numberOfPieces > 1 ? "multiple-pieces" : "";

        return (
          <div key={key} className={`${value.type} track-${key} ${childClassName}`}>
            {value.Piece.map((piece, i) => (
              <Piece
                key={i}
                id={piece}
                color={piece.split("-")[0]}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
