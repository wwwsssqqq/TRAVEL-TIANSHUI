const path = require('path');
const http = require('http');
const commander = require('commander');

const defaultPort = 1100;
const defaultEnv = 'production';

commander
    .version('0.0.1')
    .option('-e --env <value>', `set the environment (development or production, defaults to ${defaultEnv})`)
    .option('-p --port <value>', `set the port (defaults to ${defaultPort})`)
    .parse(process.argv);

const port = commander.port || defaultPort;
const environment = /^(development|production)$/.test(commander.env) ? commander.env : defaultEnv;

// Initialize log module first, so we don't miss any log messages
const logDir = path.resolve(__dirname, '../log');
// require('../src/utils/log').configure(logDir);

const app = require('../app');
app.set('port', port);
app.set('env', environment);

const server = http.createServer(app);

server.listen(port, '0.0.0.0', function() {
    console.log(`Express server listening on port ${port}`);
    console.log(`Express server running in ${environment} environment`);
});

server.on('error', function(error){
    // Handle specific listen errors with friendly messages
    if(error.syscall === 'listen') {
        switch(error.code){
            case 'EACCES':
                console.error(`Error: Port ${port} requires elevated privileges`);
                process.exit(1);
                return;

            case 'EADDRINUSE':
                console.error(`Error: Port ${port} is already in use`);
                process.exit(1);
                return;
        }
    }
    throw error;
});