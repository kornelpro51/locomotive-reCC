var express = require('express')
  , poweredBy = require('connect-powered-by')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , mongoose = require('mongoose')
  , RedisStore = require('connect-redis')(express)
  , util = require('util');

module.exports = function() {

/*
 var G = MongoClient.connect('mongodb://reccAdm:4eOuSJfSTKkcK8me@paulo.mongohq.com:10074/reCC', function(err, db) {
    if(err) throw err;
    else
      console.log("******* I'm ur Mongo *********")})
 */

  // Warn of version mismatch between global "lcm" binary and local installation
  // of Locomotive.
  if (this.version !== require('locomotive').version) {
    console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', require('locomotive').version, this.version));
  }

  // Configure application settings.  Consult the Express API Reference for a
  // list of the available [settings](http://expressjs.com/api.html#app-settings).
  this.set('views', __dirname + '/../../app/views');
  this.set('view engine', 'ejs');

  // Register EJS as a template engine.
  this.engine('ejs', require('ejs').__express);

  // Override default template extension.  By default, Locomotive finds
  // templates using the `name.format.engine` convention, for example
  // `index.html.ejs`  For some template engines, such as Jade, that find
  // layouts using a `layout.engine` notation, this results in mixed conventions
  // that can cuase confusion.  If this occurs, you can map an explicit
  // extension to a format.
  /* this.format('html', { extension: '.jade' }) */

  // Register formats for content negotiation.  Using content negotiation,
  // different formats can be served as needed by different clients.  For
  // example, a browser is sent an HTML response, while an API client is sent a
  // JSON or XML response.
  /* this.format('xml', { engine: 'xmlb' }); */

  // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
  // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
  // middleware available as separate modules.
  this.use(poweredBy('Locomotive'));
    this.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
  });
  // this.use(express.logger());
  this.datastore(require('locomotive-mongoose'));
  this.use(express.favicon());
  this.use(express.static(__dirname + '/../../public'));
  this.use(express.bodyParser());
  this.use(express.cookieParser());
  this.use(express.methodOverride());
  this.use(express.session({ secret: 'Imagine Radioactive Purple Dragons',
            store: new RedisStore({
            host: 'tarpon.redistogo.com',
            port: 10120,
            pass: 'e62feda5acd286415f5bbad63c87ee1c'
        })
  }));
  this.use(passport.initialize());
  this.use(passport.session());
  this.use(this.router);
}
