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
    doc_edit:{
        script_paths:[
            "static/assets/fileinput/file.js",
            "static/assets/fileinput/upload_single_file.js"            
        ],
        style_paths:[
            "static/assets/fileinput/css/fileinput.css"
        ],
        load: function(on_load){
            var obj_this = this;
            js_utils.load_lib(obj_this, on_load);
        }
    },
    jquery_ui: {
        script_paths:[
            "static/assets/libs/js/jquery-ui.min.js",
            "static/assets/libs/js/jquery.ui.touch-punch.min.js",
            "static/assets/libs/js/jquery.mark.min.js",
            "static/assets/libs/js/mark.min.js",            
        ],
        style_paths:[
            "static/assets/libs/css/jquery-ui.css",
            "static/assets/libs/select2/default.theme.css"
        ],
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
        lib_type: 'pdf',
        script_paths:[
            "static/assets/annotator/shared/pdf.js",
            "static/assets/annotator/shared/pdf.viewer.js",
            "static/assets/annotator/annotator.js"
        ],
        style_paths:[
            "static/assets/annotator/shared/pdf.viewer.css",
            "static/assets/annotator/shared/custom.css",
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
    },
    mask: {
        script_paths : ['static/assets/js/mask.js'],
        style_paths : [],
        load: function(on_load){            
            var obj_this = this;    
            js_utils.load_lib(obj_this, on_load);
        }
    },
    duration_picker: {
        script_paths : ['static/assets/libs/duration-picker/duration-picker.js'],
        style_paths : ['static/assets/libs/duration-picker/duration-picker.css'],
        load: function(on_load){            
            var obj_this = this;
            // console.log(43343);
            js_utils.load_lib(obj_this, on_load);
        }
    }
};
for(var key in app_libs)
{
    app_libs[key].status = undefined;
    app_libs[key].loaded = 0;
    app_libs[key].call_backs = [];
}