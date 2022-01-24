<script>
    import Row from './Row.svelte';
 
    export let cells = [];
    export let rowClasses = [];
    export let won;
    export let lost;
</script>

<div class="grid">
    {#each cells as cellRow, idx}
        <Row rowClass={rowClasses[idx]} cells={cellRow} />
    {/each}
</div>
