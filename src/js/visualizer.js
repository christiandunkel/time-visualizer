/**
 * @file manages the animation of the charts
 * @license https://github.com/christiandunkel/time-visualizer/blob/master/doc/license.md
 */

/** @global */
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
        
        var transition_time = ((1 / this.time) / 5) + 's';
        
        // set CSS transition effects for animated column length
        for (var column in this.columns) {
            _.setStyles(this.columns[column].meter, {
                'transition': transition_time
            });
        }
        
        // set CSS transition effects for column ratio chart
        for (var part in this.ratio_parts) {
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
        var first_key = Object.keys(obj)[0];
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
            var len = this.individual_chart_keys.length;
            this.individual_chart_keys[len] = key;
        }
        
    },
    
    removeIndividualKey : function (key) {
            
        var keys = this.individual_chart_keys;
        var len = keys.length;

        // go through all keys and find indexes of the desired key
        // (should only be 1 index, but you can't be careful enough)
        var indexes = [];
        for (var i = 0; i < len; i++) {
            if (keys[i] === key) {
                indexes[indexes.length] = i;
            }
        }
        
        // remove the indexes from the array
        var indexes_num = indexes.length;
        for (var i = 0; i < indexes_num; i++) {
            keys = _.removeArrayIndex(keys, indexes[i]);
        }
        
        this.setInvidualChartKeys(keys);
        
    },
    
    hasIndividualKey : function (key) {
        var keys = this.individual_chart_keys.length;
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            if (keys[i] === key) {
                return true;
            }
        }
        return false;
    },
    
    
    
    /* CONTROLS */
    
    startLoop : function () {
        
        // milliseconds between updates
        var interval = 80 / ANIMATOR.time;
        
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
        
        var is_negative = num < 0 ? true : false;
        var sign = is_negative ? '-' : '';
        var word = '';
        var short = 0;
        
        // make number positive for conversion (re-add minus symbol later)
        if (is_negative) {
            num *= -1;
        }
        
        // if number is less than 1 thousand, don't change it
        if (num < 1000) {
            return sign + num;
        }
        
        // go through number types and assign the most fitting one
        for (var name in ANIMATOR.number_names) {
            
            var value = ANIMATOR.number_names[name];
            
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
            var curr_val = parseInt(ANIMATOR.from) + (ANIMATOR.current == 0 ? 
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
        
        var $ = ANIMATOR;
        
        
        /* COLUMN LENGTH AND VALUE */
        
        // get min and max value of current frame
        var min = 0; // min must be 0 at least
        var max = Number.MIN_VALUE;
        // and get an array of all key value pairs (for later sorting)
        var all_values = []
        for (var key in $.data) {
            var val = $.data[key][$.current];
            if (val < min) min = val;
            if (val > max) max = val;
            
            all_values[all_values.length] = {
                'key' : key, 
                'value' : val
            };
        }
        
        // increase diff between min and max
        var diff = max - min;
        
        // go through all columns
        for (var key in $.data) {
            
            // set value to column
            var curr = $.data[key][$.current];
            $.columns[key].value.innerHTML = $.formatNumber(curr);
            
            // set column length
            _.setStyles($.columns[key].meter, {
                // (max - min) * x + min = curr
                // --> x = width
                'width' : (((curr - min) / (max - min)) * 100) + "%" 
            });
            
        }
        
        
        
        /* COLUMN ORDER */
        
        var sorted_values = _.sortObject(all_values, 'value', true);
        
        // move columns up and down to their new positions
        for (var i = 0; i < $.column_num; i++) {
            var column = $.columns[sorted_values[i].key];
            var transform_by = (i - column.start_order) * $.pixels_between_columns;
            _.setStyles(column.container, {
                'transform': 'translate(0px, ' + transform_by + 'px)'
            });
        }
        
    },
    
    updateColumnRatioChart : function () {
        
        var $ = ANIMATOR;
        
        // get total for current time
        var total = 0;
        for (var key in $.data) {
            total += $.data[key][$.current];
        }
        
        // set column total in line on top of ratio bar 
        NODE.column_chart_total.innerHTML = ANIMATOR.formatNumber(total);
        
        // get ratio percentages
        var order = [];
        for (var key in $.data) {
            
            var percentage = 100 / (total / $.data[key][$.current]);
            
            order[order.length] = {
                'key' : key, 
                'value' : percentage
            }
            
        }
        var sorted_parts = _.sortObject(order, 'value');
        
        for (var i = 0; i < $.ratio_parts_num; i++) {
            
            var key = sorted_parts[i].key;
            var percentage = sorted_parts[i].value;
            var ratio_part = $.ratio_parts[key];
            
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
            var rounded_percentage = percentage.toFixed(1);
            ratio_part.percentage.innerHTML = rounded_percentage + '%';
            ratio_part.tooltip_percentage.innerHTML = rounded_percentage + '%';
            
        }
        
    },
    
    // update the invidual chart of every key
    updateIndividualCharts : function () {
        
        var $ = ANIMATOR;
        
        // get standard components and values
        var canvas = NODE.individual_chart;
        var context = canvas.getContext('2d');
        var keys = $.individual_chart_keys;
        
        // return if no keys are selected
        if (keys == null) {
            canvas.width = 0;
            return;
        }
        
        var key_num = $.individual_chart_keys.length;;
        
        // reset canvas content, width and height
        canvas.width = _.getWidth(NODE.individual_chart_menu);
        canvas.height = 500 + (18 * (key_num - 1));
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // get total min and max values of the given columns (for y positions)
        var min = 0; // can't be higher than 0
        var max = Number.MIN_VALUE;
        // go through all keys
        for (var i = 0; i < key_num; i++) {
            // go through all data points
            for (var j = 0; j < $.data_point_num; j++) {
                var key = keys[i];
                var val = $.data[key][j];
                if (val < min) min = val;
                if (val > max) max = val;
            }
        }
        
        // define padding in canvas per side
        var padding = {
            top : 5,
            left : 5,
            bottom : 80,
            right : 5
        };
            
        // determine right-side labels with their respective lengths
        var label_font = '12px Arial sans-serif';
        var label_top = ANIMATOR.formatNumber(max) + '';
        var label_bottom = ANIMATOR.formatNumber(min) + '';
        context.font = label_font;
        var label_top_width = context.measureText(label_top).width;
        var label_bottom_width = context.measureText(label_bottom).width;
        
        // adjust right-side padding according to the longer text of the two
        var max_width = label_top_width;
        if (max_width < label_bottom_width) max_width = label_bottom_width;
        padding.right = padding.right + max_width + 15;
        
        // reserve more space at bottom for additional keys in the legend 
        padding.bottom = padding.bottom + 18 * key_num;
        
        // draw labels on right side
        for (var i = 0; i < 2; i++) {
            
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
        
        
        var width_minus_padding = canvas.width - padding.left - padding.right;
        var number_of_keys = (($.data_point_num - 1) / 50) + 1;
        
        // draw the raster
        for (var i = $.from; i <= $.to; i++) {
            
            /* RASTER LINES */
            
            // set drawing color
            context.strokeStyle = NAV.darkmode ? '#242424' : '#ededed';
            
            var x_pos = i == $.from ? 
                padding.left : padding.left + (width_minus_padding * ((i - $.from) / (number_of_keys - 1)));
            
            // draw line
            context.moveTo(x_pos, padding.top);
            context.lineTo(x_pos, canvas.height - padding.bottom);
        
            // draw on the canvas
            context.stroke();
            
            
            
            /* LABELS BOTTOM */
            
            var limited_labels = false; // labels limited to right and left-most limits (lines)
            
            // get text and width (in pixels)
            var text = i + '';
            var text_width = context.measureText(text).width;
            
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
        for (var i = 0; i < key_num; i++) {
            
            var key = keys[i];
            var color = $.columns[key].color; // color from column meter
            
            // draw graph for key
            $.drawIndividualKey(canvas, context, padding, color, min, max, $.data[key], key);
            
            // add key to legend
            var y_pos = canvas.height - padding.bottom + 66 + (18 * i);
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
            
            var width_ratio = ($.current + 1) / $.data_point_num; // how far to the right is the current point
            var x_pos = padding.left + width_minus_padding * width_ratio;
            
            context.moveTo(x_pos, padding.top);
            context.lineTo(x_pos, canvas.height - padding.bottom);
        
            // draw on the canvas
            context.stroke();
            
        }
        
    },
    
    drawIndividualKey : function (canvas, context, padding, color, min, max, data, key) {
        
        // set drawing attributes
        var point_radius = 2; // in pixels
        var width_minus_padding = canvas.width - padding.left - padding.right;
        var height_minus_padding = canvas.height - padding.top - padding.bottom;
        
        // get all key data points (excludes the 49 points generated between them by the program)
        var points = [];
        for (var i = 0; i <= ANIMATOR.data_point_num; i += 50) {
                
            // get x position of point
            var width_ratio = 0;
            if (i > 0) {
                // how far to the right is the current point
                width_ratio = i / (ANIMATOR.data_point_num - 1);
            }
            var x_pos = padding.left + width_minus_padding * width_ratio;
            
            // get y position of point
            var percentage_to_top = (((data[i] - min) / (max - min)) * 100);
            var y_pos = canvas.height - padding.bottom;
            y_pos -= height_minus_padding / (100 / percentage_to_top);
            
            // add point to array
            points[points.length] = {
                x : x_pos, 
                y : y_pos
            };
                
        }
        
        // get circle angles
        var start_angle = 0;
        var end_angle = 2 * Math.PI;
            
        // set drawing color
        context.strokeStyle = color;
        
        // draw all elements
        for (var i = 0; i < points.length; i++) {
            
            // get coordinates of current point
            var x = points[i].x;
            var y = points[i].y;

            // draw point
            context.beginPath();
            context.arc(x, y, point_radius, start_angle, end_angle);

            // draw on the canvas
            context.stroke();
            
            // draw line between point and next point (except if already reached last point)
            if (i != points.length - 1) {
                
                // get coordinates of next point
                var x_next = points[i + 1].x;
                var y_next = points[i + 1].y;
                
                context.moveTo(x, y);
                context.lineTo(x_next, y_next);
        
                // draw on the canvas
                context.stroke();
                
            }
                
        }
        
    }
    
}