(function(){
    var dev_mode = false;
    var site_base_url = window.location.origin;
    if(site_base_url.indexOf('localhost') > -1 || site_base_url.indexOf('172.16'))
    {
        odoo.dev_mode = false;
    }
    odoo.site_base_url = site_base_url;
//    odoo.define('odoochat.onClientready', function (require) {
//        "use strict";
//        var core = require('web.core');
//        core.bus.on('web_client_ready', null, function () {
//            var systray = $('.o_menu_systray');
//            var url = 'http://localhost:4200/chat';
//            var frame_html = '<iframe src="'+url+'" height=35" width="300"></iframe>';
//            var iframe = $('<div class="iframe inline"></div>');
//            iframe.html(frame_html);
//            //iframe = '<link rel="import" href="'+url+='">';
//            systray.after(iframe);
//            console.log(url, systray.length);
//            $('.iframe.inline').click(function(e){
//                console.log(e.target);
//                console.log(111, 34222);
//            });
//            console.log(111, 33222448888);
//
//            window.addEventListener('message',function(e) {
//                var key = e.message ? 'message' : 'data';
//                var data = e[key];
//                console.log(111, e);
//            },false);
//        });
//    });
})()