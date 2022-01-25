<script>
	export let letter = '';
    export let cellClass = '';
    export let state;
</script>

<div class={`cell ${state} ${cellClass}`} class:withLetter={letter}>
	{letter}
</div>

<style>
	.cell {
        font-size: 32px;
        font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid #3a3a3c;
		height: 60px;
		width: 60px;
        margin: 2px;
        text-transform: uppercase;
	}

    .press {
        animation-duration: 100ms;
        animation-name: press;
        animation-timing-function: ease-out;
    }

    .withLetter {
        border: 2px solid #565758;
        color: #d7dadc;
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

    @keyframes press {
        from {
            opacity: 0.5;
            transform: scale(0.95);
        }
        50% {
            opacity: 0.85;
            transform: scale(1.1);
        } 
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>