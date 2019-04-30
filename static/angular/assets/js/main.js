(function() {
    var wl = window.location;
    if (wl.hash) {
        window['pathname'] = wl.hash.substr(1, wl.hash.length);
    } else {
        window['pathname'] = wl.toString().replace(window.location.origin, '');
    }
    window['click_events'] = {};
})()

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
        var user_info = dn_current_site_user.cookie;
        dn_current_site_user.cookie = localStorage.getItem('user');
        if(dn_current_site_user.cookie)
        {
            dn_current_site_user.cookie = JSON.parse(dn_current_site_user.cookie);
            if(!dn_current_site_user.cookie.token)
            {
                site_functions.go_to_login();
            }
        }
    },
    onLogin: function(data) {
        dn_current_site_user.cookie = data;
        data = JSON.stringify(data);
        localStorage.setItem('user', data);
        dn_current_site_user.verified = 1;
    },
    logout: function(navigate) {        
        localStorage.removeItem("user");
        dn_current_site_user.cookie = false;
        dn_current_site_user.verified = 0;
        if(window['socket_manager'])
        {
            window['socket_manager'].user_data = undefined;
        }
        if (navigate) {
            if(window['go_login'])
            {
                window['go_login']();
            }
            else
            {
                window.location = site_config.site_url+ "/#/login";
            }            
            setTimeout(function() {
                bootbox.hideAll();
                dn_current_site_user.removeEventListners();
            }, 2000);
        } else {
            dn_current_site_user.removeEventListners();
        }
    },
    removeEventListners: function() {
        $(document).off('click');
        $(document).off('mouseup');
        $(document).off('mousedown');
        $(document).off('mousemove');
        $(document).off('touchstart');
        $(document).off('touchend');
        $(document).off('touchmove');
        $(document).off('keydown');
        $(document).off('keyup');


        $(document.body).off('click');
        $(document.body).off('mouseup');
        $(document.body).off('mousedown');
        $(document.body).off('mousemove');
        $(document.body).off('touchstart');
        $(document.body).off('touchend');
        $(document.body).off('touchmove');
        $(document.body).off('keydown');
        $(document.body).off('keyup');
        window['click_events'] = {};
        addMainEventListeners();
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

function standeredTime(time) {
    return moment(time).format('MMM DD YYYY, h:mm:ss A');
}

window['current_user'] = dn_current_site_user;
var server_wait_loader = $("#server-wait");
window['public_routes'] = ['/login', '/logout'];

var site_functions = {
    processes: [],
    get_path: function() {

    },
    go_to_login: function(){
        window.location = '/#/login';
    },
    meeting_time : function(dt){
        var moment_time = moment(dt, 'YYYY-MM-DD HH:mm:ss')
        var res = {
            day: moment_time.format('DD'),
            month_year: moment_time.format('MMM YYYY'),
            time: moment_time.format('HH:mm A')
        }
        return res;
    },
    meeting_time_str : function(dt){
        var moment_time = moment(dt, 'YYYY-MM-DD HH:mm:ss');
        res = moment_time.format('MMM DD, YYYY hh:mm A');
        return res;
    },
    hour_minutes: function(dt) {
        if (typeof (dt) == "string")
            dt = new Date(dt);
        var hour = dt.getHours();
        var minut = dt.getMinutes();
        if (minut < 10) {
            minut = '0' + minut;
        }
        return hour + ':' + minut;
    },
    logout_odoo:function(){        
        window.location = '/web/login';
    },
    showLoader: function(nam) {
        var obj_this = this;
        var time_out = undefined;
        if (obj_this.processes.length == 0) {
            server_wait_loader.show();            
            time_out = setTimeout(function() {
                obj_this.hideLoader(nam);
            }, 29000);
        }
        obj_this.processes.push({name: nam, time_out: time_out});
        //console.log(nam, new Date().getMilliseconds());
    },
    hideLoader: function(nam, hiddenFrom) {
        if (!nam || nam == 'force') {
            this.processes = [];
            if (!nam)
                console.trace();
            else {
                if(nam != 'force')
                console.log("Hidden from " + hiddenFrom);
            }
            server_wait_loader.hide();
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
    togglerelated: function(e, el, selector) {        
        if ($(el).hasClass('active')) {
            $(el).removeClass('active');
            $(selector).hide();
        } else {
            $('.showmouseawaybutton.active').removeClass('active');
            $('.hidemouseaway').hide();
            $(el).addClass('active');
            $(selector).show();
        }
    }
};
window["functions"] = site_functions;
site_functions['standeredTime'] = standeredTime;
dn_current_site_user.initUserDataFromCookie();

function getUrlLastItem() {
    var point_id = window.location.toString().split("/");
    return point_id[point_id.length - 1];
}

function addMainEventListeners() {
    $(document).on('mousedown touchstart', function(e) {
        //console.log(2222111);
        var target = e.target;
        var showbtn = $(target).closest('.showmouseawaybutton');
        if (showbtn && showbtn.length > 0) {
            return;
        } else {
            var shownpanel = $(target).closest('.hidemouseaway');
            if (shownpanel && shownpanel.length > 0)
                return;
            else {
                $('.showmouseawaybutton').removeClass('active');
                $('.hidemouseaway').hide();
            }
        }
    });

    $('body').on('mouseup', '.navbar-toggler', function(e) {
        togglerelated = site_functions.togglerelated;
        togglerelated(e, this, '.navbarNavDropdown');
    });
    $('body').on('click', '.btnclosemodel', function() {
        $(this)
            .closest(".modal")
            .modal("hide");
    });
    $('body').on('hidden.bs.modal', '.modal', function () {        
        $('body').removeClass('modal-open');
    });

    var search_active = false;
    $("body").on("click", ".top-search-btn", function() {
        $(".serach-input")
            .toggleClass("active")
            .focus();
        $(".btn-search").toggleClass("animate");
        $(".serach-input").val("");
        search_active = true;
    });

    function handleSessionExpiry() {
        if (time_out_session && dn_current_site_user.cookie && dn_current_site_user.cookie.token) {
            clearTimeout(time_out_session);
            time_out_session = setTimeout(function() {
                dn_current_site_user.logout(1);
            }, 600000);
        }
    }


    function hideSearchbar(e) {
        var $target = $(e.target);
        var isSearchbarshown = $(".searchbar-full-width:visible").length > 0;
        if (
            isSearchbarshown &&
            $target.closest(".searchbar-full-width").length == 0
        )
            $(".searchbar-full-width").hide();
        else if ($target.closest("#search-btn").length > 0) {
            $(".searchbar-full-width")
                .show()
                .find("input:first")
                .focus();
        }
    }

    var time_out_session = setTimeout(dn_current_site_user.logout, 600000);
    (function() {
        if (site_config.site_url.indexOf('localhost') > -1) {
            clearTimeout(time_out_session);
            time_out_session = undefined;
        }
    })();

    $(document).on("mouseup touchend keyup", function(e) {
        handleSessionExpiry();
        hideSearchbar(e);
    });

    var showHeaderAt = 0;
    var win = $(window),
        body = $("body");
    if (win.width() > 0) {
        win.on("scroll", function(e) {
            if (win.scrollTop() > showHeaderAt) {
                body.addClass("fixed");
            } else {
                body.removeClass("fixed");
            }
        });
    }
}
addMainEventListeners();
dn_current_site_user.verifyUserToken();

var public_methods = {
    'authsignup':{
        'AuthUser':{
            'login_user': 1
        }
    }
}

window.addEventListener('message', function receiveMessage(evt)
{
  if (evt.origin === 'http://my.iframe.org')
  {
    alert("got message: "+evt.data);
  }
//   alert("got message: "+evt.origin);
}, false);

