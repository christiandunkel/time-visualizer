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
        
        // generate statistics
        VISUALIZER.generateStatistics();
        
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
            color   : obj.color
        };
        
        
        
        // generate HTML elements
        
        // main element
        var container = _.create('td.part-container', {
            'item-id' : item.id,
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
        
        
        
        // append elements to container
        _.append(percentage,    div_in_percentage);
        _.append(container,     percentage);
        _.append(container,     clickEvent);
        
        return {
            container           : container,
            percentage          : div_in_percentage
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
        
    },
    
    
    
    statistics : [],
     
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc generates full statistics HTML section
     */
    generateStatistics : function () {
        
        // reset statistics
        _.empty(NODE.statistics);
        VISUALIZER.statistics = [];
        
        
        // add items to array and sort them
        for (var item_id in DATA.items) {
            var obj = DATA.items[item_id];
            VISUALIZER.statistics.push({
                name    : obj.name,
                icon    : obj.icon,
                mean    : DATA.getMean(item_id),
                min     : DATA.getMin(item_id),
                max     : DATA.getMax(item_id)
            });
        }
        VISUALIZER.sortStatistics('max');
        
        
        // add sorting menu
        _.addClass(NODE.statistics, 'has-content');
        var sorting_text = _.create('p.sorting-text', {
            innerHTML: 'Sort by '
        });
        NODE.statistic_sort_btn = _.create('button', {
            innerHTML: 'Max'
        });
        _.append(sorting_text, NODE.statistic_sort_btn);
        _.prepend(NODE.statistics, sorting_text);
        
        
        // add click event for sorting button
        _.onClick(NODE.statistic_sort_btn, function () {
            
            var text = '';
            var type = NODE.statistic_sort_btn.innerHTML;
            
            switch (type) {
                case 'Max':
                    text = 'Min';
                    type = 'min';
                    break;
                    
                case 'Min':
                    text = 'Mean';
                    type = 'mean';
                    break;
                    
                case 'Mean':
                    text = 'Max';
                    type = 'max';
                    break;
            }
            
            NODE.statistic_sort_btn.innerHTML = text;
            VISUALIZER.sortStatistics(type);
            
        });
    
    },
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc generates a HTML element containing a HTML structure with statistical information about an item
     * @param {integer} index Index in statistics array
     * @param {string} dominant_metric Sorting metric by which the statistic is currently sorted
     * @returns {Object} HTML element
     */
    getStatisticPart : function (index, dominant_metric) {
        
        var item = VISUALIZER.statistics[index];
    
        var stat_container = _.create('div.statistic');
        var stat_icon = _.create('div.icon', {
            'style' : {
                'background-image' : 'url(' + item.icon + ')'
            }
        });
        var stat_name = _.create('div.name', {
            'innerHTML' : item.name
        });
        
        // generate description depending on dominant metric
        var description = '';
        switch (dominant_metric) {
            case 'max':
                description =
                '<b>Max:</b> ' + item.max.formatted + '<br>' +
                '<b>Min:</b> ' + item.min.formatted + '<br>' +
                '<b>Mean:</b> ' + item.mean.formatted;
                break;
            case 'min':
                description =
                '<b>Min:</b> ' + item.min.formatted + '<br>' +
                '<b>Max:</b> ' + item.max.formatted + '<br>' +
                '<b>Mean:</b> ' + item.mean.formatted;
                break;
            case 'mean':
                description =
                '<b>Mean:</b> ' + item.mean.formatted + '<br>' +
                '<b>Max:</b> ' + item.max.formatted + '<br>' +
                '<b>Min:</b> ' + item.min.formatted;
                break;
        }
        
        var stat_description = _.create('div.description', {
            'innerHTML' : description
        });

        _.append(stat_name, stat_icon);
        _.append(stat_container, stat_name);
        _.append(stat_container, stat_description);

        return stat_container;

    },
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc sorts items in statistic by a certain metric
     * @param {string} metric Sorting metric: min|max|mean
     */
    sortStatistics : function (metric) {
        
        // remove statistic parts
        var statistics = _.class('statistic', NODE.statistics);
        for (var i = statistics.length; i--;) {
            _.remove(statistics[i]);
        }
        
        // sort statistics array
        VISUALIZER.statistics.sort(function (a, b) {
            return a[metric].value < b[metric].value;
        });
        
        // re-add now-sorted statistic parts
        for (var i = 0; i < VISUALIZER.statistics.length; i++) {
            _.append(NODE.statistics, VISUALIZER.getStatisticPart(i, metric));
        }
        
    }
    
}