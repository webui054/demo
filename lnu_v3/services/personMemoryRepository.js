app.factory("PersonRepo",["$q","$http",function($q,$http){
    var person = [];
    var address = {};
    var addressPost = {};
    var contact = {};
    var papers = {};
    var zno = {};
    var man = {};
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

    var pushAddressData = function(data){
        address = data;
    };
    factory.pushAddress = function(data){
        return pushAddressData(data);
    };
    factory.popAddress = function(){
        return address;
    };

    var pushPostAddressData = function(data){
        addressPost = data;
    };
    factory.pushPostAddress = function(data){
        return pushPostAddressData(data);
    };
    factory.popPostAddress = function(){
        return addressPost;
    };

    var pushContactData = function(data){
        contact = data;
    };
    factory.pushContact = function(data){
        return pushContactData(data);
    };
    factory.popContact = function(){
        return contact;
    };

    var pushPapersData = function(data){
        papers = data;
    };
    factory.pushPaper = function(data){
        return pushPapersData(data);
    };
    factory.popPaper = function(){
        return papers;
    };

    var pushZnoData = function(data){
        zno = data;
    };
    factory.pushZno = function(data){
        return pushZnoData(data);
    };
    factory.popZno = function(){
        return zno;
    };

    var pushManData = function(data){
        man = data;
    };
    factory.pushMan = function(data){
        return pushManData(data);
    };
    factory.popMan = function(){
        return man;
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
