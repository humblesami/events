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
    console.log(input_data);
    if (input_data.no_loader)
        options.no_loader = 1;

    var ajax_user = window['current_user'];    

    //console.log(input_data);
    if (input_data.no_loader)
    {
        options.no_loader = 1;
    }
    // if(ajax_user.cookie)
    // {
    //     input_data["auth_token"] = ajax_user.cookie.token;
    // }
    
    var args_data = {input_data : JSON.stringify(input_data)};
    // options.headers = {
        
    // }
    // if(ajax_user.cookie && ajax_user.cookie.token)
    // {
    //     options.headers ['Authorization'] = 'Token '+ajax_user.cookie.token;            
    // }
    // else if(api_url.endsWith('/secure'))
    // {
    //     console.log(ajax_user.cookie, ' Invalid token for', input_data.args);
    //     window['functions'].go_to_login();
    //     return;
    // }

    options.data = args_data;
    options.dataType = 'json';
    if(req_url.indexOf('localhost')> -1)
    {
        if(input_data.args && input_data.args.post)
        {
            options.type = 'POST';
        }
        else
        {            
            options.type = 'GET';
        }
    }
    else
    {
        options.type = 'POST';
    }
    //options.contentType = "application/json; charset=utf-8";    

    options.url = req_url;
    options.timeout = 30000;

    var url_with_params = 'Nothing';
    options.beforeSend = function(a, b) {
        url_with_params = b.url.toString();
        if(site_config.trace_request)
        {
            if(api_url == '/rest/secure')
            {
                url_with_params = url_with_params.replace('rest/secure','rest/secure1');
            }
            if(url_with_params.length < 1500)
            {
                console.log(url_with_params, input_data.args);    
            }
            else{
                console.log(input_data.args);
            }
        }
        // if (!options.no_loader)
        //     showLoader("ajax" + api_url);
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
                console.log(response);
            }
        }
        else {
            if(!response.error)
            {
                response.error = response;
            }            

            handleError(response);
        }
    };
    options.complete = function() {
        if (options.onComplete)
            options.onComplete();
        // if (!options.no_loader)
            // site_functions.hideLoader("ajax" + api_url);        
    };
    options.error = function(err) {                
        if(err.responseText == '{"detail":"Invalid token."}' || 
            err.responseText == '{"detail":"Authentication credentials were not provided."}')
        {
            console.log(input_data.args.method + ' needs login to be accessed');
            // window['functions'].go_to_login();
            return;
        }
        else
        {
            if (err.statusText =='OK')
            {                            
                err = {
                    error: err.responseText
                }     
                handleError(err);       
            }
            else{
                console.log('Api failed to reach');
            }
        }
    };


    function handleError(response)
    {
        if(response.error && response.error.data)
        {
            console.log(response.error.data);
            response.error = response.error.message;
        }
        if (response.error.indexOf('oken not valid') > -1 || response.error.indexOf('please login') > -1) {                        
            bootbox.alert('Token expired, please login again '+ options.url);
            window['functions'].go_to_login();
            return;
        } else if (response.error.indexOf('not allowed to access') > -1) {
            bootbox.alert("Contact admin for permissions" + response.error);
        } else {                                
            if(response.error.indexOf('Unauthorized') > -1)
            {
                window['functions'].go_to_login();
                return;
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
        }
        console.log(input_data.args);
        if(options.type == 'GET' && url_with_params.length < 1500)
        {
            console.log(url_with_params);
        }
        response.error = response.error.replace(/<br\/>/g, "\n");
        console.log(response.error);
    }
    console.log(options,12435);
    $.ajax(options);
}
$(function(){
    var container = $('#container');
    if(container.length > 0)
    {
        if(self != top)
        {
            container.css('overflow-x', 'hidden');    
        }
    }    
});
var showLoader = function(nam) {
    if(!server_wait_loader)
    {
        server_wait_loader = window['loader'];
        if(!server_wait_loader)
        {
            return;
        }            
    }
    var obj_this = this;
    var time_out = undefined;
    if (obj_this.processes.length == 0) {
        server_wait_loader.show();
        server_wait_loader.shown = 1;
        time_out = setTimeout(function() {
            obj_this.hideLoader(nam);
        }, 29000);
    }
    obj_this.processes.push({
        name: nam,
        time_out: time_out
    });
    //console.log(nam, new Date().getMilliseconds());
}
var hideLoader = function(nam, hiddenFrom) {
    if(!server_wait_loader){
        server_wait_loader = window['loader'];
        if(!server_wait_loader)
        {
            return;
        } 
    }
    if (!nam || nam == 'force') {
        this.processes = [];
        if (!nam)
            console.trace();
        else if (nam != 'force')
        {
            console.log("Force hidden from " + hiddenFrom);
        }
        server_wait_loader.hide();
        server_wait_loader.shown = 0;
    }
    if (this.processes.length == 0) {
        //console.log("Already removed "+nam);
        return;
    }
    var found = false;
    for (var i = this.processes.length - 1; i >= 0; i--) {
        if (this.processes[i].name == nam) {
            found = true;
            clearTimeout(this.processes[i].time_out);
            this.processes.splice(i, 1);
            break;
        }
    }
    if (found) {
        //console.log(this.processes, " removed "+ nam);
    } else {
        console.log(nam + " not found");
    }
    if (this.processes.length == 0) {
        server_wait_loader.hide();
    }
    //console.log(nam, new Date().getMilliseconds());
}
window['dn_rpc_object'] = dn_rpc_object;