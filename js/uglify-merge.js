/**
 * execute using this command from the project root directory:
 * > node js/uglify-merge.js
 *
 * @file combines and minifies javascript source files into one file
 * @requires NodeJS (nodejs.org)
 * @requires UglifyJS (npmjs.com/package/uglify-js)
 */

"use strict";

// get filesystem
let fs = require('fs');
let path = require('path');

// files to combine in order
let files_in_order = [
    
    // GENERAL
    'utils.js',
    'elements.js',
    
    // UI
    'messages.js',
    'navigation.js',
    'data-load.js',
    'compare-items.js',
    
    // DATA & CHARTS
    'data.js',
    'file-handler.js',
    'visualizer.js',
    'animator.js',
    
    // INITIALIZATION
    'main.js'
    
];

// read files in order and combine their content into a string
let total_code = '"use strict";';
files_in_order.forEach(file => {
    // read file and add content to total code
    let file_path = path.join(__dirname, 'source', file);
    total_code += "\n\n\n\n\n\n" + fs.readFileSync(file_path, 'utf-8');
});

// minify total code using Uglify component
let minified = require('uglify-js').minify(total_code, {
    compress : {},
    mangle : {},
    output : {
        ast : false,
        code : true
    }
});

// if Uglify failed, don't create a minified file
if (typeof(minified.code) === 'undefined') {
    console.error('ERROR: Minified code equals "undefined". Uglify.js probably failed.\nAre there any ES6 components or errors in the source code?');
}
else {
    // create minified file
    let filepath = path.join(__dirname, 'app.min.js');
    fs.writeFileSync(filepath, minified.code, 'utf8');
}

// also create non-minified file
let filepath = path.join(__dirname, 'app.js');
fs.writeFileSync(filepath, total_code, 'utf8');