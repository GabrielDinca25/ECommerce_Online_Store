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
    server_address = 'https://localhost:44390/api/Products/AddProduct';
    var result = makePostRequest(obj, server_address);
    result.done(
        function (response) {
            if (response == "Success")
            {
                document.getElementById('add-product').style.display = "none";
                location.reload(); 
            }
            else
            {
                alert(response);
            }
        }
    );
}

function OpenEditModal() {
    var productId = $(this).closest('tr').find('td:nth-child(1)').text();

    $('editProductId').val(productId)

    document.getElementById('edit-product').style.display = 'block'
}

function EditProduct() {
    var obj = JSON.stringify($('#editProductForm').serializeArray());
    obj = JSON.parse(obj);

    server_address = 'https://localhost:44390/api/Products/Edit';
    var result = makePostRequest(obj, server_address);
    result.done(
        function (response) {
            if (response == "Success") {
                document.getElementById('edit-product').style.display = "none";
                location.reload(); 
            }
            else {
                alert(response);
            }
        }
    );
}

function SearchProducts() {
    document.getElementById('clearSearch').style.display = 'block';
    var searchTerm = document.getElementById("homeSearchBar").value;
    server_address = 'https://localhost:44390/api/Home/DisplaySearchResults';

    result = makeTextPostRequest(searchTerm, server_address);
    result.done(function (response){
            for (var i = 0; i < response.length; i++) {
                $('#productRow').html('');
                $('#productRow').append('<div class="col-md-4"><div class="content"><a href="#" target="_blank"><div class="content-overlay"></div><img class="content-image" src="' + response[i].imagePath + '"><div class="content-details fadeIn-bottom"><h3 class="content-title">' + response[i].name + '</h3><p class="content-text">' + response[i].price +'</p></div></a></div></div>')
            }
    });
}

function SearchAdminProducts() {
    var searchTerm = document.getElementById("adminSearchBar").value;
    server_address = 'https://localhost:44390/api/Home/DisplaySearchResults';

    result = makeTextPostRequest(searchTerm, server_address);
    result.done(function (response) {
        for (var i = 0; i < response.length; i++) {
            $('#productList').html('');
            $('#productList').append('<tr><td>' + response[i].id + '</td><td>' + response[i].name + '</td > <td>' + response[i].price + '</td> <td>' + response[i].imagePath + '</td> <td>' + response[i].quantity + '</td> <td><p data-placement="top" class="edit-product" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button></p></td> <td><p data-placement="top" class="dlt-product" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr > ')
        }
    });
}

function Checkout() {
    var obj = JSON.stringify($('#checkoutForm').serializeArray());

    server_address = 'https://localhost:44390/api/ShoppingCart/DeleteAllProducts';

    result = makeTextPostRequest("", server_address);
    result.done(function (response) {
        location.reload();
    });
}


$(document).ready(function () {


    $('.dlt-product').click(function () {
        {
            var productId = $(this).closest('tr').find('td:nth-child(1)').text();
            server_address = 'https://localhost:44390/api/Products/Delete';

            result = makeTextPostRequest(productId, server_address);
            result.done(
                function (response) {
                    if (response == "Success") {
                        location.reload();
                    }
                    else {
                        alert(response);
                    }
                }
            );
        }
    });
    $('.edit-product').click(function () {
        var productId = $(this).closest('tr').find('td:nth-child(1)').text();
        var productName = $(this).closest('tr').find('td:nth-child(2)').text();
        var productPrice = $(this).closest('tr').find('td:nth-child(3)').text();
        var productGender = $(this).closest('tr').find('td:nth-child(4)').text();
        var productStyle = $(this).closest('tr').find('td:nth-child(5)').text();
        var productDescription = $(this).closest('tr').find('td:nth-child(6)').text();
        var productImagePath = $(this).closest('tr').find('td:nth-child(7)').text();
        var productQuantity = $(this).closest('tr').find('td:nth-child(8)').text();

        document.getElementById("editProductId").value = productId.toString();
        document.getElementById("editProductName").value = productName.toString();
        document.getElementById("editProductPrice").value = productPrice.toString();
        document.getElementById("editProductGender").value = productGender.toString();
        document.getElementById("editProductStyle").value = productStyle.toString();
        document.getElementById("editProductDescription").value = productDescription.toString();
        document.getElementById("editProductImagePath").value = productImagePath.toString();
        document.getElementById("editProductQuantity").value = productQuantity.toString();

        document.getElementById('edit-product').style.display = 'block';
    });
    $('.add-to-cart').click(function () {
        var productId = $(this).closest('tr').find('td:nth-child(1)').text();

        server_address = 'https://localhost:44390/api/ShoppingCart/AddToCart';

        result = makeTextPostRequest(productId, server_address);
        result.done(function (response) {
            alert(response);
        });
    });
    $('.dlt-cart-product').click(function () {
        var productId = $(this).closest('tr').find('td:nth-child(1)').text();

        server_address = 'https://localhost:44390/api/ShoppingCart/DeleteProduct';

        result = makeTextPostRequest(productId, server_address);
        result.done(function (response) {
            if (response == "Success") {
                location.reload();
            }
            else {
                alert(response);
            }
        });
    });
    $('.updt-quantity').on("change keyup", function () {
        var productQuantity = $(this).val();
        var productId = $(this).closest('tr').find('td:nth-child(1)').text();
        
        server_address = 'https://localhost:44390/api/ShoppingCart/UpdateQuantity';

        productIdAndQuantity = productId + '-' + productQuantity.toString();

        result = makeTextPostRequest(productIdAndQuantity, server_address);
        result.done(function (response) {
            if (response == "Success") {
                location.reload();
            }
            else {
                alert(response);
            }
        });

    });

    server_address = 'https://localhost:44390/api/Products/Search';
    var result = makeTextPostRequest("dummy", server_address);
    result.done(function (response) {

        autocomplete(document.getElementById("homeSearchBar"), response);
    });

   

    var signedInUser = document.getElementById("signedInUser").innerHTML;

    if (signedInUser.startsWith("admin@email.com")) {
        document.getElementById("adminPanel").style.display = "block";
    }

});

function Filter() {
    var prices = $.map($('input:checkbox[name=priceRange]:checked'), function (e, i) {
        return e.value;
    });

    var genders = $.map($('input:checkbox[name=gender]:checked'), function (e, i) {
        return e.value;
    });

    var styles = $.map($('input:checkbox[name=style]:checked'), function (e, i) {
        return e.value;
    });

    server_address = 'https://localhost:44390/api/Products/ReturnProducts';

    result = makeTextPostRequest("", server_address);
    result.done(function (response) {
        if (prices.length || genders.length || styles.length) {
            $("#productRow").html("");
            var noResults = true;
            for (var i = 0; i < response.length; i++) {
                var eligible = true;
                genders.forEach(function (gender) {
                    if (response[i].gender != gender) {
                        eligible = false;
                    }
                });
                styles.forEach(function (style) {
                    if (response[i].style != style) {
                        eligible = false;
                    }
                });
                var currentPrice = parseFloat(response[i].price)
                prices.forEach(function (pricerange) {
                    var range = pricerange.split('-');
                    var low = parseFloat(range[0]);
                    var high = parseFloat(range[1]);
                    if (currentPrice < low || currentPrice > high) {
                        eligible = false;
                    }
                });
                if (eligible) {
                    noResults = false;
                    $('#productRow').append('<div style="margin-top: 30px;" class="col-md-4"><div class="content"><a href="#" target="_blank"><div class="content-overlay"></div><img class="content-image" src="' + response[i].imagePath + '"><div class="content-details fadeIn-bottom"><h3 class="content-title">' + response[i].name + '</h3><p class="content-text">' + response[i].price + '</p></div></a></div></div>')
                }
            }
            if (noResults == true) {
                $("#productRow").html('<h1 style="color: white;">No results found</h1>');
            }
        }
        else {
            location.reload();
        }
        
    });
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

