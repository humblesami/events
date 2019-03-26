$(function(){
    $('#votingBack').hide();
    $('#submitted').hide();

    function show_results(data)
    {
        var vote_options_dom = '';
        $('.vote_options:first').html('');
        //console.log(111, data);
        var my_status = data.my_status;
        var vote_options_container = $('.vote_options:first');
        if(data.my_status)
        {
            for(var i in data.vote_options)
            {
                var option = data.vote_options[i];
                vote_options_dom = '<span class="vote_choice">';
                vote_options_dom += '<input name="vote_choice_input" data-id='+option.id+' type="radio"/><span>'+option.name+'</span>';
                vote_options_dom += '</span>';
                vote_options_container.append(vote_options_dom);
                if(my_status == option.name)
                    vote_options_container.find('.vote_choice:last input').attr('checked', true);
            }
            vote_options_container.find('input[type="radio"]').change(on_user_answer);
            $('.vote_choice span').click(function(){
                var prev = $(this).prev();
                if(prev.is('input'))
                {
                    console.log('Radio Button is Clicked...')
                    prev.click();
                }
            });
        }

        if(data.message)
        {
            $('.results').html(data.message);
            return;
        }

        var results = data.voting_answers;

        var no_results = 'No answer from any user';
        var results_div =
        $('.results').html('');
        var my_groups = odoo.session_info.user.groups;
        var agi = my_groups.indexOf('MeetingPoint / Admin');

        if(agi > -1 || data.public)
        {
            $('.results_container').show();
            for(var key in results)
            {
                if(no_results)
                    no_results = false;
                $('.results').append(`
                    <div class="entry">
                        <span class="choice_label">
                            <span>Choice</span>: <span class="user-choice">`+key+`</span>
                        </span>
                        <span class="choice_count">
                            <span>Voters</span>: <span class="count">`+results[key]+`</span>
                        </span>
                    </div>
                `);

                $('.viewGraphically').attr('href',$('.graphical_view_url').text());

            }
            if(no_results)
                $('.results').html(no_results);
        }
    }

    function get_results(){
        var options = {
            url : '/voting/results',
            data : {},
            success:function(data){
                show_results(data)
            }
        }
        setTimeout(function(){
            if($('.voting_form:first').hasClass('o_form_readonly'))
            {
                var voting_id = $('.voting_id');
                options.data.voting_id = parseInt(voting_id.html());
                dn_rpc_ajax(options);
            }
        }, 100);
    }
    get_results();

    function on_user_answer(){
        var input_choice = $(this);
        if(!input_choice.is(':checked'))
        {
            return;
        }
        let voting_id = $('.voting_id').html();
        let user_choice = input_choice.attr('data-id');
        var options = {
            url : '/voting/submit',
            data : {'voting_option_id' : user_choice, 'voting_id' : voting_id},
            success:function(data){
                get_results();
            },
            error:function(a, b){
                console.log(b.responseText);
            }
        }
        dn_rpc_ajax(options);
    }
})

//# sourceURL=localhost:8000/meeting_point/static/js/voting.js