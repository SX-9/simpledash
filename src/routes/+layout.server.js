import { config } from '$lib/server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    return config;
};