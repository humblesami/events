
var chat_ser_port = 3000;
var site_config_live = {
	server_base_url:'https://meetvue.com',
	server_db : 'demo1',
	site_url: 'https://meetvue.com',
	live : true,
    chat_server : 'https://chat.brainpbx.com',
    app_name : 'MeetingPoint',
	show_logs : []
};

var site_config_local = {
	server_base_url:'http://localhost:8000',
	server_db : 'demo1',
	live : false,
	site_url: '',
    chat_server : 'http://localhost:'+chat_ser_port,
    app_name : 'MeetingPoint',
	show_logs : ['socket', 'ajax_before'] //, 'ajax_success'
};

var network_config = {
	server_base_url:'http://172.16.21.170:8000',
	server_db : 'demo1',
	live : false,
	site_url: '',
    chat_server : 'http://172.16.21.170:'+chat_ser_port,
    app_name : 'MeetingPoint',
	show_logs : ['socket','ajax_before','ajax_success']
};

var network_config_https = {
	server_base_url:'https://172.16.21.170:8000',
	server_db : 'demo1',
	live : false,
	site_url: '',
    chat_server : 'https://172.16.21.170:'+chat_ser_port,
    app_name : 'MeetingPoint',
	show_logs : ['socket','ajax_before','ajax_success']
};

var site_config = site_config_live;

var current_site_base_url = window.location.origin.toString();
if(current_site_base_url != 'http://172.16.21.171:4200')
{
    if(current_site_base_url.indexOf('localhost') > -1)
    {   
        site_config = site_config_local;
    }
    else
    {
        if(current_site_base_url.startsWith('https://172'))
        {
            site_config = network_config_https;
        }
        else if(current_site_base_url.indexOf('172.16') > -1)
        {
            site_config = network_config;
        }
    }
}

if(current_site_base_url.indexOf('www.') > -1)
{
	site_config.server_base_url = site_config.server_base_url.replace('https://','https://www.')
}

site_config.site_url = current_site_base_url;

site_config.public_urls = ['login']
//console.log(site_config);
site_config['app_name'] = 'MeetingPoint';
if(current_site_base_url.indexOf('localhost') > -1)
{
    site_config.trace_request = 1;
}
window['site_config'] = site_config;
// if(site_config.site_url.startsWith('https://')){
//     $('head meta:first').after('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />');
// }
// console.log(site_config)
