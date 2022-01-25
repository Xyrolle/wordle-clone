import { RowState, State } from './constants.js';
import words from './words.js';

export const isCharacterALetter = (char: string) => (/[a-zA-Z]/).test(char);
export const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

export const wordInVocab = (word: string) => words.filter((otherWord: string) => otherWord === word.toLowerCase()).length;

export const createKeyboardState = () => Object.fromEntries(
    Array.from(Array(26)).map((e, i) => i + 97)
        .map((x) => [ String.fromCharCode(x), State.HIDDEN ]
    )
);

export const createCellState = (rows: number, cols: number) => Array.from({ length: rows }, 
    () => Array.from({ length: cols },
        () => ({ letter: '', state: State.HIDDEN, cellClass: '' })
    )
);

export const createRevealedRows = (rows: number) => Array.from({ length: rows }, () => RowState.NOT_REVEALED);