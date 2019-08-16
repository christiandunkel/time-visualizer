var NAV = {
    
    data_load_btn : null,
    data_load_window : null,
    
    darkmode : false,
    darkmode_btn : null,
    
    /* GENERAL */
    
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
    
    
    
    /* DARKMODE */
    
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
    
    drop_area : null,
    select_file_input : null,
    
    file_reader_notice : null,
    
    /* GENERAL */
    
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
        
        // open window
        _.addClass(DATA_LOAD_WINDOW.window, 'visible');
        
        // with a little delay, set tab focus on close button
        // if set immediately, will be ignored or buggy
        setTimeout(function () {
            DATA_LOAD_WINDOW.close_btn.focus();
        }, 100);
        
    },
        
    close : function () {
        
        // close window
        _.removeClass(DATA_LOAD_WINDOW.window, 'visible');
        
        // close 'file selected' message inside window
        _.removeClass(DATA_LOAD_WINDOW.window, 'file-selected');
        
        // reset tab focus back to 'data load' button in navigation
        NAV.data_load_btn.focus();
        
    },
    
    
    
    /* FILE DROP AREA */
    
    initializeDropArea : function () {
        
        // warn user if FileReader API is not supported
        if (typeof(window.FileReader) !== 'function') {
            
            // get warning notice
            this.file_reader_notice = _.id('file-reader-notice');
            
            // make it visible
            _.addClass(this.file_reader_notice, 'show');
            
        }
        
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
        this.select_file_input = _.id('selected-file');
        _.addEvent(this.select_file_input, 'change', this.handleSelectedFile)
        
    },
    
    highlightDropArea : function () {
        _.addClass(DATA_LOAD_WINDOW.drop_area, 'dragged-over');
    },
    
    unhighlightDropArea : function () {
        _.removeClass(DATA_LOAD_WINDOW.drop_area, 'dragged-over');
    },
    
    
    
    /* FILE HANDLING */
    
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
        
        // warn user if FileReader API is not supported
        if (typeof(window.FileReader) !== 'function') {
            alert('The FileReader API is not supported by your browser. Please update your browser or switch to a different one!');
            return;
        }
        
        // get file from event handeler
        let items = this.files;
        let file = items[0];
        
        DATA_LOAD_WINDOW.processFile(file);
        
    },
    
    processFile : function (file) {
        
        if (!file) {
            console.error('File is not defined.');
            return;
        }
        
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
        
        // read file
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        // on error, warn user
        reader.onerror = function (e) {
            alert('File could not be read.');
        }

        // otherwise, proceed on converting file content to object
        reader.onload = function (e) {
            
            let JSON = _.parseJSON(_.target(e).result);
            
            if (!JSON) {
                alert('Could not parse the file as it is not in a valid JSON format. Check your browser console for more information.');
                return;
            }
            
            ANIMATOR.stop();
            
            _.addClass(DATA_LOAD_WINDOW.window, 'file-selected');
            
            console.log(JSON);
            
        }
        
    }
    
}

var ANIMATOR = {
    
    is_running : false,
    time : 1,
    
    from : 0,
    to : 0,
    current : 0,
    
    // start playing animation
    play : function () {
        this.is_running = true;
    },
    
    // pause currently playing animation
    pause : function () {
        this.is_running = false;
    },
    
    // stop and reset current animation
    stop : function () {
        this.is_running = false;
        this.current = this.from;
    },
    
    // generate the current animation frame
    update : function () {
        this.updateTotalChart();
        this.updateIndividualCharts();
    },
    
    // update chart containing all data
    updateTotalChart : function () {
        
    },
    
    // update the invidual chart of every key
    updateIndividualCharts : function () {
        
    }
    
}

var MAIN = {
    
    /* GENERAL */
    
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