/**
 * http://usejsdoc.org/
 */

var db = require('../app/db/postgres')(); // database instance;

module.exports = function() {
	
    db.oneOrNone("select now() as hoje")
    .then(function (data) {
        console.log("Conectado ao Postgres: ", data.hoje);
    })
    .catch(function (error) {
        console.log("Erro ao tentar conectar ao Postgres:", error);
    });
};