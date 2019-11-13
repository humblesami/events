import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';
declare var $:any;

@Component({
    selector: 'app-esigndocs',
    styleUrls:['./esigndocs.css'],
    templateUrl: 'esigndocs.component.html'
})
export class EsignDocsComponent implements OnInit {
    @Input() loaded_as_child: any;
    @Input() to_do_only: any;

    records = [];
    httpService: HttpService;
    socketService: SocketService;
    loading = true;
    constructor(private httpServ: HttpService,public router: Router, private sock: SocketService) {
        // console.log(Date(), 99222);
        this.httpService = httpServ;
        this.socketService = sock;
    }
    uploadClick(){
        // console.log('yyyyyyyyyyyyyyyyyyyyy ');
        $('#esign_upload').click();
    }

    open_results(evt, doc_id)
    {
        evt.stopPropagation();
        evt.preventDefault();
        this.router.navigate(['/signdoc/'+doc_id+'/results']);
    }


    delete_file(ev, doc_id){
        ev.preventDefault();
        ev.stopPropagation();
        let obj_this = this;
        function on_deleted(result){
            var i = 0;
            for(var doc of obj_this.records){
                if(doc.id == doc_id)
                {
                    obj_this.records.splice(i, 1);
                    break;
                }
                i++;
            }
        }
        window['bootbox'].confirm('Are you sure to delete?', function(dr){
            if(dr){
                let final_input_data = {
                    params: { doc_id: doc_id},
                    args: {
                        app: 'documents',
                        model: 'File',
                        method: 'delete_file'
                    }
                };
                obj_this.httpService.post(final_input_data, on_deleted, null);
            }
        })        
        
    }

    addFile(event){
		const obj_this = this;
		var element = event.target;
		// console.log(element)
		var file = element.files[0];
		var fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = function () {
            // console.log(fileReader)
            let final_input_data = {
                params: {name:file.name,file:fileReader.result},
                args: {
                    app: 'esign',
                    model: 'SignatureDoc',
                    method: 'save_doc',
                    post: 1
                }
            };
            obj_this.httpService.post(final_input_data, (result: any) => {
                obj_this.router.navigate([`/signdoc/${result.id}`]);
            }, null);
		};
		fileReader.onerror = function (error) {
			console.log('Error: ', error);
		};
    }

    get_records(el, state)
    {
        let obj_this = this;
        $(el).parent().find('.active').removeClass('active');
        $(el).addClass('active');
        let states = [];
        if (state == 'completed')
        {
            states = [state, 'incomplete']
        }
        else
        {
            states = [state]
        }
        this.httpServ.states = states;
        obj_this.get_list(states);
    }

    prev_state = undefined;
    
    get_list(states=['to do'])
    {        
        const obj_this = this;
        let args = {
            app: 'esign',
            model: 'SignatureDoc',
            method: 'get_records'
        }
        if(obj_this.httpServ.states && states.length < 1){
            states = obj_this.httpServ.states
        }
        let offset = undefined;
        if(obj_this.prev_state != states)
        {
            obj_this.loading = true;
            offset = 0;
        }

        obj_this.prev_state = states;
        let final_input_data = {
            params: {states: states, offset: offset },
            args: args
        };
        obj_this.httpService.get(final_input_data,
        (result: any) => {                  
            obj_this.records = result.records;
            obj_this.loading = false;
             // console.log(new Date(), 444);
        },
        (error: any) => {
            //console.log(error);
            //alert(error);
        });
    }

    ngOnInit() {
        this.get_list();
        window['app_libs'].pdf.load();
        window['app_libs'].jquery_ui.load();
        window['json_functions'].find_activate_link('.MeetingBtnWrapper');
    }
}
