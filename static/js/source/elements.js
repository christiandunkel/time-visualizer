/**
 * @module NODE 
 * @desc saves references to all HTML elements needed by the app
 */
var NODE = {
        
    /* default HTML elements */
    
    html : _.tag('html')[0],
    head : _.tag('head')[0],
    body : _.tag('body')[0],
    
    
    
    /* navigation UI */
    
    data_load_btn : _.id('load-data'),

    play_btn      : _.id('play-button'),
    pause_btn     : _.id('pause-button'),
    stop_btn      : _.id('stop-button'),
    
    
    
    /* settings window */
    
    settings_btn       : _.id('settings-button'),
    settings_window    : _.id('settings-window'),
    settings_close_btn : null,
    settings_overlay   : null,
    
    darkmode_btn       : _.id('toggle-dark-mode'),
    
    // animation speed menu for custom speed input
    speed_selection : {
        container_1  : _.id('pre-defined-speed'),
        container_2  : _.id('custom-speed'),
        input        : _.id('custom-speed-input'),
        custom       : _.id('open-custom-speed-menu'),
        close_custom : _.id('close-custom-speed-menu')
    },
    
    // animation speed menu with pre-defined buttons
    speed_btn : {
        slow   : _.id('half-speed'),
        normal : _.id('normal-speed'),
        fast   : _.id('double-speed')
    },
    
    
    
    /* 'data load' window */
    
    data_load : {
        
        window    : _.id('data-load-window'),
        close_btn : null,
        blur      : null,
        
        // get area and input on which user can drop files
        drop_area         : _.id('drop-area'),
        select_file_input : _.id('selected-file'),
    
        example_sets_area : _.id('example-set-area'),
        notice            : _.id('file-reader-notice')
        
    },
    
    /**
     * @function
     * @memberof module:NODE
     * @desc adds missing references to HTML elements for 'data load' window
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
    
    compare_items : {
        
        window    : _.id('compare-items-window'),
        close_btn : null,
        blur      : null,
        
        unselected_area : null,
        selected_area   : null
        
    },
    
    /**
     * @function
     * @memberof module:NODE
     * @desc adds missing references to HTML elements for 'compare items' window
     */
    initializeCompareItemsWindow : function () {
        
        var $ = this.compare_items;
        
        $.close_btn = _.class('close', $.window)[0];
        
        // dark, transparent background overlay
        $.blur = _.class('blur', $.window)[0];
        
        // areas holding item buttons
        $.unselected_area = _.class('unselected-area', $.window)[0];
        $.selected_area = _.class('selected-area', $.window)[0];
        
        // remove function from memory
        delete this.initializeCompareItemsWindow;
        
    },
    
    
    
    /* BAR CHART */
    
    chart_container_1 : _.id('chart-container-1'),
    
    // HTML element displaying 'current' value
    current_value : {
        container : _.id('data-set-current-value'),
        value     : null,
        indicator : null
    },
    
    // elements of data set info header
    data_set_info : {
        title : null,
        date  : null
    },
    bar_chart : _.id('bar-chart'),
    
    // ratio chart below bar chart
    ratio_chart_total     : _.id('ratio-total'),
    ratio_chart_container : _.id('ratio-chart'),
    ratio_chart           : null,
    
    /**
     * @function
     * @memberof module:NODE
     * @desc adds missing references to HTML elements for 'bar chart'
     */
    initializeBarChart : function () {
        
        // get elements of data set info header
        var context = _.id('data-set-info');
        this.data_set_info.title = _.class('title', context)[0];
        this.data_set_info.date = _.class('date', context)[0];
        
        // get HTML element holding 'current' data value
        var curr = this.current_value;
        curr.value = _.class('value', curr.container)[0];
        curr.indicator = _.class('indicator', curr.container)[0];
        
        // ratio chart inside container
        this.ratio_chart = _.tag('tr', this.ratio_chart_container)[0];
        
        // remove function from memory
        delete this.initializeBarChart;
        
    },
    
    
    
    /* LINE CHART */
    
    chart_container_2 : _.id('chart-container-2'),
    line_chart        : _.id('line-chart'),
    
    // custom navigation for line chart
    line_chart_menu      : _.id('line-chart-menu'),
    close_line_chart_btn : _.id('close-line-chart'),
    download_png_btn     : _.id('download-line-chart'),
    compare_btn          : _.id('compare-btn'),
    
    
    
    /* STATISTICS */
    
    statistics : _.id('statistics'),
    
    
    
    /* GENERAL */
    
    /**
     * @function
     * @memberof module:NODE
     * @desc adds missing references to HTML elements
     */
    initialize : function () {
        
        this.initializeDataLoadWindow();
        this.initializeBarChart();
        this.initializeCompareItemsWindow();
        
        
        
        // remove function from memory
        delete this.initialize;
        
    }
    
}