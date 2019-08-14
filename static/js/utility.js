var _ = {
    
    /*
     * =====================
     * === DOM SELECTION ===
     * =====================
     */
    
    // select element by id
    id : function (elem, context) {
        return (context || document).getElementById(elem);
    },
    
    // select element by class
    class : function (elem, context) {
        return (context || document).getElementsByClassName(elem);
    },
    
    // select element by tage
    tag : function (elem, context) {
        return (context || document).getElementsByTagName(elem);
    },
    
    // select element by a specific query
    select : function (query, context, callback) {
        
        // select DOM as context, if context is not properly defined
        if (!('getElementById' in context)) {
            context = document;
        }
        
        // look up simple elements in DOM
        if (/^(#?[\w\-]+|\.[\w\-\.]+)$/.test(query)) {
            switch (query.charAt(0)) {
                case '#':
                    return [context.getElementById(query.substr(1))];
                case '.':
                    return context.getElementsByClassName(query.substr(1).replace(/\./g, ' '));
                default:
                    return context.getElementsByTagName(query);
            }
        }
        
        // use query selector API
        if (context.querySelectorAll) {
            return context.querySelectorAll(n);
        }
        // call callback function if querySelector is not supported
        else if (_.isFunction(callback)) {
            callback();
        }
        
    },
    
    // check if the first element contains the second
    contains : function (parent, child) {
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
        
        return lookInDOM ? document.body.contains(elem) : true;
        
    },
    
    
    
    
    
    /*
     * ========================
     * === DOM MANIPULATION ===
     * ========================
     */
    
    // create a new HTML element
    create : function (str, settings) {
        
        if (!_.isString(str)) {
            return console.warn('No string given.');
        }
        
        let id = str.match(/#[^\.#\s]+/g);
        let classes = str.match(/\.[^#\s\.]+/g);
        let elem = document.createElement(str.replace(/#[^\.#\s]+|\.[^#\s]+|\s/g,''));

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
                console.warn('Given settings object is not valid.');
            }
            else {

                for (let key in settings) {

                    // skip iteration if the current property belongs to the prototype
                    if (settings.hasOwnProperty(key)) {
                        switch (key) {

                            case 'innerHTML':    
                                elem.innerHTML = settings[key];
                                break;

                            case 'style':
                                for (let prop in settings[key]) {
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
            return console.warn('First given element does not exist.');
        }
        
        if (_.isUndefined(elem2)) {
            return console.warn('Second given parameter is neither an element, text or a number.');
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
            return console.warn('First given element does not exist.');
        }
        
        if (_.isUndefined(elem2)) {
            return console.warn('Second given parameter is neither an element, text or a number.');
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
            return console.warn('First given element does not exist.');
        }
        
        if (_.isUndefined(elem2)) {
            return console.warn('Second given parameter is neither an element, text or a number.');
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
            return console.warn('First given element does not exist.');
        }
        
        if (_.isUndefined(elem2)) {
            return console.warn('Second given parameter is neither an element, text or a number.');
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
            return console.warn('Element does not exist.');
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
            return console.warn('Element does not exist.');
        }
        
        if (!_.isString(event)) {
            return console.warn('No event name was given.');
        }
        
        if (!_.isFunction(fn)) {
            return console.warn('No function was given.');
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
            return console.warn('Element does not exist.');
        }
        
        if (!_.isString(event)) {
            return console.warn('No event name was given.');
        }
        
        if (!_.isFunction(fn)) {
            return console.warn('No function was given.');
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
            return console.warn('Element does not exist.');
        }
        
        return elem.target || elem.srcElement;
        
    },
    
    
    
    
    
    /*
     * ===============
     * === CLASSES ===
     * ===============
     */
    
    // add class to an element
    addClass : function (elem, class_) {
        
        if (!_.exists(elem)) {
            return console.warn('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.warn('No class name was given.');
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
            return console.warn('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.warn('No class name was given.');
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
            return console.warn('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.warn('No class name was given.');
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
            return console.warn('Element does not exist.');
        }
        
        if (!_.isString(class_)) {
            return console.warn('No class name was given.');
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
        
        if (_.exists(elem)) {
            return console.warn('Element is not defined.');
        }
        
        if (!_.isString(elem)) {
            return console.warn('Given style is not a string.');
        }
        
        if ('getComputedStyle' in window) {
            return window.getComputedStyle(elem, null).getPropertyValue(style);
        }
        else if ('currentStyle' in elem) {
            return elem.currentStyle[style];
        }
        
    },

    // returns element height in pixel
    getHeight : function (elem) {
        
        if (_.exists(elem)) {
            return console.warn('Element is not defined.');
        }
        
        let r = elem.getBoundingClientRect();
        return r.bottom - r.top;
        
    },

    // returns element width in pixel
    getWidth : function (elem) {
        
        if (_.exists(elem)) {
            return console.warn('Element is not defined.');
        }
        
        let r = elem.getBoundingClientRect();
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
     * ==================
     * === SANITATION ===
     * ==================
     */
    
    // escapes string to be regex-compatible
    escapeRegex : function (str) {
        
        if (!_.isString(class_)) {
            return console.warn('No string was given.');
        }
        
        return ('' + str).replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\\/\-]/g, '\\$&');
        
    },

    // encodes HTML reserved characters
    encodeHTML : function (str) {
        
        if (!_.isString(class_)) {
            return console.warn('No string was given.');
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
            return console.warn('No string was given.');
        }
        
        return ('' + str).replace(/\&amp\;/g, '&')
                         .replace(/\&lt\;/g, '<')
                         .replace(/\&gt\;/g, '>')
                         .replace(/\&quot\;/g, '"')
                         .replace(/\&#039\;/g, '\'');
        
    }
    
};