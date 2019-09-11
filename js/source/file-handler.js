/** 
 * @module FILE
 * @desc reads and validates the data from JSON data sets 
 */
var FILE = {
    
    /**
     * @function
     * @memberof module:FILE
     * @desc determines if the given data set is valid
     * @param {Object} json
     * @returns {boolean} true, if data set is valid
     * @returns {string} error message, if it's invalid
     */
    isValidData : function (obj) {
        
        /* general */
        
        if (typeof(obj.name) === 'undefined') {
            return '"name" value is not defined.';
        }
        
        if (!_.isString(obj.name)) {
            return '"name" value must be a string.';
        }
        
        if (typeof(obj.date) === 'undefined') {
            return '"date" value must be defined.';
        }
        
        if (!_.isString(obj.date)) {
            return '"date" value must be a string.';
        }
        
        
        
        /* keys */
        
        if (typeof(obj.keys) === 'undefined') {
            return '"keys" value must be defined.';
        }
        
        if (_.isEmptyObject(obj.keys)) {
            return '"keys" value must contain at least one key.';
        }
        
        var keys = [];
        
        // go through all keys to validate them
        for (var prop in obj.keys) {
           
            // skip if is prototype property
            if (!obj.hasOwnProperty.call(obj.keys, prop)) {
                continue;
            }
            
            // add key to array for later
            keys[keys.length] = prop;
            
            if (typeof(obj.keys[prop].name) === 'undefined') {
                return '"name" value in key "' + prop + '" is undefined.';
            }
            
            if (!_.isString(obj.keys[prop].name)) {
                return '"name" value in key "' + prop + '" must be a string, but is of type "' + typeof(obj.keys[prop].name) + '".';
            }
            
            if (typeof(obj.keys[prop].icon) === 'undefined') {
                return '"icon" value in key "' + prop + '" is undefined.';
            }
            
            if (!_.isString(obj.keys[prop].icon)) {
                return '"icon" value in key "' + prop + '" must be a string, but is of type "' + typeof(obj.keys[prop].icon) + '".';
            }
            
        }
        
        
        
        /* range */
        
        if (typeof(obj.range) === 'undefined') {
            return '"range" value is not defined.';
        }
        
        if (typeof(obj.range.from) === 'undefined') {
            return 'Range "from" value must be defined.';
        }
        
        if (!_.isInteger(obj.range.from)) {
            return 'Range "from" value must be a number (integer).';
        }
        
        if (typeof(obj.range.to) === 'undefined') {
            return 'Range "to" value is not defined.';
        }
        
        if (!_.isInteger(obj.range.to)) {
            return 'Range "to" value must be a number (integer).';
        }
        
        
        
        /* data */
        
        if (typeof(obj.data) === 'undefined') {
            return '"data" value must be defined.';
        }
        
        if (_.isEmptyObject(obj.data)) {
            return '"data" value must contain at least one key.';
        }
        
        var key_num = keys.length;
        
        // go through all keys to validate them
        for (var i = 0; i < key_num; i++) {
            
            var key = keys[i];
            
            if (_.isEmptyObject(obj.data[key])) {
                return 'No data points are defined in "' + key + '".';
            }
            
            // go through data points in key
            for (var point in obj.data[key]) {
                
                if (!point.match(/^\-?[0-9]+$/g)) {
                    return 'Name "' + point + '" in key "' + key + '" must be a whole number.'
                }
                
                if (!_.isNumber(obj.data[key][point])) {
                    return 'Value of "' + point + '" in key "' + key + '" must be a number, but is of type ' + typeof(obj.data[key][point]) + '.';
                }
                
            }
            
        }
        
        
        
        // dara set is valid
        return true;
        
    },
    
    
    
    /* FILE PROCESSING */
    
    /**
     * @function
     * @memberof module:FILE
     * @desc reads a given file and sends the string to parseJSON()
     * @param {Object} file - file reference
     */
    process : function (file) {
        
        if (!file) {
            console.error('File is not defined.');
            return;
        }
        
        // warn user if FileReader API is not supported
        if (!_.isFunction(window.FileReader)) {
            MSG.error('FileReader API is not supported in your browser. Update or switch browsers!');
            return;
        }
        
        // filter out all files besides .json and .txt
        if (!/\.(json|txt)$/.test(file.name)) {
            MSG.error('Only .json and .txt files are allowed.');
            return;
        }

        // warn users loading files bigger than 10KB
        if (file.size > 10000) {
            var warning_msg = 'This data set is large (' + (file.size/1000) + 'KB) and may freeze your tab momentarily. Do you want to continue?';
            // check if the user wants to continue
            if (!confirm(warning_msg)) {
                return;
            }
        }
        
        // read file
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        // on error, warn user
        reader.onerror = function (e) {
            MSG.error('File could not be read.');
        }

        // otherwise, proceed on converting file content to object
        reader.onload = function (e) {
        
            // switch back to bar chart
            NAV.showColumnChart();
            
            // generate an object from JSON string
            var json_string = _.target(e).result;
            var obj = FILE.parseJSON(json_string);
            
            // send it to VISUALIZER to create the charts
            VISUALIZER.createCharts(obj, true);
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:FILE
     * @desc parses a string into a JSON object
     * @param {string} str - JSON data
     * @returns {Object}
     */
    parseJSON : function (str) {
            
        // generate an object from JSON string
        var obj = _.parseJSON(str);

        // warn user, if the string could not be parsed as JSON
        if (!obj) {
            MSG.error('Could not parse the file as it\'s not valid JSON.');
            return false;
        }
        
        // warn user, if the data set is missing required properties
        var is_valid = FILE.isValidData(obj);
        if (_.isString(is_valid)) {
            MSG.error(is_valid, 7000);
            return false;
        }
        
        return obj;
                
    }
    
}