(function(){
    var wl = window.location;
    var wl_str = wl.toString();
    var is_local_host = false;
    var time_out_session = undefined;
    var session_time_limit = 1800000;
    if(wl.toString().indexOf('localhost') > -1)
    {
        is_local_host = true;
    }
    function refreshSession() {
        if(is_local_host)
        {
            //return;
        }
        if(time_out_session)
        {
            clearTimeout(time_out_session);
        }
        time_out_session = setTimeout(function() {
            site_functions.go_to_login();
        }, session_time_limit);
    }
    var current_user = window['current_user'] = {
        cookie: {
            token: "",
            name: "",
            id: undefined,
            photo: false
        },
        socket: {},
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        onLogin: function(data) {
            current_user.cookie = data;
            data = JSON.stringify(data);
            localStorage.setItem('user', data);
            refreshSession();
            localStorage.setItem('last_activity', Date());
            $('body').removeClass('public').addClass('user');
            $('.popup.messenger').hide();
        },
        logout: function(navigate) {
            if(!current_user.cookie)
            {
                return;
            }
            if(window.location.toString().indexOf('login') == -1)
            {
                $('body').hide();
                $('body').removeClass('user').addClass('public');
            }
            localStorage.removeItem("user");
            current_user.cookie = undefined;
            if (window['socket_manager']) {
                window['socket_manager'].is_admin = false;
                window['socket_manager'].close_socket();
                window['socket_manager'].user_data = undefined;
            }
            bootbox.hideAll();
        },
        initUserDataFromCookie: function() {
            var user_info = localStorage.getItem("user");
            try {
                if (user_info) {
                    user_info = JSON.parse(user_info);
                    current_user.cookie = user_info;
                }
            } catch (er) {
                console.log(er);
            }
        }
    };
    window['add_user_class'] = function(){
        $('body').removeClass('public').addClass('user');
    }
    function verifyUserToken() {
        var public_route = is_public_route();
        if(public_route)
        {
            $('body').removeClass('user').addClass('public');
            return;
        }
        var user_cookie = localStorage.getItem('user');
        if (user_cookie) {
            // if(window.location.hostname != 'localhost')
            {
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
                    if(diff > 3)
                    {
                        go_to_login();
                        return;
                    }
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

    function is_public_route(url){
        if(!url)
        {
            url = get_path_name();
        }
        let public_routes = ['/user/login','/user/forgot-password','/user/reset-password', '/login','/forgot-password', '/logout','/reset-password', '/token-sign-doc'];
        for (var i in public_routes)
        {
            if (url.startsWith(public_routes[i]))
            {
                localStorage.removeItem('user');
                $('body').removeClass('user').addClass('public');
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
        // console.log(788);
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
    window['auth_js'] = {
        go_to_login: go_to_login,
        is_public_route: is_public_route
    }
    verifyUserToken();
})()