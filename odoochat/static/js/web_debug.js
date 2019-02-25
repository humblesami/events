(function(){

var dnow = Date();
document.writeln(`

    <base href=${window.location.origin} />
	<script type="text/javascript" src="/meeting_point/static/meetvue/assets/config.js"></script>
	<script type="text/javascript" src="/meeting_point/static/meetvue/assets/js/json.js"></script>
    <script type="text/javascript" src="/meeting_point/static/meetvue/assets/js/simple_ajax.js"></script>
	<script type="text/javascript" src="/meeting_point/static/meetvue/assets/js/main.js"></script>
	<script type="text/javascript" src="/meeting_point/static/meetvue/assets/js/datetime.js"></script>

	<script type="text/javascript" src="/meeting_point/static/meetvue/assets/chat/notification.js"></script>
	<script type="text/javascript" src="/meeting_point/static/meetvue/assets/chat/note_routes.js"></script>
    <script type="text/javascript" src="/meeting_point/static/meetvue/polyfills.js"></script>
    <script type="text/javascript" src="/meeting_point/static/meetvue/vendor.js"></script>
    <script type="text/javascript" src="/meeting_point/static/meetvue/main.js?v="+dnow></script>
`);

})();


odoo.define('odoochat.messages', function (require) {
    var SystrayMenu = require('web.SystrayMenu');
    var Widget = require('web.Widget');

    var IconMenu = Widget.extend({
        template:'message.icon',
        events: {
            'click': 'open_messages',
        },
        open_messages:function open_messages()
        {
            var reqObject = {
                url:'/get-action-id',
                data:{xml_id : 'odoochat.action_messenger', db: odoo.session_info.db, token: odoo.session_info.token},
                onSuccess: function(action_id)
                {
                    var action_url = '/web#action='+action_id;
                    var debug_in_url = window.location.toString().indexOf('debug');
                    if(debug_in_url > -1)
                    {
                        action_url = '/web?debug=1#action='+action_id;
                    }
                    //console.log(odoo.session_info.uid, action_url, debug_in_url);
                    window.location = action_url;
                }
            };
            console.log(reqObject);
            dn_rpc_object(reqObject);
        }
    });
    SystrayMenu.Items.push(IconMenu);
});

odoo.define('odoochat.notifications', function (require) {
    var SystrayMenu = require('web.SystrayMenu');
    var Widget = require('web.Widget');

    var IconMenu = Widget.extend({
        template:'notification.icon'

    });
    SystrayMenu.Items.push(IconMenu);
    var dnow = Date();
    setTimeout(function(){
        $('body').append(`
        <div style="display:none">
        <app-root></app-root><app-comments></app-comments><app-messenger></app-messenger>
        </div>
            <script type="text/javascript" src="/meeting_point/static/meetvue/runtime.js?v="+dnow></script>
        `);
    }, 1000);
});
