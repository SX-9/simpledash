import { reloadConfig } from '$lib/server';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    reloadConfig();
    return new Response("Config reloaded. You may now close this page.", { status: 200 });
};