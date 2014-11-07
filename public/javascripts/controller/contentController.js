angular.module('contentPresenter')
    .controller('contentController', function ($scope, $firebase, $modal) {
        var firebaseUrl = new Firebase("https://luminous-fire-1463.firebaseio.com/contents");
        var fireBaseContentDB = $firebase(firebaseUrl);
        $scope.image = '/images/pobrane.jpg';
        $scope.slides = fireBaseContentDB.$asArray();
        $scope.interval = "10000";

        $scope.addSlide = function (size) {
            $modal.open({
                templateUrl: 'modal.html',
                controller: 'modalController',
                size: size
            });
        };
    });