"use strict";
/*
 * manages the functionality of the navigation buttons
 */
var NAV = {
    
    data_load_btn : null,
    data_load_window : null,
    
    darkmode : false,
    darkmode_btn : null,
    
    play_btn : null,
    pause_btn : null,
    stop_btn : null,
    
    /* GENERAL */
    
    // add events to navigation buttons
    initialize : function () {
        
        // add event to open 'data load' window to 'load data' button
        this.data_load_btn = _.id('load-data');
        _.addClick(this.data_load_btn, DATA_LOAD.open);
        
        // add event for toggling 'dark mode' to button
        this.darkmode_btn = _.id('toggle-darkmode');
        _.addClick(this.darkmode_btn, this.toggle_dark_mode);
        
        // add event to start animation to play button
        this.play_btn = _.id('play-button');
        _.addClick(this.play_btn, ANIMATOR.play);
        
        // add event to pause animation to pause button
        this.pause_btn = _.id('pause-button');
        _.addClick(this.pause_btn, ANIMATOR.pause);
        
        // add event to pause animation to pause button
        this.stop_btn = _.id('stop-button');
        _.addClick(this.stop_btn, ANIMATOR.stop);
        
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
    
    
    
    /* LOAD VISUALIZATION */
    
    // takes a data object and creates the corresponding chart,
    // then gives the animator the right animation values
    visualizeObject : function (obj) {
        
        // objects holding animation data and references to the columns
        let ani = {};
        let columns = {};
        
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
            
            // filter out bad icon values
            let icon = obj.keys[key].icon;
            icon = _.isString(icon) ? icon : null;
            
            // create a column and append it to the chart
            let column = this.getColumn(obj.keys[key].name, icon);
            _.append(this.column_chart, column);
            
            // add column to object holding references to columns
            columns[key] = {
                'meter' : _.class('meter', column)[0],
                'value' : _.class('value', column)[0]
            };
            
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
        ANIMATOR.setColumns(columns);
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
    
    // returns a random color from a pre-defined selection
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
        
        function checkForValidValue(val) {
                
            // check if the value is a number
            if (!_.isNumber(val)) {
                throw 'Error: Value "' + value + '" for key "' + i + '" in JSON must be a number, but is a "' + typeof(value) + '".';
            }
            
        }
        
        let data_points = [];
        
        // go through range and generate a value for each iteration
        for (let i = from; i <= to; i++) {
            
            // check for a value for the iteration in the data
            if (
                _.exists(data[i + ""]) && 
                _.isNumber(data[i + ""])
            ) {
                
                // get the value from the data
                let value = data[i + ""];
                checkForValidValue(value);
                
                // check if the number is really a value
                if (!_.isNumber(value)) {
                    throw 'Error: Value "' + value + '" for key "' + i + '" in JSON must be a number, but is a "' + typeof(value) + '".';
                }
                
                data_points[data_points.length] = value;
                continue;
            }
            
            // if not, set value to 0, if it's the first iteration
            if (i == from) {
                data_points[data_points.length] = 0;
                continue;
            }
            
            // otherwise, calculate the average of prev & next value
            let prev = data_points[data_points.length - 1];
            let next = 0;
            // go through all coming values, to find the next valid one
            for (let j = i + 1; j <= to; j++) {
                if (_.exists(data[j + ""])) {
                    next = data[j + ""];
                    checkForValidValue(next);
                    break;
                }
            }
            // if there's no valid next value, reuse previous value
            let average = next == 0 ? prev : (prev + next) / 2;
            data_points[data_points.length] = average;
            
        }
        
        // increase values by 50x, by adding values for 0.02, 0.04 to 0.98 between values
        let upscaled_data_points = [];
        let len = data_points.length;
        for (let i = 0; i < len; i++) {
            
            // current data point
            let curr = data_points[i];
            
            // put current value into array
            let num = upscaled_data_points.length;
            upscaled_data_points[num] = curr;
            
            // don't generate 50 new values after last data point
            if (i == len - 1) {
                break;
            }
            
            // get next data point and calculate difference
            let next = data_points[i + 1];
            let diff = next - curr;
            let hundreth = diff / 100;
            
            // generate 49 values in between current and next value
            for (let j = 2; j <= 98; j += 2) {
                let new_point = curr + (j * hundreth);
                let len = upscaled_data_points.length;
                upscaled_data_points[len] = new_point;
            }
            
        }
        
        return upscaled_data_points;
        
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
    
    // object holding references to column HTML nodes
    columns : null,
    column_num : 0,
    
    
    
    /* SETTER */
    
    setRange : function (from, to) {
        
        // set range
        this.from = from;
        this.to = to;
        
        // reset 'current' value
        this.current = 0;
        
    },
    
    setTime : function (time) {
        this.time = time;
    },
    
    setData : function (obj) {
        this.data = obj;
        
        // get data point amount (same for every column)
        let first_key = Object.keys(obj)[0];
        this.data_point_num = obj[first_key].length;
    },
    
    setColumns : function (obj) {
        this.columns = obj;
        this.column_num = Object.keys(obj).length;
    },
    
    
    
    /* CONTROLS */
    
    // start playing animation
    play : function () {
        
        let $ = ANIMATOR;
        
        $.is_running = true;
        
        // set classes for use in CSS styles
        _.removeClass(html, 'animation-paused');
        _.addClass(html, 'animation-playing');
        
        // start update loop
        $.loop = setInterval($.update, 40);
        
    },
    
    // pause currently playing animation
    pause : function () {
        
        let $ = ANIMATOR;
        
        $.is_running = false;
        
        // set classes for use in CSS styles
        _.removeClass(html, 'animation-playing');
        _.addClass(html, 'animation-paused');
        
        // stop update loop
        clearInterval($.loop);
        $.loop = null;
        
    },
    
    // triggers the end state, where one can not 'unpause', as it will restart, but the animation is still frozen in last frame 
    end : function () {
        
        let $ = ANIMATOR;
        
        // stop animation
        $.is_running = false;
        $.current = 0;
        
        // set classes for use in CSS styles
        _.removeClass(html, 'animation-playing');
        _.addClass(html, 'animation-paused');
        
        // stop update loop
        clearInterval($.loop);
        $.loop = null;
        
    },
    
    // stops animation and resets it to start state
    stop : function () {
        
        let $ = ANIMATOR;
        
        // end animation
        $.end();
        
        // reset current frame to start state
        $.update();
        
    },
    
    // generate the current animation frame
    update : function () {
        
        let $ = ANIMATOR;
        
        // never run on faulty data object
        if ($.data == null) {
            return;
        }
        
        // reset after one full round
        if ($.current >= $.data_point_num) {
            $.end();
            return;
        }
        
        $.updateTotalChart();
        $.updateIndividualCharts();
        
    },
    
    // update chart containing all data
    updateTotalChart : function () {
        
        let $ = ANIMATOR;
        
        // get min and max value of current frame
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;
        for (let key in $.data) {
            let val = $.data[key][$.current];
            if (val < min) min = val;
            if (val > max) max = val;
        }
        
        // increase diff between min and max, so min column is always at least 20% of total size
        let diff = max - min;
        min -= (diff / 5); // min limit reduced by 20% of difference
        
        // set value and then width of column meter
        for (let key in $.data) {
            
            let curr = $.data[key][$.current];
            $.columns[key].value.innerHTML = curr;
            
            _.setStyles($.columns[key].meter, {
                // (max - min) * x + min = curr
                // --> x = width
                'width' : (((curr - min) / (max - min)) * 100) + "%" 
            });
            
        }
        
        console.log($.current);
        $.current++;
        
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