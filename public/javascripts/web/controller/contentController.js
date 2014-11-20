angular.module('contentPresenter')
    .controller('contentController',
    function ($scope, $firebase, $modal, $sce) {
        var firebaseUrl = new Firebase("https://luminous-fire-1463.firebaseio.com/contents");
        var fireBaseContentDB = $firebase(firebaseUrl);
        $scope.image = '/images/background.jpg';
        $scope.slides = fireBaseContentDB.$asArray();
        $scope.interval = "10000";

        $scope.addSlide = function (size) {
            $modal.open({
                templateUrl: 'modal.html',
                controller: 'modalController',
                size: size
            });
        };

        $scope.trustedHtml = function(string) {
          return $sce.trustAsHtml(string);
        };

        $scope.tinymceOptions = {
            theme: 'modern',
            readonly: 1
        };
    });