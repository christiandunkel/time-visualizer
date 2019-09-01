/**
 * @file manages the functionality of the navigation buttons
 * @license https://github.com/christiandunkel/time-visualizer/blob/master/doc/license.md
 */

/** @module NAV */
var NAV = {
    
    darkmode                : false,
    individual_chart_opened : false,
    
    
    
    /**
     * @function
     * @memberof module:NAV
     * @desc initializes navigation elements with events
     */
    initialize : function () {
        
        // open 'data load' window
        _.addClick(NODE.data_load_btn, DATA_LOAD.open);
        
        // toggle 'dark mode'
        _.addClick(NODE.darkmode_btn, this.toggleDarkMode);
        
        // start animation
        _.addClick(NODE.play_btn, ANIMATOR.play);
        
        // pause animation
        _.addClick(NODE.pause_btn, ANIMATOR.pause);
        
        // stop animation
        _.addClick(NODE.stop_btn, ANIMATOR.stop);
        
        // speed setter buttons
        _.addClick(NODE.time_btn.slow, NAV.setSpeed);
        _.addClick(NODE.time_btn.normal, NAV.setSpeed);
        _.addClick(NODE.time_btn.fast, NAV.setSpeed);
        
        // elements for setting custom speed
        _.addEvent(NODE.time_selection.input, 'input', NAV.setCustomSpeed);
        _.addClick(NODE.time_selection.custom, NAV.showCustomSpeedMenu);
        _.addClick(NODE.time_selection.close_custom, NAV.showDefinedSpeedMenu);
        
        // buttons in 'individual chart' menu
        _.addClick(NODE.back_to_column_chart_btn, NAV.showColumnChart);
        _.addClick(NODE.download_png_btn, NAV.downloadIndividualChart);
        _.addClick(NODE.compare_btn, COMPARE.open);
        
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
        _[(NAV.darkmode ? 'add' : 'remove') + 'Class'](NODE.html, 'darkMode');
        
        // update rendered chart
        ANIMATOR.refreshFrame();
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc enables a button
     * @param {Object} btn - HTML node
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
     * @param {Object} btn - HTML node
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
     * @param {Object} btn - HTML node
     */
    onlyEnableButton : function (btn) {
        
        var btns = NODE.time_btn;
        
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
     * @desc shows the 'column chart' and hides the 'individual chart'
     */
    showColumnChart : function () {
        
        NAV.individual_chart_opened = false;
        
        // hide individual chart and show column chart
        _.addClass(NODE.chart_container_1, 'active');
        _.removeClass(NODE.chart_container_2, 'active');
        
        // update charts
        ANIMATOR.refreshFrame();
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc shows the 'individual chart' and hides the 'column chart'
     */
    showIndividualChart : function () {
        
        NAV.individual_chart_opened = true;
        
        // show individual chart and hide column chart
        _.removeClass(NODE.chart_container_1, 'active');
        _.addClass(NODE.chart_container_2, 'active');
        
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
        
        // send value to animator object
        ANIMATOR.setTime(speed);
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc sets a custom animation speed defined by input value of text input
     * @param {event} e - from input on custom animation speed text input
     */
    setCustomSpeed : function (e) {
        
        var input = _.target(e);
        var time = input.value;
        
        // replace commas with points
        if (time.match(/[,]+/)) {
            time = time.replace(/[,]+/, '.');
            input.value = time;
        }
        
        // remove non-number and non-point characters
        if (time.match(/[^0-9\.]+/)) {
            time = time.replace(/[^0-9\.]+/, '');
            input.value = time;
        }
        
        // return if time isn't in right format
        if (!time.match(/^([0-9]+|[0-9]+\.[0-9]+)$/)) {
            _.removeClass(input, 'correct-speed');
            return;
        }
        
        // parse time string to float
        time = parseFloat(time);
        
        // round number to 1 number after comma
        if (time % 1 != 0) {
            time = time.toFixed(1);
        }
        
        // time has to be 0.1 <= time <= 4  
        time = _.limitNumber(time, 0.1, 4);
        
        // add class so CSS knows the input value is correct
        _.addClass(input, 'correct-speed');
        
        // send value to animator object
        ANIMATOR.setTime(time);
        
        // if time value was corrected by regex, replace input value with it
        time += "";
        if (time != input.value) {
            input.value = time;
        }
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc shows 'custom speed' menu and hides 'defined speed' menu
     */
    showCustomSpeedMenu : function () {
        
        // switch 'active' class between the two menus
        _.removeClass(NODE.time_selection.container_1, 'active');
        _.addClass(NODE.time_selection.container_2, 'active');
        
        // put currently-defined speed value into input element 
        var input = NODE.time_selection.input;
        input.value = ANIMATOR.time + '';
        
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
        _.addClass(NODE.time_selection.container_1, 'active');
        _.removeClass(NODE.time_selection.container_2, 'active');
        
        // put value of selected 'defined time' button as current time 
        var defined_time = 0;
        if (_.hasClass(NODE.time_btn.slow, 'active')) {
            defined_time = 0.5;
        }
        else if (_.hasClass(NODE.time_btn.normal, 'active')) {
            defined_time = 1;
        }
        else {
            defined_time = 2;
        }
        
        ANIMATOR.setTime(defined_time);
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc downloads 'individual chart' canvas as .png image
     */
    downloadIndividualChart : function () {
        
        // get canvas as image data URI
        var image_URI = NODE.individual_chart.toDataURL('image/png');
        
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
        var file_name = 'chart ' + ANIMATOR.individual_chart_keys[0].replace(/[^a-z0-9\-\_]/g, '') + 
                        ' ' + date_str + '.png';
        
        // create a link HTML node to the image data uri
        var link = _.create('a', {
            'download' : file_name,
            'href' : image_URI
        });
        
        // append link, force-click it and remove it again
        _.append(NODE.body, link);
        link.click();
        _.remove(link);

    }
    
}