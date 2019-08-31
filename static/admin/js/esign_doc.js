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
        $('#id_attachment').fileinput();
        var name_row = $('.form-row.field-name');
        var file_name = name_row.find('input[name="name"]').val();
        var caption_input = $('input.file-caption-name').attr('name', 'name');
        if(!caption_input.val())
        {
            var arr = file_name.split('.');
            file_name = arr[arr.length - 1];
            caption_input.val(file_name);
        }
        $('.form-row.field-attachment').show();
    }
});

