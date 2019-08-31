/*
 * @required
 *      NodeJS
 *      UglifyJS
 * 
 * @description
 *      get all files in directory, 
 *      combine and minify them to ../minified.js
 */

'use strict';

// get all filesystem
let fs = require('fs');

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
    total_code += fs.readFileSync(file, {encoding: 'utf-8'});
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

fs.writeFileSync('../minified.js', minified.code, 'utf8');