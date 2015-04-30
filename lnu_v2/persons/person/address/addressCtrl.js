persons.controller('AddressCtrl', ["$scope", "AddressDataArray", "$http", function ($scope,AddressDataArray, $http) {
    $scope.tempData = {};
    $scope.tempAddressArray = [];

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
        $scope.tempAddressArray.push($scope.tempData); //todo change method.NN

        $scope.zipCode = "";
        $scope.street = "";
        $scope.house = "";
        $scope.apartment = "";
        $scope.zipCodePost = "";
        $scope.streetPost = "";
        $scope.housePost = "";
        $scope.apartmentPost = "";
        $scope.mPhone = "";
        $scope.phone = "";
        $scope.email = "";
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
        streetTypesPost: []
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
            $scope.isCountrySelected = true;
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
            $scope.isRegionSelected = true;
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
            $scope.iscdTypeSelected = true;
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
            $scope.isDistrictSelected = true;
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
            $scope.isVTypeSelected = true;
            $scope.isVillageSelected = false;
        });
    };

    $scope.getAdditionAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            $scope.addressData.additions = data.resources;
            $scope.isVillageSelected = true;
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
        //end for adress selection

    $scope.getStreetTypes = function(){
        AddressDataArray.getStreetTypeById().success(function(data){
            $scope.addressData.streetTypes = data.resources;
            $scope.addressData.streetTypesPost = data.resources;
        });
    };
    $scope.getStreetTypes();



}]);