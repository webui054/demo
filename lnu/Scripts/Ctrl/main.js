/**
 * Created by Dmytro on 16.03.2015.
 */

var app = angular.module('LnuApp', ['directiveModule']);

app.controller('MainCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {
    //login logic
    $scope.isLoggedIn = false;
    $scope.userName = "";
    $scope.password = "";
    $scope.logout = function(){
        $scope.userName = "";
        $scope.password = "";
        $("input[name='password']").val("");
        $scope.isLoggedIn = false;
        localStorage.setItem("login", "");
        localStorage.setItem("password", "");

    };

    $scope.make_base_auth = function(user, password) {
        var tok = user + ':' + password;
        var hash = btoa(tok); // encoding string in Base64
        return "Basic " + hash;
    };
    $scope.BASEURL = "http://104.236.29.16:8080/is-lnu-rest-api/";

    $scope.login = function(){
        if($scope.userName === ""){
            $('#userGroup').addClass('has-error');
            $('#errMsg').append('Введіть Ім\'я');
            return;
        }
        var password= $("input[name='password']").val();
        if(password === ""){
            $('#pwrGroup').addClass('has-error');
            $('#errMsg').append('Введіть пароль');
            return;
        }

        $.ajax
        ({
            type: "GET",
            url: $scope.BASEURL + "api/specialties/" + 88,
            dataType: 'json',
            async: false,
            data: '{}',
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', $scope.make_base_auth( $scope.userName,  password));
            },
            success: function (data){
                $scope.isLoggedIn = true;
                localStorage.setItem("login", $scope.userName);
                localStorage.setItem("password", password);
            },error: function(){
                $('#userGroup').addClass('has-error');
                $('#pwrGroup').addClass('has-error');
                $('#errMsg').append('Somethings wrong!!');
            }
        });
    };
    $('#usr').on('click', function(){
        $('#errMsg').text('');
    });



    $scope.tab = 1;

    $scope.selectTab = function(setTab){
        $scope.tab = setTab;
    };
    $scope.isSelected = function(checkTab){
        return $scope.tab === checkTab;
    };

    $scope.brand = 'LNU';
    $scope.personViewModel = 'Персони';
    $scope.propositionViewModel='Пропозиції';

    // UI

    $('#testModal').on('shown.bs.modal', function () {

    });

    $('#testModal').on('hidden.bs.modal', function () {

    });

    $scope.showModal = function(id) {
        if (id === null) {
            return;
        }
        setTimeout(function() {
            $(id).modal('show');
        }, 500);
    };
}]);




