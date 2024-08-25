<script>
    import "../app.css";
</script>

<svelte:head>
    <title>simpledash</title>
</svelte:head>

<slot />

<footer class="h-8">
    <p class="text-center"><a href="/reload" target="_blank">reload config</a> | powered by <a href="https://github.com/SX-9/simpledash">simpledash</a></p>
</footer>