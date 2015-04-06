/**
 * Created by roman on 04.04.2015.
 */
app.controller("GeneralViewCTRL", ["$scope", "$http", "$modal", function($scope, $http, $modal) {

    $scope.tempProposalArray = [];
    $scope.specialtyId = "";
    $scope.specialtyName = "";
    $scope.departmentId = "";
    $scope.timePeroiodId = "";
    $scope.specofferTypeId = "";
    $scope.eduFormTypeId = "";
    $scope.licCount = "";
    $scope.stateCount = "";
    $scope.begDate = "";

    var tempPath = 'Content/Temp/tempProposalArray.json';
    var path = tempPath;
    $scope.getTempSubjectData = function () {
        $http.get(path)
            .success(function (data) {
                //console.log(data);
                $scope.tempProposalArray = angular.fromJson(data);
                $scope.tempProposalArray = (data);
            })
            .error(function (msg) {
                console.log(msg);
            });
    };
    $scope.getTempSubjectData();

   /* $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

    $scope.addNewProposal = function() {
        $("#addProposalModal").modal("hide");
        $scope.tempData = {};

    };*/

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
    }

}]);
