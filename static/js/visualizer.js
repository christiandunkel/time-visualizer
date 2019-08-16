var NAV = {
    
    data_load_btn : null,
    data_load_window : null,
    
    darkmode : false,
    darkmode_btn : null,
    
    // add events to navigation buttons
    initialize : function () {
        
        // get 'load data' button and window
        this.data_load_btn = _.id('load-data');
        
        // add event for opening the 'data load' window
        _.addClick(this.data_load_btn, DATA_LOAD_WINDOW.open);
        
        // get 'dark mode' button
        this.darkmode_btn = _.id('toggle-darkmode');
        
        // add event for toggling the 'dark mode'
        _.addClick(this.darkmode_btn, this.toggle_dark_mode);
        
    },
    
    toggle_dark_mode : function () {

        // toggle darkmode value
        this.darkmode = !this.darkmode;

        // toggle darkmode class according to value
        html.classList[this.darkmode ? 'add' : 'remove']('darkMode');
        
    }
    
}

var DATA_LOAD_WINDOW = {
    
    window : null,
    close_btn : null,
    blur : null,
    
    initialize : function () {
        
        // get window element
        this.window = _.id('data-load-window');
        
        // get closing cross button inside window
        this.close_btn = _.class('close', this.window)[0];
        
        // get darkened, transparent background area
        this.blur = _.class('blur', this.window)[0];
        
        // add 'close window' events
        _.addClick(this.blur, this.close);
        _.addClick(this.close_btn, this.close);
        
        // initialize the drag'n'drop area for files in the window
        this.initializeDropArea();
        
    },
    
    open : function () {
        _.addClass(DATA_LOAD_WINDOW.window, 'visible');
    },
        
    close : function () {
        _.removeClass(DATA_LOAD_WINDOW.window, 'visible');
    },
    
    drop_area : null,
    select_file_btn : null,
    
    initializeDropArea : function () {
        
        // get area on which user can drop a file
        this.drop_area = _.id('drop-area');
        
        // prevent default browser actions on drag'n'drop
        _.addEvent(this.drop_area, 'dragenter', _.preventDefault);
        _.addEvent(this.drop_area, 'dragover', _.preventDefault);
        _.addEvent(this.drop_area, 'dragleave', _.preventDefault);
        _.addEvent(this.drop_area, 'drop', _.preventDefault);

        // add highlight events, if user dragged file on top of area
        _.addEvent(this.drop_area, 'dragenter', this.highlightDropArea);
        _.addEvent(this.drop_area, 'dragover', this.highlightDropArea);

        // unhighlight area if user's cursor with file left or dropped
        _.addEvent(this.drop_area, 'dragleave', this.unhighlightDropArea);
        _.addEvent(this.drop_area, 'drop', this.unhighlightDropArea);

        // add event to handle files dropped on drop area
        _.addEvent(this.drop_area, 'drop', this.handleDroppedFile);
        
        // add event for 'select file' button
        this.select_file_btn = _.id('selected-file');
        _.addEvent(this.select_file_btn, 'change', this.handleSelectedFile)
        
    },
    
    highlightDropArea : function () {
        _.addClass(DATA_LOAD_WINDOW.drop_area, 'dragged-over');
    },
    
    unhighlightDropArea : function () {
        _.removeClass(DATA_LOAD_WINDOW.drop_area, 'dragged-over');
    },
    
    handleDroppedFile : function (e) {
        
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
            else {
                alert('Please drop a file.');
                return;
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
        
        DATA_LOAD_WINDOW.processFile(file);
        
    },
    
    handleSelectedFile : function (e) {
        
        // get file from event handeler
        let items = this.files;
        let file = items[0];
        
        DATA_LOAD_WINDOW.processFile(file);
        
    },
    
    processFile : function (file) {
        
        // filter out all files besides .json and .txt
        if (!/\.(json|txt)$/.test(file.name)) {
            alert('Only .json and .txt files are allowed.');
            return;
        }

        // warn users loading files bigger than 10KB
        if (file.size > 10000) {
            if (!confirm(
                'This data set is large (' + (file.size/1000) + 'KB) and may freeze your tab momentarily. Do you want to continue?'
            )) {
                return;
            }
        }
        
    }
    
}

var MAIN = {
    
    initialize : function () {
        
        // set globals
        window.head = _.tag('head')[0];
        window.body = _.tag('body')[0];

        // load parts
        NAV.initialize();
        DATA_LOAD_WINDOW.initialize();
        
    }
    
}

// initialize the framework once all HTML content is ready
_.addEvent(window, 'load', MAIN.initialize);