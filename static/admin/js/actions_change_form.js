function get_meeting_topics(meeting_id)
{
    let body_classes = $('body').attr('class');
    let model = '';
    if (body_classes.indexOf('model-voting') != -1)
    {
        model = 'voting';
    }
    else if(body_classes.indexOf('model-survey') != -1)
    {
        model = 'survey';
    }
    let current_url = window.location.toString();
    console.log(current_url);
    let object_id = '';
    if (current_url.indexOf('change') != -1)
    {
        if (current_url.indexOf('popup') != -1)
        {
            current_url = current_url.split('/');
            object_id = current_url[current_url.length-3];
        }
        else
        {
            current_url = current_url.split('/');
            object_id = current_url[current_url.length-2];
        }
    }
    
    console.log(34234, object_id);
    let input_date = {
        meeting_id: meeting_id,
        model: model,
        object_id: object_id
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
        if (data.selected)
        {
            topic_select.append('<option value>---------</option')
            data.topics.forEach(topic => {
                if (topic.id == data.selected)
                {
                    topic_select.append('<option value='+topic.id+' selected>'+topic.name+'</option>');
                }
                else
                {
                    topic_select.append('<option value='+topic.id+'>'+topic.name+'</option>');
                }
            });
        }
        else
        {
            topic_select.append('<option value selected>---------</option')
            data.topics.forEach(topic => {
                topic_select.append('<option value='+topic.id+'>'+topic.name+'</option>');
            });
        }
        // topic_select.append('<option value selected>---------</option')
        // data.topics.forEach(topic => {
        //     topic_select.append('<option value='+topic.id+'>'+topic.name+'</option>');
        // });
    }
    window['dn_rpc_object'](options);
}
function meeting_selection_handler(meeting_id)
{
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
        $('.field-topic select').append('<option value selected>---------</option>');
        $('.field-respondents').show();
        $('.field-topic').hide();
    }
}
$(document).ready(function(){
    if (! $('.field-meeting select option[selected]').attr('value'))
    {
        $('.field-topic').hide();
        $('.field-respondents').show();
    }
    else
    {
        $('.field-respondents').hide();
    }
    $('.field-meeting select').on('change', function(){
        meeting_selection_handler($(this).val());
    });
});