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
        var request = DATA_LOAD.loadHttpDataSet('data/example-data-set.json', false);
        
        // on failed http request, load error messages
        request.onerror = MAIN.showXMLHttpWarnings;
        
    },
    
    showXMLHttpWarnings : function () {
        
        // error message on main page
        var error_msg = _.create('div.notice.red', {
            'innerHTML': '<b>Loading the example data set failed.</b><br />Are you running this project locally on your system? Try using the <i>Load data</i> button.'
        });
        _.append(NODE.column_chart, error_msg);

        // warning message in 'data load' window
        var warning = _.create('div.notice.blue', {
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