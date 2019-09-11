/** 
 * @module VISUALIZER
 * @desc generates HTML elements for charts  
 */
var VISUALIZER = {
    
    /* CREATE CHARTS */
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc takes a 'data set' object and creates the HTML nodes need for the charts and sends the ANIMATOR object the right animation values
     * @param {Object} obj - JSON data set as object
     * @param {boolean} [showConfirmation=false] - set to true, if a confirmation message that a 'data set' was loaded, should be shown in 'data load' window
     */
    createCharts : function (obj, showConfirmation) {
        
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
     * @memberof module:VISUALIZER
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
     * @memberof module:VISUALIZER
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
     * @memberof module:VISUALIZER
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
     * @memberof module:VISUALIZER
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
     * @memberof module:VISUALIZER
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