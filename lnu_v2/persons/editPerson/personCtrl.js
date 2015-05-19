persons.controller("AddPersonCtrl",["$scope","PersonRepo",'$routeParams', function($scope,PersonRepo,$routeParams){
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