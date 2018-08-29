
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
                var loaderhite = $(window).height() - 40;
                this.loaderContainer.css({ 'height':loaderhite,'display': 'block' });
            }
        },
        baseUrl: dn_base_web_url,
        showLoader: true,
        initialized:false,
        init: function (config) {
            if ($('#loaderContainerajax').length == 0) {
                var loaderHtml = '<div id="loaderContainerajax">';
                loaderHtml += '<img style="position:relative;left:42%" src="/dn_base/static/img/ajax-loader.gif" alt="loading data..." />';
                loaderHtml += '</div>';
                $('body').append(loaderHtml);
                this.loaderImage = $('#loaderContainerajax img');
                this.loaderContainer = $('#loaderContainerajax').css({
                    display: 'none',
                    position: 'fixed',
                    'z-index': 999999,
                    top : 0,
                    width:'100%',
                    background: 'rgba(0, 0, 0, 0.2)'
                });
            }
            if (config && config.baseUrl)
                dn_json_rpc_object.baseUrl = config.baseUrl;
            initialized = true;

            this.loaderContainer.css({ top: 20 + 'px' });
            this.loaderImage.css('top', '40%');
        },

        loaderContainer: null,
        loaderImage: null,

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
                    //console.log(url);
                },
                success: function (results) {
                    console.log(results);
                    dn_json_rpc_object.showHideLoader();
                    serviceRequestInProgress = false;
                    dn_json_rpc_object.handleResponse(results, reqfun, callback, failureCallBack);
                },
                error: function (results) {
                    console.log("Error", results);
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


