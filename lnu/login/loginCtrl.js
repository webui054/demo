/**
 * Created by Dmytro on 04.04.2015.
 */
app.controller('LoginCtrl', ["$scope", "$http", "$filter", "$interval",'Authentication', function ($scope, $http, $filter, $interval,Authentication) {

    $scope.userName = "";
    $scope.password = "";
    $scope.token = "";
    $scope.logout = function(){
        $scope.userName = "";
        $scope.password = "";
        $scope.isLoggedIn = false;
        localStorage.setItem("token", "");
        localStorage.setItem("baseAuthString", "");

    };
    $scope.makeToken =function(user, password){
        var tok = user + ':' + password;
        return btoa(tok);
    };
    $scope.makeBaseAuth = function(token) {
        return "Basic " + token;
    };
    var BASEURL = "http://104.236.29.16:8080/is-lnu-rest-api/";
    //
    //$scope.login = function(){
    //    var token = $scope.makeToken($scope.userName,$scope.password);
    //    var baseAuthString = $scope.makeBaseAuth(token);
    //    $http.defaults.headers.common.Authorization = baseAuthString; // задаємо хедер запиту по замовчуванню для всіх типів крім POST і PUT
    //    $http.get(BASEURL + "api/persons?limit=1")
    //        .success(function (data) {
    //        $scope.$parent.isLoggedIn = true;
    //        localStorage.setItem("token", token);
    //        localStorage.setItem("baseAuthString", baseAuthString)})
    //        .error(function (){
    //        });
    //};

    $scope.login = function(){
        Authentication.setUser($scope.userName);
        $scope.$parent.isLoggedIn = true;
    };



}]);