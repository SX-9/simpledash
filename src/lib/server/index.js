import fs from 'node:fs';
import { env } from '$env/dynamic/private';
import { dev, building } from '$app/environment';
import { ping as tcpPing } from 'tcp-ping';

/**
 * @typedef {Object} URL
 * @property {string} prot
 * @property {string} host
 * @property {number} port
 * @property {string} path
 */

/**
 * @typedef {Object} Link
 * @property {string} name
 * @property {string} desc
 * @property {boolean} ping
 * @property {URL} url
 */

/**
 * @property {string} title
 * @property {string} subtitle
 * @property {string} engine
 * @property {Link[]} links
 */
export let config = JSON.parse(fs.readFileSync(!dev ? (env.CONFIG_PATH || '/etc/simpledash.json') : (building ? './config.example.json' : './config.json'), 'utf8'));

/**
 * Reloads the config variable with the new file contents.
 */
export function reloadConfig() {
    config = JSON.parse(fs.readFileSync(!dev ? (env.CONFIG_PATH || '/etc/simpledash.json') : './config.json', 'utf8'));
}

/**
 * @param {URL} url
 * @returns {Promise<import('tcp-ping').Result>}
 */
export function ping(url) {
    let firstRun = true;
    return new Promise(function(resolve, reject) {
        tcpPing({
            address: url.host,
            port: url.port,
            attempts: 1,
            timeout: firstRun ? 500 : 2500,
        }, function(err, data) {
            firstRun = false;
            if (err) {
                reject(err);
            } else {
                if (isNaN(data.avg)) {
                    reject(data);
                }
                resolve(data);
            }
        });
    });
}
