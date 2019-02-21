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