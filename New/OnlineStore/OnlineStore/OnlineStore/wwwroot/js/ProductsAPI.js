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

function makeTextPostRequest(text, server_address) {
    return $.ajax({
        type: "POST",
        url: server_address,
        contentType: "application/json",
        data: JSON.stringify(text),

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

function OpenEditModal(productId) {
    $('editProductId').val(productId)

    document.getElementById('edit-product').style.display = 'block'
}

function EditProduct() {
    var obj = JSON.stringify($('#editProductForm').serializeArray());
    obj = JSON.parse(obj);

    server_address = 'https://localhost:44350/api/Products/Edit';
    var result = makePostRequest(obj, server_address);
    result.done(
        function (response) {
            if (response == "Success") {
                document.getElementById('edit-product').style.display = "none";
            }
            else {
                alert(response);
            }
        }
    );
}

$(document).ready(function () {
    $('.dlt-product').click(function () {
        {
            var productId = $(this).closest('tr').find('td:nth-child(1)').text();
            server_address = 'https://localhost:44350/api/Products/Delete';

            result = makeTextPostRequest(productId, server_address);
            result.done(
                function (response) {
                    if (response == "Success") {
                        window.location.reload();
                    }
                    else {
                        alert("Encountered Error");
                    }
                }
            );
        }
    });
});



