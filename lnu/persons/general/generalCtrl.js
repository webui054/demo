

app.controller("GeneralPersonInfoCTRL",["$scope","PersonRepo","$http",
    function($scope,PersonRepo,$http){

        $scope.citizenCountry2 = [];
        $scope.personsTypes2 = [];
        $scope.marriedType2 = [];
        $scope.genderTypes2 = [];

        $scope.getCitizenCountry2 = function(){

            $http.get('persons/general/citizenCountry.json').success(function (data) {
                angular.forEach(data,function(key){
                    $scope.citizenCountry2[key.id] = key.name;
                });
            });
        };
        $scope.getCitizenCountry2();



        $scope.getMarriedTypes2 = function(){

            $http.get('persons/general/marriedTypes.json').success(function (data) {
                angular.forEach(data,function(key){
                    $scope.marriedType2[key.id] = key.name;
                });
            });
        };
        $scope.getMarriedTypes2();

        $scope.getPersonsType2 = function(){
            $http.get('persons/general/personsTypeId.json').success(function (data) {
                angular.forEach(data,function(key){
                    $scope.personsTypes2[key.id] = key.name;
                });

            });
        };
        $scope.getPersonsType2();

        $scope.getGenderTypes2 = function(){
            $http.get('persons/general/genderTypes.json')
                .success(function (data) {
                    angular.forEach(data,function(key){
                        $scope.genderTypes2[key.id] = key.name;
                    });

                });
        };
        $scope.getGenderTypes2();
    }]);