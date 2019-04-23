$(function(){  
    var option_id   , option_name;
    var sign_data;
    function get_results(options_id, option_name, sign_data){
        var pathName = window.location.pathname;
        if (pathName.indexOf('admin') != -1){
            pathName = pathName.replace('admin/voting/voting','voting');
            pathName = pathName.replace('/change/','');
        }
        var options = {
            url : pathName + '/answer',
            data : {
                answer_id: options_id,
                signature_data: sign_data
            },
            success:function(data){
                // console.log(data);
                if (!(option_name)){
                    $('.fa-check').remove();
                    var obj = {};
                    try{
                        obj = JSON.parse(data);
                    }
                    catch(er){
                        console.log(er);
                        return;
                    }
                    var obj = JSON.parse(data);
                    $('.' + obj.answer).prepend('<i class="fa fa-check fa-lg" style="color:white"/>');    
                    window['sign_data'] = obj.signature_data;
                    img_src ='data:image/png;base64,' + obj.signature_data;
                    if($('[name=signature_required]').prop('checked'))
                    {
                        $('.voting-options-container').append('<div><img src="'+img_src+'" class="user-sign" height="150px" width="150px" /></div>')
                    }
                    else
                    {
                        $('.user-sign').hide();
                        
                    }

                }
                else
                {
                    $('.fa-check').remove()
                    $('.' + option_name).prepend('<i class="fa fa-check fa-lg" style="color:white"/>');
                    // $('.voting-options-container').hide();                    
                    window.location = '';
                }
            }
        }
        $.ajax(options);
    }
    get_results();

    $("button").click(function(e){
        e.preventDefault();
        console.log(434);
        option_id = $(this).attr('data-id');
        option_name = $(this).text();
        var pathName = window.location.pathname;
        if (pathName.indexOf('admin') != -1){
            pathName = pathName.replace('admin/voting/voting','voting');
            pathName = pathName.replace('/change/','');
            pathName += '/signature'
        }
        config={
            url: pathName,
            fieldName: 'signature_data',
            save_now: false,
            signature: window['sign_data'],
            callBack: function(data){
                $('.fa-check').remove()
                console.log(data);
                get_results(option_id, option_name, data);
            }
        }
        if($('[name=signature_required]').prop('checked'))
        {
            init_sign(config)
            $('#signModal').modal('show');        
            return;
        }
        else
        {
            $('.user-sign').hide();
            $('.fa-check').remove()
            get_results(option_id, option_name, '');
        }
        
        option_id = $(this).attr('data-id');
        option_name = $(this).text();
        if (!($(this).hasClass('public-visibility')))
        {
            if($('[name=signature-required]').length > 0)
            {
                let result = confirm('Signature is required...');
                if (result)
                {
                    $('.fa-check').remove();
                    
                    get_results(option_id, option_name);        
                }
            }
            else
            {   
                $('.fa-check').remove();
                get_results(option_id, option_name);
            }
        }
    });

    

})