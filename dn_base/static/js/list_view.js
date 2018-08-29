odoo.define('dn_base.listview', function (require) {
    "use strict";

    var FIELD_CLASSES = {
        float: 'o_list_number',
        integer: 'o_list_number',
        monetary: 'o_list_number',
        text: 'o_list_text',
    };
    var field_utils = require('web.field_utils');
    var ListRenderer = require('web.ListRenderer');
    ListRenderer.include({
        _renderBodyCell: function (record, node, colIndex, options){
            var tdClassName = 'o_data_cell';
            if (node.tag === 'button') {
                tdClassName += ' o_list_button';
            } else if (node.tag === 'field') {
                var typeClass = FIELD_CLASSES[this.state.fields[node.attrs.name].type];
                if (typeClass) {
                    tdClassName += (' ' + typeClass);
                }
                if (node.attrs.widget) {
                    tdClassName += (' o_' + node.attrs.widget + '_cell');
                }
            }
            var $td = $('<td>', {class: tdClassName});
            var modifiers = this._registerModifiers(node, record, $td, _.pick(options, 'mode'));
            if (modifiers.invisible && !(options && options.renderInvisible)) {
                return $td;
            }

            if (node.tag === 'button') {
                return $td.append(this._renderButton(record, node));
            } else if (node.tag === 'widget') {
                return $td.append(this._renderWidget(record, node));
            }
            if (node.attrs.widget || (options && options.renderWidgets)) {
                var widget = this._renderFieldWidget(node, record, _.pick(options, 'mode'));
                this._handleAttributes(widget.$el, node);
                return $td.append(widget.$el);
            }
            var name = node.attrs.name;
            var field = this.state.fields[name];
            var value = record.data[name];
            var formattedValue = field_utils.format[field.type](value, field, {
                data: record.data,
                escape: true,
                isPassword: 'password' in node.attrs,
            });
            this._handleAttributes($td, node);
            if(this.editing && typeof formattedValue == 'object')
                formattedValue.find('input').removeAttr('disabled');

            return $td.html(formattedValue);
        },
        _renderRows: function () {
            if(this._isEditable())
                this.editing = true;
            else
                this.editing = false;
            return this._super();
        }
    });
});


