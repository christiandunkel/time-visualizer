"use strict";

/** 
 * @module _
 * @desc contains utility functions
 */
var _ = {
    
    /* ELEMENT SELECTION */
    
    /**
     * @function
     * @memberof module:_
     * @desc selects HTML element by id
     * @param {string} selector - string containing a HTML id
     * @returns {Object} if an element was found, returns HTML element
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
     * @param {Object} [context=document] - container element in which to search for class
     * @returns {HTMLCollection} if the selector and context (if given) were valid
     */
    class : function (selector, context) {
        
        if (!_.isString(selector)) {
            console.error('No valid selector given.');
            return null;
        }
        
        // set DOM as context, if it's not defined
        if (typeof(context) === 'undefined') {
            context = document;
        }
        
        if (!_.isElement(context)) {
            console.error('The context given is not a HTML element.');
            return null;
        }
        
        return context.getElementsByClassName(selector);
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc selects HTML element(s) by tag
     * @param {string} selector - string containing a HTML tag
     * @param {Object} [context=document] - container element in which to search for tag
     * @returns {HTMLCollection} if the selector and context (if given) were valid
     */
    tag : function (selector, context) {
        
        if (!_.isString(selector)) {
            console.error('No valid selector given.');
            return null;
        }
        
        // set DOM as context, if it's not defined
        if (typeof(context) === 'undefined') {
            context = document;
        }
        
        if (!_.isElement(context)) {
            console.error('The context given is not a HTML element.');
            return null;
        }
        
        return context.getElementsByTagName(selector);
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc selects HTML element(s) using a CSS selector
     * @param {string} selector - string containing a valid CSS selector
     * @param {Object} [context=document] - container element in which to search
     * @param {function} [callback] - called when querySelector is not supported by browser
     * @returns {HTMLCollection} if the selector and context (if given) were valid
     */
    select : function (selector, context, callback) {
        
        if (!_.isString(selector)) {
            console.error('No valid selector given.');
            return null;
        }
        
        // set DOM as context, if it's not defined
        if (typeof(context) === 'undefined') {
            context = document;
        }
        
        if (!_.isElement(context)) {
            console.error('The context given is not a HTML element.');
            return null;
        }
        
        // look up simple classes, ids or tags directly in DOM
        if (/^(#|\.)?[\w\-]+$/.test(selector)) {
            switch (selector.charAt(0)) {
                case '#':
                    return [context.getElementById(selector.substr(1))];
                case '.':
                    return context.getElementsByClassName(selector.substr(1).replace(/\./g, ' '));
            }
            return context.getElementsByTagName(selector);
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
     * @desc check if the first HTML element contains the second
     * @param {Object} parent - supposed parent HTML element
     * @param {Object} child - supposed child HTML element
     * @returns {boolean} returns true if the first HTML element contains the second
     */
    contains : function (parent, child) {
        
        if (!_.isElement(parent)) {
            console.error('No valid parent HTML element given.');
            return null;
        }
        
        if (!_.isElement(child)) {
            console.error('No valid child HTML element given.');
            return null;
        }
        
        return (parent == child ? false : parent.contains(child));
        
    },
    
    
    
    /* ELEMENT MANIPULATION */
    
    /**
     * @function
     * @memberof module:_
     * @desc creates a new HTML element
     * @param {string} str - selector in the form of tag#id.class1.class2
     * @param {Object} [settings] - object holding the HTML and style properties
     * @returns {Object} created HTML element
     */
    create : function (str, settings) {
        
        if (!_.isString(str)) {
            return console.error('No string given.');
        }
        
        if (typeof(settings) !== 'undefined') {
            if (!_.isObject(settings)) {
                return console.error('The settings given as a parameter have to be an object.');
            }
        }
        else {
            settings = {};
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

        for (var key in settings) {

            // skip iteration if the current property belongs to the prototype
            if (settings.hasOwnProperty.call(settings, key)) {
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
        
        return elem;
        
    },

    /**
     * @function
     * @memberof module:_
     * @desc appends elem2 in elem1
     * @param {Object} elem1 - HTML element
     * @param {Object} elem2 - HTML element to append
     */
    append : function (elem1, elem2) {
        
        if (!_.isElement(elem1)) {
            return console.error('First given element does not exist.');
        }
        
        if (!_.isElement(elem2) && !_.isNumber(elem2) && !_.isString(elem2)) {
            return console.error('Second given parameter is neither a HTML element, text or a number.');
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
     * @param {Object} elem1 - HTML element
     * @param {Object} elem2 - HTML element to prepend
     */
    prepend : function (elem1, elem2) {
        
        if (!_.isElement(elem1)) {
            return console.error('First given element does not exist.');
        }
        
        if (!_.isElement(elem2) && !_.isNumber(elem2) && !_.isString(elem2)) {
            return console.error('Second given parameter is neither a HTML element, text or a number.');
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
     * @param {Object} elem1 - HTML element
     * @param {Object} elem2 - HTML element to insert
     */
    after : function (elem1, elem2) {
        
        if (!_.isElement(elem1)) {
            return console.error('First given element does not exist.');
        }
        
        if (!_.isElement(elem2) && !_.isNumber(elem2) && !_.isString(elem2)) {
            return console.error('Second given parameter is neither a HTML element, text or a number.');
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
     * @param {Object} elem1 - HTML element
     * @param {Object} elem2 - HTML element to insert
     */
    before : function (elem1, elem2) {
        
        if (!_.isElement(elem1)) {
            return console.error('First given element does not exist.');
        }
        
        if (!_.isElement(elem2) && !_.isNumber(elem2) && !_.isString(elem2)) {
            return console.error('Second given parameter is neither a HTML element, text or a number.');
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
     * @desc removes a HTML element from the DOM
     * @param {Object} elem - HTML element
     */
    remove : function (elem) {
        
        if (_.isElement(elem)) {
            elem.parentNode.removeChild(elem);
        }
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc removes all child HTML elements of a HTML element
     * @param {Object} elem - HTML element
     */
    empty : function (elem) {
        
        if (!_.isElement(elem)) {
            return console.error('Element does not exist.');
        }
        
        elem.innerHTML = '';
        
    },
    
    
    
    /* EVENTS */
    
    /**
     * @function
     * @memberof module:_
     * @desc adds an event listener to a HTML element
     * @param {Object} elem - HTML element
     * @param {string} event - event type
     * @param {function} fn - function to be called when the event is triggered
     * @param {boolean} [useCapture=false]
     */
    addEvent : function (elem, event, fn, useCapture) {
        
        // given element must either be a HTML element or the window object
        if (!_.isElement(elem) && elem != window) {
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

        if ('addEventListener' in document.documentElement) {
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
     * @desc removes an event listener from a HTML element
     * @param {Object} elem - HTML element on which the event was defined
     * @param {string} event - event type
     * @param {function} fn - function that was defined to be triggered from the event
     * @param {boolean} [useCapture=false] - the same useCapture value defined when creating the event
     */
    removeEvent : function (elem, event, fn, useCapture) {
        
        if (!_.isElement(elem) && elem != window) {
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

        if ('removeEventListener' in document.documentElement) {
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
     * @desc adds a 'click' event listener to a HTML element
     * @param {Object} elem - HTML element
     * @param {function} fn - function called on trigger
     * @param {boolean} [useCapture=false]
     */
    onClick : function (elem, fn, useCapture) {
        _.addEvent(elem, 'click', fn, useCapture);
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc removes a 'click' event listener with the given parameters from a HTML element
     * @param {Object} elem - HTML element
     * @param {function} fn - function
     * @param {boolean} [useCapture=false]
     */
    removeClick : function (elem, fn, useCapture) {
        _.removeEvent(elem, 'click', fn, useCapture);
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc adds an 'input' event listener to a HTML element
     * @param {Object} elem - HTML element
     * @param {function} fn - function called on trigger
     * @param {boolean} [useCapture=false]
     */
    onInput : function (elem, fn, useCapture) {
        _.addEvent(elem, 'input', fn, useCapture);
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc removes an 'input' event listener with the given parameters from a HTML element
     * @param {Object} elem - HTML element
     * @param {function} fn - function
     * @param {boolean} [useCapture=false]
     */
    removeInput : function (elem, fn, useCapture) {
        _.removeEvent(elem, 'input', fn, useCapture);
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc adds a 'load' event listener to a HTML element
     * @param {Object} elem - HTML element
     * @param {function} fn - function called on trigger
     * @param {boolean} [useCapture=false]
     */
    onLoad : function (elem, fn, useCapture) {
        _.addEvent(elem, 'load', fn, useCapture);
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc removes a 'load' event listener with the given parameters from a HTML element
     * @param {Object} elem - HTML element
     * @param {function} fn - function
     * @param {boolean} [useCapture=false]
     */
    removeLoad : function (elem, fn, useCapture) {
        _.removeEvent(elem, 'load', fn, useCapture);
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc returns the target element of an event object
     * @param {event} e - HTML element on which the event was defined
     * @returns {Object} target HTML element
     */
    target : function (e) {
        
        if (!_.exists(e)) {
            return console.error('No valid event given.');
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
    
    
    
    /* CLASSES */
    
    /**
     * @function
     * @memberof module:_
     * @desc adds class to HTML element
     * @param {Object} elem - HTML element
     * @param {string} class_ - class name (using multiple class names may not work in older browsers)
     */
    addClass : function (elem, class_) {
        
        if (!_.isElement(elem)) {
            return console.error('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.error('No class name was given.');
        }

        // use classList API if available
        if ('classList' in document.documentElement) {
            elem.classList.add(class_);
        }
        else if (elem.className.split(" ").indexOf(class_) == -1) {
            elem.className += ' ' + class_;
        }
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc removes class from HTML element
     * @param {Object} elem - HTML element
     * @param {string} class_ - class name (using multiple class names may not work in older browsers)
     */
    removeClass : function (elem, class_) {
        
        if (!_.isElement(elem)) {
            return console.error('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.error('No class name was given.');
        }

        // use classList API if available
        if ('classList' in document.documentElement) {
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
     * @desc toggles class on and off on HTML element
     * @param {Object} elem - HTML element
     * @param {string} class_ - class name (using multiple class names may not work in older browsers)
     */
    toggleClass : function (elem, class_) {
        
        if (!_.isElement(elem)) {
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
     * @desc checks if the HTML element has the given class
     * @param {Object} elem - HTML element
     * @param {string} class_ - single class name
     * @returns {boolean} true, if HTML element has the given class
     */
    hasClass : function (elem, class_) {
        
        if (!_.isElement(elem)) {
            return console.error('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.error('No class name was given.');
        }
        
        // use classList API if available
        if ('classList' in document.documentElement) {
            return elem.classList.contains(class_);
        }
        else if (elem.className.split(" ").indexOf(class_) == -1) {
            return false;
        }
        
        return true;
        
    },
    
    
    
    /* CSS */
    
    /**
     * @function
     * @memberof module:_
     * @desc returns value of given css property
     * @param {Object} elem - HTML element
     * @param {string} style - CSS property name
     * @returns {string} CSS property value
     */
    getStyle : function (elem, style) {
        
        if (!_.isElement(elem)) {
            return console.error('Element is not defined.');
        }
        
        if (!_.isString(style)) {
            return console.error('Given style is not a string.');
        }
        
        if ('getComputedStyle' in window) {
            return window.getComputedStyle(elem, null).getPropertyValue(style);
        }
        else if ('currentStyle' in document.documentElement) {
            return elem.currentStyle[style];
        }
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc sets the given CSS property values to the HTML element
     * @param {Object} elem - HTML element
     * @param {Object} styles - Object holding key (CSS property name) and value (CSS property value) pairs
     */
    setStyles : function (elem, styles) {
        
        if (!_.isElement(elem)) {
            return console.error('Element is not defined.');
        }
        
        if (!_.isObject(styles)) {
            return console.error('No valid styles object given.');
        }
        
        for (var style_name in styles) {
            elem.style.setProperty(style_name, styles[style_name]);
        }
        
    },

    /**
     * @function
     * @memberof module:_
     * @desc returns browser-rendered height of HTML element
     * @param {Object} elem - HTML element
     * @returns {number} height in pixels
     */
    getHeight : function (elem) {
        
        if (!_.isElement(elem)) {
            return console.error('Element is not defined.');
        }
        
        var r = elem.getBoundingClientRect();
        return r.bottom - r.top;
        
    },

    /**
     * @function
     * @memberof module:_
     * @desc returns browser-rendered width of HTML element
     * @param {Object} elem - HTML element
     * @returns {number} width in pixels
     */
    getWidth : function (elem) {
        
        if (!_.isElement(elem)) {
            return console.error('Element is not defined.');
        }
        
        var r = elem.getBoundingClientRect();
        return r.right - r.left;
        
    },
    
    
    
    /* TYPE TESTS */
    
    /**
     * @function
     * @memberof module:_
     * @desc check if a value is defined and not null
     * @param {*} val
     * @returns {boolean} returns true if the element exists
     */
    exists : function (n) {
        return typeof(n) !== 'undefined' && n !== null;
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc check if a value is a HTML element
     * @param {*} val
     * @returns {boolean}
     */
    isElement : function (n) {
        return n instanceof Element || n instanceof HTMLDocument;
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc check if a value is a HTML element in the DOM
     * @param {*} val
     * @returns {boolean}
     */
    isElementInDOM : function (n) {
        return _.isElement(n) ? document.documentElement.contains(n) : false;
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc check if a value is a HTML Nodelist
     * @param {*} val
     * @returns {boolean}
     */
    isNodelist : function (n) {
        return NodeList.prototype.isPrototypeOf(n);
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc check if a value is a HTMLCollection
     * @param {*} val
     * @returns {boolean}
     */
    isHTMLCollection : function (n) {
        return HTMLCollection.prototype.isPrototypeOf(n);
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is a function
     * @param {*} n
     * @returns {boolean} true, if variable is a function
     */
    isFunction : function (n) {
        return typeof(n) === 'function';
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is an object (excluding null object)
     * @param {*} n
     * @returns {boolean} true, if variable is an object (excluding null)
     */
    isObject : function (n) {
        return typeof(n) === 'object' && n !== null;
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is an array
     * @param {*} n
     * @returns {boolean} true, if variable is an array
     */
    isArray : function (n) {
        return typeof(n) !== 'undefined' && n !== null && n.constructor === Array;
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is a string
     * @param {*} n
     * @returns {boolean} true, if variable is a string
     */
    isString : function (n) {
        return typeof(n) === 'string';
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is a number
     * @param {*} n
     * @returns {boolean} true, if variable is a number
     */
    isNumber : function (n) {
        return typeof(n) === 'number';
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is an integer
     * @param {*} n
     * @returns {boolean} true, if variable is an integer
     */
    isInteger : function (n) {
        return typeof(n) === 'number' && n % 1 === 0;
    },

    /**
     * @function
     * @memberof module:_
     * @desc tests if variable is a float (floating point number)
     * @param {*} n
     * @returns {boolean} true, if variable is a float
     */
    isFloat : function (n) {
        return typeof(n) === 'number' && n % 1 !== 0;
    },
    
    
    
    /* SANITIZATION */
    
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
     * @desc escapes the double quotes in a string
     * @param {string} str
     * @returns {string}
     */
    escapeDoubleQuotes : function (str) {
        return str.replace(/\\([\s\S])|(")/g,"\\$1$2");
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
    
    
    
    /* MATH */
    
    /**
     * @function
     * @memberof module:_
     * @desc returns the mean average of an array of number
     * @param {Array} arr - array of numbers
     * @returns {number} average of numbers
     */
    getMean : function (arr) {
        
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
     * @desc replaces a number if it exceeds the given upper or lower limit
     * @param {number} num - number to process
     * @param {number} min - smallest the number is allowed to be
     * @param {number} max - biggest the number is allowed to be
     * @param {function} [callback] - called if the number had been below or above the limit
     * @returns {number} 'num' (or the closest number to it in range of min to max) 
     */
    limitNumber : function (num, min, max, callback) {
        
        if (num < min) {
            num = min;
            if (_.isFunction(callback)) {
                callback(min);
            }
        }
        else if (num > max) {
            num = max;
            if (_.isFunction(callback)) {
                callback(max);
            }
        }
        
        return num;
        
    },
    
    /**
     * @function
     * @memberof module:_
     * @desc strips digits after comma from a number
     * @param {number} num - number to truncate
     * @returns {number} truncated number
     */
    truncate : function (num) {
        
        if (!_.isNumber(num)){
            console.error('No number given.');
            return num;
        }
        
        return num < 0 ? Math.ceil(num) : Math.floor(num);
        
    },
    
    
    
    /* CONTAINERS */
    
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
     * @desc check if an object is empty
     * @param {Object} obj
     * @returns {boolean} true, if the object is empty
     */
    isEmptyObject : function (obj) {
    
        // check if there is a none-prototype property in the object
        for (var prop in obj) {
            if (obj.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});

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
     * @desc returns the amount of keys in an object
     * @param {Object} obj
     * @returns {number}
     */
    getObjectSize : function (obj) {
        return Object.keys(obj).length;
    }
    
};





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





/** 
 * @module MSG
 * @desc manages overlay messages 
 */
var MSG = {
    
    type : {
        NORMAL      : 'normal',
        ERROR       : 'error',
        WARNING     : 'warning'
    },
    
    element : undefined,
    close_timer : null,
    hide_animation_timer : null,
    
    /**
     * @function
     * @memberof module:MSG
     * @desc generates the HTML for a message element
     * @param {string} text - content of the message
     * @param {string} type - type of the message, defined in MSG.type
     * @return {Object} HTML element
     */
    generateHTML : function (text, type) {
        
        var container = _.create('div#overlay-message.' + type, {
            'innerHTML' : _.encodeHTML(text)
        });
        
        return container;
        
    },
    
    /**
     * @function
     * @memberof module:MSG
     * @desc displays an overlay message
     * @param {string} text - content of the message
     * @param {number} close_after_ms - milliseconds until the message gets closed
     * @param {string} type - type of the message, defined in MSG.type
     */
    show : function (text, close_after_ms, type) {
        
        // if a message is still open, remove it
        MSG.hide();
        
        if (!_.isNumber(close_after_ms)) {
            close_after_ms = 3500;
        }
        
        if (close_after_ms < 800) {
            return console.error('Message must appear for at least 400ms.');
        }
        
        if (typeof(type) === 'undefined') {
            type = MSG.type.NORMAL;
        }
        
        // create message node and append it to DOM
        MSG.element = MSG.generateHTML(text, type);
        _.append(NODE.html, MSG.element);
        
        // close the message after some time
        MSG.close_timer = setTimeout(MSG.hide, close_after_ms);
        
        // activate the 'hide message' animation a little time beforehand
        MSG.hide_animation_timer = setTimeout(function () {
            _.addClass(MSG.element, 'hide');
        }, close_after_ms - 200);
        
    },
    
    /**
     * @function
     * @memberof module:MSG
     * @desc displays an overlay error message
     * @param {string} text - content of the message
     * @param {number} close_after_ms - milliseconds until the message gets closed
     */
    error : function (text, close_after_ms) {
        MSG.show(text, close_after_ms, MSG.type.ERROR);
    },
    
    /**
     * @function
     * @memberof module:MSG
     * @desc displays an overlay warning message
     * @param {string} text - content of the message
     * @param {number} close_after_ms - milliseconds until the message gets closed
     */
    warn : function (text, close_after_ms) {
        MSG.show(text, close_after_ms, MSG.type.WARNING);
    },
    
    /**
     * @function
     * @memberof module:MSG
     * @desc hides the current overlay message
     */
    hide : function () {
        
        // clear timer, if function is called from another location than setTimeout
        clearTimeout(MSG.close_timer);
        clearTimeout(MSG.hide_animation_timer);
        
        // remove the message window
        if (_.isElement(MSG.element)) {
            _.remove(MSG.element);
            MSG.element = undefined;
        }
        
    }
    
}





/** 
 * @module FOCUS_CHAIN 
 * @desc manages chains of elements that can be focussed via the tab key (hijacks the tab key event, and prevents normal focussing via browser)
 */
var FOCUS_CHAIN = {
    
    selection_type : 0,
    // 0: unselected
    // 1: by elems array
    // 2: by start_elem, end_elem and elems_container
    
    // for selection type 1, elements in focuschain
    elems : [],
    // for selection type 2:
    start_elem : null,
    end_elem : null,
    elems_container : null,
    
    /**
     * @function
     * @memberof module:NAV
     * @desc checks if the focus chain is currently active
     * @returns {boolean} true, if the focus chain is active
     */
    isActive : function () {
        return selection_type === 0;
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc sets elements as a focus chain
     * @param {Array|Object} a - either array of HTML elements or object: {
     *      start : HTML element  (start of chain)
     *      end : HTML element (end of chain)
     *      container : HTML element (contains all focussable elements in chain)
     * }
     */
    set : function (input) {
        
        // remove focus from element that currently has focus
        document.activeElement.blur();
        
        if (_.isArray(input)) {
            FOCUS_CHAIN.selection_type = 1;
            FOCUS_CHAIN.elems = input;
        }
        else {
            FOCUS_CHAIN.selection_type = 2;
            FOCUS_CHAIN.start_elem = input.start;
            FOCUS_CHAIN.end_elem = input.end;
            FOCUS_CHAIN.elems_container = input.container;
        }
        
        _.addEvent(window, 'keydown', FOCUS_CHAIN.event);
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc removes the current focus chain
     */
    reset : function () {
        
        FOCUS_CHAIN.reset();
        
        FOCUS_CHAIN.selection_type = 0;
        // reset stuff for selection type 1
        FOCUS_CHAIN.elems = [];
        // reset stuff for selection type 2
        FOCUS_CHAIN.start_elem = null;
        FOCUS_CHAIN.end_elem = null;
        FOCUS_CHAIN.elems_container = null;
        
        _.removeEvent(window, 'keydown', FOCUS_CHAIN.event);
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc event function that hijacks the tab key event and sets the focus depending on the user's current position in the focus chain 
     * @param {event} e - keydown event
     */
    event : function (e) {
        
        // tab key was pressed
        if (e.keyCode == 9) {
            
            var is_backwards_tab = (e.shiftKey === true);
            
            // handle selection
            if (FOCUS_CHAIN.selection_type == 1) {
                FOCUS_CHAIN.handleSelectionType1(e, is_backwards_tab);
            }
            else {
                FOCUS_CHAIN.handleSelectionType2(e, is_backwards_tab);
            }
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc handles setting the user focus if the focus chain consists of an array of elements
     * @param {event} e - keydown event
     * @param {boolean} go_backwards - if the focus go forward or backwards in focus chain
     */
    handleSelectionType1 : function (e, go_backwards) {
        
        // needs at least one element in chain
        if (FOCUS_CHAIN.elems.length < 1) {
            return;
        }
        // if multiple elems, focus chain can work, so prevent default focus change by browser
        else {
            e.preventDefault();
        }
            
        // only check for next focus element, if there's at least two elems
        if (FOCUS_CHAIN.elems.length != 1) {
            // find currently focussed element in chain, and focus on next in line
            for (var i = FOCUS_CHAIN.elems.length; i--;) {
                
                if (document.activeElement == FOCUS_CHAIN.elems[i]) {

                    // last element is in focus
                    if (i == FOCUS_CHAIN.elems.length - 1) {
                        // if going backwards, focus on before-last elem
                        if (go_backwards) {
                            FOCUS_CHAIN.elems[FOCUS_CHAIN.elems.length - 2].focus();
                        }
                        // if going forwards, focus on first elem
                        else {
                            FOCUS_CHAIN.elems[0].focus();
                        }
                    }
                    // first element is in focus
                    else if (i == 0) {
                        // if going backwards, focus on last elem
                        if (go_backwards) {
                            FOCUS_CHAIN.elems[FOCUS_CHAIN.elems.length - 1].focus();
                        }
                        // if going forwards, focus on next (second) elem
                        else {
                            FOCUS_CHAIN.elems[1].focus();
                        }
                    }
                    else {
                        // if going backwards, focus on previous
                        if (go_backwards) {
                            FOCUS_CHAIN.elems[i-1].focus();
                        }
                        // if going forwards, focus on next
                        else {
                            FOCUS_CHAIN.elems[i+1].focus();
                        }
                    }

                    return;
                }
                
            }
        }

        // if no element in chain is currently focussed on, focus on first in list
        FOCUS_CHAIN.elems[0].focus();
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc handles setting the user focus if the focus chain consists of a start and end element
     * @param {event} e - keydown event
     * @param {boolean} go_backwards - if the focus go forward or backwards in focus chain
     */
    handleSelectionType2 : function (e, go_backwards) {
        
        // check element that had focus until now
        if (
            !go_backwards &&
            // if last element reached, focus on first
            document.activeElement == FOCUS_CHAIN.end_elem
        ) {
            e.preventDefault();
            FOCUS_CHAIN.start_elem.focus();
            return;
        }
        
        // check element that now gets focus
        setTimeout(function () {
            
            if (
                // if no element inside window is being focussed
                !_.contains(FOCUS_CHAIN.elems_container, document.activeElement)
            ) {
                
                e.preventDefault();
                
                // if user is tabbing backwards, focus end_elem
                if (go_backwards) {
                    FOCUS_CHAIN.end_elem.focus();
                }
                // if user is tabbing forwards, focus start_elem
                else {
                    FOCUS_CHAIN.start_elem.focus();
                }
                
            }
            
        }, 5);
        
    }
    
};



/** 
 * @module NAV 
 * @desc manages the UI of the navigation area
 */
var NAV = {
    
    darkmode          : false,
    line_chart_opened : false,
    
    
    
    /**
     * @function
     * @memberof module:NAV
     * @desc initializes navigation elements with events
     */
    initialize : function () {
        
        // open 'data load' window
        _.onClick(NODE.data_load_btn, DATA_LOAD.openWindow);
        
        // start animation
        _.onClick(NODE.play_btn, ANIMATOR.play);
        
        // pause animation
        _.onClick(NODE.pause_btn, ANIMATOR.pause);
        
        // stop animation
        _.onClick(NODE.stop_btn, ANIMATOR.stop);
        
        NAV.initializeSettingsWindow();
        
        
        
        // remove this function from memory
        delete NAV.initialize
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc initializes elements in and for settings window
     */
    initializeSettingsWindow : function () {
        
        // open/close settings menu
        _.onClick(NODE.settings_btn, NAV.openSettingsWindow);
        
        NODE.settings_close_btn = _.class('close', NODE.settings_window)[0];
        _.onClick(NODE.settings_close_btn, NAV.closeSettingsWindow);
        
        NODE.settings_overlay = _.class('blur', NODE.settings_window)[0];
        _.onClick(NODE.settings_overlay, NAV.closeSettingsWindow);
        
        // toggle 'dark mode'
        _.onClick(NODE.darkmode_btn, NAV.toggleDarkMode);
        
        // speed setter buttons
        _.onClick(NODE.speed_btn.slow, NAV.setSpeed);
        _.onClick(NODE.speed_btn.normal, NAV.setSpeed);
        _.onClick(NODE.speed_btn.fast, NAV.setSpeed);
        
        // elements for setting custom speed
        _.addEvent(NODE.speed_selection.input, 'input', NAV.setCustomSpeed);
        _.onClick(NODE.speed_selection.custom, NAV.showCustomSpeedMenu);
        _.onClick(NODE.speed_selection.close_custom, NAV.showDefinedSpeedMenu);
        
        // buttons in 'line chart' menu
        _.onClick(NODE.close_line_chart_btn, NAV.showBarChart);
        _.onClick(NODE.download_png_btn, NAV.downloadLineChart);
        _.onClick(NODE.compare_btn, COMPARE_ITEMS.openWindow);
        
        
        
        // remove this function from memory
        delete NAV.initializeSettingsWindow;
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc opens settings window
     */
    openSettingsWindow : function () {
        
        _.addClass(NODE.settings_window, 'visible');
        NODE.settings_window.setAttribute('aria-hidden', 'false');
        
        FOCUS_CHAIN.set({
            start : NODE.darkmode_btn, 
            end : NODE.settings_close_btn, 
            container : NODE.settings_window
        });
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc closes settings window
     */
    closeSettingsWindow : function () {
        
        _.removeClass(NODE.settings_window, 'visible');
        NODE.settings_window.setAttribute('aria-hidden', 'true');
        
        FOCUS_CHAIN.reset();
        
        NODE.settings_btn.focus();
        
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
        _[(NAV.darkmode ? 'add' : 'remove') + 'Class'](NODE.html, 'dark-mode');
        
        MSG.show('Toggled dark mode.', 1300);
        
        // update rendered chart
        ANIMATOR.refreshFrame();
        
    },
    
    /**
     * @function
     * @memberof module:NAV
     * @desc enables a button
     * @param {Object} btn - HTML element
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
     * @param {Object} btn - HTML element
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
     * @param {Object} btn - HTML element
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
        
        // show statistics
        _.addClass(NODE.statistics, 'active');
        
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
        
        // hide statistics
        _.removeClass(NODE.statistics, 'active');
        
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
            // tell CSS the input value is incorrect
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
        if (speed < 0.1 || speed > 4) {
            MSG.error('Speed must be between 0.1 and 4.');
            // tell CSS the input value is incorrect
            _.removeClass(input, 'correct-speed');
            return;
        }
        
        
        
        
        // tell CSS that the input value is correct
        _.addClass(input, 'correct-speed');
        
        // give lag warning
        if (speed > 2) {
            MSG.warn('Speed values above 2 may produce lag.');
        }
        
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
     * @desc downloads 'line chart' canvas as .png image
     */
    downloadLineChart : function () {
        
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
        
        // create a link HTML element to the image data uri
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





/** 
 * @module DATA_LOAD
 * @desc manages the 'data load' window
 */
var DATA_LOAD = {
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc initializes the 'data load' window
     */
    initialize : function () {
        
        var $ = NODE.data_load;
        
        // add 'close window' events
        _.onClick($.blur, this.closeWindow);
        _.onClick($.close_btn, this.closeWindow);
        
        // initialize 'example data' buttons
        var btns = _.tag('button', $.example_sets_area);
        var btns_num = btns.length;
        for (var i = 0; i < btns_num; i++) {
            // buttons load data set from URL on click 
            _.onClick(btns[i], function (e) {
                
                // get button and file name
                var btn = _.target(e);
                var file_name = btn.getAttribute('load-data');
                var file_url = 'static/data/' + file_name + '.json';
                
                // try using the FileReaderAPI, as loadURL() uses a XMLHttpRequest, 
                // which won't work if index.html is loaded locally as a file in browser
                if (window.location.protocol === 'file:') {
                    MSG.error("Error. Use the 'file drop are' below.");
                    return;
                }
                
                // otherwise, if app is run on a server, use loadURL()
                FILE.loadURL(file_url, true);
                
                
            });
        }
        
        // initialize the drag'n'drop area for files in the window
        
        // warn user if FileReader API is not supported
        if (!_.isFunction(window.FileReader)) {
            // make warning visible
            _.addClass($.notice, 'show');
        }
        
        // prevent default browser actions on drag'n'drop
        _.addEvent($.drop_area, 'dragenter', _.preventDefault);
        _.addEvent($.drop_area, 'dragover', _.preventDefault);
        _.addEvent($.drop_area, 'dragleave', _.preventDefault);
        _.addEvent($.drop_area, 'drop', _.preventDefault);

        // add highlight events, if user dragged file on top of area
        _.addEvent($.drop_area, 'dragenter', this.highlightDropArea);
        _.addEvent($.drop_area, 'dragover', this.highlightDropArea);

        // unhighlight area if user's cursor with file left or dropped
        _.addEvent($.drop_area, 'dragleave', this.unhighlightDropArea);
        _.addEvent($.drop_area, 'drop', this.unhighlightDropArea);

        // send dropped file to FILE for processing
        _.addEvent($.drop_area, 'drop', function (e) {
            var file = DATA_LOAD.getDroppedFile(e);
            FILE.process(file);
        });
        
        // send selected file to FILE for processing
        _.addEvent($.select_file_input, 'change', function () {
            var file = this.files[0];
            FILE.process(file);
        });
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc opens the 'data load' window
     */
    openWindow : function () {
        
        // open window
        _.addClass(NODE.data_load.window, 'visible');
        NODE.data_load.window.setAttribute('aria-hidden', false);
        
        // get focussable elements in the window
        var btns = [];
        var data_set_btns = _.class('data-set-btn', NODE.data_load.example_sets_area);
        for (var i = 0; i < data_set_btns.length; i++) {
            btns.push(data_set_btns[i]);
        }
        btns.push(NODE.data_load.select_file_input, NODE.data_load.close_btn);
        // put them into a focus chain
        FOCUS_CHAIN.set(btns);
        
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc closes the 'data load' window
     */
    closeWindow : function () {
        
        // close window
        _.removeClass(NODE.data_load.window, 'visible');
        NODE.data_load.window.setAttribute('aria-hidden', true);
        
        // close 'file selected' message inside window
        _.removeClass(NODE.data_load.window, 'file-selected');
        
        FOCUS_CHAIN.reset();
        
        // reset tab focus back to 'data load' button in navigation
        NODE.data_load_btn.focus();
        
    },
    
    /**
     * @function
     * @memberof module:FILE
     * @desc adds the 'highlight' effect to the file drop area
     */
    highlightDropArea : function () {
        _.addClass(NODE.data_load.drop_area, 'dragged-over');
    },
    
    /**
     * @function
     * @memberof module:FILE
     * @desc removes the 'highlight' effect from the file drop area
     */
    unhighlightDropArea : function () {
        _.removeClass(NODE.data_load.drop_area, 'dragged-over');
    },
    
    /**
     * @function
     * @memberof module:DATA_LOAD
     * @desc gets dropped file from a drop event
     * @param {event} e - drop event
     * @return {Object} file
     */
    getDroppedFile : function (e) {
        
        _.preventDefault(e);

        var hasItemsAPI = e.dataTransfer.items ? true : false;
        var items = e.dataTransfer[hasItemsAPI ? 'items' : 'files']; 
        var file = null;

        if (items.length > 1) {
            MSG.error('Do not drop multiple files!');
            return;
        }

        if (hasItemsAPI) {

            // exit, if it's not a file
            if (items[0].kind !== 'file') {
                MSG.error('Do only drop files!');
                return;
            }
            
            file = items[0].getAsFile();
        }
        else {
            file = items[0];
        }
        
        return file;
        
    }
    
}





/** 
 * @module COMPARE_ITEMS 
 * @desc manages the 'compare items' window
 */
var COMPARE_ITEMS = {
    
    /* SELECTION MANAGEMENT */
    
    // current items selected for comparison
    ids : [],
    id_num : 0,
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc sets items ids to compare in line chart
     * @param {Array} ids - array of item ids (strings)
     */
    setItemIds : function (ids) {
        COMPARE_ITEMS.ids = ids;
        COMPARE_ITEMS.id_num = ids.length;
        
        // make buttons be re-generated next time opening the window
        delete COMPARE_ITEMS.HAVE_CREATED_BUTTONS;
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc adds an items id to compare in line chart
     * @param {string} id - item id
     */
    addItemId : function (id) {
        
        if (!COMPARE_ITEMS.hasItemId(id)) {
            COMPARE_ITEMS.ids[COMPARE_ITEMS.id_num] = id;
            COMPARE_ITEMS.id_num++;
        
            // make buttons be re-generated next time opening the window
            delete COMPARE_ITEMS.HAVE_CREATED_BUTTONS;     
        }
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc removes an items id, not to compare in line chart
     * @param {string} id - item id
     */
    removeItemId : function (id) {

        // go through all items and find indexes of the desired id
        var indexes = [];
        for (var i = 0; i < COMPARE_ITEMS.id_num; i++) {
            if (COMPARE_ITEMS.ids[i] === id) {
                indexes.push(i);
            }
        }
        
        // remove the indexes from the array
        var len = indexes.length;
        for (var i = 0; i < len; i++) {
            COMPARE_ITEMS.ids = _.removeArrayIndex(COMPARE_ITEMS.ids, indexes[i]);
            COMPARE_ITEMS.id_num--;
        }
        
        // make buttons be re-generated next time opening the window
        delete COMPARE_ITEMS.HAVE_CREATED_BUTTONS;
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc check if an item is set to be compared in line chart
     * @param {string} id - item id
     * @returns {boolean} true, if the item id is selected for comparison
     */
    hasItemId : function (id) {
        
        // check ids array for id
        for (var i = 0; i < COMPARE_ITEMS.id_num; i++) {
            if (COMPARE_ITEMS.ids[i] === id) {
                return true;
            }
        }
        
        return false;
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc resets item IDs selected for comparison in line chart
     */
    resetItemIds : function () {
        COMPARE_ITEMS.ids = [];
        COMPARE_ITEMS.id_num = 0;
        
        // make buttons be re-generated next time opening the window
        delete COMPARE_ITEMS.HAVE_CREATED_BUTTONS;
    },
    
    
    
    /* WINDOW */
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc initializes the 'compare items' window
     */
    initialize : function () {
        
        // events to open and close 'compare items' window
        _.onClick(NODE.compare_btn, this.openWindow);
        _.onClick(NODE.compare_items.blur, this.closeWindow);
        _.onClick(NODE.compare_items.close_btn, this.closeWindow);
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc opens the 'compare items' window
     */
    openWindow : function () {
        
        if (typeof(COMPARE_ITEMS.HAVE_CREATED_BUTTONS) === 'undefined') {
            COMPARE_ITEMS.createButtons();
            COMPARE_ITEMS.HAVE_CREATED_BUTTONS = true;
        }
        
        // open window
        _.addClass(NODE.compare_items.window, 'visible');
        NODE.compare_items.window.setAttribute('aria-hidden', false);
        
        // clear areas and load current items
        COMPARE_ITEMS.orderButtons();
        
        // get focussable elements in the window
        var btns = [];
        var compare_item_btns = _.class('btn', NODE.compare_items.window);
        for (var i = 0; i < compare_item_btns.length; i++) {
            btns.push(compare_item_btns[i]);
        }
        btns.push(NODE.compare_items.close_btn);
        // put them into a focus chain
        FOCUS_CHAIN.set(btns);
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc closes the 'compare items' window
     */
    closeWindow : function () {
        
        // close window
        _.removeClass(NODE.compare_items.window, 'visible');
        NODE.compare_items.window.setAttribute('aria-hidden', true);
        
        FOCUS_CHAIN.reset();
        
        // reset tab focus back to 'data load' button in navigation
        NODE.compare_btn.focus();
        
    },
    
    
    
    /* BUTTON MANAGEMENT */
    
    // array of button HTML elements
    buttons : [],
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc creates the buttons in the 'compare items' window
     */
    createButtons : function () {
        
        // empty item button containers
        _.empty(NODE.compare_items.selected_area);
        _.empty(NODE.compare_items.unselected_area);
        COMPARE_ITEMS.buttons = [];
        
        // add a button for every item to window
        for (var item_id in DATA.items) {
            
            var item = DATA.items[item_id];
            
            // create button
            var btn = _.create('button.btn.small.has-icon', {
                'item-id' : item_id,
                'innerHTML' : item.name
            });
            var icon = _.create('i.icon', {
                'style' : {
                    'background-image' : 'url(' + item.icon + ')'
                }
            });
            _.append(btn, icon);
            
            // add click event for selecting / unselecting the item
            _.onClick(btn, COMPARE_ITEMS.moveButton);
            
            // add button to array
            COMPARE_ITEMS.buttons.push(btn);
            
        }
        
        COMPARE_ITEMS.orderButtons();
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc moves the buttons into the correct position in the window
     */
    orderButtons : function () {
        
        for (var i = COMPARE_ITEMS.buttons.length; i--;) {
            
            var btn = COMPARE_ITEMS.buttons[i];
            var item_id = btn.getAttribute('item-id');
            
            // check if item is included in list of items to be rendered
            var included = false;
            for (var j = 0; j < COMPARE_ITEMS.id_num; j++) {
                if (COMPARE_ITEMS.ids[j] === item_id) {
                    included = true;
                    break;
                }
            }
            
            // append button to right area in window
            if (included) {
                _.append(NODE.compare_items.selected_area, btn);
                _.addClass(btn, 'green');
                btn.title = 'Hide \"' + DATA.items[item_id].name_escaped + '\" in graph';
            }
            else {
                _.append(NODE.compare_items.unselected_area, btn);
                _.removeClass(btn, 'green');
                btn.title = 'Show \"' + DATA.items[item_id].name_escaped+ '\" in graph';
            }
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:COMPARE_ITEMS
     * @desc handles the click on buttons in window for (un-)selecting items for line chart
     * @param {event} e - click event
     */
    moveButton : function (e) {
        
        var btn = _.target(e);
        
        // check if click was on button directly, or on icon inside
        if (!_.hasClass(btn, 'btn')) {
            // if click was on icon, select parent (button) instead
            btn = btn.parentElement;
        }
        
        var item_id = btn.getAttribute('item-id');
        
        // check if the button's item needs to be included to or excluded from the 'item selection' array
        var include = false;
        if (btn.parentElement === NODE.compare_items.unselected_area) {
            include = true;
        }
        
        // move the button to the new container
        if (include) {
            COMPARE_ITEMS.addItemId(item_id);
            _.append(NODE.compare_items.selected_area, btn);
            _.addClass(btn, 'green');
            btn.title = 'Hide \"' + DATA.items[item_id].name_escaped + '\" in graph';
        }
        else {
            COMPARE_ITEMS.removeItemId(item_id);
            _.append(NODE.compare_items.unselected_area, btn);
            _.removeClass(btn, 'green');
            btn.title = 'Show \"' + DATA.items[item_id].name_escaped + '\" in graph';
        }
        
        ANIMATOR.refreshFrame();
        
    }
    
}





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
            DATA.items[item]              = {};
            DATA.items[item].name         = _.encodeHTML(obj[item].name);
            DATA.items[item].name_escaped = _.escapeDoubleQuotes(obj[item].name);
            DATA.items[item].icon         = icon;
            DATA.items[item].color        = DATA.getItemColor(DATA.item_num);
            DATA.items[item].position     = DATA.item_num;
            
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
            items.push(prop);
            
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





/** 
 * @module VISUALIZER
 * @desc generates HTML elements for charts  
 */
var VISUALIZER = {
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc creates the HTML elements needed for the charts using current DATA
     */
    createCharts : function () {
        
        // un-hide ratio chart
        _.removeClass(NODE.ratio_chart_total, 'hidden');
        _.removeClass(NODE.ratio_chart_container, 'hidden');
        
        // load information into data set header
        var info                = NODE.data_set_info;
        info.title.innerHTML    = DATA.name;
        info.date.innerHTML     = DATA.date;
        
        // remove elements in bar and ratio charts
        _.empty(NODE.bar_chart);
        _.empty(NODE.ratio_chart);
        
        // generate statistics
        VISUALIZER.generateStatistics();
        
        // go through all items
        for (var item_id in DATA.items) {
           
            // skip if is prototype property
            if (!DATA.items.hasOwnProperty.call(DATA.items, item_id)) {
                continue;
            }
            
            // initialize reference array for HTML elements generated for item in charts
            DATA.html[item_id] = {};
            
            // create a bar for bar chart
            var bar = VISUALIZER.getBar(item_id);
            _.append(NODE.bar_chart, bar.container);
            
            // save references to HTML elements of bar
            DATA.html[item_id].bar_chart = bar;
            
            // create a ratio part for ratio chart
            var ratio_part = VISUALIZER.getRatioPart(item_id);
            _.append(NODE.ratio_chart, ratio_part.container);
            
            // save references to HTML elements of ratio part
            DATA.html[item_id].ratio_chart = ratio_part;
            
        }
        
        // un-hide the 'data-set-current-value' HTML element
        _.removeClass(NODE.current_value.container, 'hidden');
        
    },
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc generates HTML element for a item in the bar chart
     * @param {string} item_id
     * @returns {Object} multiple HTML elements in object
     */
    getBar : function (item_id) {
        
        // get item values
        var obj = DATA.items[item_id];
        var item = {
            id              : item_id,
            name            : obj.name,
            name_escaped    : obj.name_escaped,
            icon            : obj.icon,
            color           : obj.color
        };
        
        
        
        // generate HTML elements
        
        // bar
        var container = _.create('div.bar-container');
        var bar = _.create('div.bar');
        var meter = _.create('div.meter', {
            'style' : {
                'background-color' : item.color
            }
        });
        var name = _.create('div.name', {
            'innerHTML' : item.name
        });
        var value = _.create('div.value');
        
        // overlay click event (opens line chart for item on click)
        var button = _.create('button', {
            'title'    : 'Open line chart for ' + item.name_escaped,
            'item-id'  : item.id,
            'tabindex' : '-1'
        });
        _.onClick(button, VISUALIZER.openLineChartOnClick);
        
        // icon left of bar
        var icon = _.create('div.icon', {
            'style' : {
                'background-image' : 'url(' + item.icon + ')'
            }
        });
        
        
        
        // append elements to container
        _.append(meter,     name);
        _.append(meter,     value);
        _.append(bar,       meter);
        _.append(container, icon);
        _.append(container, bar);
        _.append(container, button);
        
        return {
            container   : container,
            meter       : meter,
            value       : value
        };
        
    },
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc generates HTML element for item in ratio chart
     * @param {string} item_id
     * @returns {Object} multiple HTML elements in object
     */
    getRatioPart : function (item_id) {
        
        // get item values
        var obj = DATA.items[item_id];
        var item = {
            id      : item_id,
            name    : obj.name,
            color   : obj.color
        };
        
        
        
        // generate HTML elements
        
        // main element
        var container = _.create('td.part-container', {
            'item-id' : item.id,
            'style' : {
                'background-color' : item.color
            }
        });
        var percentage = _.create('span.percentage');
        
        // overlay click event (opens line chart for item on click)
        var btn = _.create('button', {
            'title'     : 'Open line chart for ' + item.name,
            'item-id'   : item.id,
            'tabindex'  : '-1'
        });
        _.onClick(btn, VISUALIZER.openLineChartOnClick);
        
        
        
        // append elements to container
        _.append(btn, percentage);
        _.append(container, btn);
        
        return {
            container  : container,
            percentage : percentage
        };
        
    },
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc called by a click event to open a specific line chart
     * @param {e} event - click event
     */
    openLineChartOnClick : function (e) {
        
        // get item id
        var target = _.target(e);
        var item_id = target.getAttribute('item-id');
        
        // if current item ID is null, check if any parent has a item id
        while (!item_id && target.parentElement) {
            item_id = target.parentElement.getAttribute('item-id');
        }
        
        COMPARE_ITEMS.setItemIds([item_id]);
        
        // open line chart
        NAV.showLineChart();
        
    },
    
    
    
    statistics : [],
     
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc generates full statistics HTML section
     */
    generateStatistics : function () {
        
        // reset statistics
        _.empty(NODE.statistics);
        VISUALIZER.statistics = [];
        
        
        // add items to array and sort them
        for (var item_id in DATA.items) {
            var obj = DATA.items[item_id];
            VISUALIZER.statistics.push({
                name    : obj.name,
                icon    : obj.icon,
                mean    : DATA.getMean(item_id),
                min     : DATA.getMin(item_id),
                max     : DATA.getMax(item_id)
            });
        }
        VISUALIZER.sortStatistics('max');
        
        
        // add sorting menu
        _.addClass(NODE.statistics, 'has-content');
        var sorting_text = _.create('p.sorting-text', {
            innerHTML: 'Sort by '
        });
        NODE.statistic_sort_btn = _.create('button', {
            innerHTML: 'Max',
            title: 'Change sorting metric'
        });
        _.append(sorting_text, NODE.statistic_sort_btn);
        _.prepend(NODE.statistics, sorting_text);
        
        
        // add click event for sorting button
        _.onClick(NODE.statistic_sort_btn, function () {
            
            var text = '';
            var type = NODE.statistic_sort_btn.innerHTML;
            
            switch (type) {
                case 'Max':
                    text = 'Min';
                    type = 'min';
                    break;
                    
                case 'Min':
                    text = 'Mean';
                    type = 'mean';
                    break;
                    
                case 'Mean':
                    text = 'Max';
                    type = 'max';
                    break;
            }
            
            NODE.statistic_sort_btn.innerHTML = text;
            VISUALIZER.sortStatistics(type);
            
        });
    
    },
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc generates a HTML element containing a HTML structure with statistical information about an item
     * @param {integer} index Index in statistics array
     * @param {string} dominant_metric Sorting metric by which the statistic is currently sorted
     * @returns {Object} HTML element
     */
    getStatisticPart : function (index, dominant_metric) {
        
        var item = VISUALIZER.statistics[index];
    
        var stat_container = _.create('div.statistic');
        var stat_icon = _.create('div.icon', {
            'style' : {
                'background-image' : 'url(' + item.icon + ')'
            }
        });
        var stat_name = _.create('div.name', {
            'innerHTML' : item.name
        });
        
        // generate description depending on dominant metric
        var description = '';
        switch (dominant_metric) {
            case 'max':
                description =
                '<b>Max:</b> ' + item.max.formatted + '<br>' +
                '<b>Min:</b> ' + item.min.formatted + '<br>' +
                '<b>Mean:</b> ' + item.mean.formatted;
                break;
            case 'min':
                description =
                '<b>Min:</b> ' + item.min.formatted + '<br>' +
                '<b>Max:</b> ' + item.max.formatted + '<br>' +
                '<b>Mean:</b> ' + item.mean.formatted;
                break;
            case 'mean':
                description =
                '<b>Mean:</b> ' + item.mean.formatted + '<br>' +
                '<b>Max:</b> ' + item.max.formatted + '<br>' +
                '<b>Min:</b> ' + item.min.formatted;
                break;
        }
        
        var stat_description = _.create('div.description', {
            'innerHTML' : description
        });

        _.append(stat_name, stat_icon);
        _.append(stat_container, stat_name);
        _.append(stat_container, stat_description);

        return stat_container;

    },
    
    /**
     * @function
     * @memberof module:VISUALIZER
     * @desc sorts items in statistic by a certain metric
     * @param {string} metric Sorting metric: min|max|mean
     */
    sortStatistics : function (metric) {
        
        // remove statistic parts
        var statistics = _.class('statistic', NODE.statistics);
        for (var i = statistics.length; i--;) {
            _.remove(statistics[i]);
        }
        
        // sort statistics array
        VISUALIZER.statistics.sort(function (a, b) {
            return a[metric].value < b[metric].value;
        });
        
        // re-add now-sorted statistic parts
        for (var i = 0; i < VISUALIZER.statistics.length; i++) {
            _.append(NODE.statistics, VISUALIZER.getStatisticPart(i, metric));
        }
        
    }
    
}





/**
 * @module ANIMATOR
 * @desc animates the charts in respect to the elapsed time
 */
var ANIMATOR = {
    
    is_running : false,
    speed : 1.0,
    
    // current update tick (frame)
    tick : 0,
    
    // holds update loop interval
    loop : null,
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc initializes the animator
     */
    initialize : function () {
        
        // canvas needs to be updated on size changes
        _.addEvent(window, 'resize', function () {
            if (NAV.line_chart_opened) {
                ANIMATOR.refreshFrame();
            }
        });
        
    },
    
    
    
    /* SETTER */
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc sets the speed of the animation
     * @param {number} speed
     */
    setSpeed : function (speed) {
        
        this.speed = speed;
        
        // update loop to new speed if it's currently running
        if (this.is_running) {
            this.stopLoop();
            this.startLoop();
        }
        
        // updated length of transition effects on animated HTML elements
        this.setCSSTransitions();
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc sets CSS transition duration of animated HTML elements
     */
    setCSSTransitions : function () {
        
        var duration = ((1 / this.speed) / 5) + 's';
        
        // go through all items
        for (var item_id in DATA.html) {
            
            var item = DATA.html[item_id];
            
            // bar chart
            _.setStyles(item.bar_chart.meter, {
                'transition': duration
            });
            
            // ratio chart
            _.setStyles(item.ratio_chart.container, {
                'transition': duration
            });
            
        }
        
        // transition of time indicator
        _.setStyles(NODE.current_value.indicator, {
            'transition': duration
        });
        
    },
    
    
    
    /* CONTROLS */
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc starts the animation loop
     */
    startLoop : function () {
        
        // milliseconds between updates
        var interval = 80 / ANIMATOR.speed;
        
        // start update loop
        ANIMATOR.loop = setInterval(ANIMATOR.update, interval);
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc stops the animation loop
     */
    stopLoop : function () {
        
        // stop update loop
        clearInterval(ANIMATOR.loop);
        ANIMATOR.loop = null;
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc starts the animation
     */
    play : function () {
        
        ANIMATOR.is_running = true;
        
        // set classes for use in CSS styles
        _.removeClass(NODE.html, 'animation-paused');
        _.addClass(NODE.html, 'animation-playing');
        
        ANIMATOR.startLoop();
        
        MSG.show('Started animation.', 1000);
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc pauses the animation
     */
    pause : function () {
        
        ANIMATOR.is_running = false;
        
        // set classes for use in CSS styles
        _.removeClass(NODE.html, 'animation-playing');
        _.addClass(NODE.html, 'animation-paused');
        
        ANIMATOR.stopLoop();
        
        MSG.show('Paused animation.', 1000);
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc restarts the animation
     */
    restart : function () {
        ANIMATOR.tick = 0;
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc stops animation without resetting, freezes it in last frame (no 'unpause' possible)
     */
    end : function () {
        
        // stop animation
        ANIMATOR.is_running = false;
        ANIMATOR.tick = 0;
        
        // set classes for use in CSS styles
        _.removeClass(NODE.html, 'animation-playing');
        _.addClass(NODE.html, 'animation-paused');
        
        ANIMATOR.stopLoop();
        
        // reset ratio part animations
        ANIMATOR.last_ratio_part_order = [];
        var parts = _.class('part-container', NODE.ratio_chart);
        for (var i = parts.length; i--;) {
            var current = parts[i];
            _.removeClass(current, 'changed-place');
            current.removeAttribute('changed-places-counter');
        }
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc stops animation and resets it to start state
     */
    stop : function () {
        
        if (ANIMATOR.tick > 1) {
            MSG.show('Stopped animation.', 1000);
        }
        
        // end animation and reset current frame to start state
        ANIMATOR.end();
        ANIMATOR.update();
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc called by loop every frame and starts the animation pipeline
     */
    update : function () {
        
        // never run on empty data object
        if (_.isEmptyObject(DATA.upscaled)) {
            return;
        }
        
        // reset after one full round
        if (ANIMATOR.tick >= DATA.upscaled_num) {
            ANIMATOR.end();
            return;
        }
        
        ANIMATOR.refreshFrame();
        
        ANIMATOR.tick++;
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc refreshes rendered frame
     */
    refreshFrame : function () {
        
        // set current time value
        if (ANIMATOR.tick % 50 == 0) {
            var time = parseInt(DATA.from) + (ANIMATOR.tick == 0 ? 0 : ANIMATOR.tick / 50);
            NODE.current_value.value.innerHTML = time;
            NODE.current_value.indicator.innerHTML = time;
        }
        // set current indicator's width
        _.setStyles(NODE.current_value.indicator, {
            'width': (ANIMATOR.tick % 50 * 2) + '%'
        });
        
        // check what chart to update
        if (NAV.line_chart_opened) {
            ANIMATOR.updateLineChart();
        }
        else {
            ANIMATOR.sortItems();
            ANIMATOR.updateBarChart();
            ANIMATOR.updateRatioChart();
        }
        
    },
    
    // array with items sorted by their current value in tick
    items_sorted : [],
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc sorts items by their current value in tick
     */
    sortItems : function () {
        
        ANIMATOR.items_sorted = [];
        
        var unsorted = [];
        var index = -1;
        
        for (var item_id in DATA.items) {
            
            index++;
            
            // get item id-value pairs
            unsorted[index] = {
                'id'    : item_id,
                'value' : DATA.upscaled[item_id][ANIMATOR.tick]
            };
            
        }
        
        ANIMATOR.items_sorted = _.sortArrayObjects(unsorted, 'value', true);
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc updates 'bar chart' values for current frame
     */
    updateBarChart : function () {
        
        // current frame
        var tick = ANIMATOR.tick;
        
        // get total min and max for tick
        var max = DATA.getTotalMax(tick);
        var min = DATA.getTotalMin(tick);
        // min must be 0 at least
        if (min > 0) {
            min = 0;
        }
        var diff = max - min;
        
        // for all items
        for (var item_id in DATA.items) {
            
            // get current value
            var curr = DATA.upscaled[item_id][tick];
            var formatted = DATA.formatted[item_id][tick];
            
            // update value on bar HTML element (if it changed)
            var bar_chart = DATA.html[item_id].bar_chart;
            if (formatted != bar_chart.value.innerHTML) {
                bar_chart.value.innerHTML = formatted;
            }
            
            // calculate width of bar
            // (max - min) * width + min = curr
            var width = (curr - min) / (max - min);
            
            // set bar length
            _.setStyles(bar_chart.meter, {
                'width' : (width * 100) + "%" 
            });
            
        }
        
        
        
        // order bars
        for (var i = 0; i < DATA.item_num; i++) {

            var item_id = ANIMATOR.items_sorted[i].id;
            
            // position (order) of bar HTML element
            var position = DATA.items[item_id].position;
            
            // distance from one bar to another bar in bar chart
            var pixel_dist = 52;
        
            // move bar to its new position
            _.setStyles(DATA.html[item_id].bar_chart.container, {
                'transform': 'translate(0, ' + ((i - position) * pixel_dist) + 'px)'
            });
            
        }
        
    },
    
    
    
    last_ratio_part_order : [],
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc updates 'ratio chart' values for current tick
     */
    updateRatioChart : function () {
        
        // get total of all data point values at current tick (index)
        var total = DATA.total[ANIMATOR.tick];
        // write value above ratio chart
        NODE.ratio_chart_total.innerHTML = DATA.formatNumber(total);
        
        // go through items in ratio chart (reversed order)
        for (var i = DATA.item_num - 1; i >= 0; i--) {
            
            // get item id by SORTED ORDER
            var item_id         = ANIMATOR.items_sorted[i].id;
            var item_data_point = DATA.upscaled[item_id][ANIMATOR.tick];
            var percentage      = 100 / (total / item_data_point);
            var ratio_chart     = DATA.html[item_id].ratio_chart;
            
            // filter out items with percentages smaller than 0.2%
            if (percentage < 0.2) {
                _.addClass(ratio_chart.container, 'hidden');
                continue;
            }
            else {
                _.removeClass(ratio_chart.container, 'hidden');
            }
            
            // place item in ratio chart in new position
            _.append(NODE.ratio_chart, ratio_chart.container);
            
            // make item as wide as percentage
            _.setStyles(ratio_chart.container, {
                'width' : percentage + '%'
            });
            
            // display percentage value on item
            var rounded = percentage.toFixed(1) + '%';
            ratio_chart.percentage.innerHTML = rounded;
            
        }
        
        // check new positions of ratio parts
        var parts = _.class('part-container', NODE.ratio_chart);
        var new_order = [];
        for (var i = parts.length; i--;) {
            var part = parts[i];
            new_order.push(part.getAttribute('item-id'));
        }
        
        // reset past positions if the array differs in length to current ones
        if (new_order.length != ANIMATOR.last_ratio_part_order.length) {
            ANIMATOR.last_ratio_part_order = [];
        }
        
        // if there is previous data, compare parts, and add animations to parts that changed place
        if (ANIMATOR.last_ratio_part_order.length > 0) {
            
            for (var i = new_order.length; i--;) {
                
                // get item-id of current position
                var current_pos = i;
                var current = parts[parts.length - 1 - i]; // because, it's reversed
                var current_id = new_order[i];
                // see where the item was in the old position
                var old_pos = ANIMATOR.last_ratio_part_order.indexOf(current_id);
                
                // check if item switched places
                if (old_pos != current_pos) {
                    _.addClass(current, 'changed-place');
                }
                // otherwise, it didn't change place
                // so, count down time until the class gets removed
                else {
                    var counter = current.getAttribute('changed-places-counter');
                    // add counter if not yet added to part
                    if (!counter) {
                        current.setAttribute('changed-places-counter', '20');
                    }
                    // if applied, count it down
                    else if (parseInt(counter) > 0) {
                        counter--;
                        current.setAttribute('changed-places-counter', ''+counter);
                    }
                    // on 0, remove class
                    else {
                        current.removeAttribute('changed-places-counter');
                        _.removeClass(current, 'changed-place');
                    }
                }
                
            }
            
        }
        
        // overwrite previous parts position data
        ANIMATOR.last_ratio_part_order = new_order;
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc updates 'line chart' for current frame
     */
    updateLineChart : function () {
        
        // get components
        var canvas      = NODE.line_chart;
        var context     = canvas.getContext('2d');
        
        // get items to display
        var item_ids    = COMPARE_ITEMS.ids;
        var item_num    = COMPARE_ITEMS.id_num;
        
        // return if no items are selected
        if (item_num == 0) {
            canvas.width = 0;
            return;
        }
        
        // reset canvas content, width and height
        canvas.width    = _.getWidth(NODE.line_chart_menu);
        canvas.height   = 500 + (18 * (item_num - 1));
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // get total min and max values of selected items
        var min = 0; // can't be higher than 0
        var max = Number.MIN_VALUE;
        for (var i = 0; i < item_num; i++) {
            var id = item_ids[i];
            var id_min = DATA.getMin(id).value;
            if (id_min < min) {min = id_min;}
            var id_max = DATA.getMax(id).value;
            if (id_max > max) {max = id_max;}
        }
        
        // define padding on canvas
        var padding = {
            top     : 5,
            left    : 5,
            // extra space for every item in legend at bottom
            bottom  : 80 + (18 * item_num), 
            right   : null
        };
        
        
        
        /* LABELS RIGHT */
            
        // determine right-side labels with their respective lengths
        var label_font          = '12px Arial sans-serif';
        var label_top           = DATA.formatNumber(max) + '';
        var label_bottom        = DATA.formatNumber(min) + '';
        context.font            = label_font;
        var label_top_width     = context.measureText(label_top).width;
        var label_bottom_width  = context.measureText(label_bottom).width;
        
        // adjust right-side padding according to the longer text of the two
        padding.right = label_top_width;
        if (padding.right < label_bottom_width) {
            padding.right = label_bottom_width;
        }
        padding.right += 15;
        
        // draw right-side labels
        var label_xpos = canvas.width - padding.right + 5;
        for (var i = 0; i < 2; i++) {
            
            var label_text = i == 0 ? label_top : label_bottom;
            var label_ypos = i == 0 ? padding.top : canvas.height - padding.bottom;
            
            // prepare label text
            context.font            = label_font;
            context.fillStyle       = NAV.darkmode ? '#767676' : '#b5b5b5';
            context.textBaseline    = i == 0 ? 'top' : 'bottom';
            context.textAlign       = 'left';
            context.fillText(label_text, label_xpos, label_ypos);

            // draw labels on canvas
            context.stroke();
            
        }
        
        
        
        /* RASTER & LABELS BOTTOM */
        
        var width_minus_padding = canvas.width - padding.left - padding.right;
        var label_y_pos         = canvas.height - padding.bottom + 20;
        
        // draw the raster
        for (var i = DATA.from; i <= DATA.to; i++) {
            
            // draw raster line
            var raster_color    = NAV.darkmode ? '#242424' : '#ededed';
            var raster_x_pos    = i == DATA.from ? padding.left : 
            padding.left + (width_minus_padding * ((i - DATA.from) / (DATA.fixed_num - 1)));
            var raster_y1_pos   = padding.top;
            var raster_y2_pos   = canvas.height - padding.bottom;
            context.strokeStyle = raster_color;
            context.moveTo(raster_x_pos, raster_y1_pos);
            context.lineTo(raster_x_pos, raster_y2_pos);
            context.stroke();
            
            
            
            // get text and text width (in pixels)
            var text = i + '';
            var text_width = context.measureText(text).width;
            
            // check if labels should be limited to right and left-most lines
            var limited_labels = false;
            
            // cancel, if label text is too big too display
            if (text_width > 100) {
                continue;
            }
            
            // check if text is too big, so it will only be displayed at limits
            if (text_width > 35) {
                limited_labels = true;
            }
            // if text is well-sized, check window size (in pixels)
            else if (window.innerWidth <= 550) {
                limited_labels = true;
            }
            
            // if labels are limited to only right and left-most limits,
            // but current label is located somewhere in between -> cancel
            if (limited_labels && 
                DATA.from != i && 
                DATA.to != i) {
                continue;
            }
                
            // draw label at bottom of raster
            context.font            = label_font;
            context.fillStyle       = NAV.darkmode ? '#767676' : '#b5b5b5';
            context.textBaseline    = 'bottom';
            context.textAlign       = (i == DATA.from ? 'left' : 
                                      (i == DATA.to ? 'right' : 'center'));
            context.fillText(text, raster_x_pos, label_y_pos);
            context.stroke();
            
        }
        
        
        
        /* GRAPH & LEGEND */
        
        // draw legend headline
        var legend_font         = 'Arial sans-serif';
        var legend_text_color   = NAV.darkmode ? '#767676' : '#b5b5b5';
        var legend_x_pos        = padding.left;
        var legend_y_pos        = canvas.height - padding.bottom + 50;
        context.font            = '14px ' + legend_font;
        context.fillStyle       = legend_text_color;
        context.textBaseline    = 'middle';
        context.textAlign       = 'left';
        context.fillText('Legend', legend_x_pos, legend_y_pos);
        context.stroke();
        
        // go through all items
        for (var i = 0; i < item_num; i++) {
            
            var item_id = COMPARE_ITEMS.ids[i];
            
            // draw graph for item
            ANIMATOR.drawLineGraph(canvas, context, padding, item_id, min, max);
            
            // draw item in legend
            var item_name           = DATA.items[item_id].name_escaped;
            var item_x_pos          = padding.left + 20;
            var item_y_pos          = canvas.height - padding.bottom + 66 + (18 * i);
            context.font            = '12px ' + legend_font;
            context.fillStyle       = legend_text_color;
            context.textBaseline    = 'top';
            context.textAlign       = 'left';
            context.fillText(item_name, item_x_pos, item_y_pos);
            context.stroke();
            
            // add colored rectangle in front of the item in legend
            var rect_color          = DATA.items[item_id].color;
            var rect_x_pos          = padding.left + 4;
            context.fillStyle       = rect_color;
            context.fillRect(rect_x_pos, item_y_pos, 10, 10);
            context.stroke();
            
        }
        
        
        
        /* TIME INDICATOR LINE */
        
        // if animated is not at start or end
        if (
            ANIMATOR.tick != 0 && 
            ANIMATOR.tick != DATA.upscaled_num - 1
        ) {
            
            // how far to the right must the line be proportinal to the tick
            var width_ratio = (ANIMATOR.tick + 1) / DATA.upscaled_num;
            var line_x_pos  = padding.left + width_minus_padding * width_ratio;
            var line_y1_pos = padding.top;
            var line_y2_pos = canvas.height - padding.bottom;
            
            // draw line on the canvas
            context.strokeStyle = '#ac6161';
            context.moveTo(line_x_pos, line_y1_pos);
            context.lineTo(line_x_pos, line_y2_pos);
            context.stroke();
            
        }
        
    },
    
    /**
     * @function
     * @memberof module:ANIMATOR
     * @desc draws a line graph for an item on the line chart
     * @param {Object} canvas - HTML canvas
     * @param {Object} context - Context of drawing canvas
     * @param {Object} padding - Object holds 4 numbers for the padding on each site of the canvas
     * @param {string} item_id
     * @param {number} min - smallest value of all items displayed in line chart
     * @param {number} max - biggest value of all items displayed in line chart
     */
    drawLineGraph : function (canvas, context, padding, item_id, min, max) {
        
        // get attributes
        var color                   = DATA.items[item_id].color;
        var circle_angle            = 2 * Math.PI;
        var circle_radius           = 2; // in pixels
        var width_minus_padding     = canvas.width - padding.left - padding.right;
        var height_minus_padding    = canvas.height - padding.top - padding.bottom;
            
        // set drawing color
        context.strokeStyle = color;
        
        // get points intersecting with the raster lines (using fixed data)
        var points = [];
        
        // draw graph between points
        for (var i = 0; i < DATA.fixed_num; i++) {
                
            // get x position of point
            var width_ratio = i == 0 ? 0 : i / (DATA.fixed_num - 1);
            var x_pos = padding.left + width_minus_padding * width_ratio;
            
            // get y position of point
            var percentage_to_top = (((DATA.fixed[item_id][i] - min) / (max - min)) * 100);
            var y_pos = canvas.height - padding.bottom;
            y_pos -= height_minus_padding / (100 / percentage_to_top);
            
            // add point to array
            points[i] = {
                x : x_pos, 
                y : y_pos
            };

            // draw a circle at current point
            context.beginPath();
            context.arc(x_pos, y_pos, circle_radius, 0, circle_angle);
            context.stroke();
            
            // draw line between this and previous point
            if (i > 0) {
                
                // get coordinates of previous point
                var x_next = points[i - 1].x;
                var y_next = points[i - 1].y;
                
                // draw line inbetween
                context.moveTo(x_pos, y_pos);
                context.lineTo(x_next, y_next);
                context.stroke();
                
            }
                
        }
        
    }
    
}





/**
 * @module MAIN
 * @desc contains main methods to initialize the web app
 */
var MAIN = {
    
    /**
     * @function
     * @memberof module:MAIN
     * @desc takes a data set as a string, and initializes the web app with the values
     * @param {string} str - JSON data as string
     * @param {boolean} [showConfirmation=false] - on true, shows a message that a 'data set' was loaded in 'data load' window
     */
    initializeDataSet : function (str, showConfirmation) {
        
        // switch back to bar chart view
        NAV.showBarChart();

        // generate an object from JSON string
        var obj = FILE.getObjectFromJSON(str);

        // reset old data and set new one
        COMPARE_ITEMS.resetItemIds();
        DATA.set(obj);

        // send it to VISUALIZER to create the charts
        VISUALIZER.createCharts();
        
        // show confirmation message in 'data load' window
        if (showConfirmation) {
            _.addClass(NODE.data_load.window, 'file-selected');
            // set new focus chain, as only close btn is now visible in data load window
            FOCUS_CHAIN.set([
                NODE.data_load.close_btn
            ]);
        }
        
        // tell CSS, that a data set was loaded
        _.addClass(NODE.html, 'data-set-loaded');

        // refresh animator
        ANIMATOR.setCSSTransitions();
        ANIMATOR.end();
        ANIMATOR.refreshFrame();
        
    },
    
    /**
     * @function
     * @memberof module:MAIN
     * @desc initializes all components of the web app and loads example data set
     */
    initialize : function () {
    
        // load all parts
        NODE.initialize();
        NAV.initialize();
        DATA_LOAD.initialize();
        COMPARE_ITEMS.initialize();
        ANIMATOR.initialize();
        
        // if index.html is run as a file on a local system
        if (window.location.protocol === 'file:') {
            
            // add error message to main page
            _.append(NODE.bar_chart, _.create('div.notice.blue', {
                'innerHTML': 'To load a data set, click on "<b>Load data</b>" in the menu.'
            }));
            
            return;
        }

        // otherwise, load example data set
        var request = FILE.loadURL('static/data/example-data-set.json', false);

        // on failed http request, load error messages
        request.onerror = function () {

            // add error message to main page
            _.append(NODE.bar_chart, _.create('div.notice.red', {
                'innerHTML': 'Loading the example data set failed. This might be, because of a weak internet connection.'
            }));

        };

    }
    
}

// on page load, initialize the framework
_.onLoad(window, MAIN.initialize);