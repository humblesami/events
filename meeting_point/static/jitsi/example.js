/* global $, JitsiMeetJS */
$(function(){

    var curl = window.location.toString();
    var temp = curl.split('?');
    var username = 'Sami';
    var meeting_id = false;
    var roomPin = false;
    var isAdmin = false;

    if(Array.isArray(temp) && temp.length > 1)
    {
        temp = temp[1];
        var arrr = temp.split('&');
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
                    isAdmin =attendees_data.isAdmin;
                    console.log(roomName);
                    joinCononference(roomName,isAdmin);
                }
                $('#loaderContainerajax').hide();
            });
        };
        verfify_user();
    }
    else
    {
        meeting_id = 1;
        roomPin = 'marziii';
        isAdmin=true;
        joinCononference('samig',isAdmin);
    }

    function joinCononference(roomName,isAdmin){
        const options = {
            hosts: {
                domain: 'meet.jit.si',
                muc: 'conference.meet.jit.si' // FIXME: use XEP-0030
            },
            bosh: 'https://meet.jit.si/http-bind', // FIXME: use xep-0156 for that

            // The name of client node advertised in XEP-0115 'c' stanza
            clientNode: 'http://jitsi.org/jitsimeet'
        };

        const confOptions = {
            openBridgeChannel: true,
            channelLastN: 1
        };

        let connection = null;
        let isJoined = false;
         let room = null;

         let localTracks = [];
        const remoteTracks = {};

        /**
         * Handles local tracks.
         * @param tracks Array with JitsiTrack objects
         */
        function onLocalTracks(tracks) {
            sharingVideo=true;
            sharingScreen=false;
            $('#share_video').css("color", "purple");
            localTracks.push(tracks[0]);
            for (let i = 0; i < localTracks.length; i++) {
                localTracks[i].addEventListener(
                    JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
                    audioLevel => console.log(`Audio Level local: ${audioLevel}`));
                localTracks[i].addEventListener(
                    JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                    () => console.log('local track muted'));
                localTracks[i].addEventListener(
                    JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                    () => console.log('local track stoped'));
                localTracks[i].addEventListener(
                    JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
                    deviceId =>
                        console.log(
                            `track audio output device was changed to ${deviceId}`));
                if (localTracks[i].getType() === 'video') {

                    localTracks[i].attach($(`#localVideo${i}`)[0]);
                    $('#remote_container video:last').click();
                } else {

                    localTracks[i].attach($(`#localAudio${i}`)[0]);
                }
            }
        }


        /**
         * Handles remote tracks
         * @param track JitsiTrack object
         */
        function onRemoteTrack(track) {

            if (track.isLocal()) {
                return;
            }
            const participant = track.getParticipantId();

            if (!remoteTracks[participant]) {
                remoteTracks[participant] = [];
            }
            const idx = remoteTracks[participant].push(track);

            track.addEventListener(
                JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
                audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
            track.addEventListener(
                JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('remote track muted'));
            track.addEventListener(
                JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('remote track stoped'));
            track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
                deviceId =>
                    console.log(
                        `track audio output device was changed to ${deviceId}`));
            const id = participant + track.getType(); //+ idx;

            if (track.getType() === 'video') {
                if($(`#${id}`).length==0){
                    $('#remote_container').append(
                        `<div class='${participant} remote_video'>
                        ${remote_controlls}
                        <div class='display_name'>Participant</div>
                        <video autoplay='1' id='${id}' />
                        </div>`);
                }


            } else {
                if($(`#${id}`).length==0){
                $('#remote_container').append(
                    `<div class='${participant} remote_audio'><audio autoplay='1' id='${id}' /></div>`);
                }
            }
            track.attach($(`#${id}`)[0]);
            $('#remote_container video:last').click();
        }

        function onRemoteTrackRemove(track) {
            const participant = track.getParticipantId();
            const type = track.getType();
            // $(`.${participant} ${type}`).remove()
            // track.detach($(`#${participant}${track.getType()}`));
            // console.log("track removed:",participant)
        }
        /**
         * That function is executed when the conference is joined
         */
        function onConferenceJoined() {
            console.log('conference joined!');
            isJoined = true;
            if(isAdmin){
                localTracks[0].unmute();
                sharingAudio=true;
                $('#mute_audio').css("color", "white");
            }
            for (let i = 0; i < localTracks.length; i++) {
                room.addTrack(localTracks[i]);
            }
        }

        /**
         *
         * @param id
         */
        function onUserLeft(id) {
            console.log('user left');
            if (!remoteTracks[id]) {
                return;
            }
            const tracks = remoteTracks[id];

            for (let i = 0; i < tracks.length; i++) {
                tracks[i].detach($(`#${id}${tracks[i].getType()}`));
            }
             $(`.${id}`).remove();
        }

        /**
         * That function is called when connection is established successfully
         */
        function onConnectionSuccess() {
            room = connection.initJitsiConference(roomName, confOptions);
            room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
            room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, onRemoteTrackRemove)
            room.on(
                JitsiMeetJS.events.conference.CONFERENCE_JOINED,
                onConferenceJoined);
            room.on(JitsiMeetJS.events.conference.USER_JOINED, id => {
                console.log('user join');
                remoteTracks[id] = [];
            });
            room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
            room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, track => {
                console.log(`${track.getType()} - ${track.isMuted()}`);
            });
            room.on(
                JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
                (userID, displayName) => console.log(`${userID} - ${displayName}`));
            room.on(
                JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
                (userID, audioLevel) => console.log(`${userID} - ${audioLevel}`));
            room.on(
                JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED,
                () => console.log(`${room.getPhoneNumber()} - ${room.getPhonePin()}`));
            room.join();
        }

        /**
         * This function is called when the connection fail.
         */
        function onConnectionFailed() {
            console.error('Connection Failed!');
        }

        /**
         * This function is called when the connection fail.
         */
        function onDeviceListChanged(devices) {
            console.info('current devices', devices);
        }

        /**
         * This function is called when we disconnect.
         */
        function disconnect() {
            console.log('disconnect!');
            connection.removeEventListener(
                JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
                onConnectionSuccess);
            connection.removeEventListener(
                JitsiMeetJS.events.connection.CONNECTION_FAILED,
                onConnectionFailed);
            connection.removeEventListener(
                JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
                disconnect);
        }

        /**
         *
         */
        function unload() {
            for (let i = 0; i < localTracks.length; i++) {
                localTracks[i].dispose();
            }
            room.leave();
            connection.disconnect();
        }

        let sharingVideo = false;
        let sharingScreen = false;
        let sharingAudio = false;


        function shareVideo() { // eslint-disable-line no-unused-vars
            if (localTracks[1]) {
                localTracks[1].dispose();
                localTracks.pop();
            }
            if(!sharingVideo){

                JitsiMeetJS.createLocalTracks({
                devices: ['video' ]
            })
                .then(tracks => {
                    sharingVideo=true;
                    sharingScreen=false;
                    $(this).css("color", "purple");
                    $('#share_screen').css("color", "white");
                    localTracks.push(tracks[0]);
                    localTracks[1].addEventListener(
                        JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                        () => console.log('local track muted'));
                    localTracks[1].addEventListener(
                        JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                        () => console.log('local track stoped'));


                    localTracks[1].attach($('#localVideo1')[0]);
                    room.addTrack(localTracks[1]);
                })
                .catch(error => console.log(error));

            }else{
                sharingVideo=false;
                $(this).css("color", "white");
            }

        }

        function shareScreen() { // eslint-disable-line no-unused-vars
            if (localTracks[1]) {
                localTracks[1].dispose();

                localTracks.pop();
            }
            if(!sharingScreen){

                JitsiMeetJS.createLocalTracks({
                devices: ['desktop' ]
            })
                .then(tracks => {
                    $(this).css("color", "purple");
                    $('#share_video').css("color", "white");
                    sharingScreen=true;
                    sharingVideo=false;
                    localTracks.push(tracks[0]);
                    localTracks[1].addEventListener(
                        JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                        () => console.log('local track muted'));
                    localTracks[1].addEventListener(
                        JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                        () => console.log('local track stoped'));

                    localTracks[1].attach($('#localVideo1')[0]);
                    room.addTrack(localTracks[1]);
                })
                .catch(error => console.log(error));

            }else{
                sharingScreen=false;
                $(this).css("color", "white");
            }
        }

        function toggleAudio() { // eslint-disable-line no-unused-vars

            if(!sharingAudio){
                localTracks[0].unmute();
                sharingAudio = true;
                $(this).css("color", "white");

            }else{
                localTracks[0].mute();
                sharingAudio=false;
                $(this).css("color", "purple");
            }
        }

        function showAsMainVideo(videoSource)
            {
                //console.log(videoSource);
                $('#large-video').html('<video autoplay/>')
                $('#large-video video')[0].srcObject = videoSource;
            }

        $('#leave-room').click(unload);
        $('#share_screen').click(shareScreen);
        $('#share_video').click(shareVideo);
        $('#mute_audio').click(toggleAudio);
        $('body').on('click', '#remote_container video', function(){
            let id = $(this).parent()[0].classList[0];
            showAsMainVideo(this.srcObject);
            if(room && id !="local_video"){
                room.selectParticipant(id);
            }

        });
        $('body').on('click', '#remote_container .kick_out', function(){
            let id =this.closest('.remote_video').classList[0]
            room.kickParticipant(id);

        });
        $('body').on('click', '#remote_container .mute_this', function(){
            let id =this.closest('.remote_video').classList[0]
            room.muteParticipant(id);

        });

        /**
         *
         * @param selected
         */
        function changeAudioOutput(selected) { // eslint-disable-line no-unused-vars
            JitsiMeetJS.mediaDevices.setAudioOutputDevice(selected.value);
        }

        $(window).bind('beforeunload', unload);
        $(window).bind('unload', unload);

        // JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
        const initOptions = {
            disableAudioLevels: true,
           // channelLastN: 1,

            // The ID of the jidesha extension for Chrome.
            desktopSharingChromeExtId: 'mbocklcggfhnbahlnepmldehdhpjfcjp',

            // Whether desktop sharing should be disabled on Chrome.
            desktopSharingChromeDisabled: false,

            // The media sources to use when using screen sharing with the Chrome
            // extension.
            desktopSharingChromeSources: [ 'screen', 'window' ],

            // Required version of Chrome extension
            desktopSharingChromeMinExtVersion: '0.1',

            // Whether desktop sharing should be disabled on Firefox.
            desktopSharingFirefoxDisabled: false
        };

        JitsiMeetJS.init(initOptions);

        connection = new JitsiMeetJS.JitsiConnection(null, null, options);

        connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
            onConnectionSuccess);
        connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_FAILED,
            onConnectionFailed);
        connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
            disconnect);

        JitsiMeetJS.mediaDevices.addEventListener(
            JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
            onDeviceListChanged);
        JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
        connection.connect();

        let remote_controlls="";

        JitsiMeetJS.createLocalTracks({
                devices: ['audio' ]
            })
                .then(tracks => {
                    $(this).css("color", "white");
                    sharingAudio=true;
                    localTracks.push(tracks[0]);
                    localTracks[0].addEventListener(
                        JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                        () => console.log('local track muted'));
                    localTracks[0].addEventListener(
                        JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                        () => console.log('local track stoped'));

                    localTracks[0].attach($('#localAudio1')[0]);
                    localTracks[0].mute();
                    sharingAudio=false;
                    $('#mute_audio').css("color", "purple");
//                    room.addTrack(localTracks[0]);
                })
                .catch(error => console.log(error));

        if(isAdmin){
            $('#mute_audio').css("color", "white");
            remote_controlls=`<div class='remote_controlls'>
                        <button class='kick_out'>Kick</button>
                        <button class='mute_this'>Mute</button>
                        </div>`

            JitsiMeetJS.createLocalTracks({ devices: ['video' ] })
            .then(onLocalTracks)
            .catch(error => {
                throw error;
            });
         $('#share_screen').show();
         $('#share_video').show();

        }
        else{


        }



        if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
            JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
                const audioOutputDevices
                    = devices.filter(d => d.kind === 'audiooutput');

                if (audioOutputDevices.length > 1) {
                    $('#audioOutputSelect').html(
                        audioOutputDevices
                            .map(
                                d =>
                                    `<option value="${d.deviceId}">${d.label}</option>`)
                            .join('\n'));

                    $('#audioOutputSelectWrapper').show();
                }
            });
        }

    }
})
