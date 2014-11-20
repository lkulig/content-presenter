angular.module('contentPresenter')
    .controller('modalController', function ($scope, $modalInstance, $http, $firebase) {
        var firebaseUrl = new Firebase("https://luminous-fire-1463.firebaseio.com/users");
        var fireBaseUsersDB = $firebase(firebaseUrl);
        $scope.users = fireBaseUsersDB.$asArray();

        $scope.onUserSelect = function (user) {
            $scope.person = user.name;
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$invalid) {
                return;
            }
            var params = {
                'person': $scope.person,
                'title': $scope.title,
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

        $scope.tinymceOptions = {
            theme: 'modern',
            plugins: [
                'paste, table, image, link, code, textcolor, preview'
            ],
            toolbar1: 'bold, italic, underline, strikethrough, bullist, numlist, ' +
                '|, table, delete_table, delete_row, delete_col, row_before, row_after, col_before, col_after, ' +
                'split_cells, merge_cells, |, link, unlink'
        };

    });