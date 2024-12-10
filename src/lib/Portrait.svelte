<script lang="ts">
  import { showFilter } from "./stores";
  export let path;
</script>

{#key path}
  <img
    class={$showFilter ? "filtered" : "unfiltered"}
    src={`https://image.tmdb.org/t/p/original${path}`}
    alt="Celebrity Portrait"
  />
{/key}

<style>
  .filtered {
    width: 100%;
    object-fit: cover;
    animation: portraitAppear 12s forwards;
  }

  .unfiltered {
    width: 100%;
    object-fit: cover;
    animation: portraitAppear 0.1s forwards;
  }

  @keyframes portraitAppear {
    0% {
      filter: blur(30px);
    }
    100% {
      filter: blur(0);
    }
  }
</style>
