<script>
	import Game from './Game.svelte';
</script>

<Game />

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		background-color: #121213;
		height: 100%;
		width: 100%;
	}
</style>