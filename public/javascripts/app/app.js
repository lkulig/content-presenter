angular.module('contentPresenter', ['firebase', 'ui.bootstrap'])
    .controller('contentController', ['$scope', '$firebase', '$modal',
        function ($scope, $firebase, $modal) {
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
        }])
    .controller('modalController', function ($scope, $modalInstance, $http, $firebase) {
        var firebaseUrl = new Firebase("https://luminous-fire-1463.firebaseio.com/users");
        var fireBaseUsersDB = $firebase(firebaseUrl);
        $scope.users = fireBaseUsersDB.$asArray();

        $scope.onUserSelect = function(user){
            $scope.who = user.name;
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$invalid) {
                return;
            }
            var params = {
                'who': $scope.who,
                'what': $scope.what,
                'link': $scope.link,
                'description': $scope.description
            };

            var responsePromise = $http.post("/contents", params, {});
            responsePromise.success(function (dataFromServer, status, headers, config) {
                console.log(dataFromServer.title);
            });
            responsePromise.error(function (data, status, headers, config) {
                alert("Submitting form failed!");
            });

            $modalInstance.close();
        };

    });