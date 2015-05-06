persons.controller('DocumentsCtrl', ["$scope","DocumentDataArray", "$http",'$routeParams', function ($scope, DocumentDataArray, $http,$routeParams) {

    $scope.tempDocumentsArray = [];
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
    $scope.documentsMapTypes = [];
    var PersonIdDoc = parseInt($routeParams.personId,10);

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        $scope.tempDocumentsArray = [];
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

    $scope.AddNewDocument = function () {
        $("#addDocumentModal").modal("hide");
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
        $scope.tempDocumentsArray.push($scope.tempData);

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


    $scope.documentsData = [{
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
        DocumentDataArray.getDocumentById().success(function(data){
            var addEl = document.getElementById("docsU");
            addEl.addEventListener('change',function(){
                $scope.getTypeDocumentsData($scope.documentsData.usageId);
            });
            $scope.documentsUsages = data.resources;
        });
    };
    $scope.getUsages();

    $scope.getTypeDocumentsData = function(paperUsageId){
        DocumentDataArray.getDocumentChildById(paperUsageId).success(function(data){
            $scope.documentsTypes = data.resources;
            $scope.isUsageSelected = true;
        });
    };


    $scope.getPersonDocumentsData = function(){
        DocumentDataArray.getPersonDocumentById(PersonIdDoc).success(function(data){
            if(data.resources.length > 0){
                $scope.documentsData = {};

                $scope.documentsData = data.resources;};

            console.log($scope.documentsData);
        });
    };

    $scope.getPersonDocumentsData();



    $scope.addDoc= function(){
        $('#addDocumentModal').modal("hide");
        var sasd = {
            "personId" : PersonIdDoc,
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

        DocumentDataArray.addNewDocument(PersonIdDoc, sasd).then(function(data){
            $scope.getPersonDocumentsData();
    })
};


}]);