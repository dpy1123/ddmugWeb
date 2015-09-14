var app = angular.module('ddmugApp', [/*'ngCookies', 'ngMessages',*/ 'ngResource',
'ngRoute', 'mgcrea.ngStrap']);

/*when you try to minify this script with UglifyJS, The $locationProvider parameter will be changed to some obscure name and AngularJS won't know what to inject anymore. You can get around this problem by annotating the function with the names of the dependencies.*/
app.config(['$locationProvider', '$routeProvider',
	function($locationProvider, $routeProvider) {
		//$locationProvider.html5Mode(true);
		
		$routeProvider
			.when('/home', {
				templateUrl: 'views/home.html',
				controller: 'MainCtrl'
			})
			.when('/shows/:id', {
				templateUrl: 'views/detail.html',
				controller: 'DetailCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
			})
			.when('/signup', {
				templateUrl: 'views/signup.html',
				controller: 'SignupCtrl'
			})
			.when('/add', {
				templateUrl: 'views/add.html',
				controller: 'AddCtrl'
			})
			.otherwise({
				redirectTo: '/home'
			});
	}
]);