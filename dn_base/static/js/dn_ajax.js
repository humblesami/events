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
            if (!this.initialized)
                this.init();
            if(!show_it)
                this.loaderContainer.hide();
            else
            {
                this.loaderContainer.show();
            }
        },
        baseUrl: dn_base_web_url,
        showLoader: true,
        initialized:false,
        loaderContainer: undefined,
        loaderImage: undefined,
        init: function (config) {
            if (!this.loaderContainer) {
                if($('body').length > 0)
                {
                    this.loaderContainer = $('<div id="loaderContainerajax" style="position: fixed;z-index: 999999;top:47px;height:calc(100vh - 47px);width:100%;background: rgb(0, 0, 0);opacity:0.2ser"/>');
                    this.loaderImage = $('<img style="position:relative; top:calc(50vh - 110px);left:calc(50vw - 24px);   animation: fa-spin 1s infinite steps(12);" src="/web/static/src/img/spin.png" alt="loading data..." />');
                    this.loaderContainer.append(this.loaderImage);
                    $('body').append(this.loaderContainer);
                    console.log($('#loaderContainerajax').length, 1333);
                }
            }
            if (config && config.baseUrl)
                dn_json_rpc_object.baseUrl = config.baseUrl;
            initialized = true;
        },

        request: function (reqfun, input_data, callback, failureCallBack) {
            if (!this.initialized)
                this.init();
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

            if (this.showLoader) {
                this.showHideLoader(true);
            }

            $.ajax({
                url: requestUrl,
                data: input_data,
                dataType: 'JSON',
                type:'POST',
                beforeSend: function (jqXHR, settings) {
                    url = settings.url;
//                    console.log(url);
//                    console.log(input_data);
                },
                success: function (results) {
                    //console.log(results);
                    dn_json_rpc_object.showHideLoader();
                    serviceRequestInProgress = false;
                    dn_json_rpc_object.handleResponse(results, reqfun, callback, failureCallBack);
                },
                error: function (results) {
                    console.log("Error in "+reqfun, results);
                    dn_json_rpc_object.showHideLoader();
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