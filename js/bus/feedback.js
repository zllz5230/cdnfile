$(function () {
    $('#menus').load('/res/html/menus.html?v=' + ver);
    $('#submit').bind('click', function () {
        var title = $("input[name=title]").val();
        var url = $("input[name=url]").val();
        $.ajax({
            url: '/urls/addUrl',
            data: {
                title: title,
                url: url
            },
            success: function (res) {
                if (res.success) {
                    $("input[name=title]").val("");
                    $("input[name=url]").val("");
                    alert(res.result);
                } else {
                    alert(res.message);
                }
            }
        });
    });
});