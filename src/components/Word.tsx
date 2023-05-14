import { LetterBox } from "./LetterBox";
import { WordGuess } from "../types/types";

type WordProps = {
  wordGuess: WordGuess;
};

export function Word({ wordGuess }: WordProps) {
  return (
    <div style={{ display: "flex", gap: ".5rem" }}>
      {wordGuess.word.map((letterGuess, index) => (
        <span key={index}>
          <LetterBox letterGuess={letterGuess} />
        </span>
      ))}
    </div>
  );
}
