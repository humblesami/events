

var dntoast =
{
    initialized: false,
    inittoast: function () {
        var toast_html = '<div class="dntoast" id="dntoast" style="color:white;padding:10px">';
        toast_html += '<div class="message"></div><button style="display:none">OK</button></div>';

        $('body').append(toast_html);
        $('#dntoast').css({
            'z-index': 99999,
            position: 'absolute',
            display: 'none',
            'max-width': '33%',
            'right': '2%',
            'color': 'white',
            overflow: 'auto',
            'max-height': '70%',
            top: '8%',
            'text-align': 'center',
            'font-weight': '400'
        });
        $('#dntoast .message').css('width', '100%');
        $('#dntoast>button').css('color','black').click(function () {
            dntoast.hide();
        });
        var dt = new Date();
        var clicks = 0;
        $('#dntoast').click(function () {
            var dt1 = new Date();
            if (clicks == 1) {
                var diffInSeconds = (dt1.getSeconds() * 1000 + dt1.getMilliseconds()) - (dt.getSeconds() * 1000 + dt.getMilliseconds());
                if (diffInSeconds < 0)
                    diffInSeconds *= -1;
                if (diffInSeconds > 1500)
                    clicks = 0;
                else
                    dntoast.hide();
            }
            else
                clicks++;
            dt = dt1;
        });
        dntoast.initialized = true;
    },
    defaultInterval: 15000,
    showToast: function (mesg, interval, color, ok_btn) {
        if (!dntoast.initialized)
            dntoast.inittoast();

        $('#dntoast .message').html(mesg);
        if(ok_btn)
            $('#dntoast button:last').show();
        $('#dntoast').css({ 'background-color': color, 'display': 'block' });
        if (!interval)
            interval = dntoast.defaultInterval;
        else if (interval < 1000)
                interval = interval * 1000;
        if (this.messageTimeOut != null)
            clearTimeout(this.messageTimeOut);
        this.messageTimeOut = setTimeout(function () {
            dntoast.hide();
        }, interval);
    },
    messageTimeOut: null,
    error: function (mesg, interval, ok_btn) {
        if(!ok_btn)
            ok_btn = false;
        dntoast.showToast(mesg, interval, 'red', ok_btn);
    },
    message: function (mesg, interval, ok_btn) {
        if(!ok_btn)
            ok_btn = false;
        dntoast.showToast(mesg, interval, 'green', ok_btn);
    },

    hide: function () {
        $('#dntoast').hide();
    }
}