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
  var query = Music.find();
  /*if (req.query.genre) {
    query.where({ genre: req.query.genre });
  } else if (req.query.alphabet) {
    query.where({ name: new RegExp('^' + '[' + req.query.alphabet + ']', 'i') });
  } else {
    query.limit(12);
  }*/
  query.exec(function(err, shows) {
    if (err) return next(err);
    res.send(shows);
  });
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


app.post('/api/shows', function(req, res, next) {
			console.log(req)
 /* async.waterfall([
    function(callback) {
      request.get('http://thetvdb.com/api/GetSeries.php?seriesname=' + seriesName, function(error, response, body) {
        if (error) return next(error);
        parser.parseString(body, function(err, result) {
          if (!result.data.series) {
            return res.send(404, { message: req.body.showName + ' was not found.' });
          }
          var seriesId = result.data.series.seriesid || result.data.series[0].seriesid;
          callback(err, seriesId);
        });
      });
    },
    function(seriesId, callback) {
      request.get('http://thetvdb.com/api/' + apiKey + '/series/' + seriesId + '/all/en.xml', function(error, response, body) {
        if (error) return next(error);
        parser.parseString(body, function(err, result) {
          var series = result.data.series;
          var episodes = result.data.episode;
          var show = new Show({
            _id: series.id,
            name: series.seriesname,
            airsDayOfWeek: series.airs_dayofweek,
            airsTime: series.airs_time,
            firstAired: series.firstaired,
            genre: series.genre.split('|').filter(Boolean),
            network: series.network,
            overview: series.overview,
            rating: series.rating,
            ratingCount: series.ratingcount,
            runtime: series.runtime,
            status: series.status,
            poster: series.poster,
            episodes: []
          });
          _.each(episodes, function(episode) {
            show.episodes.push({
              season: episode.seasonnumber,
              episodeNumber: episode.episodenumber,
              episodeName: episode.episodename,
              firstAired: episode.firstaired,
              overview: episode.overview
            });
          });
          callback(err, show);
        });
      });
    },
    function(show, callback) {
      var url = 'http://thetvdb.com/banners/' + show.poster;
      request({ url: url, encoding: null }, function(error, response, body) {
        show.poster = 'data:' + response.headers['content-type'] + ';base64,' + body.toString('base64');
        callback(error, show);
      });
    }
  ], function(err, show) {
    if (err) return next(err);
    show.save(function(err) {
      if (err) {
        if (err.code == 11000) {
          return res.send(409, { message: show.name + ' already exists.' });
        }
        return next(err);
      }
      res.send(200);
    });
  });*/
});


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});



var musicSchema = new mongoose.Schema({
	_id: Number,
	name: String,
	description: String,
	playtimes: Number,
	create_date: Date,
	mp3: [{
		url: String,
		uploader: String,
		validated: Boolean
	}],
	maps: [{
		map: String,
		type: String,
		uploader: String,
		upload_date: Date
	}]
});
var userSchema = new mongoose.Schema({
	_id: Number,
	name: String,
	email: { type: String, unique: true },
  password: String,
	description: String,
	create_date: Date
});
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
var recordSchema = new mongoose.Schema({
	_id: Number,
	music_id: Number,
	user_id: Number,
	type: String,
	difficulty: String,
	score: Number,
	description: String,
	create_date: Date
});
var User = mongoose.model('User', userSchema);
var Music = mongoose.model('Music', musicSchema);

mongoose.connect('localhost');



