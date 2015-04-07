app.filter('checkYesNo',function() {
    return function(input) {
        if(typeof input === "Number"){
            input = input !== 0;
        }
        return input ? 'Так' : 'Ні';
    };
});

app.controller("GeneralPersonInfoCTRL",["$scope","PersonRepo","$http", function($scope,PersonRepo,$http){

    $scope.personTab = 1;

    $scope.citizenCountry = [{id:0,name:"Українець"},
        {id:1,name:"Білорус"},
        {id:2,name:"Англієць"},
        {id:3,name:"Росіянин"}];


    $scope.marriedType = [];

    $scope.getMarriedTypes = function(){
        $http.get('persons/general/marriedTypes.json')
            .success(function (data) {
                angular.forEach(data,function(key){
                    $scope.marriedType[key.id] = key.name;
                });
            });
    };

    $scope.getMarriedTypes();

    $scope.personsTypes = [];

    $scope.getPersonsType = function(){
        $http.get('persons/general/personsTypeId.json')
            .success(function (data) {
                angular.forEach(data,function(key){
                    $scope.personsTypes[key.id] = key.name;
                });

            });

    };
    $scope.getPersonsType();

    $scope.genderTypes = [];

    $scope.getGenderTypes = function(){
        $http.get('persons/general/genderTypes.json')
            .success(function (data) {
                angular.forEach(data,function(key){
                    $scope.genderTypes[key.id] = key.name;
                });

            });

    };
    $scope.getGenderTypes();
}]);