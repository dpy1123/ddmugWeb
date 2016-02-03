/**
 * Created by dd on 2015/7/14.
 */

app.service('remoteServ', function($http, $q) {

	/**
	 * 对$http.get基于promise的封装
	 */
	this.httpGet = function(url, params) {
		var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
		$http.get(url, {
			params : params
		}).success(function(data, status, headers, config) {
			deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
		}).error(function(data, status, headers, config) {
			deferred.reject(data); // 声明执行失败，即服务器返回错误
		});
		return deferred.promise; // 返回承诺
	};
});