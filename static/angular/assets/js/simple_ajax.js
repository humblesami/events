function dn_rpc_object(options) {
    var api_url = options.url;
    if(!api_url)
    {
        api_url = '/rest/secure';
    }
    var req_url = site_config.server_base_url + api_url;    
    if (!options.data) {
        console.log('No data and arguments for request ',options);
        return;
    }
    var input_data = options.data;
    if (input_data.no_loader)
        options.no_loader = 1;

    var ajax_user = window['current_user'];

    //console.log(input_data);
    if (input_data.no_loader)
    {
        options.no_loader = 1;
    }
    
    var args_data = {input_data : JSON.stringify(input_data)};
    options.headers = {
        
    }
    if(api_url.endsWith('/secure'))
    {
        if(ajax_user.cookie && ajax_user.cookie.token)
        {
            options.headers ['Authorization'] = 'Token '+ajax_user.cookie.token;            
        }
        else
        {
            console.log(ajax_user.cookie, ' Invalid token for', input_data.args);
            window['functions'].go_to_login();
        }
    }

    options.data = args_data;
    options.dataType = 'json';
    if(req_url.indexOf('localhost')> -1)
    {
        options.type = 'GET';
    }
    else
    {
        options.type = 'POST';
    }
    // console.log(options.type, 18);
    //options.contentType = "application/json; charset=utf-8";    

    options.url = req_url;
    options.timeout = 30000;

    var url_with_params = 'Nothing';
    options.beforeSend = function(a, b) {
        url_with_params = b.url;
        if (!options.no_loader)
            site_functions.showLoader("ajax" + api_url);
        if (options.type == 'post')
            url_with_params = options;
    };

    options.success = function(response) {
        var result = false;
        if (!response) {
            console.log("Undefined response", url_with_params);            
        } else if (response.data) {
            response = response.data;
            if (options.onSuccess) {
                try{
                    options.onSuccess(response);
                }
                catch(er)
                {
                    console.log(response, er);
                }
            } else if(site_config.show_logs.indexOf('ajax_success')){
                console.log(response.data);
            }
        }
        else {
            if(!response.error)
            {
                response.error = response;
            }

            if (response.error.indexOf('oken not valid') > -1 || response.error.indexOf('please login') > -1) {
                bootbox.alert('Token expired, please login again '+ options.url);
                ajax_user.logout(1);
            } else if (response.error.indexOf('not allowed to access') > -1) {
                bootbox.alert("Contact admin for permissions" + response.error);
            } else {
                if(options.type == 'GET')
                {
                    console.log(url_with_params);
                }

                if(response.error.indexOf('Unauthorized') > -1)
                {
                    ajax_user.logout(1);
                }
                else if(options.onError) {
                    try{
                        options.onError(response.error);
                    }
                    catch(er)
                    {
                        console.log(response.error, er);
                    }
                }
                console.log(input_data.args);
                response.error = response.error.replace('<br/>','\n');
                console.log(response.error);
            }
        }
    };
    options.complete = function() {
        if (options.onComplete)
            options.onComplete();
        if (!options.no_loader)
            site_functions.hideLoader("ajax" + api_url);
        //console.log("Comepleted " +req_url);
    };
    options.error = function(err) {        
        if (options.onError)
            options.onError(err);            
        if(err.responseText == '{"detail":"Invalid token."}' || 
            err.responseText == '{"detail":"Authentication credentials were not provided."}')
        {
            console.log(input_data.args.method + ' needs login to be accessed');
            ajax_user.logout(1);
        }
        else
        {
            console.log(err);
            console.log(input_data.args);
            console.log('Api failed ', url_with_params);
        }                
    };
    $.ajax(options);
}
window['dn_rpc_object'] = dn_rpc_object;