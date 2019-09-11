/** 
 * @module COMPARE_KEYS 
 * @desc manages the 'compare keys' window
 */
var COMPARE_KEYS = {
    
    /**
     * @function
     * @memberof module:COMPARE_KEYS
     * @desc initializes the 'compare keys' window
     */
    initialize : function () {
        
        // events to open and close 'compare keys' window
        _.onClick(NODE.compare_btn, this.openWindow);
        _.onClick(NODE.compare_selection.blur, this.closeWindow);
        _.onClick(NODE.compare_selection.close_btn, this.closeWindow);
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_KEYS
     * @desc opens the 'compare keys' window
     */
    openWindow : function () {
        
        if (typeof(COMPARE_KEYS.HAVE_CREATED_BUTTONS) === 'undefined') {
            COMPARE_KEYS.createButtons();
            COMPARE_KEYS.HAVE_CREATED_BUTTONS = true;
        }
        
        // open window
        _.addClass(NODE.compare_selection.window, 'visible');
        
        // clear areas and load current keys
        COMPARE_KEYS.orderButtons();
        
        // with a little delay, set tab focus on close button
        // if set immediately, will be ignored or buggy
        setTimeout(function () {
            NODE.compare_selection.close_btn.focus();
        }, 100);
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_KEYS
     * @desc closes the 'compare keys' window
     */
    closeWindow : function () {
        
        // close window
        _.removeClass(NODE.compare_selection.window, 'visible');
        
        // reset tab focus back to 'data load' button in navigation
        NODE.compare_btn.focus();
        
    },
    
    // array of button HTML nodes
    buttons : [],
    buttons_num : 0,
    
    /**
     * @function
     * @memberof module:COMPARE_KEYS
     * @desc creates the buttons in the 'compare keys' window
     */
    createButtons : function () {
        
        // empty key button containers
        _.empty(NODE.compare_selection.selected_keys);
        _.empty(NODE.compare_selection.unselected_keys);
        
        // add button for every key to window
        for (var key in ANIMATOR.data) {
            
            // create button
            var btn = _.create('button.comparison-key', {
                'key-id' : key,
                'innerHTML' : ANIMATOR.columns[key].name,
                'style' : {
                    'background' : ANIMATOR.columns[key].color
                }
            });
            
            // add event to select / unselect key
            _.onClick(btn, COMPARE_KEYS.moveButton);
            
            // add to buttons array
            this.buttons[this.buttons.length] = btn;
            this.buttons_num++;
            
        }
        
        this.orderButtons();
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_KEYS
     * @desc moves the buttons into the correct position in the 'compare keys' window
     */
    orderButtons : function () {
        
        for (var i = 0; i < this.buttons_num; i++) {
            
            var btn = this.buttons[i];
            var key = btn.getAttribute('key-id');
            var len = ANIMATOR.individual_chart_keys.length;
            
            // check if key is included in list of keys to be rendered
            var included = false;
            for (var j = 0; j < len; j++) {
                if (ANIMATOR.individual_chart_keys[j] === key) {
                    included = true;
                    break;
                }
            }
            
            // append button to right box
            var container_class = (included ? '' : 'un') + 'selected_keys';
            _.append(NODE.compare_selection[container_class], btn);
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_KEYS
     * @desc handles the click on buttons in 'compare keys' window, and selects or unselects the corresponding key for comparison in 'individual chart'
     * @param {event} e - click event
     */
    moveButton : function (e) {
        
        var btn = _.target(e);
        var key = btn.getAttribute('key-id');
        
        // check if the button's key needs to be included to or excluded from the 'key selection' array
        var include = false;
        if (_.hasClass(btn.parentElement, 'unselected-keys')) {
            include = true;
        }
        
        // move the button to the new container
        if (include) {
            ANIMATOR.addIndividualKey(key);
            _.append(NODE.compare_selection['selected_keys'], btn);
        }
        else {
            ANIMATOR.removeIndividualKey(key);
            _.append(NODE.compare_selection['unselected_keys'], btn);
        }
        
        ANIMATOR.refreshFrame();
        
    }
    
}