var time_out_session = undefined;
var session_time_limit = 1800000;
var is_mobile_device = undefined;
var is_local_host = false;
var server_wait_loader = undefined;

var dn_current_site_user = {
    cookie: {
        token: "",
        name: "",
        id: undefined,
        photo: false
    },
    socket: {},
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    verifyUserToken: function() {
        if(site_functions.is_public_route())
        {
            return;
        }
        var user_info = dn_current_site_user.cookie;        
        dn_current_site_user.cookie = localStorage.getItem('user');
        if (dn_current_site_user.cookie) {
            dn_current_site_user.cookie = JSON.parse(dn_current_site_user.cookie);
            if (dn_current_site_user.cookie.token) {
                $('body').removeClass('public').addClass('user');                
            }
            else{
                $('body').removeClass('user').addClass('public');
                site_functions.go_to_login();
            }
        }
        else
        {
            $('body').removeClass('user').addClass('public');            
        }
    },
    onLogin: function(data) {        
        if (time_out_session) {
            clearTimeout(time_out_session);
        }
        time_out_session = setTimeout(function() {
            site_functions.go_to_login();
        }, session_time_limit);
        dn_current_site_user.cookie = data;
        data = JSON.stringify(data);        
        localStorage.setItem('user', data);
        $('body').removeClass('public').addClass('user');
    },
    logout: function(navigate) {
        if(!dn_current_site_user.cookie)
        {            
            return;
        }
        if(window.location.toString().indexOf('login') == -1)
        {
            $('body').hide();
            $('body').removeClass('user').addClass('public');            
        }
        localStorage.removeItem("user");
        dn_current_site_user.cookie = undefined;
        if (window['socket_manager']) {
            window['socket_manager'].is_admin = false;
            window['socket_manager'].close_socket();
            window['socket_manager'].user_data = undefined;
        }
        setTimeout(function() {
            bootbox.hideAll();
        }, 500);
    },
    initUserDataFromCookie: function() {
        var user_info = localStorage.getItem("user");
        try {
            if (user_info) {
                user_info = JSON.parse(user_info);
                dn_current_site_user.cookie = user_info;
            }
        } catch (er) {
            console.log(er);
        }
    }
};



var site_functions = {
    processes: [],
    is_public_route: function(url){
        if(!url)
        {
            url = get_path_name();
        }
        let public_routes = ['/accounts/login','/accounts/forgot-password','/accounts/reset-password', '/login','/forgot-password', '/logout','/reset-password'];
        for (var i in public_routes)
        {
            if (url.startsWith(public_routes[i]))
            {
                return true;
            }
        }
        return false;
    },
    get_path_name: function() {
        var wl = window.location;
        if(wl.toString().indexOf('localhost') > -1)
        {
            is_local_host = true;
        }
        if (wl.hash) {
            window['pathname'] = wl.hash.substr(1, wl.hash.length);
        } else {
            window['pathname'] = wl.toString().replace(window.location.origin, '');
        }
        return window['pathname'];
    },
    moment: function(value, format)
    {
        return moment(value, format);
    },
    readFiles: function(files, on_drop){        
        for (var i = 0; i < files.length; i++) {
            var file_name = files[i].name;
            // document.getElementById('fileDragName').value = files[i].name;
            // document.getElementById('fileDragSize').value = files[i].size
            // document.getElementById('fileDragType').value = files[i].type
            reader = new FileReader();
            reader.onload = function(event) {
                console.log('file name ='+ file_name);
                if(on_drop)
                {
                    on_drop({name: file_name, data: event.target.result});
                }         
            }
            reader.readAsDataURL(files[i]);
        }
    },
    go_to_login: function() {
        // console.trace();
        // alert(444);
        if(dn_current_site_user.cookie && dn_current_site_user.cookie.token)
        {
            dn_current_site_user.logout();            
        }
        if(!window.location.toString().endsWith('login'))
        {
            if(window.location.toString().indexOf('4200') == -1)
            {
                window.location = window['site_config'].server_base_url+'/accounts/login';
            }
            else{
                window.location = '/#/login';
            }
        }
    },

    
    get_file_binaries(files, resolve){
        var res_binaries = [];
        var len = files.length;
        for (var i = 0; i < files.length; i++) {            
            setupReader(files[i]);
        }
        function setupReader(file) {
            var name = file.name;
            var reader = new FileReader();
            reader.onload = function(){            
                var dataURL = reader.result;            
                res_binaries.push({
                    name: name,
                    binary : dataURL
                });
                if(res_binaries.length == len)
                {
                    resolve(res_binaries);
                }
            };
            reader.readAsDataURL(file);
        }
    },

    meeting_time: function(dt) {
        var moment_time = moment(dt, 'YYYY-MM-DD HH:mm:ss')
        var res = {
            day: moment_time.format('DD'),
            month_year: moment_time.format('MMM YYYY'),
            time: moment_time.format('HH:mm A')
        }
        return res;
    },
    meeting_time_str: function(dt) {
        var moment_time = moment(dt, 'YYYY-MM-DD HH:mm:ss');
        res = moment_time.format('MMM DD, YYYY hh:mm A');
        return res;
    },
    hour_minutes: function(dt) {
        if (typeof(dt) == "string")
            dt = new Date(dt);
        var hour = dt.getHours();
        var minut = dt.getMinutes();
        if (minut < 10) {
            minut = '0' + minut;
        }
        return hour + ':' + minut;
    },
    showLoader: function(nam) {
        if(!server_wait_loader)
        {
            server_wait_loader = window['loader'];
            if(!server_wait_loader)
            {
                return;
            }            
        }
        var obj_this = this;
        var time_out = undefined;
        if (obj_this.processes.length == 0) {
            server_wait_loader.show();
            server_wait_loader.shown = 1;
            time_out = setTimeout(function() {
                obj_this.hideLoader(nam);
            }, 29000);
        }
        obj_this.processes.push({
            name: nam,
            time_out: time_out
        });
        //console.log(nam, new Date().getMilliseconds());
    },
    hideLoader: function(nam, hiddenFrom) {
        if(!server_wait_loader){
            server_wait_loader = window['loader'];
            if(!server_wait_loader)
            {
                return;
            } 
        }
        if (!nam || nam == 'force') {
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
            //console.log("Already removed "+nam);
            return;
        }
        var found = false;
        for (var i = this.processes.length - 1; i >= 0; i--) {
            if (this.processes[i].name == nam) {
                found = true;
                clearTimeout(this.processes[i].time_out);
                this.processes.splice(i, 1);
                break;
            }
        }
        if (found) {
            //console.log(this.processes, " removed "+ nam);
        } else {
            console.log(nam + " not found");
        }
        if (this.processes.length == 0) {
            server_wait_loader.hide();
        }
        //console.log(nam, new Date().getMilliseconds());
    },
    change_cursor: function() {
        if (document.documentElement.style.cursor == '') {
            var myCanvas = document.getElementById("cursor_canvas");
            var ctx = myCanvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(10, 10, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();

            var url = myCanvas.toDataURL();
            url = 'url(' + url + ') , auto';
            document.documentElement.style.cursor = url;
            $('*').css('cursor', url);
        } else {
            $('*').css('cursor', '');

        }
    },
    togglerelated: function(selector) {
        $(selector).toggle();
    },
    get_trace : function(skip){
        var res = '';
        var obj = {};
        Error.captureStackTrace(obj);
        var trace = obj.stack.split('\n');
        for (var i in trace){
            if(i == 0)
            {
                continue;
            }
            if(i == 1 && skip)
            {
                continue;
            }
            if(trace[i].indexOf('DocumentComponent.push') > - 1
            ||  trace[i].indexOf('HTMLDocument.dispatch')> -1 
            || trace[i].indexOf('ZoneDelegate.push')> -1)
            {
                break;
            }
            // var index = trace[i].indexOf('/assets');

            res += '\n\n'+ trace[i];//.substr(index+8);
        }
        console.log(res);
    }
};


function addMainEventListeners() {
    window.addEventListener("dragover",function(e){
        e = e || event;
        e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
        e = e || event;
        e.preventDefault();
    },false);
    
    $('body').on('click', '.btnclosemodel', function() {
        $(this)
            .closest(".modal")
            .modal("hide");
    });
    $('body').on('hidden.bs.modal', '.modal', function() {
        $('body').removeClass('modal-open');
    });

    $(document).on("mouseup touchend keyup", function(e) {        
        handleSessionExpiry();        
        site_functions.hideLoader('force','');
        var target = e.target;
        var showbtn = $(target).closest('.showmouseawaybutton');
        if (showbtn && showbtn.length > 0) {
            return;
        }
        else 
        {
            var shownpanel = $(target).closest('.hidemouseaway');
            if (shownpanel && shownpanel.length > 0)
                return;
            else {
                $('.hidemouseaway').hide();
            }
        }
    });
}


var public_methods = {
    'authsignup': {
        'AuthUser': {
            'login_user': 1
        }
    }
}

window.addEventListener('message', function receiveMessage(evt) {
    if (evt.origin === 'http://my.iframe.org') {
        alert("got message: " + evt.data);
    }

    if (evt.data.action) {
        let {
            id,
            model,
            action
        } = evt.data;
        //console.log(evt.data, model);
        if (action === 'change') {
            switch (model) {
                case 'event':
                    window.location = `/#/meeting/${id}`;
                    break;
                case 'news':
                    window.location = `/#/`;
                    break;
                case 'committee':
                    window.location = `/#/committees/${id}`;
                    break;
                case 'voting':
                    window.location = `/#/voting/${id}`;
                    break;
                case 'survey':
                    window.location = `/#/survey/${id}`;
                    break;
                case 'director':
                    window.location = `/#/director/${id}`;
                    break;
                case 'admin':
                    window.location = `/#/admin/${id}`;
                    break;
                case 'staff':
                    window.location = `/#/staff/${id}`;
                    break;
                case 'folder':
                    window.location = `/#/resource/${id}`;
                    break;
                case 'signdoc':
                    window.location = `/#/signdoc/${id}`;
                    break;
                case 'signdocument':
                    window.location = `/#/signdoc/${id}`;
                    break;
            }

        } else if(action == 'survey_submit')
        {
            switch(model)
            {
                case 'survey':
                    window.location = `/#/survey/${id}/results`;
            }
        } else {
            switch (model) {
                case 'event':
                        window.location = `/#/meetings/upcoming`;
                        break;
                case 'committee':
                        window.location = `/#/committees`;
                        break;
                case 'voting':
                        window.location = `/#/votings`;
                        break;
                case 'survey':
                        window.location = `/#/surveys`;
                        break;
                case 'director':
                    window.location = `/#/profiles/directors`;
                    break;
                case 'admin':
                    window.location = `/#/profiles/admins`;
                    break;
                case 'staff':
                    window.location = `/#/profiles/staff`;
                    break;
                case 'folder':
                    window.location = `/#/resources`;
                    break;
                case 'signdoc':
                    window.location = `/#/signdocs`;
                    break;
                case 'signdocument':
                    window.location = `/#/signdocs`;
                    break;
            }
        }
    }
}, false);


function handleSessionExpiry() {
    if(is_local_host)
    {
        //return;
    }
    clearTimeout(time_out_session);
    time_out_session = setTimeout(function() {        
        site_functions.go_to_login();
    }, session_time_limit);
}
handleSessionExpiry();

function check_if_touch_device() {
    var wl = window.location;
    if(wl.toString().indexOf('localhost') > -1)
    {
        is_local_host = true;
    }
    if (wl.hash) {
        window['pathname'] = wl.hash.substr(1, wl.hash.length);
    } else {
        window['pathname'] = wl.toString().replace(window.location.origin, '');
    }
    try
    { 
        document.createEvent("TouchEvent");
        is_mobile_device = true;
        window['is_mobile_device'] = 1;
    }
    catch(e)
    {
        return false; 
    }
}

window['current_user'] = dn_current_site_user;
window["functions"] = site_functions;
check_if_touch_device();
addMainEventListeners();
dn_current_site_user.initUserDataFromCookie();