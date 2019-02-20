odoo.define('dn_base.View', function (require) {
    "use strict";
    var view_manager = require('web.AbstractView');
    view_manager.include({
        _setSubViewLimit: function (attrs) {
            var view = attrs.views && attrs.views[attrs.mode];
            var limit = view && view.arch.attrs.limit && parseInt(view.arch.attrs.limit);
            if (!limit && attrs.widget === 'many2many_tags') {
                limit = 500;
            }
            attrs.limit = limit || 500;
        }
    });


//    var core = require('web.core');
//    var _t = core._t;
//    view_manager = require('web.ViewManager');
//    view_manager.include({
//        switch_mode: function(view_type, view_options) {
//            var self = this;
//            var view = this.views[view_type];
//
//            if (!view || this.currently_switching) {
//                return $.Deferred().reject();
//            } else {
//                this.currently_switching = true;  // prevent overlapping switches
//            }
//
//            var old_view = this.active_view;
//
//            // Ensure that the fields_view has been loaded
//            var views_def;
//            if (!view.fields_view) {
//                views_def = this.load_views();
//            }
//
//            return $.when(views_def).then(function () {
//                if (view.multi_record) {
//                    self.view_stack = [];
//                } else if (self.view_stack.length > 0 && !(_.last(self.view_stack).multi_record)) {
//                    // Replace the last view by the new one if both are mono_record
//                    self.view_stack.pop();
//                }
//                self.view_stack.push(view);
//
//                self.active_view = view;
//
//                if (!view.loaded) {
//                    view_options = _.extend({}, view.options, view_options, self.env);
//                    if (view_options.groupBy && !view_options.groupBy.length) {
//                        var actionContext = view_options ? view_options.action.context : {};
//                        var actionGroupBy = actionContext.group_by;
//                        if (!actionGroupBy) {
//                            actionGroupBy = [];
//                        } else if (typeof actionGroupBy === 'string') {
//                            actionGroupBy = [actionGroupBy];
//                        }
//                        view_options.groupBy = actionGroupBy;
//                    }
//                    view.loaded = $.Deferred();
//                    self.create_view(view, view_options).then(function(controller) {
//                        view.controller = controller;
//                        view.$fragment = $('<div>');
//                        controller.appendTo(view.$fragment).done(function() {
//                            // Remove the unnecessary outer div
//                            view.$fragment = view.$fragment.contents();
//                            view.loaded.resolve();
//                        });
//                    }).fail(view.loaded.reject.bind(view.loaded));
//                } else {
//                    view.loaded = view.loaded.then(function() {
//                        view_options = _.extend({}, view_options, self.env);
//                        return view.controller.reload(view_options);
//                    });
//                }
//
//                return $.when(view.loaded)
//                    .then(function() {
//                        self._display_view(old_view);
//                        self.trigger('switch_mode', view_type, view_options);
//                    }).fail(function(e) {
//                        if (!(e && e.code === 200 && e.data.exception_type)) {
//                            console.log(e);
//                            //self.do_warn(_t("Page Expired"), _t("Please <a href=''><b>Click Here</b></a> to reload session"));
//                            dntoast.error("View could not be loaded1", 500);
//                        }
//                        // Restore internal state
//                        self.active_view = old_view;
//                        self.view_stack.pop();
//                    });
//            }).always(function () {
//                self.currently_switching = false;
//            });
//        }
//    });
});