/** 
 * @module FILE
 * @desc reads and validates the data from JSON data sets 
 */
var FILE = {
    
    /**
     * @function
     * @memberof module:FILE
     * @desc loads a data set from a URL (same origin)
     * @param {string} url - link to JSON data set
     * @param {boolean} [showConfirmation=false] - set to true, if a confirmation message that a 'data set' was loaded, should be shown in 'data load' window
     * @returns {Object} request - XMLHttpRequest
     */
    loadURL : function (url, showConfirmation) {
        
        // XMLHttpRequest won't work, if index.html is loaded locally as a file in browser
        if (window.location.protocol === 'file:') {
            console.error('The protocol for this HTML page is "file". The same-origin browser policy prevents loading files from web URLs.');
            return;
        }
        
        // load example data set (only works on localhost or web server)
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();

        // when received, transform the JSON into a chart
        request.onreadystatechange = function (e) {
            
            if (request.readyState === 4 && request.status === 200) {
                
                var json_text = request.responseText;

                // send data to FILE which will load it into the web app
                if (json_text != null && json_text != '') {
                    MAIN.initializeDataSet(json_text, showConfirmation);
                }

            }
            
        }
        
        return request;
        
    },
    
    /**
     * @function
     * @memberof module:FILE
     * @desc reads a JSON file and sends the generated object to MAIN
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

        // warn users loading big files
        if (file.size > 20000) { // in KB
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

        // otherwise, handle loaded data set
        reader.onload = function (e) {
            var json_string = _.target(e).result;
            MAIN.initializeDataSet(json_string, true);
        }
        
    },
    
    /**
     * @function
     * @memberof module:FILE
     * @desc parses a string into a JSON object
     * @param {string} str - JSON data
     * @returns {Object}
     */
    getObjectFromJSON : function (str) {
            
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
                
    },
    
    /**
     * @function
     * @memberof module:FILE
     * @desc determines if the given data set is valid
     * @param {Object} json
     * @returns {boolean} true, if data set is valid
     * @returns {string} error message, if it's an invalid object
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
        
        
        
        /* items */
        
        if (typeof(obj.items) === 'undefined') {
            return '"items" value must be defined.';
        }
        
        if (_.isEmptyObject(obj.items)) {
            return '"items" value must contain at least one item.';
        }
        
        var items = [];
        
        // go through all items to validate them
        for (var prop in obj.items) {
           
            // skip if is prototype property
            if (!obj.items.hasOwnProperty.call(obj.items, prop)) {
                continue;
            }
            
            // add item to array for later
            items[items.length] = prop;
            
            if (typeof(obj.items[prop].name) === 'undefined') {
                return '"name" value in item "' + prop + '" is undefined.';
            }
            
            if (!_.isString(obj.items[prop].name)) {
                return '"name" value in item "' + prop + '" must be a string, but is of type "' + typeof(obj.items[prop].name) + '".';
            }
            
            // icon is optional, but if it's defined, it must be a string
            if (typeof(obj.items[prop].icon) !== 'undefined' && !_.isString(obj.items[prop].icon)) {
                return '"icon" value in item "' + prop + '" must be a string, but is of type "' + typeof(obj.items[prop].icon) + '".';
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
            return '"data" value must contain data for at least one item.';
        }
        
        var item_num = items.length;
        
        // go through all items to validate their data
        for (var i = 0; i < item_num; i++) {
            
            var item = items[i];
            
            if (_.isEmptyObject(obj.data[item])) {
                return 'No data points are defined in "' + item + '".';
            }
            
            // go through all data points in item
            for (var point in obj.data[item]) {
                
                if (!point.match(/^\-?[0-9]+$/g)) {
                    return 'Name "' + point + '" in item "' + item + '" must be a whole number.'
                }
                
                if (!_.isNumber(obj.data[item][point])) {
                    return 'Value of "' + point + '" in item "' + item + '" must be a number, but is of type ' + typeof(obj.data[item][point]) + '.';
                }
                
            }
            
        }
        
        
        
        // dara set is valid
        return true;
        
    }
    
}