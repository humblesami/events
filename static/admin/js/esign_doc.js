$(function(){
    var meeting_id = $('.field-meeting select').val();
    if(meeting_id)
    {
        $('.form-row.field-send_to_all').show();
    }
    else{
        $('.form-row.field-send_to_all').hide();
    }
    $('.field-meeting select').on('change', function(){
        meeting_id = $(this).val();
        if (meeting_id)
        {
            $('.form-row.field-send_to_all').show();
        }
        else
        {
            $('.form-row.field-send_to_all select').val('false');
            $('.form-row.field-send_to_all').hide();
        }
    });
    
    if($('#id_attachment').length)
    {
        // $('#id_attachment').attr('multiple','multiple');
        file_input($('#id_attachment'));
        $('.form-row.field-attachment').show();
        $('.form-row.field-respondents').show();
    }
});

