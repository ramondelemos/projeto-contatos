/**
 * http://usejsdoc.org/
 */
var uuid = require('node-uuid');
var Promise = require('bluebird'); // or any other Promise/A+ compatible library;

module.exports = function (app) {

    var db = app.db.postgres;

    var dao = {};

    dao.listarTodos = function () {
        return new Promise(
            function (resolve, reject) {

                var sql = "select c.contato, e.contato as emergencia" +
                          "  from contatos c" +
                          "  left join contatos e on e.contato->>'_id' = c.contato->>'emergencia'";

                db.query(sql)
                .then(function (data) {

                    var contatos = [];

                    for (var i = 0; i < data.length; i++) {

                        var contato = data[i].contato;
                        contato.emergencia = data[i].emergencia;

                        contatos.push(contato);

                    };

                    resolve(contatos);
                })
                .catch(function (error) {
                    reject(error);
                });
            }
        );
    };

    dao.obterPorID = function (id) {
        return new Promise(
            function (resolve, reject) {
                db.one("select contato from contatos where contato->>'_id' = ${_id}", {_id: id})
                .then(function (data) {
                    resolve(data.contato);
                })
                .catch(function (error) {
                    reject(error);
                });
            }
        );
    };

    dao.persistir = function (contato) {
        return new Promise(
            function (resolve, reject) {
                
                var id = contato._id;

                if (id) {
                    db.none("update contatos set contato = ${obj} where contato->>'_id' = ${_id}", {obj: contato, _id: id})
                    .then(function () {
                        resolve(contato);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
                } else {
                    contato._id = uuid.v4();

                    db.one("insert into contatos (contato) values (${obj}) returning contato", {obj: contato})
                    .then(function (data) {
                        resolve(data.contato);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
                }
            }
        );
    };

    dao.remover = function (id) {
        return new Promise(
            function (resolve, reject) {
                db.none("delete from contatos where contato->>'_id' = ${_id}", {_id: id})
                .then(function () {
                    resolve();
                })
                .catch(function (error) {
                    reject(error);
                });
            }
        );
    };

    return dao;

};