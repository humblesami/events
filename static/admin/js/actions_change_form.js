function get_meeting_topics(meeting_id)
{
    let input_date = {
        meeting_id: meeting_id
    }
    let args = {
        app: 'meetings',
        model: 'Topic',
        method: 'get_meeting_topics'
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
        $('.field-topic select option').remove();
        let topic_select = $('.field-topic select');
        topic_select.append('<option value selected>---------</option')
        data.forEach(topic => {
            topic_select.append('<option value='+topic.id+'>'+topic.name+'</option>');
        });
    }
    window['dn_rpc_object'](options);
}
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
            get_meeting_topics(meeting_id);
        }
        else
        {
            $('.field-topic select option').remove();
            $('.field-respondents').show();
            $('.field-topic').hide();
        }


    });
});