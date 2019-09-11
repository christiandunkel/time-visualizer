/** 
 * @module FILE
 * @desc reads and validates the data from JSON data sets 
 */
var FILE = {
    
    /**
     * @function
     * @memberof module:FILE
     * @desc determines if the given data set is valid
     * @param {Object} json
     * @returns {boolean} true, if data set is valid
     * @returns {string} error message, if it's invalid
     */
    isValidData : function (obj) {
        
        /* general */
        
        if (typeof(obj.name) === 'undefined') {
            return '"name" value is not defined.';
        }
        
        if (!_.isString(obj.name)) {
            return '"name" value must be a string.';
        }
        
        if (typeof(obj.date) === 'undefined') {
            return '"date" value must be defined.';
        }
        
        if (!_.isString(obj.date)) {
            return '"date" value must be a string.';
        }
        
        
        
        /* keys */
        
        if (typeof(obj.keys) === 'undefined') {
            return '"keys" value must be defined.';
        }
        
        if (_.isEmptyObject(obj.keys)) {
            return '"keys" value must contain at least one key.';
        }
        
        var keys = [];
        
        // go through all keys to validate them
        for (var prop in obj.keys) {
           
            // skip if is prototype property
            if (!obj.hasOwnProperty.call(obj.keys, prop)) {
                continue;
            }
            
            // add key to array for later
            keys[keys.length] = prop;
            
            if (typeof(obj.keys[prop].name) === 'undefined') {
                return '"name" value in key "' + prop + '" is undefined.';
            }
            
            if (!_.isString(obj.keys[prop].name)) {
                return '"name" value in key "' + prop + '" must be a string, but is of type "' + typeof(obj.keys[prop].name) + '".';
            }
            
            if (typeof(obj.keys[prop].icon) === 'undefined') {
                return '"icon" value in key "' + prop + '" is undefined.';
            }
            
            if (!_.isString(obj.keys[prop].icon)) {
                return '"icon" value in key "' + prop + '" must be a string, but is of type "' + typeof(obj.keys[prop].icon) + '".';
            }
            
        }
        
        
        
        /* range */
        
        if (typeof(obj.range) === 'undefined') {
            return '"range" value is not defined.';
        }
        
        if (typeof(obj.range.from) === 'undefined') {
            return 'Range "from" value must be defined.';
        }
        
        if (!_.isInteger(obj.range.from)) {
            return 'Range "from" value must be a number (integer).';
        }
        
        if (typeof(obj.range.to) === 'undefined') {
            return 'Range "to" value is not defined.';
        }
        
        if (!_.isInteger(obj.range.to)) {
            return 'Range "to" value must be a number (integer).';
        }
        
        
        
        /* data */
        
        if (typeof(obj.data) === 'undefined') {
            return '"data" value must be defined.';
        }
        
        if (_.isEmptyObject(obj.data)) {
            return '"data" value must contain at least one key.';
        }
        
        var key_num = keys.length;
        
        // go through all keys to validate them
        for (var i = 0; i < key_num; i++) {
            
            var key = keys[i];
            
            if (_.isEmptyObject(obj.data[key])) {
                return 'No data points are defined in "' + key + '".';
            }
            
            // go through data points in key
            for (var point in obj.data[key]) {
                
                if (!point.match(/^\-?[0-9]+$/g)) {
                    return 'Name "' + point + '" in key "' + key + '" must be a whole number.'
                }
                
                if (!_.isNumber(obj.data[key][point])) {
                    return 'Value of "' + point + '" in key "' + key + '" must be a number, but is of type ' + typeof(obj.data[key][point]) + '.';
                }
                
            }
            
        }
        
        
        
        // dara set is valid
        return true;
        
    }
    
}

/** @module DATA_LOAD */
var DATA_LOAD = {
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc initializes the 'data load' window
     */
    initialize : function () {
        
        var $ = NODE.data_load;
        
        // add 'close window' events
        _.onClick($.blur, this.close);
        _.onClick($.close_btn, this.close);
        
        // initialize 'example data' buttons
        var btns = _.tag('button', $.example_sets_area);
        var btns_num = btns.length;
        for (var i = 0; i < btns_num; i++) {
            // buttons load data set from URL on click 
            _.onClick(btns[i], function (e) {
                var btn = _.target(e);
                var link = btn.getAttribute('load-data');
                DATA_LOAD.loadHttpDataSet('data/' + link + '.json', true);
            });
        }
        
        // initialize the drag'n'drop area for files in the window
        this.initializeDropArea();
        
    },
    
    
    
    /* DATA LOAD WINDOW */
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc opens the 'data load' window
     */
    open : function () {
        
        // open window
        _.addClass(NODE.data_load.window, 'visible');
        
        // with a little delay, set tab focus on close button
        // if set immediately, will be ignored or buggy
        setTimeout(function () {
            NODE.data_load.close_btn.focus();
        }, 100);
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc closes the 'data load' window
     */
    close : function () {
        
        // close window
        _.removeClass(NODE.data_load.window, 'visible');
        
        // close 'file selected' message inside window
        _.removeClass(NODE.data_load.window, 'file-selected');
        
        // reset tab focus back to 'data load' button in navigation
        NODE.data_load_btn.focus();
        
    },
    
    
    
    /* FILE DROP AREA */
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc initializes the file drop area in the 'data load' window
     */
    initializeDropArea : function () {
        
        var $ = NODE.data_load;
        
        // warn user if FileReader API is not supported
        if (!_.isFunction(window.FileReader)) {
            
            // make warning visible
            _.addClass($.notice, 'show');
            
        }
        
        // prevent default browser actions on drag'n'drop
        _.addEvent($.drop_area, 'dragenter', _.preventDefault);
        _.addEvent($.drop_area, 'dragover', _.preventDefault);
        _.addEvent($.drop_area, 'dragleave', _.preventDefault);
        _.addEvent($.drop_area, 'drop', _.preventDefault);

        // add highlight events, if user dragged file on top of area
        _.addEvent($.drop_area, 'dragenter', this.highlightDropArea);
        _.addEvent($.drop_area, 'dragover', this.highlightDropArea);

        // unhighlight area if user's cursor with file left or dropped
        _.addEvent($.drop_area, 'dragleave', this.unhighlightDropArea);
        _.addEvent($.drop_area, 'drop', this.unhighlightDropArea);

        // add event to handle files dropped on drop area
        _.addEvent($.drop_area, 'drop', this.handleDroppedFile);
        
        // add event for 'select file' button
        _.addEvent($.select_file_input, 'change', this.handleSelectedFile)
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc adds the 'highlight' effect to the file drop area
     */
    highlightDropArea : function () {
        _.addClass(NODE.data_load.drop_area, 'dragged-over');
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc removes the 'highlight' effect from the file drop area
     */
    unhighlightDropArea : function () {
        _.removeClass(NODE.data_load.drop_area, 'dragged-over');
    },
    
    
    
    /* FILE HANDLING */
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc handles dropped file in drop area and sends it to processFile()
     * @param {event} e - drop event
     */
    handleDroppedFile : function (e) {
        
        _.preventDefault(e);

        var file = null;

        if (e.dataTransfer.items) {

            var items = e.dataTransfer.items;

            if (items.length > 1) {
                MSG.error('Dropping multiple files is forbidden.');
                return;
            }

            // check for file
            if (items[0].kind !== 'file') {
                return;
            }
            
            file = items[0].getAsFile();

        }
        else {

            var items = e.dataTransfer.files;

            if (items.length > 1) {
                MSG.error('Dropping multiple files is forbidden.');
                return;
            }

            var file = items[0];

        }
        
        DATA_LOAD.processFile(file);
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc handles file from 'select button' in drop area and sends it to processFile()
     * @param {event} e - event triggered as a file is selected
     */
    handleSelectedFile : function (e) {
        
        // get file from event handeler
        var items = this.files;
        var file = items[0];
        
        DATA_LOAD.processFile(file);
        
    },
    
    
    
    /* FILE PROCESSING */
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc reads a given file and sends the string to parseJSON()
     * @param {Object} file - file reference
     */
    processFile : function (file) {
        
        if (!file) {
            console.error('File is not defined.');
            return;
        }
        
        // warn user if FileReader API is not supported
        if (!_.isFunction(window.FileReader)) {
            MSG.error('The FileReader API is not supported by your browser. Please update your browser or switch to a different one!');
            return;
        }
        
        // filter out all files besides .json and .txt
        if (!/\.(json|txt)$/.test(file.name)) {
            MSG.error('Only .json and .txt files are allowed.');
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
            MSG.error('File could not be read.');
        }

        // otherwise, proceed on converting file content to object
        reader.onload = function (e) {
            
            // generate an object from JSON string
            DATA_LOAD.parseJSON(_.target(e).result);
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc parses a string into a JSON object and sends it to visualizeObject()
     * @param {string} str - JSON data
     */
    parseJSON : function (str) {
            
        // generate an object from JSON string
        var obj = _.parseJSON(str);

        // warn user, if the string could not be parsed as JSON
        if (!obj) {
            MSG.error('Could not parse the file as it\'s not valid JSON.');
            return false;
        }
        
        // warn user, if the data set is missing required properties
        var is_valid = FILE.isValidData(obj);
        if (_.isString(is_valid)) {
            MSG.error(is_valid, 7000);
            return false;
        }
        
        // switch back to bar chart
        NAV.showColumnChart();

        // visualize the object
        DATA_LOAD.visualizeObject(obj, true);
                
    },
    
    
    
    /* VIA HTTP REQUEST */
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc request a data set from an url (must be same origin server!)
     * @param {string} url - link to JSON data set
     * @param {boolean} [showConfirmation=false] - set to true, if a confirmation message that a 'data set' was loaded, should be shown in 'data load' window
     * @returns {Object} request - XMLHttpRequest
     */
    loadHttpDataSet : function (url, showConfirmation) {
        
        // load example data set (only works on localhost or web server)
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();

        // when received, transform the JSON into a chart
        request.onreadystatechange = function (e) {
            
            if (request.readyState === 4 && request.status === 200) {
                
                var json_text = request.responseText;

                if (json_text != null && json_text != '') {
                    var json_obj = _.parseJSON(json_text);
                    DATA_LOAD.visualizeObject(json_obj, showConfirmation);
                }

            }
            
        }
        
        return request;
        
    },
    
    
    
    /* CREATE CHARTS */
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc takes a 'data set' object and creates the HTML nodes need for the charts and sends the ANIMATOR object the right animation values
     * @param {Object} obj - JSON data set as object
     * @param {boolean} [showConfirmation=false] - set to true, if a confirmation message that a 'data set' was loaded, should be shown in 'data load' window
     */
    visualizeObject : function (obj, showConfirmation) {
        
        // un-hide column ratio bar and total headline
        _.removeClass(NODE.column_chart_total, 'hidden');
        _.removeClass(NODE.ratio_chart_container, 'hidden');
        
        // objects holding animation data, references to the columns and references to ratio parts
        var ani = {};
        var columns = {};
        var ratio_parts = {};
        
        // load information into data set header
        var info = NODE.data_set_info;
        info.title.innerHTML = obj.name;
        info.date.innerHTML = obj.date;
        
        // empty chart of current columns
        _.empty(NODE.column_chart);
        _.empty(NODE.ratio_chart);
        
        // load data columns in chart
        var counter = 0;
        for (var key in obj.data) {
           
            // skip if is prototype property
            if (!obj.data.hasOwnProperty(key)) {
                continue;
            }
            
            var color = this.getColumnColor(counter);
            
            /* ANIMATION DATA */
            
            // add key data to animation object
            ani[key] = this.generateDataPointArray(
                obj.data[key], 
                obj.range.from, 
                obj.range.to
            );
            
            
            
            /* COLUMN */
            
            // create a column and append it to the chart
            var column = this.getColumn(
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
            _.onClick(_.class('clickEvent', column)[0], this.openIndividualChart);
            
            
            
            /* RATIO PART */
            
            // create a ratio part and append it to the ratio chart
            var ratio_part = this.getRatioChartPart(
                key,
                color,
                ani[key],
                obj.keys[key].name, 
                obj.keys[key].icon
            );
            _.append(NODE.ratio_chart, ratio_part);
            
            // add ratio part to object
            var percentage =_.class('percentage', ratio_part)[0];
            ratio_parts[key] = {
                'container' : ratio_part,
                'percentage' : _.tag('div', percentage)[0],
                'tooltip' : _.class('tooltip', ratio_part)[0],
                'tooltip_percentage' : _.class('tooltip-percentage', ratio_part)[0]
            };
            
            // add click event to open an individual chart
            _.onClick(_.class('clickEvent', ratio_part)[0], this.openIndividualChart);
            
            
            
            counter++;
            
        }
            
        // set new animation values
        DATA.setRange(obj.range.from, obj.range.to);
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
            _.addClass(NODE.data_load.window, 'file-selected');
        }
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc click event to open the individual chart for a column
     * @param {event} e - click event
     */
    openIndividualChart : function (e) {
        
        // send column key to animator object
        var column_key = _.target(e).getAttribute('column-id');
        ANIMATOR.setInvidualChartKeys([column_key]);

        // open individual chart
        NAV.showIndividualChart();
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc generates HTML node for data key of ratio chart
     * @param {string} key - key in data set
     * @param {string} color - HEX code with the color of this specific data key
     * @param {Object} data
     * @param {string} key_name - display name of key
     * @param {string} [icon_url]
     * @returns {Object} HTML node for specific key of the ratio chart
     */
    getRatioChartPart : function (key, color, data, key_name, icon_url) {
        
        var container = _.create('td.part-container', {
            'style' : {
                'background-color' : color
            }
        });
        
        // overlay click event
        var clickEvent = _.create('button.clickEvent', {
            'title' : 'Open statistics for ' + key_name,
            'column-id' : key
        });
        
        // graphic left of column
        var icon = _.create('div.icon', {
            'style' : {
                'background-image' : 'url(' + (_.isString(icon_url) ? _.encodeHTML(icon_url) : '') + ')'
            }
        });
        
        // tooltip parts
        var tooltip = _.create('div.tooltip');
        var tooltip_name = _.create('div.name', {
            'innerHTML' : key_name
        });
        
        var avg = _.getAverage(data);
        var min = _.getMin(data);
        var max = _.getMax(data);
        
        var tooltip_description = _.create('div.description', {
            'innerHTML' : '' +
                '<b>Avg:</b> ' + ANIMATOR.formatNumber(avg) + '<br>' +
                '<b>Min:</b> ' + ANIMATOR.formatNumber(min) + '<br>' +
                '<b>Max:</b> ' + ANIMATOR.formatNumber(max)
        });
        
        // percentage values
        var tooltip_percentage = _.create('div.tooltip-percentage');
        var percentage = _.create('div.percentage');
        var div_in_percentage = _.create('div');
        
        // append elements to container
        _.append(tooltip, icon);
        _.append(tooltip, tooltip_percentage);
        _.append(tooltip, tooltip_name);
        _.append(tooltip, tooltip_description);
        _.append(container, tooltip);
        _.append(percentage, div_in_percentage);
        _.append(container, percentage);
        _.append(container, clickEvent);
        
        return container;
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc generates HTML node for a key of column chart
     * @param {string} key - key in data set
     * @param {string} color - HEX code with the color of this specific data key
     * @param {string} key_name - display name of key
     * @param {string} [icon_url]
     * @returns {Object} HTML node for specific key of the column chart
     */
    getColumn : function (key, color, key_name, icon_url) {
        
        // containing element
        var container = _.create('button.column-container');
        
        // overlay click event
        var clickEvent = _.create('div.clickEvent', {
            'title' : 'Open statistics for ' + key_name,
            'column-id' : key
        });
        
        // graphic left of column
        var icon = _.create('div.icon', {
            'style' : {
                'background-image' : 'url(' + (_.isString(icon_url) ? _.encodeHTML(icon_url) : '') + ')'
            }
        });
        
        // column with values
        var column = _.create('div.column');
        var meter = _.create('div.meter', {
            'style' : {
                'background-color' : color
            }
        });
        var name = _.create('div.name', {
            'innerHTML' : key_name
        });
        var value = _.create('div.value');
        
        // append elements to container
        _.append(meter, name);
        _.append(meter, value);
        _.append(column, meter);
        _.append(container, icon);
        _.append(container, column);
        _.append(container, clickEvent);
        
        return container;
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc returns a HEX color code a selection of colors depending on the given index
     * @param {number} index - must be integer
     * @returns {string} HEX color code
     */
    getColumnColor : function (index) {
      
        var colors = [
            
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
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc generates an enlarged array of data values the animation data of a key
     * @param {Object} data - JSON data
     * @param {number} from - start data-point-key in data
     * @param {number} to - end data-point-key in data
     * @returns {Array} animation values (50x the number of input data points)
     */
    generateDataPointArray : function (data, from, to) {
        
        var data_points = [];
        
        // go through range and generate a value for each iteration
        for (var i = from; i <= to; i++) {
            
            // check for a value for the iteration in the data
            if (_.isNumber(data[i + ""])) {
                
                // get the value from the data
                var value = data[i + ""];
                
                data_points[data_points.length] = value;
                continue;
                
            }
            
            // if not, set value to 0, if it's the first iteration
            if (i == from) {
                data_points[data_points.length] = 0;
                continue;
            }
            
            // otherwise, calculate the average of prev & next value
            var prev = data_points[data_points.length - 1];
            var next = null;
            var steps = 0;
            // go through all coming values, to find the next valid one
            for (var j = i + 1; j <= to; j++) {
                steps++;
                if (_.exists(data[j + ""])) {
                    next = data[j + ""];
                    break;
                }
            }
            var average = prev + ((next - prev) / (1 + steps));
            // if there's no valid next value, reuse previous value
            data_points[data_points.length] = next == null ? prev : average;
            
        }
        
        // increase values by 50x, by adding values for 0.02, 0.04 to 0.98 between values
        var upscaled_data_points = [];
        var len = data_points.length;
        for (var i = 0; i < len; i++) {
            
            // current data point
            var curr = data_points[i];
            
            // put current value into array as a string
            var num = upscaled_data_points.length;
            upscaled_data_points[num] = curr;
            
            // don't generate 50 new values after last data point
            if (i == len - 1) {
                break;
            }
            
            // get next data point and calculate difference
            var next = data_points[i + 1];
            var diff = next - curr;
            var hundreth = diff / 100;
            
            // generate 49 values in between current and next value
            for (var j = 2; j <= 98; j += 2) {
                var new_point = curr + (j * hundreth);
                var this_len = upscaled_data_points.length;
                upscaled_data_points[this_len] = new_point;
            }
            
        }
        
        return upscaled_data_points;
        
    }
    
}