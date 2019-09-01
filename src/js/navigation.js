/**
 * @file manages the functionality of the navigation buttons
 * @license https://github.com/christiandunkel/time-visualizer/blob/master/doc/license.md
 */

/** @global */
var NAV = {
    
    darkmode : false,
    individual_chart_opened : false,
    
    
    
    /* GENERAL */
    
    // add events to navigation buttons
    initialize : function () {
        
        // add event to open 'data load' window
        _.addClick(NODE.data_load_btn, DATA_LOAD.open);
        
        // add event for toggling 'dark mode'
        _.addClick(NODE.darkmode_btn, this.toggleDarkMode);
        
        // add event to start animation
        _.addClick(NODE.play_btn, ANIMATOR.play);
        
        // add event to pause animation
        _.addClick(NODE.pause_btn, ANIMATOR.pause);
        
        // add event to stop animation
        _.addClick(NODE.stop_btn, ANIMATOR.stop);
        
        // add events to time change buttons
        _.addClick(NODE.time_btn.slow, NAV.setAnimationSpeed);
        _.addClick(NODE.time_btn.normal, NAV.setAnimationSpeed);
        _.addClick(NODE.time_btn.fast, NAV.setAnimationSpeed);
        
        _.addEvent(NODE.time_selection.input, 'input', NAV.setCustomTime);
        _.addClick(NODE.time_selection.custom, NAV.setCustomTimeContainer);
        _.addClick(NODE.time_selection.close_custom, NAV.setDefinedTimeContainer);
        
    },
    
    // set a button active
    setActive : function (btn) {
        
        _.addClass(btn, 'active');
        btn.setAttribute('aria-disabled', 'false');
        
        btn.setAttribute('originalTabIndex', btn.getAttribute('tabIndex'));
        btn.setAttribute('tabIndex', '-1');
        
    },
    
    // set a button inactive
    setInactive : function (btn) {
        
        _.removeClass(btn, 'active');
        btn.setAttribute('aria-disabled', 'true');
        
        var originalTabIndex = btn.getAttribute('originalTabIndex');
        
        if (originalTabIndex == null) {
            originalTabIndex = btn.getAttribute('tabIndex');
            btn.setAttribute('originalTabIndex', originalTabIndex);
        }
        
        btn.setAttribute('tabIndex', originalTabIndex);
        
    },
    
    // set a button active, and all others inactive
    setExclusiveActive : function (btn) {
        
        var btns = NODE.time_btn;
        
        for (var key in btns) {
            if (btns[key] === btn) {
                this.setActive(btns[key]);
            }
            else {
                this.setInactive(btns[key]);
            }
        }
        
    },
    
    // toggle the currently opened chart
    toggleChart : function () {
        
        // if individual chart is opened, close it
        if (NAV.individual_chart_opened) {
            NAV.showColumnChart();
        }
        // otherwise, open it
        else {
            NAV.showIndividualChart();
        }
        
    },
    
    showColumnChart : function () {
        
        NAV.individual_chart_opened = false;
        
        // hide individual chart and show column chart
        _.addClass(NODE.chart_container_1, 'active');
        _.removeClass(NODE.chart_container_2, 'active');
        
        // update charts
        ANIMATOR.refreshFrame();
        
    },
    
    showIndividualChart : function () {
        
        NAV.individual_chart_opened = true;
        
        // show individual chart and hide column chart
        _.removeClass(NODE.chart_container_1, 'active');
        _.addClass(NODE.chart_container_2, 'active');
        
        // update charts
        ANIMATOR.refreshFrame();
        
    },
    
    
    
    /* DARKMODE */
    
    // toggle the website's theme between light and dark
    toggleDarkMode : function () {

        // toggle darkmode value
        NAV.darkmode = !NAV.darkmode;
        
        // toggle darkmode class according to value
        _[(NAV.darkmode ? 'add' : 'remove') + 'Class'](NODE.html, 'darkMode');
        
        // update rendered chart
        ANIMATOR.refreshFrame();
        
    },
    
    
    
    /* TIME */
    
    /**
     * @desc sets the animation speed in ANIMATOR relative to the button pressed
     * @param {event} e
     * @returns {undefined}
     */
    setAnimationSpeed : function (e) {
        
        var btn = _.target(e);
        
        // don't set speed again anything, if button is already set active
        if (_.hasClass(btn, 'active')) {
            return;
        }
        
        // activate button and disable all others
        NAV.setExclusiveActive(btn);
        
        // determine speed and send value to animator object
        var speed = 1;
        switch (btn.id) {
            case 'half-speed':
                speed = 0.5;
                break;
            case 'double-speed':
                speed = 2;
                break;
        }
        ANIMATOR.setTime(speed);
        
    },
    
    setCustomTime : function () {
        
        var input = NODE.time_selection.input;
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
            _.removeClass(input, 'correct-time');
            return;
        }
        
        // parse time string to float
        time = parseFloat(time);
        // round number to 1 number after comma
        if (time % 1 != 0) {
            time = time.toFixed(1);
        }
        
        // cut off time value if it's too big or too small 
        if (time > 4) {
            time = 4;
        }
        else if (time < 0.1) {
            time = 0.1;
        }
        
        _.addClass(input, 'correct-time');
        
        // send value to animator object
        ANIMATOR.setTime(time);
        
        // if time value was corrected by regex, replace input value with it
        time = "" + time;
        if (time != input.value) {
            input.value = time;
        }
        
    },
    
    setCustomTimeContainer : function () {
        
        _.removeClass(NODE.time_selection.container_1, 'active');
        _.addClass(NODE.time_selection.container_2, 'active');
        
        // put current defined time value into input element 
        var input = NODE.time_selection.input;
        input.value = ANIMATOR.time + '';
        _.addClass(input, 'correct-time');
        
    },
    
    setDefinedTimeContainer : function () {
        
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
    
    
    
    /* CHARTS */
    
    downloadChartImage : function () {
        
        var image_uri = NODE.individual_chart.toDataURL('image/png');
        
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
        
        var link = _.create('a', {
            'download' : 'chart ' + ANIMATOR.individual_chart_keys[0].replace(/[^a-z0-9\-\_]/g, '') + ' ' + date_str + '.png',
            'href' : image_uri
        });
        
        _.append(NODE.body, link);
        link.click();
        _.remove(link);

    }
    
}