app.factory("PersonDataMappingArray",["$http","$q",function($http,$q){

        var factory = {};
var getTempData = function(str){
    $http.get(str).success(function (data){
       return data;
    }).error(function(){
    });
};

    factory.getMappedArray = function(str){
        var arr = [];
        var deferred = $q.defer();
        $http.get(str).success(function (data) {
                angular.forEach(data,function(key){
                    arr[key.id] = key.name;
                });
            deferred.resolve(arr);

            }).error(function(err){
            deferred.resolve(err);
            //deferred.reject();
        });
        return deferred.promise;
    };

    factory.getDataArray = function(str){
        var deferred = $q.defer();
        $http.get(str).success(function (data){
            deferred.resolve(data);
        }).error(function(err){
            //ExeptionHandler.Handle(err);
            deferred.resolve(err);
            //deferred.reject();
        });
        return deferred.promise;
    };

    return factory;


}]);
/**
 * Created by Dmytro on 07.04.2015.
 */
