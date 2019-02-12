$('.modal-dialog:last').removeClass('modal-lg');
$('.modal-footer:last').find('button:not(:last)').remove();
$(function(){

    var detail_btn = $('.detail_btn:first');
    var is_attendee = $('.is_attendee:first').html();
    if(is_attendee && is_attendee == 'yes')
    {
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