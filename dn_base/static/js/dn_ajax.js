dn_base_web_url = window.location.origin + '';
var site_loaderContainer = undefined;
var dn_json_rpc_object = {
    showHideLoader:function(show_it){
        if (!dn_json_rpc_object.initialized)
            dn_json_rpc_object.init();
        if(!show_it)
            site_loaderContainer.hide();
        else
        {
            if(!site_loaderContainer)
            {
              //  console.log(45343);
                $('#loaderContainerajax').show();
            }
            else{
                //console.log(453431334445);
                site_loaderContainer.show();
            }

            setTimeout(function(){
                if(site_loaderContainer)
                    site_loaderContainer.hide();
            }, 6000);
        }
    },
    baseUrl: dn_base_web_url,
    showLoader: true,
    initialized:false,
    loaderImage: undefined,
    menuHeightToAdd : undefined,
    init: function (config) {
        if (!site_loaderContainer) {
            if($('body').length > 0)
            {
                if($('#loaderContainerajax').length == 0)
                {
                    site_loaderContainer = $('<div id="loaderContainerajax" style="position: fixed;z-index: 9009;top:0;left;0;height:100vh;width:100%;background: rgb(0, 0, 0);opacity:0.2"/>');
                    dn_json_rpc_object.loaderImage = $('<img style="position:relative; top:calc(50vh - 44px);left:calc(50vw - 22px);   animation: fa-spin 1s infinite steps(12);" src="/web/static/src/img/spin.png" alt="loading data..." />');
                    site_loaderContainer.append(dn_json_rpc_object.loaderImage);
                    $('body').append(site_loaderContainer);
                }
                else
                {
                    site_loaderContainer = $('#loaderContainerajax');
                }
            }
        }
        if (config && config.baseUrl)
            dn_json_rpc_object.baseUrl = config.baseUrl;
        initialized = true;
    },

    request: function (reqfun, input_data, callback, failureCallBack) {
        var serviceRequestInProgress = false;
        if (serviceRequestInProgress) {
            //sam_popup.show("Some Request Already In Progress", "ok");
            return;
        }
        serviceRequestInProgress = true;

        //sam_popup.hide();

        var requestUrl = dn_json_rpc_object.baseUrl + reqfun;
        if(reqfun.indexOf('http'))
            requestUrl = reqfun;

        if (dn_json_rpc_object.showLoader) {
            dn_json_rpc_object.showHideLoader(true);
            setTimeout(function(){
                site_loaderContainer.hide()
            }, 6000);
        }

        $.ajax({
            url: requestUrl,
            data: input_data,
            dataType: 'JSON',
            type:'POST',
            beforeSend: function (jqXHR, settings) {
//                var this_req_url = settings.url;
//                if(!this_req_url.startsWith(dn_json_rpc_object.baseUrl))
//                    this_req_url = dn_json_rpc_object.baseUrl + this_req_url;
//                console.log(this_req_url);
//                jqXHR.abort();
            },
            success: function (results) {
                serviceRequestInProgress = false;
                dn_json_rpc_object.handleResponse(results, reqfun, callback, failureCallBack);
            },
            error: function (results) {
                console.log("Error in "+reqfun, results);
                serviceRequestInProgress = false;
                if(results.statusText == "OK")
                {
                    if(callback)
                        callback(results.responseText);
                    return;
                }
                if(results && results.responseText)
                    results = results.responseText;
                dn_json_rpc_object.handleError(results, reqfun, failureCallBack);
            },
            complete:function(){
                site_loaderContainer.hide();
                dn_json_rpc_object.showHideLoader();
            }
        });
    },

    handleError: function (res, reqfun, failureCallBack) {
        if(failureCallBack)
        {
            failureCallBack(res);
        }
        else if (!res)
            bootbox.alert("Invalid Request Response in function reqfun ");
        else
            bootbox.alert(res + "");
    },

    handleResponse: function (res, reqfun, callback, failureCallBack) {
        var error_message = '';
        if (res == undefined) {
            error_message ="Url hit successful but Invalid Request Response in "+ reqfun;
            bootbox.alert(error_message);
            return;
        }
        if (res.error == undefined) {
            error_message ="Url hit successful but error not defined  in "+ reqfun;
            bootbox.alert(error_message);
            return;
        }
        else
            res.error += "";
        if (res.error.length > 0) {
            if (failureCallBack)
                failureCallBack(res.error);
            else {
                error_message =res.error;
                bootbox.alert(error_message);
            }
            return;
        }
        if (res.data == undefined) {
            if (res.message == undefined) {
                error_message ="Undefined data and message " + reqfun;
                bootbox.alert(error_message);
                return;
            }
            if (res.message.length == 0) {
                error_message ="Undefined data and no message in function "+ reqfun;
                bootbox.alert(error_message);
                return;
            }
        }

        if (res.message != undefined && res.message.length > 0) {
            if (res.message.length != 7 && res.message.toLowerCase() != "success")
                bootbox.alert(res.message);
        }
        if (callback != undefined)
            callback(res.data);
    }
};

function dn_json_rpc(url,input_data,callback, failureCallBack)
{
    var ajaxUrl = dn_base_web_url+url;
    dn_json_rpc_object.request(url, input_data, callback, failureCallBack)
}
function dn_rpc_object(reqObject)
{
    var reqfun = reqObject.url;
    var input_data =reqObject.data;
    var callback = reqObject.onSuccess;
    if(!callback && reqObject.success)
        callback = reqObject.success;
    var failureCallBack = reqObject.onError;
    if(reqObject.no_loader)
        dn_json_rpc_object.showLoader = false;
    else
        dn_json_rpc_object.showLoader = true;
    dn_json_rpc_object.request(reqfun, input_data, callback, failureCallBack)
}
function dn_rpc_ajax(reqObject)
{
    var reqfun = reqObject.url;
    var input_data =reqObject.data;
    var callback = reqObject.onSuccess;
    if(!callback && reqObject.success)
        callback = reqObject.success;
    var failureCallBack = reqObject.onError;
    if(reqObject.no_loader)
        dn_json_rpc_object.showLoader = false;
    else
        dn_json_rpc_object.showLoader = true;
    dn_json_rpc_object.request(reqfun, input_data, callback, failureCallBack)
}