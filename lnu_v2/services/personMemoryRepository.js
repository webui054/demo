app.factory("PersonRepo",["$q","$http",function($q,$http){
    var person = [];
    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    var factory = {};

    var pushData = function(data){
        person = data;
    };
    factory.pushPerson = function(data){
        return pushData(data);
    };
    factory.popPerson = function(){
      return person;
    };
    factory.getPersonById = function(id){
        var deferred = $q.defer();
        angular.forEach(person,function(elem){
            if(elem.id === id){
                deferred.resolve(elem);
            }
        });
        return deferred.promise;
    };
    factory.getPersonById2 = function(id){
        var deferred = $q.defer();
        $http.get(baseUrl+"api/persons/"+id).success(function(data){
            deferred.resolve(data);
        }).error(function(msg){
            deferred.resolve(msg);
        });

        return deferred.promise;
    };

    return factory;

}]);/**
 * Created by Dmytro on 04.04.2015.
 */
