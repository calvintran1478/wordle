import styles from "../styles/Letter.module.css";
import { guessValue, LetterGuess } from "../types/types";

type LetterBoxProps = {
  letterGuess: LetterGuess;
};

export function LetterBox({ letterGuess }: LetterBoxProps) {
  return (
    <div
      className={`${styles.letter} ${
        letterGuess.value == guessValue.correct ? styles.correct : ""
      }
        ${
          letterGuess.value == guessValue.partial ? styles.partiallyCorrect : ""
        }`}>
      {letterGuess.letter}
    </div>
  );
}
