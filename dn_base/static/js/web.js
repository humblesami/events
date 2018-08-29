odoo.define('dn_base.Abstract', function (require) {
    var abstract_wc = require('web.AbstractWebClient');
    var mixins = require('web.mixins');
    var concurrency = require('web.concurrency');

    abstract_wc.include({
        init: function (parent) {
            this.client_options = {};
            mixins.ServiceProvider.init.call(this);
            this._super(parent);
            this.origin = undefined;
            this._current_state = null;
            this.menu_dm = new concurrency.DropMisordered();
            this.action_mutex = new concurrency.Mutex();
            this.set('title_part', {"zopenerp": "OdooHQ"});
        }
    });
    return abstract_wc;
});



document.writeln('<script src="/dn_base/static/js/ready.js"></script>');
