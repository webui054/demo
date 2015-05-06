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