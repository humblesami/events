console.log(13344);
$(function() {

    //        let roomName = undefined;
            var curl = window.location.toString();
            var temp = curl.split('meeting_id=')[1];
            var meeting_id = temp.split('&')[0];
            var roomPin = temp.split('pin=')[1];



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
            if (attendees_data.im_attendee && attendees_data.im_attendee == 'yes') {
                roomName = attendees_data.roomName;
                joinCononference(roomName, roomPin, curl, meeting_id);
            }
        });
    };
    //        bootbox.prompt("Please Enter Password", function(promptValue){
                verfify_user();
    //            console.log("hhhhhh");
    //        });


    function joinCononference(roomName, roomPin, curl, meeting_id) {
        setTimeout(function() {
            $('#loaderContainerajax').show();
        }, 100);
        setTimeout(function() {
            $('#loaderContainerajax').hide();
        }, 20000);

        var domain = "beta.meet.jit.si";
        var config = {
            enableUserRolesBasedOnToken: true,
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
                'camera',
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
            width: window.innerWidth - 10,
            height: window.innerHeight - 100,
            parentNode: document.querySelector('#meeting-room'),
            configOverwrite: config,
            //jwt: "dnmeetvuemeetingtoken",
            interfaceConfigOverwrite: interfaceConfig
        };

        var api = new JitsiMeetExternalAPI(domain, options);
//        var joinin_user_name = window['current_user'].cookie.name;
//        api.executeCommand('displayName', joinin_user_name);

        var is_admin = false;
        var moderator_id = undefined;
        var events = {
            videoConferenceJoined: function(data) {
                $('#loaderContainerajax').hide();
                var cnt = 0;
                for (var uid in api._participants) {
                    ++cnt;
                    if (cnt == 1)
                        moderator_id = uid;
                    if (uid == api._myUserID) {
                        if (uid === moderator_id)
                            is_admin = true;

                    }
                }


            },
            videoConferenceLeft: function(data) {
                $('#jitsi-meet-container').hide();
                if (is_admin) {
                    dn_json_rpc('/meeting/moderatorleft', {
                        meeting_id: meeting_id
                    }, function(data) {
                        //                        obj_this.router.navigate(['/meeting/'+meeting_id]);
                        console.log("moderator left");

                    });
                } else
                    //                    obj_this.router.navigate(['/meeting/'+meeting_id]);
                    console.log("I left");
            },
            participantLeft: function(data) {
                if (data.id == moderator_id) {
//                    alert("Moderator left the meeting, please comae back in a minute");

                    //                    obj_this.router.navigate(['/meeting/'+meeting_id]);
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
});