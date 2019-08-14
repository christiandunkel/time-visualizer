/*
 * ===============
 * === GENERAL ===
 * ===============
 */

let head = _.tag('head')[0];
let body = _.tag('body')[0];





/*
 * ==========
 * === UI ===
 * ==========
 */

let darkmode = false;
let darkmode_toggle = _.id('toggle-darkmode');
_.addClick(darkmode_toggle, function () {
    
    // toggle darkmode value
    darkmode = !darkmode;
    
    // toggle darkmode class according to value
    html.classList[darkmode ? 'add' : 'remove']('darkMode');
    
});