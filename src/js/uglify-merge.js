/**
 * execute using this command from the project root directory:
 * node src/js/uglify-merge.js
 *
 * @file combines and minifies javascript source files into a single minified file
 * @requires NodeJS
 * @requires UglifyJS
 * @license https://github.com/christiandunkel/time-visualizer/blob/master/LICENSE.md
 */

"use strict";

// get all filesystem
let fs = require('fs');
let path = require('path');

// combine file content
let files_in_order = [
    'utils.js',
    'elements.js',
    'navigation.js',
    'file-handler.js',
    'compare-keys.js',
    'visualizer.js',
    'main.js'
];

// read all files in order and combine code
let total_code = '';
files_in_order.forEach(file => {
    
    // get directory path to file
    let file_path = path.join(__dirname, file);
    
    // read file and add string to total code
    total_code += fs.readFileSync(file_path, 'utf-8');
    
});

// minify using uglify component
let minified = require('uglify-js').minify(total_code, {
    
    compress : {},
    mangle : {},
    output : {
        ast : false,
        code : true
    }
    
});

// check if the minification failed
if (typeof(minified.code) === 'undefined') {
    console.error('ERROR: Minified code equals "undefined". Uglify.js probably failed. Are there any ES6 components or errors in the source code?');
}
else {
    // create a single minified javascript file
    let output_path = path.join(__dirname, '..', 'minified.js');
    fs.writeFileSync(output_path, minified.code, 'utf8'); 
}