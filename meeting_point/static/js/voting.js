$(function(){
    $('#votingBack').hide();
    $('#submitted').hide();
    function get_results(){
    var options = {
            url : '/voting/results',
            data : {},
            success:function(data){
                for(var i in results)
                {
                    var vote_option = results[i];
                    $('.results').html(`
                    <div class="entry">
                        <span class="choice_label">
                            <span>Choice</span><span class="user-choice">`+vote_option.name+`</span>
                        </span>
                        <span class="choice_count">
                            <span>Voters</span><span class="count">`+vote_option.count+`</span>
                        </span>
                    </div>
                    `)
                }
            },
            error:function(a, b){
                console.log(b.responseText);
            }
        }
        if(1 == 2 && $('.voting_form').hasClass('.o_form_readonly'))
        {
            var voting_id = $('.voting_id');
            options.data.voting_id = voting_id;
            console.log(options);
//            $.ajax(options);
        }
    }
    get_results();

    (function($) {
        let voting_id = $('.voting_id').html();
        let user_answer = '';
        options = {
            url : 'votinganswer',
            data : {'voting_id' : voting_id},
            success : function(data){
                        if (data != ''){
                            $('.voting_choice_container:first .'+data).prop('checked', true)
                        }
                     },
            error : function(a, b){
                        console.log(b.responseText)
                    }
        };
        $.ajax(options);
    })($);



    $('.voting_choice_container:first input[type="radio"]').change(function(){
        let voting_id = $('.voting_id').html();
        let user_id = $('.user_id').html();
        let user_choice = $('input:checked').val();
//        console.log('Voting ID :' + voting_id + ' User ID :' + user_id + ' User Choice :' + user_choice)

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
        //console.log(options);
        $.ajax(options);
    });

    $('.voting_opt_yes strong').click(function(){
	    $('.voting_yes').prop("checked", true);
	    $('.voting_yes').change();
    });

    $('.voting_opt_no strong').click(function(){
	    $('.voting_no').prop("checked", true);
	    $('.voting_no').change();
    });

    $('.voting_opt_abstain strong').click(function(){
	    $('.voting_abstain').prop("checked", true);
	    $('.voting_abstain').change();
    });

    $('.approval_opt_approve strong').click(function(){
	    $('.approval_approve').prop("checked", true);
	    $('.approval_approve').change();
    });

    $('.approval_opt_reject strong').click(function(){
	    $('.approval_reject').prop("checked", true);
	    $('.approval_reject').change();
    });

    //console.log($('.voting_options-container').length, 34423);
    if($('.voting_options-container').length == 0)
        return;
    $('.voting_options-container input').click(function(){
        // console.log('You clicked input tag')
        var val = $('.voting_options-container input:checked').next().html();
        $('.user_choice').val(val);
    });

    $('.voting_form').submit(function(e){

        e.preventDefault();
        var options = {
            url : '/voting/submit',
            data : {user_answer : $('.user_choice').val(), voting_id : $('.voting_id').val()},
            success:function(data){
                console.log(data);
                $('.voting_form').hide();
                $('.voting_back').show();
                $('#votingBack').show();
                $('#submitted').show();
            },
            error:function(a, b){
                console.log(b.responseText);
            }
        }
        console.log(options);
        $.ajax(options);
    });

})
