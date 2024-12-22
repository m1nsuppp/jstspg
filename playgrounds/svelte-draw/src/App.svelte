<script lang="ts">
  import Canvas from './lib/Canvas.svelte'
</script>

<main>
  <h1>Svelte Drawing App</h1>
  <Canvas />
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
  }
</style>
