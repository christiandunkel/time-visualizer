/**
 * @module MAIN
 * @desc contains main methods to initialize the web app
 */
var MAIN = {
    
    /**
     * @function
     * @memberof module:MAIN
     * @desc takes a data set as a string, and initializes the web app with the values
     * @param {string} str - JSON data as string
     * @param {boolean} [showConfirmation=false] - on true, shows a message that a 'data set' was loaded in 'data load' window
     */
    initializeDataSet : function (str, showConfirmation) {
        
        // switch back to bar chart
        NAV.showBarChart();

        // generate an object from JSON string
        var obj = FILE.getObjectFromJSON(str);

        // reset old data and set new one
        COMPARE_ITEMS.resetItemIds();
        DATA.set(obj);

        // send it to VISUALIZER to create the charts
        VISUALIZER.createCharts();
        
        // show confirmation message in 'data load' window
        if (showConfirmation) {
            _.addClass(NODE.data_load.window, 'file-selected');
        }

        // refresh animator
        ANIMATOR.setCSSTransitions();
        ANIMATOR.end();
        ANIMATOR.refreshFrame();
        
    },
    
    /**
     * @function
     * @memberof module:MAIN
     * @desc initializes all components of the web app and loads example data set
     */
    initialize : function () {
    
        // load all parts
        NODE.initialize();
        NAV.initialize();
        DATA_LOAD.initialize();
        COMPARE_ITEMS.initialize();
        ANIMATOR.initialize();

        // load example data set
        var request = FILE.loadURL('data/example-data-set.json', false);

        // on failed http request, load error messages
        request.onerror = function () {

            // error message on main page
            var error_msg = _.create('div.notice.red', {
                'innerHTML': '<b>Loading the example data set failed.</b><br />Are you running this project locally on your system? Try using the <i>Load data</i> button.'
            });
            _.append(NODE.bar_chart, error_msg);

            // warning message in 'data load' window
            var warning = _.create('div.notice.blue', {
                'innerHTML': 'You may currently run this project locally on your computer. This restricts you to only load local data set files. You can\'t load online examples.',
                'style': {
                    'margin-bottom': '20px'
                }
            });
            _.empty(NODE.data_load.example_sets_area);
            _.append(NODE.data_load.example_sets_area, warning);

        };

    }
    
}

// on page load, initialize the framework
_.onLoad(window, MAIN.initialize);