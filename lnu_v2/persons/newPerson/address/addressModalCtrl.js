persons.controller('AddressModalCtrl', ["$scope", "AddressDataArray", "$http",'PersonRepo','$routeParams', '$location', 'PersonsService',
    function ($scope, AddressDataArray, $http, PersonRepo, $routeParams, $location, PersonsService) {
        $scope.tempData = {};
        $scope.tempAddressArray = [];
        $scope.tempAddressObj = [];
        var adminUnitId;
        var adminUnitPostId;

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

        $scope.contactsObj = {
            mPhoneObj: {
                contactTypeId:2
            },
            phoneObj: {
                contactTypeId:1
            },
            emailObj: {
                contactTypeId:3
            }
        };

        //Address Select for person address
        $scope.addressData = {
            countries:[],
            regions:[],
            cdTypes:[],
            districts:[],
            vTypes:[],
            villages:[],
            additions: [],
            country:{},
            region:{},
            cdType:{},
            district:{},
            vType:{},
            village:{},
            addition:{},
            countriesPost:[],
            regionsPost:[],
            cdTypesPost:[],
            districtsPost:[],
            vTypesPost:[],
            villagesPost:[],
            additionsPost: [],
            countryPost:{},
            regionPost:{},
            cdTypePost:{},
            districtPost:{},
            vTypePost:{},
            villagePost:{},
            additionPost:{},
            isPostAddress: true,
            streetType:{},
            streetTypes: [],
            streetTypePost:{},
            streetTypesPost: [],
            streetTypeMap: [],
            cityNameMap: []
        };

        $scope.getCountries = function(){
            AddressDataArray.getAddressById().success(function(data){
                $scope.addressData.countries = data.resources;
            });
        };
        $scope.getCountries();

        $scope.getRegionAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.regions = data.resources;
                adminUnitId = parentId;
                if(data.count !== 0){
                    $scope.isCountrySelected = true;
                }
                $scope.isRegionSelected = false;
                $scope.iscdTypeSelected = false;
                $scope.isDistrictSelected = false;
                $scope.isVTypeSelected = false;
                $scope.isVillageSelected = false;
            });
        };

        $scope.getCdTypesAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.cdTypes = data.resources;
                adminUnitId = parentId;
                if(data.count !== 0){
                    $scope.isRegionSelected = true;
                }
                $scope.iscdTypeSelected = false;
                $scope.isDistrictSelected = false;
                $scope.isVTypeSelected = false;
                $scope.isVillageSelected = false;
            });
        };

        $scope.getDistrictAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.districts = data.resources;
                adminUnitId = parentId;
                if(data.count !== 0){
                    $scope.iscdTypeSelected = true;
                }
                $scope.isDistrictSelected = false;
                $scope.isVTypeSelected = false;
                $scope.isVillageSelected = false;
            });
        };

        $scope.getVTypeAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.vTypes = data.resources;
                adminUnitId = parentId;
                if(data.count !== 0){
                    $scope.isDistrictSelected = true;
                }
                $scope.isVTypeSelected = false;
                $scope.isVillageSelected = false;

            });
        };

        $scope.getVillageAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.villages = data.resources;
                adminUnitId = parentId;
                if(data.count !== 0){
                    $scope.isVTypeSelected = true;
                }
                $scope.isVillageSelected = false;
            });
        };

        $scope.getAdditionAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.additions = data.resources;
                adminUnitId = parentId;
                if(data.count !== 0){
                    $scope.isVillageSelected = true;
                }
            });
        };

        $scope.bindAdditionId = function(){
            adminUnitId = $scope.addressData.addition.id;
            console.log(adminUnitId);
        };


        //Post Address
        $scope.getCountriesPost = function(){
            AddressDataArray.getAddressById().success(function(data){
                $scope.addressData.countriesPost = data.resources;
            });
        };
        $scope.getCountriesPost();

        $scope.getRegionPostAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.regionsPost = data.resources;
                adminUnitPostId = parentId;
                if(data.count !== 0){
                    $scope.isCountryPostSelected = true;
                }
                $scope.isRegionPostSelected = false;
                $scope.iscdTypePostSelected = false;
                $scope.isDistrictPostSelected = false;
                $scope.isVTypePostSelected = false;
                $scope.isVillagePostSelected = false;
            });
        };

        $scope.getCdTypesPostAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.cdTypesPost = data.resources;
                adminUnitPostId = parentId;
                if(data.count !== 0){
                    $scope.isRegionPostSelected = true;
                }
                $scope.iscdTypePostSelected = false;
                $scope.isDistrictPostSelected = false;
                $scope.isVTypePostSelected = false;
                $scope.isVillagePostSelected = false;
            });
        };

        $scope.getDistrictPostAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.districtsPost = data.resources;
                adminUnitPostId = parentId;
                if(data.count !== 0){
                    $scope.iscdTypePostSelected = true;
                }
                $scope.isDistrictPostSelected = false;
                $scope.isVTypePostSelected = false;
                $scope.isVillagePostSelected = false;
            });
        };

        $scope.getVTypePostAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.vTypesPost = data.resources;
                adminUnitPostId = parentId;
                if(data.count !== 0){
                    $scope.isDistrictPostSelected = true;
                }
                $scope.isVTypePostSelected = false;
                $scope.isVillagePostSelected = false;

            });
        };

        $scope.getVillagePostAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.villagesPost = data.resources;
                adminUnitPostId = parentId;
                if(data.count !== 0){
                    $scope.isVTypePostSelected = true;
                }
                $scope.isVillagePostSelected = false;
            });
        };

        $scope.getAdditionPostAddressData = function(parentId){
            AddressDataArray.getAddressChildById(parentId).success(function(data){
                $scope.addressData.additionsPost = data.resources;
                adminUnitPostId = parentId;
                if(data.count !== 0){
                    $scope.isVillagePostSelected = true;
                }
            });
        };

        $scope.bindAdditionPostId = function(){
            adminUnitPostId = $scope.addressData.additionPost.id;
            console.log(adminUnitPostId);
        };
        //end for address selection


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


        //push data from modal and go to next page
        $scope.goToPapers = function() {
            if ($scope.addressData.isPostAddress == true) {
                if (adminUnitId !== undefined && adminUnitPostId !== undefined) {
                    $scope.addressObj.streetTypeId = $scope.addressObj.streetTypeId.id;
                    $scope.addressObj.adminUnitId = adminUnitId;
                    $scope.postAddressObj.streetTypeId = $scope.postAddressObj.streetTypeId.id;
                    $scope.postAddressObj.adminUnitId = adminUnitPostId;

                    PersonRepo.pushAddress($scope.addressObj);
                    PersonRepo.pushPostAddress($scope.postAddressObj);
                    PersonRepo.pushContact($scope.contactsObj);
                    $location.path('/addPerson/papers');
                    //PersonsService.addNewPerson(PersonRepo.popPerson()).then(function (data) {
                    //    $scope.addressObj = data.data;
                    //    $scope.contactsObj = data.data;
                    //    $scope.postAddressObj = data.data;
                    //});
                }
            }
            if (adminUnitId !== undefined) {
                $scope.addressObj.streetTypeId = $scope.addressObj.streetTypeId.id;
                $scope.addressObj.adminUnitId = adminUnitId;
                $scope.postAddressObj.streetTypeId = $scope.addressObj.streetTypeId.id;
                $scope.postAddressObj.adminUnitId = adminUnitId;

                PersonRepo.pushAddress($scope.addressObj);
                PersonRepo.pushPostAddress($scope.addressObj);
                PersonRepo.pushContact($scope.contactsObj);
                $location.path('/addPerson/papers');
                //PersonsService.addNewPerson(PersonRepo.popPerson()).then(function (data) {
                //    $scope.addressObj = data.data;
                //    $scope.contactsObj = data.data;
                //    $scope.postAddressObj = data.data;
                //});
            }
        };

        //$scope.addAddress = function(){
        //    $scope.addressObj.streetTypeId = $scope.addressObj.streetTypeId.id;
        //    $scope.addressObj.adminUnitId = $scope.addressData.village.id;
        //    $scope.addressObj.personId = parseInt($routeParams.personId,10);
        //    $scope.postAddressObj.streetTypeId = $scope.postAddressObj.streetTypeId.id;
        //    $scope.postAddressObj.adminUnitId = $scope.addressData.villagePost.id;
        //    $scope.postAddressObj.personId = parseInt($routeParams.personId,10);
        //    AddressDataArray.addAddress(parseInt($routeParams.personId,10),$scope.addressObj).then(function(data){
        //        $scope.addressObj = data.data;
        //        AddressDataArray.addAddress(parseInt($routeParams.personId,10),$scope.postAddressObj).then(function(data){
        //            $scope.postAddressObj = data.data;
        //        });
        //    });
        //    $("#addAddressModal").modal("hide");
        //};



    }]);