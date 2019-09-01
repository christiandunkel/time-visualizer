/*
 * saves references to HTML nodes for later use
 */
var NODE = {
    
    /* TOP NAVIGATION */
    
    data_load_btn : null,
    darkmode_btn : null,
    
    play_btn : null,
    pause_btn : null,
    stop_btn : null,
    
    time_selection : {
        container_1 : null,
        container_2 : null,
        input : null,
        custom : null,
        close_custom : null
    },
    
    time_btn : {
        slow : null,
        normal : null,
        fast : null
    },
    
    initializeNavButtons : function () {
        
        this.data_load_btn = _.id('load-data');
        this.darkmode_btn = _.id('toggle-darkmode');
        
        this.play_btn = _.id('play-button');
        this.pause_btn = _.id('pause-button');
        this.stop_btn = _.id('stop-button');
        
        // animation speed menu (pre-defined)
        this.time_selection.container_1 = _.id('pre-defined-animation-speeds');
        this.time_btn.slow = _.id('animation-speed-0-5');
        this.time_btn.normal = _.id('animation-speed-1-0');
        this.time_btn.fast = _.id('animation-speed-2-0');
        
        // animation speed menu (custom)
        this.time_selection.container_2 = _.id('custom-animation-speed-area');
        this.time_selection.input = _.id('custom-animation-speed-value');
        this.time_selection.custom = _.id('custom-animation-speed');
        this.time_selection.close_custom = _.id('close-custom-animation-speed-area');
        
    },
    
    
    
    /* DATA LOAD WINDOW */
    
    data_load_window : null,
    close_btn : null,
    blur : null,
    
    drop_area : null,
    select_file_input : null,
    
    window_example_sets_area : null,
    file_reader_notice : null,
    
    initializeDataLoadWindow : function () {
        
        this.data_load_window = _.id('data-load-window');
        this.close_btn = _.class('close', this.data_load_window)[0];
        this.blur = _.class('blur', this.data_load_window)[0]; // dark, transparent background overlay
        
        this.window_example_sets_area = _.id('example-set-area');
        this.file_reader_notice = _.id('file-reader-notice');
        
        // get area and input on which user can drop files
        this.select_file_input = _.id('selected-file');
        this.drop_area = _.id('drop-area');
        
    },
    
    
    
    /* COMPARE SELECTION WINDOW */
    
    compare_selection : {
        
        window : null,
        close_btn : null,
        blur : null,
        
        unselected_keys : null,
        selected_keys : null
        
    },
    
    initializeCompareSelectionWindow : function () {
        
        var $ = NODE.compare_selection;
        
        $.window = _.id('compare-selection-window');
        $.close_btn = _.class('close', $.window)[0];
        $.blur = _.class('blur', $.window)[0];
        
        $.unselected_keys = _.class('unselected-keys', $.window)[0];
        $.selected_keys = _.class('selected-keys', $.window)[0];
        
    },
    
    
    
    /* COLUMN DATA CHART */
    
    chart_container_1 : null,
    
    // HTML element displaying 'current' value
    current_value : {
        container : null,
        value : null,
        indicator : null
    },
    
    // elements of data set info header
    data_set_info : {
        title : null,
        date : null
    },
    column_chart : null,
    
    column_chart_total : null,
    ratio_chart_container : null,
    ratio_chart : null,
    
    initializeColumnChart : function () {
        
        this.chart_container_1 = _.id('chart-container-1');
        
        // get elements of data set info header
        var context = _.id('data-set-info');
        this.data_set_info.title = _.class('title', context)[0];
        this.data_set_info.date = _.class('date', context)[0];
        
        // get containers for charts
        this.column_chart = _.id('column-chart');
        
        // get HTML node holding 'current' data value
        var curr = this.current_value;
        curr.container = _.id('data-set-current-value');
        curr.value = _.class('value', curr.container)[0];
        curr.indicator = _.class('indicator', curr.container)[0];
        
        // column ratio chart / bar below big column chart
        this.column_chart_total = _.id('column-chart-total');
        this.ratio_chart_container = _.id('column-ratio-container');
        this.ratio_chart = _.id('column-ratio');
        
    },
    
    
    
    /* INDIVIDUAL DATA CHARTS */
    
    chart_container_2 : null,
    
    individual_chart_menu : null,
    individual_chart : null,
    
    back_to_column_chart_btn : null,
    download_png_btn : null,
    compare_btn: null,
    
    initializeIndividualCharts : function () {
        
        this.chart_container_2 = _.id('chart-container-2');
        
        // get top menu and buttons
        this.individual_chart_menu = _.id('individual-chart-menu');
        this.back_to_column_chart_btn = _.id('back-to-column-chart-btn');
        this.download_png_btn = _.id('download-chart-as-image');
        this.compare_btn = _.id('compare-btn');
        
        this.individual_chart = _.id('individual-chart');
        
    },
    
    
    
    /* GENERAL */
    
    initialize : function () {
        
        // set default HTML nodes
        this.html = _.tag('html')[0];
        this.head = _.tag('head')[0];
        this.body = _.tag('body')[0];
        
        // set custom nodes
        this.initializeNavButtons();
        this.initializeDataLoadWindow();
        this.initializeColumnChart();
        this.initializeCompareSelectionWindow();
        this.initializeIndividualCharts();
        
    }
    
}