propositions.controller('subjectsCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {

    $scope.tempSubjectArray = [{a:""}];
    $scope.subjectName = "";
    $scope.specofferId = "";
    $scope.enrolmentSubjectId = "";
    $scope.isMajor = "";
    $scope.alternative = "";
    $scope.mark = "";
    $scope.weightSubject = "";

    $scope.subjects = [
        {name: "Українська мова", id: "1"},
        {name: "Українська література", id: "2"},
        {name: "Іноземна мова", id: "3"},
        {name: "Світова література", id: "4"},
        {name: "Історія України", id: "5"},
        {name: "Всесвітня історія", id: "6"},
        {name: "Правознавство", id: "7"},
        {name: "Художня культура", id: "8"},
        {name: "Математика", id: "9"},
        {name: "Біологія", id: "10"},
        {name: "Географія", id: "11"},
        {name: "Психологія", id: "12"},
        {name: "Фізика", id: "13"},
        {name: "Хімія", id: "14"},
        {name: "Екологія", id: "15"},
        {name: "Інформатика", id: "16"},
        {name: "Творчий конкурс", id: "17"},
        {name: "Фаховий іспит", id: "18"}
    ];

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

    var realPath = "";
    var tempPath = 'propositions/subjects/tempSubjectArray.json';
    var path = tempPath;
    $scope.getTempSubjectData = function () {
        $http.get(path)
            .success(function (data) {
                //console.log(data);
                //$scope.tempSubjectArray = angular.fromJson(data);
                $scope.tempSubjectArray = (data);
            })
            .error(function (msg) {
                console.log(msg);
            });
    };
    $scope.getTempSubjectData();


    $scope.AddNewSubject = function () {
        $("#addSubjectModal").modal("hide");
        $scope.tempData = {};

        console.log($scope.subjectName);

        $scope.tempData.subjectName = $scope.subjectName.name;
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
    };

    $scope.removeRow = function (index) {
        $scope.tempSubjectArray.splice(index, 1);
    };

}]);