var $google_ad_flag = [];
$(document).ready(function () {
    $(window).bind("scroll", function (event) {
        $(".feed").each(function () {
            var fold = $(window).height() + $(window).scrollTop();
            if (fold <= $(this).offset().top) {
                var index = $(this).attr('data-index');
                if ($google_ad_flag === undefined || $google_ad_flag[index] === undefined || !$google_ad_flag[index] ) {
                    $(this).trigger("appear");
                }
            }
        });
    });

    bindEvent();
});

function bindEvent() {
    $(".feed").each(function () {
        var index = $(this).attr('data-index');
        if ($(window).height() > $(this).offset().top) {
            if ($google_ad_flag === undefined || $google_ad_flag[index] === undefined || !$google_ad_flag[index] ) {
                (adsbygoogle = window.adsbygoogle || []).push({});
                $google_ad_flag[index] = true;
            }
        }
        $(this).one("appear", function () {
            if ($google_ad_flag === undefined || $google_ad_flag[index] === undefined || !$google_ad_flag[index] ) {
                (adsbygoogle = window.adsbygoogle || []).push({});
                $google_ad_flag[index] = true;
            }
        });
    });
}