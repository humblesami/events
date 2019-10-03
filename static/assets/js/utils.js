window['dynamic_files'] = {};
var app_libs = window['app_libs'] = {
    moment:{
        script_paths:[
            "static/assets/libs/js/moment.js"
        ],
        style_paths:[],
        load: function(on_load){
            var obj_this = this;    
            js_utils.load_lib(obj_this, on_load);
        }
    },
    zebra:{
        style_paths:[
            "static/assets/libs/zebra/zebra_datepicker.css"
        ],
        script_paths:[
            "static/assets/libs/zebra/zebra_datepicker.src.js"
        ],
        load: function(on_load){
            var obj_this = this;    
            js_utils.load_lib(obj_this, on_load);
        }
    },
    rtc:{
        script_paths:[
            "static/assets/rtc/adapter.js",
            "static/assets/rtc/RTCMultiConnection.min.js",
            "static/assets/rtc/getScreenId.js",
            "static/assets/rtc/getHTMLMediaElement.js",
            "static/assets/rtc/conference.js"
        ],
        style_paths:[],
        load: function(on_load){            
            var obj_this = this;    
            js_utils.load_lib(obj_this, on_load);            
        }
    },
    pdf:{
        script_paths:[
            "static/assets/annotator/shared/pdf.js",
            "static/assets/annotator/shared/pdf.viewer.js",
            "static/assets/annotator/annotator.js"
        ],
        style_paths:[
            "static/assets/annotator/shared/pdf.viewer.css",
            "static/assets/annotator/shared/custom.css"
        ],
        load: function(on_load){            
            var obj_this = this;    
            js_utils.load_lib(obj_this, on_load);
        }
    },
    file_input:{
        script_paths : [
            'https://apis.google.com/js/api.js',
            'https://www.dropbox.com/static/api/2/dropins.js',
            'static/assets/fileinput/js/cloudpicker.js',            
        ],
        style_paths : [],        
        load: function(on_load){            
            var obj_this = this;    
            if(!obj_this.status)
            {
                obj_this.status = 'loading';
                var scr_length = obj_this.script_paths.length;
                for(var scr_path of obj_this.script_paths)
                {
                    var script = document.createElement('script');
                    if(scr_path == 'https://www.dropbox.com/static/api/2/dropins.js')
                    {
                        script.id = 'dropboxjs';
                        script.setAttribute('data-app-key','pvbda3hm0tpwnod');
                    }
                    script.onload = function(){
                        obj_this.loaded += 1;
                        if(obj_this.loaded == scr_length)
                        {
                            obj_this.status = 'loaded';
                            on_load();
                        }
                    };
                    script.src = scr_path;
                    document.body.appendChild(script);
                }
            }
            else{
                if(obj_this.status == 'loaded')
                {
                    on_load();
                }
            }
        }
    },
    full_calendar:{
        script_paths : ['static/assets/libs/fullcalendar/fullcalendar.min.js'],
        style_paths : ['static/assets/libs/fullcalendar/fullcalendar.css'],
        status: undefined,
        call_backs: [],
        load: function(on_load){            
            var obj_this = this;    
            js_utils.load_lib(obj_this, on_load);
        }
    },
    signature: {
        script_paths: ['static/assets/js/custom_signature.js'],
        style_paths: [],
        load: function(on_load){
            var obj_this = this;
            js_utils.load_lib(obj_this, on_load);
        }
    },
    bootbox:{
        script_paths : ['static/assets/libs/bootstrap/bootbox.js'],
        style_paths: [],
        load: function(on_load){            
            var obj_this = this;
            js_utils.load_lib(obj_this, on_load);
        }
    },
    emoji_picker:{
        script_paths : ['static/assets/emoji/js/emoji-picker.js'],
        style_paths:['static/assets/css/emoji.css'],
        load: function(on_load){
            var obj_this = this;    
            js_utils.load_lib(obj_this, on_load);
        }
    },
    chart: {
        script_paths : ['static/assets/js/chart.js'],
        style_paths : [],
        load: function(on_load){            
            var obj_this = this;    
            js_utils.load_lib(obj_this, on_load);
        }
    }
};

function get_cpath_name() {
    var wl = window.location;
    if(wl.toString().indexOf('localhost') > -1)
    {
        is_local_host = true;
    }
    if (wl.hash) {
        window['pathname'] = wl.hash.substr(1, wl.hash.length);
    } else {
        window['pathname'] = wl.toString().replace(wl.origin, '');
    }
    return window['pathname'];
}

var js_utils = window['js_utils'] = {
    load_lib: function(obj_this, on_load){
        if(!obj_this.status)
        {
            obj_this.status = 'loading';
            
            if(on_load)
            {
                obj_this.call_backs.push(on_load);
            }
            for(var link_path of obj_this.style_paths)
            {
                var link  = document.createElement('link');
                link.rel  = 'stylesheet';
                link.type = 'text/css';
                link.href = link_path;
                link.media = 'all';
                document.head.appendChild(link);
            }
            var len = obj_this.script_paths.length;
            for(var script_path of obj_this.script_paths)
            {
                var script = document.createElement('script');                
                script.onload = function(){
                    obj_this.loaded += 1;
                    if(obj_this.loaded == len)
                    {
                        obj_this.status = 'loaded';
                        for(var cb of obj_this.call_backs)
                        {
                            cb();
                        }
                    }
                };
                script.src = script_path;
                document.body.appendChild(script);
            }
        }
        else{
            if(on_load)
            {
                if(obj_this.status == 'loaded')
                {
                    on_load();
                }
                else{
                    obj_this.call_backs.push(on_load);
                }
            }
        }
    },
    move_element: function(arr, old_index, new_index){
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing purposes
    },
    read_file: function(file, call_back) {
        var reader = new FileReader();        
        reader.readAsDataURL(file, "UTF-8");
        reader.onload = function (evt) {
            // console.log(evt.target.result,1233);
            call_back(evt.target.result);
        }
        reader.onerror = function (evt) {
            console.log(evt, 333);
        }
    },
    unique_id: function(){
        let rand = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        var now = new Date();
        rand = 'id_'+now.getFullYear()+now.getMonth()+now.getDate()+now.getHours()+now.setSeconds()+rand;
        return rand;
    },
    addLoader: function(element, position){       
        if(element.length != 1)
        {
            if(element.length > 1)
            {
                element = element.last();                
                console.log(element.attr('class') + ' found more than one');
            }
            else{
                console.log(element.attr('class') + ' not found');
                return;
            }
        }
        var pos_type = element.css('position');        
        if(!pos_type || pos_type == 'static')
        {
            element.css('position','relative');
        }
        var partial_loader = $('.partial-loader:first').clone().css('display','flex');
        if(position){
            partial_loader.find('.row').css('justify-content', position);
        }
        element.append(partial_loader);
    },
    removeLoader: function(element){
        if(element.length != 1)
        {
            if(element.length > 1)
            {
                console.log(element);                
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
    camel_case: function(value){
        var result = value.toLowerCase().split(' ');
        for(var i=0 ; i<result.length; i++){
            result[i] = result[i].charAt(0).toUpperCase() + result[i].substring(1);
        }
        result =  result.join(' ');
        return result;
    },
    sort_by_two_keys:function(json_array){
        var cmp = function(x, y){
            return x > y ? 1 : x < y ? -1 : 0; 
        };
        return json_array.sort(function(a, b){
            return cmp( 
                [cmp(a.online, b.online), cmp(a.name, b.name)], 
                [cmp(b.online, a.online), cmp(b.name, a.name)]
            );
        });
    },
    scroll_to_element: function(focus_el_selector, scroll_el_selector){
        var focus_el = undefined;
        var scroll_el = undefined;
        var position = undefined;
        if(typeof(focus_el_selector) == 'string')
        {
            focus_el = $(focus_el_selector).first();
            if(focus_el.length != 1)
            {
                console.log('Invalid focus el' + scroll_el.length + ' found', focus_el_selector, focus_el);
                return;
            }
        }
        else{
            focus_el = focus_el_selector;
            if(focus_el.left && focus_el.top)
            {
                position = focus_el;
            }
            else{
                focus_el = focus_el_selector;
                if(focus_el.length != 1)
                {
                    console.log('Invalid focus el' + scroll_el.length + ' found', focus_el_selector, focus_el);
                    return;
                }
                position = focus_el.position();
            }
        }
        if(typeof(scroll_el_selector) == 'string')
        {
            scroll_el = $(scroll_el_selector).first();
        }
        else{
            scroll_el = scroll_el_selector;
        }        
        if(scroll_el.length != 1)
        {
            console.log('Invalid focus el' + scroll_el.length + ' found', scroll_el_selector, scroll_el);
            return;
        }
        console.log(position);
        scroll_el.scrollTop(position.top)
        scroll_el.scrollLeft(position.left);
    },
    is_public_route: function (url){
        if(!url)
        {
            url = get_cpath_name();
        }
        let public_routes = ['/user/login','/user/forgot-password','/user/reset-password', '/login','/forgot-password', '/logout','/reset-password', '/token-sign-doc'];
        for (var i in public_routes)
        {
            if (url.startsWith(public_routes[i]))
            {
                localStorage.removeItem('user');
                $('body').removeClass('user').addClass('public');
                return true;
            }
        }
        return false;
    }
}


for(var key in app_libs)
{
    app_libs[key].status = undefined;
    app_libs[key].loaded = 0;
    app_libs[key].call_backs = [];
}
$(function(){
    app_libs['bootbox'].load(function(){
        if(!bootbox)
        {
            console.log('not loaded', app_libs['bootbox']);
        }        
        else{
            window['bootbox'] = bootbox;
        }
    });
    app_libs['moment'].load(function(){});
})
