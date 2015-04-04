/**
 * Created by Dmytro on 04.04.2015.
 */
app.controller('LoginCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {

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
    $scope.make_base_auth = function(token) {
        return "Basic " + token;
    };
    $scope.BASEURL = "http://104.236.29.16:8080/is-lnu-rest-api/";

    //$scope.login = function(){
    //    if($scope.userName === ""){
    //        $('#userGroup').addClass('has-error');
    //        return;
    //    }
    //    if( $scope.password === ""){
    //        $('#pwrGroup').addClass('has-error');
    //        return;
    //    }
    //    var token = $scope.makeToken($scope.username,$scope.password);
    //    var baseAuthString = $scope.make_base_auth(token);
    //    $.ajax
    //    ({
    //        type: "GET",
    //        url: $scope.BASEURL + "api/specialties/" + 88,
    //        dataType: 'json',
    //        async: false,
    //        data: '{}',
    //        beforeSend: function (xhr){
    //            xhr.setRequestHeader('Authorization', baseAuthString);
    //        },
    //        success: function (data){
    //            $scope.parent.isLoggedIn = true;
    //            localStorage.setItem("token", token);
    //            localStorage.setItem("baseAuthString", baseAuthString);
    //        },error: function(){
    //            $('#userGroup').addClass('has-error');
    //            $('#pwrGroup').addClass('has-error');
    //        }
    //    });
    //};
    $scope.login = function(){
        $scope.$parent.isLoggedIn = true;
    };



}]);/**
 * Created by student on 26.03.2015.
 */
