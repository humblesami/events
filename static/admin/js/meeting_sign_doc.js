$(document).ready(function(){
    var meeting_id = $('.field-meeting select').val();
//    console.log(meeting_id, 444);
    if(meeting_id)
    {
        $('.form-row.field-send_to_all').show();
    }
    else{
        $('.form-row.field-send_to_all').hide();
    }
    $('.field-meeting select').on('change', function(){
        meeting_id = $(this).val();
//        console.log(meeting_id, 4343);
        if (meeting_id)
        {
            $('.form-row.field-send_to_all').show();
        }
        else
        {
            $('.form-row.field-send_to_all select').val('false');
            $('.form-row.field-send_to_all').hide();
        }
    })
});
