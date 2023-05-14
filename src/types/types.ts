export enum guessValue {
  correct = "CORRECT",
  partial = "PARTIAL",
  incorrect = "INCORRECT",
}

export enum gameState {
  active = "ACTIVE",
  win = "WIN",
  lose = "LOSE",
}

export type WordGuess = {
  word: LetterGuess[];
};

export type LetterGuess = {
  letter: string;
  value: guessValue;
};
