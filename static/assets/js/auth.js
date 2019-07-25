(function(){
    var wl = window.location;
    var wl_str = wl.toString();
    function verifyUserToken() {
        var public_route = is_public_route();        
        if(public_route)
        {
            return;
        }     
        var user_cookie = localStorage.getItem('user');
        if (user_cookie) {
            user_cookie = JSON.parse(user_cookie);
            if (user_cookie.token) {
                var error = undefined;
                var ajax_options = {
                    url: site_config.server_base_url + '/accounts/verify-token',                    
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
                        if(!error)
                        {
                            $('body').removeClass('public').addClass('user');
                        }
                        else{
                            $('body').removeClass('user').addClass('public');
                            go_to_login();                            
                        }
                    }
                }
                $.ajax(ajax_options);
            }
            else{
                $('body').removeClass('user').addClass('public');
                go_to_login();
            }
        }
        else
        {
            $('body').removeClass('user').addClass('public');
            go_to_login();
        }    
    }
    
    function is_public_route(url){
        if(!url)
        {
            url = get_path_name();
        }
        let public_routes = ['/accounts/login','/accounts/forgot-password','/accounts/reset-password', '/login','/forgot-password', '/logout','/reset-password', '/signdoc'];
        for (var i in public_routes)
        {
            if (url.startsWith(public_routes[i]))
            {
                return true;
            }
        }
        return false;
    }
    function get_path_name() {    
        if(wl.toString().indexOf('localhost') > -1)
        {
            is_local_host = true;
        }
        if (wl.hash) {
            window['pathname'] = wl.hash.substr(1, wl.hash.length);
        } else {
            window['pathname'] = wl.toString().replace(wl.origin, '');
        }
        return window['pathname'];
    }
    function go_to_login() {    
        if(!wl_str.endsWith('login'))
        {
            if(wl_str.indexOf('4200') == -1)
            {
                window.location = window['site_config'].server_base_url+'/accounts/login';
            }
            else{
                window.location = '/#/login';
            }
        }
    }
    verifyUserToken();
})()
