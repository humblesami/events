$(document).ready(function(){
    $('.field-topic').hide();
    $('.field-meeting select').on('change', function(){
        let meeting_id = $(this).val();
        if (meeting_id)
        {
            $('.field-topic').show();
            $('.field-respondents').hide();
            let input_date = {
                meeting_id: meeting_id
            }
            let args = {
                app: 'meetings',
                model: 'Event',
                method: 'get_action_dates'
            }
            let final_input_data = {
                params: input_date,
                args: args
            }
            let options = {
                data: final_input_data
            }
            options.type = 'get';
            options.onSuccess = function(data){
                if (data != 'done')
                {
                    $('.field-open_date .vDateField').val(data.open_date);
                    $('.field-open_date .vTimeField').val(data.open_time);
                    $('.field-close_date .vDateField').val(data.close_date);
                    $('.field-close_date .vTimeField').val(data.close_time);
                }
            }
            window['dn_rpc_object'](options);
        }
        else
        {
            $('.field-respondents').show();
            $('.field-topic').hide();
        }


    });
});
