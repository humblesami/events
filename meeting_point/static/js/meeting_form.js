$(function(){
    $('div[name="country"] .o_input').focus(function(){
        this.select();
    });

    $('.stylish_kanban img').removeClass('img-responsive');

    setTimeout(function(){
        var form_sheet = $('.o_form_sheet:first');
        var padding = parseFloat(form_sheet.css('padding-left')) + parseFloat(form_sheet.css('padding-left'));
        var width = form_sheet.width() + padding;
        $('.comments.oe_read_only').width(width);

        var statusValue = $('.statusValue').text()
            if (statusValue == 'Accepted')
            {
            $('.accept_visible').hide()
            $('.accet').show()
            }
            else if (statusValue == 'Declined')
            {
             $('.decline_visible').hide()
              $('.declin').show()
            }
            else if (statusValue == 'Uncertain'){

             $('.tentative_visible').hide()
            $('.tentativehide').show()
            }
    }, 15);
    $('.mtopic_tree:first tbody:first .attachment').each(function(i, el){
        if($(el).html().trim().length > 0)
        {
            $(el).html('<i class="fa fa-file"></i>');
        }
    });
});