<script>
    import { confirmOpen, urlString } from '$lib';
    import { source } from 'sveltekit-sse';

    /** @type {import('./$types').PageData} */
    export let data;
    /** @type {import('svelte/store').Readable<boolean[]>} */
    const statuses = source('/healthcheck').select('status').json();
    let search = '';
</script>

<div class="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center mt-8 text-center">
    <h1>{data?.title || ''}</h1>
    <p>{data?.subtitle || ''}</p>
    <div class="lg:w-[calc(100vw-10rem)] md:w-[calc(100vw-15rem)] w-[calc(100vw-2rem)] my-4">
        {#if data?.engine}
            <form on:submit={() => {
                if (data?.newtab) window.open(data.engine + search);
                else window.location.href = data.engine + search;
                search = '';
            }}>
                <!-- svelte-ignore a11y-autofocus -->
                <input type="search" bind:value={search} placeholder="Web Search..." autofocus />
            </form>
        {/if}
        <div class="flex flex-wrap justify-center items-center my-2 gap-2 w-full">
            {#each data.links as link, i}
                <button on:click={(e) => confirmOpen(e, urlString(link.url), $statuses?.[i])} class="bg-ctp-base p-4 m-1 w-full sm:w-[45%] lg:w-[31%] xl:w-1/5 2xl:w-1/6 flex items-center min-h-12 h-fit gap-2 outline-ctp-surface0 outline-2 outline-double">
                    <div class="flex-1 flex flex-col justify-center items-start">
                        <h2>{link.name}</h2>
                        <span class="text-md">{link.desc}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 outline-ctp-surface0 outline-2 outline-double text-ctp-sapphire rounded-full" class:offline={!$statuses?.[i] && link?.ping} class:online={$statuses?.[i] && link?.ping} transform={`rotate(${!link?.ping ? '90' : (!$statuses?.[i] ? '180' : '0')})`} viewBox="0 0 24 24"><path fill="currentColor" d="m7 14l5-5l5 5z"/></svg>
                </button>
            {/each}
        </div>
    </div>
</div>
