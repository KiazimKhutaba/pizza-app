/**
 * Query DOM element        
 * 
 * @param {string} selector
 * @param {boolean} all if true returns all elements, overwise single element
 */
export function el(selector, all = false) 
{
    if( selector.startsWith('#') ) {
        return document.querySelector(selector);
    }

    if( all ) {
        return document.querySelectorAll(selector);
    }

    return document.querySelectorAll(selector)[0];
}

export const log = console.log;


/**
 * 
 * @param {number} timestamp
 */
export function format_date(timestamp) {
    let dt = new Date(timestamp);
    return dt.toUTCString();
}