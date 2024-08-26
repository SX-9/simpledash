<script>
    import "../app.css";
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>simpledash</title>
</svelte:head>

<div style={`background-image:url(${data?.bg})`} class="fixed top-0 left-0 w-screen h-screen -z-10 opacity-20 blur-sm bg-cover bg-center bg-no-repeat"></div>

<slot />

<footer class="h-8">
    <p class="text-center"><a href="/reload" target="_blank">reload config</a> | powered by <a href="https://github.com/SX-9/simpledash">simpledash</a></p>
</footer>