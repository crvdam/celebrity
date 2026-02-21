<script lang="ts">
  import { onMount } from "svelte";
  import Portrait from "./lib/Portrait.svelte";
  import Options from "./lib/Options.svelte";
  import CurrentScore from "./lib/CurrentScore.svelte";
  import StartScreen from "./lib/StartScreen.svelte";
  import EndScreen from "./lib/EndScreen.svelte";
  import {
    fetchCelebrities,
    randomInt,
    startTimer,
    stopTimer,
  } from "./lib/utils";
  import { celebrities, score, timer } from "./lib/stores";
  import ProgressBar from "./lib/ProgressBar.svelte";

  let pageNumber = 1;

  onMount(() => {
    fetchCelebrities(pageNumber);
  });

  let highscoreScreen = false;
  let startGame = false;
  let numberOfPortraits = 10;
  let randomCelebrity: any;

  function nextFace() {
    stopTimer();
    timer.set(0);

    if (numberOfPortraits < 1) {
      pageNumber++;
      fetchCelebrities(pageNumber);

      startGame = false;
      highscoreScreen = true;
      numberOfPortraits = 10;
    } else {
      randomCelebrity = $celebrities.splice(randomInt($celebrities.length), 1);
      randomCelebrity = new Object(...randomCelebrity);

      numberOfPortraits--;
      startTimer();
    }
  }

  function handleStartGame() {
    score.set(0);
    nextFace();
    startGame = true;
  }

  $: if ($timer > 10000) {
    nextFace();
  }
</script>

<main>
  {#if startGame}
    <div class="main__portrait">
      <Portrait path={randomCelebrity.profile_path} />
    </div>

    <ProgressBar />

    <div class="main__options">
      <Options correctName={randomCelebrity.name} on:next={nextFace} />
    </div>

    <div class="main__score">
      <CurrentScore />
    </div>
  {:else if highscoreScreen}
    <EndScreen on:back={() => (highscoreScreen = false)} />
  {:else}
    <StartScreen on:start={handleStartGame} />
  {/if}
</main>

<style>
  main {
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: center;
    width: 320px;
    padding-top: 4rem;
  }

  .main__options {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .main__score {
    margin-top: 2rem;
  }

  .main__portrait {
    height: 480px;
  }
</style>
