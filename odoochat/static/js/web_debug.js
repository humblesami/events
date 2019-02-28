(function(){
    var dnow = Date();
    document.writeln(
        `<base href=${window.location.origin} />
        <script type="text/javascript" src="/meeting_point/static/meetvue/assets/config.js"></script>
        <script type="text/javascript" src="/meeting_point/static/meetvue/assets/js/json.js"></script>
        <script type="text/javascript" src="/meeting_point/static/meetvue/assets/js/simple_ajax.js"></script>
        <script type="text/javascript" src="/meeting_point/static/meetvue/assets/js/main.js"></script>
        <script type="text/javascript" src="/meeting_point/static/meetvue/assets/js/datetime.js"></script>

        <script type="text/javascript" src="/meeting_point/static/meetvue/polyfills.js"></script>
        <script type="text/javascript" src="/meeting_point/static/meetvue/vendor.js"></script>
        <script type="text/javascript" src="/meeting_point/static/meetvue/main.js?v="+dnow></script>`
    );
})();

odoo.define('odoochat.notifications', function (require) {
    var SystrayMenu = require('web.SystrayMenu');
    var Widget = require('web.Widget');

    var IconMenu = Widget.extend({
        template:'notification_message.icons'
    });
    SystrayMenu.Items.push(IconMenu);

    $(function(){
        setTimeout(function(){
            $('body').append(`
                <div style="display:none">
                    <app-root></app-root><app-comments></app-comments>
                </div>
                <script type="text/javascript" src="/meeting_point/static/meetvue/runtime.js?v="+dnow></script>
            `);

            $('body').append(`
                <style>
                    .messenger-container
                    {
                        background-color: white;
                        left:-77vw !important;
                        width: 98.5vw !important;
                    }
                </style>
            `);
        }, 2000);
    });
});