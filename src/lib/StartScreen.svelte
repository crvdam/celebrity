<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div>
  <h1>Celebrity Guesser</h1>
  <button class="neutral-button" on:click={() => dispatch("start")}
    >Start Game</button
  >
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 20rem;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
  }
</style>
