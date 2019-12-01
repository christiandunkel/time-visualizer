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
            // set new focus chain, as only close btn is now visible in data load window
            FOCUS_CHAIN.set([NODE.data_load.close_btn]);
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
        
        // if index.html is run as a file on a local system
        if (window.location.protocol === 'file:') {
            
            // add error message to main page
            _.append(NODE.bar_chart, _.create('div.notice.blue', {
                'innerHTML': 'To load a data set, click on "<b>Load data</b>" in the menu.'
            }));
            
            return;
        }

        // otherwise, load example data set
        var request = FILE.loadURL('static/data/example-data-set.json', false);

        // on failed http request, load error messages
        request.onerror = function () {

            // add error message to main page
            _.append(NODE.bar_chart, _.create('div.notice.red', {
                'innerHTML': 'Loading the example data set failed. This might be, because of a weak internet connection.'
            }));

        };

    }
    
}

// on page load, initialize the framework
_.onLoad(window, MAIN.initialize);