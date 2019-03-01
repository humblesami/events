function dn_rpc_object(options) {
    //console.log(111, options.url, options);
    // if(!navigator.onLine)
    // {
    //     bootbox.alert("You are offline");
    //     return;
    // }

    var api_url = options.url;
    api_url = api_url.replace('-json', '');
    var req_url = site_config.server_base_url + api_url;
    var input_data = {};
    if (options.data) {
        input_data = options.data;
        if (input_data.no_loader)
            options.no_loader = 1;
    }

    input_data['db'] = site_config.server_db;
    if (!input_data.token)
        input_data['token'] = dn_current_site_user.cookie.token;
    if (!input_data['token'] && req_url.indexOf('authenticate') == -1 && !window['odoo']) {
        console.log("No token found");
        return;
    }
    var uid = dn_current_site_user.cookie.id;
    if (uid)
        input_data['uid'] = uid;
    input_data['time_zone'] = dn_current_site_user.time_zone;

    //console.log(input_data);
    if (input_data.no_loader)
        options.no_loader = 1;
    options.data = input_data;
    options.dataType = 'json';
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
            if (site_config.show_logs.includes('ajax_before'))
            {
                console.log(url_with_params);
            }
            if (options.onSuccess) {
                if (response.error) {                    
                    if (response.error.indexOf('oken not valid') > -1 || response.error.indexOf('please login') > -1) {                        
                        bootbox.alert('Token expired, please login again');
                        dn_current_site_user.logout(1);
                    } else if (response.error.indexOf('not allowed to access') > -1) {
                        bootbox.alert("Contact admin for permissions" + response.error);
                    } else if (options.onError) {
                        console.log(response.error);
                        options.onError(response.error);
                    } else {
                        if (typeof response.error == 'string')
                            bootbox.alert(response.error);
                        console.log(response.error);
                        //alert(response.error);
                    }
                } else {
                    if (response.data)
                        response = response.data;
                    if (options.onSuccess) {
                        options.onSuccess(response);
                        if (site_config.show_logs == 'ajax_success')
                            console.log(response.data);
                    } else {
                        console.log(response.data);
                    }
                }
            } else {
                if (response.error) {
                    console.log(response.error);
                } else if (response.data) {
                    console.log(response.data);
                } else {

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