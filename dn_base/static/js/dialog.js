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