app.controller('LayoutCtrl', ["$scope",
    function ($scope) {

        $scope.tab = 1;

        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
        };
        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };

        $scope.brand = 'ЛНУ';
        $scope.personViewModel = 'Персони';
        $scope.propositionViewModel = 'Пропозиції';
        $scope.benefitsViewModel = 'Пільги';
    }]);