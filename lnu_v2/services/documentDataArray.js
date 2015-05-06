/**
 * Created by Oksana on 05.05.2015.
 */
persons.factory("DocumentDataArray",["$q","$http",function($q,$http){
    var document = [];
    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    var factory = {};

    var pushData = function(data){
        document = data;
    };
    factory.pushDocument = function(data){
        return pushData(data);
    };
    factory.popDocument = function(){
        return document;
    };

    factory.getDocumentById = function(){
        return $http.get(baseUrl + "api/papers/usages").success(function(data){
            return data;
        }).error(function(msg){
        });
    };

    factory.getDocumentChildById = function(paperUsageId){
        return $http.get(baseUrl + "api/papers/types?paperUsageId=" + paperUsageId).success(function(data){
            return data;
        }).error(function(msg){
        });
    };

    factory.addNewDocument = function(document){
        var deferred = $q.defer();
        var tempPerson =  personValidator(document);
        $http.get(document.photo).success(function(){
            $http.post(baseUrl+"api/persons/",tempPerson).success(function(data){
                deferred.resolve(data);
            });
        }).error(function(){
            tempPerson.photo = 'content/photo/na.jpg';
            $http.post(baseUrl+"api/persons/", tempPerson).success(function(data){
                deferred.resolve(data);
            });
        });
        return deferred.promise;
    };
    var documentValidator = function(document){
        if(document.isChecked === undefined){
            document.isChecked = 0;
        }
        if(document.isForeign === undefined){
            document.isForeign = 0;
        }
        return document;
    };

    return factory;

}]);