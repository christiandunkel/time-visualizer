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

// dark mode button
let darkmode = false;
let darkmode_toggle = _.id('toggle-darkmode');
_.addClick(darkmode_toggle, function () {
    
    // toggle darkmode value
    darkmode = !darkmode;
    
    // toggle darkmode class according to value
    html.classList[darkmode ? 'add' : 'remove']('darkMode');
    
});





/*
 * ========================
 * === DATA LOAD WINDOW ===
 * ========================
 */

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

/* drag and drop effect in 'data load window' */

let drop_area = _.id('drop-area');
_.addEvent(drop_area, 'dragenter', _.preventDefault);
_.addEvent(drop_area, 'dragover', _.preventDefault);
_.addEvent(drop_area, 'dragleave', _.preventDefault);
_.addEvent(drop_area, 'drop', _.preventDefault);

function draggedOverHighlight() {
    _.addClass(drop_area, 'dragged-over');
}
_.addEvent(drop_area, 'dragenter', draggedOverHighlight);
_.addEvent(drop_area, 'dragover', draggedOverHighlight);

function draggedOverUnhighlight() {
    _.removeClass(drop_area, 'dragged-over');
}
_.addEvent(drop_area, 'dragleave', draggedOverUnhighlight);
_.addEvent(drop_area, 'drop', draggedOverUnhighlight);

function handleDroppedFile(e) {
    
    _.preventDefault(e);
    
    let file = null;
    
    if (e.dataTransfer.items) {
        
        let items = e.dataTransfer.items;
    
        if (items.length > 1) {
            alert('Dropping multiple files is forbidden.');
            return;
        }
        
        if (items[0].kind === 'file') {
            file = items[0].getAsFile();
        }
        
    }
    else {
        
        let items = e.dataTransfer.files;
    
        if (items.length > 1) {
            alert('Dropping multiple files is forbidden.');
            return;
        }
        
        let file = items[0];
        
    }
        
    if (file.size > 10000) {
        if (!confirm('This data set is large (' + (file.size/1000) + 'KB) and may freeze your tab momentarily. Do you want to continue?')) {
            return;
        }
    }
    
    load_data_set(file);
    
}

_.addEvent(drop_area, 'drop', handleDroppedFile);

/* load data set into memory */

function load_data_set(file) {
    
}