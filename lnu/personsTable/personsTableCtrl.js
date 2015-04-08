app.controller("PersonsTableCTRL",["$scope", function($scope){
    $scope.isShowGeneralInfo = false;
<<<<<<< HEAD
    $scope.tempPerson2 = {};
    $scope.trueFalseArr= [{id:0 , name: "Ні",val: false},{id:1 , name: "Так",val: true}];
    $scope.tempModalPerson2 ={}

    $scope.citizenCountry = [];

    $scope.personsTypes = [];
    $scope.marriedType = [];
    $scope.genderTypes = [];
    $scope.personsTypesArr = [];
    $scope.marriedTypeArr = [];
    $scope.genderTypesArr = [];
    $scope.citizenCountryArr = [];

    $scope.getCitizenCountry = function(){

        $http.get('persons/general/citizenCountry.json').success(function (data) {
            $scope.citizenCountryArr = data;
            angular.forEach(data,function(key){
                $scope.citizenCountry[key.id] = key.name;
            });
        });
    };
    $scope.getCitizenCountry();

    $scope.getMarriedTypes = function(){
        $http.get('persons/general/marriedTypes.json').success(function (data) {
            $scope.marriedTypeArr = data;
            angular.forEach(data,function(key){
                $scope.marriedType[key.id] = key.name;
            });
        });
    };

    $scope.getMarriedTypes();

    $scope.getPersonsType = function(){
        $http.get('persons/general/personsTypeId.json').success(function (data) {
            $scope.personsTypesArr = data;
            angular.forEach(data,function(key){
                $scope.personsTypes[key.id] = key.name;
            });

        });
    };
    $scope.getPersonsType();

    $scope.getGenderTypes = function(){
        $http.get('persons/general/genderTypes.json')
            .success(function (data) {
                $scope.genderTypesArr = data;
                angular.forEach(data,function(key){
                    $scope.genderTypes[key.id] = key.name;
                });

            });
    };
    $scope.getGenderTypes();


    $scope.tempPersonData = {};

    $scope.getPersonData = function () {
        $http.get('Content/tempData/tempPersonData.json').success(function (data) {
            $scope.tempPersonData = data;
        });
    };
    $scope.getPersonData();


    $scope.showGeneralInfo = function(data){
        $scope.tempModalPerson2 = data;
        $scope.tempPerson2 = data;
        $scope.isShowGeneralInfo = true;
    };
    $scope.pushPersonToObj= function(data){
        $scope.tempModalPerson2 = data;
    };

}]);

app.controller("personInfoCtrl", ["$scope", "$http", function($scope, $http){


=======
    $scope.tempData123 = ["as1","as3","as4","as5","as6","as2"];
    $scope.showGeneralInfo = function(data){
>>>>>>> 00e26454215391a22d756f5f365fb3ddb46c6e78

        $scope.isShowGeneralInfo = true;
    };
}]);/**
 * Created by Dmytro on 04.04.2015.
 */
