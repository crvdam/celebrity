<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div>
  <h1>Celebrity Guesser</h1>
  <button on:click={() => dispatch("start")}>Start Game</button>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    margin-top: 40%;
  }

  h1 {
    font-size: 3rem;
  }
</style>