/**
 * execute using this command from the project root directory:
 * > node compile/all.js
 *
 * @file executes all compilation scripts
 * @requires NodeJS (nodejs.org)
 * @requires UglifyJS (npmjs.com/package/uglify-js)
 * @requires JSDoc (npmjs.com/package/jsdoc)
 * @requires jsdoc-to-markdown (npmjs.com/package/jsdoc-to-markdown)
 */

"use strict";

// get modules
var fs = require('fs');
var path = require('path');

// execute compilation scripts
var javascript = require('./javascript.js');
var documentation = require('./documentation.js');