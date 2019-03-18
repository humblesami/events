$(function(){
    $('#votingBack').hide();
    $('#submitted').hide();
    function get_results(){
        var options = {
            url : '/voting/results',
            data : {},
            success:function(data){
                var vote_options_dom = '';
                $('.vote_options:first').html('');
                console.log(111, data);
                var my_answer = data.my_answer;
                for(var i in data.vote_options)
                {
                    var option = data.vote_options[i];
                    vote_options_dom = '<span class="vote_choice">';
                    vote_options_dom += '<input data-id='+option.id+' type="radio"/><span>'+option.name+'</span>';
                    vote_options_dom += '</span>';
                    $('.vote_options:first').append(vote_options_dom);
                    if(my_answer == option.name)
                    $('.vote_options:first .vote_choice:last input').attr('checked', true);
                }
                if(data.message)
                {
                    $('.results').html(data.message);
                    return;
                }
                var results = data.voting_answers;
                var no_results = 'No answer from any user';
                for(var key in results)
                {
                    if(no_results)
                        no_results = false;
                    $('.results').html(`
                    <div class="entry">
                        <span class="choice_label">
                            <span>Choice</span>: <span class="user-choice">`+key+`</span>
                        </span>
                        <span class="choice_count">
                            <span>Voters</span>: <span class="count">`+results[key]+`</span>
                        </span>
                    </div>
                    `)
                }
                if(no_results)
                $('.results').html(no_results);
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

    $('.voting_choice_container:first input[type="radio"]').change(function(){
        var input_choice = $(this);
        if(!input_choice.is(':checked'))
        {
            return;
        }
        let voting_id = $('.voting_id').html();
        let user_choice = input_choice.attr('data-id');

        var options = {
            url : '/voting/submit',
            data : {'user_answer' : user_choice, 'voting_id' : voting_id},
            success:function(data){
            console.log(data);
            },
            error:function(a, b){
                console.log(b.responseText);
            }
        }
        dn_rpc_ajax(options);
    });

    $('.vote_choice span').click(function(){
        var prev = $(this).prev();
        if(prev.is('input'))
        {
            prev.click();
	        //prev.change();
	    }
    });
})
