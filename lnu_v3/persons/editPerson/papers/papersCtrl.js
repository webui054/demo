persons.controller('PapersCtrl', ["$scope","PaperDataArray", "$http",'$routeParams', function ($scope, PaperDataArray, $http,$routeParams) {

    $scope.tempPapersArray = [];
    $scope.paperUsageId = "";
    $scope.paperTypeId = "";
    $scope.honorsTypeId = "";
    $scope.docSeries = "";
    $scope.docNum = "";
    $scope.docDate = "";
    $scope.docIssues = "";
    $scope.docPin = "";
    $scope.mark = "";
    $scope.isChecked = "";
    $scope.isForeign = "";
    $scope.papersMapTypes = [];
    var PersonIdPap = parseInt($routeParams.personId,10);

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        $scope.tempPapersArray = [];
        $scope.paperUsageId = "";
        $scope.paperTypeId = "";
        $scope.honorsTypeId = "";
        $scope.docSeries = "";
        $scope.docNum = "";
        $scope.docDate = "";
        $scope.docIssues = "";
        $scope.docPin = "";
        $scope.mark = "";
        $scope.isChecked = "";
        $scope.isForeign = "";

        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

    $scope.addNewPaper = function () {
        $("#addPaperModal").modal("hide");
        $scope.tempData = {};


        $scope.tempData.paperUsageId = $scope.paperUsageId;
        $scope.tempData.paperTypeId = $scope.paperTypeId;
        $scope.tempData.docSeries = $scope.docSeries;
        $scope.tempData.docNum = $scope.docNum;
        $scope.tempData.honorsTypeId =  $scope.honorsTypeId;
        $scope.tempData.docDate = $scope.docDate;
        $scope.tempData.docIssued = $scope.docIssued;
        $scope.tempData.docPin = $scope.docPin;
        $scope.tempData.mark = $scope.mark;
        $scope.tempData.isChecked = $scope.isChecked;
        $scope.tempData.isForeign = $scope.isForeign;
        $scope.tempPapersArray.push($scope.tempData);

        $scope.paperUsageId = "";
        $scope.paperTypeId = "";
        $scope.honorsTypeId = "";
        $scope.docSeries = "";
        $scope.docNum = "";
        $scope.docDate = "";
        $scope.docIssued = "";
        $scope.docPin = "";
        $scope.mark = "";
        $scope.isChecked = "";
        $scope.isForeign = "";
    };


    $scope.papersData = [{
        personId: 118,
        paperTypeId: 1,
        honorsTypeId: 1,
        docSeries: '',
        docNum: 0,
        docDate:'2013-12-12',
        docIssued: '',
        docPin: 0,
        mark: 0,
        isChecked: 0,
        isForeign : 0
    }];

    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    $scope.getUsages = function(){
        PaperDataArray.getPaperById().success(function(data){
            var addEl = paper.getElementById("papsU");
            addEl.addEventListener('change',function(){
                $scope.getTypePapersData($scope.papersData.usageId);
            });
            $scope.papersUsages = data.resources;
        });
    };
    $scope.getUsages();

    $scope.getTypePapersData = function(paperUsageId){
        PaperDataArray.getPaperChildById(paperUsageId).success(function(data){
            $scope.papersTypes = data.resources;
            $scope.isUsageSelected = true;
        });
    };


    $scope.getPersonPapersData = function(){
        PaperDataArray.getPersonPaperById(PersonIdPap).success(function(data){
            if(data.resources.length > 0){
                $scope.papersData = {};

                $scope.papersData = data.resources;};

            console.log($scope.papersData);
        });
    };

    $scope.getPersonPapersData();



    $scope.addPap= function(){
        $('#addPaperModal').modal("hide");
        var sasd = {
            "personId" : PersonIdPap,
            "paperTypeId" : 1,
            "honorsTypeId" : 1,
            "docSeries" : $scope.docSeries,
            "docNum" : ''+ $scope.docNum,
            "docDate" : $scope.docDate,
            "docIssued" : $scope.docIssued,
            "docPin" : ''+$scope.docPin,
            "mark" : 4.7,
            "isChecked" : 1,
            "isForeign" : 0
        };

        PaperDataArray.addNewPaper(PersonIdPap, sasd).then(function(data){
            $scope.getPersonPapersData();
    })
};


}]);