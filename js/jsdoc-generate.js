/**
 * execute using this command from the project root directory:
 * > node js/jsdoc-generate.js
 *
 * @file generates documentation file for javascript source files
 * @requires NodeJS (nodejs.org)
 * @requires JSDoc (npmjs.com/package/jsdoc)
 * @requires jsdoc-to-markdown (npmjs.com/package/jsdoc-to-markdown)
 */

"use strict";

// get filesystem
let fs = require('fs');
let path = require('path');
let file_path = path.join(__dirname, 'source', '*.js') + "";

// generate documentation markdown
const jsdoc2md = require('jsdoc-to-markdown');
let markdown = `
# Documentation
[Back to main page](../README.md)

` + 
jsdoc2md.renderSync({
    files : file_path
});

// create markdown file
let output_path = path.join(__dirname, '..', 'doc', 'documentation.md');
fs.writeFileSync(output_path, markdown, 'utf8'); 