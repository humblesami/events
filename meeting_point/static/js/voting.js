$(function(){
//    $('#votingBack').hide();
    $('#submitted').hide();
    $('.viewGraphically:first').css('background-color','#875A7B');
    let sign_src = $('img[name=signature_data]').attr('src');
    $('#drawsign').hide();
    $('img[name=signature_data]').hide();
    if(sign_src && sign_src.length != 0 && sign_src.indexOf('placeholder') == -1){
        console.log(sign_src);
        sign_src += new Date();
        console.log(sign_src);
        $('img[name=signature_data]').attr('src', sign_src);
        $('img[name=signature_data]').show();
        let signature_required = $('.signature_required');
        if (signature_required.length > 0 && signature_required.text().indexOf('OnSwitch') != -1)
        {
            $('#drawsign').show();
        }
    }
    try{
        var voting_id_dom = $('a[name="voting_type_id"]:first');
        voting_id_dom.removeAttr('href').removeAttr('name');
        var voting_id_html = voting_id_dom[0].outerHTML;
        voting_id_dom.parent().html(voting_id_html);
    }
    catch(er)
    {

    }
    var discussion_enabled = false;
    var signature_required = false;
    var voting_id = false;
    var on_load = true;

    var signature_lib = {
        save_input : {
            voting_id: $('.voting_id').html(),            
        },
        fetch_input :{
            voting_id : $('.voting_id').html()
        },
        fetch_url : 'voting/get_signature',
        save_url : 'voting/submit',
        signature_field: 'signature_data',
        last_option: 'nothing',
        on_sign_saved: function(data){            
            $('.vote_options:first').find('button').children().remove();            
            $('.vote_options:first').find('button[data-id="'+data.voting_option_id+'"]').prepend('<i class="fa fa-check fa-lg" style="color:white"></i>')
            console.log(data);
        }
    }        

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
            if(on_load)
            {
                onload = false;
                if(!data.signature_required)
                    vote_options_container.find('button').click(on_user_answer);
                else           
                {                  
                    vote_options_container.find('button').click(function(){
                        let close_date = $('.close_date').text();
                        let open_date = $('.open_date').text();
                        if(!voting_opened(open_date))
                        {
                            if (!voting_closed(close_date))
                            {
                                voting_option_id = $(this).attr('data-id');
                                signature_lib.save_input['voting_option_id'] = voting_option_id;
                                if($(this).children().length == 0)
                                    include_signs();
                            }
                            else
                            {
                                alert('This Approval/Voting is Closed.')
                            }
                        }
                        else
                        {
                            alert('This Approval/Voting is not Opened yet.')
                        }
                    });                    
                }                             
            }            
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

    (function(event) {
        if (window.top == window){
            $('.navbar-static-top').show();
        }
        else
        {
            $('.navbar-static-top').hide();
        }
    })()

    function voting_closed(close_date){
		let closed = false;
		let closingDate = new Date(close_date).getTime();
		let dateNow = new Date().getTime();
		if (closingDate < dateNow){
			closed = true;
		}
		return closed;
	}

	function voting_opened(open_date){
		let opened = false;
		let openingDate = new Date(open_date).getTime();
		let dateNow = new Date().getTime();
		if (openingDate > dateNow){
			opened = true;
		}
		return opened;
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
                voting_id = $('.voting_id');
                options.data.voting_id = parseInt(voting_id.html());
                dn_rpc_ajax(options);
            }
        }, 100);

         setTimeout(function(){
            if($('#voter').length == 1)
            {
                voting_id = $('.voting_id');
                options.data.voting_id = parseInt( $('.voting_id')[0].value);
                dn_rpc_ajax(options);
            }
        }, 100);
    }
    get_results();

    
    
    function include_signs(current_option)
    {
        doc_preview.image('1');
        var body = $('.youtubeVideoModal .modal-body:last');
        var content = $('.youtubeVideoModal .modal-content:last');
        var footer = $('<div class="modal-footer"></div>');
        var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');

        $('.youtubeVideoModal .modal-footer').html("");
        $('.youtubeVideoModal .modal-dialog').removeClass('modal-lg');
        $('.youtubeVideoModal .modal-footer').hide();
        var signature_editor = $('<div id="signature_editor"></div>');


        var clear_btn = $('<span class="btn btn-danger btn-sm DocsBtn">Clear</span>');
        var draw_sign_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Draw</span>');
        var upload_btn = $('<input accept=".jpg,.png,.jpeg" style="display:none" type="file"></input>');

        var auto_sign = $('<span class="btn btn-primary btn-sm DocsBtn">Auto</span>');
        var top_div = $('<div class="DocsButtonWrapper"></div>');
        var upload_clicker = '<button class="btn btn-sm btn-primary DocsBtn o_select_file_button"';
        upload_clicker += ' title="Select" type="button">Upload</button>';
        upload_clicker = $(upload_clicker);

        upload_clicker.click(function() {
            upload_btn.click();
        });

        top_div.append(draw_sign_btn).append(upload_clicker).append(auto_sign).append(upload_btn);
        body.append(signature_editor);
        signature_editor.before(top_div);
        signature_editor.after(clear_btn);
        clear_btn.after(save_btn);

        //$('.youtubeVideoModal .modal-content').css({'width':'370px','margin-left': '19%'});        
        signature_editor.signature();        

        var myCanvas = signature_editor.find('canvas')[0];
        var canvas_context = myCanvas.getContext('2d');
        var img = new Image();
        img.onload = function() {
            canvas_context.drawImage(img, 0, 0, signature_editor.width(), signature_editor.height());
        };
        
        var dataURL = '';

        function load_signature(data) {
            if(data.error)
            {
                console.log(data.error);
                return;
            }
            else
            {
                data = data.data;
            }
            signature_editor.signature();
            signature_editor.signature('clear');
            var signature_value = data[signature_lib.signature_field];
            if (signature_value && signature_value.length > 0 && signature_value != "") {
                dataURL = 'data:image/png;base64,' + signature_value;
                //                    hidden_image.attr('src',dataURL);
                img.src = dataURL;
            }
            if(signature_lib.on_sign_fetched)
            {
                signature_lib.on_sign_fetched();
            }
        }

        function get_signature(){
            var input_data = signature_lib.fetch_input;
            if(!input_data)
            {                
                return;
            }
            if(input_data == 'silent')
            {
                return;
            }
            $.ajax({
                url: signature_lib.fetch_url,
                data: input_data,
                dataType:'JSON',
                success: load_signature,
                error:function(e){
                    console.log(e);
                }
            });
        }
        get_signature();

        function save_signature(el_btn, auto){
            var type = "draw";
            dataURL = myCanvas.toDataURL();
            var empty_url = "data:image/png;base64,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"
            if (dataURL == empty_url) {
                alert('Draw signature');
                return;
            }
            dataURL = dataURL.replace('data:image/png;base64,', '');
            var input_data = signature_lib.save_input;
            input_data[signature_lib.signature_field] = dataURL;
            if(auto)
            {
                input_data['type'] = 'auto';
            }
            $.ajax({
                type:'POST',
                url: signature_lib.save_url,
                data:input_data,
                dataType:'JSON',
                success: on_anwser_saved,
                error:function(e){
                    console.log(e);
                }
            });
            $('#drawsign').show();
        }
        function on_anwser_saved(data){            
            if(data.error)
            {
                console.log(data.error);
                return;
            }
            else
            {
                data = data.data;
            }
            $('.youtubeVideoModal').modal('hide');
            if(signature_lib.on_sign_saved)
            {                
                signature_lib.on_sign_saved(data);
            }
//            web_client.do_action({
//                            type: 'ir.actions.act_window',
//                            res_model: 'meeting_point.voting',
//                            res_id: parseInt(signature_lib.save_input.voting_id),
//                            view_mode: 'form',
//                            views: [[true, 'form']],
//                            context: {'form_view_initial_mode': 'browse', 'force_detailed_view': 'true'},
//                            target: 'current'
//                         });

            let sign_src = $('img[name=signature_data]').attr('src');
            $('img[name=signature_data]').hide();
//            if(sign_src.length != 0 && sign_src.indexOf('placeholder') == -1){
                img_src = "data:image/png;base64," + data.signature_data;
                console.log(img_src);
//                sign_src += new Date();
                console.log(img_src);
                $('img[name=signature_data]').attr('src', img_src);
                $('img[name=signature_data]').show();
//            }
        }

        save_btn.click(save_signature);

        auto_sign.click(function(e) {
            save_signature(this, 'auto');
        });

        upload_btn.change(function() {
            if (!this.files)
                return;
            if (this.files.length < 1)
                return;
            var file_tag = this;
            var reader = new FileReader();
            auto_clicked = false;

            var upload_file = this.files[0];
            reader.readAsDataURL(upload_file);
            reader.onload = function() {
                var dataURL = reader.result;
                canvas_context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                img.src = dataURL;
            }
        });                

        clear_btn.click(function() {
            signature_editor.signature('clear');
        });

        draw_sign_btn.click(function() {
            signature_editor.signature('clear');
        });

        var b =1;
    }

    function on_user_answer(){
        let close_date = $('.close_date').text();
        let open_date = $('.open_date').text();
        if (voting_opened(open_date))
        {
            alert('This Approval/Voting is not Opened yet.');
            return;
        }
        else
        {
            if (voting_closed(close_date))
            {
                alert('This Approval/Voting is Closed now.');
            }
            else
            {
                if(signature_required)
                {
                    return;
                }
                var input_choice = $(this);
                if  ($('.voting_id')[0].value)
                {
                    voting_id = $('.voting_id')[0].value
                }
                else{
                    voting_id =  $('.voting_id').html();
                }
                let user_choice = input_choice.attr('data-id');
                let voting_data = {'voting_option_id' : user_choice, 'voting_id' : voting_id};
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
        }

    }
});

//# sourceURL=localhost:8000/meeting_point/static/js/voting.js

