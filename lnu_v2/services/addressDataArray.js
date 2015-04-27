app.factory("AddressDataArray",["$q","$http",function($q,$http){
    var address = [];
    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    var factory = {};

    var pushData = function(data){
        address = data;
    };
    factory.pushAddress = function(data){
        return pushData(data);
    };
    factory.popAddress = function(){
      return address;
    };
  
    factory.getAddressById = function(id){
        $http.get(baseUrl + "api/adminunits?adminUnitTypeId=6").success(function(data){
        }).error(function(msg){
        });
    };

    factory.getAddressChildById = function(parentId){
        $http.get(baseUrl + "api/adminunits?parentId=" + parentId).success(function(data){
        }).error(function(msg){
        });
    };

    return factory;

}]);