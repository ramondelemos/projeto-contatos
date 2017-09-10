/**
 * http://usejsdoc.org/
 */

var promise = require('bluebird'); // or any other Promise/A+ compatible library;

var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

var pgp = require('pg-promise')(options);

var config = {
    host: 'ec2-107-21-223-110.compute-1.amazonaws.com',
    port: 5432,
    database: 'd3nq2k3djeqgt0',
    user: 'tqzkkpasyumrmb',
    password: 'Z1YLTIFJsUHAfPHQOgvJJxnZxP',
    ssl: true
};

var db = pgp(config); // database instance;

module.exports = function() {
	
    return db;

};