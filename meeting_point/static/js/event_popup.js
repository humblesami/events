$('.modal-dialog:last').removeClass('modal-lg');
$('.modal-footer:last').find('button:not(:last)').remove();
$(function(){

    var detail_btn = $('.detail_btn:first');
    var is_attendee = $('.is_attendee:first').html();

    if(is_attendee && is_attendee == 'yes')
    {
        setTimeout(function(){
     var statusValue = $('.statusValue').text()
            if (statusValue == 'Accepted')
            {
             console.log('here it is')
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
//        var meeting_link_val = $('.meeting_link:first').attr('href');
//        meeting_link_val += '&id='+$('.modal-dialog .meeting_id:first').html();
//        $('.meeting_link:first').attr('href',meeting_link_val);
        $('.modal-footer:last').append(detail_btn);
        detail_btn.removeClass('o_hidden');
    }
    else
    {
        detail_btn.remove();
    }

    detail_btn.click(function(){
        console.log($(this).closest('.modal-dialog').find('.close').click());
    });
});