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
    factory.getPersonDocumentById = function(personId){
        return $http.get(baseUrl + "api/persons/"+personId+"/papers").success(function(data){
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

    factory.addNewDocument = function(personId,document){
        var tempDocument =  documentValidator(document);
        return $http.post(baseUrl+"api/persons/"+personId+"/papers",tempDocument).success(function(data){
            return data;
        }).error(function(msg){
            return msg;
        });

    };

    factory.getHonorById = function(){
        return $http.get(baseUrl + "api/honors/types").success(function(data){
            return data;
        }).error(function(msg){
        });
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

    factory.deleteDocument = function(personId){
        return $http.delete(baseUrl+"api/persons/"+personId+"/papers");
    };

    return factory;

}]);