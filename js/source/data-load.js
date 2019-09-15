/** 
 * @module DATA_LOAD
 * @desc manages the 'data load' window
 */
var DATA_LOAD = {
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc initializes the 'data load' window
     */
    initialize : function () {
        
        var $ = NODE.data_load;
        
        // add 'close window' events
        _.onClick($.blur, this.closeWindow);
        _.onClick($.close_btn, this.closeWindow);
        
        // initialize 'example data' buttons
        var btns = _.tag('button', $.example_sets_area);
        var btns_num = btns.length;
        for (var i = 0; i < btns_num; i++) {
            // buttons load data set from URL on click 
            _.onClick(btns[i], function (e) {
                
                // get button and file name
                var btn = _.target(e);
                var file_name = btn.getAttribute('load-data');
                var file_url = 'data/' + file_name + '.json';
                
                // try using the FileReaderAPI, as loadURL() uses a XMLHttpRequest, 
                // which won't work if index.html is loaded locally as a file in browser
                if (window.location.protocol === 'file:') {
                    MSG.error("Error. Use the 'file drop are' below.");
                    return;
                }
                
                // otherwise, if app is run on a server, use loadURL()
                FILE.loadURL(file_url, true);
                
                
            });
        }
        
        // initialize the drag'n'drop area for files in the window
        
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

        // send dropped file to FILE for processing
        _.addEvent($.drop_area, 'drop', function (e) {
            var file = DATA_LOAD.getDroppedFile(e);
            FILE.process(file);
        });
        
        // send selected file to FILE for processing
        _.addEvent($.select_file_input, 'change', function () {
            var file = this.files[0];
            FILE.process(file);
        });
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc opens the 'data load' window
     */
    openWindow : function () {
        
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
    closeWindow : function () {
        
        // close window
        _.removeClass(NODE.data_load.window, 'visible');
        
        // close 'file selected' message inside window
        _.removeClass(NODE.data_load.window, 'file-selected');
        
        // reset tab focus back to 'data load' button in navigation
        NODE.data_load_btn.focus();
        
    },
    
    /**
     * @function
     * @memberof module:FILE
     * @desc adds the 'highlight' effect to the file drop area
     */
    highlightDropArea : function () {
        _.addClass(NODE.data_load.drop_area, 'dragged-over');
    },
    
    /**
     * @function
     * @memberof module:FILE
     * @desc removes the 'highlight' effect from the file drop area
     */
    unhighlightDropArea : function () {
        _.removeClass(NODE.data_load.drop_area, 'dragged-over');
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc gets dropped file from a drop event
     * @param {event} e - drop event
     * @return {Object} file
     */
    getDroppedFile : function (e) {
        
        _.preventDefault(e);

        var hasItemsAPI = e.dataTransfer.items ? true : false;
        var items = e.dataTransfer[hasItemsAPI ? 'items' : 'files']; 
        var file = null;

        if (items.length > 1) {
            MSG.error('Do not drop multiple files!');
            return;
        }

        if (hasItemsAPI) {

            // exit, if it's not a file
            if (items[0].kind !== 'file') {
                MSG.error('Do only drop files!');
                return;
            }
            
            file = items[0].getAsFile();
        }
        else {
            file = items[0];
        }
        
        return file;
        
    }
    
}