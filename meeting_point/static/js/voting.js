$(function(){
    $('#votingBack').hide();
    $('#submitted').hide();
    function get_results(){
        var options = {
            url : '/voting/results',
            data : {},
            success:function(results){
                if(results.message)
                {
                    $('.results').html(results.message);
                    return;
                }
                results.my_answer = results.my_answer.toLowerCase();
                if(results.my_answer!='Pending')
                {
                    $('.voting_choice_container:first').find('input.'+results.my_answer).attr('checked', true);
                }
                console.log(results);
                results = results.votingCount;
                for(var key in results)
                {
                    $('.results').append(`
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
        let user_choice = input_choice.next().html();

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
