/** 
 * @module VISUALIZER
 * @desc generates HTML elements for charts  
 */
var VISUALIZER = {
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc creates the HTML elements needed for the charts using current DATA
     */
    createCharts : function () {
        
        // un-hide ratio chart
        _.removeClass(NODE.ratio_chart_total, 'hidden');
        _.removeClass(NODE.ratio_chart_container, 'hidden');
        
        // load information into data set header
        var info                = NODE.data_set_info;
        info.title.innerHTML    = DATA.name;
        info.date.innerHTML     = DATA.date;
        
        // remove elements in bar and ratio charts
        _.empty(NODE.bar_chart);
        _.empty(NODE.ratio_chart);
        
        // go through all items
        for (var item_id in DATA.items) {
           
            // skip if is prototype property
            if (!DATA.items.hasOwnProperty.call(DATA.items, item_id)) {
                continue;
            }
            
            // initialize reference array for HTML elements generated for item in charts
            DATA.html[item_id] = {};
            
            // create a bar for bar chart
            var bar = VISUALIZER.getBar(item_id);
            _.append(NODE.bar_chart, bar.container);
            
            // save references to HTML elements of bar
            DATA.html[item_id].bar_chart = bar;
            
            // create a ratio part for ratio chart
            var ratio_part = VISUALIZER.getRatioPart(item_id);
            _.append(NODE.ratio_chart, ratio_part.container);
            
            // save references to HTML elements of ratio part
            DATA.html[item_id].ratio_chart = ratio_part;
            
        }
        
        // un-hide the 'data-set-current-value' HTML element
        _.removeClass(NODE.current_value.container, 'hidden');
        
    },
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc generates HTML element for a item in the bar chart
     * @param {string} item_id
     * @returns {Object} multiple HTML elements in object
     */
    getBar : function (item_id) {
        
        // get item values
        var obj = DATA.items[item_id];
        var item = {
            id              : item_id,
            name            : obj.name,
            name_escaped    : obj.name_escaped,
            icon            : obj.icon,
            color           : obj.color
        };
        
        
        
        // generate HTML elements
        
        // bar
        var container = _.create('button.bar-container');
        var bar = _.create('div.bar');
        var meter = _.create('div.meter', {
            'style' : {
                'background-color' : item.color
            }
        });
        var name = _.create('div.name', {
            'innerHTML' : item.name
        });
        var value = _.create('div.value');
        
        // overlay click event (opens line chart for item on click)
        var clickEvent = _.create('div.clickEvent', {
            'title' : 'Open line chart for ' + item.name_escaped,
            'item-id' : item.id
        });
        _.onClick(clickEvent, VISUALIZER.openLineChartOnClick);
        
        // icon left of bar
        var icon = _.create('div.icon', {
            'style' : {
                'background-image' : 'url(' + item.icon + ')'
            }
        });
        
        
        
        // append elements to container
        _.append(meter,     name);
        _.append(meter,     value);
        _.append(bar,       meter);
        _.append(container, icon);
        _.append(container, bar);
        _.append(container, clickEvent);
        
        return {
            container   : container,
            meter       : meter,
            value       : value
        };
        
    },
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc generates HTML element for item in ratio chart
     * @param {string} item_id
     * @returns {Object} multiple HTML elements in object
     */
    getRatioPart : function (item_id) {
        
        // get item values
        var obj = DATA.items[item_id];
        var item = {
            id      : item_id,
            name    : obj.name,
            icon    : obj.icon,
            color   : obj.color,
            mean    : DATA.getMean(item_id),
            min     : DATA.getMin(item_id),
            max     : DATA.getMax(item_id)
        };
        
        
        
        // generate HTML elements
        
        // main element
        var container = _.create('td.part-container', {
            'style' : {
                'background-color' : item.color
            }
        });
        var percentage          = _.create('div.percentage');
        var div_in_percentage   = _.create('div');
        
        // overlay click event (opens line chart for item on click)
        var clickEvent = _.create('button.clickEvent', {
            'title'     : 'Open line chart for ' + item.name,
            'item-id'   : item.id
        });
        _.onClick(clickEvent, VISUALIZER.openLineChartOnClick);
        
        // tooltip
        var tooltip             = _.create('div.tooltip');
        var tooltip_percentage  = _.create('div.tooltip-percentage');
        var tooltip_icon = _.create('div.icon', {
            'style' : {
                'background-image' : 'url(' + item.icon + ')'
            }
        });
        var tooltip_name = _.create('div.name', {
            'innerHTML' : item.name
        });
        var tooltip_description = _.create('div.description', {
            'innerHTML' : '<b>Mean:</b> ' + item.mean.formatted + '<br>' +
                          '<b>Min:</b> ' + item.min.formatted + '<br>' +
                          '<b>Max:</b> ' + item.max.formatted
        });
        
        
        
        // append elements to container
        _.append(tooltip,       tooltip_icon);
        _.append(tooltip,       tooltip_percentage);
        _.append(tooltip,       tooltip_name);
        _.append(tooltip,       tooltip_description);
        _.append(container,     tooltip);
        _.append(percentage,    div_in_percentage);
        _.append(container,     percentage);
        _.append(container,     clickEvent);
        
        return {
            container           : container,
            percentage          : div_in_percentage,
            tooltip             : tooltip,
            tooltip_percentage  : tooltip_percentage
        };
        
    },
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc called by a click event to open a specific line chart
     * @param {e} event - click event
     */
    openLineChartOnClick : function (e) {
        
        // get item id
        var item_id = _.target(e).getAttribute('item-id');
        COMPARE_ITEMS.setItemIds([item_id]);
        
        // open line chart
        NAV.showLineChart();
        
    }
    
}