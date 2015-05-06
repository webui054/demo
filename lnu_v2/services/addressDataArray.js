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
    factory.popAddress = function(){
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

    //factory.getAddressData = function(id){
    //    var deferred = $q.defer();
    //    return $http.get(baseUrl +"api/persons/"+id+"/addresses")
    //        .success(function(data){
    //            angular.forEach(data.resources,function(obj,i){
    //                $http.get(baseUrl + "api/adminunits?id=" + obj.adminUnitId).success(function(data){
    //                    data.resources[i].addressName = data.resources.name;
    //                });
    //            })
    //            deferred.resolve(data.resources);
    //
    //        }).error(function(msg){
    //
    //        });
    //    return deferred.promise;
    //};
    factory.addAddress = function(personId,address){
        return $http.post(baseUrl+"api/persons/"+personId+"/addresses").success(function(data){
            return data;
        }).error(function(msg){
            return msg;
        });
    };

    //factory.editAddress = function(id){
    //    return $http.put(baseUrl+"api/persons/"+id+"/addresses");
    //};
    //
    //factory.deleteAddress = function(){
    //    return $http.delete(baseUrl+"api/persons/"+id+"/addresses");
    //};

    return factory;

}]);