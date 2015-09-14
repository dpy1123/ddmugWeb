app.factory('ShowServ', ['$resource', function($resource) {
    return $resource('/api/shows/:_id');
  }]);