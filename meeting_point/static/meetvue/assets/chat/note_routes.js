notification_manager.makeRoute = function (item) {
	var route = '/';
    switch(item.res_model){
        case 'meeting_point.topicdoc':
            route = '/topic/doc/'+item.res_id;
        break;
        case 'meeting_point.doc':
            route = '/meeting/doc/'+item.res_id;
        break;
        case 'meeting_point.doc':
            route = '/meeting/doc/'+item.res_id;
        break;
        case 'calendar.event':
            route = '/meeting/'+item.res_id;
        break;
    }
    item.client_route = route;
}
