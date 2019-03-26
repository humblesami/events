$(function(){
    $('body').append('<link rel="stylesheet" href="/dn_base/static/css/time_picker.css" />');
    $('body').on('blur','.o_form_view  .dn_time_picker' ,function(e){
        $(this).removeClass('error');
        if(!this.value)
            return;
        var time_pattern = "^\\d+:[0-5][0-9]$";

        var pattern = new RegExp(time_pattern);
        var res = pattern.test(this.value);
        if(!res)
        {
            $(this).addClass('error');
            $(this).focus();
        }
    });
});


var dn_masking_values = {'zip':'99999'
,'phone':'999-999-9999'
,'dn_time_picker':'99:99'}

var to_do_models = ['calendar.event','survey.survey','meeting_point.document']

odoo.define('dn_base.form_view', function (require) {
    "use strict";
    var core = require('web.core');
//    var current_form = {
//        viewType: this.viewType,
//        mode: this.mode,
//        state_id: this.state.id
//    };
    var form_load_counter = 0;
    var FormViewRenderer = require('web.FormRenderer');
    FormViewRenderer.include({
        autofocus : function(viewInfo, params){
            this._super.apply(this, arguments);
            var form_el = this;
            var read_only = true;
            process_form_view(read_only);
            ++form_load_counter;
            if(form_load_counter % 2 == 0 && this.mode == 'readonly')
            {
                //$('.o_control_panel').show();
                var data_tds = $('.o_form_readonly table.o_group>tbody>tr .o_field_widget');
                for( var i in data_tds)
                {
                    var html_val = data_tds.eq(i).text().trim();
                    //console.log(html_val);
                    if(html_val && html_val != 'false')
                    {
                        data_tds.eq(i).parent().parent().show();
                    }
                }
            }
            form_el.$el.find(".masked_input").each(function(i, el){
                var masking_pattern = false;
                for(var class_name in dn_masking_values)
                {
                    if($(el).hasClass(class_name))
                    {
                        masking_pattern = dn_masking_values[class_name];
                        $(el).mask(masking_pattern);
                        break;
                    }
                }
            });
            form_el.$el.find('.dn_time_picker').timepicker({});
            updateUploadAcceptTypes();
        }
    });
    return FormViewRenderer;
});

function update_seen_by(res_model, res_id)
{
    var input_data={res_model:res_model,res_id:res_id};
    dn_json_rpc_object.showLoader = false;
    dn_json_rpc('/dn_base/update_seen_by',{res_model:res_model,res_id:res_id},function(data){
        dn_json_rpc_object.showLoader = true;
    });
}

function process_form_view() {
    var read_only = true;
    setTimeout(function(){
        try
        {

            var form_view = $('.o_form_view:last');
            if(form_view.is('.o_form_editable'))
            {
                read_only = false;
            }
            hide_show_kanbans(read_only);

            if(!read_only)
            {
                var first_el = form_view.find('input:visible:not([readonly]):not([disabled]):first');
                first_el.focus();
            }
        }
        catch (er)
        {
            console.log(er);
        }
    }, 30);

    function hide_show_kanbans(read_only){
        var o2m_kanbans = $('.o_field_x2many_kanban');
        if(o2m_kanbans.length>0)
        {
            o2m_kanbans.each(function(i, el){
                var o2m_kanban = $(el);
                el = o2m_kanban.prev();
                if(el.length > 0 && !el.is('div'))
                {
                    var records = o2m_kanban.find('.o_kanban_record:not(.o_kanban_ghost):first');
                    if(records.length>0)
                    {
                        o2m_kanban.parent().show();
                    }
                    else if(read_only)
                        o2m_kanban.closest('.o2m_kanban').hide();
                }
            });
        }
    }
}

function updateUploadAcceptTypes(fileTypesToUpload)
{
    setTimeout(function(){
        var file_inputs = $('input[type="file"]');
        if(file_inputs.length>0)
        {
            if(!fileTypesToUpload)
            {
                fileTypesToUpload = '.pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx';
                //fileTypesToUpload = '.pdf';
                //fileTypesToUpload +=',.csv,.txt';
                //fileTypesToUpload +=',.jpeg,.jpg,.png';
            }

            file_inputs.each(function(i, obj){
                if($(obj).closest('.o_form_image_controls').length != 0)
                    $(obj).attr('accept',"image/*");

                if(!$(obj).attr('accept')){
                    if($(obj).closest('.e_sign_docs').length != 0)
                    {
                        fileTypesToUpload = '.pdf,.ppt,.pptx,.doc,.docx';
                    }
                    else
                    {
                        fileTypesToUpload = '.pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png';
                    }
                    $(obj).attr('accept',fileTypesToUpload);
                }
            });
        }
    }, 1000);
}