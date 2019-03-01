var site_config = {
	server_base_url:'https://demo.odoohq.com',
	server_db : 'demo',
	site_url: 'https://meetvue.com',
	live : true,
	chat_server : 'https://chat.brainpbx.com',
	app_name : 'MeetingPoint',
	show_logs : []
};
var site_config_local = {
	server_base_url:'http://172.16.21.43:8000',
	server_db : 'demo',
	live : false,
	site_url: '',
	chat_server : 'http://172.16.21.43:3000',
	app_name : 'MeetingPoint',
	show_logs : ['socket','ajax_before','ajax_success']
};

site_config = site_config_local;
site_config.site_url = window.location.origin.toString();
if(site_config.site_url.indexOf('meetvue.com') == -1 && site_config.site_url.indexOf('localhost') == -1)
{
	site_config.site_url += '/meetvue';
}

site_config['app_name'] = 'MeetingPoint';
window['site_config'] = site_config;
//console.log(site_config);
