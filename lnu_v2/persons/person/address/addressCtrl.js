persons.controller('AddressCtrl', ["$scope", "AddressDataArray", "$http",'PersonRepo','$routeParams',
    function ($scope,AddressDataArray, $http, PersonRepo, $routeParams) {
    $scope.tempData = {};
    $scope.tempAddressArray = [];
    $scope.tempAddressObj = [];
    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

    $scope.AddNewAddress = function () {
        $("#addAddressModal").modal("hide");
        //$scope.tempAddressArray.push($scope.tempData); //todo change method.NN

        $scope.addressObj.zipCode = "";
        $scope.addressObj.streetTypeId = "";
        $scope.addressObj.street = "";
        $scope.addressObj.house = "";
        $scope.addressObj.apartment = "";
        $scope.postAddressObj.zipCode = "";
        $scope.postAddressObj.streetTypeId = "";
        $scope.postAddressObj.street = "";
        $scope.postAddressObj.house = "";
        $scope.postAddressObj.apartment = "";
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
            var addEl = document.getElementById("addrsC");
            addEl.addEventListener('change',function(){
                $scope.getRegionAddressData($scope.addressData.country.id);
            });
            $scope.addressData.countries = data.resources;
        });
    };
    $scope.getCountries();


    $scope.getRegionAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsR");
            addEl.addEventListener('change',function(){
                $scope.getCdTypesAddressData($scope.addressData.region.id);
            });
            $scope.addressData.regions = data.resources;
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
            var addEl = document.getElementById("addrsCD");
            addEl.addEventListener('change',function(){
                $scope.getDistrictAddressData($scope.addressData.cdType.id);
            });
            $scope.addressData.cdTypes = data.resources;
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
            var addEl = document.getElementById("addrsD");
            addEl.addEventListener('change',function(){
                $scope.getVTypeAddressData($scope.addressData.district.id);
            });
            $scope.addressData.districts = data.resources;
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
            var addEl = document.getElementById("addrsV");
            addEl.addEventListener('change',function(){
                $scope.getVillageAddressData($scope.addressData.vType.id);
            });
            $scope.addressData.vTypes = data.resources;
            if(data.count !== 0){
                $scope.isDistrictSelected = true;
            }
            $scope.isVTypeSelected = false;
            $scope.isVillageSelected = false;

        });
    };

    $scope.getVillageAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsVi");
            addEl.addEventListener('change',function(){
                $scope.getAdditionAddressData($scope.addressData.village.id);
            });
            $scope.addressData.villages = data.resources;
            if(data.count !== 0){
                $scope.isVTypeSelected = true;
            }
            $scope.isVillageSelected = false;
        });
    };

    $scope.getAdditionAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            $scope.addressData.additions = data.resources;
            if(data.count !== 0){
                $scope.isVillageSelected = true;
            }
        });
    };

    //Post Address

    $scope.getCountriesPost = function(){
        AddressDataArray.getAddressById().success(function(data){
            var addEl = document.getElementById("addrsCPost");
            addEl.addEventListener('change',function(){
                $scope.getRegionPostAddressData($scope.addressData.countryPost.id);
            });
            $scope.addressData.countriesPost = data.resources;
        });
    };
    $scope.getCountriesPost();


    $scope.getRegionPostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsRPost");
            addEl.addEventListener('change',function(){
                $scope.getCdTypesPostAddressData($scope.addressData.regionPost.id);
            });
            $scope.addressData.regionsPost = data.resources;
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
            var addEl = document.getElementById("addrsCDPost");
            addEl.addEventListener('change',function(){
                $scope.getDistrictPostAddressData($scope.addressData.cdTypePost.id);
            });
            $scope.addressData.cdTypesPost = data.resources;
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
            var addEl = document.getElementById("addrsDPost");
            addEl.addEventListener('change',function(){
                $scope.getVTypePostAddressData($scope.addressData.districtPost.id);
            });
            $scope.addressData.districtsPost = data.resources;
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
            var addEl = document.getElementById("addrsVPost");
            addEl.addEventListener('change',function(){
                $scope.getVillagePostAddressData($scope.addressData.vTypePost.id);
            });
            $scope.addressData.vTypesPost = data.resources;
            if(data.count !== 0){
                $scope.isDistrictPostSelected = true;
            }
            $scope.isVTypePostSelected = false;
            $scope.isVillagePostSelected = false;

        });
    };

    $scope.getVillagePostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsViPost");
            addEl.addEventListener('change',function(){
                $scope.getAdditionPostAddressData($scope.addressData.villagePost.id);
            });
            $scope.addressData.villagesPost = data.resources;
            if(data.count !== 0){
                $scope.isVTypePostSelected = true;
            }
            $scope.isVillagePostSelected = false;
        });
    };

    $scope.getAdditionPostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            $scope.addressData.additionsPost = data.resources;
            if(data.count !== 0){
                $scope.isVillagePostSelected = true;
            }
        });
    };
        //end for address selection

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
        (function (){
            PersonRepo.getPersonById2(parseInt($routeParams.personId,10)).then(function(data){
                $scope.getContactData(data.id);
            });
        }());
        $scope.getContactData = function(id){
            AddressDataArray.getContactData(id).success(function(data){
                $scope.mPhoneObj = data.resources[1];
                $scope.phoneObj = data.resources[5];
                $scope.emailObj = data.resources[2];
            });
        };


    $scope.addAddress = function(personId){
        AddressDataArray.addAddress(personId)
    };

}]);