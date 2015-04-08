app.controller('subjectsCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {

    $scope.tempSubjectArray = [{a:""}];
    $scope.subjectName = "";
    $scope.specofferId = "";
    $scope.enrolmentSubjectId = "";
    $scope.isMajor = "";
    $scope.alternative = "";
    $scope.mark = "";
    $scope.weightSubject = "";

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };


    $scope.AddNewSubject = function () {
        $("#addSubjectModal").modal("hide");
        $scope.tempData = {};

        $scope.tempData.subjectName = $scope.subjectName;
        $scope.tempData.enrolmentSubjectId = $scope.enrolmentSubjectId;
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


    }
}]);