var window_loader = {
    processes : [],
    loader: $('#server-wait'),
    show: function(nam) {
        var obj_this = this;
        var server_wait_loader = obj_this.loader;
        if(!server_wait_loader.length)
        {
            return;
        }
        if (obj_this.processes.length == 0) {
            server_wait_loader.show();
            server_wait_loader.shown = 1;
        }
        if(obj_this.loadingTimeOut)
        {
            clearTimeout(obj_this.loadingTimeOut);
        }
        loader_last_shown = new Date();
        obj_this.loadingTimeOut = setTimeout(function() {
            if(obj_this.processes.length)
            {
                obj_this.hideLoader('force', 'Timeout');
            }
            else
            {
                clearTimeout(obj_this.loadingTimeOut);
            }
        }, 29000);
        obj_this.processes.push(nam);
        var loading_text = 'Loading '+this.processes.join(',');
        if(site_config.log_loading)
        {
            console.log('Added '+nam+ ' '+window['dt_functions'].now());
        }
        server_wait_loader.find('.text').html(loading_text);
        //console.log(nam, new Date().getMilliseconds());
    },
    hide: function(nam, hiddenFrom) {
        var obj_this = this;
        var server_wait_loader = obj_this.loader;
        if(!server_wait_loader.length)
        {
            return;
        }
        if (!nam || nam == 'force') {
            console.log('Processes in progress => '+ this.processes.join(','));
            if(hiddenFrom)
            {
                console.log('hidden from => '+ hiddenFrom);
            }
            this.processes = [];
            if (!nam)
                console.trace();
            else if (nam != 'force')
            {
                console.log("Force hidden from " + hiddenFrom);
            }
            server_wait_loader.hide();
            server_wait_loader.shown = 0;
        }
        if (this.processes.length == 0) {
            loader_last_shown = undefined;
            clearTimeout(this.loadingTimeOut);
            //console.log("Already removed "+nam);
            return;
        }
        var found = false;
        for (var i = this.processes.length - 1; i >= 0; i--) {
            if (this.processes[i] == nam) {
                found = true;
                this.processes.splice(i, 1);
                break;
            }
        }
        if (found) {
            if(site_config.log_loading)
            {
                console.log('Loaded '+ nam + ' '+window['dt_functions'].now());
            }
        } else {
            console.log(nam + " not found");
        }
        if (this.processes.length == 0) {
            server_wait_loader.hide();
            loader_last_shown = undefined;
        }
        else{
            var loading_text = 'Loading '+this.processes.join(',');             
            server_wait_loader.find('.text strong').html(loading_text);
        }
        //console.log(nam, new Date().getMilliseconds());
    },
    add: function(selector, position){
        // console.log('tried loader ', selector);
        var element = $(selector);
        if(element.length != 1)
        {
            if(element.length > 1)
            {
                element = element.last();                
                console.log(selector + ' found more than one');
            }
            else{
                console.log(selector + ' not found');
                return;
            }
        }
        var pos_type = element.css('position');        
        if(!pos_type == pos_type == 'static')
        {
            element.css('position','relative');
        }
        var partial_loader = $('.partial-loader').clone().show();
        if(position){
            partial_loader.find('.row').css('justify-content', position);
        }
        element.append(partial_loader);
    },
    remove: function(element){
        if(element.length != 1)
        {
            if(element.length > 1)
            {
                element = element.fisrt();
                console.log(selector + ' found more than one');
            }
            else{
                console.log(selector + ' not found');
                return;
            }
        }
        var loader = element.find('.partial-loader');
        if(loader.length)
        {
            // console.log('removed loader ', element[0]);
            element.find('.partial-loader').remove();
        }
        else
        {
            console.log('loader not found', element[0]);
        }
    },
}
window['loader'] = window_loader;