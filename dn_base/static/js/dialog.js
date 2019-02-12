//console.log("Full Speed Ahead")
odoo.define('dn_base.dialog', function (require) {
    var dialog = require('web.Dialog');
    var core = require('web.core');
    var QWeb = core.qweb;
    var _t = core._t;
    dialog.include({

        init: function (parent, options) {
            this._super(parent);
            this._opened = $.Deferred();

            options = _.defaults(options || {}, {
                title: _t(''), subtitle: '',
                size: 'large',
                dialogClass: '',
                $content: false,
                buttons: [{text: _t("OK"), close: true}],
                technical: true,
            });

            this.$content = options.$content;
            this.title = options.title;
            this.subtitle = options.subtitle;
            this.dialogClass = options.dialogClass;
            this.size = options.size;
            this.buttons = options.buttons;
            this.technical = options.technical;
        },

        willStart: function () {
        var self = this;
        return this._super.apply(this, arguments).then(function () {
            // Render modal once xml dependencies are loaded
            if (self.title == 'Odoo Server Error'){
                self.title = 'Validation Error'
                self.subtitle = ''
            }
            self.$modal = $(QWeb.render('Dialog', {
                title: self.title,
                subtitle: self.subtitle,
                technical: self.technical,
            }));
            switch (self.size) {
                case 'large':
                    self.$modal.find('.modal-dialog').addClass('modal-lg');
                    break;
                case 'small':
                    self.$modal.find('.modal-dialog').addClass('modal-sm');
                    break;
            }
            self.$footer = self.$modal.find(".modal-footer");
            self.set_buttons(self.buttons);
            self.$modal.on('hidden.bs.modal', _.bind(self.destroy, self));
        });
    },
    });
});


odoo.define('dn_base.messages', function (require) {
    var SystrayMenu = require('web.SystrayMenu');
    var Widget = require('web.Widget');
    var web_client = require('web.web_client');


     var IconMenu = Widget.extend({
        template:'dnbase.icon.message',
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
            args: ["meeting_point","view_meeting_point_messages_form"]
                }).then(function (returned_value)
                        {
                            var view_id=returned_value[1];

                            web_client.do_action({
                                type: 'ir.actions.act_window',
                                res_model: 'meeting_point.empty',
                                res_id: 1,
                                view_mode: 'form',
                                views: [[view_id, 'form']],
                                target: 'main'
                              });

                         })
    }



    });
SystrayMenu.Items.push(IconMenu);


});