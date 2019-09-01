/**
 * execute using this command from the project root directory:
 * node src/js/uglify-merge.js
 *
 * @file combines and minifies javascript source files into a single minified file
 * @requires NodeJS, UglifyJS
 * @license https://github.com/christiandunkel/time-visualizer/blob/master/doc/license.md
 */

"use strict";

// get all filesystem
let fs = require('fs');
let path = require('path');

// combine file content
let file_order = [
    'utils.js',
    'elements.js',
    'navigation.js',
    'file-handler.js',
    'compare-keys.js',
    'visualizer.js',
    'main.js'
];
let file_num = file_order.length;

// read all files in order and combine code
let total_code = '';
for (let i = 0; i < file_num; i++) {
    
    let file = file_order[i];
    let file_path = path.join(__dirname, file);
    
    total_code += fs.readFileSync(file_path, 'utf-8');
    
}

// minify using uglify component
let minified = require('uglify-js').minify(total_code, {
    
    compress : {},
    mangle : {},
    output : {
        ast : false,
        code : true
    }
    
});

// create a single minified javascript file
let output_path = path.join(__dirname, '..', 'minified.js');
fs.writeFileSync(output_path, minified.code, 'utf8');