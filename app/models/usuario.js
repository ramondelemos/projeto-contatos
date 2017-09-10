/**
 * http://usejsdoc.org/
 */
var uuid = require('node-uuid');
var Promise = require('bluebird');

module.exports = function (app) {

    var db = app.db.postgres;

    var dao = {};

    dao.obterPorID = function (id) {
        return new Promise(
            function (resolve, reject) {
                db.oneOrNone("select usuario from usuarios where usuario->>'_id' = ${_id}", {_id: id})
                .then(function (data) {
                    
                    var usuario = null;
                    
                    if (data && data.usuario) {
                        usuario = data.usuario;
                    }
                    
                    resolve(usuario);
                })
                .catch(function (error) {
                    reject(error);
                });
            }
        );
    };
    
    dao.obterPorEmail = function (email) {
        return new Promise(
            function (resolve, reject) {
                db.oneOrNone("select usuario from usuarios where usuario#>>'{local,email}' = ${email}", { email: email})
                .then(function (data) {
                    
                    var usuario = null;
                    
                    if (data && data.usuario) {
                        usuario = data.usuario;
                    }
                    
                    resolve(usuario);
                })
                .catch(function (error) {
                    reject(error);
                });
            }
        );
    };
    
    dao.obterPorFacebookID = function (id) {
        return new Promise(
            function (resolve, reject) {
                db.oneOrNone("select usuario from usuarios where usuario#>>'{facebook,id}' = ${_id}", {_id: id})
                .then(function (data) {
                    
                    var usuario = null;
                    
                    if (data && data.usuario) {
                        usuario = data.usuario;
                    }
                    
                    resolve(usuario);
                })
                .catch(function (error) {
                    reject(error);
                });
            }
        );
    };

    dao.obterPorTwitterID = function (id) {
        return new Promise(
            function (resolve, reject) {
                db.oneOrNone("select usuario from usuarios where usuario#>>'{twitter,id}' = ${_id}", {_id: id})
                .then(function (data) {
                    
                    var usuario = null;
                    
                    if (data && data.usuario) {
                        usuario = data.usuario;
                    }
                    
                    resolve(usuario);
                })
                .catch(function (error) {
                    reject(error);
                });
            }
        );
    };

    dao.obterPorGoogleID = function (id) {
        return new Promise(
            function (resolve, reject) {
                db.oneOrNone("select usuario from usuarios where usuario#>>'{google,id}' = ${_id}", {_id: id})
                .then(function (data) {
                    
                    var usuario = null;
                    
                    if (data && data.usuario) {
                        usuario = data.usuario;
                    }
                    
                    resolve(usuario);
                })
                .catch(function (error) {
                    reject(error);
                });
            }
        );
    };

    dao.persistir = function (usuario) {
        return new Promise(
            function (resolve, reject) {

                if (usuario._id) {
                    
                    db.one("update usuarios set usuario = ${obj} where usuario->>'_id' = ${_id} returning usuario", { obj: usuario, _id: usuario._id })
                    .then(function (data) {
                        resolve(data.usuario);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
                } else {
                    usuario._id = uuid.v4();

                    db.one("insert into usuarios (usuario) values (${obj}) returning usuario", {obj: usuario})
                    .then(function (data) {
                        resolve(data.usuario);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
                }
            }
        );
    };

    return dao;
};