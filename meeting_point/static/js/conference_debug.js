$(function() {
    //        let roomName = undefined;
    var curl = window.location.toString();
    var temp = curl.split('?')[1];
    var arrr = temp.split('&');
    var username = 'Sami';
    var meeting_id = false;
    var roomPin = false;
    if(arrr.length > 2)
    {
        username = arrr[0].split('=')[1];
        meeting_id = arrr[1].split('=')[1];
        roomPin = arrr[2].split('=')[1];
    }
    else
    {
        meeting_id = arrr[0].split('=')[1];
        roomPin = arrr[1].split('=')[1];
    }

    var verfify_user = function(password) {
        let input_data = {
            pin: roomPin,
            meeting_id: meeting_id,
        };
        if (password) {
            input_data['password'] = password;
        }
        //var attendees_data = {im_attendee :'yes' }
        dn_json_rpc('/meeting/attendees', input_data, function(attendees_data) {
            if (attendees_data.im_attendee) {
                roomName = attendees_data.roomName;
                joinCononference(roomName, roomPin, curl, meeting_id, attendees_data);
            }
        });
    };
    //        bootbox.prompt("Please Enter Password", function(promptValue){
    verfify_user();
    //            console.log("hhhhhh");
    //        });


    function joinCononference(roomName, roomPin, curl, meeting_id, attendees_data) {
        setTimeout(function() {
            $('#loaderContainerajax').show();
        }, 100);
        setTimeout(function() {
            $('#loaderContainerajax').hide();
        }, 20000);

        var end_call = attendees_data.end_call
        var domain = "meet.jit.si";
        var config = {
            enableUserRolesBasedOnToken: true,
//            startWithVideoMuted: true,
            channelLastN: 1,
            // Local Recording
            localRecording: {
                //Enables local recording.
                //button to show up on the toolbar.
                enabled: true,
                //The recording format, can be one of 'ogg', 'flac' or 'wav'.
                format: 'flac'
            },
        };

        var interfaceConfig = {

            SHOW_JITSI_WATERMARK: false,
            //JITSI_WATERMARK_LINK: 'https://jitsi.org',
            JITSI_WATERMARK_LINK: '',

            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            BRAND_WATERMARK_LINK: '',

            APP_NAME: 'MeetVUE',
            NATIVE_APP_NAME: 'MeetVUE',
            AUTHENTICATION_ENABLE: true,
            DISPLAY_WELCOME_PAGE_CONTENT: false,

            /**
             * The name of the toolbar buttons to display in the toolbar. If present,
             * the button will display. Exceptions are "livestreaming" and "recording"
             * which also require being a moderator and some values in config.js to be
             * enabled. Also, the "profile" button will not display for user's with a
             * jwt.
             */
            TOOLBAR_BUTTONS: [
                'microphone',
//                'camera',
                //'closedcaptions',
                'desktop',
                'fullscreen',
                //'fodeviceselection',
                'hangup',
                'profile',
                'chat',
                'recording',
                //'info',
                //'livestreaming',
                //'etherpad',
                'sharedvideo',
                //'settings',
                //'raisehand',
                'videoquality',
                'filmstrip',
                //'invite',
                //'feedback',
                //'stats',
                //'shortcuts',
                //'tileview'
            ],

            MOBILE_APP_PROMO: false,
            //SUPPORT_URL: 'https://github.com/jitsi/jitsi-meet/issues/new',
        };

        var options = {
            roomName: roomName,
            width: "100%",//window.innerWidth - 10,
            height: "90%",//window.innerHeight - 65,
            parentNode: document.querySelector('#meeting-room'),
            configOverwrite: config,
            //jwt: "dnmeetvuemeetingtoken",
            interfaceConfigOverwrite: interfaceConfig
        };

        var api = new JitsiMeetExternalAPI(domain, options);
        api.executeCommand('displayName', username);

        var is_admin = false;
        var moderator_id = undefined;
        var events = {
            videoConferenceJoined: function(data) {
                $('#loaderContainerajax').hide();
                var cnt = 0;
                for (var uid in api._participants) {
                    ++cnt;
                    if (cnt == 1)
                    {
                        moderator_id = uid;
                        console.log(attendees_data);
                    }
                    if (uid == api._myUserID) {
                        if (uid === moderator_id)
                            is_admin = true;
                    }
                }
            },
            videoConferenceLeft: function(data) {
                $('#jitsi-meet-container').hide();
//                if (is_admin) {
//                    dn_json_rpc('/meeting/moderatorleft', {
//                        meeting_id: meeting_id
//                    }, function(data) {
//
//                    });
//                }
                go_back_meeting();
            },
            participantLeft: function(data) {
                if (data.id == moderator_id && end_call) {
                    go_back_meeting();
                }
            }
        };
        api.addEventListeners(events);

    }
    $('#meeting-info-box .url').html('Link: ' + curl);
    $('#meeting-info-box .pin').html('PIN: ' + roomPin + '#');
    $('#meeting-info-btn').click(function() {
        $('#meeting-info-box').toggle();
    });

    function go_back_meeting()
    {
        var meeting_url = window.location.origin.toString();
        if(document.referrer)
            history.go(-1);
        else
        {
            meeting_url = meeting_url +'/web#id='+meeting_id+'&view_type=form&model=calendar.event';
            window.location = meeting_url;
        }
    }
    $('#back_to_meeting_link').click(go_back_meeting);
});