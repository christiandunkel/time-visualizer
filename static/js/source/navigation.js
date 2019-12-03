/** 
 * @module FOCUS_CHAIN 
 * @desc manages chains of elements that can be focussed via the tab key (hijacks the tab key event, and prevents normal focussing via browser)
 */
var FOCUS_CHAIN = {
    
    selection_type : 0,
    // 0: unselected
    // 1: by elems array
    // 2: by start_elem, end_elem and elems_container
    
    // for selection type 1, elements in focuschain
    elems : [],
    // for selection type 2:
    start_elem : null,
    end_elem : null,
    elems_container : null,
    
    /**
     * @function
     * @memberof module:FOCUS_CHAIN
     * @desc checks if the focus chain is currently active
     * @returns {boolean} true, if the focus chain is active
     */
    isActive : function () {
        return selection_type === 0;
    },
    
    /**
     * @function
     * @memberof module:FOCUS_CHAIN
     * @desc sets elements as a focus chain
     * @param {Array|Object} a - either array of HTML elements or object: {
     *      start : HTML element  (start of chain)
     *      end : HTML element (end of chain)
     *      container : HTML element (contains all focussable elements in chain)
     * }
     */
    set : function (input) {
        
        FOCUS_CHAIN.reset();
        
        // remove focus from element that currently has focus
        document.activeElement.blur();
        
        if (_.isArray(input)) {
            FOCUS_CHAIN.selection_type = 1;
            FOCUS_CHAIN.elems = input;
        }
        else {
            FOCUS_CHAIN.selection_type = 2;
            FOCUS_CHAIN.start_elem = input.start;
            FOCUS_CHAIN.end_elem = input.end;
            FOCUS_CHAIN.elems_container = input.container;
        }
        
        _.addEvent(window, 'keydown', FOCUS_CHAIN.event);
        
    },
    
    /**
     * @function
     * @memberof module:FOCUS_CHAIN
     * @desc removes the current focus chain
     */
    reset : function () {
        
        FOCUS_CHAIN.selection_type = 0;
        // reset stuff for selection type 1
        FOCUS_CHAIN.elems = [];
        // reset stuff for selection type 2
        FOCUS_CHAIN.start_elem = null;
        FOCUS_CHAIN.end_elem = null;
        FOCUS_CHAIN.elems_container = null;
        
        _.removeEvent(window, 'keydown', FOCUS_CHAIN.event);
        
    },
    
    /**
     * @function
     * @memberof module:FOCUS_CHAIN
     * @desc event function that hijacks the tab key event and sets the focus depending on the user's current position in the focus chain 
     * @param {event} e - keydown event
     */
    event : function (e) {
        
        // tab key was pressed
        if (e.keyCode == 9) {
            
            var is_backwards_tab = (e.shiftKey === true);
            
            // handle selection
            if (FOCUS_CHAIN.selection_type == 1) {
                FOCUS_CHAIN.handleSelectionType1(e, is_backwards_tab);
            }
            else {
                FOCUS_CHAIN.handleSelectionType2(e, is_backwards_tab);
            }
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:FOCUS_CHAIN
     * @desc handles setting the user focus if the focus chain consists of an array of elements
     * @param {event} e - keydown event
     * @param {boolean} go_backwards - if the focus go forward or backwards in focus chain
     */
    handleSelectionType1 : function (e, go_backwards) {
        
        // needs at least one element in chain
        if (FOCUS_CHAIN.elems.length < 1) {
            return;
        }
        // if multiple elems, focus chain can work, so prevent default focus change by browser
        else {
            e.preventDefault();
        }
            
        // only check for next focus element, if there's at least two elems
        if (FOCUS_CHAIN.elems.length != 1) {
            // find currently focussed element in chain, and focus on next in line
            for (var i = FOCUS_CHAIN.elems.length; i--;) {
                
                if (document.activeElement == FOCUS_CHAIN.elems[i]) {

                    // last element is in focus
                    if (i == FOCUS_CHAIN.elems.length - 1) {
                        // if going backwards, focus on before-last elem
                        if (go_backwards) {
                            FOCUS_CHAIN.elems[FOCUS_CHAIN.elems.length - 2].focus();
                        }
                        // if going forwards, focus on first elem
                        else {
                            FOCUS_CHAIN.elems[0].focus();
                        }
                    }
                    // first element is in focus
                    else if (i == 0) {
                        // if going backwards, focus on last elem
                        if (go_backwards) {
                            FOCUS_CHAIN.elems[FOCUS_CHAIN.elems.length - 1].focus();
                        }
                        // if going forwards, focus on next (second) elem
                        else {
                            FOCUS_CHAIN.elems[1].focus();
                        }
                    }
                    else {
                        // if going backwards, focus on previous
                        if (go_backwards) {
                            FOCUS_CHAIN.elems[i-1].focus();
                        }
                        // if going forwards, focus on next
                        else {
                            FOCUS_CHAIN.elems[i+1].focus();
                        }
                    }

                    return;
                }
                
            }
        }

        // if no element in chain is currently focussed on, focus on first in list
        FOCUS_CHAIN.elems[0].focus();
        
    },
    
    /**
     * @function
     * @memberof module:FOCUS_CHAIN
     * @desc handles setting the user focus if the focus chain consists of a start and end element
     * @param {event} e - keydown event
     * @param {boolean} go_backwards - if the focus go forward or backwards in focus chain
     */
    handleSelectionType2 : function (e, go_backwards) {
        
        // check element that had focus until now
        if (
            !go_backwards &&
            // if last element reached, focus on first
            document.activeElement == FOCUS_CHAIN.end_elem
        ) {
            e.preventDefault();
            FOCUS_CHAIN.start_elem.focus();
            return;
        }
        
        // check element that now gets focus
        setTimeout(function () {
            
            if (
                // if no element inside window is being focussed
                !_.contains(FOCUS_CHAIN.elems_container, document.activeElement)
            ) {
                
                e.preventDefault();
                
                // if user is tabbing backwards, focus end_elem
                if (go_backwards) {
                    FOCUS_CHAIN.end_elem.focus();
                }
                // if user is tabbing forwards, focus start_elem
                else {
                    FOCUS_CHAIN.start_elem.focus();
                }
                
            }
            
        }, 5);
        
    }
    
};



/** 
 * @module NAV 
 * @desc manages the UI of the navigation area
 */
var NAV = {
    
    darkmode          : false,
    line_chart_opened : false,
    
    
    
    /**
     * @function
     * @memberof module:NAV
     * @desc initializes navigation elements with events
     */
    initialize : function () {
        
        // open 'data load' window
        _.onClick(NODE.data_load_btn, DATA_LOAD.openWindow);
        
        // start animation
        _.onClick(NODE.play_btn, ANIMATOR.play);
        
        // pause animation
        _.onClick(NODE.pause_btn, ANIMATOR.pause);
        
        // stop animation
        _.onClick(NODE.stop_btn, ANIMATOR.stop);
        
        NAV.initializeSettingsWindow();
        
        
        
        // remove this function from memory
        delete NAV.initialize
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc initializes elements in and for settings window
     */
    initializeSettingsWindow : function () {
        
        // open/close settings menu
        _.onClick(NODE.settings_btn, NAV.openSettingsWindow);
        
        NODE.settings_close_btn = _.class('close', NODE.settings_window)[0];
        _.onClick(NODE.settings_close_btn, NAV.closeSettingsWindow);
        
        NODE.settings_overlay = _.class('blur', NODE.settings_window)[0];
        _.onClick(NODE.settings_overlay, NAV.closeSettingsWindow);
        
        // toggle 'dark mode'
        _.onClick(NODE.darkmode_btn, NAV.toggleDarkMode);
        
        // speed setter buttons
        _.onClick(NODE.speed_btn.slow, NAV.setSpeed);
        _.onClick(NODE.speed_btn.normal, NAV.setSpeed);
        _.onClick(NODE.speed_btn.fast, NAV.setSpeed);
        
        // elements for setting custom speed
        _.addEvent(NODE.speed_selection.input, 'input', NAV.setCustomSpeed);
        _.onClick(NODE.speed_selection.custom, NAV.showCustomSpeedMenu);
        _.onClick(NODE.speed_selection.close_custom, NAV.showDefinedSpeedMenu);
        
        // buttons in 'line chart' menu
        _.onClick(NODE.close_line_chart_btn, NAV.showBarChart);
        _.onClick(NODE.download_png_btn, NAV.downloadLineChart);
        _.onClick(NODE.compare_btn, COMPARE_ITEMS.openWindow);
        
        
        
        // remove this function from memory
        delete NAV.initializeSettingsWindow;
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc opens settings window
     */
    openSettingsWindow : function () {
        
        _.addClass(NODE.settings_window, 'visible');
        NODE.settings_window.setAttribute('aria-hidden', 'false');
        
        FOCUS_CHAIN.set({
            start : NODE.darkmode_btn, 
            end : NODE.settings_close_btn, 
            container : NODE.settings_window
        });
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc closes settings window
     */
    closeSettingsWindow : function () {
        
        _.removeClass(NODE.settings_window, 'visible');
        NODE.settings_window.setAttribute('aria-hidden', 'true');
        
        FOCUS_CHAIN.reset();
        
        NODE.settings_btn.focus();
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc toggles dark mode setting
     */
    toggleDarkMode : function () {

        // toggle darkmode value
        NAV.darkmode = !NAV.darkmode;
        
        // toggle darkmode class according to value
        _[(NAV.darkmode ? 'add' : 'remove') + 'Class'](NODE.html, 'dark-mode');
        
        MSG.show('Toggled dark mode.', 1300);
        
        // update rendered chart
        ANIMATOR.refreshFrame();
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc enables a button
     * @param {Object} btn - HTML element
     */
    enableButton : function (btn) {
        
        _.addClass(btn, 'active');
        btn.setAttribute('aria-disabled', 'false');
        
        btn.setAttribute('originalTabIndex', btn.getAttribute('tabIndex'));
        btn.setAttribute('tabIndex', '-1');
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc disables a button
     * @param {Object} btn - HTML element
     */
    disableButton : function (btn) {
        
        _.removeClass(btn, 'active');
        btn.setAttribute('aria-disabled', 'true');
        
        var originalTabIndex = btn.getAttribute('originalTabIndex');
        
        if (originalTabIndex == null) {
            originalTabIndex = btn.getAttribute('tabIndex');
            btn.setAttribute('originalTabIndex', originalTabIndex);
        }
        
        btn.setAttribute('tabIndex', originalTabIndex);
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc sets a specific 'speed setter' button active and disables all others
     * @param {Object} btn - HTML element
     */
    onlyEnableButton : function (btn) {
        
        var btns = NODE.speed_btn;
        
        for (var key in btns) {
            if (btns[key] === btn) {
                this.enableButton(btns[key]);
            }
            else {
                this.disableButton(btns[key]);
            }
        }
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc shows the 'bar chart' and hides the 'line chart'
     */
    showBarChart : function () {
        
        NAV.line_chart_opened = false;
        
        // switch chart containers
        _.addClass(NODE.chart_container_1, 'active');
        _.removeClass(NODE.chart_container_2, 'active');
        
        // show statistics
        _.addClass(NODE.statistics, 'active');
        
        // update charts
        ANIMATOR.refreshFrame();
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc shows the 'line chart' and hides the 'bar chart'
     */
    showLineChart : function () {
        
        NAV.line_chart_opened = true;
        
        // switch chart containers
        _.removeClass(NODE.chart_container_1, 'active');
        _.addClass(NODE.chart_container_2, 'active');
        
        // hide statistics
        _.removeClass(NODE.statistics, 'active');
        
        // update charts
        ANIMATOR.refreshFrame();
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc sets the animation speed in ANIMATOR relative to the button pressed
     * @param {event} e - from click on animation speed buttons
     */
    setSpeed : function (e) {
        
        var btn = _.target(e);
        
        // don't set speed again anything, if button is already set active
        if (_.hasClass(btn, 'active')) {
            return;
        }
        
        // activate button and disable all others
        NAV.onlyEnableButton(btn);
        
        // determine animation speed from button id's
        var speed = 1;
        switch (btn.id) {
                
            case 'half-speed':
                speed = 0.5;
                break;
                
            case 'double-speed':
                speed = 2;
                break;
                
        }
        
        MSG.show('Set speed to ' + speed + '.', 900);
        
        // send value to animator object
        ANIMATOR.setSpeed(speed);
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc sets a custom animation speed defined by input value of text input
     * @param {event} e - from input on custom animation speed text input
     */
    setCustomSpeed : function (e) {
        
        var input = _.target(e);
        var speed = input.value;
        
        // replace commas with points
        if (speed.match(/[,]+/)) {
            speed = speed.replace(/[,]+/, '.');
            input.value = speed;
        }
        
        // remove non-number and non-point characters
        if (speed.match(/[^0-9\.]+/)) {
            speed = speed.replace(/[^0-9\.]+/, '');
            input.value = speed;
        }
        
        // return if speed isn't in right format
        if (!speed.match(/^([0-9]+|[0-9]+\.[0-9]+)$/)) {
            // tell CSS the input value is incorrect
            _.removeClass(input, 'correct-speed');
            return;
        }
        
        // parse speed string to float
        speed = parseFloat(speed);
        
        // round number to 1 number after comma
        if (speed % 1 != 0) {
            speed = speed.toFixed(1);
        }
        
        // speed has to be >=0.1 and <=4
        if (speed < 0.1 || speed > 4) {
            MSG.error('Speed must be between 0.1 and 4.');
            // tell CSS the input value is incorrect
            _.removeClass(input, 'correct-speed');
            return;
        }
        
        
        
        
        // tell CSS that the input value is correct
        _.addClass(input, 'correct-speed');
        
        // give lag warning
        if (speed > 2) {
            MSG.warn('Speed values above 2 may produce lag.');
        }
        
        // send value to animator object
        ANIMATOR.setSpeed(speed);
        
        // if speed value was corrected by regex, replace input value with it
        speed += "";
        if (speed != input.value) {
            input.value = speed;
        }
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc shows 'custom speed' menu and hides 'defined speed' menu
     */
    showCustomSpeedMenu : function () {
        
        // switch 'active' class between the two menus
        _.removeClass(NODE.speed_selection.container_1, 'active');
        _.addClass(NODE.speed_selection.container_2, 'active');
        
        // put currently-defined speed value into input element 
        var input = NODE.speed_selection.input;
        input.value = ANIMATOR.speed + '';
        
        // tell CSS using a class that the current speed value is correct
        _.addClass(input, 'correct-speed');
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc shows 'defined speed' menu and hides 'custom speed' menu
     */
    showDefinedSpeedMenu : function () {
        
        // switch 'active' class between the two menus
        _.addClass(NODE.speed_selection.container_1, 'active');
        _.removeClass(NODE.speed_selection.container_2, 'active');
        
        // put value of selected 'defined speed' button as current speed 
        var speed = 0;
        if (_.hasClass(NODE.speed_btn.slow, 'active')) {
            speed = 0.5;
        }
        else if (_.hasClass(NODE.speed_btn.normal, 'active')) {
            speed = 1;
        }
        else {
            speed = 2;
        }
        
        ANIMATOR.setSpeed(speed);
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc downloads 'line chart' canvas as .png image
     */
    downloadLineChart : function () {
        
        // get canvas as image data URI
        var image_URI = NODE.line_chart.toDataURL('image/png');
        
        // get current time and date, convert it to string
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth()+1;
        var date_str = (day > 9 ? '' : '0') + day + '-' +
                       (month > 9 ? '' : '0') + month + '-' +
                       date.getFullYear() + ' ' +
                       date.getHours() + '-' +
                       date.getMinutes() + '-' +
                       date.getSeconds();
        
        // generate a file name
        var file_name = 'chart ' + COMPARE_ITEMS.ids[0].replace(/[^a-z0-9\-\_]/g, '') + 
                        ' ' + date_str + '.png';
        
        // create a link HTML element to the image data uri
        var link = _.create('a', {
            'download' : file_name,
            'href' : image_URI
        });
        
        // append link, force-click it and remove it again
        _.append(NODE.body, link);
        link.click();
        _.remove(link);
        
        MSG.show('Downloaded image.', 1300);

    }
    
}