app.factory("Validator",[function(){

    var factory = {};

    factory.numericValidator = function(e){
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)
            && (e.keyCode !== 8)) {
            e.preventDefault();
        }
    };

    factory.ukrValidator = function(e){
        var isNotUkrKeyPress =  (e.keyCode < 1025 || e.keyCode > 1097);
        if(e.keyCode !== 39 || $scope.one){
            if ((isNotUkrKeyPress) || (e.keyCode === 8)) {
                if(e.keyCode !== 1100){
                    if (e.keyCode < 1102 || e.keyCode > 1104) {
                        if (e.keyCode < 1106 || e.keyCode > 1111) {
                            e.preventDefault();
                        }
                    }
                }
            }
        }
    };

    return factory;
}]);/**
 * Created by Dmytro on 19.05.2015.
 */
