persons.factory("AddressDataArray",["$q","$http",function($q,$http){
    var address = [];
    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    var factory = {};

    var pushData = function(data){
        address = data;
    };

    factory.pushAddress = function(data){
        return pushData(data);
    };

    factory.pushContacts = function(data){
        return pushData(data);
    };

    factory.pushPostAddress = function(data){
        return pushData(data);
    };

    factory.popAddress = function(){
      return address;
    };

    factory.popPostAddress = function(){
        return address;
    };

    factory.popContacts = function(){
        return address;
    };
  
    factory.getAddressById = function(){
        return $http.get(baseUrl + "api/adminunits?adminUnitTypeId=6").success(function(data){
            return data;
        }).error(function(msg){
        });
    };

    factory.getAddressChildById = function(parentId){
        return $http.get(baseUrl + "api/adminunits?parentId=" + parentId).success(function(data){
            return data;
        }).error(function(msg){
        });
    };

    factory.getStreetTypeById = function(){
        return $http.get(baseUrl + "api/streets/types").success(function(data){
            return data;
        }).error(function(msg){
        });
    };

    factory.getAddressData = function(id){
        return $http.get(baseUrl +"api/persons/"+id+"/addresses")
            .success(function(data){
                return data;
        }).error(function(msg){

        });
    };

    factory.getContactData = function(id){
        return $http.get(baseUrl +"api/persons/"+id+"/contacts")
            .success(function(data){
                return data;
            }).error(function(msg){

            });
    };

    return factory;

}]);