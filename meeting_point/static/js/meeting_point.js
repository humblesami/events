$(function(){
    $(document).on('change', '.meetingform .meeting_duration',function(e){
        addTopicIndex();
        meeting_point.meeting.validateDurations(e, this);
    });
    $(document).on('change', '.meetingtopicform .topic_duration',function(e){
        addTopicIndex();
        meeting_point.topic.validateDurations(e, this);
    });

    $(document).on('click', '.meetingform .meetingtopic_tree  a', function () {
        $('.meetingform .topicIndex').val("-1");
    });
    $(document).on('click', '.meetingform .meetingtopic_tree  td', function () {
        var topicIndex = $(this).parent().index();
        $('.meetingform .topicIndex').val(topicIndex);
    });
    $(document).on('focus', 'input.o_datepicker_input[name="start_datetime"]', function () {
        var el = this;
        meeting_point.meeting.setStartTime(el);
    });
    $(document).on('focus', 'input.o_datepicker_input[name="stop_datetime"]', function () {
        var el = this;
        meeting_point.meeting.setStopTime(el);
    });

    var topicIndexAdded = false;
    function addTopicIndex()
    {
        if(!topicIndexAdded)
        {
            $('.meetingform').append('<input class="topicIndex" value="-1" />');
            topicIndexAdded = true;
        }
    }

    $(document).on('focus', 'input.topic_duration',function(){
        var modal_title = $(this).closest('.modal-content').children('.modal-header').children('.modal-title').html();
        if(modal_title && modal_title.indexOf('Create') != -1)
            $('.meetingform .topicIndex').val("-1");
    });
    if(!$('input.conference').val())
        $('input.conference').val('+1-512-402-2718').change();

    setTimeout(function(){
        var readonly_form = $('.conference_status').closest('.o_form_view').is('.o_form_readonly');
        console.log($('.conference_status').html(), readonly_form, 1344);
        if(readonly_form)
        {
            if($('.conference_status').html().trim() == 'active')
                $('.emeeting_fields').show();
           else
           {
                $('.emeeting_fields').hide();
           }
        }
        else
        {
            $('.emeeting_fields').show();
        }
    }, 100)

});

var meeting_point = {
    meeting: {
        validateDurations: function (e, el) {
            try {
                dntoast.hide();
                if($('.meetingform').length == 0 || $('.meeting_duration').length == 0)
                {
                    dntoast.error("No meeting form");
                    return;
                }

                var ob = $(el);
                meeting_point.meeting.onStartValidation('.meetingform', ob);

                var meetingDuration = el.value;
                if(!meetingDuration)
                    return;

                meetingDuration = timeToDecimal(meetingDuration);
                var sumOfTopicsDuration = meeting_point.meeting.calcSumOfTopicsDuration();
                if (meetingDuration < sumOfTopicsDuration)
                {
                    meeting_point.meeting.onInvalidDuration('.meetingform', "Meeting duration must be at least " + sumOfTopicsDuration, ob);
                    return;
                }
            }
            catch (er) {
                console.log(er);
                dntoast.error(er.message);
            }
        },
        onStartValidation:function(containerSelector, input){
            input.removeClass('dnerror');
            $(containerSelector).find('.btn.btn-primary').removeAttr('disabled');

            if($(containerSelector).closest('.modal-content').length !=0)
                $(containerSelector).closest('.modal-content').find('.modal-footer').find('.btn.btn-primary').removeAttr('disabled', '');
            else
                $('.o_control_panel').find('.btn.btn-primary').removeAttr('disabled', '');

        },
        onInvalidDuration: function (containerSelector, message, input) {
            dntoast.error(message);
            input.addClass('dnerror').focus();
            if($(containerSelector).closest('.modal-content').length !=0)
                $(containerSelector).closest('.modal-content').find('.modal-footer').find('.btn.btn-primary').attr('disabled', '');
            else
                $('.o_control_panel').find('.btn.btn-primary').attr('disabled', '');
        },
        calcSumOfTopicsDuration: function () {
            var sumOfTopicsDuration = 0;
            var spans = $('.topic_duration_span');
            if(spans.length != 0)
            {
                for (var i in spans) {
                    var topicDuration = spans.eq(i).html();
                    topicDuration = timeToDecimal(topicDuration);
                    sumOfTopicsDuration += topicDuration;
                }
            }
            return sumOfTopicsDuration;
        },
        setStartTime:function(el){
            if (!el.value) {
                var stop_time = $('input.o_datepicker_input[name="stop_datetime"]').val();
                if (stop_time) {
                    el.value = stop_time;
                    $(el).trigger('change');
                }
                else {
                    var dtnow = new Date();
                    dtnow.setDate(dtnow.getDate() + 1);
                    dtnow = addZeroToUnder10(dtnow.getMonth() + 1) + '/' + addZeroToUnder10(dtnow.getDate()) + '/' + dtnow.getFullYear() + ' 08:00:00';
                    setTimeout(function () {
                        el.value = dtnow;
                        $(el).trigger('change');
                    }, 250);
                }
            }
        },
        setStopTime:function(el){
            if (!el.value) {
                var start_time = $('input.o_datepicker_input[name="start_datetime"]').val();
                if (start_time) {
                    el.value = start_time;
                    $(el).trigger('change');
                }
                else {
                    var dtnow = new Date();
                    dtnow.setDate(dtnow.getDate() + 1);
                    dtnow = addZeroToUnder10(dtnow.getMonth() + 1) + '/' + addZeroToUnder10(dtnow.getDate()) + '/' + dtnow.getFullYear() + ' 08:00:00';
                    setTimeout(function () {
                        el.value = dtnow;
                        $(el).trigger('change');
                    }, 700);
                }
            }
        },
    },
    topic: {
        validateDurations: function (e, el) {
            try {
                dntoast.hide();
                $('.meetingform .btn-primary').removeAttr('disabled');
                if($('.meetingtopicform').length == 0 || $('.meeting_duration').length == 0)
                {
                    dntoast.error("No meeting form for topic");
                    return;
                }

                var ob = $(el);
                meeting_point.meeting.onStartValidation('.meetingtopicform', ob);
                var currentTopicDuration = el.value;
                if(!currentTopicDuration)
                    return;

                currentTopicDuration = timeToDecimal(currentTopicDuration);
                var meetingDuration = $('.meetingform .meeting_duration').first().val();
                meetingDuration = timeToDecimal(meetingDuration);

                var sumOfTopicsDuration = meeting_point.topic.calcSumOfTopicsDuration(currentTopicDuration);
                if (meetingDuration < sumOfTopicsDuration)
                {
                    meeting_point.meeting.onInvalidDuration('.meetingtopicform', "Topic duration can not exceed meeting duration " + meetingDuration, ob);
                    return;
                }
            }
            catch (er) {
                console.log(er);
                dntoast.error(er.message);
            }
        },
        calcSumOfTopicsDuration: function (currentTopicDuration) {
            var sumOfTopicsDuration = 0;
            var topicIndex = $('.meetingform .topicIndex').val();
            if (topicIndex == "-1")
                sumOfTopicsDuration = currentTopicDuration;
            var spans = $('.topic_duration_span');
            if(spans.length != 0)
            {
                for (var i in spans) {
                    var topicDuration = spans.eq(i).html();
                    topicDuration = timeToDecimal(topicDuration);
                    if (topicIndex == i)
                        sumOfTopicsDuration += currentTopicDuration;
                    else
                        sumOfTopicsDuration += topicDuration;
                }
            }
            return sumOfTopicsDuration;
        }
    },
    survey: {
        question: {
            onload: function () {
                $('.o_radio_item input[data-value="multiple_choice"]').change(function () {

                });
                var option = $('.o_input[name="survey_type"] option:selected');
                if (option.length == 0)
                    $('.modal .o_form_sheet .o_group').show();
                else {
                    if (option.html() == "Approval") {
                        $('.o_radio_item input[data-value="simple_choice"]').click();
                    }
                    else
                        $('.modal .o_form_sheet .o_group').show();
                }
            }
        }
    }
};
