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
    
    time_selection : {
        container_1 : null,
        container_2 : null,
        input : null,
        custom : null,
        close_custom : null
    },
    
    time_btn : {
        slow : null,
        normal : null,
        fast : null
    },
    
    initializeNavButtons : function () {
        
        this.data_load_btn = _.id('load-data');
        this.darkmode_btn = _.id('toggle-darkmode');
        
        this.play_btn = _.id('play-button');
        this.pause_btn = _.id('pause-button');
        this.stop_btn = _.id('stop-button');
        
        // animation speed menu (pre-defined)
        this.time_selection.container_1 = _.id('pre-defined-animation-speeds');
        this.time_btn.slow = _.id('animation-speed-0-5');
        this.time_btn.normal = _.id('animation-speed-1-0');
        this.time_btn.fast = _.id('animation-speed-2-0');
        
        // animation speed menu (custom)
        this.time_selection.container_2 = _.id('custom-animation-speed-area');
        this.time_selection.input = _.id('custom-animation-speed-value');
        this.time_selection.custom = _.id('custom-animation-speed');
        this.time_selection.close_custom = _.id('close-custom-animation-speed-area');
        
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
    
    
    
    /* COMPARE SELECTION WINDOW */
    
    compare_selection : {
        
        window : null,
        close_btn : null,
        blur : null,
        
        unselected_keys : null,
        selected_keys : null
        
    },
    
    initializeCompareSelectionWindow : function () {
        
        let $ = NODE.compare_selection;
        
        $.window = _.id('compare-selection-window');
        $.close_btn = _.class('close', $.window)[0];
        $.blur = _.class('blur', $.window)[0];
        
        $.unselected_keys = _.class('unselected-keys', $.window)[0];
        $.selected_keys = _.class('selected-keys', $.window)[0];
        
    },
    
    
    
    /* COLUMN DATA CHART */
    
    chart_container_1 : null,
    
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
    
    column_chart_total : null,
    ratio_chart : null,
    
    initializeColumnChart : function () {
        
        this.chart_container_1 = _.id('chart-container-1');
        
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
        
        // column ratio chart / bar below big column chart
        this.column_chart_total = _.id('column-chart-total');
        this.ratio_chart = _.id('column-ratio');
        
    },
    
    
    
    /* INDIVIDUAL DATA CHARTS */
    
    chart_container_2 : null,
    
    individual_chart_menu : null,
    individual_chart : null,
    
    back_to_column_chart_btn : null,
    download_png_btn : null,
    compare_btn: null,
    
    initializeIndividualCharts : function () {
        
        this.chart_container_2 = _.id('chart-container-2');
        
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
        this.initializeCompareSelectionWindow();
        this.initializeIndividualCharts();
        
    }
    
}



/*
 * contains useful methods for calculation 
 */
var MATH = {
    
    // sort array containing objects of the same type by a given property (and its value)
    sortObject : function (obj, property, ascending = true) {
        return obj.sort(function (a, b) {
            if (ascending) {
                return a[property] < b[property] ? 1 : -1;
            }
            else {
                return a[property] > b[property] ? 1 : -1;
            }
        });
    },
    
    // returns the average of an array of values
    getAverage : function (arr) {
        
        let total = 0;
        let len = arr.length;
        
        for (let i = 0; i < len; i++) {
            total += arr[i];
        }
        
        return total / len;
        
    },
    
    // returns the smallest value of an array of values
    getMin : function (arr, start_minimum = Number.MAX_VALUE) {
        
        let min = start_minimum;
        let len = arr.length;
        
        for (let i = 0; i < len; i++) {
            let curr = arr[i];
            if (curr < min) {
                min = curr;
            }
        }
        
        return min;
        
    },
    
    // returns the highest value of an array of values
    getMax : function (arr, start_maximum = Number.MIN_VALUE) {
        
        let max = start_maximum;
        let len = arr.length;
        
        for (let i = 0; i < len; i++) {
            let curr = arr[i];
            if (curr > max) {
                max = curr;
            }
        }
        
        return max;
        
    },
    
    // removes an index from an array
    removeArrayIndex : function (arr, index) {
        let len = arr.length;
        // remove index
        for (let i = index; i < len - 1; i++) {
            arr[i] = arr[i+1];
        }
        // remove last value
        arr.pop();
        return arr;
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
        
        _.addEvent(NODE.time_selection.input, 'input', NAV.setCustomTime);
        _.addClick(NODE.time_selection.custom, NAV.setCustomTimeContainer);
        _.addClick(NODE.time_selection.close_custom, NAV.setDefinedTimeContainer);
        
    },
    
    // set a button active
    setActive : function (btn) {
        _.addClass(btn, 'active');
        btn.setAttribute('aria-disabled', 'false');
        btn.setAttribute('originalTabIndex', btn.getAttribute('tabIndex'));
        btn.setAttribute('tabIndex', '-1');
    },
    
    // set a button inactive
    setInactive : function (btn) {
        _.removeClass(btn, 'active');
        btn.setAttribute('aria-disabled', 'true');
        let originalTabIndex = btn.getAttribute('originalTabIndex');
        if (originalTabIndex == null) {
            originalTabIndex = btn.getAttribute('tabIndex');
            btn.setAttribute('originalTabIndex', originalTabIndex);
        }
        btn.setAttribute('tabIndex', originalTabIndex);
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
        
        // hide individual chart and show column chart
        _.addClass(NODE.chart_container_1, 'active');
        _.removeClass(NODE.chart_container_2, 'active');
        
        // update charts
        ANIMATOR.refreshFrame();
        
    },
    
    showIndividualChart : function () {
        
        NAV.individual_chart_opened = true;
        
        // show individual chart and hide column chart
        _.removeClass(NODE.chart_container_1, 'active');
        _.addClass(NODE.chart_container_2, 'active');
        
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
        
        let btn = NODE.time_btn.slow;
        
        // don't do anything, if button is already active
        if (_.hasClass(btn, 'active')) {
            return;
        }
        
        // activate button and set time
        NAV.setExclusiveActive(btn);
        ANIMATOR.setTime(0.5);
        
    },
    
    setNormalTime : function () {
        
        let btn = NODE.time_btn.normal;
        
        // don't do anything, if button is already active
        if (_.hasClass(btn, 'active')) {
            return;
        }
        
        // activate button and set time
        NAV.setExclusiveActive(btn);
        ANIMATOR.setTime(1.0);
        
    },
    
    setDoubledTime : function () {
        
        let btn = NODE.time_btn.fast;
        
        // don't do anything, if button is already active
        if (_.hasClass(btn, 'active')) {
            return;
        }
        
        // activate button and set time
        NAV.setExclusiveActive(btn);
        ANIMATOR.setTime(2.0);
        
    },
    
    setCustomTime : function () {
        
        let input = NODE.time_selection.input;
        let time = input.value;
        
        // replace commas with points
        if (time.match(/[,]+/)) {
            time = time.replace(/[,]+/, '.');
            input.value = time;
        }
        
        // remove non-number and non-point characters
        if (time.match(/[^0-9\.]+/)) {
            time = time.replace(/[^0-9\.]+/, '');
            input.value = time;
        }
        
        // return if time isn't in right format
        if (!time.match(/^([0-9]+|[0-9]+\.[0-9]+)$/)) {
            _.removeClass(input, 'correct-time');
            return;
        }
        
        // parse time string to float
        time = parseFloat(time);
        // round number to 1 number after comma
        if (time % 1 != 0) {
            time = time.toFixed(1);
        }
        
        // cut off time value if it's too big or too small 
        if (time > 4) {
            time = 4;
        }
        else if (time < 0.1) {
            time = 0.1;
        }
        
        _.addClass(input, 'correct-time');
        
        // send value to animator object
        ANIMATOR.setTime(time);
        
        // if time value was corrected by regex, replace input value with it
        time = "" + time;
        if (time != input.value) {
            input.value = time;
        }
        
    },
    
    setCustomTimeContainer : function () {
        
        _.removeClass(NODE.time_selection.container_1, 'active');
        _.addClass(NODE.time_selection.container_2, 'active');
        
        // put current defined time value into input element 
        let input = NODE.time_selection.input;
        input.value = ANIMATOR.time + '';
        _.addClass(input, 'correct-time');
        
    },
    
    setDefinedTimeContainer : function () {
        
        _.addClass(NODE.time_selection.container_1, 'active');
        _.removeClass(NODE.time_selection.container_2, 'active');
        
        // put value of selected 'defined time' button as current time 
        let defined_time = 0;
        if (_.hasClass(NODE.time_btn.slow, 'active')) {
            defined_time = 0.5;
        }
        else if (_.hasClass(NODE.time_btn.normal, 'active')) {
            defined_time = 1;
        }
        else {
            defined_time = 2;
        }
        ANIMATOR.setTime(defined_time);
        
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
        
        // add 'load data set' functionality to buttons
        let btns = _.tag('button', NODE.window_example_sets_area);
        let btns_num = btns.length;
        for (let i = 0; i < btns_num; i++) {
            _.addClick(btns[i], this.startDataSetLoading);
        }
        
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
    
    
    
    /* ONLINE DATA SET PER HTTP REQUEST */
    
    // called from a button to load a specific data set defined in its 'load-data' HTML property
    startDataSetLoading : function (e) {
        
        let btn = _.target(e);
        let url = 'data/' + btn.getAttribute('load-data') + '.json';
        
        DATA_LOAD.loadHttpDataSet(url);
        
    },
    
    // request a data set from an url (must be same origin server!)
    loadHttpDataSet : function (url) {
        
        // load example data set (only works on localhost or web server)
        let request = new XMLHttpRequest();
        request.open('GET', url);
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
        
        return request;
        
    },
    
    
    /* LOAD VISUALIZATION */
    
    // takes a data object and creates the corresponding chart,
    // then gives the animator the right animation values
    visualizeObject : function (obj, showConfirmation) {
        
        // un-hide column ratio bar and total headline
        _.removeClass(NODE.column_chart_total, 'hidden');
        _.removeClass(NODE.ratio_chart, 'hidden');
        
        // objects holding animation data, references to the columns and references to ratio parts
        let ani = {};
        let columns = {};
        let ratio_parts = {};
        
        // load information into data set header
        let info = NODE.data_set_info;
        info.title.innerHTML = obj.name;
        info.date.innerHTML = obj.date;
        
        // empty chart of current columns
        _.empty(NODE.column_chart);
        _.empty(NODE.ratio_chart);
        
        // load data columns in chart
        let counter = 0;
        for (let key in obj.data) {
           
            if (!obj.data.hasOwnProperty(key)) {
                return;
            }
            
            let color = this.getColumnColor(counter);
            
            
            
            /* ANIMATION DATA */
            
            // add key data to animation object
            ani[key] = this.generateDataPointArray(
                obj.data[key], 
                obj.range.from, 
                obj.range.to
            );
            
            
            
            /* COLUMN */
            
            // create a column and append it to the chart
            let column = this.getColumn(
                key,
                color,
                obj.keys[key].name, 
                obj.keys[key].icon
            );
            _.append(NODE.column_chart, column);
            
            // add column to object holding references to columns
            columns[key] = {
                'container' : column,
                'name' : obj.keys[key].name,
                'color' : color,
                'meter' : _.class('meter', column)[0],
                'value' : _.class('value', column)[0],
                // order is the position node in HTML chart (from top to bottom)
                'start_order' : counter 
            };
            
            // add click event to open an individual chart
            _.addClick(_.class('clickEvent', column)[0], this.openIndividualChart);
            
            
            
            /* RATIO PART */
            
            // create a ratio part and append it to the ratio chart
            let ratio_part = this.getRatioChartPart(
                key,
                color,
                ani[key],
                obj.keys[key].name, 
                obj.keys[key].icon
            );
            _.append(NODE.ratio_chart, ratio_part);
            
            // add ratio part to object
            ratio_parts[key] = {
                'container' : ratio_part,
                'percentage' : _.class('percentage', ratio_part)[0],
                'tooltip' : _.class('tooltip', ratio_part)[0],
                'tooltip_percentage' : _.class('tooltip-percentage', ratio_part)[0]
            };
            
            // add click event to open an individual chart
            _.addClick(_.class('clickEvent', ratio_part)[0], this.openIndividualChart);
            
            
            
            counter++;
            
        }
            
        // set new animation values
        ANIMATOR.setRange(obj.range.from, obj.range.to);
        ANIMATOR.setData(ani);
        
        // set elements that will be animated
        ANIMATOR.setColumns(columns);
        ANIMATOR.setRatioParts(ratio_parts);
        ANIMATOR.setCSSTransitions();
        
        // stop animator running
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
    
    // click event to open individual chart
    openIndividualChart : function (e) {
        
        // send column key to animator object
        let column_key = _.target(e).getAttribute('column-id');
        ANIMATOR.setInvidualChartKeys([column_key]);

        // open individual chart
        NAV.showIndividualChart();
        
    },
    
    // get HTML construct for the child of the column ratio chart
    getRatioChartPart : function (key, color, data, key_name, icon_url) {
        
        let container = _.create('td.part-container', {
            'style' : {
                'background-color' : color
            }
        });
        
        // overlay click event
        let clickEvent = _.create('button.clickEvent', {
            'title' : 'Open statistics for ' + key_name,
            'column-id' : key
        });
        
        // graphic left of column
        let icon = _.create('div.icon', {
            'style' : {
                'background-image' : 'url(' + (_.isString(icon_url) ? _.encodeHTML(icon_url) : '') + ')'
            }
        });
        
        // tooltip parts
        let tooltip = _.create('div.tooltip');
        let tooltip_name = _.create('div.name', {
            'innerHTML' : key_name
        });
        
        let avg = MATH.getAverage(data);
        let min = MATH.getMin(data);
        let max = MATH.getMax(data);
        
        let tooltip_description = _.create('div.description', {
            'innerHTML' : '' +
                '<b>Avg:</b> ' + ANIMATOR.formatNumber(avg) + '<br>' +
                '<b>Min:</b> ' + ANIMATOR.formatNumber(min) + '<br>' +
                '<b>Max:</b> ' + ANIMATOR.formatNumber(max)
        });
        
        // percentage values
        let tooltip_percentage = _.create('div.tooltip-percentage');
        let percentage = _.create('div.percentage');
        
        // append elements to container
        _.append(tooltip, icon);
        _.append(tooltip, tooltip_percentage);
        _.append(tooltip, tooltip_name);
        _.append(tooltip, tooltip_description);
        _.append(container, tooltip);
        _.append(container, percentage);
        _.append(container, clickEvent);
        
        return container;
        
    },
    
    // generates DOM node for a column in the chart
    getColumn : function (key, color, key_name, icon_url) {
        
        // containing element
        let container = _.create('button.column-container');
        
        // overlay click event
        let clickEvent = _.create('div.clickEvent', {
            'title' : 'Open statistics for ' + key_name,
            'column-id' : key
        });
        
        // graphic left of column
        let icon = _.create('div.icon', {
            'style' : {
                'background-image' : 'url(' + (_.isString(icon_url) ? _.encodeHTML(icon_url) : '') + ')'
            }
        });
        
        // column with values
        let column = _.create('div.column');
        let meter = _.create('div.meter', {
            'style' : {
                'background-color' : color
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
    
    /* GENERAL */
    
    initialize : function () {
        
        // add event to open 'compare selection' window
        _.addClick(NODE.compare_btn, this.open);
        
        // add 'close window' events
        _.addClick(NODE.compare_selection.blur, this.close);
        _.addClick(NODE.compare_selection.close_btn, this.close);
        
    },
    
    // open the 'data load' window
    open : function () {
        
        // open window
        _.addClass(NODE.compare_selection.window, 'visible');
        
        // clear areas and load current keys
        _.empty(NODE.compare_selection.unselected_keys);
        _.empty(NODE.compare_selection.selected_keys);
        COMPARE.loadKeys();
        
        // with a little delay, set tab focus on close button
        // if set immediately, will be ignored or buggy
        setTimeout(function () {
            NODE.compare_selection.close_btn.focus();
        }, 100);
        
    },
    
    // close the 'data load' window
    close : function () {
        
        // close window
        _.removeClass(NODE.compare_selection.window, 'visible');
        
        // reset tab focus back to 'data load' button in navigation
        NODE.compare_btn.focus();
        
    },
    
    moveKey : function (e) {
        
        let btn = _.target(e);
        let key = btn.getAttribute('key-id');
        
        // check if the button's key needs to be included to or excluded from the 'key selection' array
        let include = false;
        if (_.hasClass(btn.parentElement, 'unselected-keys')) {
            include = true;
        }
        
        if (include) {
            ANIMATOR.addIndividualKey(key);
        }
        else {
            ANIMATOR.removeIndividualKey(key);
        }
        
        COMPARE.loadKeys();
        
    },
    
    loadKeys : function () {
        
        // empty key button containers
        _.empty(NODE.compare_selection.selected_keys);
        _.empty(NODE.compare_selection.unselected_keys);
        
        // add key buttons
        for (let key in ANIMATOR.data) {
            
            // check if key is included in list of keys to be rendered
            let included = false;
            let len = ANIMATOR.individual_chart_keys.length;
            for (let i = 0; i < len; i++) {
                if (ANIMATOR.individual_chart_keys[i] === key) {
                    included = true;
                    break;
                }
            }
            
            // create button
            let btn = _.create('button.comparison-key', {
                'key-id' : key,
                'innerHTML' : ANIMATOR.columns[key].name,
                'style' : {
                    'background' : ANIMATOR.columns[key].color
                }
            });
            
            // add event to select / unselect key
            _.addClick(btn, COMPARE.moveKey);
            
            // append button to right box
            _.append(NODE.compare_selection[(included ? '' : 'un') + 'selected_keys'], btn);
            
        }
        
        ANIMATOR.refreshFrame();
        
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
    pixels_between_columns : 52,
    
    // object holding references to the parts of the column ratio chart
    ratio_parts : {},
    ratio_parts_num : 0,
    
    individual_chart_keys : [],
    
    
    
    /* GENERAL */
    
    initialize : function () {
        
        // canvas needs to be updated on size changes
        _.addEvent(window, 'resize', function () {
            if (NAV.individual_chart_opened) {
                ANIMATOR.refreshFrame();
            }
        });
        
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
    
    // update transition duration of column chart and column ratio chart
    setCSSTransitions : function () {
        
        let transition_time = ((1 / this.time) / 5) + 's';
        
        // set CSS transition effects for animated column length
        for (let column in this.columns) {
            _.setStyles(this.columns[column].meter, {
                'transition': transition_time
            });
        }
        
        // set CSS transition effects for column ratio chart
        for (let part in this.ratio_parts) {
            _.setStyles(this.ratio_parts[part].container, {
                'transition': transition_time
            });
        }
        
        // set CSS transition effects for time indicator
        _.setStyles(NODE.current_value.indicator, {
            'transition': transition_time
        });
        
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
        
    },
    
    setRatioParts : function (obj) {
        
        this.ratio_parts = obj;
        this.ratio_parts_num = Object.keys(obj).length;
        
    },
    
    // set key which data needs to be animated for the individual chart
    setInvidualChartKeys : function (keys) {
        this.individual_chart_keys = keys;
    },
    
    addIndividualKey : function (key) {
        
        if (!this.hasIndividualKey()) {
            let len = this.individual_chart_keys.length;
            this.individual_chart_keys[len] = key;
        }
        
    },
    
    removeIndividualKey : function (key) {
            
        let keys = this.individual_chart_keys;
        let len = keys.length;

        // go through all keys and find indexes of the desired key
        // (should only be 1 index, but you can't be careful enough)
        let indexes = [];
        for (let i = 0; i < len; i++) {
            if (keys[i] === key) {
                indexes[indexes.length] = i;
            }
        }
        
        // remove the indexes from the array
        let indexes_num = indexes.length;
        for (let i = 0; i < indexes_num; i++) {
            keys = MATH.removeArrayIndex(keys, indexes[i]);
        }
        
        this.setInvidualChartKeys(keys);
        
    },
    
    hasIndividualKey : function (key) {
        let keys = this.individual_chart_keys.length;
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            if (keys[i] === key) {
                return true;
            }
        }
        return false;
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
        
        let is_negative = num < 0 ? true : false;
        let sign = is_negative ? '-' : '';
        let word = '';
        let short = 0;
        
        // make number positive for conversion (re-add minus symbol later)
        if (is_negative) {
            num *= -1;
        }
        
        // if number is less than 1 thousand, don't change it
        if (num < 1000) {
            return sign + num;
        }
        
        // go through number types and assign the most fitting one
        for (let name in ANIMATOR.number_names) {
            
            let value = ANIMATOR.number_names[name];
            
            if (num >= value && num < value * 1000) {
                // round to 1 digit after the comma and append describing name
                return sign + Number(num / value).toFixed(1) + ' ' + name;
            }
            
        }
        
        // if no fitting number name has been found, number is too large to display
        return sign + '&infin;';
        
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
            ANIMATOR.updateColumnRatioChart();
        }
        
    },
    
    // update chart containing all data
    updateColumnChart : function () {
        
        let $ = ANIMATOR;
        
        
        /* COLUMN LENGTH AND VALUE */
        
        // get min and max value of current frame
        let min = 0; // min must be 0 at least
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
        
        let sorted_values = MATH.sortObject(all_values, 'value');
        
        // move columns up and down to their new positions
        for (let i = 0; i < $.column_num; i++) {
            let column = $.columns[sorted_values[i].key];
            let transform_by = (i - column.start_order) * $.pixels_between_columns;
            _.setStyles(column.container, {
                'transform': 'translate(0px, ' + transform_by + 'px)'
            });
        }
        
    },
    
    updateColumnRatioChart : function () {
        
        let $ = ANIMATOR;
        
        // get total for current time
        let total = 0;
        for (let key in $.data) {
            total += $.data[key][$.current];
        }
        
        // set column total in line on top of ratio bar 
        NODE.column_chart_total.innerHTML = ANIMATOR.formatNumber(total);
        
        // get ratio percentages
        let order = [];
        for (let key in $.data) {
            
            let percentage = 100 / (total / $.data[key][$.current]);
            
            order[order.length] = {
                'key' : key, 
                'value' : percentage
            }
            
        }
        let sorted_parts = MATH.sortObject(order, 'value', false);
        
        for (let i = 0; i < $.ratio_parts_num; i++) {
            
            let key = sorted_parts[i].key;
            let percentage = sorted_parts[i].value;
            let ratio_part = $.ratio_parts[key];
            
            // filter out parts smaller than 0.2%
            if (percentage < 0.2) {
                _.addClass(ratio_part.container, 'hidden');
                continue;
            }
            else {
                _.removeClass(ratio_part.container, 'hidden');
            }
            
            // set order of ratio parts
            _.append(NODE.ratio_chart, ratio_part.container);
            
            // make ratio part as wide as calculated percentage
            _.setStyles(ratio_part.container, {
                'width' : percentage + '%'
            });
            
            // set displayed percentage values on chart
            let rounded_percentage = percentage.toFixed(1);
            ratio_part.percentage.innerHTML = rounded_percentage + '%';
            ratio_part.tooltip_percentage.innerHTML = rounded_percentage + '%';
            
        }
        
    },
    
    // update the invidual chart of every key
    updateIndividualCharts : function () {
        
        let $ = ANIMATOR;
        
        // get standard components and values
        let canvas = NODE.individual_chart;
        let context = canvas.getContext('2d');
        let keys = $.individual_chart_keys;
        
        // return if no keys are selected
        if (keys == null) {
            canvas.width = 0;
            return;
        }
        
        let key_num = $.individual_chart_keys.length;;
        
        // reset canvas content, width and height
        canvas.width = _.getWidth(NODE.individual_chart_menu);
        canvas.height = 500 + (18 * (key_num - 1));
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
            bottom : 80,
            right : 5
        };
            
        // determine right-side labels with their respective lengths
        let label_font = '12px Arial sans-serif';
        let label_top = ANIMATOR.formatNumber(max) + '';
        let label_bottom = ANIMATOR.formatNumber(min) + '';
        context.font = label_font;
        let label_top_width = context.measureText(label_top).width;
        let label_bottom_width = context.measureText(label_bottom).width;
        
        // adjust right-side padding according to the longer text of the two
        let max_width = label_top_width;
        if (max_width < label_bottom_width) max_width = label_bottom_width;
        padding.right = padding.right + max_width + 15;
        
        // reserve more space at bottom for additional keys in the legend 
        padding.bottom = padding.bottom + 18 * key_num;
        
        // draw labels on right side
        for (let i = 0; i < 2; i++) {
            
            // prepare label text
            context.font = label_font;
            context.fillStyle = NAV.darkmode ? '#767676' : '#b5b5b5';
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
                
            // draw bottom labels
            context.font = label_font;
            context.fillStyle = NAV.darkmode ? '#767676' : '#b5b5b5';
            context.textBaseline = 'bottom';
            context.textAlign = 
                i == $.from ? 'left' : 
                    (i == $.to ? 'right' : 'center');
            context.fillText(text, x_pos, canvas.height - padding.bottom + 20);

            // draw on the canvas
            context.stroke();
            
        }
        
        // draw legend headline
        context.font = '14px Arial sans-serif';
        context.fillStyle = NAV.darkmode ? '#767676' : '#b5b5b5';
        context.textBaseline = 'middle';
        context.textAlign = 'left';
        context.fillText('Legend', padding.left, canvas.height - padding.bottom + 50);

        // draw on the canvas
        context.stroke();
        
        // go through all keys and draw statistic
        for (let i = 0; i < key_num; i++) {
            
            let key = keys[i];
            let color = $.columns[key].color; // color from column meter
            
            // draw graph for key
            $.drawIndividualKey(canvas, context, padding, color, min, max, $.data[key], key);
            
            // add key to legend
            let y_pos = canvas.height - padding.bottom + 66 + (18 * i);
            context.font = '12px Arial sans-serif';
            context.fillStyle = NAV.darkmode ? '#767676' : '#b5b5b5';
            context.textBaseline = 'top';
            context.textAlign = 'left';
            context.fillText($.columns[key].name, padding.left + 20, y_pos);

            // draw on the canvas
            context.stroke();
            
            // add colored rectangle in front of key in legend
            context.rect(padding.left + 4, y_pos, 10, 10);
            context.fillStyle = color;
            context.fill();

            // draw on the canvas
            context.stroke();
            
        }
        
        // draw time indicator line
        if ($.current != 0 && $.current != $.data_point_num - 1) {

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
        for (let i = 0; i <= ANIMATOR.data_point_num; i += 50) {
                
            // get x position of point
            let width_ratio = 0;
            if (i > 0) {
                // how far to the right is the current point
                width_ratio = i / (ANIMATOR.data_point_num - 1);
            }
            let x_pos = padding.left + width_minus_padding * width_ratio;
            
            // get y position of point
            let percentage_to_top = (((data[i] - min) / (max - min)) * 100);
            let y_pos = canvas.height - padding.bottom;
            y_pos -= height_minus_padding / (100 / percentage_to_top);
            
            // add point to array
            points[points.length] = {
                x : x_pos, 
                y : y_pos
            };
                
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
        COMPARE.initialize();
        ANIMATOR.initialize();
        
        // load example data set into chart
        let request = DATA_LOAD.loadHttpDataSet('data/example-data-set.json');
        
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
            'innerHTML': 'You may currently run this project locally on your computer. This restricts you to only load local data set files. You can\'t load online examples.',
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