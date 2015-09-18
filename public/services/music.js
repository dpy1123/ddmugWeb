app.factory('MusicServ', ['$resource', function($resource) {
    return $resource('http://127.0.0.1:3000/api/shows/:_id');
  }]);