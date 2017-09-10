/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cluster = require('cluster');
var os = require('os');

if (cluster.isMaster) {
    
    var cores = os.cpus().length;
    
    for (var i = 0; i < cores; i++) {
        cluster.fork();
    }
    
    cluster.on('listening',
        function (worker) {
            console.log("Cluster %d conectado", worker.process.pid);
        }
    );
    
    cluster.on('disconnect',
        function (worker) {
            console.log("Cluster %d desconectado", worker.process.pid);
        }
    );
    
    cluster.on('exit',
        function (worker) {
            console.log("Cluster %d caiu", worker.process.pid);
        }
    );
} else {
    require('./server');
};
