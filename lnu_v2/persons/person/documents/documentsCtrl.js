persons.controller('DocumentsCtrl', ["$scope","DocumentDataArray", "$http",'$routeParams', function ($scope, DocumentDataArray, $http,$routeParams) {

    $scope.tempDocumentsArray = [];
    $scope.paperUsageId = "";
    $scope.paperTypeId = "";
    $scope.docSeries = "";
    $scope.docNum = "";
    $scope.docDate = "";
    $scope.docIssues = "";
    $scope.docPin = "";
    $scope.marl = "";
    $scope.isChecked = "";
    $scope.isForeign = "";

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

    $scope.AddNewDocument = function () {
        $("#addDocumentModal").modal("hide");
        $scope.tempData = {};


        $scope.tempData.paperUsageId = $scope.paperUsageId;
        $scope.tempData.paperTypeId = $scope.paperTypeId;
        $scope.tempData.docSeries = $scope.docSeries;
        $scope.tempData.docNum = $scope.docNum;
        $scope.tempData.docDate = $scope.docDate;
        $scope.tempData.docIssues = $scope.docIssues;
        $scope.tempData.docPin = $scope.docPin;
        $scope.tempData.marl = $scope.marl;
        $scope.tempData.isChecked = $scope.isChecked;
        $scope.tempData.isForeign = $scope.isForeign;
        $scope.tempDocumentsArray.push($scope.tempData);

        $scope.paperUsageId = "";
        $scope.paperTypeId = "";
        $scope.docSeries = "";
        $scope.docNum = "";
        $scope.docDate = "";
        $scope.docIssues = "";
        $scope.docPin = "";
        $scope.marl = "";
        $scope.isChecked = "";
        $scope.isForeign = "";
    };


    $scope.documentsData = {
        usages:[],
        types:[],
        usageId: {},
        typeId: {},
        series:{},
        num:{},
        date:{},
        issues:{},
        pin:{},
        mark: {},
        isChecked: true,
        isForeign : true
    };

    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    $scope.getUsages = function(){
        DocumentDataArray.getDocumentById().success(function(data){
            var addEl = document.getElementById("docsU");
            addEl.addEventListener('change',function(){
                $scope.getTypeDocumentsData($scope.documentsData.usageId);
            });
            $scope.documentsData.usages = data.resources;
        });
    };
    $scope.getUsages();

    $scope.getTypeDocumentsData = function(paperUsageId){
        DocumentDataArray.getDocumentChildById(paperUsageId).success(function(data){
            $scope.documentsData.types = data.resources;
            $scope.isUsageSelected = true;
        });
    };

    $scope.getTypeDocumentsData();

    $scope.addDoc= function(){
    DocumentDataArray.addNewDocument(parseInt($routeParams.personId,10),$scope.documentsData).then(function(data){
        $scope.documentsData = data;
    })
};


}]);