var dn_footer = $('.dn_footer');
dn_footer.html('Copyright © DigitalNet Technology Solutions. All Rights Reserved.');
$('.oe_login_form').prepend('<img src="/dn_base/static/img/logo.png"/>');
document.getElementById("button1").style.display = "none";
console.log('11111111')
try
{
    dn_json_rpc('/website/recaptcha/',{},function(result){
//    console.log('valuez',result)
    var data = JSON.parse(result)
//    console.log('here is comes')
     var self = this;
     this.$captchas = self.$('.o_website_base_recaptcha');
    $captchas.append($(
                        '<div class="g-recaptcha" data-sitekey="' + data.site_key + '" '+'data-callback="enableBtn" data-expired-callback = "resetCaptcha"></div>'
                    ));
                    if (self.$captchas.length) {
                        $.getScript('https://www.google.com/recaptcha/api.js');
                    }

        });
}
catch(er){
console.log('here is error',er)
}
function resetCaptcha(){
    location.reload()
}

function enableBtn(){
//        console.log(1121,grecaptcha)
//        console.log(grecaptcha.getResponse())
       var input_data ={responseData:grecaptcha.getResponse()}
      var url = "/website/verify"
//      console.log(url,33)
    dn_json_rpc(url,input_data,function(result){
//        console.log('121',result)
        if (result == true)
        {
        document.getElementById("button1").style.display =  "flex";
        }
        else{
        grecaptcha.reset()

        }
    })

  }