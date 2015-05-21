app.controller("GeneralPersonInfoCTRL",["$scope","PersonRepo","$http","PersonDataMappingArray",
    function($scope,PersonRepo,$http,PersonDataMappingArray){

        $scope.personDataArrFOrGeneralView = [];
        $scope.personDataArrFOrGeneralView.citizenCountries = [];
        $scope.personDataArrFOrGeneralView.personTypes = [];
        $scope.personDataArrFOrGeneralView.marriedTyps = [];
        $scope.personDataArrFOrGeneralView.genderTypes = [];

        $scope.getCitizenCountries = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/citizenCountry.json').then(function(data){
                $scope.personDataArrFOrGeneralView.citizenCountries = data;
            });
        };
        $scope.getMarriedTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/marriedTypes.json').then(function(data){
                $scope.personDataArrFOrGeneralView.marriedTypes = data;
            });
        };
        $scope.getPersonTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/personsTypeId.json').then(function(data){
                $scope.personDataArrFOrGeneralView.personTypes = data;
            });
        };
        $scope.getGenderTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/genderTypes.json').then(function(data){
                $scope.personDataArrFOrGeneralView.genderTypes = data;
            });
        };

        $scope.getGenderTypes();
        $scope.getPersonTypes();
        $scope.getCitizenCountries();
        $scope.getMarriedTypes();
    }]);