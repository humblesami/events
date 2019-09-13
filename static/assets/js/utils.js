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
