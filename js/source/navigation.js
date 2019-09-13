/** 
 * @module NAV 
 * @desc manages the UI of the navigation area
 */
var NAV = {
    
    darkmode                : false,
    line_chart_opened : false,
    
    
    
    /**
     * @function
     * @memberof module:NAV
     * @desc initializes navigation elements with events
     */
    initialize : function () {
        
        // open 'data load' window
        _.onClick(NODE.data_load_btn, DATA_LOAD.openWindow);
        
        // toggle 'dark mode'
        _.onClick(NODE.darkmode_btn, this.toggleDarkMode);
        
        // start animation
        _.onClick(NODE.play_btn, ANIMATOR.play);
        
        // pause animation
        _.onClick(NODE.pause_btn, ANIMATOR.pause);
        
        // stop animation
        _.onClick(NODE.stop_btn, ANIMATOR.stop);
        
        // speed setter buttons
        _.onClick(NODE.speed_btn.slow, NAV.setSpeed);
        _.onClick(NODE.speed_btn.normal, NAV.setSpeed);
        _.onClick(NODE.speed_btn.fast, NAV.setSpeed);
        
        // elements for setting custom speed
        _.addEvent(NODE.speed_selection.input, 'input', NAV.setCustomSpeed);
        _.onClick(NODE.speed_selection.custom, NAV.showCustomSpeedMenu);
        _.onClick(NODE.speed_selection.close_custom, NAV.showDefinedSpeedMenu);
        
        // buttons in 'individual chart' menu
        _.onClick(NODE.close_line_chart_btn, NAV.showBarChart);
        _.onClick(NODE.download_png_btn, NAV.downloadIndividualChart);
        _.onClick(NODE.compare_btn, COMPARE_ITEMS.openWindow);
        
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
        
        MSG.show('Toggled dark mode.', 1300);
        
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
        speed = _.limitNumber(speed, 0.1, 4, function (e) {
            MSG.error('Speed must be between 0.1 and 4.');
        });
        
        // add class so CSS knows the input value is correct
        _.addClass(input, 'correct-speed');
        
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
     * @desc downloads 'individual chart' canvas as .png image
     */
    downloadIndividualChart : function () {
        
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
        
        // create a link HTML node to the image data uri
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