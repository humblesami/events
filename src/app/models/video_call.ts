declare var $;
export class VideoCall{
    socketService: any;
    constructor(ss: any){
        this.socketService = ss;
    }

    id: any;
    callee: any;
    message: any;
    caller : any;    
    ongoing_call : any;


    timeout = 21000;  
    state = 'available';
    drag_enabled = false;
    is_audio_call = false;            
    incoming_call = undefined;


    init(uid, audio_only){
        let video_call = this;
        // console.log(uid, audio_only, 88);
        video_call.drag_enabled = false;
        video_call.maximize();
        if(audio_only)
        {
            video_call.is_audio_call = true;
        }
        else
        {
            video_call.is_audio_call = false;
        }

        var the_user = video_call.socketService.get_user_by_id(uid)
        if(!the_user.online)
        {
            video_call.show_notification(the_user.name +' is not online yet, but will be informed when online')
            return;
        }
        let call_id = video_call.socketService.user_data.id+'-'+uid+'-call';                
        video_call.caller = video_call.socketService.user_data;
        video_call.callee = the_user;
        video_call.id = call_id; 
        let data =  {
            caller_id: video_call.socketService.user_data.id,
            callee_id: uid,
            call_id : call_id,
            is_audio_call : video_call.is_audio_call
        };

        // console.log(video_call.caller, video_call.callee);
        if(the_user.online){
            video_call.socketService.emit_rtc_event('incoming_call', data, [uid]);                    
            video_call.message = 'Calling...';
        }
        else
        {
            video_call.message = "Called person is not online but will be informed about your call when he/she will be online";                    
        }
        video_call.state = 'outgoing';
        video_call.initialize();                
        
        
        setTimeout(function(){
            // console.log(video_call.state, video_call.callee.id, 727);
            if(video_call.state == 'outgoing')
            {
                video_call.cancel('Not available');
            }
        }, video_call.timeout);
    }

    show_incoming_call(data){
        var video_call = this;
        if(video_call.ongoing_call || video_call.state != 'available')
        {
            video_call.show_notification('Another incoming call');
            return;
        }
        // console.log(data, 1334);
        video_call.state = 'incoming';
        video_call.id = data.call_id;
        video_call.is_audio_call = data.is_audio_call;
        video_call.caller = video_call.socketService.get_user_by_id(data.caller_id);
        video_call.callee = video_call.socketService.user_data;
        video_call.initialize();
    }

    

    accept(){
        var video_call = this;
        var data = { 
            user_id: video_call.socketService.user_data.id
        };        
        video_call.socketService.emit_rtc_event('accepted', data, [video_call.caller.id]);
        video_call.state = 'accepted';
        video_call.message = 'Connecting caller';
    }

    

    start_for_me(data){
        // console.log(data, 156);
        var video_call = this;
        video_call.state = 'ongoing';
        if(!video_call.id)
        {
            console.log(video_call.state, 'Invalid call id, it must has been alreasy set');
            // console.log(video_call, video_call.incoming);
            return;
        }
        
        var params = {
            uid: video_call.socketService.user_data.id,
            room: video_call.id,                    
            token: video_call.socketService.user_data.token
        };    
        // console.log(params, 1577);
        if(!video_call.socketService.rtc_multi_connector)
        {
            video_call.socketService.rtc_multi_connector = window['video_caller'];
        }
        video_call.ongoing_call = video_call.id;
        // console.log(video_call.socketService.rtc_multi_connector, 190);

        var on_started = undefined;
        if(video_call.caller.id == params.uid)
        {
            on_started = function(){
                // console.log(data, 14);
                if(data)
                {
                    data = {
                        create_time: Date(), 
                        room: video_call.id,
                        user_id: data.user_id
                    }
                    // console.log(data, 14889);
                    video_call.socketService.emit_rtc_event('started_by_caller', data, [data.user_id]);
                }
            }
        }
        $('#rtc-container').addClass('ongoing_call');
        video_call.socketService.rtc_multi_connector.init(params, on_started, video_call.is_audio_call);                
    }

    

    cancel(message=undefined){
        let video_call = this;
        // console.log('Cancelling', this.caller.id, this.callee.id);
        video_call.socketService.emit_rtc_event('cancelled', '', [video_call.callee.id]);
        this.quit();
    }

    cancelled(data){
        // console.log('Cancelled', this.caller.id, this.callee.id);
        this.quit();
    }

    reject(){
        var video_call = this;
        var data = { message: 'Sorry busy'};
        if(!video_call.caller.id)
        {
            console.log('No caller id to send in reject');
        }
        video_call.socketService.emit_rtc_event('rejected', data, [video_call.caller.id]);
        this.quit();
    }


    

    terminate(){
        let video_call = this;
        var data = { 
            user_id: video_call.socketService.user_data.id, 
            room_id: this.id
        };
        video_call.socketService.socket.emit('call_terminated', data);
        // console.log(video_call.ongoing_call, this, 568);
        this.quit('terminating');
    }

    terminated(data){
        let video_call = this;
        if(video_call.ongoing_call)
        {
            console.log('Leaving now');
            // console.log(video_call.ongoing_call, this, 189);
            this.quit();
        }
        else
        {
            console.log('Already left');
        }
    }

    toggle_camera(){
        let video_call = this;
        try{
            video_call.socketService.rtc_multi_connector.toggle_camera();
        }
        catch(er){
            console.log(14, er);
        }                
        // 
    }

    quit(request_type=undefined){
        let video_call = this;                
        // console.log(video_call.ongoing_call, request_type, 193);
        if(video_call.ongoing_call && request_type != 'terminating')
        {
            video_call.terminate();
        }
        video_call.drag_enabled = false;
        video_call.caller = undefined;
        video_call.callee = undefined;
        if(video_call.ongoing_call)
        {
            try{
                video_call.socketService.rtc_multi_connector.stop_my_tracks();
                video_call.socketService.rtc_multi_connector.socket.disconnect();                        
            }
            catch(er)
            {
                console.log('error in rtc end call', er);
            }                    
        }
        
        video_call.state = 'available';                
        video_call.ongoing_call = undefined;                 
        $('#videos-container').html('');
        $('#rtc-container').removeClass('ongoing_call').hide();
    }


    initialize(){
        this.maximize();
        $('#rtc-container').show();
    }
    accepted(data){
        this.start_for_me(data);
    }

    started_by_caller(data){
        let video_call = this;
        video_call.start_for_me(data);
    }
    
    same(val){
        return val;
    }

    rejected(data){
        if(this.state == 'outgoing')
        {
            this.show_notification('User is busy, try later');
        }
        else
        {
            console.log(this.state, ' Not calling how cancelled');
        }
        this.quit(data.message);
    }

    minimize(){
        $('#rtc-container').removeClass('full').addClass('min');
        window['rtc-call-max'] = undefined;                
        $('#rtc-container').draggable({'containment':[0, 0, '100vw', window.innerHeight - 10]});
        $('#rtc-container').css({top:'unset',left:'unset',bottom:'10px',right:'10px'}).draggable('enable');
        this.drag_enabled = true;
    }
    maximize(){
        if(this.drag_enabled)
        {
            $('#rtc-container').draggable('disable');
            this.drag_enabled = false;
        }
        $('#rtc-container').css({top:0,left: 0});
        $('#rtc-container').removeClass('min').addClass('full');
        window['rtc-call-max'] = 1;
    }

    show_notification(message){
        window['bootbox'].alert(message);
        setTimeout(function(){
            $('.bootbox.modal.fade.bootbox-alert.show').css('display','flex');
        },151);                
    }
}