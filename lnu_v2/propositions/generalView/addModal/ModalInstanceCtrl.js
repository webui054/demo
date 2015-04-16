/**
 * Created by zigmmund on 05.04.2015.
 */
app.controller("ModalInstanceCtrl", ["$scope", "$http", "$modalInstance", function($scope, $http, $modalInstance) {

    $scope.tempData = {};


    $scope.specialtyId = "";
    $scope.departmentId = "";
    $scope.timePeriodId = "";
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

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.departmens = [
        {name: 'Додати безпосередньо до НЗ'},
        {name: 'Біологічний факультет'},
        {name: 'Географічний факультет'}
    ];

    $scope.forms = [
        {name: 'Денна'},
        {name: 'Заочна'},
        {name: 'Екстернат'},
        {name: 'Вечірня'},
        {name: 'Дистанційна'},
        {name: 'Інтернатура'}
    ];

    $scope.types = [
        {name: 'Бакалавр'},
        {name: 'Магістр'},
        {name: 'Спеціаліст'},
        {name: 'Молодший спеціаліст'}
    ];

    $scope.times = [
        {name: 1},
        {name: 2},
        {name: 3},
        {name: 4},
        {name: 5},
        {name: 6},
        {name: 7}
    ];

    $scope.parents = [
        {name: 'Додаток 1'},
        {name: 'Додаток 2'},
        {name: 'Додаток 3'},
        {name: 'Додаток 4'}
    ];


    $scope.addNewProposal = function () {
        $modalInstance.close();



        $scope.tempData.specialtyId = $scope.specialtyId;
        $scope.tempData.departmentId = $scope.departmentId;
        $scope.tempData.timePeriodId = $scope.timePeriodId;
        $scope.tempData.specofferTypeId = $scope.specofferTypeId;
        $scope.tempData.docSeries = $scope.docSeries;
        $scope.tempData.docNum = $scope.docNum;
        $scope.tempData.parentId = $scope.parentId;
        $scope.tempData.eduFormTypeId = $scope.eduFormTypeId;
        $scope.tempData.licCount = $scope.licCount;
        $scope.tempData.stateCount = $scope.stateCount;
        $scope.tempData.timePeriodCourseId = $scope.timePeriodCourseId;
        $scope.tempData.begDate = $scope.begDate;
        $scope.tempData.endDate = $scope.endDate;

        console.log($scope.tempData);

        $scope.tempProposalArray.push($scope.tempData);

        $scope.specialtyId = "";
        $scope.departmentId = "";
        $scope.timePeriodId = "";
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
    };
}]);