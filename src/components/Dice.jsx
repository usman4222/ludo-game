import React, { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";
import DiceRolled from "../utilities/DiceRolled";
import "../styles/Dice.css";
import rollSound from "../assests/roll.mp3";

// Persistent audio outside component
const diceAudio = new Audio(rollSound);
diceAudio.preload = "auto";

const Dice = () => {
  const {
    diceNumberValue,
    rollDice,
    diceDisabled,
    setDiceDisabled,
    currentPlayer,
    playerPositions,
    nextTurn,
    size,
  } = useGameContext();

  const [rotated, setRotated] = useState(false);
  const [diceStyle, setDiceStyle] = useState("hidden");
  const allInitialValues = [1, 2, 3, 4, 5, 6];
  const [allValues, setValues] = useState(allInitialValues);

  const diceNumber = diceNumberValue.current;

  const handleClick = () => {
    if (diceDisabled) return;

    // Play sound instantly
    diceAudio.currentTime = 0;
    diceAudio.play().catch((err) => console.log("Audio play blocked:", err));

    // Dice animation and roll
    setDiceStyle("visible");
    setRotated(true);
    rollDice();

    setTimeout(() => setRotated(false), 1000);
    setTimeout(() => setDiceStyle("hidden"), 800);
  };

  useEffect(() => {
    DiceRolled(
      diceNumberValue,
      nextTurn,
      currentPlayer,
      playerPositions,
      setDiceDisabled
    );

    if (diceNumber === 0) return;

    if (
      diceNumber === 6 ||
      playerPositions[currentPlayer].some((v) => v !== 0)
    ) {
      setDiceDisabled(true);
    } else {
      setTimeout(() => {
        diceNumberValue.current = 0;
        nextTurn();
        setDiceDisabled(false);
      }, 1500);
    }
  }, [diceNumber, playerPositions, diceNumberValue, nextTurn, setDiceDisabled]);

  return (
    <div id="dice" style={{ transform: `scale(${size.dice})` }}>
      <div
        className={`dice ${rotated ? "rotate" : ""}`}
        onClick={handleClick}
        style={{ overflow: diceStyle }}
      >
        {["top", "front", "left", "back", "right", "bottom"].map((face, idx) => {
          const isBack = face === "back";
          const value = isBack ? diceNumber : allValues[idx];
          return (
            <div
              key={face}
              className={`face ${face} ${idx !== 1 ? "shadow-on" : ""}`}
            >
              <div className={"inner-face face" + value}>
                {Array(value)
                  .fill()
                  .map((_, i) => (
                    <span key={i} className="dot" />
                  ))}
                {isBack && diceNumber === 0 && (
                  <span className="dice-initial-face">ROLL</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dice;
