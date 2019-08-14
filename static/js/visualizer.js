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

// load data button
let data_load_btn = _.id('load-data');
let data_load_window = _.id('data-load-window');
_.addClick(data_load_btn, function () {
    _.addClass(data_load_window, 'visible');
});

// close 'data load window' button
let data_load_window_close_btn = _.class('close', data_load_window)[0];
_.addClick(data_load_window_close_btn, function () {
    _.removeClass(data_load_window, 'visible');
});

// close 'data load window' on click on 'blured' background
let data_load_window_blur = _.class('blur', data_load_window)[0];
_.addClick(data_load_window_blur, function () {
    _.removeClass(data_load_window, 'visible');
});

// dark mode button
let darkmode = false;
let darkmode_toggle = _.id('toggle-darkmode');
_.addClick(darkmode_toggle, function () {
    
    // toggle darkmode value
    darkmode = !darkmode;
    
    // toggle darkmode class according to value
    html.classList[darkmode ? 'add' : 'remove']('darkMode');
    
});