<script lang="ts">
  import Progress from "./Progress.svelte";
  export let path;
</script>

{#key path}
  <img 
  src={`https://image.tmdb.org/t/p/original${path}`} 
  alt="Celebrity Portrait">
{/key}
  <Progress />

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: fade 1s ease-out;
  }

  @keyframes fade {
    0% {
      opacity: 0.1;
    } 
    100% {
      opacity: 1
    }
  }
</style>