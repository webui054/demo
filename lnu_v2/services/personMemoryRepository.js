app.factory("PersonRepo",["$q",function($q){
    var person = [];

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

    return factory;

}]);/**
 * Created by Dmytro on 04.04.2015.
 */
