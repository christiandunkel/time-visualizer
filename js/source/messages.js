/** 
 * @module MSG
 * @desc manages on-screen messages 
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
     * @return {Object} HTML node
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
    warning : function (text, close_after_ms) {
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