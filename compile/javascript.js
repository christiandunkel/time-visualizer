/**
 * execute using this command from the project root directory:
 * > node compile/javascript.js
 *
 * @file combines and minifies javascript source files into one file
 * @requires NodeJS (nodejs.org)
 * @requires UglifyJS (npmjs.com/package/uglify-js)
 */

"use strict";

// get modules
if (typeof(fs) == 'undefined') {
    var fs = require('fs');
}
if (typeof(path) == 'undefined') {
    var path = require('path');
}

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
let counter = 0;
let total_code = '"use strict";\n\n';
files_in_order.forEach(file => {
    
    // add space between files
    if (counter !== 0) {
        total_code += "\n\n\n\n\n\n";
    }
    
    // read file and add content to total code
    let file_path = path.join(__dirname, '..', 'js', 'source', file);
    total_code += fs.readFileSync(file_path, 'utf-8');
    
    counter++;
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
    console.error('ERROR: Uglify.js failed minifying the JavaScript source files.');
}
else {
    // create minified file
    let filepath = path.join(__dirname, '..', 'js', 'app.min.js');
    fs.writeFileSync(filepath, minified.code, 'utf8');
    console.error('Successfully minified the JavaScript source files.');
}

// also create non-minified file
let filepath = path.join(__dirname, '..', 'js', 'app.js');
fs.writeFileSync(filepath, total_code, 'utf8');