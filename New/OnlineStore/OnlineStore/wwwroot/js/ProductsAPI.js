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

function makeGetRequest(server_address) {
    var authorityToken = "";
    return $.ajax({
        type: 'GET',
        url: server_address,
        headers: {
            'Authorization': 'Bearer ' + authorityToken
        },

    });
}

function AddProduct() {
    var obj = JSON.stringify($('#addProductForm').serializeArray());
    obj = JSON.parse(obj);

    server_address = 'https://localhost:44350/api/Products/AddProduct';
    var result = makePostRequest(obj, server_address);
    result.done(
        function (response) {
            if (response == "Success")
            {
                document.getElementById('add-product').style.display = "none";
            }
            else
            {
                alert(response);
            }
        }
    );

}

function GetProductListEntry(productId, productName, productPrice, productQuantity) {
    return '<tr>< td >' + productId + '</td ><td>' + productName + '</td><td> $' + productPrice + '</td><td>' + productQuantity + '</td > <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p></td> <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr > ';
}

//window.onload = function GetAndDisplayAdminProducts() {
    //server_address = 'https://localhost:44350/api/Products/GetProducts';
    //var result = makeGetRequest(server_address);
    //result.done(
    //    function (response) {
    //        $('#productList').html = "";
    //        for (var i = 0; i < response.length; i++) {
    //            $('#productList').append(GetProductListEntry(response[i].id, response[i].name, response[i].price, response[i].quantity));
    //            var x = 3;
    //        }
    //    }
    //);
}


