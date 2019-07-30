(function(){
    $('.Login-form-wrapper img').each(function(i, el){
        $(el).attr('src', $(el).attr('src_url'));
    });

    $('.login-form:first input').keyup(function(){
        $(this).find('.login-feedback').html('');
    });
    $('.login-form:first').submit(function(e){
        e.preventDefault();
        var form  = $(this);
        form.find('button[type="submit"]:first').attr('disabled', 'disabled');
        var input_data = {
            args:{
                app: 'authsignup',
                model: 'AuthUser',
                method: 'login_user',
            },
            params: {
                login: form.find('#username').val(),
                password: form.find('#password').val(),
            }
        }
        form.find('.login-feedback').html('');
        var options = {
            url: '/rest/public',
            data: input_data
        }
        options.onSuccess = function(data){
            form.find('button[type="submit"]:first').removeAttr('disabled');
            if(data == 'done')
            {
                window.location = '/accounts/verify-auth-code';
            }
            else
            {
                dn_current_site_user.onLogin(data);
                window.location = "/";
            }
        };
        options.type = 'get';
        options.onError = function(data){
            form.find('button[type="submit"]:first').removeAttr('disabled');
            form.find('.login-feedback').html(data);
        };
        options.onComplete = function(data){
            console.log(4444);
            form.find('button[type="submit"]:first').removeAttr('disabled');
        };
        window['dn_rpc_object'](options);
    })
})()
