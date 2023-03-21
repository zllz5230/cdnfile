$(function () {
    if(typeof ClipboardJS != 'function'){
        return false; /*避免未引入Clipboard抛错*/
    }

    var clipboard = new ClipboardJS('a', {
        text: function (obj) {
            var txt = $(obj).attr('data-clipboard-text');
            if (txt === '' || txt === undefined) {
                txt = '';
            }
            return txt;
        }
    });
    clipboard.on('success', function(e) {
        console.log("success");
    });
});