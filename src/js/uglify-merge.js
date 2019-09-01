/*
 * @required
 *      NodeJS
 *      UglifyJS
 *
 * @usage
 *      executing using the following from project root:
 *      node src/js/uglify-merge.js
 * 
 * @description
 *      get all files in directory, 
 *      combine and minify them to ../minified.js
 */

'use strict';

// get all filesystem
let fs = require('fs');
let path = require('path');

// combine file content
let file_order = [
    'utility.js',
    'visualizer.js'
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
let UglifyJS = require('uglify-js');
let minified = UglifyJS.minify(total_code, {
    
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