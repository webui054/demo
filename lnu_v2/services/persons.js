persons.factory("PersonsService",["$q","$http",function($q, $http){

    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    var factory = {};

    factory.getAll = function(offset,orderByKey,name,genderTypeId,personTypeId,citizenCountryId,marriedTypeId){
        var nameForRequest= "";
        var genderTypeForRequest = "";
        var personTypeForRequest = "";
        var citizenCountryForRequest = "";
        var marriedTypeForRequest = "";
        if(name !== undefined){
            nameForRequest = "&name="+name;
        }
        if(genderTypeId !== undefined){
            genderTypeForRequest = "&genderTypeId="+genderTypeId;
        }
        if(personTypeId !== undefined){
            personTypeForRequest = "&personTypeId="+personTypeId;
        }
        if(citizenCountryId !== undefined){
            citizenCountryForRequest = "&citizenCountryId="+citizenCountryId;
        }
        if(marriedTypeId !== undefined){
            marriedTypeForRequest = "&marriedTypeId="+marriedTypeId;
        }

        return $http.get(baseUrl + "api/persons?limit=10&offset="+ offset+"&orderBy="+orderByKey+nameForRequest
        + genderTypeForRequest +personTypeForRequest+citizenCountryForRequest+marriedTypeForRequest)
            .success(function (data) {
                return data;
            });
    };

    factory.addNewPerson = function(person){
        var deferred = $q.defer();
        var tempPerson =  personValidator(person);
        $http.get(person.photo).success(function(){
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

    factory.editPerson = function(id,person){
        return $http.put(baseUrl+"api/persons/"+id,person);
    };

    factory.deletePerson = function(personId){
        return $http.delete(baseUrl+"api/persons/"+personId);
    };

    var personValidator = function(person){
        if(person.isMilitary === undefined){
            person.isMilitary = 0;
        }
        if(person.isHostel === undefined){
            person.isHostel = 0;
        }
        if(person.resident === undefined){
            person.resident = 0;
        }
        return person;
    };

    return factory;

}]);