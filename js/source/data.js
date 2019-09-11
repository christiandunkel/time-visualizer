/** 
 * @module DATA
 * @desc hold and processes data
 */
var DATA = {
    
    keys : {
        'id' : {
            'name' : '',
            'color' : '',
            
        }
        // ...
    },
    
    key_num : 0,
    
    // range
    'from' : 0,
    'to' : 0,
    
    data : {
        original : {
            'key-id' : []
            // ...
        },
        fixed : {
            'key-id' : []
            // ...
        },
        upscaled : {
            'key-id' : []
            // ...
        }
    },
    
    
    
    /* SETTER */
    
    /**
     * @function
     * @memberof module:DATA
     * @desc sets the range for the animation
     * @param {number} from - start data-point-key
     * @param {number} to - end data-point-key
     */
    setRange : function (from, to) {
        this.from = from;
        this.to = to;
        
        ANIMATOR.current = 0;
    }
    
}