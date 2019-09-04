/**
 * execute using this command from the project root directory:
 * node src/js/jsdoc-generate.js
 *
 * @file generates a JSDoc .md documentation for all javascript source files
 * @requires NodeJS
 * @requires JSDoc
 * @requires jsdoc-to-markdown
 * @license https://github.com/christiandunkel/time-visualizer/blob/master/LICENSE.md
 */

"use strict";

// get filesystem
let fs = require('fs');
let path = require('path');
let file_path = path.join(__dirname, 'source', '*.js') + "";

// generate documentation
const jsdoc2md = require('jsdoc-to-markdown');
let markdown = jsdoc2md.renderSync({ files : file_path });

// add file headline
let documentation = `
# Documentation
[Back to main page](../README.md)

`;
documentation += markdown;

// create documentation markdown file
let output_path = path.join(__dirname, '..', '..', 'doc', 'documentation.md');
fs.writeFileSync(output_path, documentation, 'utf8'); 