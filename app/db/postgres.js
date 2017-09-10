/**
 * http://usejsdoc.org/
 */

var promise = require('bluebird'); // or any other Promise/A+ compatible library;

var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

var pgp = require('pg-promise')(options);

var config = {
    host: '192.168.33.10',
    port: 5432,
    database: 'pilotodb',
    user: 'piloto',
    password: 'root007'
};

var db = pgp(config); // database instance;

module.exports = function() {
	
    return db;

};