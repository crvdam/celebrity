<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { celebrities, score, timer, showFilter } from "./stores";
  import { randomInt, stopTimer } from "./utils";

  const dispatch = createEventDispatcher();

  export let correctName: string;

  let namesArray: Array<string> = [];

  $: if (correctName) {
    namesArray = [];
    while (namesArray.length < 3) {
      const invalidName = $celebrities[randomInt($celebrities.length)].name;

      if (!namesArray.includes(invalidName)) {
        namesArray.push(invalidName);
      }
    }
    namesArray.splice(randomInt(4), 0, correctName);
  }

  let buttonsDisabled = false;

  function handleClick(e: any) {
    showFilter.set(false);
    buttonsDisabled = true;
    e.target.classList.remove("neutral-button");
    if (e.target.innerHTML === correctName) {
      score.update((n) => n + (20000 - $timer) / 100);
      e.target.classList.add("correct-button");
    } else {
      e.target.classList.add("incorrect-button");
    }

    stopTimer();

    setTimeout(() => {
      e.target.classList.add("neutral-button");
      e.target.classList.remove("incorrect-button");
      e.target.classList.remove("correct-button");
      dispatch("next");
      showFilter.set(true);
      buttonsDisabled = false;
    }, 2000);
  }
</script>

{#each namesArray as name}
  <button
    class="neutral-button"
    disabled={buttonsDisabled}
    on:click={handleClick}>{name}</button
  >
{/each}

<style>
  button {
    font-weight: 600;
    min-height: 4rem;
  }
</style>
