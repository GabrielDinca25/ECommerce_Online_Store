function makePostRequest(obj, server_address) {
    return $.ajax({
        type: "POST",
        url: server_address,
        dataType: "text",
        contentType: "application/json",
        data: JSON.stringify(obj),

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Register() {
    var obj = JSON.stringify($('#registerForm').serializeArray());
    obj = JSON.parse(obj);

    var validInput = true;
    if (obj[0]["value"] != obj[1]["value"]) {
        alert("Email and confirmed email do not match");

        validInput = false;
    }

    if (obj[2]["value"] != obj[3]["value"]) {
        alert("Password and confirmed password do not match");

        validInput = false;
    }

    if (validInput) {
        server_address = 'http://localhost:63671/api/Prodicts/Register';
        var result = makePostRequest(obj, server_address);
        result.done(
            function (response) {
                if (response == "Success")
                {
                    document.getElementById('registerModal').style.display = "none";
                    document.getElementById('loginModal').style.display = "block";
                    alert("Account successfully created, you can now log in!");

                }
                else
                {
                    alert(response);
                }
            }
        );
    }
}

function Login() {
    var obj = JSON.stringify($('#loginForm').serializeArray());
    obj = JSON.parse(obj);

    server_address = 'http://localhost:63671/api/User/Login';

    result = makePostRequest(obj, server_address);
    result.done(
        function (response) {
            if (response.startsWith("Failure")) {
                alert(response);
            }   
            else {
                document.getElementById('loginModal').style.display = "none";
                document.getElementById('loginButton').style.display = "none";
                document.getElementById('registerButton').style.display = "none";
                document.getElementById('loggedinUser').style.display = "block";
                $('#loggedinUser').html("Logged in as: " + response);
                alert("Sucessfully logged in");
        
            }
        }
    );
}

