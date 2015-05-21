/**
 * Created by Oksana on 05.05.2015.
 */
persons.factory("PaperDataArray", ["$q", "$http", function ($q, $http) {
    var paper = [];
    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    var factory = {};

    var pushData = function (data) {
        paper = data;
    };
    factory.pushPaper = function (data) {
        return pushData(data);
    };
    factory.popPaper = function () {
        return paper;
    };

    factory.getPaperById = function () {
        return $http.get(baseUrl + "api/papers/usages").success(function (data) {
            return data;
        }).error(function (msg) {
        });
    };
    factory.getPersonPaperById = function (personId) {
        return $http.get(baseUrl + "api/persons/" + personId + "/papers").success(function (data) {
            return data;
        }).error(function (msg) {
        });
    };

    factory.getPaperChildById = function (paperUsageId) {
        return $http.get(baseUrl + "api/papers/types?paperUsageId=" + paperUsageId).success(function (data) {
            return data;
        }).error(function (msg) {
        });
    };

    factory.addNewPaper = function (personId, paper) {
        var tempPaper = paperValidator(paper);
        return $http.post(baseUrl + "api/persons/" + personId + "/papers", tempPaper).success(function (data) {
            return data;
        }).error(function (msg) {
            return msg;
        });

    };

    factory.getHonorById = function () {
        return $http.get(baseUrl + "api/honors/types").success(function (data) {
            return data;
        }).error(function (msg) {
        });
    };

    var paperValidator = function (paper) {
        if (paper.isChecked === undefined) {
            paper.isChecked = 0;
        }
        if (paper.isForeign === undefined) {
            paper.isForeign = 0;
        }
        return paper;
    };

    factory.deletePaper = function (personId) {
        return $http.delete(baseUrl + "api/persons/" + personId + "/papers");
    };

    return factory;

}]);