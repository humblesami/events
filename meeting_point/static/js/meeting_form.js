$(function(){
    $('div[name="country"] .o_input').focus(function(){
        this.select();
    });

    setTimeout(function(){
        var form_sheet = $('.o_form_sheet:first');
        var padding = parseFloat(form_sheet.css('padding-left')) + parseFloat(form_sheet.css('padding-left'));
        var width = form_sheet.width() + padding;
        $('.comments.oe_read_only').width(width);
    }, 15);
});