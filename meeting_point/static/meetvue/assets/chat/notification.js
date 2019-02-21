var notification_manager = {
    notificationList:{},
    renderMyNotifications:function(notifications) {
        var obj_this = this;
        //console.log(111, obj_this.notificationList);
        for(var id in notifications){
            obj_this.addNotificationInList(notifications[id]);
        }
    },
    newNotification:function(){
        this.addNotificationInList(item);
    },
    countAddition: function(){

    },
    addNotificationInList: function(item){
        var obj_this = this;
        if(!item.counter)
            item.counter = 1;
        obj_this.notificationList[item.id] = item;
        obj_this.renderNotificationItem(item);        
    },
    renderNotificationItem: function(item) {
        var obj_this = this;
        if(!item.client_route)
            item.client_route = '/';
        obj_this.makeRoute(item);
        var notification_li = $(`<li class="list-group-item contact" data-id=`+item.id+` client_route="`+item.client_route+`">
        <a href="`+item.client_route+`" style="display: contents;" class="wrap">
            `+item.counter+` `+item.content+`
        </a>
        </li>`);
        $('#notification_list').html(notification_li);        
    },    
    mark_notification_read(model, id, parent_model, parent_id){
        var obj_this = this;		
		var note_data2 = {
			res_model:model,
			res_id:id
        };
        var attrs = { res_model: model, res_id:id };        
        var dom_item = obj_this.getNotificationItem(attrs);
        if(!dom_item)
        {
            console.log("No notification item found for to be marked read");
            return;
        }
        dom_item.remove();
		obj_this.emit_server_event(note_data2, 'notification', 'update_counter');
    },

    getNotificationItem: function(res_model, res_id){
        var obj_this = this;
        for(var id in obj_this.notificationList)
        {
            var item = obj_this.notificationList[id];
            if(item.res_model == res_model && item.res_id == res_id)
            {
                return item;
            }
        }
        return null;
    },
    
    recieve_notification: function(item){
        var obj_this = this;
        var model_prop = 'res_model';
        var id_prop = 'res_id';
        if(item['parent_id'])
        {
            model_prop = 'parent_model';
            id_prop = 'parent_id';
        }
        var attrs = {model_prop: model, id_prop:id };
        var dom_item = $('#notification_list li[data-id="'+item.id+'"]');
		
		if(dom_item && dom_item.length > 0){
            var counter = dom_item.find('.counter').html();
            counter++;
            dom_item.find('.counter').html(counter);      
        }
        else {			
            obj_this.addItemInNotificationList(item);
		}
    },    
    is_list_empty: function(){
        var obj_this = this;
        if(this.notificationList.length == 0)
        {
            $('').append('<li *ngIf="socketService.notificationList == 0" class="list-group-item contact">No New Notifications</li>');
        }
    },           
    makeRoute:function(item){},        
    set_active_parent_notification: function() {
        var obj_this = this;
        var notifs = obj_this.notificationList;
        var route = window['pathname'];
        var found = undefined;
        //console.log(route);
        if(route.indexOf('iframe') > -1)
        {
            var ar_route = route.split('/');
            route = '/'+ar_route[1]+'/doc/'+ar_route[3];
            //console.log(route);
        }
        for(var i in notifs)
        {
            //console.log(notifs[i].client_route);
            if(notifs[i].client_route == route)
            {
                obj_this.active_parent_notification = notifs[i];
                found = i;
            }
        }
        if(!found)
        {
            obj_this.active_parent_notification = undefined;
        }
    },    
    emit_server_event: function(){
        if(!event_name)
        {
            console.log(event_name, ' not defiend');
            return;
        }
        var current_user = window['current_user'];
        var cookie = current_user.cookie;
        var data = {
            auth: {
                db : cookie.db,
                token:cookie.token,
                uid:cookie.id,
                name: cookie.name
            },
            req_data:input_data,
            event : event_name
        };
        //console.log(data);
        input_data = {'data':JSON.stringify(data)};
        dn_json_rpc(options);
    },
}
window['notification_manager'] = notification_manager;