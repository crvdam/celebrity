<script lang="ts">
  import { onMount } from "svelte";
  import Portrait from "./lib/Portrait.svelte";
  import PortraitFilter from "./lib/PortraitFilter.svelte";
  import Options from "./lib/Options.svelte";
  import Footer from "./lib/Footer.svelte";
  import StartScreen from "./lib/StartScreen.svelte";
  import HighscoreScreen from "./lib/HighscoreScreen.svelte";
  import { fetchCelebrities, randomInt, startTimer, stopTimer } from "./lib/utils";
  import { celebrities, score, showFilter, timer } from "./lib/stores";

  let pageNumber = 1;

  onMount(() => {
    // API GET request for 20 celebrities
    fetchCelebrities(pageNumber);
  });

  let highscoreScreen = false;
  let startGame = false;
  let numberOfItems = 10;
  let celebrity:any;
 
  // This is called when an option is selected or the timer runs out.
  function nextItem() {
      stopTimer();
      timer.set(0)

    if (numberOfItems < 1) {
      // Game ends, fetch the next 20 celebrities
      pageNumber++;
      fetchCelebrities(pageNumber);

      startGame = false;
      highscoreScreen = true;
      numberOfItems = 10;

    } else {
      // Get a random celebrity from the store and remove that celebrity from store.
      celebrity = $celebrities.splice(randomInt($celebrities.length), 1);
      celebrity = new Object(...celebrity)

      numberOfItems--;
      startTimer();    
    }
  }

  function handleStartGame() {
    score.set(0);
    nextItem();
    startGame = true;
  }

  $: if($timer > 20000) {
    nextItem();
  }

</script>

<main>
  {#if startGame}
    <div class="container-portrait">
      <Portrait path={celebrity.profile_path}/>
      {#if $showFilter}
        <PortraitFilter />
      {/if}
    </div>
    <Options name={celebrity.name} on:next={nextItem}/>
    <Footer />
  {:else if highscoreScreen}
    <HighscoreScreen on:back={() => highscoreScreen = false} />
  {:else}
    <StartScreen on:start={handleStartGame}/>
  {/if}
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }

  .container-portrait {
    width: 100%;
    height: 75%;
    position: relative;
  }

  @media screen and (min-width: 600px) {
    main {
      width: 600px;
    }
  }

</style>
