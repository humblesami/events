function dn_rpc_object(options) {
    var api_url = options.url;
    var req_url = site_config.server_base_url + api_url;    
    if (!options.data) {
        console.log('No data and args for request ',options);
        return;
    }
    var input_data = options.data;
    if (input_data.no_loader)
        options.no_loader = 1;

    var ajax_user = window['current_user'];
    input_data.args['db'] = site_config.server_db;
    input_data.args['time_zone'] = ajax_user.time_zone;

    //console.log(input_data);
    if (input_data.no_loader)
    {
        options.no_loader = 1;
    }
    var argsuments = input_data.args;
    
    input_data = {input_data : JSON.stringify(input_data)};
    options.data = input_data;
    options.dataType = 'json';
    options.type = 'GET',
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
        } else {            
            if (response.error) {                                    
                if (response.error.indexOf('oken not valid') > -1 || response.error.indexOf('please login') > -1) {                        
                    bootbox.alert('Token expired, please login again '+ options.url);
                    ajax_user.logout(1);
                } else if (response.error.indexOf('not allowed to access') > -1) {
                    bootbox.alert("Contact admin for permissions" + response.error);
                } else {     
                                                              
                    console.log(response.error, 1);
                    console.log(url_with_params);
                    console.log(argsuments);
                    if(response.error.indexOf('Unauthorized') > -1)
                    {
                        ajax_user.logout(1);
                    }
                    else if(options.onError) {
                        options.onError(response.error);
                    }
                }
            } else {
                if (response.data)
                    response = response.data;
                if (options.onSuccess) {
                    options.onSuccess(response);
                } else if(site_config.show_logs.indexOf('ajax_success')){
                    console.log(response.data);
                }
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
        if (!options.no_loader)
            site_functions.hideLoader("ajax" + api_url);
        console.log(url_with_params);
        console.log(err.statusText, "Error in webservice " + api_url);
    };
    $.ajax(options);
}
window['dn_rpc_object'] = dn_rpc_object;