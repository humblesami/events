var site_config = {
	server_base_url:'https://meetvue.com',
	server_db : 'demo1',
	site_url: 'https://meetvue.com',
	live : true,
    chat_server : 'https://chat.brainpbx.com',
    app_name : 'MeetingPoint',
	show_logs : []
};
// console.log(site_config);
var site_config_local = {
	server_base_url:'http://localhost:8000',
	server_db : 'demo1',
	live : false,
	site_url: '',
    chat_server : 'http://localhost:3000',
    app_name : 'MeetingPoint',
	show_logs : ['socket', 'ajax_before'] //, 'ajax_success'
};
var network_config = {
	server_base_url:'http://172.16.21.170:8000',
	server_db : 'demo1',
	live : false,
	site_url: '',
    chat_server : 'http://172.16.21.170:3000',
    app_name : 'MeetingPoint',
	show_logs : ['socket','ajax_before','ajax_success']
};

if(window.location.toString().indexOf('localhost') > -1)
{   
    site_config = site_config_local;
}
else
{
    if(window.location.toString().indexOf('172.16') > -1)
    {
        site_config = network_config;
    }
}

if(window["odoo"]){
    site_config.server_db = window["odoo"].session_info.db
}

site_config.site_url = window.location.origin;
if(window.location.origin.toString().indexOf( window.location.origin+'/web') > -1)
{
    site_config.site_url = window.location.origin+'/web';
}

site_config.public_urls = ['login']
//console.log(site_config);
site_config['app_name'] = 'MeetingPoint';
window['site_config'] = site_config;
if(site_config.site_url.startsWith('https://')){
    $('head meta:first').after('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />');
}