(function(){
    var video_caller = {};
    function setup_call(params, on_started){
        function init_call(){
            document.getElementById('open-room').onclick = function() {        
                disableInputButtons();            
                var roomid = document.getElementById('room-id').value;
                beforeOpenOrJoin(roomid, function() {
                    connection.socketCustomParameters = '&user_id='+user_id+'&token='+token;
                    connection.openOrJoin(roomid, function(isRoomExist, roomid, error) {
                        if(error) {
                            console.log(error, isRoomExist);
                            disableInputButtons(true);
                            return;
                        }
                        else if (connection.isInitiator === true) {                        
                            console.log('Yes moderator-', roomid);
                        }
                        else{
                            console.log('Attendee-', roomid);
                        }
    
                        function close_window(message)
                        {
                            window.close();
                        }
                        video_caller.socket = connection.socket;
                        afterOpenOrJoin();
                        if(on_started)
                        {
                            on_started();
                        }
                    });
                });
            };
    
            // document.getElementById('leave-room').onclick = function(){
            //     close_window()
            // };
            
            // ......................................................
            // ..................RTCMultiConnection Code.............
            // ......................................................
            
            var connection = new RTCMultiConnection();
            connection.enableLogs = false;
            
            // by default, socket.io server is assumed to be deployed on your own URL
            // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com/';
            connection.socketURL = site_config.chat_server +'/rtc/';
            //console.log(connection.socketURL, 1009);
            
            // comment-out below line if you do not have your own socket.io server
            // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
            
            connection.socketMessageEvent = 'video-screen-demo';
            
            connection.session = {
                audio: true,
                video: true
            };
            
            connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            };
            
            connection.videosContainer = document.getElementById('videos-container');
            connection.onstream = function(event) {
                var existing = document.getElementById(event.streamid);
                if(existing && existing.parentNode) {
                existing.parentNode.removeChild(existing);
                }

                if(event.type === 'local' && event.stream.isVideo) {
                    RMCMediaTrack.cameraStream = event.stream;
                    RMCMediaTrack.cameraTrack = event.stream.getVideoTracks()[0];
                    // RMCMediaTrack.cameraStream.mute();                    
                }
            
                event.mediaElement.removeAttribute('src');
                event.mediaElement.removeAttribute('srcObject');
                event.mediaElement.muted = true;
                event.mediaElement.volume = 0;
            
                var video = document.createElement('video');
            
                try {
                    video.setAttributeNode(document.createAttribute('autoplay'));
                    video.setAttributeNode(document.createAttribute('playsinline'));
                } catch (e) {
                    video.setAttribute('autoplay', true);
                    video.setAttribute('playsinline', true);
                }
                
            
                if(event.type === 'local') {
                    video.volume = 0;
                    try {
                        video.setAttributeNode(document.createAttribute('muted'));
                        // video.setAttributeNode(document.createAttribute('controls'));
                    } catch (e) {
                        video.setAttribute('muted', true);
                        // video.setAttribute('controls', true);
                    }
                }
                video.setAttribute('controls', true);
                video.srcObject = event.stream;
                // event.stream.getVideoTracks()[0].enabled = true;
                // event.stream.getAudioTracks()[0].enabled = true;
            
                var width = parseInt(connection.videosContainer.clientWidth / 3) - 20;
                var mediaElement = getHTMLMediaElement(video, {
                    title: event.userid,
                    buttons: ['full-screen'],
                    // width: width,
                    showOnMouseEnter: false
                });
            
                connection.videosContainer.appendChild(mediaElement);
            
                setTimeout(function() {
                    mediaElement.media.play();
                }, 5000);
            
                mediaElement.id = event.streamid;
            
                if(event.type === 'local') {
                RMCMediaTrack.selfVideo = mediaElement.media;
                }
            
                // to keep room-id in cache
                localStorage.setItem(connection.socketMessageEvent, connection.sessionid);
                /*if(event.type != 'local')
                {
					console.log(4554);
					var $video  = $('video').last(),
					$window = $(window);

					$(window).resize(function(){

						var height = $window.height();
						$video.css('height', height);

						var videoWidth = $video.width(),
							windowWidth = $window.width(),
						marginLeftAdjust =   (windowWidth - videoWidth) / 2;

						$video.css({
							'height': height,
							'marginLeft' : marginLeftAdjust
						});
					}).resize();
				}*/


            };
            
            connection.onstreamended = function(event) {
                var mediaElement = document.getElementById(event.streamid);
                if (mediaElement) {
                    mediaElement.parentNode.removeChild(mediaElement);
                }
            };
            
            connection.onMediaError = function(e) {
                if (e.message === 'Concurrent mic process limit.') {
                    if (DetectRTC.audioInputDevices.length <= 1) {
                        alert('Please select external microphone. Check github issue number 483.');
                        return;
                    }
            
                    var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
                    connection.mediaConstraints.audio = {
                        deviceId: secondaryMic
                    };
            
                    connection.join(connection.sessionid);
                }
            };
            
            // ..................................
            // ALL below scripts are redundant!!!
            // ..................................
            
            function disableInputButtons() {
                document.getElementById('room-id').onkeyup();        
                document.getElementById('open-room').disabled = true;
                document.getElementById('room-id').disabled = true;
                document.getElementById('leave-room').disabled = false;
            }
    
            function enableInputButtons() {
                document.getElementById('open-room').disabled = false;
                document.getElementById('room-id').disabled = false;
                document.getElementById('share-screen').disabled = true;
                document.getElementById('leave-room').disabled = true;
            }
            
            // ......................................................
            // ......................Handling Room-ID................
            // ......................................................
            
            var roomid = '';
            if (localStorage.getItem(connection.socketMessageEvent)) {
                roomid = localStorage.getItem(connection.socketMessageEvent);
            } else {
                roomid = connection.token();
            }
            var txtRoomId = document.getElementById('room-id');
            txtRoomId.value = roomid;
            txtRoomId.onkeyup = txtRoomId.oninput = txtRoomId.onpaste = function() {
                localStorage.setItem(connection.socketMessageEvent, document.getElementById('room-id').value);
            };
            
            // detect 2G
            if(navigator.connection &&
            navigator.connection.type === 'cellular' &&
            navigator.connection.downlinkMax <= 0.115) {
            alert('2G is not supported. Please use a better internet service.');
            }
            
            // screen sharing codes goes here
            var RMCMediaTrack = {
                cameraStream: null,
                cameraTrack: null,
                screen: null,
                m_audio_track: null
            };
            
            function beforeOpenOrJoin(roomid, callback) {
                connection.socketCustomEvent = roomid;
                callback();
            }
            
            function afterOpenOrJoin() {
                connection.socket.on(connection.socketCustomEvent, function(message) {
                    if (message.userid === connection.userid) return; // ignore self messages
            
                    if (message.justSharedMyScreen === true) {
                        var video = document.getElementById(message.userid);
                        if (video) {
                            // video.querySelector('video').srcObject = null;
                        }
                    }
            
                    if (message.justStoppedMyScreen === true) {
                        var video = document.getElementById(message.userid);
                        if (video) {
                            video.querySelector('video').srcObject = null;
                        }
                    }
                });



            }
            
            var btnShareScreen = document.getElementById('share-screen');
            connection.onUserStatusChanged = function() {
                btnShareScreen.disabled = connection.getAllParticipants().length <= 0;
            };
            
            btnShareScreen.onclick = function() {
                this.disabled = true;
            
                getScreenStream(function(screen) {
                    var isLiveSession = connection.getAllParticipants().length > 0;
                    if (isLiveSession) {
                        replaceTrack(RMCMediaTrack.screen);
                    }
            
                    // now remove old video track from "attachStreams" array
                    // so that newcomers can see screen as well
                    connection.attachStreams.forEach(function(stream) {
                        stream.getVideoTracks().forEach(function(track) {
                            stream.removeTrack(track);
                        });
            
                        // now add screen track into that stream object
                        stream.addTrack(RMCMediaTrack.screen);
                    });
                });
            };
    
            function getDisplayMediaError(error){
                console.log(error);
            }
            
            function getScreenStream(callback) {
    
                var videoMediaGetter = undefined;        
                if (navigator.mediaDevices.getDisplayMedia)
                    videoMediaGetter = navigator.mediaDevices;
                else if(navigator.getDisplayMedia)
                    videoMediaGetter = navigator;
    
                videoMediaGetter.getDisplayMedia({video: true}).then(screen => {                                
                    RMCMediaTrack.screen = screen.getVideoTracks()[0];
    
                    RMCMediaTrack.selfVideo.srcObject = screen;
    
                    // in case if onedned event does not fire
                    (function looper() {
                        // readyState can be "live" or "ended"
                        if (RMCMediaTrack.screen.readyState === 'ended') {
                            RMCMediaTrack.screen.onended();
                            return;
                        }
                        setTimeout(looper, 1000);
                    })();
    
                    var firedOnce = false;
                    RMCMediaTrack.screen.onended = RMCMediaTrack.screen.onmute = RMCMediaTrack.screen.oninactive = function() {
                        if (firedOnce) return;
                        firedOnce = true;
    
                        if (RMCMediaTrack.cameraStream.getVideoTracks()[0].readyState) {
                            RMCMediaTrack.cameraStream.getVideoTracks().forEach(function(track) {
                                RMCMediaTrack.cameraStream.removeTrack(track);
                            });
                            RMCMediaTrack.cameraStream.addTrack(RMCMediaTrack.cameraTrack);
                        }
    
                        RMCMediaTrack.selfVideo.srcObject = RMCMediaTrack.cameraStream;
    
                        connection.socket && connection.socket.emit(connection.socketCustomEvent, {
                            justStoppedMyScreen: true,
                            userid: connection.userid
                        });
    
                        // share camera again
                        replaceTrack(RMCMediaTrack.cameraTrack);
    
                        // now remove old screen from "attachStreams" array
                        connection.attachStreams = [RMCMediaTrack.cameraStream];
    
                        // so that user can share again
                        btnShareScreen.disabled = false;
                    };
    
                    connection.socket && connection.socket.emit(connection.socketCustomEvent, {
                        justSharedMyScreen: true,
                        userid: connection.userid
                    });
    
                    callback(screen);            
                }, getDisplayMediaError).catch(getDisplayMediaError);            
            }
            
            function replaceTrack(videoTrack) {
                if (!videoTrack) return;
                if (videoTrack.readyState === 'ended') {
                    console.log('Can not replace an "ended" track. track.readyState: ' + videoTrack.readyState);
                    return;
                }
                connection.getAllParticipants().forEach(function(pid) {
                    var peer = connection.peers[pid].peer;
                    if (!peer.getSenders) return;
            
                    var trackToReplace = videoTrack;
            
                    peer.getSenders().forEach(function(sender) {
                        if (!sender || !sender.track) return;
            
                        if (sender.track.kind === 'video' && trackToReplace) {
                            sender.replaceTrack(trackToReplace);
                            trackToReplace = null;
                        }
                    });
                });
            }

            video_caller.end_call = function(){
                try{
                    RMCMediaTrack.cameraTrack.stop();
                    RMCMediaTrack.cameraStream.stop();
                }
                catch(er){
                    
                }
            }
        }

        init_call();
    
        var url = new URL(window.location.toString());
        var roomer = url.searchParams.get("room");
        var user_id = url.searchParams.get("uid");
        var token = url.searchParams.get("token");
        
        if(params)
        {
            roomer = params.room;
            user_id = params.uid;
            token = params.token;
            // console.log(params, 13);
        }
    
        document.getElementById('room-id').value = roomer;
        $('#open-room').click();

    }

    video_caller.init = setup_call;
    window['video_caller'] = video_caller;
})();
//init_video_caller();
//# -- sdsourceURL=/static/assets/rtc/conference.js