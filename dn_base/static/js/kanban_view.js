odoo.define('dn_base.kanban_view', function (require) {
    "use strict";
    var core = require('web.core');
    var Model = require('web.DataModel');
    var KanbanView = core.view_registry.get('kanban');

    KanbanView.include({
        postprocess_m2m_tags: function(records) {
            var self = this;
            if (!this.many2manys.length) {
                return;
            }
            var relations = {};
            records = records ? (records instanceof Array ? records : [records]) :
                      this.grouped ? Array.prototype.concat.apply([], _.pluck(this.widgets, 'records')) :
                      this.widgets;

            records.forEach(function(record) {
                self.many2manys.forEach(function(name) {
                    var field = record.record[name];
                    var $el = record.$('.oe_form_field.o_form_field_many2manytags[name=' + name + ']');
                    if (! $el[0]) {
                        return;
                    }
                    if (!relations[field.relation]) {
                        relations[field.relation] = { ids: [], elements: {}, context: self.m2m_context[name]};
                    }
                    var rel = relations[field.relation];
                    field.raw_value.forEach(function(id) {
                        rel.ids.push(id);
                        if (!rel.elements[id]) {
                            rel.elements[id] = [];
                        }
                        rel.elements[id].push($el[0]);
                    });
                });
            });
        }
    });
    return KanbanView;
});