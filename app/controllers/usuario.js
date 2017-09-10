/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function(app) {
    
    var Usuario = app.models.usuario;
    
    var controller = {};
    
    controller.obterPorID = function (req, res) {
        
        Usuario.obterPorID(req.params.id)
        .then(
            function (usuario) {
                if (!usuario) {
                    res.status(404).json({ error: "not found"});
                }
                else {
                    res.json(usuario);
                }
            }
        )
        .catch(
            function (erro) {
                res.status(500).json(erro);
            }
        );

    };
    
    controller.consultar = function (req, res) {
        
        var consulta = null;
        var valor = null;
        
        if (req.query.facebookid) {
            consulta = Usuario.obterPorFacebookID;
            valor = req.query.facebookid;
        } else if (req.query.twitterid) {
            consulta = Usuario.obterPorTwitterID;
            valor = req.query.twitterid;
        } else if (req.query.googleid) {
            consulta = Usuario.obterPorGoogleID;
            valor = req.query.googleid;
        } else if (req.query.email) {
            consulta = Usuario.obterPorEmail;
            valor = req.query.email;
        }
        
        if (consulta && valor) {            
            consulta(valor)
            .then(
                function (usuario) {
                    if (!usuario) {
                        res.status(404).json({ error: "not found"});
                    }
                    else {
                        res.json(usuario);
                    }
                }
            )
            .catch(
                function (erro) {
                    res.status(500).json(erro);
                }
            );
        } else {
            res.status(404).json({ error: "not found"});
        }
    };
    
    controller.registrar = function(req, res) {
                
        Usuario.persistir(req.body)
        .then(function (usuario) {
            res.json(usuario);
        })
        .catch(function (erro) {
            res.status(500).json(erro);
        });

    };
    
    return controller;
    
};
