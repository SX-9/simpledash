/**
 * @param {Object} url
 * @param {string} url.prot
 * @param {string} url.host
 * @param {number} url.port
 * @param {string} url.path
 * @returns {string}
 */
export function urlString(url) {
    return `${url.prot || 'http'}://${url.host || 'localhost'}:${url.port || 80}${url.path || '/'}`;
}

/**
 * @param {Event} e
 * @param {string} url
 * @param {boolean} online
 */
export function confirmOpen(e, url, online = true) {
    if (online) window.open(url, '_blank');
    else if (confirm('URL Offline, Continue?')) window.open(url, '_blank');
}

/**
 * @param {number} milliseconds
 * @returns
 */
export function delay(milliseconds) {
    return new Promise(function run(resolve) {
      setTimeout(resolve, milliseconds)
    })
}