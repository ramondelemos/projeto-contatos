
module.exports = function (app) {

    var Contato = app.models.contato;

    var controller = {};

    controller.listarContatos = function (req, res) {

        Contato.listarTodos()
        .then(
            function (contatos) {
                res.json(contatos);
            }
        )
        .catch(
            function (erro) {
                res.status(500).json(erro);
            }
        );

    };

    controller.obtemContato = function (req, res) {

        Contato.obterPorID(req.params.id)
        .then(
            function (contato) {
                if (!contato) {
                    res.status(404).json({ error: "not found"});
                }
                else {
                    res.json(contato);
                }
            },
            function (erro) {
                res.status(404).json(erro);
            }
        );

    };

    controller.removeContato = function (req, res) {

        Contato.remover(req.params.id)
        .then(
            function () {
                res.status(204).end();
            },
            function (erro) {
                res.status(500).json(erro);
            }
        );

    };

    controller.salvaContato = function (req, res) {

        Contato.persistir(req.body)
        .then(
            function (contato) {
                res.json(contato);
            },
            function (erro) {
                res.status(500).json(erro);
            }
        );

    };

    return controller;
};