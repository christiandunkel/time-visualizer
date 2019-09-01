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
        var btns = _.tag('button', NODE.window_example_sets_area);
        var btns_num = btns.length;
        for (var i = 0; i < btns_num; i++) {
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

        var file = null;

        if (e.dataTransfer.items) {

            var items = e.dataTransfer.items;

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

            var items = e.dataTransfer.files;

            if (items.length > 1) {
                alert('Dropping multiple files is forbidden.');
                return;
            }

            var file = items[0];

        }
        
        DATA_LOAD.processFile(file);
        
    },
    
    // gets a file from HTML <input> and sends it to processFile()
    handleSelectedFile : function (e) {
        
        // get file from event handeler
        var items = this.files;
        var file = items[0];
        
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
        var obj = _.parseJSON(str);

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
        
        var btn = _.target(e);
        var url = 'data/' + btn.getAttribute('load-data') + '.json';
        
        DATA_LOAD.loadHttpDataSet(url, true);
        
    },
    
    // request a data set from an url (must be same origin server!)
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
    
    
    /* LOAD VISUALIZATION */
    
    // takes a data object and creates the corresponding chart,
    // then gives the animator the right animation values
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
           
            if (!obj.data.hasOwnProperty(key)) {
                return;
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
            _.addClick(_.class('clickEvent', column)[0], this.openIndividualChart);
            
            
            
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
        var column_key = _.target(e).getAttribute('column-id');
        ANIMATOR.setInvidualChartKeys([column_key]);

        // open individual chart
        NAV.showIndividualChart();
        
    },
    
    // get HTML construct for the child of the column ratio chart
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
    
    // returns a random color from a pre-defined selection
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
    
    // generates an array of data values from given data object
    generateDataPointArray : function (data, from, to) {
        
        function checkForValidValue(val) {
                
            // check if the value is a number
            if (!_.isNumber(val)) {
                throw 'Error: Value "' + value + '" for key "' + i + '" in JSON must be a number, but is a "' + typeof(value) + '".';
            }
            
        }
        
        var data_points = [];
        
        // go through range and generate a value for each iteration
        for (var i = from; i <= to; i++) {
            
            // check for a value for the iteration in the data
            if (_.exists(data[i + ""]) && _.isNumber(data[i + ""])) {
                
                // get the value from the data
                var value = data[i + ""];
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
            var prev = data_points[data_points.length - 1];
            var next = null;
            var steps = 0;
            // go through all coming values, to find the next valid one
            for (var j = i + 1; j <= to; j++) {
                steps++;
                if (_.exists(data[j + ""])) {
                    next = data[j + ""];
                    checkForValidValue(next);
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