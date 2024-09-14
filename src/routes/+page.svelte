<script>
    import { confirmOpen, urlString } from '$lib';
    import { source } from 'sveltekit-sse';
    
    /** @type {import('./$types').PageData} */
    export let data;
    /** @type {import('svelte/store').Readable<boolean[]>} */
    const statuses = source('/healthcheck').select('status').json();
    let search = '';
</script>

<div class="lg:px-40 md:px-20 px-4 w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center mt-6 text-center">
    <div class="w-full">
        <h1>{data?.title || ''}</h1>
        <p>{data?.subtitle || ''}</p>
        {#if data?.engine}
            <form on:submit={() => {
                if (data?.newtab) window.open(data.engine + search);
                else window.location.href = data.engine + search;
                search = '';
            }} class="mt-2 w-full">
                <!-- svelte-ignore a11y-autofocus -->
                <input type="search" bind:value={search} placeholder="Web Search..." autofocus />
            </form>
        {/if}
    </div>
    <div class="w-full">
        <div class="flex flex-wrap justify-center items-center my-2 gap-2 w-full">
            {#each data.links as link, i}
                <button on:click={(e) => confirmOpen(e, urlString(link.url), $statuses?.[i], data?.newtab)} class:offline={!$statuses?.[i] && link?.ping} class:online={$statuses?.[i] && link?.ping} class="group bg-ctp-base p-4 m-1 w-full sm:w-[45%] lg:w-[31%] xl:w-1/5 2xl:w-1/6 flex items-center min-h-12 h-fit gap-2 outline-ctp-surface0 outline-2 outline hover">
                    <div class="flex-1 flex flex-col justify-center items-start group-hover:hidden">
                        <h2>{link.name}</h2>
                        <span>{link.desc}</span>
                    </div>
                    <div class="flex-1 hidden flex-col justify-center items-start group-hover:flex">
                        <h2>{link.url.host}{[80,443].includes(link.url.port) ? '' : `:${link.url.port}`}</h2>
                        <span>{
                            !link?.ping ? 'external link' : `service ${($statuses?.[i] ? 'online' : 'offline')}`
                        }</span>
                    </div>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-8 outline-ctp-surface0 outline-2 outline-double text-ctp-sapphire rounded-full " class:offline={!$statuses?.[i] && link?.ping} class:online={$statuses?.[i] && link?.ping} transform={`rotate(${!link?.ping ? '90' : (!$statuses?.[i] ? '180' : '0')})`} viewBox="0 0 24 24"><path fill="currentColor" d="m7 14l5-5l5 5z"/></svg> -->
                    <div class="w-1 h-8 rounded-full bg-ctp-sapphire group-hover:hidden" class:offline={!$statuses?.[i] && link?.ping} class:online={$statuses?.[i] && link?.ping}></div>
                </button>
            {/each}
        </div>
    </div>
</div>
