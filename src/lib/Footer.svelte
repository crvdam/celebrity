<script lang="ts">
  import { score } from "./stores";
</script>

<div>
  <h2>{$score.toFixed(0)}</h2>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 5%;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
  }

</style>