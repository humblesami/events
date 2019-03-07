$(function(){
    var uid = $('.dn_uid').html();
    try
    {
        uid = parseInt(uid);
        var input_data = {uid:uid,gmt : new Date().getTimezoneOffset()/60 };
        if(!uid || uid == '')
            return;
        dn_json_rpc('/dn_auth/get_last_two_logins',input_data,function(data){
            var last_login = '';
            var own_profile = $('.own_profile:first')[0];
            if(own_profile.innerHTML == "True")
            {
                if(data && data.second_last)
                    last_login = data.second_last;
                else if(data && data.last)
                    last_login = data.last;
            }
            else
            {
                if(data && data.last)
                    last_login = data.last;
            }
            if(last_login && last_login.login_time)
            {
                 var parts = last_login.login_time .split(' ')
                 var dateValue = parts[0].split('-')
                  var mydate = new Date(dateValue[0], dateValue[1] - 1, dateValue[2]);
                  var dataValue = mydate.toDateString()
                  dataValue = dataValue.split(' ')
                  var final_date = dataValue[1] + ' '+dataValue[2]+ ',' + dataValue[3] +' ' + parts[1]
            console.log('last value ',last_login.login_time,typeof(last_login.login_time))
                var login_info_html = '<h3>Last Login</h3>';
                login_info_html += '<div>Login Time: '+final_date+'</div>';
                login_info_html += '<div>OS: '+last_login.platform+'</div>';
                login_info_html += '<div>Browser: '+last_login.browser+'</div>';
                login_info_html += '<div>IP: '+last_login.ip+'</div>';
                if(last_login.location)
                    login_info_html += '<div>Location: '+last_login.location+'</div>';
                $('.profile-last-login').html(login_info_html);
            }
            else
            {
                $('.profile-last-login').html("Not logged in yet");
            }
        },function(er){
            console.log('Some issue with /dn_auth/profile_login', er);
        });
    }
    catch(er)
    {
    }
});