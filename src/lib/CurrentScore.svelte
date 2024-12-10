<script lang="ts">
  import { score } from "./stores";
</script>

<h2>{$score.toFixed(0)}</h2>

<style>
  h2 {
    font-size: 2rem;
    font-weight: 700;
  }
</style>
