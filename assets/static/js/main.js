(function() {
    var wl = window.location;
    if (wl.hash) {
        window['pathname'] = wl.hash.substr(1, wl.hash.length);
    } else {
        window['pathname'] = wl.toString().replace(window.location.origin, '');
    }
})()

var dn_current_site_user = {
    cookie: {
        token: "",
        name: "",
        id: undefined,
        photo: false
    },
    socket: {},
    verified: 0,
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    verifyCookie: function() {
        var user_info = dn_current_site_user.cookie;
        if (user_info.token)
            dn_current_site_user.verified = 1;
        return dn_current_site_user.verified;
    },
    verifyUserToken: function() {
        site_functions.showLoader("verifytoken");
        var user_info = dn_current_site_user.cookie;
        var ajaxOptions = {
            url: site_config.server_base_url + "/ws/verifytoken",
            //async: false,
            data: user_info,
            success: function(res) {
                if (typeof res == 'string')
                    res = JSON.parse(res);
                if (res.data == 'ok') {
                    dn_current_site_user.verified = 1;
                }
            },
            errro: function(er) {
                console.log(er);
            },
            complete: function() {
                site_functions.hideLoader("verifytoken");
            }
        };
        $.ajax(ajaxOptions);
    },
    onLogin: function(data) {
        dn_current_site_user.cookie = data;
        data = JSON.stringify(data);
        localStorage.setItem("user", data);
        dn_current_site_user.verified = 1;
    },
    logout: function(navigate) {
        localStorage.removeItem("user");
        dn_current_site_user.cookie = false;
        dn_current_site_user.verified = 0;
        if (navigate) {
            if (!window['odoo']) {
                window.location = site_config.site_url + "/login";
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
var last_shown_time = undefined;
window['public_routes'] = ['/login', '/logout'];


var site_functions = {
    processes: [],
    get_path: function() {

    },
    showLoader: function(nam) {
        if (this.processes.length == 0) {
            server_wait_loader.show();
            last_shown_time = new Date();
            setTimeout(function() {
                if (last_shown_time && new Date() - last_shown_time > 8000) {
                    //console.log(site_functions.processes);
                    server_wait_loader.hide();
                }
            }, 9900);
        }
        this.processes.push(nam);
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
            if (this.processes[i] == nam) {
                found = true;
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
            last_shown_time = undefined;
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
        console.log(234, 'Shown/hideen');
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