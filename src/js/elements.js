/**
 * @file saves references to HTML nodes for later use
 * @license https://github.com/christiandunkel/time-visualizer/blob/master/doc/license.md
 */

/** @module NODE */
var NODE = {
        
    /* default HTML nodes */
    
    html                        : _.tag('html')[0],
    head                        : _.tag('head')[0],
    body                        : _.tag('body')[0],
    
    
    
    /* navigation UI */
    
    data_load_btn               : _.id('load-data'),
    darkmode_btn                : _.id('toggle-darkmode'),

    play_btn                    : _.id('play-button'),
    pause_btn                   : _.id('pause-button'),
    stop_btn                    : _.id('stop-button'),
    
    // animation speed menu for custom speed input
    time_selection : {
        container_1             : _.id('pre-defined-speed'),
        container_2             : _.id('custom-speed'),
        input                   : _.id('custom-speed-input'),
        custom                  : _.id('open-custom-speed-menu'),
        close_custom            : _.id('close-custom-speed-menu')
    },
    
    // animation speed menu with pre-defined buttons
    time_btn : {
        slow                    : _.id('half-speed'),
        normal                  : _.id('normal-speed'),
        fast                    : _.id('double-speed')
    },
    
    
    
    /* 'data load' window */
    
    data_load : {
        
        window                  : _.id('data-load-window'),
        close_btn               : null,
        blur                    : null,
        
        // get area and input on which user can drop files
        drop_area               : _.id('drop-area'),
        select_file_input       : _.id('selected-file'),
    
        example_sets_area       : _.id('example-set-area'),
        notice                  : _.id('file-reader-notice')
        
    },
    
    /**
     * @function
     * @memberof module:NODE
     * @desc adds references to the empty HTML nodes in this sections
     */
    initializeDataLoadWindow : function () {
        
        var $ = this.data_load;
        
        $.close_btn = _.class('close', $.window)[0];
        
        // dark, transparent background overlay
        $.blur = _.class('blur', $.window)[0];
        
        // remove function from memory
        delete this.initializeDataLoadWindow;
        
    },
    
    
    
    /* 'compare selection' window */
    
    compare_selection : {
        
        window                  : _.id('compare-selection-window'),
        close_btn               : null,
        blur                    : null,
        
        unselected_keys         : null,
        selected_keys           : null
        
    },
    
    /**
     * @function
     * @memberof module:NODE
     * @desc adds references to the empty HTML nodes in this sections
     */
    initializeCompareSelectionWindow : function () {
        
        var $ = this.compare_selection;
        
        $.close_btn = _.class('close', $.window)[0];
        
        // dark, transparent background overlay
        $.blur = _.class('blur', $.window)[0];
        
        // areas holding keys
        $.unselected_keys = _.class('unselected-keys', $.window)[0];
        $.selected_keys = _.class('selected-keys', $.window)[0];
        
        // remove function from memory
        delete this.initializeCompareSelectionWindow;
        
    },
    
    
    
    /* COLUMN CHART */
    
    chart_container_1           : _.id('chart-container-1'),
    
    // HTML element displaying 'current' value
    current_value : {
        container               : _.id('data-set-current-value'),
        value                   : null,
        indicator               : null
    },
    
    // elements of data set info header
    data_set_info : {
        title                   : null,
        date                    : null
    },
    column_chart                : _.id('column-chart'),
    
    // column ratio chart below column chart
    column_chart_total          : _.id('ratio-total'),
    ratio_chart_container       : _.id('ratio-chart'),
    ratio_chart                 : null,
    
    /**
     * @function
     * @memberof module:NODE
     * @desc adds references to the empty HTML nodes in this sections
     */
    initializeColumnChart : function () {
        
        // get elements of data set info header
        var context = _.id('data-set-info');
        this.data_set_info.title = _.class('title', context)[0];
        this.data_set_info.date = _.class('date', context)[0];
        
        // get HTML node holding 'current' data value
        var curr = this.current_value;
        curr.value = _.class('value', curr.container)[0];
        curr.indicator = _.class('indicator', curr.container)[0];
        
        // ratio chart inside container
        this.ratio_chart = _.tag('tr', this.ratio_chart_container)[0];
        
        // remove function from memory
        delete this.initializeColumnChart;
        
    },
    
    
    
    /* INDIVIDUAL CHART */
    
    chart_container_2           : _.id('chart-container-2'),
    individual_chart            : _.id('individual-chart'),
    
    // custom navigation for individual chart
    individual_chart_menu       : _.id('individual-chart-menu'),
    back_to_column_chart_btn    : _.id('close-individual-chart'),
    download_png_btn            : _.id('download-chart-as-image'),
    compare_btn                 : _.id('compare-btn'),
    
    
    
    /* GENERAL */
    
    /**
     * @function
     * @memberof module:NODE
     * @desc adds references to the empty HTML nodes in this sections
     */
    initialize : function () {
        
        this.initializeDataLoadWindow();
        this.initializeColumnChart();
        this.initializeCompareSelectionWindow();
        
        // remove function from memory
        delete this.initialize;
        
    }
    
}