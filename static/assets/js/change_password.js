$(document).ready(function(){
});


$(document).on('keyup', '.new-password', function() {
    new_password = $('.new-password').val(),
    confirm_new_password = $('.confirm-password').val(),
	all_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@~`!@#$%^&*()_=+\\';:"\/?>.<,-])(?=.{8,})/,
	lower_regex = /^(?=.*[a-z])/,
	uper_regex = /^(?=.*[A-Z])/,
	numeric_regex = /^(?=.*[0-9])/,
	special_regex = /^(?=.*[@~`!@#$%^&*()_=+\\';:"\/?>.<,-])/,
    min_length_regex = /^(?=.{8,})/;
    if(lower_regex.test(new_password))
    {
        $('.lower-case-rule').addClass('valid-password');
    }
    else
    {
        $('.lower-case-rule').removeClass('valid-password');
    }
    if(uper_regex.test(new_password))
    {
        $('.uper-case-rule').addClass('valid-password');
    }
    else
    {
        $('.uper-case-rule').removeClass('valid-password');
    }
    if(numeric_regex.test(new_password))
    {
        $('.numeric-rule').addClass('valid-password');
    }
    else
    {
        $('.numeric-rule').removeClass('valid-password');
    }
    if(special_regex.test(new_password))
    {
        $('.special-char-rule').addClass('valid-password');
    }
    else
    {
        $('.special-char-rule').removeClass('valid-password');
    }
    if(min_length_regex.test(new_password))
    {
        $('.max-8-char-rule').addClass('valid-password');
    }
    else
    {
        $('.max-8-char-rule').removeClass('valid-password');
    }
    if(all_regex.test(new_password) && new_password == confirm_new_password)
    {
        $('.submit-btn').removeAttr('disabled')
    }
    else
    {
        $('.submit-btn').attr('disabled','disabled')
    }
});

$(document).on('keyup', '.confirm-password', function() {
    new_password = $('.new-password').val(),
    confirm_new_password = $('.confirm-password').val(),
    all_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@~`!@#$%^&*()_=+\\';:"\/?>.<,-])(?=.{8,})/;
    
    if(all_regex.test(new_password) && new_password == confirm_new_password)
    {
        $('.submit-btn').removeAttr('disabled');
        $('.password-match-rule').addClass('valid-password');
    }
    else
    {
        $('.submit-btn').attr('disabled','disabled');
        $('.password-match-rule').removeClass('valid-password');
    }
});


$(document).on('click', '.pass_show .ptxt', function() {
    $(this).text($(this).text() == "Show" ? "Hide" : "Show");
    $(this).prev().attr('type', function(index, attr) {
        return attr == 'password' ? 'text' : 'password';
    });
});