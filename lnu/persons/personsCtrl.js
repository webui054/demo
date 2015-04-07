app.controller("PersonsCTRL",["$scope","PersonRepo","$http", function($scope,PersonRepo,$http){

    $scope.personTab = 1;

    //$scope.tempPerson2 = { personTypeId:2,name:"Кузнєцов Дмитро Олександрович",
    //    firstName:"Дмитро",fatherName:"Олександрович",surname:"Кузнєцов",
    //    photo:"https://pp.vk.me/c624720/v624720023/23f17/GNsK1ptfXKc.jpg",
    //    //photo:"http://upload.wikimedia.org/wikipedia/en/e/e7/Somebody_talked.jpg",
    //    genderTypeId:1,marriedTypeId:2,citizenCountryId:0,docSeries:"FD",
    //    docNum:"123456",identifier:0,resident:1,
    //    birthPlace:"Україна, м.Івано-Франківськ",
    //    begDate:"14.12.1985р",isMilitary:0,isHotel:2,parentId:123};
    $scope.tempPerson2 = {};

    $scope.tempPerson = {};

    $scope.getDataFormRepo = function(){
        $scope.tempPerson = PersonRepo.popPerson();
    };

    $scope.selectPersonTab = function(setTab){
        $scope.tempPerson2 = PersonRepo.popPerson();
        $scope.personTab = setTab;
    };
    $scope.isPersonTabSelected = function(checkTab){
        return $scope.personTab === checkTab;
    };

    $scope.backToTheTable = function(){
        $scope.personTab = 1;
        $scope.$parent.isShowGeneralInfo = false;
    };
}]);/**
 * Created by Dmytro on 04.04.2015.
 */
