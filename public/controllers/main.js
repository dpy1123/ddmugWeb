app.controller('MainCtrl', ['$scope', 'MusicServ', 'remoteServ', function($scope, MusicServ, remoteServ) {

    $scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'];

    $scope.genres = ['Action', 'Adventure', 'Animation', 'Children', 'Comedy',
      'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Food',
      'Home and Garden', 'Horror', 'Mini-Series', 'Mystery', 'News', 'Reality',
      'Romance', 'Sci-Fi', 'Sport', 'Suspense', 'Talk Show', 'Thriller',
      'Travel'];

    $scope.headingTitle = 'Top 10';

    $scope.shows = MusicServ.query();

    $scope.filterByGenre = function(genre) {
      $scope.shows = MusicServ.query({ genre: genre });
      $scope.headingTitle = genre;
    };

    $scope.filterByAlphabet = function(char) {
      $scope.shows = MusicServ.query({ alphabet: char });
      $scope.headingTitle = char;
    };
    
    var list = function(){
    	var url = 'http://127.0.0.1:8877/v1/smzdm_data/list';
    	
		var params = {
			"page" : 1,
			"size" : 10,
			"query" :'{"article_date_full":{"$gt":"2016-01-20"}}'
		}
		
        var promise = remoteServ.httpGet(url, params);

		promise.then(function (data) {  // 调用承诺API获取数据 .resolve
            $scope.list = data.data;
            console.log($scope.list)
        }, function (data) {  // 处理错误 .reject

        });
        
        
    }
    list();
  }]);