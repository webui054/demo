app.factory('Authentication2', function(){
    var factory = {};
    var user;

    factory.setUser = function(aUser){
        user = aUser;
    };
    factory.isLoggedIn3 =function(){
        return(user)? user : false;
    };

    return factory;
});
