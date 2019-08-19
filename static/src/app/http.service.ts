import { Injectable } from '@angular/core';

declare var $: any

@Injectable()
export class HttpService {
    server_url;
    constructor() {
        this.server_url = window['server_url'];
        this.offset = 0;
        this.limit = 2;
        this.count = 0;
        // console.log(3422);
    }

    search(input_data: any, success_cb, failure_cb)
    {
        var options = this.makeOptions_search('get', input_data, success_cb, failure_cb);
        window['dn_rpc_object'](options);
    }

    get(input_data: any, success_cb, failure_cb) {
        var options = this.makeOptions_secure('get', input_data,success_cb, failure_cb);        
        window['dn_rpc_object'](options);
    }
    post(input_data: any, success_cb, failure_cb) {
        var options = this.makeOptions_secure('post', input_data,success_cb, failure_cb);        
        window['dn_rpc_object'](options);
    }
    post_public(input_data: any, success_cb, failure_cb) {
        var options = this.makeOptions_public(input_data,success_cb, failure_cb);        
        window['dn_rpc_object'](options);
    }

    authenticate(url: string, input_data: any, success_cb, failure_cb, complete_cb) {
        const httpservie = this;
        input_data = {
            args:{
                app: 'authsignup',
                model: 'AuthUser',
                method: 'login_user',
            },
            params: input_data
        }
        var options = httpservie.makeOptions_public(input_data, success_cb, failure_cb);
        options.onSuccess = function(data){            
            window['current_user'].onLogin(data);
            if(success_cb)
            {
                success_cb(data);
            }
        };
        options.type = 'get';
        options.onComplete = complete_cb;
        options.onError = failure_cb;
        window['dn_rpc_object'](options);
    }

    on_get_data(){

    }

    offset: number;
    limit: number;
    count: number;
    key_word: string;
    changedOffset(data)
    {
        this.offset = Number(data);
        // console.log(this.offset, 1008);
        this.on_get_data();
    }
    changedLimit(data)
    {
        this.limit = Number(data);
        this.offset = 0;
        // console.log(this.limit, this.offset, 144);
        this.on_get_data();
    }

    search_records(e){
        if(e.keyCode == 13)
        {
            this.offset = 0;
            this.key_word = e.target.value;
            this.on_get_data();
        }
        // console.log(32312, e.keyCode);
    }

    makeOptions_secure(type, input_data, success_cb, failure_cb)
    {
        let obj_this = this;
        var onRequestFailed = function(res)
        {
            if(failure_cb)
                failure_cb(res);
        };        
        if(obj_this.key_word)
        {
            input_data.params.key_word = obj_this.key_word;            
        }
        input_data.params.offset = obj_this.offset;
        if(obj_this.limit)
        {            
            input_data.params.limit = obj_this.limit;
        }
        else
        {
            input_data.params.limit = 10;
        }
        var options = {
            url: '/rest/secure',
            type: type,
            before:function(a, b){
                //console.log(b.url);
            },
            data:input_data,            
            //type:'post',
            onSuccess:function(data){                
                success_cb(data);
                if(data.total)
                {
                    obj_this.count = Number(data.total);
                }
                else
                {
                    obj_this.limit = 0;
                    obj_this.offset = 0;
                    obj_this.count = 0;
                }
            },
            onError:onRequestFailed,
            onComplete:function(){
            }
        };
        return options;
    }

    makeOptions_search(type, input_data, success_cb, failure_cb)
    {
        var onRequestFailed = function(res)
        {
            if(failure_cb)
                failure_cb(res);
        };
        var options = {
            url: '/rest/search',
            type: type,
            before:function(a, b){
                //console.log(b.url);
            },
            data:input_data,            
            //type:'post',
            onSuccess:success_cb,
            onError:onRequestFailed,
            onComplete:function(){
            }
        };
        return options;
    }

    makeOptions_public(input_data, success_cb, failure_cb) {
        const http_service = this;
        var onRequestFailed = function(res)
        {
            if(failure_cb)
                failure_cb(res);            
        };
        var options = {
            url: '/rest/public',
            type: 'get',
            before:function(a, b){
                //console.log(b.url);
            },
            data:input_data,            
            //type:'post',
            onSuccess:success_cb,
            onError:onRequestFailed,
            onComplete:function(){
            }
        };
        return options;
    }

    make_bread_crumb() {
        let comeplete_url = window.location + '';        
        let base_url = window.location.origin + '';
        let page_url = comeplete_url.replace(base_url + '/', '');

        let ar = page_url.split('/');
        let last_link = '';
        let links = []
        for ( var i in ar) {
            if (parseInt(i) !== ar.length - 1) {
                last_link = last_link + '/' + ar[i];                
                links.push({url: last_link, title: ar[i]});
            }
        }
        return links;
    }
}
