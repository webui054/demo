/**
 * Created by Oksana on 09.04.2015.
 */
app.controller("MarkCtrl", ["$scope", "$http", "PersonDataMappingArray",
    function ($scope, $http, PersonDataMappingArray) {

        $scope.personDataArrForMark = [];
        $scope.personDataArrForMark.citizenCountries = [];
        $scope.personDataArrForMark.personTypes = [];
        $scope.personDataArrForMark.marriedTyps = [];
        $scope.personDataArrForMark.genderTypes = [];

        $scope.getCitizenCountries = function () {
            PersonDataMappingArray.getMappedArray('persons/person/mark/citizenCountry.json').then(function (data) {
                $scope.personDataArrForMark.citizenCountries = data;
            });
        };
        $scope.getMarriedTypes = function () {
            PersonDataMappingArray.getMappedArray('persons/person/mark/marriedTypes.json').then(function (data) {
                $scope.personDataArrForMark.marriedTypes = data;
            });
        };
        $scope.getPersonTypes = function () {
            PersonDataMappingArray.getMappedArray('persons/person/mark/personsTypeId.json').then(function (data) {
                $scope.personDataArrForMark.personTypes = data;
            });
        };
        $scope.getGenderTypes = function () {
            PersonDataMappingArray.getMappedArray('persons/person/mark/genderTypes.json').then(function (data) {
                $scope.personDataArrForMark.genderTypes = data;
            });
        };

        $scope.getGenderTypes();
        $scope.getPersonTypes();
        $scope.getCitizenCountries();
        $scope.getMarriedTypes();
    }]);

