(function(){
    var wl = window.location;
    var wl_str = wl.toString();
    window['add_user_class'] = function(){
        $('body').removeClass('public').addClass('user');
    }
    function verifyUserToken() {
        var public_route = window['js_utils'].is_public_route();
        if(public_route)
        {
            $('body').removeClass('user').addClass('public');
            return;
        }
        var user_cookie = localStorage.getItem('user');
        if (user_cookie) {
            var last_activity = localStorage.getItem('last_activity');
            if(!last_activity)
            {
                go_to_login();
                return;
            }
            else{
                var time_now = new Date();
                last_activity = new Date(last_activity);
                var diff = (time_now - last_activity) /1000;
                // console.log('Last activity', diff, window.location.hostname, Date());
                if(window.location.hostname != 'localhost' && diff > 30)
                {
                    go_to_login();
                    return;
                }
            }
            user_cookie = JSON.parse(user_cookie);
            if (user_cookie.token) {
                var error = undefined;
                var ajax_options = {
                    url: site_config.server_base_url + '/user/verify-token',
                    async: false,
                    headers: {
                        Authorization:
                        'Token '+user_cookie.token
                    },
                    error: function(er){
                        if(er.responseJSON)
                        {
                            er = er.responseJSON.detail;
                        }
                        error = er;
                        console.log(er);
                    },
                    complete:function(){
                        // console.log(error, public_route);
                        if(!error)
                        {
                            localStorage.setItem('last_activity', Date());
                            window['add_user_class']();
                        }
                        else{
                            go_to_login();
                            return;
                        }
                    }
                }
                $.ajax(ajax_options);
            }
            else{
                go_to_login();
            }
        }
        else
        {
            go_to_login();
        }
    }
        
    function go_to_login() {
        localStorage.removeItem('user');
        $('body').removeClass('user').addClass('public');
        if(!wl_str.endsWith('login'))
        {
            if(wl_str.indexOf('4200') == -1)
            {
                window.location = window['site_config'].server_base_url+'/user/login';
            }
            else{
                window.location = '/#/login';
            }
        }
    }
    verifyUserToken();
})()