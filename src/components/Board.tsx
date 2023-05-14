import { WordGuess } from "../types/types";
import { Word } from "./Word";

type BoardProps = {
  wordGuesses: WordGuess[];
};

export function Board({ wordGuesses }: BoardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: ".5rem",
      }}>
      {wordGuesses.map((word, index) => (
        <span key={index}>
          <Word wordGuess={word} />
        </span>
      ))}
    </div>
  );
}
