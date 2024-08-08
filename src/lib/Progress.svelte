<script lang="ts">
  import { timer } from "./stores";
</script>

<div style="width: {(20000 - $timer) / 20000 * 100}%"></div>

<style>
  div {
    left: 0;
    transform: translateY(-5px);
    position: absolute;
    width: 100%;
    height: 5px;
    background-color: var(--clr-secondary);
  }
</style>