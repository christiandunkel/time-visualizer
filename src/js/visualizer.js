"use strict";
/*
 * safes all nodes
 */
var NODE = {
    
    /* TOP NAVIGATION */
    
    data_load_btn : null,
    darkmode_btn : null,
    
    play_btn : null,
    pause_btn : null,
    stop_btn : null,
    
    time_btn : {
        slow : null,
        normal : null,
        fast : null,
    },
    
    initializeNavButtons : function () {
        
        this.data_load_btn = _.id('load-data');
        this.darkmode_btn = _.id('toggle-darkmode');
        
        this.play_btn = _.id('play-button');
        this.pause_btn = _.id('pause-button');
        this.stop_btn = _.id('stop-button');
        
        this.time_btn.slow = _.id('animation-speed-0-5');
        this.time_btn.normal = _.id('animation-speed-1-0');
        this.time_btn.fast = _.id('animation-speed-2-0');
        
    },
    
    
    
    /* DATA LOAD WINDOW */
    
    data_load_window : null,
    close_btn : null,
    blur : null,
    
    drop_area : null,
    select_file_input : null,
    
    window_example_sets_area : null,
    file_reader_notice : null,
    
    initializeDataLoadWindow : function () {
        
        this.data_load_window = _.id('data-load-window');
        this.close_btn = _.class('close', this.data_load_window)[0];
        this.blur = _.class('blur', this.data_load_window)[0]; // dark, transparent background overlay
        
        this.window_example_sets_area = _.id('example-set-area');
        this.file_reader_notice = _.id('file-reader-notice');
        
        // get area and input on which user can drop files
        this.select_file_input = _.id('selected-file');
        this.drop_area = _.id('drop-area');
        
    },
    
    
    
    /* COLUMN DATA CHART */
    
    // HTML element displaying 'current' value
    current_value : {
        container : null,
        value : null,
        indicator : null
    },
    
    // elements of data set info header
    data_set_info : {
        title : null,
        date : null
    },
    column_chart : null,
    
    initializeColumnChart : function () {
        
        // get elements of data set info header
        let context = _.id('data-set-info');
        this.data_set_info.title = _.class('title', context)[0];
        this.data_set_info.date = _.class('date', context)[0];
        
        // get containers for charts
        this.column_chart = _.id('column-chart');
        
        // get HTML node holding 'current' data value
        let curr = this.current_value;
        curr.container = _.id('data-set-current-value');
        curr.value = _.class('value', curr.container)[0];
        curr.indicator = _.class('indicator', curr.container)[0];
        
    },
    
    
    
    /* INDIVIDUAL DATA CHARTS */
    
    individual_chart_menu : null,
    individual_chart : null,
    
    back_to_column_chart_btn : null,
    download_png_btn : null,
    compare_btn: null,
    
    initializeIndividualCharts : function () {
        
        // get top menu and buttons
        this.individual_chart_menu = _.id('individual-chart-menu');
        this.back_to_column_chart_btn = _.id('back-to-column-chart-btn');
        this.download_png_btn = _.id('download-chart-as-image');
        this.compare_btn = _.id('compare-btn');
        
        this.individual_chart = _.id('individual-chart');
        
    },
    
    
    
    /* GENERAL */
    
    initialize : function () {
        
        // set default HTML nodes
        this.html = _.tag('html')[0];
        this.head = _.tag('head')[0];
        this.body = _.tag('body')[0];
        
        // set custom nodes
        this.initializeNavButtons();
        this.initializeDataLoadWindow();
        this.initializeColumnChart();
        this.initializeIndividualCharts();
        
    }
    
}


/*
 * manages the functionality of the navigation buttons
 */
var NAV = {
    
    darkmode : false,
    individual_chart_opened : false,
    
    
    
    /* GENERAL */
    
    // add events to navigation buttons
    initialize : function () {
        
        // add event to open 'data load' window
        _.addClick(NODE.data_load_btn, DATA_LOAD.open);
        
        // add event for toggling 'dark mode'
        _.addClick(NODE.darkmode_btn, this.toggleDarkMode);
        
        // add event to start animation
        _.addClick(NODE.play_btn, ANIMATOR.play);
        
        // add event to pause animation
        _.addClick(NODE.pause_btn, ANIMATOR.pause);
        
        // add event to stop animation
        _.addClick(NODE.stop_btn, ANIMATOR.stop);
        
        // add events to time change buttons
        _.addClick(NODE.time_btn.slow, NAV.setHalvedTime);
        _.addClick(NODE.time_btn.normal, NAV.setNormalTime);
        _.addClick(NODE.time_btn.fast, NAV.setDoubledTime);
        
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
        
        let btns = NODE.time_btn;
        
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
        
        // hide individual charts and show column chart
        _.addClass(NODE.column_chart, 'active');
        _.removeClass(NODE.current_value.container, 'hidden');
        _.removeClass(NODE.individual_chart, 'active');
        _.removeClass(NODE.individual_chart_menu, 'active');
        
        // update charts
        ANIMATOR.refreshFrame();
        
    },
    
    showIndividualChart : function () {
        
        NAV.individual_chart_opened = true;
        
        // show individual charts and hide column chart
        _.removeClass(NODE.column_chart, 'active');
        _.addClass(NODE.current_value.container, 'hidden');
        _.addClass(NODE.individual_chart, 'active');
        _.addClass(NODE.individual_chart_menu, 'active');
        
        // update charts
        ANIMATOR.refreshFrame();
        
    },
    
    
    
    /* DARKMODE */
    
    // toggle the website's theme between light and dark
    toggleDarkMode : function () {

        // toggle darkmode value
        NAV.darkmode = !NAV.darkmode;
        
        // toggle darkmode class according to value
        _[(NAV.darkmode ? 'add' : 'remove') + 'Class'](NODE.html, 'darkMode');
        
        // update rendered chart
        ANIMATOR.refreshFrame();
        
    },
    
    
    
    /* TIME */
    
    setHalvedTime : function () {
        NAV.setExclusiveActive(NODE.time_btn.slow);
        ANIMATOR.setTime(0.5);
    },
    
    setNormalTime : function () {
        NAV.setExclusiveActive(NODE.time_btn.normal);
        ANIMATOR.setTime(1.0);
    },
    
    setDoubledTime : function () {
        NAV.setExclusiveActive(NODE.time_btn.fast);
        ANIMATOR.setTime(2.0);
    },
    
    
    
    /* CHARTS */
    
    downloadChartImage : function () {
        
        let image_uri = NODE.individual_chart.toDataURL('image/png');
        
        // get current time and date, convert it to string
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let date_str = (day > 9 ? '' : '0') + day + '-' +
                       (month > 9 ? '' : '0') + month + '-' +
                       date.getFullYear() + ' ' +
                       date.getHours() + '-' +
                       date.getMinutes() + '-' +
                       date.getSeconds();
        
        let link = _.create('a', {
            'download' : 'chart ' + ANIMATOR.individual_chart_keys[0].replace(/[^a-z0-9\-\_]/g, '') + ' ' + date_str + '.png',
            'href' : image_uri
        });
        
        _.append(NODE.body, link);
        link.click();
        _.remove(link);

    }
    
}

/*
 * manages loading JSON data from files over the 'data load window'
 */
var DATA_LOAD = {
    
    /* GENERAL */
    
    initialize : function () {
        
        // add 'close window' events
        _.addClick(NODE.blur, this.close);
        _.addClick(NODE.close_btn, this.close);
        
        // initialize the drag'n'drop area for files in the window
        this.initializeDropArea();
        
    },
    
    // open the 'data load' window
    open : function () {
        
        // open window
        _.addClass(NODE.data_load_window, 'visible');
        
        // with a little delay, set tab focus on close button
        // if set immediately, will be ignored or buggy
        setTimeout(function () {
            NODE.close_btn.focus();
        }, 100);
        
    },
    
    // close the 'data load' window
    close : function () {
        
        // close window
        _.removeClass(NODE.data_load_window, 'visible');
        
        // close 'file selected' message inside window
        _.removeClass(NODE.data_load_window, 'file-selected');
        
        // reset tab focus back to 'data load' button in navigation
        NODE.data_load_btn.focus();
        
    },
    
    
    
    /* FILE DROP AREA */
    
    initializeDropArea : function () {
        
        // warn user if FileReader API is not supported
        if (typeof(window.FileReader) !== 'function') {
            
            // make it visible
            _.addClass(NODE.file_reader_notice, 'show');
            
        }
        
        // prevent default browser actions on drag'n'drop
        _.addEvent(NODE.drop_area, 'dragenter', _.preventDefault);
        _.addEvent(NODE.drop_area, 'dragover', _.preventDefault);
        _.addEvent(NODE.drop_area, 'dragleave', _.preventDefault);
        _.addEvent(NODE.drop_area, 'drop', _.preventDefault);

        // add highlight events, if user dragged file on top of area
        _.addEvent(NODE.drop_area, 'dragenter', this.highlightDropArea);
        _.addEvent(NODE.drop_area, 'dragover', this.highlightDropArea);

        // unhighlight area if user's cursor with file left or dropped
        _.addEvent(NODE.drop_area, 'dragleave', this.unhighlightDropArea);
        _.addEvent(NODE.drop_area, 'drop', this.unhighlightDropArea);

        // add event to handle files dropped on drop area
        _.addEvent(NODE.drop_area, 'drop', this.handleDroppedFile);
        
        // add event for 'select file' button
        _.addEvent(NODE.select_file_input, 'change', this.handleSelectedFile)
        
    },
    
    // add 'highlight' effect to drop area
    highlightDropArea : function () {
        _.addClass(NODE.drop_area, 'dragged-over');
    },
    
    // remove 'highlight' effect from drop area
    unhighlightDropArea : function () {
        _.removeClass(NODE.drop_area, 'dragged-over');
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
        let info = NODE.data_set_info;
        info.title.innerHTML = obj.name;
        info.date.innerHTML = obj.date;
        
        // empty chart of current columns
        _.empty(NODE.column_chart);
        
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
            _.append(NODE.column_chart, column);
            
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
        ANIMATOR.end();
        ANIMATOR.refreshFrame();
        
        // un-hide the 'data-set-current-value' HTML node
        _.removeClass(NODE.current_value.container, 'hidden');
        
        // hide individual chart, and only show column chart
        NAV.showColumnChart();
            
        if (showConfirmation === true) {
            // display 'file loaded' animation
            _.addClass(NODE.data_load_window, 'file-selected');
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
            if (_.exists(data[i + ""]) && _.isNumber(data[i + ""])) {
                
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
            let next = null;
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
            let average = prev + ((next - prev) / (1 + steps));
            // if there's no valid next value, reuse previous value
            data_points[data_points.length] = next == null ? prev : average;
            
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
 * manages the window for selecting keys
 * to be compared in the individual charts
 */
var COMPARE = {
    
    open : function () {
        
    }
    
}

/*
 * manages the animation of the charts
 */
var ANIMATOR = {
    
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
        
        // canvas needs to be updated on size changes
        _.addEvent(window, 'resize', this.refreshFrame);
        
        // add events for individual chart menu
        _.addClick(NODE.back_to_column_chart_btn, NAV.showColumnChart);
        _.addClick(NODE.download_png_btn, NAV.downloadChartImage);
        _.addClick(NODE.compare_btn, COMPARE.open);
        
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
        
        // milliseconds between updates
        let interval = 80 / ANIMATOR.time;
        
        // start update loop
        ANIMATOR.loop = setInterval(ANIMATOR.update, interval);
        
    },
    
    stopLoop : function () {
        
        // stop update loop
        clearInterval(ANIMATOR.loop);
        ANIMATOR.loop = null;
        
    },
    
    // start playing animation
    play : function () {
        
        ANIMATOR.is_running = true;
        
        // set classes for use in CSS styles
        _.removeClass(NODE.html, 'animation-paused');
        _.addClass(NODE.html, 'animation-playing');
        
        ANIMATOR.startLoop();
        
    },
    
    // pause currently playing animation
    pause : function () {
        
        ANIMATOR.is_running = false;
        
        // set classes for use in CSS styles
        _.removeClass(NODE.html, 'animation-playing');
        _.addClass(NODE.html, 'animation-paused');
        
        ANIMATOR.stopLoop();
        
    },
    
    // restarts the animation
    restart : function () {
        ANIMATOR.current = 0;
    },
    
    // triggers the end state, where one can not 'unpause', as it will restart, but the animation is still frozen in last frame 
    end : function () {
        
        // stop animation
        ANIMATOR.is_running = false;
        ANIMATOR.current = 0;
        
        // set classes for use in CSS styles
        _.removeClass(NODE.html, 'animation-playing');
        _.addClass(NODE.html, 'animation-paused');
        
        ANIMATOR.stopLoop();
        
    },
    
    // stops animation and resets it to start state
    stop : function () {
        
        // end animation and reset current frame to start state
        ANIMATOR.end();
        ANIMATOR.update();
        
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
        
        let word = '';
        let short = 0;
        
        // if number is less than 1 thousand, don't change it
        if (num < 1000) {
            return num + '';
        }
        
        // go through number types and assign the most fitting one
        for (let name in ANIMATOR.number_names) {
            
            let value = ANIMATOR.number_names[name];
            
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
        
        // never run on faulty data object
        if (ANIMATOR.data == null) {
            return;
        }
        
        // reset after one full round
        if (ANIMATOR.current >= ANIMATOR.data_point_num) {
            ANIMATOR.end();
            return;
        }
        
        ANIMATOR.refreshFrame();
        
        ANIMATOR.current++;
        
    },
    
    // refreshes frame to display current values
    refreshFrame : function () {
        
        // set current value
        if (ANIMATOR.current % 50 == 0) {
            let curr_val = parseInt(ANIMATOR.from) + (ANIMATOR.current == 0 ? 
                                                    0 : ANIMATOR.current / 50);
            NODE.current_value.value.innerHTML = curr_val;
            NODE.current_value.indicator.innerHTML = curr_val;
        }
        // set current indicator's width
        _.setStyles(NODE.current_value.indicator, {
            'width': (ANIMATOR.current % 50 * 2) + '%'
        });
        
        // check what chart to update
        if (NAV.individual_chart_opened) {
            ANIMATOR.updateIndividualCharts();
        }
        else {
            ANIMATOR.updateColumnChart();
        }
        
    },
    
    // update chart containing all data
    updateColumnChart : function () {
        
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
        let canvas = NODE.individual_chart;
        let context = canvas.getContext('2d');
        let keys = $.individual_chart_keys;
        let key_num = $.individual_chart_keys.length;
        
        // reset canvas width and content
        canvas.width = _.getWidth(NODE.individual_chart_menu);
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
        
        // define padding in canvas per side
        let padding = {
            top : 5,
            left : 5,
            bottom : 20,
            right : 120
        };
        
        let width_minus_padding = canvas.width - padding.left - padding.right;
        let number_of_keys = (($.data_point_num - 1) / 50) + 1;
        
        // draw the raster
        for (let i = $.from; i <= $.to; i++) {
            
            /* RASTER LINES */
            
            // set drawing color
            context.strokeStyle = NAV.darkmode ? '#242424' : '#ededed';
            
            let x_pos = i == $.from ? 
                padding.left : padding.left + (width_minus_padding * ((i - $.from) / (number_of_keys - 1)));
            
            // draw line
            context.moveTo(x_pos, padding.top);
            context.lineTo(x_pos, canvas.height - padding.bottom);
        
            // draw on the canvas
            context.stroke();
            
            
            
            /* LABELS BOTTOM */
            
            let limited_labels = false; // labels limited to right and left-most limits (lines)
            
            // get text and width (in pixels)
            let text = i + '';
            let text_width = context.measureText(text).width;
            
            // check if label text is small enough
            if (text_width > 100) {
                return;
            }
            else if (text_width > 35) {
                limited_labels = true;
            }
            // if text is well-sized, check window size (in pixels)
            else if (window.innerWidth <= 550) {
                limited_labels = true;
            }
            
            // if labels are limited to only right and left-most limits,
            // but current raster line is located in center -> return
            if (limited_labels && $.from != i && $.to != i) {
                continue;
            }
                
            // draw text
            context.font = '12px Arial sans-serif';
            context.fillStyle = NAV.darkmode ? '#575757' : '#b5b5b5';
            context.textBaseline = 'bottom';
            context.textAlign = 
                i == $.from ? 'left' : 
                    (i == $.to ? 'right' : 'center');
            context.fillText(text, x_pos, canvas.height);

            // draw on the canvas
            context.stroke();
            
        }
            
        // draw labels on right side
        let label_top = ANIMATOR.formatNumber(max) + '';
        let label_bottom = ANIMATOR.formatNumber(min) + '';
        for (let i = 0; i < 2; i++) {
            
            // prepare label text
            context.font = '12px Arial sans-serif';
            context.fillStyle = NAV.darkmode ? '#575757' : '#b5b5b5';
            context.textBaseline = i == 0 ? 'top' : 'bottom';
            context.textAlign = 'left';
            context.fillText(
                i == 0 ? label_top : label_bottom, 
                canvas.width - padding.right + 5, 
                i == 0 ? padding.top : canvas.height - padding.bottom
            );

            // draw on the canvas
            context.stroke();
        }
        
        // go through all keys and draw statistic
        for (let i = 0; i < key_num; i++) {
            
            let key = keys[i];
            let color = _.getStyle($.columns[key].meter, 'background-color'); // color from column meter
            
            $.drawIndividualKey(canvas, context, padding, color, min, max, $.data[key], key);
            
        }
        
        // draw time indicator line
        if ($.current != 0) {

            // set drawing color
            context.strokeStyle = '#e26565';
            
            let width_ratio = ($.current + 1) / $.data_point_num; // how far to the right is the current point
            let x_pos = padding.left + width_minus_padding * width_ratio;
            
            context.moveTo(x_pos, padding.top);
            context.lineTo(x_pos, canvas.height - padding.bottom);
        
            // draw on the canvas
            context.stroke();
            
        }
        
    },
    
    drawIndividualKey : function (canvas, context, padding, color, min, max, data, key) {
        
        // set drawing attributes
        let point_radius = 2; // in pixels
        let width_minus_padding = canvas.width - padding.left - padding.right;
        let height_minus_padding = canvas.height - padding.top - padding.bottom;
        
        // get all key data points (excludes the 49 points generated between them by the program)
        let points = [];
        let points_num = points.length;
        for (let i = 0; i <= ANIMATOR.data_point_num; i += 50) {
                
            // get point x position
            let width_ratio = (i + 1) / ANIMATOR.data_point_num; // how far to the right is the current point
            let x_pos = i == 0 ? padding.left : padding.left + width_minus_padding * width_ratio;
            
            // get point y position
            let percentage_to_top = (((data[i] - min) / (max - min)) * 100);
            let y_pos = canvas.height - padding.top - (height_minus_padding / (100 / percentage_to_top));
            
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
            
        // set drawing color
        context.strokeStyle = color;
        
        // draw all elements
        for (let i = 0; i < points.length; i++) {
            
            // get coordinates of current point
            let x = points[i].x;
            let y = points[i].y;

            // draw point
            context.beginPath();
            context.arc(x, y, point_radius, start_angle, end_angle);

            // draw on the canvas
            context.stroke();
            
            // draw line between point and next point (except if already reached last point)
            if (i != points.length - 1) {
                
                // get coordinates of next point
                let x_next = points[i + 1].x;
                let y_next = points[i + 1].y;
                
                context.moveTo(x, y);
                context.lineTo(x_next, y_next);
        
                // draw on the canvas
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

        // load all parts
        NODE.initialize();
        NAV.initialize();
        DATA_LOAD.initialize();
        ANIMATOR.initialize();
        
        // load example data set into chart
        MAIN.loadExampleDataset();
        
    },
    
    loadExampleDataset : function () {
        
        // load example data set (only works on localhost or web server)
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
        _.append(NODE.column_chart, error_msg);

        // warning message in 'data load' window
        let warning = _.create('div.notice.blue', {
            'innerHTML': 'You may currently run this project locally on your computer. This restricts you from selecting local files as data sets, excluding directly loading online examples.',
            'style': {
                'margin-bottom': '20px'
            }
        });
        _.empty(NODE.window_example_sets_area);
        _.append(NODE.window_example_sets_area, warning);
        
    }
    
}

// initialize the framework once all HTML content is ready
_.addEvent(window, 'load', MAIN.initialize);