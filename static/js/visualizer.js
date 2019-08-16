/*
 * manages the functionality of the navigation buttons
 */
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
        _.addClick(this.data_load_btn, DATA_LOAD.open);
        
        // get 'dark mode' button
        this.darkmode_btn = _.id('toggle-darkmode');
        
        // add event for toggling the 'dark mode'
        _.addClick(this.darkmode_btn, this.toggle_dark_mode);
        
    },
    
    
    
    /* DARKMODE */
    
    // toggle the website's theme between light and dark
    toggle_dark_mode : function () {

        // toggle darkmode value
        this.darkmode = !this.darkmode;

        // toggle darkmode class according to value
        html.classList[this.darkmode ? 'add' : 'remove']('darkMode');
        
    }
    
}

/*
 * manages loading JSON data from files over the 'data load window'
 */
var DATA_LOAD = {
    
    window : null,
    close_btn : null,
    blur : null,
    
    drop_area : null,
    select_file_input : null,
    
    file_reader_notice : null,
    
    // elements of data set info header
    data_set_info : {
        title : null,
        version : null,
        date : null
    },
    column_chart : null,
    
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
        
        // get elements of data set info header
        let context = _.id('data-set-info');
        this.data_set_info.title = _.class('title', context)[0];
        this.data_set_info.version = _.class('version', context)[0];
        this.data_set_info.date = _.class('date', context)[0];
        
        // get container for column chart
        this.column_chart = _.id('column-chart');
        
    },
    
    // open the 'data load' window
    open : function () {
        
        // open window
        _.addClass(DATA_LOAD.window, 'visible');
        
        // with a little delay, set tab focus on close button
        // if set immediately, will be ignored or buggy
        setTimeout(function () {
            DATA_LOAD.close_btn.focus();
        }, 100);
        
    },
    
    // close the 'data load' window
    close : function () {
        
        // close window
        _.removeClass(DATA_LOAD.window, 'visible');
        
        // close 'file selected' message inside window
        _.removeClass(DATA_LOAD.window, 'file-selected');
        
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
    
    // add 'highlight' effect to drop area
    highlightDropArea : function () {
        _.addClass(DATA_LOAD.drop_area, 'dragged-over');
    },
    
    // remove 'highlight' from drop area
    unhighlightDropArea : function () {
        _.removeClass(DATA_LOAD.drop_area, 'dragged-over');
    },
    
    
    
    /* FILE HANDLING */
    
    // gets a file from the drop area and sends it to processFile()
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
        
        DATA_LOAD.processFile(file);
        
    },
    
    // gets a file from HTML <input> and sends it to processFile()
    handleSelectedFile : function (e) {
        
        // get file from event handeler
        let items = this.files;
        let file = items[0];
        
        DATA_LOAD.processFile(file);
        
    },
    
    // reads a given file, and converts it from JSON to an object,
    // then sends the object to visualizeObject()
    processFile : function (file) {
        
        // warn user if FileReader API is not supported
        if (typeof(window.FileReader) !== 'function') {
            alert('The FileReader API is not supported by your browser. Please update your browser or switch to a different one!');
            return;
        }
        
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
        reader.readAsText(file, 'UTF-8');

        // on error, warn user
        reader.onerror = function (e) {
            alert('File could not be read.');
        }

        // otherwise, proceed on converting file content to object
        reader.onload = function (e) {
            
            // generate an object from JSON string
            let obj = _.parseJSON(_.target(e).result);
            
            if (!obj) {
                alert('Could not parse the file as it is not in a valid JSON format.\nCheck your browser console for more information.');
                return;
            }
            
            // visualize the object
            DATA_LOAD.visualizeObject(obj);
            
        }
        
    },
    
    // takes a data object and creates the corresponding chart,
    // then gives the animator the right animation values
    visualizeObject : function (obj) {
        
        // object holding animation data
        let ani = {};
        
        // load information into data set header
        this.data_set_info.title.innerHTML = obj.name;
        this.data_set_info.version.innerHTML = obj.version;
        this.data_set_info.date.innerHTML = obj.date;
        
        // empty chart of current columns
        _.empty(this.column_chart);
        
        // load data columns in chart
        for (let key in obj.data) {
           
            if (!obj.data.hasOwnProperty(key)) {
                return;
            }
            
            // create a column and append it to the chart
            let icon = obj.keys[key].icon;
            icon = (icon == '' || 
                    icon == null || 
                    icon == undefined) 
                    ? null : icon;
            let column = this.getColumn(obj.keys[key].name, icon);
            _.append(this.column_chart, column);
            
            // add key data to animation object
            ani[key] = this.generateDataPointArray(
                obj.data[key], 
                obj.range.from, 
                obj.range.to
            );
            
        }
            
        // stop animator and set new values
        ANIMATOR.setRange(obj.range.from, obj.range.to);
        ANIMATOR.setData(ani);
        ANIMATOR.stop();
            
        // display 'file loaded' animation
        _.addClass(DATA_LOAD.window, 'file-selected');
        
    },
    
    // generates DOM node for a column in the chart
    getColumn : function (key_name, icon_url) {
        
        // containing element
        let container = _.create('button.column-container', {
            'title' : 'Open statistics for ' + key_name
        });
        
        // graphic / icon in front
        let icon = _.create('div.icon', {
            'style' : {
                'background' : icon_url == null ? 
                    '#828282' : 'url(' + icon_url + ')'
            }
        });
        
        // column with values
        let column = _.create('div.column');
        let meter = _.create('div.meter', {
            'style' : {
                'background' : this.getRandomColor()
            }
        });
        let name = _.create('div.name', {
            'innerHTML' : key_name
        });
        let value = _.create('div.value');
        
        // append elements to container
        _.append(meter, name);
        _.append(meter, value);
        _.append(column, meter);
        _.append(container, icon);
        _.append(container, column);
        
        return container;
        
    },
    
    getRandomColor : function () {
      
        let colors = [
            '#00d6d6', // aqua
            '#0000ff', // blue
            '#a52a2a', // brown
            '#00008b', // darkblue
            '#008b8b', // darkcyan
            '#cbab01', // darkgold
            '#585858', // darkgrey
            '#006400', // darkgreen
            '#a09a4d', // darkhaki
            '#8b008b', // darkmagenta
            '#556b2f', // darkolivegreen
            '#a2651b', // darkorange
            '#9932cc', // darkorchid
            '#8b0000', // darkred
            '#bf775f', // darksalmon
            '#9400d3', // darkviolet
            '#008000', // green
            '#4b0082', // indigo
            '#5ebf5e', // lightgreen
            '#800000', // maroon
            '#808000', // olive
            '#800080' // purple
        ];
        
        
        // return a random color from the array
        return colors[Math.floor(Math.random() * colors.length)];
        
    },
    
    // generates an array of data values from given data object
    generateDataPointArray : function (data, from, to) {
        
        // TODO
        
        return [];
        
    }
    
}

/*
 * manages the animation of the charts
 */
var ANIMATOR = {
    
    is_running : false,
    time : 1,
    
    from : 0,
    to : 0,
    current : 0,
    
    // holds update loop interval
    loop : null,
    
    // object holding the animation data
    data : null,
    
    
    
    /* SETTER */
    
    setRange : function (from, to) {
        // set range
        this.from = from;
        this.to = to;
        // reset 'current' value
        this.current = from;
    },
    
    setTime : function (time) {
        this.time = time;
    },
    
    setData : function (obj) {
        this.data = obj;
    },
    
    
    
    /* CONTROLS */
    
    // start playing animation
    play : function () {
        
        this.is_running = true;
        
        // set classes for use in CSS styles
        _.removeClass(html, 'animation-paused');
        _.addClass(html, 'animation-playing');
        
        // start update loop
        this.loop = setInterval(this.update, 100);
        
    },
    
    // pause currently playing animation
    pause : function () {
        
        this.is_running = false;
        
        // set classes for use in CSS styles
        _.removeClass(html, 'animation-playing');
        _.addClass(html, 'animation-paused');
        
        // stop update loop
        clearInterval(this.loop);
        this.loop = null;
        
    },
    
    // stop and reset current animation
    stop : function () {
        
        // stop animation
        this.is_running = false;
        this.current = this.from;
        
        // set classes for use in CSS styles
        _.removeClass(html, 'animation-playing');
        _.addClass(html, 'animation-paused');
        
        // stop update loop
        clearInterval(this.loop);
        this.loop = null;
        
        // reset current frame to start state
        this.update();
        
    },
    
    // generate the current animation frame
    update : function () {
        
        if (this.data == null) {
            return;
        }
        
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

/*
 * main method, called on page load
 */
var MAIN = {
    
    initialize : function () {
        
        // set globals
        window.head = _.tag('head')[0];
        window.body = _.tag('body')[0];

        // load parts
        NAV.initialize();
        DATA_LOAD.initialize();
        
    }
    
}

// initialize the framework once all HTML content is ready
_.addEvent(window, 'load', MAIN.initialize);