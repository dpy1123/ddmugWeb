var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/api/shows', function(req, res, next) {
  var query = Show.find();
  /*if (req.query.genre) {
    query.where({ genre: req.query.genre });
  } else if (req.query.alphabet) {
    query.where({ name: new RegExp('^' + '[' + req.query.alphabet + ']', 'i') });
  } else {
    query.limit(12);
  }
  query.exec(function(err, shows) {
    if (err) return next(err);
    res.send(shows);
  });*/
});
app.get('/api/shows/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('/api/shows/:id      '+id);
  /*Show.findById(id, function(err, show) {
    if (err) return next(err);
    res.send(show);
  });*/
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});
/*app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});*/










app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
