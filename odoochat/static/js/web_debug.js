console.log(111, ' 64 chat open')
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
            var web_client = require('web.web_client');
            var rpc = require('web.rpc');
            rpc.query({
                model: 'ir.model.data',
                method: 'get_object_reference',
                args: ["odoochat","view_message_form"]
            }).then(function (returned_value) {
                var view_id = returned_value[1];
                web_client.do_action({
                    type: 'ir.actions.act_window',
                    res_model: 'dn_base.empty',
                    res_id: 1,
                    view_mode: 'form',
                    views: [[view_id, 'form']],
                    target: 'main'
                });
            });
        }
    });
    SystrayMenu.Items.push(IconMenu);
});