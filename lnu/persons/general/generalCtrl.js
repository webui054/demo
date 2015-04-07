

app.controller("GeneralPersonInfoCTRL",["$scope","PersonRepo","$http","PersonDataMappingArray",
    function($scope,PersonRepo,$http,PersonDataMappingArray){

        $scope.personTab = 1;

        $scope.citizenCountry = [{id:0,name:"Українець"},
            {id:1,name:"Білорус"},
            {id:2,name:"Англієць"},
            {id:3,name:"Росіянин"}];

        $scope.personsTypes = [];
        $scope.marriedType = [];
        $scope.genderTypes = [];

        $scope.getMarriedTypes = function(){
            //PersonDataMappingArray.getMappedArray('persons/general/marriedTypes.json').then(function(data){
            //    $scope.marriedType = data;
            //});
            $http.get('persons/general/marriedTypes.json').success(function (data) {
                angular.forEach(data,function(key){
                    $scope.marriedType[key.id] = key.name;
                });
            });
        };
        $scope.getMarriedTypes();



        $scope.getPersonsType = function(){
            $http.get('persons/general/personsTypeId.json').success(function (data) {
                angular.forEach(data,function(key){
                    $scope.personsTypes[key.id] = key.name;
                });

            });
        };
        $scope.getPersonsType();



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