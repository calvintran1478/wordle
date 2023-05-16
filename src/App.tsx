import { useEffect, useState } from "react";
import { gameState, guessValue, LetterGuess, WordGuess } from "./types/types";
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

class WordGuesser {
  private wordToGuess: string;
  private setWordGuesses: React.Dispatch<React.SetStateAction<WordGuess[]>>;
  private setActive: React.Dispatch<React.SetStateAction<gameState>>;
  private wordIndex: number;
  private letterIndex: number;
  private state: gameState;

  public constructor(
    wordToGuess: string,
    setWordGuesses: React.Dispatch<React.SetStateAction<WordGuess[]>>,
    setActive: React.Dispatch<React.SetStateAction<gameState>>
  ) {
    // Store guess information
    this.wordToGuess = wordToGuess;
    this.setWordGuesses = setWordGuesses;

    // Store word guesser state
    this.wordIndex = 0;
    this.letterIndex = 0;
    this.state = gameState.active;
    this.setActive = setActive;
  }

  private updateLetter = (
    wordIndex: number,
    letterIndex: number,
    letter: string,
    value: guessValue = guessValue.incorrect
  ): void => {
    this.setWordGuesses((prevGuesses) => {
      const updatedGuesses: WordGuess[] = prevGuesses.map((wordGuess, i) => {
        const updatedWord: WordGuess = {
          word: wordGuess.word.map((letterGuess, j) => {
            if (wordIndex === i && letterIndex === j) {
              return { letter: letter, value: value };
            } else {
              return letterGuess;
            }
          }),
        };
        return updatedWord;
      });
      return updatedGuesses;
    });
  };

  private evaluateGuess = (): void => {
    this.setWordGuesses((prevGuesses) => {
      const updatedGuesses: WordGuess[] = prevGuesses.map((wordGuess) => {
        const updatedWord: WordGuess = {
          word: wordGuess.word.map((letterGuess, j) => {
            if (letterGuess.letter === this.wordToGuess.charAt(j)) {
              return { letter: letterGuess.letter, value: guessValue.correct };
            } else if (
              this.wordToGuess.includes(letterGuess.letter) &&
              letterGuess.letter !== ""
            ) {
              return { letter: letterGuess.letter, value: guessValue.partial };
            } else {
              return {
                letter: letterGuess.letter,
                value: guessValue.incorrect,
              };
            }
          }),
        };
        return updatedWord;
      });
      return updatedGuesses;
    });
  };

  public guessLetter(letter: string): void {
    if (
      this.state === gameState.active &&
      this.letterIndex < this.wordToGuess.length
    ) {
      this.updateLetter(this.wordIndex, this.letterIndex, letter.toUpperCase());
      this.letterIndex += 1;
    }
  }

  public removeLetter(): void {
    if (this.state === gameState.active && this.letterIndex > 0) {
      this.updateLetter(this.wordIndex, this.letterIndex - 1, "");
      this.letterIndex -= 1;
    }
  }

  public getState(): gameState {
    return this.state;
  }

  public submitGuess(): void {
    if (
      this.state === gameState.active &&
      this.letterIndex === this.wordToGuess.length
    ) {
      // Evaluate guess
      this.evaluateGuess();

      // Check for game over condition
      this.setWordGuesses((guesses) => {
        const currentGuess: LetterGuess[] = guesses[this.wordIndex - 1].word;
        const correctGuess: boolean = currentGuess.every(
          (letterGuess) => letterGuess.value === guessValue.correct
        );

        // Game over
        if (correctGuess) {
          this.state = gameState.win;
          this.setActive(gameState.win);
        } else if (this.wordIndex === guesses.length) {
          this.state = gameState.lose;
          this.setActive(gameState.lose);
        }

        return guesses;
      });

      // Continue
      this.wordIndex += 1;
      this.letterIndex = 0;
    }
  }
}

function App() {
  // Intialize state and set up word guesser
  const wordToGuess = getWord();
  const [wordGuesses, setWordGuesses] = useState(
    intializeWordGuesses(wordToGuess, 6)
  );
  const [active, setActive] = useState(gameState.active);
  const wordGuesser = new WordGuesser(wordToGuess, setWordGuesses, setActive);

  // Event handler for letter guesses from keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      wordGuesser.guessLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  // Event handler for deleting a letter from keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Backspace") return;

      e.preventDefault();
      wordGuesser.removeLetter();
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  // Event handler for submiting guesses from keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      wordGuesser.submitGuess();
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

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
