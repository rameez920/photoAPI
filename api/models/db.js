var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/photoDB';

mongoose.connect(dbURI);

function closeConnection(msg, callback) {
	mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// For nodemon restarts
process.once('SIGUSR2', function() {
    closeConnection('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    closeConnection('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    closeConnection('Heroku app termination', function() {
        process.exit(0);
    });
});

require('./schema');

