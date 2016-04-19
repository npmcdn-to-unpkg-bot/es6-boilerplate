'use strict';
import Promise from 'bluebird';

export function up(knex, Promise) {
    console.log("Create tables start")
    
    return Promise.all([
        knex.schema.createTableIfNotExists('users', function (table) {
            table.increments();
            table.string('name');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        }),
        knex.schema.createTableIfNotExists('things', function (table) {
            table.increments();
            table.integer('user_id').references('id').inTable('users');
            table.string('type');
            table.boolean('deleted');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());            
        })
    ]);
};

export function down(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('users'),
        knex.schema.dropTableIfExists('things')
    ]);
};

export default up;