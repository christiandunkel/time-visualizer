/**
 * @file defines utility functions used in different parts of the code base
 * @license https://github.com/christiandunkel/time-visualizer/blob/master/doc/license.md
 */

"use strict";

/** @module _ */
var _ = {
    
    /*
     * =====================
     * === DOM SELECTION ===
     * =====================
     */
    
    /**
     * @function
     * @memberof module:_
     * @desc selects HTML element by id
     * @param {string} selector - string containing a HTML id
     * @returns {Object} if an element was found, returns HTML node
     * @returns {null} if a wrong selector was given or no element was found
     */
    id : function (selector) {
        
        if (!_.isString(selector)) {
            console.error('No valid selector given.');
            return null;
        }
        
        return document.getElementById(selector);
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc selects HTML element(s) by class
     * @param {string} selector - string containing one or multiple space-seperated HTML classes
     * @param {string} context - container element in which to search for class
     * @returns {HTMLCollection} if the selector and context (if given) were valid
     * @returns {null} if non-valid selector or context was given
     */
    class : function (selector, context) {
        
        if (!_.isString(selector)) {
            console.error('No valid selector given.');
            return null;
        }
        
        if (_.isDefined(context) && context == null) {
            console.error('No valid element provided as context (parent of some order). This parameter is optional and may remain empty.');
            return null;
        }
        
        return (context || document).getElementsByClassName(selector);
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc selects HTML element(s) by tag
     * @param {string} selector - string containing a HTML tag
     * @param {string} context - container element in which to search for tag
     * @returns {HTMLCollection} if the selector and context (if given) were valid
     * @returns {null} if non-valid selector or context was given
     */
    tag : function (selector, context) {
        
        if (!_.isString(selector)) {
            console.error('No valid selector given.');
            return null;
        }
        
        if (_.isDefined(context) && context == null) {
            console.error('No valid element provided as context (parent of some order). This parameter is optional and may remain empty.');
            return null;
        }
        
        return (context || document).getElementsByTagName(selector);
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc selects HTML element(s) using a CSS selector
     * @param {string} selector - string containing a valid CSS selector
     * @param {string} context - container element in which to search for tag
     * @param {function} callback - called when querySelector is not supported by browser
     * @returns {HTMLCollection} if the selector and context (if given) were valid
     * @returns {null} if non-valid selector or context was given
     */
    select : function (selector, context, callback) {
        
        if (!_.isString(selector)) {
            console.error('No valid selector given.');
            return null;
        }
        
        if (_.isDefined(context) && context == null) {
            console.error('No valid element provided as context (parent of some order). This parameter is optional and may remain empty.');
            return null;
        }
        
        // select DOM as context, if context is not properly defined
        if (typeof(context) === 'undefined') {
            context = document;
        }
        
        // look up simple classes, ids or tags directly in DOM
        if (/^(#?[\w\-]+|\.[\w\-\.]+)$/.test(selector)) {
            switch (selector.charAt(0)) {
                case '#':
                    return [context.getElementById(selector.substr(1))];
                case '.':
                    return context.getElementsByClassName(selector.substr(1).replace(/\./g, ' '));
                default:
                    return context.getElementsByTagName(selector);
            }
        }
        
        // use query selector API
        if (context.querySelectorAll) {
            return context.querySelectorAll(selector);
        }
        // call callback function if querySelector is not supported
        else if (_.isFunction(callback)) {
            callback();
        }
        
    },
    
    // check if the first element contains the second
    contains : function (parent, child) {
        
        if (!_.exists(parent)) {
            console.error('No valid parent element given.');
            return null;
        }
        
        if (!_.exists(child)) {
            console.error('No valid child element given.');
            return null;
        }
        
        return (parent == child ? false : parent.contains(child));
        
    },
    
    // check if an element is defined, and optionally find it in DOM
    exists : function (elem, lookInDOM) {
        
        // only allow boolean value for variable
        if (lookInDOM !== true) {
            lookInDOM = false;
        }
        
        if (_.isUndefined(elem) || elem === null) {
            return false;
        }
        
        return lookInDOM === true ? document.body.contains(elem) : true;
        
    },
    
    
    
    
    
    /*
     * ========================
     * === DOM MANIPULATION ===
     * ========================
     */
    
    // create a new HTML element
    create : function (str, settings) {
        
        if (!_.isString(str)) {
            return console.error('No string given.');
        }
        
        if (_.isDefined(settings) && !_.isObject(settings)) {
            return console.error('No valid settings object was provided.');
        }
        
        var id = str.match(/#[^\.#\s]+/g);
        var classes = str.match(/\.[^#\s\.]+/g);
        var elem = document.createElement(str.replace(/#[^\.#\s]+|\.[^#\s]+|\s/g,''));

        // apply id from string as attribute
        if (id) {
            elem.id = id[0].replace(/#/, '');
        }

        // apply classes from string as attribute
        if (classes) {
            elem.className = classes.join(' ').replace(/\./g, '');
        }
        
        
        if (_.isDefined(settings)) {

            if (!_.isObject(settings)) {
                console.error('Given settings object is not valid.');
            }
            else {

                for (var key in settings) {

                    // skip iteration if the current property belongs to the prototype
                    if (settings.hasOwnProperty(key)) {
                        switch (key) {

                            case 'innerHTML':    
                                elem.innerHTML = settings[key];
                                break;

                            case 'style':
                                for (var prop in settings[key]) {
                                    elem.style.setProperty(prop, settings[key][prop]);
                                }
                                break;

                            default:
                                elem.setAttribute(key, settings[key]);

                        }
                    }

                }

            }

        }
        
        return elem;
        
    },

    // appends elem2 to elem1
    append : function (elem1, elem2) {
        
        if (!_.exists(elem1)) {
            return console.error('First given element does not exist.');
        }
        
        if (_.isUndefined(elem2)) {
            return console.error('Second given parameter is neither an element, text or a number.');
        }

        // if elem2 is text or a number, convert it to a text node
        if (_.isString(elem2) || _.isNumber(elem2)) {
            elem2 = document.createTextNode(elem2);
        }
        
        elem1.appendChild(elem2);

    },

    // prepends elem2 to elem1
    prepend : function (elem1, elem2) {
        
        if (!_.exists(elem1)) {
            return console.error('First given element does not exist.');
        }
        
        if (_.isUndefined(elem2)) {
            return console.error('Second given parameter is neither an element, text or a number.');
        }

        // if elem2 is text or a number, convert it to a text node
        if (_.isString(elem2) || _.isNumber(elem2)) {
            elem2 = document.createTextNode(elem2);
        }
        
        elem1.insertBefore(elem2, elem1.childNodes[0]);

    },

    // insert elem2 after elem1
    after : function (elem1, elem2) {
        
        if (!_.exists(elem1)) {
            return console.error('First given element does not exist.');
        }
        
        if (_.isUndefined(elem2)) {
            return console.error('Second given parameter is neither an element, text or a number.');
        }

        // if elem2 is text or a number, convert it to a text node
        if (_.isString(elem2) || _.isNumber(elem2)) {
            elem2 = document.createTextNode(elem2);
        }
        
        elem1.parentNode.insertBefore(elem2, elem1.nextSibling);

    },

    // inserts elem2 before elem1
    before : function (elem1, elem2) {
        
        if (!_.exists(elem1)) {
            return console.error('First given element does not exist.');
        }
        
        if (_.isUndefined(elem2)) {
            return console.error('Second given parameter is neither an element, text or a number.');
        }

        // if elem2 is text or a number, convert it to a text node
        if (_.isString(elem2) || _.isNumber(elem2)) {
            elem2 = document.createTextNode(elem2);
        }

        elem1.insertBefore(elem2, elem1);

    },
    
    // removes an element with all of its children
    remove : function (elem) {
        
        if (!_.exists(elem)) {
            elem.parentNode.removeChild(elem);
        }
        
    },
    
    // deletes all child nodes from an element
    empty : function (elem) {
        
        if (!_.exists(elem)) {
            return console.error('Element does not exist.');
        }
        
        elem.innerHTML = '';
        
    },
    
    
    
    
    
    /*
     * ==============
     * === EVENTS ===
     * ==============
     */
    
    // adds an event to an element
    addEvent : function (elem, event, fn, useCapture) {
        
        if (!_.exists(elem)) {
            return console.error('Element does not exist.');
        }
        
        if (!_.isString(event)) {
            return console.error('No event name was given.');
        }
        
        if (!_.isFunction(fn)) {
            return console.error('No function was given.');
        }
        
        if (useCapture !== true) {
            useCapture = false;
        }

        if ('addEventListener' in elem) {
            elem.addEventListener(event, fn, useCapture);
        }
        else {
            // internet explorer fallback
            elem.attachEvent('on' + event, fn);
        }
        
    },
    
    // removes an event of an element
    removeEvent : function (elem, event, fn, useCapture) {
        
        if (!_.exists(elem)) {
            return console.error('Element does not exist.');
        }
        
        if (!_.isString(event)) {
            return console.error('No event name was given.');
        }
        
        if (!_.isFunction(fn)) {
            return console.error('No function was given.');
        }
        
        if (useCapture !== true) {
            useCapture = false;
        }

        if ('removeEventListener' in elem) {
            elem.removeEventListener(event, fn, useCapture);
        }
        else {
            // internet explorer fallback
            elem.detachEvent('on' + event, fn);
        }
        
    },
    
    // adds a click event to an element
    addClick : function (elem, fn, useCapture) {
        _.addEvent(elem, 'click', fn, useCapture);
    },
    
    // removes a click event from an element
    removeClick : function (elem, fn, useCapture) {
        _.removeEvent(elem, 'click', fn, useCapture);
    },
    
    // returns the target element of an event object
    target : function (elem) {
        
        if (!_.exists(elem)) {
            return console.error('Element does not exist.');
        }
        
        return elem.target || elem.srcElement;
        
    },
    
    preventDefault : function (elem) {
        elem.preventDefault();
        elem.stopPropagation();
    },
    
    
    
    
    
    /*
     * ===============
     * === CLASSES ===
     * ===============
     */
    
    // add class to an element
    addClass : function (elem, class_) {
        
        if (!_.exists(elem)) {
            return console.error('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.error('No class name was given.');
        }

        // use classList API if available
        if ('classList' in elem) {
            elem.classList.add(class_);
        }
        else if (elem.className.split(" ").indexOf(class_) == -1) {
            elem.className += ' ' + class_;
        }
        
    },
    
    // removes class of an element
    removeClass : function (elem, class_) {
        
        if (!_.exists(elem)) {
            return console.error('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.error('No class name was given.');
        }

        // use classList API if available
        if ('classList' in elem) {
            elem.classList.remove(class_);
        }
        else {
            // otherwise use REGEX to remove the class
            elem.className = elem.className.replace(
                new RegExp('\b' + _.escapeRegex(class_) + '\b', 'g'),
            ' ');
        }
        
    },
    
    // toggles the given class on an element
    toggleClass : function (elem, class_) {
        
        if (!_.exists(elem)) {
            return console.error('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.error('No class name was given.');
        }

        if (_.hasClass(elem, class_)) {
            _.removeClass(elem, class_);
        }
        else {
            _.addClass(elem, class_);
        }
        
    },
    
    // check if an element has the given class
    hasClass : function (elem, class_) {
        
        if (!_.exists(elem)) {
            return console.error('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.error('No class name was given.');
        }
        
        // use classList API if available
        if ('classList' in elem) {
            return elem.classList.contains(class_);
        }
        else if (elem.className.split(" ").indexOf(class_) == -1) {
            return false;
        }
        
        return true;
        
    },
    
    
    
    
    
    /*
     * ===========
     * === CSS ===
     * ===========
     */
    
    // returns value of given css property
    getStyle : function (elem, style) {
        
        if (!_.exists(elem)) {
            return console.error('Element is not defined.');
        }
        
        if (!_.isString(style)) {
            return console.error('Given style is not a string.');
        }
        
        if ('getComputedStyle' in window) {
            return window.getComputedStyle(elem, null).getPropertyValue(style);
        }
        else if ('currentStyle' in elem) {
            return elem.currentStyle[style];
        }
        
    },
    
    setStyles : function (elem, styles) {
        
        if (!_.exists(elem)) {
            return console.error('Element is not defined.');
        }
        
        if (_.isDefined(styles) && !_.isObject(styles)) {
            return console.error('No valid styles object was provided.');
        }
        
        for (var style_name in styles) {
            elem.style.setProperty(style_name, styles[style_name]);
        }
        
    },

    // returns element height in pixel
    getHeight : function (elem) {
        
        if (!_.exists(elem)) {
            return console.error('Element is not defined.');
        }
        
        var r = elem.getBoundingClientRect();
        return r.bottom - r.top;
        
    },

    // returns element width in pixel
    getWidth : function (elem) {
        
        if (!_.exists(elem)) {
            return console.error('Element is not defined.');
        }
        
        var r = elem.getBoundingClientRect();
        return r.right - r.left;
        
    },
    
    
    
    
    
    /*
     * ==================
     * === TYPE TESTS ===
     * ==================
     */
    
    // test if variable is a function
    isFunction : function (n) {
        return typeof(n) == 'function';
    },
    
    // tests if variable is an object (excluding null)
    isObject : function (n) {
        return typeof(n) == 'object' && n !== null;
    },

    // tests if variable is an array
    isArray : function (n) {
        return _.isDefined(n) && n !== null && n.constructor === Array;
    },

    // tests if variable is a string
    isString : function (n) {
        return typeof(n) == 'string';
    },

    // tests if variable is a number
    isNumber : function (n) {
        return typeof(n) == 'number';
    },

    // tests if variable is an integer
    isInteger : function (n) {
        return typeof(n) == 'number' && n % 1 === 0;
    },

    // tests if variable is a floating point number
    isFloat : function (n) {
        return typeof(n) == 'number' && n % 1 !== 0;
    },

    // tests if variable is defined
    isDefined : function (n) {
        return typeof(n) != 'undefined';
    },

    // tests if variable is undefined
    isUndefined : function (n) {
        return typeof(n) == 'undefined';
    },
    
    
    
    
    
    /*
     * ====================
     * === SANITIZATION ===
     * ====================
     */
    
    // escapes string to be regex-compatible
    escapeRegex : function (str) {
        
        if (!_.isString(class_)) {
            return console.error('No string was given.');
        }
        
        return ('' + str).replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\\/\-]/g, '\\$&');
        
    },

    // encodes HTML reserved characters
    encodeHTML : function (str) {
        
        if (!_.isString(str)) {
            return console.error('No string was given.');
        }
        
        return ('' + str).replace(/&/g, '\&amp\;')
                         .replace(/</g, '\&lt\;')
                         .replace(/>/g, '\&gt\;')
                         .replace(/"/g, '\&quot\;')
                         .replace(/'/g, '\&#039\;');
        
    },

    // decodes HTML reserved characters
    decodeHTML : function (str) {
        
        if (!_.isString(class_)) {
            return console.error('No string was given.');
        }
        
        return ('' + str).replace(/\&amp\;/g, '&')
                         .replace(/\&lt\;/g, '<')
                         .replace(/\&gt\;/g, '>')
                         .replace(/\&quot\;/g, '"')
                         .replace(/\&#039\;/g, '\'');
        
    },
    
    // parses a JSON string to an object
    parseJSON : function (str) {
        
        if (!_.isString(str)) {
            return console.error('No string was given.');
        }

        var obj = null;
        
        try {
            obj = JSON.parse(str);
        }
        catch (err) {
            console.error('Could not parse the given string as JSON, because of a ' + err);
        }

        return obj;
        
    },
    
    
    
    
    
    /*
     * ============
     * === MATH ===
     * ============
     */
    
    // sort array containing objects of the same type by a given property (and its value)
    sortObject : function (obj, property, descending) {
        
        if (descending) {
            
            return obj.sort(function (a, b) {
                return a[property] < b[property] ? 1 : -1;
            });
            
        }
        else {
            
            return obj.sort(function (a, b) {
                return a[property] > b[property] ? 1 : -1;
            });
            
        }
        
    },
    
    // returns the average of an array of values
    getAverage : function (arr) {
        
        var total = 0;
        var len = arr.length;
        
        for (var i = 0; i < len; i++) {
            total += arr[i];
        }
        
        return total / len;
        
    },
    
    // returns the smallest value of an array of values
    getMin : function (arr, start_minimum) {
        
        var min = _.isNumber(start_minimum) ? start_minimum : Number.MAX_VALUE;
        var len = arr.length;
        
        for (var i = 0; i < len; i++) {
            var curr = arr[i];
            if (curr < min) {
                min = curr;
            }
        }
        
        return min;
        
    },
    
    // returns the highest value of an array of values
    getMax : function (arr, start_maximum) {
        
        var max = _.isNumber(start_maximum) ? start_maximum : Number.MIN_VALUE;
        var len = arr.length;
        
        for (var i = 0; i < len; i++) {
            var curr = arr[i];
            if (curr > max) {
                max = curr;
            }
        }
        
        return max;
        
    },
    
    // removes an index from an array
    removeArrayIndex : function (arr, index) {
        
        var len = arr.length;
        
        // remove index
        for (var i = index; i < len - 1; i++) {
            arr[i] = arr[i+1];
        }
        
        // remove last value
        arr.pop();
        
        return arr;
        
    },
    
    // replaces a number if it exceeds the given upper or lower limit
    limitNumber : function (num, min, max) {
        
        if (num < min) {
            num = min;
        }
        else if (num > max) {
            num = max;
        }
        
        return num;
        
    }
    
};