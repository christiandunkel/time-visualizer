/**
 * @file manages the window, that allows selecting keys that are to be compared in the individual chart
 * @license https://github.com/christiandunkel/time-visualizer/blob/master/LICENSE.md
 */

/** @module COMPARE */
var COMPARE = {
    
    /**
     * @function
     * @memberof module:COMPARE
     * @desc initializes the 'compare keys' window
     */
    initialize : function () {
        
        // add event to open 'compare selection' window
        _.addClick(NODE.compare_btn, this.open);
        
        // add 'close window' events
        _.addClick(NODE.compare_selection.blur, this.close);
        _.addClick(NODE.compare_selection.close_btn, this.close);
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE
     * @desc opens the 'compare keys' window
     */
    open : function () {
        
        // open window
        _.addClass(NODE.compare_selection.window, 'visible');
        
        // clear areas and load current keys
        _.empty(NODE.compare_selection.unselected_keys);
        _.empty(NODE.compare_selection.selected_keys);
        COMPARE.loadKeys();
        
        // with a little delay, set tab focus on close button
        // if set immediately, will be ignored or buggy
        setTimeout(function () {
            NODE.compare_selection.close_btn.focus();
        }, 100);
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE
     * @desc closes the 'compare keys' window
     */
    close : function () {
        
        // close window
        _.removeClass(NODE.compare_selection.window, 'visible');
        
        // reset tab focus back to 'data load' button in navigation
        NODE.compare_btn.focus();
        
    },
    
    
    /**
     * @function
     * @memberof module:COMPARE
     * @desc handles the click on buttons in 'compare keys' window, and selects or unselects the corresponding key for comparison in 'individual chart'
     * @param {event} e - click event
     */
    moveKey : function (e) {
        
        var btn = _.target(e);
        var key = btn.getAttribute('key-id');
        
        // check if the button's key needs to be included to or excluded from the 'key selection' array
        var include = false;
        if (_.hasClass(btn.parentElement, 'unselected-keys')) {
            include = true;
        }
        
        if (include) {
            ANIMATOR.addIndividualKey(key);
        }
        else {
            ANIMATOR.removeIndividualKey(key);
        }
        
        COMPARE.loadKeys();
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE
     * @desc loads the buttons in the right position in the 'compare keys' window
     */
    loadKeys : function () {
        
        // empty key button containers
        _.empty(NODE.compare_selection.selected_keys);
        _.empty(NODE.compare_selection.unselected_keys);
        
        // add key buttons
        for (var key in ANIMATOR.data) {
            
            // check if key is included in list of keys to be rendered
            var included = false;
            var len = ANIMATOR.individual_chart_keys.length;
            for (var i = 0; i < len; i++) {
                if (ANIMATOR.individual_chart_keys[i] === key) {
                    included = true;
                    break;
                }
            }
            
            // create button
            var btn = _.create('button.comparison-key', {
                'key-id' : key,
                'innerHTML' : ANIMATOR.columns[key].name,
                'style' : {
                    'background' : ANIMATOR.columns[key].color
                }
            });
            
            // add event to select / unselect key
            _.addClick(btn, COMPARE.moveKey);
            
            // append button to right box
            _.append(NODE.compare_selection[(included ? '' : 'un') + 'selected_keys'], btn);
            
        }
        
        ANIMATOR.refreshFrame();
        
    }
    
}