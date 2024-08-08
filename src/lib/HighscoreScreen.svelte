<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { score } from "./stores";

  const dispatch = createEventDispatcher();

  const highscore = Number(localStorage.getItem("highscore"));

  if ($score > highscore) {
    localStorage.setItem("highscore", $score.toString())
  }

</script>

<div class="highscore-screen">
  <h1>Your score: {$score.toFixed(0)}</h1>
  <button on:click={() => dispatch('back')}>Back</button>
  {#if $score > highscore}
    <h2>New highscore!</h2>
  {:else}
    <h2>Highscore: {highscore.toFixed(0)}</h2>
  {/if}
  
</div>

<style>
   div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40%;
  }

  button {
    width: 100%;
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
    margin-top: 2rem;
  }
</style>