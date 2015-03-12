var Sails = require('sails');
var Barrels = require('barrels');
var exec = require('child_process').exec;

// Global before hook
before(function (done) {
    // Lift Sails with test database
    Sails.lift({
        log: {
            level: 'verbose'
        },
        models: {
            connection: 'mongodb_test',
            migrate: 'safe'
        }
    }, function (err, sails) {
        if (err)
            return done(err);

        var barrels = new Barrels();
        fixtures = barrels.data;
        barrels.populate(function (err) {
            if (err)
                console.log(err);

            done(null, sails);
        }, true);
    });
});

// Global after hook
after(function (done) {
    console.log(); // Skip a line before displaying Sails lowering logs
    sails.lower(done);
});