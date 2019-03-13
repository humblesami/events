$(function(){
    console.log($('.voting_options-container').length, 34423);
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
            },
            error:function(a, b){
                console.log(b.responseText);
            }
        }
        console.log(options);
        $.ajax(options);
    });
})
