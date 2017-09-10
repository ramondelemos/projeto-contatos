var arguments = process.argv.splice(2);

var proxyHost = arguments[0] || 'localhost';
var proxyPort = Number(arguments[1] || 9091);
var label = arguments[2] || 'backend';

var http = require("http");
var seaport = require('seaport');
var ports = seaport.connect(proxyHost, proxyPort);

var port = ports.register(label) ||  process.env.PORT || 3000;
var address = process.env.IP || "127.0.0.1";

var app = require("./config/express")(port, address);

require('./config/database')();

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Server escutando na porta ' + app.get('port') + ' e IP ' + app.get('address'));
});
