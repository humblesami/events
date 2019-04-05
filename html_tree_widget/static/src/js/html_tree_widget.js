odoo.define('html_tree_widget.web_tree_extension', function (require) {

        "use strict";

     var Listview = require('web.ListView');

     var formats = require('web.formats');

     Listview.Column.include({

         _format: function (row_data, options) {      

      return formats.format_value(row_data[this.id].value, this, options.value_if_empty);

         }

     });

    });
