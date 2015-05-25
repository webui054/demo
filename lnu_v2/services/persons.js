persons.factory("PersonsService",["$q","$http","PersonRepo",function($q, $http,PersonRepo){

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

    factory.addNewPerson = function(){
        var deferred = $q.defer();
        var tempPerson =  personValidator(PersonRepo.popPerson());
        $http.get(tempPerson.photo).success(function(){
            $http.post(baseUrl+"api/persons/",tempPerson).success(function(data){
                deferred.resolve(data);
                addMoreInfo(data.id);

            });
        }).error(function(){
            tempPerson.photo = 'content/photo/na.jpg';
            $http.post(baseUrl+"api/persons/", tempPerson).success(function(data){
                deferred.resolve(data);
                addMoreInfo(data.id);
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

    var addMoreInfo = function(personId){
        addContacts(personId);
        addAddress(personId);
        addPostAddress(personId);
        addPapers(personId);
        //addZno(personId);
        //addMan(personId);
    };

    var addContacts = function(personId){
        var contacts = PersonRepo.popContact();
        angular.forEach(contacts, function(value){
            value.personId = personId;
            return $http.post(baseUrl+"api/persons/"+personId+"/contacts",value).success(function(data){
                return data;
            }).error(function(msg){
                return msg;
            });
        });
    };

    var addAddress = function(personId){
        var address = PersonRepo.popAddress();
        address.personId = personId;
        return $http.post(baseUrl+"api/persons/"+personId+"/addresses",address).success(function(data){
            return data;
        }).error(function(msg){
            return msg;
        });
    };

    var addPostAddress = function(personId){
        var addressPost = PersonRepo.popPostAddress();
        addressPost.personId = personId;
        return $http.post(baseUrl+"api/persons/"+personId+"/addresses",addressPost).success(function(data){
            return data;
        }).error(function(msg){
            return msg;
        });
    };

    var addPapers = function(personId){
        var papers = PersonRepo.popPaper();
        papers.personId = personId;
        return $http.post(baseUrl+"api/persons/"+personId+"/papers",papers).success(function(data){
            return data;
        }).error(function(msg){
            return msg;
        });
    };

    var addZno = function(personId){
        var zno = PersonRepo.popZno();
        zno.personId = personId;
        return $http.post(baseUrl+"api/persons/"+personId+"/enrolments/subjects",zno).success(function(data){
            return data;
        }).error(function(msg){
            return msg;
        });
    };
    var addMan = function(personId){
        var man = PersonRepo.popMan();
        man.personId = personId;
        return $http.post(baseUrl+"api/persons/"+personId+"/awards",man).success(function(data){
            return data;
        }).error(function(msg){
            return msg;
        });
    };

    return factory;

}]);