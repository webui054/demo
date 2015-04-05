app.factory("PersonRepo",[function(){
    var person = {};

    var factory = {};

    var pushData = function(data){
        person = {};
        person = data;
    };
    factory.pushPerson = function(data){
        return pushData(data);
    };
    factory.popPerson =function(){
      return person;
    };

    return factory;

}]);/**
 * Created by Dmytro on 04.04.2015.
 */
