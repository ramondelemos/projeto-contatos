module.exports = function(app) {
	
    var controller = app.controllers.usuario;

    app.route('/usuario')
    .post(controller.registrar)
    .get(controller.consultar);

    app.route('/usuario/:id')
    .get(controller.obterPorID);
	
};