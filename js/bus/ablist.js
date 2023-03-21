$(function () {
    $('#menus').load('/res/html/menus.html?v=' + ver);
    list(1);    
});

function list(p) {
    page = p;
    flag = true;
    $.ajax({
        url: '/collect/getlist/' + p,
        data: {},
        success: function (res) {
            var tpl = $('#all-template').html();
            var html = juicer(tpl, {list: res.result});
            $('#all').append(html);
            if (!res.result) {
                end = true;
            }
            flag = false;
        }
    });
}

var page = 1;
var end = false;
var flag = false;
$(window).scroll(function () {
    if (!flag && !end && $('.load-more').offset().top < $(window).height() + $(document).scrollTop()) {
        page++;
        list(page);
    }
});