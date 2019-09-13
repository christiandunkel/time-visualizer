/**
 * @module ANIMATOR
 * @desc animates the charts in respect to the elapsed time
 */
var ANIMATOR = {
    
    is_running : false,
    speed : 1.0,
    
    // current update tick (frame)
    tick : 0,
    
    // holds update loop interval
    loop : null,
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc initializes the animator
     */
    initialize : function () {
        
        // canvas needs to be updated on size changes
        _.addEvent(window, 'resize', function () {
            if (NAV.line_chart_opened) {
                ANIMATOR.refreshFrame();
            }
        });
        
    },
    
    
    
    /* SETTER */
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc sets the speed of the animation
     * @param {number} speed
     */
    setSpeed : function (speed) {
        
        this.speed = speed;
        
        // update loop to new speed if it's currently running
        if (this.is_running) {
            this.stopLoop();
            this.startLoop();
        }
        
        // updated length of transition effects on animated HTML elements
        this.setCSSTransitions();
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc sets CSS transition duration of animated HTML elements
     */
    setCSSTransitions : function () {
        
        var duration = ((1 / this.speed) / 5) + 's';
        
        // go through all items
        for (var item_id in DATA.html) {
            
            var item = DATA.html[item_id];
            
            // bar chart
            _.setStyles(item.bar_chart.meter, {
                'transition': duration
            });
            
            // ratio chart
            _.setStyles(item.ratio_chart.container, {
                'transition': duration
            });
            
        }
        
        // transition of time indicator
        _.setStyles(NODE.current_value.indicator, {
            'transition': duration
        });
        
    },
    
    
    
    /* CONTROLS */
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc starts the animation loop
     */
    startLoop : function () {
        
        // milliseconds between updates
        var interval = 80 / ANIMATOR.speed;
        
        // start update loop
        ANIMATOR.loop = setInterval(ANIMATOR.update, interval);
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc stops the animation loop
     */
    stopLoop : function () {
        
        // stop update loop
        clearInterval(ANIMATOR.loop);
        ANIMATOR.loop = null;
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc starts the animation
     */
    play : function () {
        
        ANIMATOR.is_running = true;
        
        // set classes for use in CSS styles
        _.removeClass(NODE.html, 'animation-paused');
        _.addClass(NODE.html, 'animation-playing');
        
        ANIMATOR.startLoop();
        
        MSG.show('Started animation.', 1000);
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc pauses the animation
     */
    pause : function () {
        
        ANIMATOR.is_running = false;
        
        // set classes for use in CSS styles
        _.removeClass(NODE.html, 'animation-playing');
        _.addClass(NODE.html, 'animation-paused');
        
        ANIMATOR.stopLoop();
        
        MSG.show('Paused animation.', 1000);
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc restarts the animation
     */
    restart : function () {
        ANIMATOR.tick = 0;
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc stops animation without resetting, freezes it in last frame (no 'unpause' possible)
     */
    end : function () {
        
        // stop animation
        ANIMATOR.is_running = false;
        ANIMATOR.tick = 0;
        
        // set classes for use in CSS styles
        _.removeClass(NODE.html, 'animation-playing');
        _.addClass(NODE.html, 'animation-paused');
        
        ANIMATOR.stopLoop();
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc stops animation and resets it to start state
     */
    stop : function () {
        
        if (ANIMATOR.tick > 1) {
            MSG.show('Stopped animation.', 1000);
        }
        
        // end animation and reset current frame to start state
        ANIMATOR.end();
        ANIMATOR.update();
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc called by loop every frame and starts the animation pipeline
     */
    update : function () {
        
        // never run on empty data object
        if (_.isEmptyObject(DATA.upscaled)) {
            return;
        }
        
        // reset after one full round
        if (ANIMATOR.tick >= DATA.upscaled_num) {
            ANIMATOR.end();
            return;
        }
        
        ANIMATOR.refreshFrame();
        
        ANIMATOR.tick++;
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc refreshes rendered frame
     */
    refreshFrame : function () {
        
        // set current value
        if (ANIMATOR.tick % 50 == 0) {
            var curr_val = parseInt(DATA.from) + (ANIMATOR.tick == 0 ? 0 : ANIMATOR.tick / 50);
            NODE.current_value.value.innerHTML = curr_val;
            NODE.current_value.indicator.innerHTML = curr_val;
        }
        // set current indicator's width
        _.setStyles(NODE.current_value.indicator, {
            'width': (ANIMATOR.tick % 50 * 2) + '%'
        });
        
        // check what chart to update
        if (NAV.line_chart_opened) {
            ANIMATOR.updateLineChart();
        }
        else {
            ANIMATOR.sortItems();
            ANIMATOR.updateBarChart();
            ANIMATOR.updateRatioChart();
        }
        
    },
    
    // array with items sorted by their current value in tick
    items_sorted : [],
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc sorts items by their current value in tick
     */
    sortItems : function () {
        
        ANIMATOR.items_sorted = [];
        
        var unsorted = [];
        var index = -1;
        
        for (var item_id in DATA.items) {
            
            index++;
            
            // get item id-value pairs
            unsorted[index] = {
                'id'    : item_id,
                'value' : DATA.upscaled[item_id][ANIMATOR.tick]
            };
            
        }
        
        ANIMATOR.items_sorted = _.sortArrayObjects(unsorted, 'value', true);
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc updates 'bar chart' values for current frame
     */
    updateBarChart : function () {
        
        // current frame
        var tick = ANIMATOR.tick;
        
        // get total min and max for tick
        var max = DATA.getTotalMax(tick);
        var min = DATA.getTotalMin(tick);
        // min must be 0 at least
        if (min < 0) {
            min = 0;
        }
        var diff = max - min;
        
        // for all items
        for (var item_id in DATA.items) {
            
            // get current value
            var curr = DATA.upscaled[item_id][tick];
            var formatted = DATA.formatted[item_id][tick];
            
            // update HTML elements
            var bar_chart = DATA.html[item_id].bar_chart;
            bar_chart.value.innerHTML = formatted;
            
            // set bar length
            _.setStyles(bar_chart.meter, {
                // (max - min) * width + min = curr
                'width' : (((curr - min) / (max - min)) * 100) + "%" 
            });
            
        }
        
        
        
        // order bars
        for (var i = 0; i < DATA.item_num; i++) {

            var item_id = ANIMATOR.items_sorted[i].id;
            var container = DATA.html[item_id].bar_chart.container;
            
            // position order of HTML element
            var position = DATA.items[item_id].position;
            
            // distance from one bar to another in bar chart
            var pixel_dist = 52;
        
            // move bar to its new position    
            _.setStyles(container, {
                'transform': 'translate(0, ' + ((i - position) * pixel_dist) + 'px)'
            });
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc updates 'ratio chart' values for current tick
     */
    updateRatioChart : function () {
        
        // get total of all data point values at current tick (index)
        var total = DATA.total[ANIMATOR.tick];
        // write value above ratio chart
        NODE.ratio_chart_total.innerHTML = DATA.formatNumber(total);
        
        // go through items in ratio chart (reversed order)
        for (var i = DATA.item_num - 1; i >= 0; i--) {
            
            // get item id by order
            var item_id = ANIMATOR.items_sorted[i].id;
            var item_data_point = DATA.upscaled[item_id][ANIMATOR.tick];
            var percentage = 100 / (total / item_data_point);
            var ratio_chart = DATA.html[item_id].ratio_chart;
            
            // filter out percentages smaller than 0.2%
            if (percentage < 0.2) {
                _.addClass(ratio_chart.container, 'hidden');
                continue;
            }
            else {
                _.removeClass(ratio_chart.container, 'hidden');
            }
            
            // place item in ratio chart in new position
            _.append(NODE.ratio_chart, ratio_chart.container);
            
            // make item as wide as percentage
            _.setStyles(ratio_chart.container, {
                'width' : percentage + '%'
            });
            
            // display percentage value on item
            var rounded = percentage.toFixed(1) + '%';
            ratio_chart.percentage.innerHTML            = rounded;
            ratio_chart.tooltip_percentage.innerHTML    = rounded;
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc updates 'individual chart' for current frame
     */
    updateLineChart : function () {
        
        // get components
        var canvas      = NODE.line_chart;
        var context     = canvas.getContext('2d');
        
        // get items to display
        var item_ids    = COMPARE_ITEMS.ids;
        var item_num    = COMPARE_ITEMS.id_num;
        
        // return if no items are selected
        if (item_num == 0) {
            canvas.width = 0;
            return;
        }
        
        // reset canvas content, width and height
        canvas.width    = _.getWidth(NODE.line_chart_menu);
        canvas.height   = 500 + (18 * (item_num - 1));
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // get total min and max values of selected items
        var min = 0; // can't be higher than 0
        var max = Number.MIN_VALUE;
        for (var i = 0; i < item_num; i++) {
            var id = item_ids[i];
            var id_min = DATA.getMin(id).value;
            if (id_min < min) {min = id_min;}
            var id_max = DATA.getMax(id).value;
            if (id_max > max) {max = id_max;}
        }
        
        // define padding on canvas
        var padding = {
            top     : 5,
            left    : 5,
            // extra space for every item in legend at bottom
            bottom  : 80 + (18 * item_num), 
            right   : null
        };
        
        
        
        /* LABELS RIGHT */
            
        // determine right-side labels with their respective lengths
        var label_font          = '12px Arial sans-serif';
        var label_top           = DATA.formatNumber(max) + '';
        var label_bottom        = DATA.formatNumber(min) + '';
        context.font            = label_font;
        var label_top_width     = context.measureText(label_top).width;
        var label_bottom_width  = context.measureText(label_bottom).width;
        
        // adjust right-side padding according to the longer text of the two
        padding.right = label_top_width;
        if (padding.right < label_bottom_width) {
            padding.right = label_bottom_width;
        }
        padding.right += 15;
        console.log(padding.right);
        
        // draw right-side labels
        var label_xpos = canvas.width - padding.right + 5;
        for (var i = 0; i < 2; i++) {
            
            var label_text = i == 0 ? label_top : label_bottom;
            var label_ypos = i == 0 ? padding.top : canvas.height - padding.bottom;
            
            // prepare label text
            context.font            = label_font;
            context.fillStyle       = NAV.darkmode ? '#767676' : '#b5b5b5';
            context.textBaseline    = i == 0 ? 'top' : 'bottom';
            context.textAlign       = 'left';
            context.fillText(label_text, label_xpos, label_ypos);

            // draw labels on canvas
            context.stroke();
            
        }
        
        
        
        /* RASTER & LABELS BOTTOM */
        
        var width_minus_padding = canvas.width - padding.left - padding.right;
        var label_y_pos         = canvas.height - padding.bottom + 20;
        
        // draw the raster
        for (var i = DATA.from; i <= DATA.to; i++) {
            
            // draw raster line
            var raster_color    = NAV.darkmode ? '#242424' : '#ededed';
            var raster_x_pos    = i == DATA.from ? padding.left : 
            padding.left + (width_minus_padding * ((i - DATA.from) / (DATA.fixed_num - 1)));
            var raster_y1_pos   = padding.top;
            var raster_y2_pos   = canvas.height - padding.bottom;
            context.strokeStyle = raster_color;
            context.moveTo(raster_x_pos, raster_y1_pos);
            context.lineTo(raster_x_pos, raster_y2_pos);
            context.stroke();
            
            
            
            // get text and text width (in pixels)
            var text = i + '';
            var text_width = context.measureText(text).width;
            
            // check if labels should be limited to right and left-most lines
            var limited_labels = false;
            
            // cancel, if label text is too big too display
            if (text_width > 100) {
                continue;
            }
            
            // check if text is too big, so it will only be displayed at limits
            if (text_width > 35) {
                limited_labels = true;
            }
            // if text is well-sized, check window size (in pixels)
            else if (window.innerWidth <= 550) {
                limited_labels = true;
            }
            
            // if labels are limited to only right and left-most limits,
            // but current label is located somewhere in between -> cancel
            if (limited_labels && 
                DATA.from != i && 
                DATA.to != i) {
                continue;
            }
                
            // draw label at bottom of raster
            context.font            = label_font;
            context.fillStyle       = NAV.darkmode ? '#767676' : '#b5b5b5';
            context.textBaseline    = 'bottom';
            context.textAlign       = (i == DATA.from ? 'left' : 
                                      (i == DATA.to ? 'right' : 'center'));
            context.fillText(text, raster_x_pos, label_y_pos);
            context.stroke();
            
        }
        
        
        
        /* GRAPH & LEGEND */
        
        // draw legend headline
        var legend_font         = 'Arial sans-serif';
        var legend_text_color   = NAV.darkmode ? '#767676' : '#b5b5b5';
        var legend_x_pos        = padding.left;
        var legend_y_pos        = canvas.height - padding.bottom + 50;
        context.font            = '14px ' + legend_font;
        context.fillStyle       = legend_text_color;
        context.textBaseline    = 'middle';
        context.textAlign       = 'left';
        context.fillText('Legend', legend_x_pos, legend_y_pos);
        context.stroke();
        
        // go through all items
        for (var i = 0; i < item_num; i++) {
            
            var item_id = COMPARE_ITEMS.ids[i];
            
            // draw graph for item
            ANIMATOR.drawLineGraph(canvas, context, padding, item_id, min, max);
            
            // draw item in legend
            var item_name           = DATA.items[item_id].name_escaped;
            var item_x_pos          = padding.left + 20;
            var item_y_pos          = canvas.height - padding.bottom + 66 + (18 * i);
            context.font            = '12px ' + legend_font;
            context.fillStyle       = legend_text_color;
            context.textBaseline    = 'top';
            context.textAlign       = 'left';
            context.fillText(item_name, item_x_pos, item_y_pos);
            context.stroke();
            
            // add colored rectangle in front of the item in legend
            var rect_color          = DATA.items[item_id].color;
            var rect_x_pos          = padding.left + 4;
            context.fillStyle       = rect_color;
            context.fillRect(rect_x_pos, item_y_pos, 10, 10);
            context.stroke();
            
        }
        
        
        
        /* TIME INDICATOR LINE */
        
        // if animated is not at start or end
        if (ANIMATOR.tick != 0 && 
            ANIMATOR.tick != DATA.upscaled_num - 1) {
            
            // how far to the right must the line be proportinal to the tick
            var width_ratio = (ANIMATOR.tick + 1) / DATA.upscaled_num;
            var line_x_pos  = padding.left + width_minus_padding * width_ratio;
            var line_y1_pos = padding.top;
            var line_y2_pos = canvas.height - padding.bottom;
            
            // draw line on the canvas
            context.strokeStyle = '#ac6161';
            context.moveTo(line_x_pos, line_y1_pos);
            context.lineTo(line_x_pos, line_y2_pos);
            context.stroke();
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc draws a line graph for an item on the line chart
     * @param {Object} canvas - HTML node to drawing canvas
     * @param {Object} context - Context of drawing canvas
     * @param {Object} padding - Object holds 4 numbers for the padding on each site of the canvas
     * @param {string} item_id
     * @param {number} min - smallest value of all items displayed in line chart
     * @param {number} max - biggest value of all items displayed in line chart
     */
    drawLineGraph : function (canvas, context, padding, item_id, min, max) {
        
        // get attributes
        var color                   = DATA.items[item_id].color;
        var circle_angle            = 2 * Math.PI;
        var circle_radius           = 2; // in pixels
        var width_minus_padding     = canvas.width - padding.left - padding.right;
        var height_minus_padding    = canvas.height - padding.top - padding.bottom;
        
        // get points intersecting the raster lines (using fixed data)
        var points = [];
        for (var i = 0; i < DATA.fixed_num; i++) {
                
            // get x position of point
            var width_ratio = i == 0 ? 0 : i / (DATA.fixed_num - 1);
            var x_pos = padding.left + width_minus_padding * width_ratio;
            
            // get y position of point
            var percentage_to_top = (((DATA.fixed[item_id][i] - min) / (max - min)) * 100);
            var y_pos = canvas.height - padding.bottom;
            y_pos -= height_minus_padding / (100 / percentage_to_top);
            
            // add point to array
            points[points.length] = {
                x : x_pos, 
                y : y_pos
            };
                
        }
            
        // set drawing color
        context.strokeStyle = color;
        
        // draw all points for graph
        for (var i = 0; i < points.length; i++) {
            
            // current point
            var x_pos = points[i].x;
            var y_pos = points[i].y;

            // draw a circle at point (is always intersection with raster)
            context.beginPath();
            context.arc(x_pos, y_pos, circle_radius, 0, circle_angle);
            context.stroke();
            
            // draw line between point and next point,
            // except if already reached last point
            if (i != points.length - 1) {
                
                // get coordinates of next point
                var x_next = points[i + 1].x;
                var y_next = points[i + 1].y;
                
                // draw line inbetween
                context.moveTo(x_pos, y_pos);
                context.lineTo(x_next, y_next);
                context.stroke();
                
            }
                
        }
        
    }
    
}