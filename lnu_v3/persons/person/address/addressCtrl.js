persons.controller('AddressCtrl', ["$scope", "AddressDataArray", "$http",'PersonRepo','$routeParams',
    function ($scope,AddressDataArray, $http, PersonRepo, $routeParams) {
        $scope.tempData = {};
        $scope.tempAddressArray = [];
        $scope.tempAddressObj = [];

        $scope.addressObj = {
            streetTypeId:"",
            adminUnitId:"",
            addressTypeId: 1,
            begDate:"1212-12-12",
            endDate:"1212-12-12",
            house:"",
            zipCode:"",
            street:"",
            apartment:""
        };

        $scope.postAddressObj = {
            streetTypeId:"",
            adminUnitId:"",
            addressTypeId: 2,
            begDate:"1212-12-12",
            endDate:"1212-12-12",
            house:"",
            zipCode:"",
            street:"",
            apartment:""
        };

        //Address Select for person address
        $scope.addressData = {
            streetTypeId:{},
            streetTypes: [],
            streetTypePost:{},
            streetTypesPost: [],
            streetTypeMap: [],
            cityNameMap: [],
            contactType:{},
            contactTypes: [],
            contactTypeMap: []
        };

        $scope.contactsObj = {
            contactObj: {
            },
            contactObj2: {
            },
            contactObj3: {
            }
        };


        //street type selection
        $scope.getStreetTypes = function(){
            AddressDataArray.getStreetTypeById().success(function(data){
                $scope.addressData.streetTypes = data.resources;
                $scope.addressData.streetTypesPost = data.resources;
                angular.forEach(data.resources,function(value){
                    $scope.addressData.streetTypeMap[value.id] = value.abbrName;
                })
            });
        };
        $scope.getStreetTypes();

        //contact type selection
        $scope.getContactTypes = function(){
            AddressDataArray.getContactTypeById().success(function(data){
                $scope.addressData.contactTypes = data.resources;
                angular.forEach(data.resources,function(value){
                    $scope.addressData.contactTypeMap[value.id] = value.name;
                })
            });
        };
        $scope.getContactTypes();

        // get person's address information
        (function (){
            PersonRepo.getPersonById2(parseInt($routeParams.personId,10)).then(function(data){
                $scope.getAddressData(data.id);
            });
        }());
        $scope.getAddressData = function(id){
            AddressDataArray.getAddressData(id).success(function(data){
                if(data.resources[0]){
                    data.resources[0].house = parseInt( data.resources[0].house,10);
                    data.resources[0].apartment = parseInt( data.resources[0].apartment,10);
                    data.resources[1].house = parseInt( data.resources[0].house,10);
                    data.resources[1].apartment = parseInt( data.resources[0].apartment,10);

                    $scope.addressObj = data.resources[0];
                    $scope.postAddressObj = data.resources[1];
                };
            });

        };

        // get person's contacts information
        (function (){
            PersonRepo.getPersonById2(parseInt($routeParams.personId,10)).then(function(data){
                $scope.getContactData(data.id);
            });
        }());

        $scope.getContactData = function(id){
            AddressDataArray.getContactData(id).success(function(data){
                $scope.contactsObj.contactObj = data.resources[0];
                $scope.contactsObj.contactObj2 = data.resources[1];
                $scope.contactsObj.contactObj3 = data.resources[2];
            });
        };
    }]);
