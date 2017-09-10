var express = require("express");
var load = require('express-load');
var bodyParser = require('body-parser');
var helmet = require('helmet');

module.exports = function (port, address) {

    var app = express();

    app.set('port', port);
    //app.set('address', address);

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.disable('x-powered-by');

    load('db', {cwd: 'app'})
    .then('models')
    .then('controllers')
    .then('routes')
    .into(app);

    app.get('*', function (req, res) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('not found');
    });

    return app;

};
