auth.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {

            AuthenticationService.ClearCredentials();

            $scope.login = function () {
                if(/[^а-яіїЇіЁё]/.test($scope.username) && /[^а-яіїЇіЁё]/.test($scope.password)){
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.username, $scope.password).success(function(data) {
                        AuthenticationService.SetCredentials($scope.username, $scope.password);
                        $location.path('/persons');
                    }).error(function(data){
                        $scope.error = data.message;
                        $scope.dataLoading = false;
                        AuthenticationService.ClearCredentials();
                        $location.path('/login');
                    });
                }else{
                    $scope.error = "Ваш логін містить недозволені символи";
                    $scope.dataLoading = false;
                    AuthenticationService.ClearCredentials();
                    $location.path('/login');
                }
            }
        }]);
