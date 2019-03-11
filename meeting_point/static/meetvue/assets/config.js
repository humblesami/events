var site_config = {
	server_base_url:'https://demo.odoohq.com',
	server_db : 'demo',
	site_url: 'https://meetvue.com',
	live : true,
    chat_server : 'https://chat.brainpbx.com',
    app_name : 'MeetingPoint',
	show_logs : []
};
// console.log(site_config);
var site_config_local = {
	server_base_url:'http://localhost:8000',
	server_db : 'demo',
	live : false,
	site_url: '',
    chat_server : 'http://localhost:3000',
    app_name : 'MeetingPoint',
	show_logs : ['socket','ajax_before','ajax_success']
};
var network_config = {
	server_base_url:'http://172.16.21.170:8000',
	server_db : 'demo',
	live : false,
	site_url: '',
    chat_server : 'http://172.16.21.170:3000',
    app_name : 'MeetingPoint',
	show_logs : ['socket','ajax_before','ajax_success']
};

if(window.location.toString().indexOf('odoohq.com') == -1
&& window.location.toString().indexOf('meetvue.com') == -1)
{
    
    if(window.location.toString().indexOf('172.16') > -1)
    {
        site_config = network_config;
    }
    else
    {
        site_config = site_config_local;
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

console.log(site_config);
site_config['app_name'] = 'MeetingPoint';
window['site_config'] = site_config;