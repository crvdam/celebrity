<script lang="ts">
  import { timer } from "./stores";
</script>

<div style="width: {((10000 - $timer) / 10000) * 100}%"></div>

<style>
  div {
    height: 5px;
    background-color: var(--clr-secondary);
  }
</style>
