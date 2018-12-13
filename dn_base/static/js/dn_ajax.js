try
{
    if (dntoast == undefined)
        document.writeln('<script src="/dn_base/static/js/toast.js"></script>');
}
catch(er)
{
    document.writeln('<script src="/dn_base/static/js/toast.js"></script>');
}

dn_base_web_url = window.location.origin + '';
var dn_json_rpc_object = {
        showHideLoader:function(show_it){
            if (!dn_json_rpc_object.initialized)
                dn_json_rpc_object.init();
            if(!show_it)
                dn_json_rpc_object.loaderContainer.hide();
            else
            {
                dn_json_rpc_object.loaderContainer.show();
                 setTimeout(function(){
                    dn_json_rpc_object.loaderContainer.hide();
                }, 6000);
            }
        },
        baseUrl: dn_base_web_url,
        showLoader: true,
        initialized:false,
        loaderContainer: undefined,
        loaderImage: undefined,
        menuHeightToAdd : undefined,
        init: function (config) {
            if (!dn_json_rpc_object.loaderContainer) {
                if($('body').length > 0)
                {
                    dn_json_rpc_object.loaderContainer = $('<div id="loaderContainerajax" style="position: fixed;z-index: 9009;top:0;left;0;height:100vh;width:100%;background: rgb(0, 0, 0);opacity:0.2"/>');
                    dn_json_rpc_object.loaderImage = $('<img style="position:relative; top:calc(50vh - 44px);left:calc(50vw - 22px);   animation: fa-spin 1s infinite steps(12);" src="/web/static/src/img/spin.png" alt="loading data..." />');
                    dn_json_rpc_object.loaderContainer.append(dn_json_rpc_object.loaderImage);
                    $('body').append(dn_json_rpc_object.loaderContainer);
                }
            }
//            if(!dn_json_rpc_object.menuHeightToAdd)
//            {
//                var menu = $('.o_main_navbar:first');
//                if(menu.length>0)
//                {
//                    if(dn_json_rpc_object.loaderContainer)
//                    {
//                        var newTop =  menu.height() + 22;
//                        newTop = 'calc(50vh - '+newTop+'px)';
//                        dn_json_rpc_object.loaderImage.css('top' , newTop);
//                    }
//                    dn_json_rpc_object.menuHeightToAdd = menu;
//                }
//            }
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
                    dn_json_rpc_object.loaderContainer.hide()
                }, 6000);
            }

            $.ajax({
                url: requestUrl,
                data: input_data,
                dataType: 'JSON',
                type:'GET',
                beforeSend: function (jqXHR, settings) {
                    console.log(window.location.origin+ settings.url, 99);
//                    console.log(input_data);
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
                dntoast.error("Invalid Request Response in function reqfun ");
            else
                dntoast.error(res + "");
        },

        handleResponse: function (res, reqfun, callback, failureCallBack) {
            var error_message = '';
            if (res == undefined) {
                error_message ="Url hit successful but Invalid Request Response in "+ reqfun;
                if(dntoast && dntoast.error)
                    dntoast.error(error_message);
                else
                    console.log(error_message);
                return;
            }
            if (res.error == undefined) {
                error_message ="Url hit successful but error not defined  in "+ reqfun;
                if(dntoast && dntoast.error)
                    dntoast.error(error_message);
                else
                    console.log(error_message);
                return;
            }
            else
                res.error += "";
            if (res.error.length > 0) {
                if (failureCallBack)
                    failureCallBack(res.error);
                else {
                    error_message =res.error;
                    if(dntoast && dntoast.error)
                        dntoast.error(error_message);
                    else
                        console.log(error_message);
                }
                return;
            }
            if (res.data == undefined) {
                if (res.message == undefined) {
                    error_message ="Undefined data and message " + reqfun;
                    if(dntoast && dntoast.error)
                        dntoast.error(error_message);
                    else
                        console.log(error_message);
                    return;
                }
                if (res.message.length == 0) {
                    error_message ="Undefined data and no message in function "+ reqfun;
                    if(dntoast && dntoast.error)
                        dntoast.error(error_message);
                    else
                        console.log(error_message);
                    return;
                }
            }

            if (res.message != undefined && res.message.length > 0) {
                if (res.message.length != 7 && res.message.toLowerCase() != "success")
                    dntoast.showSuccessMessage(res.message);
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
    var failureCallBack = reqObject.onError;
    dn_json_rpc_object.request(reqfun   , input_data, callback, failureCallBack)
}