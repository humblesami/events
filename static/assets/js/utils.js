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
    get_dataurl_prefix: function (file_name)
    {
        var ext = file_name.split('.');
        ext = ext[ext.length - 1];
        var prefix = 'Invalid file name';
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
    }
}
