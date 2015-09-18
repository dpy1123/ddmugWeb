app.controller('AddCtrl', ['$scope', '$alert', 'MusicServ',
	function($scope, $alert, MusicServ) {
		$scope.addShow = function() {
			MusicServ.save({
					showName: $scope.showName
				},
				function() {
					$scope.showName = '';
					$scope.addForm.$setPristine();
					$alert({
						content: 'TV show has been added.',
						placement: 'top-right',
						type: 'success',
						duration: 3
					});
				},
				function(response) {
					$scope.showName = '';
					$scope.addForm.$setPristine();
					$alert({
						content: response.data.message,
						placement: 'top-right',
						type: 'danger',
						duration: 3
					});
				});
		};
	}
]);