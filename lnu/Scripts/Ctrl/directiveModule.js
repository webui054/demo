var app = angular.module('directiveModule', []);
app.directive('homeContent', function() {
    return {
        templateUrl: 'View/homeView.html'
    };
});
app.directive('documentContent', function() {
    return {
        templateUrl: 'View/documentView.html'
    };
});
app.directive('peerReviewContent', function() {
    return {
        templateUrl: 'View/peerReviewView.html'
    };
});
app.directive('auctionsContent', function() {
    return {
        templateUrl: 'View/auctionsView.html'
    };
});
app.directive('contactsContent', function() {
    return {
        templateUrl: 'View/contactsView.html'
    };
});
app.directive('partnersContent', function() {
    return {
        templateUrl: 'View/partnersView.html'
    };
});
app.directive('lawDataContent', function() {
    return {
        templateUrl: 'View/DocView/lawDataView.html'
    };
});
app.directive('stockTradesContent', function() {
    return {
        templateUrl: 'View/DocView/stockTradesView.html'
    };
});
app.directive('listOfDocumentsContent', function() {
    return {
        templateUrl: 'View/DocView/listOfDocumentsView.html'
    };
});

app.controller("DocCTRL",["$scope", function($scope){
    $scope.doctab = 21;

    $scope.selectDocTab = function(setTab){
        $scope.doctab = setTab;
    };
    $scope.isDocTabSelected = function(checkTab){
        return $scope.doctab === checkTab;
    };
    $scope.auctab = 31;

    $scope.selectAucTab = function(setTab){
        $scope.auctab = setTab;
    };
    $scope.isAucTabSelected = function(checkTab){
        return $scope.auctab === checkTab;
    };
}]);