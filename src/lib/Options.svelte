<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { celebrities, score, showFilter, timer } from "./stores";
  import { randomInt, stopTimer } from "./utils";

  const dispatch = createEventDispatcher();

  export let name:string;

  let nameArray:Array<string> = [];
  
  // Populates an array with 3 invalid names taken randomly from the celebrities store.
  // The correct name is randomly inserted into the array.
  $: if(name){
    nameArray = [];
    while (nameArray.length < 3) {
      const invalidName = $celebrities[randomInt($celebrities.length)].name;
  
      if (!nameArray.includes(invalidName)) {
        nameArray.push(invalidName);
      }
    }
    nameArray.splice(randomInt(4), 0, name);
  }
  
  let buttonsDisabled = false;

  // Check if selection is correct, disable the filter, move to next photo
  function handleClick(e:any) {
    buttonsDisabled = true;
    if (e.target.innerHTML === name) {
      score.update((n) => n + ((20000 - $timer) / 100));
    }

    stopTimer();
    showFilter.set(false);

    setTimeout(() => {
      showFilter.set(true);
      dispatch('next')
      buttonsDisabled = false;
    }, 1000);
  }

</script>

<div class="wrapper">
  {#each nameArray as name}
    <button disabled={buttonsDisabled} on:click={handleClick}>{name}</button>
  {/each}

</div>

<style>
  .wrapper {
    display: grid;
    width: 100%;
    height: 20%;
    grid-template-columns: 1fr 1fr;
  }

  button {
    margin: 1rem;
    font-size: 1.2em;
    font-weight: 500;
  }

</style>