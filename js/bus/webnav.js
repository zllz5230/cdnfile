var minNum = 50, maxNum = 221318;
var rand = parseInt(((Math.floor(Math.random() * (100 - 1)) + 1)*(maxNum-minNum+1)+minNum)/100,10);
$(function () {
    var key = $('input[name=key]').val();
    if (key != '') {
        search(1);
    } else {
        list(1);
    }
});

$(document).keyup(function (e) {
    var key = $('input[name=key]').val();
    if (e.keyCode == 13) {
        if (key != '') {
            search(1);
        }
    }
});

function search(p) {
    page = p;
    var key = $('input[name=key]').val();
    flag = true;
    issearch = true;
    $.ajax({
        url: '/search/index/' + key + '/' + p,
        data: {},
        success: function (res) {
            var tpl = $('#all-template').html();
            var html = juicer(tpl, {list: res.result});
            if (p==1) {
                $('#all').html(html);
            } else {
                $('#all').append(html);
            }            
            if (!res.result) {
                end = true;
                $('.load-more').html('----我们是有底线的----');
            }
            flag = false;
        }
    });
}

function setGzh(id) {
    $.ajax({
        url: '/urls/set_gzh/' + id,
        data: {},
        success: function (res) {
            console.log(res);
        }
    });
}

function list(p) {
    page = p;
    flag = true;
    issearch = false;
    $.ajax({
        url: '/urls/getlist/' + p + '/' + type + '/' + gzh + '/' + rand,
        data: {},
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
var issearch = false;
$(window).scroll(function () {
    if (!flag && !end && $('.load-more').offset().top < $(window).height() + $(document).scrollTop()) {
        page++;
        issearch ? search(page) : list(page);
    }
});