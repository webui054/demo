var auth = angular.module('Authentication', []);
var persons = angular.module('Persons', []);
var propositions = angular.module('Propositions', []);
var benefits = angular.module('Benefits', []);

var app = angular.module('LnuApp', ['ui.bootstrap','ngRoute','Authentication','Persons','Propositions','Benefits'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginController',
            hideMenus: true
        });
        $routeProvider.when('/persons', {
            templateUrl: 'persons/persons.html'
        });
        $routeProvider.when('/propositions', {
            templateUrl: 'propositions/propositionView.html',
            controller: 'ProposalsCTRL'
        });
            $routeProvider.when('/person/:personId', {
            templateUrl: 'persons/person/person.html',
            controller: 'PersonCtrl'

        });
        $routeProvider.when('/benefits', {
            templateUrl: 'benefits/benefitsView.html',
            controller: 'BenefitsCTRL'
        });
        $routeProvider.when('/logout', {
            resolve: ['AuthenticationService','$location', function(AuthenticationService,$location){
                AuthenticationService.ClearCredentials();
                $location.path('/login');
            }]
        });

        $routeProvider.otherwise({ redirectTo: '/login' });
    }])
    .run(['$rootScope', '$location', '$http',
        function ($rootScope, $location, $http) {
            $rootScope.$on('$locationChangeStart', function () {
                if ($location.path() !== '/login' && (localStorage.getItem('token') === "" || localStorage.getItem('token') === null)) {
                    $location.path('/login');
                }
                else{
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + localStorage.getItem('token');
                    $rootScope.isLoggedIn = true;
                }
            });
        }]);
app.controller('LayoutCtrl', ["$scope",
    function ($scope) {

        $scope.tab = 1;

        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
        };
        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };

        $scope.brand = 'ЛНУ';
        $scope.personViewModel = 'Персони';
        $scope.propositionViewModel = 'Пропозиції';
        $scope.benefitsViewModel = 'Пільги';
    }]);
auth.factory('AuthenticationService',['$http', '$rootScope',
        function ($http, $rootScope) {
            var service = {};

            service.Login = function (username, password) {
                var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
                var authdata  = btoa(username + ':' + password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
                return $http.get(baseUrl + 'api/persons?limit=1');

            };

            service.SetCredentials = function (username, password) {
                var authdata  = btoa(username + ':' + password);
                localStorage.setItem('token', authdata);
                $rootScope.isLoggedIn = true;
            };

            service.ClearCredentials = function () {
                $rootScope.isLoggedIn = false;
                localStorage.setItem('token', "");
                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            return service;
        }]);
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
app.filter('checkYesNo',function() {
    return function(input) {
        if(typeof input === "Number"){
            input = input !== 0;
        }
        return input ? 'Так' : 'Ні';
    };
});
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

    factory.addAddress = function(personId,address){
        return $http.post(baseUrl+"api/persons/"+personId+"/addresses",address).success(function(data){
            return data;
        }).error(function(msg){
            return msg;
        });
    };

    return factory;

}]);
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
        });
        return deferred.promise;
    };

    factory.getDataArray = function(str){
        var deferred = $q.defer();
        $http.get(str).success(function (data){
            deferred.resolve(data);
        }).error(function(err){
            deferred.resolve(err);
        });
        return deferred.promise;
    };

    return factory;


}]);

auth.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {

            AuthenticationService.ClearCredentials();

            $scope.login = function () {
                if(/[^а-яіїЇіЁё]/.test($scope.username) && /[^а-яіїЇіЁё]/.test($scope.password)){
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.username, $scope.password).success(function(data) {
                        AuthenticationService.SetCredentials($scope.username, $scope.password);
                        $location.path('/persons');
                    }).error(function(data){
                        $scope.error = data.message;
                        $scope.dataLoading = false;
                        AuthenticationService.ClearCredentials();
                        $location.path('/login');
                    });
                }else{
                    $scope.error = "Ваш логін містить недозволені символи";
                    $scope.dataLoading = false;
                    AuthenticationService.ClearCredentials();
                    $location.path('/login');
                }
            }
        }]);

persons.controller("PersonsCtrl",["$scope","PersonRepo","$rootScope","$http","PersonDataMappingArray","$location",
    'PersonsService','$modal',
    function($scope,PersonRepo,$rootScope,$http,PersonDataMappingArray,$location,PersonsService,$modal){

        $scope.personGeneralInfoAddModalObj = {};
        $scope.personForeignerInfoAddModalObj = {};
        $scope.searchObj = {};
        $scope.isShowGeneralInfo = false;
        $scope.personGeneralInfoObj = {};

        $scope.personGeneralInfoEditModalObj ={};
        $scope.personsOffset = 0;

        $scope.personForeignerInfoEditModalObj ={};

        $scope.tempForeinerArrObj = [{ personId:1, languageId:2, name:"Kuznetsov Dmytro Oleksandrovych",
            firstName:"Dmytro",fatherName:"Oleksandrovych",surname:"Kuznetsov"}
            ,{ personId:2, languageId:3, name:"Kuznetsov Dmytro Oleksandrovych",
                firstName:"Dmytro",fatherName:"Oleksandrovych",surname:"Kuznetsov"}];

        $scope.tempForeinerObj ={};

        $scope.tableHeaderDataObj = [ {name:'ПІБ',orderByKey:'name'},
            {name:'Стать',orderByKey:'genderTypeId'},
            {name:'Народження',orderByKey:'begDate'},
            {name:'Тип',orderByKey:'personTypeId'},
            {name:'Резидент',orderByKey:'resident'},
            {name:'Громадянство',orderByKey:'citizenCountryId'},
            {name:'Особова справа',orderByKey:''},
            {name:'Управління',orderByKey:''}];

        $scope.allMappedArrData = {
            citizenCountry: [],
            genderTypes : [],
            personsTypes : [],
            marriedType : [],
            languages : []
        };
        $scope.isMoreSearch = false;

        // persons mapped array getters
        $scope.getCitizenCountry = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/citizenCountry.json').then(function(data){
                $scope.allMappedArrData.citizenCountry = data;
            });
        };
        $scope.getLanguages = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/languages.json').then(function(data){
                $scope.allMappedArrData.languages = data;
            });
        };
        $scope.getMarriedTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/marriedTypes.json').then(function(data){
                $scope.allMappedArrData.marriedType = data;
            });
        };
        $scope.getPersonsType = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/personsTypeId.json').then(function(data){
                $scope.allMappedArrData.personsTypes = data;
            });

        };
        $scope.getGenderTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/genderTypes.json').then(function(data){
                $scope.allMappedArrData.genderTypes = data;
            });
        };
        // run persons mapped array getters
        $scope.getCitizenCountry();
        $scope.getLanguages();
        $scope.getMarriedTypes();
        $scope.getPersonsType();
        $scope.getGenderTypes();

        // search data content array getters
        $scope.dataForSearchContent = {
            citizenCountries: [],
            genderTypes : [],
            personsTypes : [],
            marriedTypes : [],
            languages : [],
            personName : ""
        };
        $scope.searchObj ={
            personName : ""
        };

        $scope.getCitizenCountry = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/citizenCountry.json').then(function(data){
                $scope.dataForSearchContent.citizenCountries = data;
            });
        };

        $scope.getLanguages = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/languages.json').then(function(data){
                $scope.dataForSearchContent.languages = data;
            });
        };

        $scope.getMarriedTypes = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/marriedTypes.json').then(function(data){
                $scope.dataForSearchContent.marriedTypes = data;
            });
        };

        $scope.getPersonsType = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/personsTypeId.json').then(function(data){
                $scope.dataForSearchContent.personsTypes = data;
            });

        };

        $scope.getGenderTypes = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/genderTypes.json').then(function(data){
                $scope.dataForSearchContent.genderTypes = data;
            });
        };

        $scope.getGenderTypes();
        $scope.getCitizenCountry();
        $scope.getPersonsType();
        $scope.getMarriedTypes();
        $scope.getLanguages();
        // end: search data content array getters

        $scope.personData = {};
        $scope.orderByKey = 'name-asc';
        $scope.getPersonData = function (offset,orderByKey) {
            return PersonsService.getAll(offset,orderByKey,$scope.searchObj.personName,$scope.searchObj.genderTypeId
                ,$scope.searchObj.personTypeId,$scope.searchObj.citizenCountryId,$scope.searchObj.marriedTypeId)
                .success(function(data){
                    $scope.personsCount = data.count;
                    $scope.personData = data.resources;
                    PersonRepo.pushPerson(data.resources);
                });
        };

        $scope.getPersonData(0,$scope.orderByKey);

        $scope.reverseSort = false;

        $scope.getOrderByPersonData = function (orderByKey) {
            if(orderByKey === ''){

            }else{
                $scope.reverseSort = !$scope.reverseSort;
                if($scope.reverseSort){
                    $scope.orderByKey = orderByKey +'-asc';
                    $scope.getPersonData($scope.personsOffset,$scope.orderByKey);
                }
                else {
                    $scope.orderByKey = orderByKey +'-desc';
                    $scope.getPersonData($scope.personsOffset,$scope.orderByKey);
                }
            }
        };

        $scope.getNextData = function(){
            if(($scope.personsOffset+10) < $scope.personsCount){
                $scope.personsOffset += 10;
                $scope.getPersonData($scope.personsOffset,$scope.orderByKey);
            }
        };

        $scope.getPrevData = function(){
            if($scope.personsOffset > 0) {
                $scope.personsOffset -= 10;
                $scope.getPersonData($scope.personsOffset, $scope.orderByKey);
            }
        };

        $scope.showGeneralInfo = function(data){
            $location.path('/person/'+ data.id);
        };

        $scope.pushPersonToObj= function(data){
            $scope.personGeneralInfoEditModalObj = data;
            var tempDate = new Date(data.begDate);
            $scope.personGeneralInfoEditModalObj.day = tempDate.getDate();
            $scope.personGeneralInfoEditModalObj.month = (tempDate.getMonth()+1);
            $scope.personGeneralInfoEditModalObj.year = tempDate.getFullYear();
        };

        $scope.isMoreSearch = false;
        $scope.showSearch= function(iff){
            $scope.searchObj = {};
            $scope.isMoreSearch = iff;
        };

        $scope.searchPersonsByName = function(){
            $scope.personsOffset = 0;
            $scope.getPersonData(0,$scope.orderByKey);
        };

    }]);


persons.controller("PersonCtrl",["$scope","PersonRepo",'$routeParams', function($scope,PersonRepo,$routeParams){
    $scope.personTab = 1;

    $scope.selectPersonTab = function(setTab){
        $scope.personTab = setTab;
    };

    $scope.isPersonTabSelected = function(checkTab){
        return $scope.personTab === checkTab;
    };

    $scope.backToTheTable = function(){
        $scope.personTab = 1;
        $scope.$parent.isShowGeneralInfo = false;
    };

    (function (){
      PersonRepo.getPersonById2(parseInt($routeParams.personId,10)).then(function(data){

          $scope.personGeneralInfoEditModalObj = data;
          var tempDate = new Date(data.begDate);

          $scope.personGeneralInfoEditModalObj.day = tempDate.getDate();
          $scope.personGeneralInfoEditModalObj.month = (tempDate.getMonth()+1);
          $scope.personGeneralInfoEditModalObj.year = tempDate.getFullYear();
          $scope.personGeneralInfoObj = data;

          $scope.isShowGeneralInfo = true;
              console.log(data)
      }
      );
    }())
}]);
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


app.controller("GeneralPersonInfoCTRL",["$scope","PersonRepo","$http","PersonDataMappingArray",
    function($scope,PersonRepo,$http,PersonDataMappingArray){

        $scope.personDataArrFOrGeneralView = [];
        $scope.personDataArrFOrGeneralView.citizenCountries = [];
        $scope.personDataArrFOrGeneralView.personTypes = [];
        $scope.personDataArrFOrGeneralView.marriedTyps = [];
        $scope.personDataArrFOrGeneralView.genderTypes = [];

        $scope.getCitizenCountries = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/citizenCountry.json').then(function(data){
                $scope.personDataArrFOrGeneralView.citizenCountries = data;
            });
        };
        $scope.getMarriedTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/marriedTypes.json').then(function(data){
                $scope.personDataArrFOrGeneralView.marriedTypes = data;
            });
        };
        $scope.getPersonTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/personsTypeId.json').then(function(data){
                $scope.personDataArrFOrGeneralView.personTypes = data;
            });
        };
        $scope.getGenderTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/genderTypes.json').then(function(data){
                $scope.personDataArrFOrGeneralView.genderTypes = data;
            });
        };

        $scope.getGenderTypes();
        $scope.getPersonTypes();
        $scope.getCitizenCountries();
        $scope.getMarriedTypes();
    }]);
persons.controller("AddNewPersonModalCtrl",["$scope","PersonDataMappingArray","$http","PersonsService","$location",
    function($scope,PersonDataMappingArray,$http,PersonsService,$location){
        $scope.allPersonsArrData = [];
        $scope.allPersonsArrData = {
            citizenCountries: [],
            genderTypes : [],
            personsTypes : [],
            marriedTypes : [],
            languages : []
        };

        $scope.getCitizenCountry = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/citizenCountry.json').then(function(data){
                $scope.allPersonsArrData.citizenCountries = data;
            });
        };
        $scope.getCitizenCountry();

        $scope.getLanguages = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/languages.json').then(function(data){
                $scope.allPersonsArrData.languages = data;
            });
        };
        $scope.getLanguages();


        $scope.getMarriedTypes = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/marriedTypes.json').then(function(data){
                $scope.allPersonsArrData.marriedTypes = data;
            });
        };

        $scope.getMarriedTypes();

        $scope.getPersonsType = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/personsTypeId.json').then(function(data){
                $scope.allPersonsArrData.personsTypes = data;
            });

        };
        $scope.getPersonsType();

        $scope.getGenderTypes = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/genderTypes.json').then(function(data){
                $scope.allPersonsArrData.genderTypes = data;
            });
        };
        $scope.getGenderTypes();

        (function () {
            var day = document.getElementById('dayAp');
            day.addEventListener('keydown',function(e){
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)
                    && (e.keyCode !== 8)) {
                    e.preventDefault();
                }
            });
            var mouth = document.getElementById('monthAp');
            mouth.addEventListener('keydown',function(e){
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)
                    && (e.keyCode !== 8)) {
                    e.preventDefault();
                }
            });
            var year = document.getElementById('yearAp');
            year.addEventListener('keydown',function(e){
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)
                    && (e.keyCode !== 8)) {
                    e.preventDefault();
                }
            });
            var docNum = document.getElementById('docNumAp');
            docNum.addEventListener('keydown',function(e){
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)
                    && (e.keyCode !== 8)) {
                    e.preventDefault();
                }
            });

            var form = document.forms["addNewPersonModalForm"].elements;
            angular.forEach(form, function(data,i){
                if(data.name === ('addNewPerson'+i)){
                var el = document.getElementById('addNewPerson'+i);
                    $scope.one = false;
                    el.addEventListener('keypress',function(e){
                        //var asd = el.value;
                        //var reg = /['а-яА-ЯіїєІЇЄ]/;
                        //reg.match(asd);
                        var isNotUkrKeyPress =  (e.keyCode < 1025 || e.keyCode > 1097);
                        if(e.keyCode !== 39 || $scope.one){
                            if ((isNotUkrKeyPress) || (e.keyCode === 8)) {
                                if(e.keyCode !== 1100){
                                    if (e.keyCode < 1102 || e.keyCode > 1104) {
                                        if (e.keyCode < 1106 || e.keyCode > 1111) {
                                            e.preventDefault();
                                        }
                                    }
                                }
                            }
                        }else{
                            $scope.one = true;
                        }
                    });
                }
            });
        }());




        $scope.addNewPerson = function(){
            $('#addNewPersonModal').modal("hide");
            $scope.personGeneralInfoAddModalObj.name = $scope.personGeneralInfoAddModalObj.firstName +
            " " + $scope.personGeneralInfoAddModalObj.surname + " " + $scope.personGeneralInfoAddModalObj.fatherName;

            $scope.personGeneralInfoAddModalObj.begDate = new Date($scope.personGeneralInfoAddModalObj.begDate.year +"-"
            +($scope.personGeneralInfoAddModalObj.begDate.month)+"-"+$scope.personGeneralInfoAddModalObj.begDate.day);

            $scope.personGeneralInfoAddModalObj.identifier = "123123";
            //$scope.personGeneralInfoAddModalObj.endDate = "2015-01-01";

            PersonsService.addNewPerson($scope.personGeneralInfoAddModalObj).then(function(data){
                $scope.personData.push(data);
            });

            $scope.personGeneralInfoAddModalObj = {};
        }

    }]);

persons.controller("EditNewPersonModalCtrl",["$scope","PersonDataMappingArray","$http","PersonsService",
    function($scope,PersonDataMappingArray,$http,PersonsService){
    $scope.allPersonsArrData = [];
    $scope.allPersonsArrData.personsTypes = [];
    $scope.allPersonsArrData.marriedTypes = [];
    $scope.allPersonsArrData.genderTypes = [];
    $scope.allPersonsArrData.citizenCountries = [];
    $scope.allPersonsArrData.languages = [];


    $scope.getCitizenCountry = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/citizenCountry.json').then(function(data){
            $scope.allPersonsArrData.citizenCountries = data;
        });
    };
    $scope.getCitizenCountry();

    $scope.getLanguages = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/languages.json').then(function(data){
            $scope.allPersonsArrData.languages = data;
        });
    };
    $scope.getLanguages();


    $scope.getMarriedTypes = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/marriedTypes.json').then(function(data){
            $scope.allPersonsArrData.marriedTypes = data;
        });
    };

    $scope.getMarriedTypes();

    $scope.getPersonsType = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/personsTypeId.json').then(function(data){
            $scope.allPersonsArrData.personsTypes = data;
        });

    };
    $scope.getPersonsType();

    $scope.getGenderTypes = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/genderTypes.json').then(function(data){
            $scope.allPersonsArrData.genderTypes = data;
        });
    };
    $scope.getGenderTypes();

        $scope.editPerson = function(elId){
            $(elId).modal("hide");
            $scope.personGeneralInfoEditModalObj.name = $scope.personGeneralInfoEditModalObj.firstName +
            " " + $scope.personGeneralInfoEditModalObj.surname + " " + $scope.personGeneralInfoEditModalObj.fatherName;

            var tempDate = $scope.personGeneralInfoEditModalObj.year + "-"+$scope.personGeneralInfoEditModalObj.month +
                "-"+$scope.personGeneralInfoEditModalObj.day;
            $scope.personGeneralInfoEditModalObj.begDate = tempDate;

            var data = {
                personTypeId:  $scope.personGeneralInfoEditModalObj.personTypeId,
                citizenCountryId: $scope.personGeneralInfoEditModalObj.citizenCountryId,
                genderTypeId: $scope.personGeneralInfoEditModalObj.genderTypeId,
                marriedTypeId: $scope.personGeneralInfoEditModalObj.marriedTypeId,
                begDate: tempDate,
                endDate: "2015-01-01",
                firstName: $scope.personGeneralInfoEditModalObj.firstName,
                surname: $scope.personGeneralInfoEditModalObj.surname,
                fatherName: $scope.personGeneralInfoEditModalObj.fatherName,
                name: $scope.personGeneralInfoEditModalObj.name,
                identifier: $scope.personGeneralInfoEditModalObj.identifier,
                isHostel:  $scope.personGeneralInfoEditModalObj.isHostel ,
                isMilitary:  $scope.personGeneralInfoEditModalObj.isMilitary ,
                resident:  $scope.personGeneralInfoEditModalObj.resident ,
                photo:  $scope.personGeneralInfoEditModalObj.photo ,
                birthPlace:  $scope.personGeneralInfoEditModalObj.birthPlace ,
                docNum:  $scope.personGeneralInfoEditModalObj.docNum ,
                docSeries:  $scope.personGeneralInfoEditModalObj.docSeries
            };



            PersonsService.editPerson($scope.personGeneralInfoEditModalObj.id,data).success(function(data){
                console.log(data)
            });





            //var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
            //$http.put(baseUrl+"api/persons/"+ $scope.personGeneralInfoEditModalObj.id,data)
            //    .success(function(data){
            //
            //    console.log(data)
            //});
            //console.log($scope.personGeneralInfoEditModalObj);
        }

    }]);

persons.controller("DeletePersonModalCtrl",["$scope","$http","PersonsService",
    function($scope,$http,PersonsService,$dialog,$location){

        $scope.ok = function () {
            $('#deletePersonModalContent').modal("hide");
            PersonsService.deletePerson($scope.personGeneralInfoEditModalObj.id).success(function(data){
                console.log(data)
            });
        };

        $scope.cancel = function () {
            $('#deletePersonModalContent').modal("hide");
        };

    }]);

persons.controller('AddressCtrl', ["$scope", "AddressDataArray", "$http",'PersonRepo','$routeParams',
    function ($scope,AddressDataArray, $http, PersonRepo, $routeParams) {
    $scope.tempData = {};
    $scope.tempAddressArray = [];
    $scope.tempAddressObj = [];
    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

        $scope.addressObj = {
                streetTypeId:"",
                adminUnitId:"",
                addressTypeId: 1,
                begDate:"1212-12-12",
                endDate:"1212-12-12",
                house:"",
                zipCode:"",
                street:"",
                apartment:""
        };

        $scope.postAddressObj = {
            streetTypeId:"",
            adminUnitId:"",
            addressTypeId: 2,
            begDate:"1212-12-12",
            endDate:"1212-12-12",
            house:"",
            zipCode:"",
            street:"",
            apartment:""
        };

    //Address Select for person address
    $scope.addressData = {
        countries:[],
        regions:[],
        cdTypes:[],
        districts:[],
        vTypes:[],
        villages:[],
        additions: [],
        country:{},
        region:{},
        cdType:{},
        district:{},
        vType:{},
        village:{},
        countriesPost:[],
        regionsPost:[],
        cdTypesPost:[],
        districtsPost:[],
        vTypesPost:[],
        villagesPost:[],
        additionsPost: [],
        countryPost:{},
        regionPost:{},
        cdTypePost:{},
        districtPost:{},
        vTypePost:{},
        villagePost:{},
        isPostAddress: true,
        streetTypeId:{},
        streetTypes: [],
        streetTypePost:{},
        streetTypesPost: [],
        streetTypeMap: [],
        cityNameMap: []
    };

    $scope.getCountries = function(){
        AddressDataArray.getAddressById().success(function(data){
            var addEl = document.getElementById("addrsC");
            addEl.addEventListener('change',function(){
                $scope.getRegionAddressData($scope.addressData.country.id);
            });
            $scope.addressData.countries = data.resources;
        });
    };
    $scope.getCountries();


    $scope.getRegionAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsR");
            addEl.addEventListener('change',function(){
                $scope.getCdTypesAddressData($scope.addressData.region.id);
            });
            $scope.addressData.regions = data.resources;
            if(data.count !== 0){
                $scope.isCountrySelected = true;
            }
            $scope.isRegionSelected = false;
            $scope.iscdTypeSelected = false;
            $scope.isDistrictSelected = false;
            $scope.isVTypeSelected = false;
            $scope.isVillageSelected = false;
        });
    };

    $scope.getCdTypesAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsCD");
            addEl.addEventListener('change',function(){
                $scope.getDistrictAddressData($scope.addressData.cdType.id);
            });
            $scope.addressData.cdTypes = data.resources;
            if(data.count !== 0){
                $scope.isRegionSelected = true;
            }
            $scope.iscdTypeSelected = false;
            $scope.isDistrictSelected = false;
            $scope.isVTypeSelected = false;
            $scope.isVillageSelected = false;
        });
    };

    $scope.getDistrictAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsD");
            addEl.addEventListener('change',function(){
                $scope.getVTypeAddressData($scope.addressData.district.id);
            });
            $scope.addressData.districts = data.resources;
            if(data.count !== 0){
                $scope.iscdTypeSelected = true;
            }
            $scope.isDistrictSelected = false;
            $scope.isVTypeSelected = false;
            $scope.isVillageSelected = false;
        });
    };

    $scope.getVTypeAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsV");
            addEl.addEventListener('change',function(){
                $scope.getVillageAddressData($scope.addressData.vType.id);
            });
            $scope.addressData.vTypes = data.resources;
            if(data.count !== 0){
                $scope.isDistrictSelected = true;
            }
            $scope.isVTypeSelected = false;
            $scope.isVillageSelected = false;

        });
    };

    $scope.getVillageAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsVi");
            addEl.addEventListener('change',function(){
                $scope.getAdditionAddressData($scope.addressData.village.id);
            });
            $scope.addressData.villages = data.resources;
            if(data.count !== 0){
                $scope.isVTypeSelected = true;
            }
            $scope.isVillageSelected = false;
        });
    };

    $scope.getAdditionAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            $scope.addressData.additions = data.resources;
            if(data.count !== 0){
                $scope.isVillageSelected = true;
            }
        });
    };

    //Post Address

    $scope.getCountriesPost = function(){
        AddressDataArray.getAddressById().success(function(data){
            var addEl = document.getElementById("addrsCPost");
            addEl.addEventListener('change',function(){
                $scope.getRegionPostAddressData($scope.addressData.countryPost.id);
            });
            $scope.addressData.countriesPost = data.resources;
        });
    };
    $scope.getCountriesPost();


    $scope.getRegionPostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsRPost");
            addEl.addEventListener('change',function(){
                $scope.getCdTypesPostAddressData($scope.addressData.regionPost.id);
            });
            $scope.addressData.regionsPost = data.resources;
            if(data.count !== 0){
                $scope.isCountryPostSelected = true;
            }
            $scope.isRegionPostSelected = false;
            $scope.iscdTypePostSelected = false;
            $scope.isDistrictPostSelected = false;
            $scope.isVTypePostSelected = false;
            $scope.isVillagePostSelected = false;
        });
    };

    $scope.getCdTypesPostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsCDPost");
            addEl.addEventListener('change',function(){
                $scope.getDistrictPostAddressData($scope.addressData.cdTypePost.id);
            });
            $scope.addressData.cdTypesPost = data.resources;
            if(data.count !== 0){
                $scope.isRegionPostSelected = true;
            }
            $scope.iscdTypePostSelected = false;
            $scope.isDistrictPostSelected = false;
            $scope.isVTypePostSelected = false;
            $scope.isVillagePostSelected = false;
        });
    };

    $scope.getDistrictPostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsDPost");
            addEl.addEventListener('change',function(){
                $scope.getVTypePostAddressData($scope.addressData.districtPost.id);
            });
            $scope.addressData.districtsPost = data.resources;
            if(data.count !== 0){
                $scope.iscdTypePostSelected = true;
            }
            $scope.isDistrictPostSelected = false;
            $scope.isVTypePostSelected = false;
            $scope.isVillagePostSelected = false;
        });
    };

    $scope.getVTypePostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsVPost");
            addEl.addEventListener('change',function(){
                $scope.getVillagePostAddressData($scope.addressData.vTypePost.id);
            });
            $scope.addressData.vTypesPost = data.resources;
            if(data.count !== 0){
                $scope.isDistrictPostSelected = true;
            }
            $scope.isVTypePostSelected = false;
            $scope.isVillagePostSelected = false;

        });
    };

    $scope.getVillagePostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsViPost");
            addEl.addEventListener('change',function(){
                $scope.getAdditionPostAddressData($scope.addressData.villagePost.id);
            });
            $scope.addressData.villagesPost = data.resources;
            if(data.count !== 0){
                $scope.isVTypePostSelected = true;
            }
            $scope.isVillagePostSelected = false;
        });
    };

    $scope.getAdditionPostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            $scope.addressData.additionsPost = data.resources;
            if(data.count !== 0){
                $scope.isVillagePostSelected = true;
            }
        });
    };
        //end for address selection

    $scope.getStreetTypes = function(){
        AddressDataArray.getStreetTypeById().success(function(data){
            $scope.addressData.streetTypes = data.resources;
            $scope.addressData.streetTypesPost = data.resources;
            angular.forEach(data.resources,function(value){
                $scope.addressData.streetTypeMap[value.id] = value.abbrName;
            })
        });
    };
    $scope.getStreetTypes();

    (function (){
        PersonRepo.getPersonById2(parseInt($routeParams.personId,10)).then(function(data){
            $scope.getAddressData(data.id);
        });
    }());
    $scope.getAddressData = function(id){
        AddressDataArray.getAddressData(id).success(function(data){
            if(data.resources[0]){
            data.resources[0].house = parseInt( data.resources[0].house,10);
            data.resources[0].apartment = parseInt( data.resources[0].apartment,10);
            data.resources[1].house = parseInt( data.resources[0].house,10);
            data.resources[1].apartment = parseInt( data.resources[0].apartment,10);

            $scope.addressObj = data.resources[0];
            $scope.postAddressObj = data.resources[1];
            };
        });

    };
        (function (){
            PersonRepo.getPersonById2(parseInt($routeParams.personId,10)).then(function(data){
                $scope.getContactData(data.id);
            });
        }());
        $scope.getContactData = function(id){
            AddressDataArray.getContactData(id).success(function(data){
                $scope.mPhoneObj = data.resources[1];
                $scope.phoneObj = data.resources[5];
                $scope.emailObj = data.resources[2];
            });
        };


    $scope.addAddress = function(){
        $scope.addressObj.streetTypeId = $scope.addressObj.streetTypeId.id;
        $scope.addressObj.adminUnitId = $scope.addressData.village.id;
        $scope.addressObj.personId = parseInt($routeParams.personId,10);
        $scope.postAddressObj.streetTypeId = $scope.postAddressObj.streetTypeId.id;
        $scope.postAddressObj.adminUnitId = $scope.addressData.villagePost.id;
        $scope.postAddressObj.personId = parseInt($routeParams.personId,10);
        AddressDataArray.addAddress(parseInt($routeParams.personId,10),$scope.addressObj).then(function(data){
            $scope.addressObj = data.data;
            AddressDataArray.addAddress(parseInt($routeParams.personId,10),$scope.postAddressObj).then(function(data){
                $scope.postAddressObj = data.data;
            });
        });
        $("#addAddressModal").modal("hide");
    };

}]);
persons.controller('DocumentsCtrl', ["$scope","DocumentDataArray", "$http",'$routeParams', function ($scope, DocumentDataArray, $http,$routeParams) {

    $scope.tempDocumentsArray = [];
    $scope.paperUsageId = "";
    $scope.paperTypeId = "";
    $scope.honorsTypeId = "";
    $scope.docSeries = "";
    $scope.docNum = "";
    $scope.docDate = "";
    $scope.docIssues = "";
    $scope.docPin = "";
    $scope.mark = "";
    $scope.isChecked = "";
    $scope.isForeign = "";
    $scope.documentsMapTypes = [];
    var PersonIdDoc = parseInt($routeParams.personId,10);

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        $scope.tempDocumentsArray = [];
        $scope.paperUsageId = "";
        $scope.paperTypeId = "";
        $scope.honorsTypeId = "";
        $scope.docSeries = "";
        $scope.docNum = "";
        $scope.docDate = "";
        $scope.docIssues = "";
        $scope.docPin = "";
        $scope.mark = "";
        $scope.isChecked = "";
        $scope.isForeign = "";

        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

    $scope.AddNewDocument = function () {
        $("#addDocumentModal").modal("hide");
        $scope.tempData = {};


        $scope.tempData.paperUsageId = $scope.paperUsageId;
        $scope.tempData.paperTypeId = $scope.paperTypeId;
        $scope.tempData.docSeries = $scope.docSeries;
        $scope.tempData.docNum = $scope.docNum;
        $scope.tempData.honorsTypeId =  $scope.honorsTypeId;
        $scope.tempData.docDate = $scope.docDate;
        $scope.tempData.docIssued = $scope.docIssued;
        $scope.tempData.docPin = $scope.docPin;
        $scope.tempData.mark = $scope.mark;
        $scope.tempData.isChecked = $scope.isChecked;
        $scope.tempData.isForeign = $scope.isForeign;
        $scope.tempDocumentsArray.push($scope.tempData);

        $scope.paperUsageId = "";
        $scope.paperTypeId = "";
        $scope.honorsTypeId = "";
        $scope.docSeries = "";
        $scope.docNum = "";
        $scope.docDate = "";
        $scope.docIssued = "";
        $scope.docPin = "";
        $scope.mark = "";
        $scope.isChecked = "";
        $scope.isForeign = "";
    };


    $scope.documentsData = [{
        personId: 118,
        paperTypeId: 1,
        honorsTypeId: 1,
        docSeries: '',
        docNum: 0,
        docDate:'2013-12-12',
        docIssued: '',
        docPin: 0,
        mark: 0,
        isChecked: 0,
        isForeign : 0
    }];

    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    $scope.getUsages = function(){
        DocumentDataArray.getDocumentById().success(function(data){
            var addEl = document.getElementById("docsU");
            addEl.addEventListener('change',function(){
                $scope.getTypeDocumentsData($scope.documentsData.usageId);
            });
            $scope.documentsUsages = data.resources;
        });
    };
    $scope.getUsages();

    $scope.getTypeDocumentsData = function(paperUsageId){
        DocumentDataArray.getDocumentChildById(paperUsageId).success(function(data){
            $scope.documentsTypes = data.resources;
            $scope.isUsageSelected = true;
        });
    };


    $scope.getPersonDocumentsData = function(){
        DocumentDataArray.getPersonDocumentById(PersonIdDoc).success(function(data){
            if(data.resources.length > 0){
                $scope.documentsData = {};

                $scope.documentsData = data.resources;};

            console.log($scope.documentsData);
        });
    };

    $scope.getPersonDocumentsData();



    $scope.addDoc= function(){
        $('#addDocumentModal').modal("hide");
        var sasd = {
            "personId" : PersonIdDoc,
            "paperTypeId" : 1,
            "honorsTypeId" : 1,
            "docSeries" : $scope.docSeries,
            "docNum" : ''+ $scope.docNum,
            "docDate" : $scope.docDate,
            "docIssued" : $scope.docIssued,
            "docPin" : ''+$scope.docPin,
            "mark" : 4.7,
            "isChecked" : 1,
            "isForeign" : 0
        };

        DocumentDataArray.addNewDocument(PersonIdDoc, sasd).then(function(data){
            $scope.getPersonDocumentsData();
    })
};


}]);
/**
 * Created by Oksana on 09.04.2015.
 */

persons.controller('MarkCtrl', ["$scope", "$http", function ($scope,$http) {

    $scope.tempMarkArray = [];
    $scope.personPaperId = "";
    $scope.publicActivityAwardId = "";
    $scope.bonus = "";
    $scope.enrolmentSubjectId = "";
    $scope.mark = "";


    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

    $scope.AddNewZno = function () {
        $("#addZnoModal").modal("hide");
        $scope.tempZnoData = {};


        $scope.tempZnoData.personPaperId = $scope.personPaperId;
        $scope.tempZnoData.enrolmentSubjectId = $scope.enrolmentSubjectId;
        $scope.tempZnoData.mark = $scope.mark;
        $scope.tempMarkArray.push($scope.tempZnoData);

        $scope.personPaperId = "";
        $scope.enrolmentSubjectId = "";
        $scope.mark = "";
    };

    $scope.AddNewMan = function () {
        $("#addManModal").modal("hide");
        $scope.tempManData = {};


        $scope.tempManData.personPaperId = $scope.personPaperId;
        $scope.tempManData.publicActivityAwardId = $scope.publicActivityAwardId;
        $scope.tempManData.bonus = $scope.bonus;
        $scope.tempMarkArray.push($scope.tempManData);

        $scope.personPaperId = "";
        $scope.publicActivityAwardId = "";
        $scope.bonus = "";
    };

    $scope.markData = {
        paper: [],
        paperId: {},
        enrolments: [],
        enrolmentId: {},
        mark: {},
        activities: [],
        activityId: {},
        bonus: {}
    };

   // var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
   // $scope.getUsages = function () {
   //     DocumentsDataArray.getUsagesById().success(function (data) {
   //         var addEl = document.getElementById("docsU");
   //         addEl.addEventListener('change', function () {
   //             $scope.getTypeDocumentsData($scope.documentData.usageId);
   //         });
   //         $scope.documentData.usages = data.resources;
   //     });
   // };
   //// $scope.getUsages();
   //
   // $scope.getTypeDocumentsData = function (parentId) {
   //     DocumentDataArray.getDocumentChildById(parentId).success(function (data) {
   //         var addEl = document.getElementById("docsT");
   //         addEl.addEventListener('change', function () {
   //             $scope.getDocData($scope.documentData.typeId);
   //         });
   //         $scope.documentData.types = data.resources;
   //         $scope.isUsageSelected = true;
   //     });
   // };

}]);
benefits.controller("BenefitsCTRL", ["$scope","$http", function($scope,$http) {

    $scope.propozTab = 31;

    $scope.selectPropozTab = function(setTab){
        $scope.propozTab = setTab;
    };

    $scope.isPropozTabSelected = function(checkTab){
        return $scope.propozTab === checkTab;
    };

    $scope.tempBenefitArray = [];
    $scope.name = "";
    $scope.id = "";
    $scope.benefitAmount = "";
    $scope.abbrName = "";

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };
    var realPath = "";
    var tempPath = 'benefits/tempBenefitArray.json';
    var path = tempPath;
    $scope.getTempBenefitData = function () {
        $http.get(path)
            .success(function (data) {
                //console.log(data);
                //$scope.tempBenefitArray = angular.fromJson(data);
                $scope.tempBenefitArray = (data);
            })
            .error(function (msg) {
                console.log(msg);
            });
    };
    $scope.getTempBenefitData();


    $scope.AddNewBenefit = function () {
        $("#addBenefitModal").modal("hide");
        $scope.tempData = {};

        $scope.tempData.name = $scope.name;
        $scope.tempData.id = $scope.id;
        $scope.tempData.benefitAmount = $scope.benefitAmount;
        $scope.tempData.abbrName = $scope.abbrName;
        $scope.tempBenefitArray.push($scope.tempData);

        $scope.name = "";
        $scope.id = "";
        $scope.benefitAmount = "";
        $scope.abbrName = "";
    };

    $scope.removeRow = function (index) {
        $scope.tempBenefitArray.splice(index, 1);
    };

}]);
propositions.controller('specofferBenefitsCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {

    $scope.tempSpecofferBenefitArray = [{a:""}];
    $scope.benefitName = "";
    $scope.benefitId = "";
    $scope.benefitAmount = "";
    $scope.benefitNote = "";

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

    var realPath = "";
    var tempPath = 'propositions/specofferBenefits/tempSpecofferBenefitArray.json';
    var path = tempPath;
    $scope.getTempSpecofferBenefitData = function () {
        $http.get(path)
            .success(function (data) {
                //console.log(data);
                //$scope.tempSpecofferBenefitArray = angular.fromJson(data);
                $scope.tempSpecofferBenefitArray = (data);
            })
            .error(function (msg) {
                console.log(msg);
            });
    };
    $scope.getTempSpecofferBenefitData();


    $scope.AddNewSpecofferBenefit = function () {
        $("#addSpecofferBenefitModal").modal("hide");
        $scope.tempData = {};

        $scope.tempData.benefitName = $scope.benefitName;
        $scope.tempData.benefitId = $scope.benefitId;
        $scope.tempData.benefitAmount = $scope.benefitAmount;
        $scope.tempData.benefitNote = $scope.benefitNote;
       if($scope.tempSpecofferBenefitArray[0].a === ""){
           $scope.tempSpecofferBenefitArray.splice(0,1)
       }
        $scope.tempSpecofferBenefitArray.push($scope.tempData);

        $scope.benefitName = "";
        $scope.benefitId = "";
        $scope.benefitAmount = "";
        $scope.benefitNote = "";

    };

    $scope.removeRow = function (index) {
        $scope.tempSpecofferBenefitArray.splice(index, 1);
    };

}]);
/**
 * Created by roman on 04.04.2015.
 */
propositions.controller("ProposalsCTRL", ["$scope", function($scope) {

    $scope.propozTab = 21;

    $scope.selectPropozTab = function(setTab){
        $scope.propozTab = setTab;
    };

    $scope.isPropozTabSelected = function(checkTab){
        return $scope.propozTab === checkTab;
    };
}]);
/**
 * Created by roman on 04.04.2015.
 */
propositions.controller("GeneralViewCTRL", ["$scope", "$http", "$modal", function($scope, $http, $modal) {

    $scope.tempProposalArray = [];
    $scope.specialtyId = "";
    $scope.departmentId = "";
    $scope.timePeroiodId = "";
    $scope.specofferTypeId = "";
    $scope.docSeries = "";
    $scope.docNum = "";
    $scope.parentId = "";
    $scope.eduFormTypeId = "";
    $scope.licCount = "";
    $scope.stateCount = "";
    $scope.timePeriodCourseId = "";
    $scope.begDate = "";
    $scope.endDate = "";

    var tempPath = 'propositions/tempData/tempProposalArray.json';
    var path = tempPath;
    $scope.getTempSubjectData = function () {
        $http.get(path)
            .success(function (data) {
                $scope.tempProposalArray = (data);
            })
            .error(function (msg) {
                console.log(msg);
            });
    };
    $scope.getTempSubjectData();

    // Open addProposal modal window
    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'propositions/generalView/addModal/addModal.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };

    $scope.test = function(index) {
        alert(index);
    };

    $scope.test2 = function(index) {
        $scope.tempVar = index;
    };

    // remove selected row
    $scope.removeRow = function(index) {
        $scope.tempProposalArray.splice(index, 1);
    };

    // highlighted selected row
    $scope.selectedRow = 0;

    $scope.setClickedRow = function (index) {
      $scope.selectedRow = index;
    };

}]);

propositions.controller('subjectsCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {

    $scope.tempSubjectArray = [{a:""}];
    $scope.subjectName = "";
    $scope.specofferId = "";
    $scope.enrolmentSubjectId = "";
    $scope.isMajor = "";
    $scope.alternative = "";
    $scope.mark = "";
    $scope.weightSubject = "";

    $scope.subjects = [
        {name: "Українська мова", id: "1"},
        {name: "Українська література", id: "2"},
        {name: "Іноземна мова", id: "3"},
        {name: "Світова література", id: "4"},
        {name: "Історія України", id: "5"},
        {name: "Всесвітня історія", id: "6"},
        {name: "Правознавство", id: "7"},
        {name: "Художня культура", id: "8"},
        {name: "Математика", id: "9"},
        {name: "Біологія", id: "10"},
        {name: "Географія", id: "11"},
        {name: "Психологія", id: "12"},
        {name: "Фізика", id: "13"},
        {name: "Хімія", id: "14"},
        {name: "Екологія", id: "15"},
        {name: "Інформатика", id: "16"},
        {name: "Творчий конкурс", id: "17"},
        {name: "Фаховий іспит", id: "18"}
    ];

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

    var realPath = "";
    var tempPath = 'propositions/subjects/tempSubjectArray.json';
    var path = tempPath;
    $scope.getTempSubjectData = function () {
        $http.get(path)
            .success(function (data) {
                //console.log(data);
                //$scope.tempSubjectArray = angular.fromJson(data);
                $scope.tempSubjectArray = (data);
            })
            .error(function (msg) {
                console.log(msg);
            });
    };
    $scope.getTempSubjectData();


    $scope.AddNewSubject = function () {
        $("#addSubjectModal").modal("hide");
        $scope.tempData = {};

        console.log($scope.subjectName);

        $scope.tempData.subjectName = $scope.subjectName.name;
        $scope.tempData.specofferId = $scope.specofferId;

        if($scope.isMajor){ $scope.tempData.isMajor = "Так";
        }else{
            $scope.tempData.isMajor = "Ні";
        }

        if($scope.alternative){ $scope.tempData.alternative = "Так";
        }else{
            $scope.tempData.alternative = "Ні";
        }

        $scope.tempData.mark = $scope.mark;
        $scope.tempData.weightSubject = $scope.weightSubject;
        if($scope.tempSubjectArray[0].a === ""){
            $scope.tempSubjectArray.splice(0,1)
        }
        $scope.tempSubjectArray.push($scope.tempData);


        $scope.subjectName = "";
        $scope.specofferId = "";
        $scope.enrolmentSubjectId = "";
        $scope.isMajor = "";
        $scope.alternative = "";
        $scope.mark = "";
        $scope.weightSubject = "";
    };

    $scope.removeRow = function (index) {
        $scope.tempSubjectArray.splice(index, 1);
    };

}]);
/**
 * Created by zigmmund on 05.04.2015.
 */
app.controller("ModalInstanceCtrl", ["$scope", "$http", "$modalInstance", function($scope, $http, $modalInstance) {

    $scope.tempData = {};


    $scope.specialtyId = "";
    $scope.departmentId = "";
    $scope.timePeriodId = "";
    $scope.specofferTypeId = "";
    $scope.docSeries = "";
    $scope.docNum = "";
    $scope.parentId = "";
    $scope.eduFormTypeId = "";
    $scope.licCount = "";
    $scope.stateCount = "";
    $scope.timePeriodCourseId = "";
    $scope.begDate = "";
    $scope.endDate = "";

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.departmens = [
        {name: 'Додати безпосередньо до НЗ'},
        {name: 'Біологічний факультет'},
        {name: 'Географічний факультет'}
    ];

    $scope.forms = [
        {name: 'Денна'},
        {name: 'Заочна'},
        {name: 'Екстернат'},
        {name: 'Вечірня'},
        {name: 'Дистанційна'},
        {name: 'Інтернатура'}
    ];

    $scope.types = [
        {name: 'Бакалавр'},
        {name: 'Магістр'},
        {name: 'Спеціаліст'},
        {name: 'Молодший спеціаліст'}
    ];

    $scope.times = [
        {name: 1},
        {name: 2},
        {name: 3},
        {name: 4},
        {name: 5},
        {name: 6},
        {name: 7}
    ];

    $scope.parents = [
        {name: 'Додаток 1'},
        {name: 'Додаток 2'},
        {name: 'Додаток 3'},
        {name: 'Додаток 4'}
    ];


    $scope.addNewProposal = function () {
        $modalInstance.close();



        $scope.tempData.specialtyId = $scope.specialtyId;
        $scope.tempData.departmentId = $scope.departmentId;
        $scope.tempData.timePeriodId = $scope.timePeriodId;
        $scope.tempData.specofferTypeId = $scope.specofferTypeId;
        $scope.tempData.docSeries = $scope.docSeries;
        $scope.tempData.docNum = $scope.docNum;
        $scope.tempData.parentId = $scope.parentId;
        $scope.tempData.eduFormTypeId = $scope.eduFormTypeId;
        $scope.tempData.licCount = $scope.licCount;
        $scope.tempData.stateCount = $scope.stateCount;
        $scope.tempData.timePeriodCourseId = $scope.timePeriodCourseId;
        $scope.tempData.begDate = $scope.begDate;
        $scope.tempData.endDate = $scope.endDate;

        console.log($scope.tempData);

        $scope.tempProposalArray.push($scope.tempData);

        $scope.specialtyId = "";
        $scope.departmentId = "";
        $scope.timePeriodId = "";
        $scope.specofferTypeId = "";
        $scope.docSeries = "";
        $scope.docNum = "";
        $scope.parentId = "";
        $scope.eduFormTypeId = "";
        $scope.licCount = "";
        $scope.stateCount = "";
        $scope.timePeriodCourseId = "";
        $scope.begDate = "";
        $scope.endDate = "";
    };
}]);
/**
 * Created by Oksana on 06.05.2015.
 */
