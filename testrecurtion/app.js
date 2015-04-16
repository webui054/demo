var main = angular.module('main', []);
main.controller('Main',['$scope','$http', function($scope,$http){
    $scope.dataArr= [];

    $scope.makeToken =function(){
        var tok = 'admin:nimda';
        return btoa(tok);
    };
    $scope.makeBaseAuth = function(token) {
        return "Basic " + token;
    };
    var BASEURL = "http://104.236.29.16:8080/is-lnu-rest-api/";
    //

    var getData = function(offset){
        return $http.get(BASEURL + "api/persons?limit=5&offset="+ offset)
                .success(function (data) {
                    angular.forEach(data.resources,function(elem){
                        $scope.dataArr.push(elem);
                    });
                    if($scope.dataArr.length < data.count){
                        offset += 5;
                        getData(offset);
                    }
                })
                .error(function (){
                });
    };

    $scope.login = function(){
        var token = $scope.makeToken();
        var baseAuthString = $scope.makeBaseAuth(token);
        $http.defaults.headers.common['Authorization'] = baseAuthString;
        getData(0);

    };
    $scope.login();

}]);