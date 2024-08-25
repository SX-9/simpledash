import { delay } from '$lib';
import { config, ping } from '$lib/server';
import { produce } from 'sveltekit-sse';

/** @type {import('./$types').RequestHandler} */
export function POST() {
    return produce(async function start({ emit }) {
        let statuses = [true];
        while (true) {
            statuses = [];

            for (const link of config.links) {
                if (!link.ping) {
                    statuses.push(true);
                    continue;
                }
                try {
                    await ping(link.url);
                    statuses.push(true);
                } catch (error) {
                    statuses.push(false);
                }
            }

            const {error} = emit('status', JSON.stringify(statuses));
            if(error) return;
            await delay(1000);
        }
    })
}
