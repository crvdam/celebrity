<div class="container-filter">
  {#each Array(64) as _}
    <div class="grid-item"></div>
  {/each}
</div>

<style>
  .container-filter {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
  }

  .grid-item { 
    backdrop-filter: blur(25px);
    transition: 5s ease-out;
  }

  .grid-item:hover {
    backdrop-filter: none;
    transition: 0.2s;
  }
</style>