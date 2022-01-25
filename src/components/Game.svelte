<script lang="ts">
    import { onMount } from 'svelte';

    import Grid from './Grid.svelte';
	import Keyboard from './Keyboard.svelte';
    import GameOverModal from './GameOverModal.svelte';
    
    import { cells, state, rowClasses } from '../store.js';
    
	import { isCharacterALetter, getRandomWord, wordInVocab, createCellState, createKeyboardState, createRevealedRows } from '../utils.js';
    import { RowState, State } from '../constants.js';

    let word = getRandomWord();
    const ROWS = 6;
    $: COLS = word.length;

    onMount(() => cells.set(createCellState(ROWS, COLS)));

    let lettersTyped = 0;
    let gameOver = false;
    let revealedRows = createRevealedRows(ROWS);

    $: won = false;
    $: lost = revealedRows.reduce((prev, curr) => prev + curr, 0) === 6 && !won;

    $: currentRow = Math.floor(lettersTyped / COLS);
    $: currentCol = lettersTyped % COLS;

    const handleReveal = (idx: number) => {
        if (revealedRows[idx]) return;

        revealedRows[idx] = RowState.REVEALED;

        const indexesOfLetter = {};
        word.split('').forEach((letter, idx) => {
            indexesOfLetter[letter] = [ ...(indexesOfLetter[letter] ?? []), idx ];
        });
        
        let correct = 0;
        const notInWord = {};
        $cells[idx].forEach((cell, idx) => {
            const letter = cell.letter;
            notInWord[letter] = notInWord[letter] ? notInWord[letter] : 0;
            if (indexesOfLetter[letter] && indexesOfLetter[letter].includes(idx)) {
                cell.state = State.CORRECT;
                state.update(state => ({ ...state, [letter]: State.CORRECT }));
                correct++;
                notInWord[letter]++;
            }
        });

        if (correct === word.length) {
            won = true;
        }

        $cells[idx].forEach((cell, idx: number) => {
            const letter = cell.letter;
            const letterState = $state[letter]
            let newLetterState = letterState;
            if (indexesOfLetter[letter] && (notInWord[letter] < indexesOfLetter[letter].length)
                        && !indexesOfLetter[letter].includes(idx)) {
                notInWord[letter]++; 
                newLetterState = State.IN_WORD;
            } else if (cell.state === State.HIDDEN) {
                newLetterState = State.WRONG;
            }

            cell.state = newLetterState;

            if (letterState !== State.CORRECT) {
                state.update(state => ({ ...state, [letter]: newLetterState }));
            }
        });

        cells.set($cells);
    }

    const handleKeys = (command: string) => {
        handleKeyDown(undefined, command);
    }

    const handleKeyDown = (e: KeyboardEvent, command = e.key) => {
        if (won || lost) return;
        $rowClasses[currentRow] = '';
        if (command === 'Enter') {
            const rowToCheck = currentCol === 0 && lettersTyped ? currentRow - 1 : currentRow;
            const currentGuess = $cells[rowToCheck].reduce((prev, curr) => prev + curr.letter, '');
            if (currentGuess.length === word.length && wordInVocab(currentGuess)) {
                handleReveal(currentRow - 1);
            } else if (currentGuess) {
                // TODO: handle word equal currentGuess length
                // word not in vocabulary
                // else not enough letters
                $rowClasses[rowToCheck] = 'move';
                rowClasses.set($rowClasses);
            }
            
            return;
        }

        if (command === 'Backspace') {
            removeLetterFromCell();
            return;
        }

        if (e && e.metaKey) {
            return;
        }

        if ((currentRow === 0 || revealedRows[currentRow - 1]) && !gameOver && command.length === 1 && isCharacterALetter(command)) {
            updateCell(command);
        }
    }
    
    const updateCell = (letter: string) => {
        let cellToUpdate = $cells[currentRow][currentCol];
        cellToUpdate.letter = letter.toLowerCase();
        cellToUpdate.cellClass = 'press';

        cells.update(cells => cells);

        lettersTyped++;
    }

    const removeLetterFromCell = () => {
        const letterTypedBefore = lettersTyped - 1;
        const row = Math.floor(letterTypedBefore / COLS),
            col = letterTypedBefore % COLS;
        if (lettersTyped && !revealedRows[row]) {
            let cellToUpdate = $cells[row][col];
            
            cellToUpdate.letter = '';
            cellToUpdate.cellClass = '';
            
            lettersTyped--;

            cells.update(cells => cells);
        }
    }

    const resetGame = () => {
        word = getRandomWord();
        const newCols = word.length;
        lettersTyped = 0;
        cells.set(createCellState(ROWS, newCols));
        state.set(createKeyboardState());
        revealedRows = createRevealedRows(newCols);
        won = false;
        lost = false;
    }

    /*
    TODO:
    const loadGameFromLocalStorage = () => {
        
    }
    */
</script>

<svelte:window on:keydown={handleKeyDown} />

<h1>WORDLE</h1>
<Grid {won} {lost} rowClasses={$rowClasses} cells={$cells} />
<Keyboard handleCellClick={handleKeys} />
<GameOverModal {resetGame} {won} {lost} />

<style>
    h1 {
        font-size: 54px;
        margin: 40px 0 0 0;
		color: #d7dadc;
	}
</style>