var main = angular.module('main', ['ui.bootstrap']);
main.controller('Main', ['$scope', '$http', function ($scope, $http) {
    $scope.dataArr = [];

    $scope.makeToken = function () {
        var tok = 'admin:nimda';
        return btoa(tok);
    };
    $scope.makeBaseAuth = function (token) {
        return "Basic " + token;
    };
    var BASEURL = "http://104.236.29.16:8080/is-lnu-rest-api/";
    //
var  name = "";
    $scope.getDataByName = function(name){
        $scope.dataArr =[];
        getData(0,'name-asc',name);
    };

    var getData = function(offset,orderByKey,name){

        return $http.get(BASEURL + "api/papers/types")
                .success(function (data) {
                    angular.forEach(data.resources,function(elem){
                        $scope.dataArr.push(elem);
                    });
                    if($scope.dataArr.length < data.count){
                        offset += 5;
                        getData(offset,orderByKey,name);
                    }
                })
                .error(function (){
                });
    };
    $scope.getZnoData = function(personId){

        return $http.get(BASEURL + "api/papers/types")
            .success(function (data) {

            })
            .error(function (){
            });
    };

    $scope.login = function(){
        var token = $scope.makeToken();
        var baseAuthString = $scope.makeBaseAuth(token);
        $http.defaults.headers.common['Authorization'] = baseAuthString;
        getData(0,'','');

    };
    $scope.login();

    $scope.addPerson = function(){
        var url = BASEURL+"api/persons/";

        var data = {
            personTypeId: 1,
            citizenCountryId: 1,
            genderTypeId: 2,
            marriedTypeId: 2,
            begDate: "2014-01-01",
            endDate: "2015-01-01",
            firstName: "Дмитро",
            surname: "Кузнєцов",
            fatherName: "Олександрович",
            name: "Кузнєцов" + " " + "Дмитро" + " " + "Олександрович",
                identifier: "12345",
            isHostel: 0,
            isMilitary: 0,
            resident: 0,
            photo: "",
            birthPlace: "Україна, м.Івано-Франківськ",
            docNum: "123456",
            docSeries: "СЕ"
        };

        $http.post(url, data).success(function (data) {
            $scope.dataArr.push(data);
            console.log(data)
        })
    };
    $scope.deletePerson = function () {
        var url = BASEURL + "api/persons2/" + 12;

        $http.delete(url).success(function (data) {

            console.log(data)
        }).error(function (err) {
            console.log(err);
        })
    };
    $scope.updatePerson = function () {
        var data = {
            personTypeId: 1,
            citizenCountryId: 1,
            genderTypeId: 2,
            marriedTypeId: 2,
            begDate: "2014-01-01",
            endDate: "2015-01-01",
            firstName: "Дмитро",
            surname: "Кузнєцов",
            fatherName: "Олександрович",
            name: "Кузнєцов" + " " + "Дмитро" + " " + "Олександрович",
            //identifier: "12345",
            isHostel: 1,
            isMilitary: 1,
            resident: 1,
            photo: "",
            birthPlace: "Україна, м.Івано-Франківськ",
            docNum: "123456",
            docSeries: "СЕ"
        };
        var url = BASEURL + "api/persons/" + 13;

        $http.put(url, data).success(function (data) {

            console.log(data)
        })
    };


    $scope.today = function() {
        var date = new Date();
        $scope.dt = date.getDate()+'-0'+(date.getMonth()+1)+ '-' + date.getFullYear();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

}]);