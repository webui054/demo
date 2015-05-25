persons.factory("MarkDataArray", ["$q", "$http", function ($q, $http) {
    var zno = [];
    var man = [];
    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    var factory = {};

    var pushZnoData = function (data) {
        zno = data;
    };
    factory.pushZno = function (data) {
        return pushZnoData(data);
    };
    factory.popZno = function () {
        return zno;
    };

    var pushManData = function (data) {
        man = data;
    };
    factory.pushMan = function (data) {
        return pushManData(data);
    };
    factory.popMan = function () {
        return man;
    };


    // Getting data

    factory.getPaperById = function (personId) {
        return $http.get(baseUrl + "/api/persons/" + personId + "/papers").success(function (data) {
            return data;
        }).error(function (msg) {
        });
    };

    factory.getSubjectById = function () {
        return $http.get(baseUrl + "/api/enrolments/subjects").success(function (data) {
            return data;
        }).error(function (msg) {
        });
    };

    factory.getAwardById = function () {
        return $http.get(baseUrl + "/api/publicActivities/awards").success(function (data) {
            return data;
        }).error(function (msg) {
        });
    };
    factory.getZnoData = function (personId) {
        return $http.get(baseUrl + "api/persons/" + personId + "/enrolments/subjects")
            .success(function (data) {
                return data;
            }).error(function (msg) {

            });
    };

    factory.getManData = function (personId) {
        return $http.get(baseUrl + "api/persons/" + personId + "/awards")
            .success(function (data) {
                return data;
            }).error(function (msg) {

            });
    };
    // Posting data

    factory.addNewZno = function (personId, zno) {
        var tempZno = znoValidator(zno);
        return $http.post(baseUrl + "api/persons/" + personId + "/enrolments/subjects", tempZno).success(function (data) {
            return data;
        }).error(function (msg) {
            return msg;
        });

    };

    factory.addNewMan = function (personId, man) {
        var tempMan = manValidator(man);
        return $http.post(baseUrl + "api/persons/" + personId + "/awards", tempMan).success(function (data) {
            return data;
        }).error(function (msg) {
            return msg;
        });

    };

    var znoValidator = function (zno) {
        if (zno.isChecked === undefined) {
            zno.isChecked = 0;
        }
        if (zno.isForeign === undefined) {
            zno.isForeign = 0;
        }
        return zno;
    };

    var manValidator = function (man) {
        if (man.isChecked === undefined) {
            man.isChecked = 0;
        }
        if (man.isForeign === undefined) {
            man.isForeign = 0;
        }
        return man;
    };


    // Deleting data
    factory.deleteZno = function (personId) {
        return $http.delete(baseUrl + "api/persons/" + personId + "/enrolmentsubjects");
    };

    factory.deleteMan = function (personId) {
        return $http.delete(baseUrl + "api/persons/" + personId + "/awards");
    };

    return factory;

}]);