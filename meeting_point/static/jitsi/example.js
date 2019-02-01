/* global $, JitsiMeetJS */
$(function(){

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
        openBridgeChannel: true
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
        localTracks = tracks;
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
                $('#remote_container').append(
                    `<div class='local_video'><video autoplay='1' id='localVideo${i}' /></div>`);
                localTracks[i].attach($(`#localVideo${i}`)[0]);
            } else {
                $('#remote_container').append(
                    `<div class='local_audio'><audio autoplay='1' muted='true' id='localAudio${i}' /></div>`);
                localTracks[i].attach($(`#localAudio${i}`)[0]);
            }
            // if (isJoined) {
            //     console.log("addeddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
            //     room.addTrack(localTracks[i]);
            // }
        }
    }
    let remote_controlls=`<div class='remote_controlls'>
    <button class='kick_out'>Kick</button>
    <button class='mute_this'>Mute</button>
    </div>`
        if((Math.floor(Math.random() * 10) + 1) %2==0){
            remote_controlls="";
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
        room = connection.initJitsiConference('dn_meetings', confOptions);
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
    
    let isVideo = true;
    
    /**
     *
     */
    function switchVideo() { // eslint-disable-line no-unused-vars
        isVideo = !isVideo;
        if (localTracks[1]) {
            localTracks[1].dispose();
            localTracks.pop();
        }
        JitsiMeetJS.createLocalTracks({
            devices: [ isVideo ? 'video' : 'desktop' ]
        })
            .then(tracks => {
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
    }

    function showAsMainVideo(videoSource)
        {
            //console.log(videoSource);
            $('#large-video').html('<video autoplay/>')            
            $('#large-video video')[0].srcObject = videoSource;
        }

    $('#leave-room').click(unload);
    $('#switch_screen').click(switchVideo);
    $('body').on('click', '#remote_container video', function(){            
        showAsMainVideo(this.srcObject);
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
    
    connection.connect();
    
    JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ] })
        .then(onLocalTracks)
        .catch(error => {
            throw error;
        });
    
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
    

})
