
function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok); // encoding string in Base64
    return "Basic " + hash;
}
var BASEURL = "http://104.236.29.16:8080/is-lnu-rest-api/";



$(document).ready(function() {
    var username = "admin";
    var password = "nimda";
    $.ajax
    ({
        type: "GET",
        url: BASEURL + "api/specoffers",
        dataType: 'json',
        async: false,
        data: '{}',
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', make_base_auth(username, password));
        },
        success: function (data){
            console.log(data);
        }
    });
});
