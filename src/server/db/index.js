// database.js
'use strict';
import {default as conf} from '../config'

var knex      = require('knex')(conf.get('database')), // Selects the correct DB config object for the current environment
    bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry'); // Resolve circular dependencies with relations
export default bookshelf;