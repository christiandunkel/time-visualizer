/** 
 * @module DATA
 * @desc processes and saves data
 */
var DATA = {
    
    // data set meta information
    name : '',
    date : '',
    
    // items meta information
    items : {
        /*
            item_id : {
                name            : '', // all characters encoded
                name_escaped    : '', // only quotes escaped
                icon            : '',
                color           : '',
                position        : 0   // order
            },
            
            ...
            
        */
    },
    item_num    : 0,
    
    // holds HTML elements generated for each item in each chart
    html : {
        /*
            item_id : {
                bar_chart : {
                    container             : null,
                    meter                 : null,
                    value                 : null
                },
                ratio_chart : {
                    container             : null,
                    percentage            : null
                }
            },
            
            ...
            
        */
    },
    
    // range
    from        : 0,
    to          : 0,
    
    // data as read from the data set
    original : {
        /*
            item_id : [],
            ...
        */
    },
    
    // data with missing values corrected
    fixed : {
        /*
            item_id : [],
            ...
        */
    },
    
    // number of data points per item in 'fixed' data
    fixed_num : 0,
    
    // data fixed and with data point amount increased
    upscaled : {
        /*
            item_id : [],
            ...
        */
    },
    
    // number of data points per item in 'upscaled' data
    upscaled_num : 0,
    
    // 'upscaled' values as its formatted string equivalents e.g. 1300000 -> "1.3 Million"
    formatted : {
        /*
            item_id : [],
            ...
        */
    },
    
    // highest data point value of each item (only data points in range)
    max : {
        /*
            item_id : {
                value : 0,
                formatted : ''
            },
            ...
        */
    },
    
    // smallest data point value of each item (only data points in range)
    min : {
        /*
            item_id : {
                value : 0,
                formatted : ''
            },
            ...
        */
    },
    
    // mean average of data point values of each item (only data points in range)
    mean : {
        /*
            item_id : {
                value : 0,
                formatted : ''
            },
            ...
        */
    },
    
    // holds totals of data point values for every tick
    // (data point values of all items at same index)
    total           : [],
    total_formatted : [],
    total_max       : [],
    total_min       : [],
    total_mean      : [],
    
    
    
    /* SETTER */
    
    /**
     * @function
     * @memberof module:DATA
     * @desc sets all values for the data set
     * @param {Object} obj - JSON data object
     */
    set : function (obj) {
        
        DATA.name = obj.name;
        DATA.date = obj.date;
        
        DATA.setItems(obj.items);
        DATA.setRange(obj.range.from, obj.range.to);
        
        // set original, calculate fixed and upscaled data points 
        DATA.setDataPoints(obj.data);
        
        // set statistical values (min, max, mean)
        DATA.calculateStatistics();
        
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc sets all meta information of the items
     * @param {Object} obj - object holding meta information about the items in the data set
     */
    setItems : function (obj) {
        
        // reset items object
        DATA.items = {};
        DATA.item_num = 0;
        
        for (var item in obj) {
           
            // ignore prototype properties
            if (!obj.hasOwnProperty.call(obj, item)) {
                continue;
            }
            
            // get icon URL
            var icon = '';
            if (_.isString(typeof(obj[item].icon))) {
                icon = _.encodeHTML(obj[item].icon);
            }
            
            // add item information to DATA object
            DATA.items[item]                = {};
            DATA.items[item].name           = _.encodeHTML(obj[item].name);
            DATA.items[item].name_escaped   = _.escapeDoubleQuotes(obj[item].name);
            DATA.items[item].icon           = icon;
            DATA.items[item].color          = DATA.getItemColor(DATA.item_num);
            DATA.items[item].position       = DATA.item_num;
            
            DATA.item_num++;
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc sets the range for the animation
     * @param {number} from - start time
     * @param {number} to - end time
     */
    setRange : function (from, to) {
        this.from = from;
        this.to = to;
        
        ANIMATOR.tick = 0;
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc sets the data points (original, fixed, upscaled)
     * @param {Object} data
     */
    setDataPoints : function (data) {
        
        DATA.original = data;
        
        // generate data point arrays from data.original
        DATA.calculateFixedData();
        DATA.calculateUpscaledData();
        
    },
    
    
    
    /* GETTER */
    
    /**
     * @function
     * @memberof module:DATA
     * @desc returns the highest value of item's data points
     * @param {string} item - item id
     * @returns {Object} holding the maximum as 'value' and 'formatted' 
     */
    getMax : function (item) {
        return DATA.max[item];
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc returns the smallest value of item's data points
     * @param {string} item - item id
     * @returns {Object} holding the minimum as 'value' and 'formatted'
     */
    getMin : function (item) {
        return DATA.min[item];
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc returns the mean average value of item's data points
     * @param {string} item - item id
     * @returns {Object} holding the mean average as 'value' and 'formatted'
     */
    getMean : function (item) {
        return DATA.mean[item];
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc returns the highest value of all item at the index
     * @param {number} index - tick
     * @returns {number}
     */
    getTotalMax : function (index) {
        return DATA.total_max[index];
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc returns the smallest value of all item at the index
     * @param {number} index - tick
     * @returns {number}
     */
    getTotalMin : function (index) {
        return DATA.total_min[index];
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc returns the mean average value of all item at the index
     * @param {number} index - tick
     * @returns {number}
     */
    getTotalMean : function (index) {
        return DATA.total_mean[index];
    },
    
    
    
    /* CALCULATION */
    
    /**
     * @function
     * @memberof module:DATA
     * @desc calculates an object with missing data values being filled in
     */
    calculateFixedData : function () {
        
        // reset fixed data object
        DATA.fixed      = {};
        DATA.fixed_num  = 0;
        
        var obj = DATA.original;
        
        var data_points = {};
        
        for (var item in obj) {
           
            // ignore prototype properties
            if (!obj.hasOwnProperty.call(obj, item)) {
                continue;
            }
            
            // initialize item in data_points
            data_points[item] = [];
            
            // generate a data point for every number between 'from' and 'to'
            var data = obj[item];
            var counter = -1;
            for (var i = DATA.from; i <= DATA.to; i++) {
                
                counter++;
                
                // data point is defined in object
                if (typeof(data[i+'']) !== 'undefined') {
                    // add data point to array
                    var value = data[i+''];
                    data_points[item][counter] = value;
                    continue;
                }
                
                // data point is not defined, calculate it
                
                // if we're checking first data point, set it to 0
                if (i == DATA.from) {
                    data_points[item][counter] = 0;
                    continue;
                }
                
                // if not, calculate an average of previous value and next valid value
                var prev = data_points[item][counter - 1];
                var next = null;
                var steps = 0;
                
                // count steps to next valid value
                for (var j = i + 1; j <= DATA.to; j++) {
                    steps++;
                    if (typeof(data[j + ""]) !== 'undefined') {
                        next = data[j + ""];
                        break;
                    }
                }
                
                // no valid next value, set previous as final value
                if (next == null) {
                    data_points[item][counter] = prev;
                    continue;
                }
                
                // otherwise, set the calculated average for the step as value
                var proportion = (next - prev) / (1 + steps);
                var average = prev + proportion;
                data_points[item][counter] = average;
                
            }
            
        }
        
        DATA.fixed      = data_points;
        DATA.fixed_num  = Math.abs(DATA.to - DATA.from) + 1;
        
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc calculates an object with data points increased to (item_num-1)*50+1
     */
    calculateUpscaledData : function () {
        
        // reset data objects
        DATA.upscaled       = {};
        DATA.formatted      = {};
        DATA.upscaled_num   = 0;
        
        var toggle          = 0;
        var data_points     = {};
        var formatted       = {}; // data point values as formatted strings
        
        for (var item in DATA.fixed) {
           
            // ignore prototype properties
            if (!DATA.fixed.hasOwnProperty.call(DATA.fixed, item)) {
                continue;
            }
            
            // initialize item in data_points
            data_points[item]   = [];
            formatted[item]     = [];
            
            // generate 49 new values between every adjacent data point pair
            var data    = DATA.fixed[item];
            var counter = -1;
            for (var i = 0; i < DATA.fixed_num; i++) {
                
                counter++;

                // put current value into array
                var curr                    = data[i];
                data_points[item][counter]  = curr;
                formatted[item][counter]    = DATA.formatNumber(curr);

                // don't generate 49 new values after last data point
                if (i == DATA.fixed_num - 1) {
                    break;
                }
                
                // get second point of data point pair and calculate difference
                var next        = data[i + 1];
                var diff        = next - curr;
                var hundreth    = diff / 100;

                // generate 49 values in between current and next value
                for (var j = 2; j <= 98; j += 2) {
                
                    counter++;
                    
                    var new_point               = curr + (j * hundreth);
                    data_points[item][counter]  = new_point;
                    formatted[item][counter]    = DATA.formatNumber(new_point);
                    
                }
                
            }
            
            if (toggle == 0) {
                toggle = 1;
                DATA.upscaled_num = data_points[item].length;
            }
            
        }
        
        DATA.upscaled   = data_points;
        DATA.formatted  = formatted;
        
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc calculates the min, max and mean of all data point values for every item
     */
    calculateStatistics : function () {
        
        // reset current statistical values
        DATA.max    = {};
        DATA.min    = {};
        DATA.mean   = {};
        
        for (var item in DATA.fixed) {
           
            // ignore prototype properties
            if (!DATA.fixed.hasOwnProperty.call(DATA.fixed, item)) {
                continue;
            }
            
            // array of values
            var data = DATA.fixed[item];
            
            // get new values and add them to DATA object
            
            var max = _.getMax(data);
            DATA.max[item]  = {
                'value'     : max,
                'formatted' : DATA.formatNumber(max)
            };
            
            var min = _.getMin(data);
            DATA.min[item]  = {
                'value'     : min,
                'formatted' : DATA.formatNumber(min)
            };
            
            var mean = Number(_.getMean(data).toFixed(3));
            DATA.mean[item]  = {
                'value'     : mean,
                'formatted' : DATA.formatNumber(mean)
            };
            
        }
        
        // reset totals
        DATA.total           = [];
        DATA.total_formatted = [];
        DATA.total_max       = []; // total max at this index/tick
        DATA.total_min       = []; // total min at this index/tick
        DATA.total_mean      = []; // total mean at this index/tick
        
        // calculates totals over all data point values of every item at same index
        for (var i = 0; i < DATA.upscaled_num; i++) {
            
            // set empty start values
            var total   = 0;
            var max     = Number.MIN_VALUE;
            var min     = Number.MAX_VALUE;
            
            // go through all items and process the values for this index
            for (var item_id in DATA.upscaled) {
                var data_point = DATA.upscaled[item_id][i];
                if (data_point > max) {max = data_point;}
                if (data_point < min) {min = data_point;}
                total += data_point;
            }
            
            // save totals in DATA object
            DATA.total[i]            = total;
            DATA.total_formatted[i]  = DATA.formatNumber(total);
            DATA.total_max[i]        = max;
            DATA.total_min[i]        = min;
            DATA.total_mean[i]       = Number((total / DATA.upscaled_num).toFixed(3));
            
        }
        
    },
    
    
    
    /* FORMATTING */
    
    /**
     * @function
     * @memberof module:DATA
     * @desc returns a HEX color code from a limited selection; depends on given index
     * @param {number} index - integer
     * @returns {string} HEX color code
     */
    getItemColor : function (index) {
      
        var colors = [
            
            '#099b9b', // darkaqua
            '#a52a2a', // brown
            '#9f8605', // darkgold
            '#556b2f', // darkolivegreen
            '#8b008b', // darkmagenta
            
            '#1616ad', // darkblue
            '#bf775f', // darksalmon
            '#888236', // darkhaki
            '#5ebf5e', // lightgreen
            '#9932cc', // darkorchid
            
            '#3f238d', // blueishviolet
            '#800000', // maroon
            '#a2651b', // darkorange
            '#808000', // olive
            '#800080' // purple
            
        ];
        
        // remove possible digits after comma
        index = _.truncate(index);
        
        // return a color from array corresponding to index or its multiple
        return colors[index % colors.length];
        
    },
    
    number_names : {
        'Thousand'          : Math.pow(10, 3),
        'Million'           : Math.pow(10, 6),
        'Billion'           : Math.pow(10, 9),
        'Trillion'          : Math.pow(10, 12),
        'Quadrillion'       : Math.pow(10, 15),
        'Quintillion'       : Math.pow(10, 18),
        'Sextillion'        : Math.pow(10, 21),
        'Septillion'        : Math.pow(10, 24),
        'Octillion'         : Math.pow(10, 27),
        'Nonillion'         : Math.pow(10, 30),
        'Decillion'         : Math.pow(10, 33),
        'Undecillion'       : Math.pow(10, 36),
        'Duodecillion'      : Math.pow(10, 39),
        'Tredecillion'      : Math.pow(10, 42),
        '*10^45'            : Math.pow(10, 45),
        '*10^48'            : Math.pow(10, 48),
        '*10^51'            : Math.pow(10, 51),
        '*10^54'            : Math.pow(10, 54),
        '*10^57'            : Math.pow(10, 57),
        '*10^60'            : Math.pow(10, 60),
        '*10^63'            : Math.pow(10, 63),
        '*10^66'            : Math.pow(10, 66),
        '*10^69'            : Math.pow(10, 69),
        '*10^72'            : Math.pow(10, 72),
        '*10^75'            : Math.pow(10, 75),
        '*10^78'            : Math.pow(10, 78),
        '*10^81'            : Math.pow(10, 81),
        '*10^84'            : Math.pow(10, 84),
        '*10^87'            : Math.pow(10, 87),
        '*10^90'            : Math.pow(10, 90),
        '*10^93'            : Math.pow(10, 93),
        '*10^96'            : Math.pow(10, 96),
        '*10^99'            : Math.pow(10, 99)
    },
    
    /**
     * @function
     * @memberof module:DATA
     * @desc formats a number to its shortened word equivalent, e.g. 1300000 -> "1.3 Million"
     * @param {number} num
     * @returns {string} formatted number
     */
    formatNumber : function (num) {
        
        var is_negative = num < 0       ? true : false;
        var sign        = is_negative   ? '-' : '';
        var word        = '';
        var short       = 0;
        
        // make number positive for conversion (re-add minus symbol later)
        if (is_negative) {
            num *= -1;
        }
        
        // if number is less than 1 thousand, don't change it
        if (num < 1000) {
            return sign + num;
        }
        
        // go through number types and assign the most fitting one
        for (var name in DATA.number_names) {
            
            var value = DATA.number_names[name];
            
            if (num >= value && num < value * 1000) {
                // round to 1 digit after the comma and append describing name
                return sign + Number(num / value).toFixed(1) + ' ' + name;
            }
            
        }
        
        // if no fitting number name has been found, number is too large to display
        return sign + '&infin;';
        
    },
    
}