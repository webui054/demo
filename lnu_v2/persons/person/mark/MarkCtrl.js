persons.controller('MarkCtrl', ["$scope", "$http","PersonDataMappingArray", function($scope,$http,PersonDataMappingArray){
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
    };

    $scope.AddNewMan = function () {
        $("#addManModal").modal("hide");
        $scope.tempManData = {};

        $scope.tempManData.personPaperId = $scope.personPaperId;
        $scope.tempManData.publicActivityAwardId = $scope.publicActivityAwardId;
        $scope.tempManData.bonus = $scope.bonus;
        $scope.tempMarkArray.push($scope.tempManData);
    };

    $scope.markData = {
        personPaperId: [],
        enrolmentSubjectId: [],
        mark: {},
        publicActivityAwardId: [],
        bonus: {}
    };

    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    $scope.getActivity = function(){
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

        $scope.getPersonPaper = function(){
        PersonDataMappingArray.getMappedArray('persons/person/general/citizenCountry.json').then(function(data){
            $scope.personDataArrFOrGeneralView.citizenCountries = data;
        });
    };
    $scope.getMarriedTypes = function(){
        PersonDataMappingArray.getMappedArray('persons/person/general/marriedTypes.json').then(function(data){
            $scope.personDataArrFOrGeneralView.marriedTypes = data;
        });
    };
    $scope.getPersonTypes = function(){
        PersonDataMappingArray.getMappedArray('persons/person/general/personsTypeId.json').then(function(data){
            $scope.personDataArrFOrGeneralView.personTypes = data;
        });
    };

    $scope.getGenderTypes();
    $scope.getPersonTypes();
    $scope.getCitizenCountries();
    $scope.getMarriedTypes();
}]);