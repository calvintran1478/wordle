import { useState } from "react";
import { gameState, guessValue, WordGuess } from "./types/types";
import { Board } from "./components/Board";
import words from "./data/wordList.json";
import "./styles/App.css";

function getWord(): string {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

function intializeWordGuesses(
  wordToGuess: string,
  allowedGuesses: number
): WordGuess[] {
  return JSON.parse(
    JSON.stringify(
      Array(allowedGuesses).fill({
        word: Array(wordToGuess.length).fill({
          letter: "",
          value: guessValue.incorrect,
        }),
      })
    )
  );
}

function App() {
  const wordToGuess = getWord();
  const [wordGuesses, setWordGuesses] = useState(
    intializeWordGuesses(wordToGuess, 6)
  );
  const [active, setActive] = useState(gameState.active);

  return (
    <div className="container">
      <h1>Wordle</h1>
      <Board wordGuesses={wordGuesses} />
      <h1>
        {active === gameState.win && "You Win!"}
        {active === gameState.lose && "You Lose, Play Again?"}
      </h1>
    </div>
  );
}

export default App;
