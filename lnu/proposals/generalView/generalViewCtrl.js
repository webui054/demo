/**
 * Created by roman on 04.04.2015.
 */
app.controller("GeneralViewCTRL", ["$scope", "$http", "$modal", function($scope, $http, $modal) {

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

    var tempPath = 'Content/Temp/tempProposalArray.json';
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
            templateUrl: 'proposals/generalView/addModal/addModal.html',
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
