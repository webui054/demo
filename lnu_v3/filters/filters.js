app.filter('checkYesNo',function() {
    return function(input) {
        if(typeof input === "Number"){
            input = input !== 0;
        }
        return input ? 'Так' : 'Ні';
    };
});