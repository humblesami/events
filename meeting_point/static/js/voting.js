$(function(){
//    $('#votingBack').hide();
    $('#submitted').hide();
    $('.viewGraphically:first').css('background-color','#875A7B');

    try{
        var voting_id_dom = $('a[name="voting_type_id"]:first');
        voting_id_dom.removeAttr('href').removeAttr('name');
        var voting_id_html = voting_id_dom[0].outerHTML;
        voting_id_dom.parent().html(voting_id_html);
    }
    catch(er)
    {
        console.log(34444);
    }
    var discussion_enabled = false;
    var signature_required = false;


    function show_results(data)
    {
        var vote_options_dom = '';
        $('.vote_options:first').html('');
        //console.log(111, data);
        var my_status = data.my_status;
        signature_required = data.signature_required;
        var vote_options_container = $('.vote_options:first');

        $(`<div><button class="btn btn-sm btn btn-primary btn-sm ">Decline
                                                </button></div>`);
        if(data.my_status)
        {
            for(var i in data.vote_options)
            {
                var option = data.vote_options[i];
                vote_options_dom = '<div><button data-id='+option.id+' class="btn btn-sm btn btn-primary btn-sm ">';
                vote_options_dom += option.name+'</button></div>';
                vote_options_dom = $(vote_options_dom);
                vote_options_container.append(vote_options_dom);
                if(my_status == option.name)
                    vote_options_dom.find('button').prepend('<i class="fa fa-check fa-lg" style="color:white"/>');
            }
            vote_options_container.find('button').click(on_user_answer);
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
        var agi =-2
        if (odoo.session_info.user){
            var my_groups = odoo.session_info.user.groups;
            agi = my_groups.indexOf('MeetingPoint / Admin');
        }
//        var my_groups = odoo.session_info.user.groups;
//        var agi = my_groups.indexOf('MeetingPoint / Admin');

        if(agi > -1 || data.public)
        {
            $('.results_container').show();
            $('.viewGraphically:first').attr('href',$('.graphical_view_url').text());
        }


        if($('.app-com').length)
        {
            $('.app-com:first:visible')
            {
                load_angular(function(){
                    window["loadComponent"]("comments","app-comments");
                });
            }
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

         setTimeout(function(){
            if($('#voter').length == 1)
            {
                var voting_id = $('.voting_id');
                options.data.voting_id = parseInt( $('.voting_id')[0].value);
                dn_rpc_ajax(options);
            }
        }, 100);
    }
    get_results();

    function on_user_answer(){
        if(signature_required)
        {

        }
        var input_choice = $(this);
        let voting_id =0
        if  ($('.voting_id')[0].value)
        {
            voting_id = $('.voting_id')[0].value
        }
        else{
          voting_id =  $('.voting_id').html();
        }
//        let voting_id = $('.voting_id').html();
        let user_choice = input_choice.attr('data-id');
        let voting_data = {'voting_option_id' : user_choice, 'voting_id' : voting_id};
//        console.log(voting_data);
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