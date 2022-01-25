<script>
    import { fade, fly } from 'svelte/transition';

    import { clickOutside } from '../actions/click_outside';

    export let won;
    export let lost;
    export let resetGame;
</script>

{#if (won || lost)}
    <div class="game-over-modal" transition:fade>
    <div class="modal-content" use:clickOutside on:outclick={() => resetGame()} transition:fly={{ y: 400, duration: 800 }}>
        game over you {won ? 'won' : 'lost'}
    </div>
    </div>
{/if}

<style>
    .game-over-modal {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        background-color: #121213;
        border: 1px solid #1a1a1b;
        color: #d7dadc;
        min-height: 440px;
        min-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
    }
</style>