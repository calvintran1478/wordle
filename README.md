# Wordle

A simple recreation of Wordle using TypeScript.

# Installation/Usage

1. Install Node.js (note that Vite requires Node.js version 14.18+)
2. Clone this repository onto your computer by **git** and `cd` into it.

```bash
git clone https://github.com/calvintran1478/wordle.git
cd wordle
```

3. Run `npm i` to install all required packages.
4. Run `npm run dev` to run the app in development mode.
5. Open http://localhost:5173/ to view it in the browser.

# Gameplay

When the app starts, a random five-letter word is generated, and it's your job to try and guess what it is! Input letters from your keyboard and press Enter to submit your guess. You can also remove letters by pressing Backspace. After guessing, letters are highlighted green if they are in the correct position and are highlighted yellow if they are included in the word but in the wrong position. If they are not highlighted (remain black), they do not appear in the word. You can restart with a new word and play again by refreshing the browser.
