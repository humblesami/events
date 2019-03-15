var async_file_loader = function () { }
async_file_loader.prototype = {
    require: function (scripts, callback, container_element) {
        this.loadCount      = 0;
        this.totalRequired  = scripts.length;
        this.callback       = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i], container_element);
        }
    },
    
    writeScript: function (src, container_element) {
        var self = this;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.async = true;
        s.src = src;
        s.addEventListener('load', function (e) { self.loaded(e); }, false);
        if(!container_element)
        {
            container_element = document.head;
        }
        container_element.appendChild(s);
    },
    loaded: function (evt) {
        var self = this;
        self.loadCount++;
        if (self.loadCount == self.totalRequired && typeof self.callback == 'function')
        {
            setTimeout(self.callback, 100);          
        }
    }
}
//window["loadComponent"]=function(){}
function wait_element_render(wait_options)
{
    if(!wait_options.n)
    {
        wait_options.n = 0;
    }
    if(!wait_options.tries)
    {
        wait_options.tries = 30;
    }
    if($(wait_options.selector).length > 0)
    {
        if(wait_options.n>1)
        {
            console.log(wait_options.selector+' loaded in '+wait_options.n+ ' tries');
        }
        setTimeout(wait_options.call_back, 10);
    }
    else
    {
        wait_options.n++;
        if(wait_options.n < wait_options.tries)
        {
            setTimeout(function(){
                wait_element_render(wait_options);
            }, 3000);
        }
        else
        {
            console.log(wait_options.selector+' failed to load in '+wait_options.n + ' tries');
        }
    }
}
var on_angular_loaded = [];
function load_angular(call_back, skip_initial_checks)
{
    if(!skip_initial_checks)
    {
        if(odoo.angular_loading)
        {
            if(call_back)
            {
                on_angular_loaded.push(call_back);
            }
            return;
        }
        else if(odoo.angular_loaded)
        {
            if(call_back)
                setTimeout(call_back, 10);
            return;
        }
        else
        {
            odoo.angular_loading = 1;
        }
    }


    if($('body>nav').length == 0)
    {
        var wait_options = {
            call_back:function(){
                load_angular(null, 1);
            },
            selector:'body>nav'
        }
        wait_element_render(wait_options);
        return;
    }
    else
    {
        $('body>nav').after(`
            <div id='angular_container'>
                <base href=${window.location.origin} />
                <app-root></app-root>
                <div id="pdf-libs-conatiner" class="pdf-annotation" uninitialized="1"/>
                <script src="/meeting_point/static/meetvue/assets/config.js"></script>
                <script src="/meeting_point/static/meetvue/assets/js/json.js"></script>
                <script src="/meeting_point/static/meetvue/assets/js/main.js"></script>
                <script src="/meeting_point/static/meetvue/assets/js/datetime.js"></script>
            </div>
        `);
    }

    var myLoader = new async_file_loader();
    myLoader.require(
        [
            '/meeting_point/static/meetvue/runtime.js',
            '/meeting_point/static/meetvue/polyfills.js',
            '/meeting_point/static/meetvue/vendor.js',
            '/meeting_point/static/meetvue/main.js',
        ],
        function() {
            if(window["loadComponent"])
            {
                odoo.angular_loading = false;
                odoo.angular_loaded = 1;
                console.log('Loaded angular files',Date());
                for(var i in on_angular_loaded)
                {
                    on_angular_loaded[i]();
                }
            }
            else
            {
                console.log('Angular not loaded');
            }
        },
        document.getElementById('angular_container')
    );
}

$(function(){
    load_angular();    
    odoo.define('odoochat.notifications', function (require) {
        if(!odoo.chat_loaded)
        {
            odoo.chat_loaded = 1;
            require('web.dom_ready');

            var SystrayMenu = require('web.SystrayMenu');
            var Widget = require('web.Widget');

            var notification_icon = Widget.extend({
                template:'notification.dom'
            });


            var message_icon = Widget.extend({
                template:'message.icon',
                events: {
                    'click': 'open_messages',
                },
                open_messages:function open_messages()
                {
                    var reqObject = {
                        url:'/get-action-id',
                        data:{ xml_id : 'odoochat.action_messenger', db: odoo.session_info.db, token: odoo.session_info.token},
                        onSuccess: function(action_id)
                        {
                            var action_url = '/web#action='+action_id;
                            var debug_in_url = window.location.toString().indexOf('debug');
                            if(debug_in_url > -1)
                            {
                                action_url = '/web?debug=1#action='+action_id;
                            }
                            action_url += '&view_type=form&model=dn_base.empty';
                            action_url += '&menu_id='+get_param_value('menu_id');
                            window.location = action_url;
                        }
                    };
                    //console.log(reqObject);
                    dn_rpc_object(reqObject);
                }
            });
            SystrayMenu.Items.push(notification_icon);
            SystrayMenu.Items.push(message_icon);



        }
    });
     function load_chatter(){
                var wait_options = {
                    selector : 'body>nav:first>.o_main_navbar>.o_menu_systray app-messageicon',
                    call_back : function(){
                        load_angular(function(){
                            window["loadComponent"]("chat","app-chat");
                            window["loadComponent"]("messengericon","app-messageicon");
                        })
                    }
                }
                wait_element_render(wait_options);
            }
            load_chatter();
});