<script lang="ts">
	import Cell from './Cell.svelte';
	
    export let cells = [];
	export let rowClass = '';
</script>

<div class={`row ${rowClass}`}>
    {#each cells as cell}
	    <Cell letter={cell.letter} cellClass={cell.cellClass} state={cell.state} /> 
    {/each}
</div>

<style>
	.row {
		display: flex;
	}

	.move {
		animation-name: move;
		animation-duration: 500ms;
		transition-timing-function: ease-in-out;
	}

	@keyframes move {
        from {
            transform: translate(0);
        }
        20% {
			transform: translate(-20px);
        }
		40% {
			transform: translate(20px);
		}
		60% {
			transform: translate(-20px);
		}
		80% {
			transform: translate(20px);
		}
        to {
			transform: translate(0);
        }
    }
</style>