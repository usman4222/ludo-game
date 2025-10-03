import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const diceNumberValue = useRef(0);
  const defaultBoardSize = useRef(0.8);
  const [diceDisabled, setDiceDisabled] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // game setup
  const [numPlayers, setNumPlayers] = useState(4); // default 4
  const [activePlayers, setActivePlayers] = useState([
    "red",
    "green",
    "yellow",
    "blue",
  ]);
  const [inactivePlayers, setInactivePlayers] = useState([]); // 👈 NEW
  const [currentPlayer, setCurrentPlayer] = useState("red");

  // player positions
  const [playerPositions, setPlayerPositions] = useState({
    red: [0, 0, 0, 0],
    green: [0, 0, 0, 0],
    blue: [0, 0, 0, 0],
    yellow: [0, 0, 0, 0],
  });

  const [size, setSize] = useState({ dice: 1.2, board: "" });
  const [win, setWin] = useState([]);

  // ⚡ Responsive board resize
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      let newBoardSize = 0.8;

      if (screenWidth < 1025 && screenWidth >= 768) {
        newBoardSize = 0.8;
        defaultBoardSize.current = 0.8;
      } else if (screenWidth < 768 && screenWidth >= 550) {
        newBoardSize = 0.5;
        defaultBoardSize.current = 0.5;
      } else if (screenWidth < 768) {
        newBoardSize = 0.35;
        defaultBoardSize.current = 0.35;
      }

      setSize((prevSize) => ({ ...prevSize, board: newBoardSize }));
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🎲 Roll Dice
  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    diceNumberValue.current = randomNumber;
  };

  // 🔄 Next Turn (skips inactive players)
  const nextTurn = () => {
    const idx = activePlayers.indexOf(currentPlayer);
    const nextIdx = (idx + 1) % activePlayers.length;
    setCurrentPlayer(activePlayers[nextIdx]);
  };

  // 🎯 Setup players dynamically
  const setupPlayers = (playersCount) => {
    setNumPlayers(playersCount);

    if (playersCount === 2) {
      setActivePlayers(["red", "blue"]);
      setInactivePlayers(["green", "yellow"]);
      setCurrentPlayer("red");
    } else if (playersCount === 3) {
      setActivePlayers(["red", "blue", "green"]);
      setInactivePlayers(["yellow"]);
      setCurrentPlayer("red");
    } else {
      setActivePlayers(["red", "green", "yellow", "blue"]);
      setInactivePlayers([]);
      setCurrentPlayer("red");
    }

    // reset board
    setPlayerPositions({
      red: [0, 0, 0, 0],
      green: [0, 0, 0, 0],
      blue: [0, 0, 0, 0],
      yellow: [0, 0, 0, 0],
    });
    setWin([]);

    setGameStarted(false); // wait until user presses "Start"
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <GameContext.Provider
      value={{
        diceNumberValue,
        rollDice,
        diceDisabled,
        setDiceDisabled,
        currentPlayer,
        nextTurn,
        playerPositions,
        setPlayerPositions,
        setCurrentPlayer,
        size,
        setSize,
        win,
        setWin,
        defaultBoardSize,
        numPlayers,
        setupPlayers,
        startGame,
        activePlayers,
        inactivePlayers,
        gameStarted,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
