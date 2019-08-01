$(function(){
    var email = $('input[name="email"]:first').val();
    if(email)
    {
        $('.field-two_factor_auth:first').show();
    }
})
