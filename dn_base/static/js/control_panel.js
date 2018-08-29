//odoo.define('dn_base.ControlPanel', function (require) {
//    var control_panel = require('web.ControlPanel');
//    control_panel.include({
//        _update_search_view: function(searchview, is_hidden) {
//            if (searchview) {
//                searchview.$buttons = this.nodes.$searchview_buttons;
//                searchview.toggle_visibility(!is_hidden);
//            }
//
//            this.nodes.$searchview.hide();
//
//            var elem = this;
//            setTimeout(function(){
//                var naxt = elem.$el.next();
//                if(naxt.find('.o_form_view').length == 0)
//                    elem.nodes.$searchview.toggle(!is_hidden);
//                naxt.find('.o_form_view').length > 0
//            }, 20);
//
//            this.$el.toggleClass('o_breadcrumb_full', !!is_hidden);
//        }
//    });
//});
