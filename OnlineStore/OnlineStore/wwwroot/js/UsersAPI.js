//function UsersAPI() {
//    var doAsyncPost = function (data) {
//        server_address = 'http://localhost:63671/api/User/Register';
//        return $.ajax({
//            url: server_address,
//            type: "POST",
//            dataType: 'text',
//            contentType: "application/json",
//            data: data,
//            success: function (result) {
//                console.log("Success");
//            },
//            error: function (xhr, resp, text) {
//                console.log("Failure");
//            }
//        });
//    }

//    this.makePostRequest = function (data) {
//        return doAsyncPost(data);
//    }

//    UsersAPI.instance = this;
//}



//$(document).ready(function () {
//    (function ($) {
//        $.fn.serializeFormJSON = function () {

//            var o = {};
//            var a = this.serializeArray();
//            $.each(a, function () {
//                if (o[this.name]) {
//                    if (!o[this.name].push) {
//                        o[this.name] = [o[this.name]];
//                    }
//                    o[this.name].push(this.value || '');
//                } else {
//                    o[this.name] = this.value || '';
//                }
//            });
//            return o;
//        };
//    })(jQuery);

//    $("#registerButton").on('click', function () {
//        var obj = $("#registerForm").serializeFormJSON();

//        var jsonString = JSON.stringify(obj);

//        var usersAPI = new UsersAPI();

//        var result = usersAPI.makePostRequest(jsonString);
//        result.done(
//            function (response) {
//                console.log(response)
//            }
//        );
//    });
//});
function Register() {
    var obj = JSON.stringify($('#registerForm').serializeArray());
    obj = JSON.parse(obj);

    $.ajax({
        type: "POST",
        url: 'http://localhost:63671/api/User/Register',
        dataType: "text",
        contentType: "application/json",
        data: JSON.stringify({ userToRegister: obj }),

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

