odoo.define('dn_base.w_inputmask', function(require) {
    "use strict";

    var field_registry = require('web.field_registry');
    var Field = field_registry.get('char');


    var FieldColorPicker = Field.extend({
        template: 'w_mask',
        //widget_class: 'oe_form_field_color',
        _renderReadonly: function () {
            var show_value = this._formatValue(this.value);
            this.$el.css('color','green');
            this.$el.text(show_value);
        },

        _getValue: function () {
            var $input = this.$el.find('input');
            var val = $input.val();
            return $input.val();
        },

        _renderEdit: function () {
			var show_value = this.value ;
			var $input = this.$el.find('input');
			this.$el.css('color','red');
			$input.val(show_value);
			this.$input = $input;
        }
    });
	field_registry.add('w_mask', FieldColorPicker);
	return {'w_mask': FieldColorPicker};
});
