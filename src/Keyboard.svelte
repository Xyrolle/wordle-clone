<script>
    import { state } from './store.js';

    export let handleCellClick;
    let stateKeys = Object.keys($state);
    
    console.log(stateKeys, $state);
</script>



<!-- keyboard
<input /> -->

<div class="keyboard">
    {#each stateKeys as key}
        <div on:click={() => handleCellClick(key)} class={`keyboard-cell ${$state[key]}`}>{key}</div>
    {/each}
</div>

<style>
    .keyboard {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        width: 30%;
    }

    .keyboard-cell {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        background-color: #565758;
        color: #d7dadc;
        margin: 4px 2px 4px 2px;
        font-weight: bold;
        height: 58px;
        width: 40px;
        border-radius: 3px;
        cursor: pointer;
        text-transform: uppercase;
    }

    .correct {
        background-color: #538d4e;
        border: none;
    }

    .in-word {
        background-color: #b59f3b;
        border: none;
    }

    .wrong {
        background-color: #3a3a3c;
        border: none;
    }
</style>