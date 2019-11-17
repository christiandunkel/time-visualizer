/** 
 * @module COMPARE_ITEMS 
 * @desc manages the 'compare items' window
 */
var COMPARE_ITEMS = {
    
    /* SELECTION MANAGEMENT */
    
    // current items selected for comparison
    ids : [],
    id_num : 0,
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc sets items ids to compare in line chart
     * @param {Array} ids - array of item ids (strings)
     */
    setItemIds : function (ids) {
        COMPARE_ITEMS.ids = ids;
        COMPARE_ITEMS.id_num = ids.length;
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc adds an items id to compare in line chart
     * @param {string} id - item id
     */
    addItemId : function (id) {
        
        if (!COMPARE_ITEMS.hasItemId(id)) {
            COMPARE_ITEMS.ids[COMPARE_ITEMS.id_num] = id;
            COMPARE_ITEMS.id_num++;            
        }
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc removes an items id, not to compare in line chart
     * @param {string} id - item id
     */
    removeItemId : function (id) {

        // go through all items and find indexes of the desired id
        var indexes = [];
        for (var i = 0; i < COMPARE_ITEMS.id_num; i++) {
            if (COMPARE_ITEMS.ids[i] === id) {
                indexes[indexes.length] = i;
            }
        }
        
        // remove the indexes from the array
        var len = indexes.length;
        for (var i = 0; i < len; i++) {
            COMPARE_ITEMS.ids = _.removeArrayIndex(COMPARE_ITEMS.ids, indexes[i]);
            COMPARE_ITEMS.id_num--;
        }
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc check if an item is set to be compared in line chart
     * @param {string} id - item id
     * @returns {boolean} true, if the item id is selected for comparison
     */
    hasItemId : function (id) {
        
        // check ids array for id
        for (var i = 0; i < COMPARE_ITEMS.id_num; i++) {
            if (COMPARE_ITEMS.ids[i] === id) {
                return true;
            }
        }
        
        return false;
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc resets item IDs selected for comparison in line chart
     */
    resetItemIds : function () {
        COMPARE_ITEMS.ids = [];
        COMPARE_ITEMS.id_num = 0;
    },
    
    
    
    /* WINDOW */
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc initializes the 'compare items' window
     */
    initialize : function () {
        
        // events to open and close 'compare items' window
        _.onClick(NODE.compare_btn, this.openWindow);
        _.onClick(NODE.compare_items.blur, this.closeWindow);
        _.onClick(NODE.compare_items.close_btn, this.closeWindow);
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc opens the 'compare items' window
     */
    openWindow : function () {
        
        if (typeof(COMPARE_ITEMS.HAVE_CREATED_BUTTONS) === 'undefined') {
            COMPARE_ITEMS.createButtons();
            COMPARE_ITEMS.HAVE_CREATED_BUTTONS = true;
        }
        
        // open window
        _.addClass(NODE.compare_items.window, 'visible');
        compare_items.window.setAttribute('aria-hidden', false);
        
        // clear areas and load current items
        COMPARE_ITEMS.orderButtons();
        
        // with a little delay, set tab focus on close button
        // if set immediately, will be ignored or buggy
        setTimeout(function () {
            NODE.compare_items.close_btn.focus();
        }, 100);
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc closes the 'compare items' window
     */
    closeWindow : function () {
        
        // close window
        _.removeClass(NODE.compare_items.window, 'visible');
        compare_items.window.setAttribute('aria-hidden', true);
        
        // reset tab focus back to 'data load' button in navigation
        NODE.compare_btn.focus();
        
    },
    
    
    
    /* BUTTON MANAGEMENT */
    
    // array of button HTML elements
    buttons : [],
    buttons_num : 0,
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc creates the buttons in the 'compare items' window
     */
    createButtons : function () {
        
        // empty item button containers
        _.empty(NODE.compare_items.selected_area);
        _.empty(NODE.compare_items.unselected_area);
        
        // add a button for every item to window
        for (var item_id in DATA.items) {
            
            var item = DATA.items[item_id];
            
            // create button
            var btn = _.create('button.comparison-item', {
                'item-id' : item_id,
                'innerHTML' : item.name,
                'style' : {
                    'background' : item.color
                }
            });
            
            // add click event for selecting / unselecting the item
            _.onClick(btn, COMPARE_ITEMS.moveButton);
            
            // add button to array
            COMPARE_ITEMS.buttons[COMPARE_ITEMS.buttons_num] = btn;
            COMPARE_ITEMS.buttons_num++;
            
        }
        
        COMPARE_ITEMS.orderButtons();
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc moves the buttons into the correct position in the window
     */
    orderButtons : function () {
        
        for (var i = 0; i < COMPARE_ITEMS.buttons_num; i++) {
            
            var btn = COMPARE_ITEMS.buttons[i];
            var item_id = btn.getAttribute('item-id');
            
            // check if item is included in list of items to be rendered
            var included = false;
            for (var j = 0; j < COMPARE_ITEMS.id_num; j++) {
                if (COMPARE_ITEMS.ids[j] === item_id) {
                    included = true;
                    break;
                }
            }
            
            // append button to right area in window
            if (included) {
                _.append(NODE.compare_items.selected_area, btn);
            }
            else {
                _.append(NODE.compare_items.unselected_area, btn);
            }
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc handles the click on buttons in window for (un-)selecting items for line chart
     * @param {event} e - click event
     */
    moveButton : function (e) {
        
        var btn = _.target(e);
        var item_id = btn.getAttribute('item-id');
        
        // check if the button's item needs to be included to or excluded from the 'item selection' array
        var include = false;
        if (btn.parentElement === NODE.compare_items.unselected_area) {
            include = true;
        }
        
        // move the button to the new container
        if (include) {
            COMPARE_ITEMS.addItemId(item_id);
            _.append(NODE.compare_items.selected_area, btn);
        }
        else {
            COMPARE_ITEMS.removeItemId(item_id);
            _.append(NODE.compare_items.unselected_area, btn);
        }
        
        ANIMATOR.refreshFrame();
        
    }
    
}