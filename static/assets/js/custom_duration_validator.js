$(document).ready(function(){
    durationRequisits();
    $(document).on('blur', 
        '.field-duration input:visible, .field-start_date input, .field-end_date input', 
        function()
        {
            var topic_name = $(this).closest('tr').find('.field-name input:visible').val();
            if(!topic_name)
            {
                return;
            }
            if (!$(this).val())
            {
                $('.submit-row input').attr('disabled', 'disabled');
                return;
            }
            $('.submit-row input').attr('disabled', 'disabled');
            let end_date = [];
            let start_date = [];
            $('.field-start_date input').each(function(el){
                let value = $(this).val();
                start_date.push(value);
            });

            $('.field-end_date input').each(function(el){
                let value = $(this).val();
                end_date.push(value);
            });
            if (! (checkDateAndTime(start_date) && checkDateAndTime(end_date)))
            {
                $('.submit-row input').attr('disabled', 'disabled');
                return;
            }
            start_date = new Date(Date.parse(start_date.join(' ')));
            end_date = new Date(Date.parse(end_date.join(' ')));
            var diff = moment.duration(moment(end_date).diff(moment(start_date)));
            let time_difference = diff.valueOf()
            let total_durations = [0,0]
            $(".field-duration input:visible").each(function(){
                let duration = [];
                duration = $(this).val().split(':')
                for(let i=0; i<duration.length;i++){
                    if(!isNaN(parseInt(duration[i])))
                    {
                        total_durations[i] += parseInt(duration[i]);
                    }
                }
            });
            duration_in_mil = durationToMilliseconds(total_durations);
            if (duration_in_mil > time_difference)
            {
                $('.submit-row input').attr('disabled', 'disabled');
                $(this).addClass('error');
                $(this).focus();
            }
            else
            {
                $('.submit-row input').removeAttr('disabled');
            }
        });

    $('.djn-add-item a').click(function(){
        setTimeout(durationRequisits,100);
    });

    function checkDateAndTime(meetingDate)
    {
        let is_valid = false;
        for (let i=0; i<meetingDate.length;i++)
        {
            if (!meetingDate[i])
            {
                is_valid = false;
                return is_valid;
            }
            else
            {
                is_valid = true;
            }
        }
        return is_valid;
    }

    function durationRequisits()
    {        
        $(".field-duration input:visible").each(function(){
            var obj = this;
            var is_pat = $(obj).hasClass('pat');
            // console.log(is_pat, obj)
            if (!is_pat)
            {
                $(obj).addClass('pat');
                $(obj).mask('00:00');
                $(obj).attr('regex', '^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$');
                $(obj).attr('placeholder', 'HH:MM');
            }
        });
    }
    function durationToMilliseconds(duration)
    {
        hours_to_mil = duration[0] * 60 * 60 * 1000;
        minuts_to_mil = duration[1] * 60 * 1000;
        return hours_to_mil + minuts_to_mil;
    }
});