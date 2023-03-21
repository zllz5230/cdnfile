$(function () {
    list(1);
});

function list(p) {
    page = p;
    flag = true;
    $.ajax({
        url: '/urls/getlistByTag',
        data: {
            page: p,
            tag: tag
        },
        success: function (res) {
            var tpl = $('#all-template').html();
            var html = juicer(tpl, {list: res.result, width: window.screen.width, page: page});
            $('#all').append(html);
            if (!res.result) {
                end = true;
                $('.load-more').html('----我们是有底线的----');
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