var modal = document.getElementById('loginModal');

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

var modal = document.getElementById('registerModal');

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

var modal = document.getElementById('add-product');

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

$(document).ready(function () {
    $("#mytable #checkall").click(function () {
        if ($("#mytable #checkall").is(':checked')) {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });

        } else {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
        }
    });

    $("[data-toggle=tooltip]").tooltip();
});
