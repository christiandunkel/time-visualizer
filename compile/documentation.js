/**
 * execute using this command from the project root directory:
 * > node compile/documentation.js
 *
 * @file generates documentation file for the JavaScript source files
 * @requires NodeJS (nodejs.org)
 * @requires JSDoc (npmjs.com/package/jsdoc)
 * @requires jsdoc-to-markdown (npmjs.com/package/jsdoc-to-markdown)
 */

"use strict";

// get modules
if (typeof(fs) == 'undefined') {
    var fs = require('fs');
}
if (typeof(path) == 'undefined') {
    var path = require('path');
}

// generate documentation markdown
const jsdoc2md = require('jsdoc-to-markdown');
let markdown = `
# Documentation
[Back to main page](../README.md)

` + 
jsdoc2md.renderSync({
    files : path.join(__dirname, '..', 'static', 'js', 'source', '*.js')
});

// create markdown file
let output_path = path.join(__dirname, '..', 'doc', 'documentation.md');
fs.writeFileSync(output_path, markdown, 'utf8'); 

console.error('Generated documentation for the JavaScript source code.');