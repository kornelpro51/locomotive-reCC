/**
 * Created by aldo on 10/2/13.
 */
var spawn = require('child_process').spawn,
    moment = require('moment'),
    fs = require('fs'),
    path = require('path');

global.grunt_fixtures = true;

module.exports = function (grunt) {
    'use strict';

    module.db_migration = function (name) {
        var done = this.async(),
            time = moment().format('YYYYMMDDHHmmss'),
            file = path.resolve('./db/migrations/' + time + '-' + name + '.js'),
            content = [
                'module.exports = {',
                '  up: function (migration, DataTypes, done) {',
                '    \'use strict\';',
                '    done();',
                '  },',
                '  down: function (migration, DataTypes, done) {',
                '    \'use strict\';',
                '    done();',
                '  }',
                '};\n'
            ].join('\n');

        grunt.log.writeln('Creating migration file');

        fs.writeFileSync(file, content);

        grunt.log.writeln('Created migration file: ' + file);

        done();
    };

    module.db_migrate_up = function (force) {

        var done = this.async(),
            migration;

        grunt.log.writeln('Starting migration...');

        migration = spawn(path.resolve('./db/migrator'), ['up']);

        //migration.stdout.on('data', function (data) {
        //  grunt.log.writeln(data);
        //});

        migration.stderr.on('data', function (data) {
            grunt.log.writeln(data);
        });

        migration.on('close', function () {
            grunt.log.writeln('Migration finished...');

            done();
        });
    };

    module.db_migrate_down = function () {
        var done = this.async(),
            migration;

        grunt.log.writeln('Starting migration rollback...');

        migration = spawn(path.resolve('./db/migrator'), ['down']);

        migration.stdout.on('data', function (data) {
            grunt.log.writeln(data);
        });

        migration.stderr.on('data', function (data) {
            grunt.log.writeln(data);
        });

        migration.on('close', function () {
            grunt.log.writeln('Migration rollback finished...');

            done();
        });
    };

    module.db_fixtures = function () {
        require('../instance');

        var done = this.async(),
            series = [];

        grunt.log.writeln('Populating DB...');

        _.each(models, function (model, name) {
            var file_name = name.toLowerCase(),
                data = require('./../db/fixtures/' + file_name);

            data.forEach(function (item) {
                series.push(function (cb) {
                    model.create(item)
                        .success(function () {
                            cb(null, name);
                        })
                        .error(function (err) {
                            cb('Insertion failed: ' + name);
                        });
                });
            });

        });

        async.series(series, function (err, results) {
            if (err) {
                throw err;
            } else {
                results.forEach(function (model) {
                    grunt.log.writeln('Successfully inserted data in: ' + model);
                });
                done();
            }
        });

    };

    module.db_clean = function () {
        require('../instance');

        grunt.log.writeln('Cleaning tables...');

        var done = this.async(),
            series = [];

        _.each(models, function (model, name) {
            series.push(function (cb) {
                // turn off paranoid mode
                model.options.paranoid = false;

                // little hack to destroy all rows
                model.destroy(['1 = 1'], {
                    truncate: true
                })
                    .success(function () {
                        model.options.paranoid = true;

                        cb(null, name);
                    })
                    .error(function (err) {
                        cb('Cleaning failed: ' + name);
                    });
            });
        });

        async.series(series, function (err, results) {
            if (err) {
                throw err;
            } else {
                results.forEach(function (model) {
                    grunt.log.writeln('Successfully cleaned: ' + model);
                });
                done();
            }
        });
    };

    module.db_drop = function () {

        require('../instance');

        var done = this.async(),
            series = [];

        grunt.log.writeln('Starging drop tables...');

        _.each(models, function (model, name) {
            series.push(function (cb) {
                model.drop()
                    .success(function () {
                        cb(null, name);
                    })
                    .error(function () {
                        cb('Dropping failed: ' + name);
                    });
            });
        });

        // to drop SequelizeMeta table that contains migration info
        series.push(function (cb) {
            sequelize.define('SequelizeMeta', {})
                .drop()
                .success(function () {
                    cb(null, 'SequelizeMeta');
                })
                .error(function (err) {
                    cb('Dropping failed: ' + SequelizeMeta);
                });
        });

        async.series(series, function (err, results) {
            if (err) {
                throw err;
            } else {
                results.forEach(function (model) {
                    grunt.log.writeln('Successfully dropped: ' + model);
                });
                done();
            }
        });
    };

    grunt.util.hooker.hook(
        module,
        [
            'db_migration',
            'db_migrate_up',
            'db_migrate_down',
            'db_fixtures',
            'db_clean',
            'db_drop'
        ],
        {
            once: true,
            pre: function () {
                var prod_flag = grunt.option('production');

                if (process.env.NODE_ENV === 'production' && !prod_flag) {
                    grunt.fatal('add --production flag to perform db tasks');
                }
            }
        }
    );

    grunt.task.registerTask('db:migrate', ['db:migrate:up']);
    grunt.task.registerTask('db:migration', 'creates migration', module.db_migration);
    grunt.task.registerTask('db:migrate:up', 'migrates db schema', module.db_migrate_up);
    grunt.task.registerTask('db:migrate:down', 'rollback db migrations', module.db_migrate_down);
    grunt.task.registerTask('db:fixtures', 'populates fake data in db', module.db_fixtures);
    grunt.task.registerTask('db:clean', 'cleans db tables', module.db_clean);
    grunt.task.registerTask('db:drop', 'drop tables', module.db_drop);

};
