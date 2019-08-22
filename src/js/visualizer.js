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
    
    time_btn : {
        slow : null,
        normal : null,
        fast : null,
    },
    
    individual_chart_opened : false,
    
    
    
    /* GENERAL */
    
    // add events to navigation buttons
    initialize : function () {
        
        // add event to open 'data load' window to 'load data' button
        this.data_load_btn = _.id('load-data');
        _.addClick(this.data_load_btn, DATA_LOAD.open);
        
        // add event for toggling 'dark mode' to button
        this.darkmode_btn = _.id('toggle-darkmode');
        _.addClick(this.darkmode_btn, this.toggleDarkMode);
        
        // add event to start animation to play button
        this.play_btn = _.id('play-button');
        _.addClick(this.play_btn, ANIMATOR.play);
        
        // add event to pause animation to pause button
        this.pause_btn = _.id('pause-button');
        _.addClick(this.pause_btn, ANIMATOR.pause);
        
        // add event to pause animation to pause button
        this.stop_btn = _.id('stop-button');
        _.addClick(this.stop_btn, ANIMATOR.stop);
        
        // add events to time change buttons
        this.time_btn.slow = _.id('animation-speed-0-5');
        _.addClick(this.time_btn.slow, NAV.setHalvedTime);
        this.time_btn.normal = _.id('animation-speed-1-0');
        _.addClick(this.time_btn.normal, NAV.setNormalTime);
        this.time_btn.fast = _.id('animation-speed-2-0');
        _.addClick(this.time_btn.fast, NAV.setDoubledTime);
        
    },
    
    // set a button active
    setActive : function (btn) {
        _.addClass(btn, 'active');
    },
    
    // set a button inactive
    setInactive : function (btn) {
        _.removeClass(btn, 'active');
    },
    
    // set a button active, and all others inactive
    setExclusiveActive : function (btn) {
        let btns = this.time_btn;
        for (let key in btns) {
            if (btns[key] === btn) {
                this.setActive(btns[key]);
            }
            else {
                this.setInactive(btns[key]);
            }
        }
    },
    
    // toggle the currently opened chart
    toggleChart : function () {
        
        // if individual chart is opened, close it
        if (NAV.individual_chart_opened) {
            NAV.showColumnChart();
        }
        // otherwise, open it
        else {
            NAV.showIndividualChart();
        }
        
    },
    
    showColumnChart : function () {
        NAV.individual_chart_opened = false;
        _.addClass(DATA_LOAD.column_chart, 'active');
        _.removeClass(DATA_LOAD.individual_chart, 'active');
        ANIMATOR.refreshFrame();
    },
    
    showIndividualChart : function () {
        NAV.individual_chart_opened = true;
        _.removeClass(DATA_LOAD.column_chart, 'active');
        _.addClass(DATA_LOAD.individual_chart, 'active');
        ANIMATOR.refreshFrame();
    },
    
    
    
    /* DARKMODE */
    
    // toggle the website's theme between light and dark
    toggleDarkMode : function () {

        // toggle darkmode value
        this.darkmode = !this.darkmode;

        // toggle darkmode class according to value
        _[(this.darkmode ? 'add' : 'remove') + 'Class'](html, 'darkMode');
        
    },
    
    
    
    /* TIME */
    
    setHalvedTime : function () {
        NAV.setExclusiveActive(NAV.time_btn.slow);
        ANIMATOR.setTime(0.5);
    },
    
    setNormalTime : function () {
        NAV.setExclusiveActive(NAV.time_btn.normal);
        ANIMATOR.setTime(1.0);
    },
    
    setDoubledTime : function () {
        NAV.setExclusiveActive(NAV.time_btn.fast);
        ANIMATOR.setTime(2.0);
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
    
    window_example_sets_area : null,
    file_reader_notice : null,
    
    // elements of data set info header
    data_set_info : {
        title : null,
        date : null
    },
    
    column_chart : null,
    individual_chart : null,
    
    
    
    /* GENERAL */
    
    initialize : function () {
        
        /* DATA LOAD WINDOW */
        
        // get window element
        this.window = _.id('data-load-window');
        this.window_example_sets_area = _.id('example-set-area'); 
        
        // get closing cross button inside window
        this.close_btn = _.class('close', this.window)[0];
        
        // get darkened, transparent background area
        this.blur = _.class('blur', this.window)[0];
        
        // add 'close window' events
        _.addClick(this.blur, this.close);
        _.addClick(this.close_btn, this.close);
        
        // initialize the drag'n'drop area for files in the window
        this.initializeDropArea();
        
        
        
        /* CHART */
        
        // get elements of data set info header
        let context = _.id('data-set-info');
        this.data_set_info.title = _.class('title', context)[0];
        this.data_set_info.date = _.class('date', context)[0];
        
        // get containers for charts
        this.column_chart = _.id('column-chart');
        this.individual_chart = _.id('individual-chart');
        
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
    
    // remove 'highlight' effect from drop area
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
    
    // reads a given file and sends the string to parseJSON()
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
            DATA_LOAD.parseJSON(_.target(e).result);
            
        }
        
    },
    
    // parses a string into a JSON object,
    // then sends the object to visualizeObject()
    parseJSON : function (str) {
            
        // generate an object from JSON string
        let obj = _.parseJSON(str);

        // warn user, if the string could not be parsed
        if (!obj) {
            
            alert('Could not parse the file as it is not in a valid JSON format.\nCheck your browser console for more information.');
            return false;
            
        }

        // visualize the object
        DATA_LOAD.visualizeObject(obj, true);
                
    },
    
    
    
    /* LOAD VISUALIZATION */
    
    // takes a data object and creates the corresponding chart,
    // then gives the animator the right animation values
    visualizeObject : function (obj, showConfirmation) {
        
        // objects holding animation data and references to the columns
        let ani = {};
        let columns = {};
        
        // load information into data set header
        let info = this.data_set_info;
        info.title.innerHTML = obj.name;
        info.date.innerHTML = obj.date;
        
        // empty chart of current columns
        _.empty(this.column_chart);
        
        // load data columns in chart
        let counter = 0;
        for (let key in obj.data) {
           
            if (!obj.data.hasOwnProperty(key)) {
                return;
            }
            
            // create a column and append it to the chart
            let column = this.getColumn(
                key,
                counter,
                obj.keys[key].name, 
                obj.keys[key].icon
            );
            _.append(this.column_chart, column);
            
            // add column to object holding references to columns
            columns[key] = {
                'container' : column,
                'meter' : _.class('meter', column)[0],
                'value' : _.class('value', column)[0],
                // order is the position node in HTML chart (from top to bottom)
                'start_order' : counter 
            };
            
            // add click event to open an individual chart
            _.addClick(column, function (e) {
                
                // send column key to animator object
                let column_key = _.target(e).getAttribute('column-id');
                ANIMATOR.setInvidualChartKeys([column_key]);
                
                // open individual chart
                NAV.showIndividualChart();
                
            });
            
            // add key data to animation object
            ani[key] = this.generateDataPointArray(
                obj.data[key], 
                obj.range.from, 
                obj.range.to
            );
            
            counter++;
            
        }
            
        // stop animator and set new values
        ANIMATOR.setRange(obj.range.from, obj.range.to);
        ANIMATOR.setData(ani);
        ANIMATOR.setColumns(columns);
        ANIMATOR.stop();
        
        // un-hide the 'data-set-current-value' HTML node
        _.removeClass(ANIMATOR.current_value.container, 'hidden');
        
        // hide individual chart, and only show column chart
        NAV.showColumnChart();
            
        if (showConfirmation === true) {
            // display 'file loaded' animation
            _.addClass(DATA_LOAD.window, 'file-selected');
        }
        
    },
    
    // generates DOM node for a column in the chart
    getColumn : function (key, column_index, key_name, icon_url) {
        
        // containing element
        let container = _.create('button.column-container');
        
        let clickEvent = _.create('div.clickEvent', {
            'title' : 'Open statistics for ' + key_name,
            'column-id' : key
        });
        
        // graphic left of column
        let icon = _.create('div.icon', {
            'style' : {
                'background-image' : 'url(' + (_.isString(icon_url) ? icon_url : '') + ')'
            }
        });
        
        // column with values
        let column = _.create('div.column');
        let meter = _.create('div.meter', {
            'style' : {
                'background' : this.getColumnColor(column_index)
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
        _.append(container, clickEvent);
        
        return container;
        
    },
    
    // returns a random color from a pre-defined selection
    getColumnColor : function (index) {
      
        let colors = [
            
            '#099b9b', // darkaqua
            '#a52a2a', // brown
            '#9f8605', // darkgold
            '#556b2f', // darkolivegreen
            '#8b008b', // darkmagenta
            
            '#1616ad', // darkblue
            '#bf775f', // darksalmon
            '#888236', // darkhaki
            '#5ebf5e', // lightgreen
            '#9932cc', // darkorchid
            
            '#3f238d', // blueishviolet
            '#800000', // maroon
            '#a2651b', // darkorange
            '#808000', // olive
            '#800080' // purple
            
        ];
        
        
        // return a color corresponding to the index or a multiple of it from the array
        return colors[index % colors.length];
        
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
            let steps = 0;
            // go through all coming values, to find the next valid one
            for (let j = i + 1; j <= to; j++) {
                steps++;
                if (_.exists(data[j + ""])) {
                    next = data[j + ""];
                    checkForValidValue(next);
                    break;
                }
            }
            // if there's no valid next value, reuse previous value
            let average = next == 0 ? prev : (prev + next) / (1 + steps);
            data_points[data_points.length] = average;
            
        }
        
        // increase values by 50x, by adding values for 0.02, 0.04 to 0.98 between values
        let upscaled_data_points = [];
        let len = data_points.length;
        for (let i = 0; i < len; i++) {
            
            // current data point
            let curr = data_points[i];
            
            // put current value into array as a string
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
    
    // HTML element displaying 'current' value
    current_value : {
        container : null,
        value : null,
        indicator : null
    },
    
    is_running : false,
    time : 1.0,
    
    from : 0,
    to : 0,
    
    current : 0,
    
    // holds update loop interval
    loop : null,
    
    // object holding the animation data
    data : {},
    
    // object holding references to column HTML nodes
    columns : {},
    column_num : 0,
    pixels_between_columns : 0,
    
    individual_chart_keys : [],
    
    
    
    /* GENERAL */
    
    initialize : function () {
        
        let $ = this.current_value;
        
        // get HTML node holding 'current' data value
        $.container = _.id('data-set-current-value');
        $.value = _.class('value', $.container)[0];
        $.indicator = _.class('indicator', $.container)[0];
        
        // canvas needs to be updated on size changes
        _.addEvent(window, 'resize', this.refreshFrame);
        
    },
    
    
    
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
        
        // set loop to new time interval if it's currently running
        if (this.is_running) {
            this.stopLoop();
            this.startLoop();
        }
        
        // set new duration for transition effects on column meters
        this.setCSSTransitions();
        
    },
    
    // update transition duration for animated column length
    setCSSTransitions : function () {
        
        for (let column in this.columns) {
            _.setStyles(this.columns[column].meter, {
                'transition': ((1 / this.time) / 5) + 's'
            });
        }
        
    },
    
    setData : function (obj) {
        
        // hold data object
        this.data = obj;
        
        // get data point amount (same for every column)
        let first_key = Object.keys(obj)[0];
        this.data_point_num = obj[first_key].length;
        
    },
    
    setColumns : function (obj) {
        
        this.columns = obj;
        this.column_num = Object.keys(obj).length;
        
        // if more than one column, they need to be ordered by length
        if (this.column_num > 1) {
            
            // find out the pixel difference in position between two columns
            let keys = Object.keys(obj);
            let column_1_top_pos = obj[keys[0]].container.getBoundingClientRect().top;
            let column_2_top_pos = obj[keys[1]].container.getBoundingClientRect().top;
            this.pixels_between_columns = Math.abs(column_1_top_pos - column_2_top_pos);
            
        }
        
        // set CSS transition effects for animated column length
        this.setCSSTransitions();
        
    },
    
    // set key which data needs to be animated for the individual chart
    setInvidualChartKeys : function (keys) {
        this.individual_chart_keys = keys;
    },
    
    
    
    /* CONTROLS */
    
    startLoop : function () {
        
        let $ = ANIMATOR;
        
        // start update loop
        $.loop = setInterval($.update, 80 / $.time);
        
    },
    
    stopLoop : function () {
        
        let $ = ANIMATOR;
        
        // stop update loop
        clearInterval($.loop);
        $.loop = null;
        
    },
    
    // start playing animation
    play : function () {
        
        let $ = ANIMATOR;
        
        $.is_running = true;
        
        // set classes for use in CSS styles
        _.removeClass(html, 'animation-paused');
        _.addClass(html, 'animation-playing');
        
        $.startLoop();
        
    },
    
    // pause currently playing animation
    pause : function () {
        
        let $ = ANIMATOR;
        
        $.is_running = false;
        
        // set classes for use in CSS styles
        _.removeClass(html, 'animation-playing');
        _.addClass(html, 'animation-paused');
        
        $.stopLoop();
        
    },
    
    // restarts the animation
    restart : function () {
        ANIMATOR.current = 0;
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
        
        $.stopLoop();
        
    },
    
    // stops animation and resets it to start state
    stop : function () {
        
        let $ = ANIMATOR;
        
        // end animation
        $.end();
        
        // reset current frame to start state
        $.update();
        
    },
    
    number_names : {
        'Thousand' :          Math.pow(10, 3),
        'Million' :           Math.pow(10, 6),
        'Billion' :           Math.pow(10, 9),
        'Trillion' :          Math.pow(10, 12),
        'Quadrillion' :       Math.pow(10, 15),
        'Quintillion' :       Math.pow(10, 18),
        'Sextillion' :        Math.pow(10, 21),
        'Septillion' :        Math.pow(10, 24),
        'Octillion' :         Math.pow(10, 27),
        'Nonillion' :         Math.pow(10, 30),
        'Decillion' :         Math.pow(10, 33),
        'Undecillion' :       Math.pow(10, 36),
        'Duodecillion' :      Math.pow(10, 39),
        'Tredecillion' :      Math.pow(10, 42),
        'Quattuordecillion' : Math.pow(10, 45),
        'Quindecillion' :     Math.pow(10, 48),
        'Sexdecillion' :      Math.pow(10, 51),
        'Septendecillion' :   Math.pow(10, 54),
        'Octodecillion' :     Math.pow(10, 57),
        'Novemdecillion' :    Math.pow(10, 60),
        'Vigintillion' :      Math.pow(10, 63),
        '*10^66' :            Math.pow(10, 66),
        '*10^69' :            Math.pow(10, 69),
        '*10^72' :            Math.pow(10, 72),
        '*10^75' :            Math.pow(10, 75),
        '*10^78' :            Math.pow(10, 78),
        '*10^81' :            Math.pow(10, 81),
        '*10^84' :            Math.pow(10, 84),
        '*10^87' :            Math.pow(10, 87),
        '*10^90' :            Math.pow(10, 90),
        '*10^93' :            Math.pow(10, 93),
        '*10^96' :            Math.pow(10, 96),
        '*10^99' :            Math.pow(10, 99)
    },
    
    // formats a number to its shortened word equivalent, aka 1000000 -> 1.000 Mil
    formatNumber : function (num) {
        
        let $ = ANIMATOR;
        
        let word = '';
        let short = 0;
        
        // if number is less than 1 thousand, don't change it
        if (num < 1000) {
            return num + '';
        }
        
        // go through number types and assign the most fitting one
        for (let name in $.number_names) {
            
            let value = $.number_names[name];
            
            if (num >= value && num < value * 1000) {
                // round to 1 digit after the comma and append describing name
                return Number(num / value).toFixed(1) + ' ' + name;
            }
            
        }
        
        // if no fitting number name has been found, number is too large to display
        return '&infin;';
        
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
        
        // set current value
        if ($.current % 50 == 0) {
            let curr_val = parseInt($.from) + ($.current == 0 ? 0 : $.current / 50);
            $.current_value.value.innerHTML = curr_val;
            $.current_value.indicator.innerHTML = curr_val;
        }
        // set current indicator's width
        _.setStyles($.current_value.indicator, {
            'width': ($.current % 50 * 2) + '%'
        });
        
        $.refreshFrame();
        
        $.current++;
        
    },
    
    // refreshes frame to display current values
    refreshFrame : function () {
        
        let $ = ANIMATOR;
        
        // check what chart to update
        if (NAV.individual_chart_opened) {
            $.updateIndividualCharts();
        }
        else {
            $.updateTotalChart();
        }
        
    },
    
    // update chart containing all data
    updateTotalChart : function () {
        
        let $ = ANIMATOR;
        
        
        /* COLUMN LENGTH AND VALUE */
        
        // get min and max value of current frame
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;
        // and get an array of all key value pairs (for later sorting)
        let all_values = []
        for (let key in $.data) {
            let val = $.data[key][$.current];
            if (val < min) min = val;
            if (val > max) max = val;
            
            all_values[all_values.length] = {
                'key' : key, 
                'value' : val
            };
        }
        
        // if min value is bigger than 0, set it to 0, to make scaling dependent on range 0 to max
        if (min > 0) {
            min = 0;
        }
        
        // increase diff between min and max
        let diff = max - min;
        
        // go through all columns
        for (let key in $.data) {
            
            // set value to column
            let curr = $.data[key][$.current];
            $.columns[key].value.innerHTML = $.formatNumber(curr);
            
            // set column length
            _.setStyles($.columns[key].meter, {
                // (max - min) * x + min = curr
                // --> x = width
                'width' : (((curr - min) / (max - min)) * 100) + "%" 
            });
            
        }
        
        
        
        /* COLUMN ORDER */
        
        // sort all values in object after property, from smallest to biggest
        function sortObject(obj, property) {
            return obj.sort(function (a, b) {
                return a[property] < b[property] ? 1 : -1;
            });
        }
        let sorted_values = sortObject(all_values, 'value');
        
        // move columns up and down to their new positions
        for (let i = 0; i < $.column_num; i++) {
            let column = $.columns[sorted_values[i].key];
            let transform_by = (i - column.start_order) * $.pixels_between_columns;
            _.setStyles(column.container, {
                'transform': 'translate(0px, ' + transform_by + 'px)'
            });
        }
        
    },
    
    // update the invidual chart of every key
    updateIndividualCharts : function () {
        
        let $ = ANIMATOR;
        
        // get standard components and values
        let canvas = DATA_LOAD.individual_chart;
        let context = canvas.getContext('2d');
        let keys = $.individual_chart_keys;
        let key_num = $.individual_chart_keys.length;
        
        // reset canvas width and content
        canvas.width = _.getWidth(ANIMATOR.current_value.container);
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // get total min and max values of the given columns (for y positions)
        let min = 0; // can't be higher than 0
        let max = Number.MIN_VALUE;
        // go through all keys
        for (let i = 0; i < key_num; i++) {
            // go through all data points
            for (let j = 0; j < $.data_point_num; j++) {
                let key = keys[i];
                let val = $.data[key][j];
                if (val < min) min = val;
                if (val > max) max = val;
            }
        }
        
        // go through all keys and draw statistic
        for (let i = 0; i < key_num; i++) {
            
            let key = keys[i];
            let color = _.getStyle($.columns[key].meter, 'background-color'); // color from column meter
            
            $.drawIndividualKey(canvas, context, color, min, max, $.data[key], key);
            
        }
        
    },
    
    drawIndividualKey : function (canvas, context, color, min, max, data, key) {
        
        let $ = ANIMATOR;
        
        // set drawing attributes
        let padding = 5; // at each side of canvas, in pixels
        let point_radius = 2; // in pixels
        
        // get all key data points (excludes the 49 points generated between them by the program)
        let points = [];
        let points_num = points.length;
        for (let i = 0; i <= $.data_point_num; i += 50) {
                
            // get point x position
            let width_minus_padding = canvas.width - 2 * padding;
            let width_ratio = (i + 1) / $.data_point_num; // how far to the right is the current point
            let x_pos = padding + width_minus_padding * width_ratio;
            
            // get point y position
            let height_minus_padding = canvas.height - 2 * padding;
            let percentage_to_top = (((data[i] - min) / (max - min)) * 100);
            let y_pos = canvas.height - padding - (height_minus_padding / (100 / percentage_to_top));
            
            // add point to array
            points[points.length] = {
                x : x_pos, 
                y : y_pos
            };
            
            points_num++;
                
        }
        
        // get circle angles
        let start_angle = 0;
        let end_angle = 2 * Math.PI;
        
        // draw all elements
        for (let i = 0; i < points.length; i++) {
            
            // set drawing color
            context.strokeStyle = color;
            
            // get coordinates of current point
            let x = points[i].x;
            let y = points[i].y;

            // draw point
            context.beginPath();
            context.arc(x, y, point_radius, start_angle, end_angle);
            context.stroke();
            
            // draw line between point and next point (except if already reached last point)
            if (i != points.length - 1) {
                
                // get coordinates of next point
                let x_next = points[i + 1].x;
                let y_next = points[i + 1].y;
                
                context.moveTo(x, y);
                context.lineTo(x_next, y_next);
                context.stroke();
                
            }
                
        }
        
    }
    
}

/*
 * main controller, called on page load
 */
var MAIN = {
    
    initialize : function () {
        
        // set globals
        window.html = _.tag('html')[0];
        window.head = _.tag('head')[0];
        window.body = _.tag('body')[0];

        // load all parts
        NAV.initialize();
        DATA_LOAD.initialize();
        ANIMATOR.initialize();
        
        // load example data set from Github
        let request = new XMLHttpRequest();
        request.open('GET', 'data/example-data-set.json');
        request.send();

        // when received, transform the JSON into a chart
        request.onreadystatechange = function (e) {
            
            if (request.readyState === 4 && request.status === 200) {
                
                let json_text = request.responseText;

                if (json_text != null && json_text != '') {
                    let json_obj = _.parseJSON(json_text);
                    DATA_LOAD.visualizeObject(json_obj);
                }

            }
            
        }
        
        // on failed http request, load error messages
        request.onerror = MAIN.showXMLHttpWarnings;
        
    },
    
    showXMLHttpWarnings : function () {
        
        // error message on main page
        let error_msg = _.create('div.notice.red', {
            'innerHTML': '<b>Loading the example data set failed.</b><br />Are you running this project locally on your system? Try using the <i>Load data</i> button.'
        });
        _.append(DATA_LOAD.column_chart, error_msg);

        // warning message in 'data load' window
        let warning = _.create('div.notice.blue', {
            'innerHTML': 'You may currently run this project locally on your computer. This restricts you from selecting local files as data sets, excluding directly loading online examples.',
            'style': {
                'margin-bottom': '20px'
            }
        });
        _.empty(DATA_LOAD.window_example_sets_area);
        _.append(DATA_LOAD.window_example_sets_area, warning);
        
    }
    
}

// initialize the framework once all HTML content is ready
_.addEvent(window, 'load', MAIN.initialize);