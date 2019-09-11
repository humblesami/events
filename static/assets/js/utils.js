window['js_utils'] = {
    read_file: function(file, call_back) {
        var reader = new FileReader();        
        reader.readAsDataURL(file, "UTF-8");
        reader.onload = function (evt) {
            // console.log(evt.target.result,1233);
            call_back(evt.target.result);
        }
        reader.onerror = function (evt) {
            console.log(evt, 333);
        }
    },
    unique_id: function(){
        let rand = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        var now = new Date();
        rand = 'id_'+now.getFullYear()+now.getMonth()+now.getDate()+now.getHours()+now.setSeconds()+rand;
        return rand;
    },
    addLoader: function(selector, position){
        // console.log('tried loader ', selector);
        var element = $(selector);
        if(element.length != 1)
        {
            if(element.length > 1)
            {
                element = element.last();                
                console.log(selector + ' found more than one');
            }
            else{
                console.log(selector + ' not found');
                return;
            }
        }
        var pos_type = element.css('position');        
        if(!pos_type == pos_type == 'static')
        {
            element.css('position','relative');
        }
        var partial_loader = $('.partial-loader').clone().show();
        if(position){
            partial_loader.find('.row').css('justify-content', position);
        }
        element.append(partial_loader);
    },
    removeLoader: function(element){
        if(element.length != 1)
        {
            if(element.length > 1)
            {
                element = element.fisrt();
                console.log(selector + ' found more than one');
            }
            else{
                console.log(selector + ' not found');
                return;
            }
        }
        var loader = element.find('.partial-loader');
        if(loader.length)
        {
            // console.log('removed loader ', element[0]);
            element.find('.partial-loader').remove();
        }
        else
        {
            console.log('loader not found', element[0]);
        }
    },
    get_dataurl_prefix: function (file_name)
    {
        var ext = file_name.split('.');
        ext = ext[ext.length - 1];
        var prefix = '';
        switch(ext){
            case 'pdf':
                prefix = 'data:application/pdf;base64,';
                break;
                case 'xlsx':
                prefix = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
                break;
                case 'docx':
                prefix = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,';
                break;
                case 'pptx':
                prefix = 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,';
                break;
                case 'doc':
                prefix = 'data:application/msword;base64,';
                break;
                case 'odt':
                prefix = 'data:application/vnd.oasis.opendocument.text;base64,';
                break;
                case 'ppt':
                prefix = 'data:application/vnd.ms-powerpoint;base64,';
                break;
        }
        return prefix;
    },
    load_css: function(){

    },
    load_script: function(file_path, on_load){
        if (!window['dynamic_files'])
        {
            window['dynamic_files'] = [];
        }

        if (!(window['dynamic_files'].indexOf(file_path) > -1))
        {
            window['dynamic_files'].push(file_path);
            var script = document.createElement('script');
            if (on_load)
            {
                script.onload = on_load;
            }
            script.src = file_path;
            document.body.appendChild(script);            
            console.log(window['dynamic_files']);
        }
        else if (on_load)
        {
            on_load();            
        }
    }
}
