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
     * @desc selects HTML node by id
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
     * @desc selects HTML node(s) by class
     * @param {string} selector - string containing one or multiple space-seperated HTML classes
     * @param {string} [context=document] - container element in which to search for class
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
     * @desc selects HTML node(s) by tag
     * @param {string} selector - string containing a HTML tag
     * @param {string} [context=document] - container element in which to search for tag
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
     * @desc selects HTML node(s) using a CSS selector
     * @param {string} selector - string containing a valid CSS selector
     * @param {string} [context=document] - container element in which to search for tag
     * @param {function} [callback] - called when querySelector is not supported by browser
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

    /**
     * @function
     * @memberof module:_
     * @desc check if the first HTML node contains the second
     * @param {Object} parent - supposed parent HTML node
     * @param {Object} child - supposed child HTML node
     * @returns {boolean} returns true if the first HTML node contains the second
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc check if a HTML node (or value) exists and optionally find it in HTML DOM
     * @param {Object} elem - preferably a HTML node, but can be any value
     * @param {boolean} lookInDOM - if set to true, will search the HTML DOM for the HTML node
     * @returns {boolean} returns true if the element exists, but will return false if the element doesn't (will return false if 'lookInDom' is set to true and element exists, but isn't in HTML DOM)
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc creates a new HTML node
     * @param {string} str - selector in the form of tag#id.class1.class2
     * @param {Object} [settings] - object holding the HTML and style properties
     * @returns {Object} the created HTML node
     */
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

    /**
     * @function
     * @memberof module:_
     * @desc appends elem2 in elem1
     * @param {Object} elem1 - HTML node
     * @param {Object} elem2 - HTML node to append
     */
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

    /**
     * @function
     * @memberof module:_
     * @desc prepends elem2 in elem1
     * @param {Object} elem1 - HTML node
     * @param {Object} elem2 - HTML node to prepend
     */
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

    /**
     * @function
     * @memberof module:_
     * @desc inserts elem2 after elem1
     * @param {Object} elem1 - HTML node
     * @param {Object} elem2 - HTML node to insert
     */
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

    /**
     * @function
     * @memberof module:_
     * @desc inserts elem2 before elem1
     * @param {Object} elem1 - HTML node
     * @param {Object} elem2 - HTML node to insert
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc removes a HTML node with all of its child HTML nodes
     * @param {Object} elem - HTML node to remove
     */
    remove : function (elem) {
        
        if (!_.exists(elem)) {
            elem.parentNode.removeChild(elem);
        }
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc removes all child HTML nodes of a HTML node
     * @param {Object} elem - HTML node to empty
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc adds an event listener to a HTML node
     * @param {Object} elem - HTML node
     * @param {string} event - event type
     * @param {function} fn - function to be called when the event is triggered
     * @param {boolean} [useCapture=false]
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc removes an event listener from a HTML node
     * @param {Object} elem - HTML node on which the event was defined
     * @param {string} event - event type
     * @param {function} fn - function that was defined to be triggered from the event
     * @param {boolean} [useCapture=false] - the same useCapture value defined when creating the event
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc adds a click event listener to a HTML node
     * @param {Object} elem - HTML node
     * @param {function} fn - function to be called when the event is triggered
     * @param {boolean} [useCapture=false]
     */
    addClick : function (elem, fn, useCapture) {
        _.addEvent(elem, 'click', fn, useCapture);
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc removes a click event listener from a HTML node
     * @param {Object} elem - HTML node on which the event was defined
     * @param {function} fn - function that was defined to be triggered from the event
     * @param {boolean} [useCapture=false] - the same useCapture value defined when creating the event
     */
    removeClick : function (elem, fn, useCapture) {
        _.removeEvent(elem, 'click', fn, useCapture);
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc returns the target element of an event object
     * @param {event} e - HTML node on which the event was defined
     * @returns {Object} target HTML node
     */
    target : function (e) {
        
        if (!_.exists(e)) {
            return console.error('Event does not exist.');
        }
        
        return e.target || e.srcElement;
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc prevents default event actions happening for this specific event
     * @param {event} e
     */
    preventDefault : function (e) {
        e.preventDefault();
        e.stopPropagation();
    },
    
    
    
    
    
    /*
     * ===============
     * === CLASSES ===
     * ===============
     */
    
    /**
     * @function
     * @memberof module:_
     * @desc adds class to HTML node
     * @param {Object} elem - HTML node
     * @param {string} class_ - class name (using multiple class names may not work in older browsers)
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc removes class from HTML node
     * @param {Object} elem - HTML node
     * @param {string} class_ - class name (using multiple class names may not work in older browsers)
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc toggles class on and off on HTML node
     * @param {Object} elem - HTML node
     * @param {string} class_ - class name (using multiple class names may not work in older browsers)
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc checks if the HTML node has the given class
     * @param {Object} elem - HTML node
     * @param {string} class_ - single class name
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc returns value of given css property
     * @param {Object} elem - HTML node
     * @param {string} style - CSS property name
     * @returns {string} CSS property value
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc sets the given CSS property values to the HTML node
     * @param {Object} elem - HTML node
     * @param {Object} styles - Object holding key (CSS property name) and value (CSS property value) pairs
     */
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

    /**
     * @function
     * @memberof module:_
     * @desc returns browser-rendered height of HTML node
     * @param {Object} elem - HTML node
     * @returns {number} height in pixels
     */
    getHeight : function (elem) {
        
        if (!_.exists(elem)) {
            return console.error('Element is not defined.');
        }
        
        var r = elem.getBoundingClientRect();
        return r.bottom - r.top;
        
    },

    /**
     * @function
     * @memberof module:_
     * @desc returns browser-rendered width of HTML node
     * @param {Object} elem - HTML node
     * @returns {number} width in pixels
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is a function
     * @param {*} n
     * @returns {boolean} true, if variable is a function
     */
    isFunction : function (n) {
        return typeof(n) == 'function';
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is an object (excluding null object)
     * @param {*} n
     * @returns {boolean} true, if variable is an object (excluding null)
     */
    isObject : function (n) {
        return typeof(n) == 'object' && n !== null;
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is an array
     * @param {*} n
     * @returns {boolean} true, if variable is an array
     */
    isArray : function (n) {
        return _.isDefined(n) && n !== null && n.constructor === Array;
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is a string
     * @param {*} n
     * @returns {boolean} true, if variable is a string
     */
    isString : function (n) {
        return typeof(n) == 'string';
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is a number
     * @param {*} n
     * @returns {boolean} true, if variable is a number
     */
    isNumber : function (n) {
        return typeof(n) == 'number';
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is an integer
     * @param {*} n
     * @returns {boolean} true, if variable is an integer
     */
    isInteger : function (n) {
        return typeof(n) == 'number' && n % 1 === 0;
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is a float (floating point number)
     * @param {*} n
     * @returns {boolean} true, if variable is a float
     */
    isFloat : function (n) {
        return typeof(n) == 'number' && n % 1 !== 0;
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is defined
     * @param {*} n
     * @returns {boolean} true, if variable is defined
     */
    isDefined : function (n) {
        return typeof(n) != 'undefined';
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is undefined
     * @param {*} n
     * @returns {boolean} true, if variable is undefined
     */
    isUndefined : function (n) {
        return typeof(n) == 'undefined';
    },
    
    
    
    
    
    /*
     * ====================
     * === SANITIZATION ===
     * ====================
     */
    
    /**
     * @function
     * @memberof module:_
     * @desc escapes string to be regex-compatible
     * @param {string} str
     * @returns {string} escaped regex-friendly string
     */
    escapeRegex : function (str) {
        
        if (!_.isString(class_)) {
            return console.error('No string was given.');
        }
        
        return ('' + str).replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\\/\-]/g, '\\$&');
        
    },

    /**
     * @function
     * @memberof module:_
     * @desc encodes HTML reserved characters in a string
     * @param {string} str
     * @returns {string} encoded HTML-friendly string
     */
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

    /**
     * @function
     * @memberof module:_
     * @desc decodes HTML reserved characters in a string
     * @param {string} str
     * @returns {string} decoded string
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc parses a string containing JSON data and returns it as an object
     * @param {string} str - JSON string
     * @returns {Object} object with JSON structure
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc sort array containing objects with the same key structure by the values of a given property
     * @param {Array} arr - array containing objects with the same key structure
     * @param {string} property - property name (key) by which values to sort
     * @param {Array} [descending=false] - final order of sorted values 
     * @returns {Array} sorted array
     */
    sortArrayObjects : function (arr, property, descending) {
        
        if (descending) {
            
            return arr.sort(function (a, b) {
                return a[property] < b[property] ? 1 : -1;
            });
            
        }
        else {
            
            return arr.sort(function (a, b) {
                return a[property] > b[property] ? 1 : -1;
            });
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc returns the average of an array of number
     * @param {Array} arr - array of numbers
     * @returns {number} average of numbers
     */
    getAverage : function (arr) {
        
        var total = 0;
        var len = arr.length;
        
        for (var i = 0; i < len; i++) {
            total += arr[i];
        }
        
        return total / len;
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc returns the smallest number of an array of number
     * @param {Array} arr - array of numbers
     * @param {number} [start_minimum=Number.MAX_VALUE] - returned number needs to be smaller than this number
     * @returns {number} smallest number
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc returns the biggest number of an array of number
     * @param {Array} arr - array of numbers
     * @param {number} [start_maximum=Number.MIN_VALUE] - returned number needs to be at least this big
     * @returns {number} biggest number
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc removes an index from an array
     * @param {Array} arr
     * @param {number} index - index position to remove
     * @returns {Array} array without this index
     */
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
    
    /**
     * @function
     * @memberof module:_
     * @desc replaces a number if it exceeds the given upper or lower limit
     * @param {number} num - number to process
     * @param {number} min - smallest the number is allowed to be
     * @param {number} max - biggest the number is allowed to be
     * @returns {number} 'num' (or the closest number to it in range of min to max) 
     */
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