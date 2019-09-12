window['merge_cloud_files'] = [];
function apply_drag_drop(input, resInfo, on_files_uploaded){    
    if(!input.length)
    {
        console.log('invalid file input element');
        return;
    }

    if(input.length>1)
    {
        console.log('invalid file input element1');
        return;
    }
    if(!input.is(':file'))
    {
        console.log('invalid file input element2');
        return;
    }
    // console.log('a theek a');
    var element = input[0];
    var parent = input.parent();
    var multiple = input.attr('multiple');
    if(multiple)
    {
        multiple = ' multiple="1"'
    }
    else
    {
        multiple = '';
    }
    var uploader = `
    <div class="file-input-picker-container">
        <div class="file-drop-zone">
        <div class="feedback-message">
            </div>
            <div class="file-drop-zone-title">Drag & drop files here …</div>
            <div class="preview-conatiner">
            </div>
        </div>
        <div`+multiple+` class="cloud_pickers_container d-flex justify-content-center align-items-center pb-1">
            <div class="google_drive_picker picker border">
                <img class="img-fluid" src="/static/assets/images/cloud/gdrive.png" title="Google Drive">                
            </div>
            <div class="one_drive_picker picker border">
                <img class="img-fluid" src="/static/assets/images/cloud/onedrive.png" title="OneDrive">                
            </div>
            <div class="drop_box_picker picker border">
                <img class="img-fluid" src="/static/assets/images/cloud/dropbox.png" title="Dropbox">                
            </div>
            <div class="local_picker picker border btn btn-primary btn-file">
                <i class="glyphicon glyphicon-folder-open"></i>&nbsp;  
                <span class="hidden-xs">Browse …</span>
            </div>
        </div>
    </div>
    `;
    input.hide();
    input.after(uploader);
    if(!input.closest('#content-main').length){
        input.next().find('.picker').css('visibility','hidden');
        window['app_libs']['file_input'].load(function(){
            $('.cloud_pickers_container .picker').css('visibility','visible');
        });
    }
    
    var elm = input.next().find('.cloud_pickers_container');
    var current_cloud_number = $(".cloud_pickers_container").index(elm);    


    parent.find('.local_picker').click(function(){
        input.click();
    });
    var drop_zone = parent.find('.file-drop-zone:first');
    dropZone = drop_zone[0];    

    function on_dragenter(evn){
        evn.preventDefault();
        $(drop_zone).addClass('dragenter');
    }
    function on_dragover(evn){
        evn.preventDefault();
    }
    function on_dragleave(evn){
        var related = evn.relatedTarget;
        if(related != this) {
            if (related) {
                inside = jQuery.contains(this, related);
            }
            else
            {
                $(drop_zone).removeClass('dragenter');
            }
        }
    }
    function on_drop(evn){        
        $(drop_zone).removeClass('dragenter');
        if(!evn.dataTransfer)
        {
            console.log('No files data found');
            return;
        }
        var new_files = evn.dataTransfer.files;
        if(!multiple)
        {
            new_files = [new_files[0]];
        }
        merge_local_files(new_files);
    }

    dropZone.addEventListener('dragenter', on_dragenter, false);
    dropZone.addEventListener('dragover', on_dragover, false);
    dropZone.addEventListener('dragleave', on_dragleave, false);
    dropZone.addEventListener('drop', on_drop, false);


    input.cloud_urls = [];
    merge_local_files = function(new_files){
        if(multiple)
        {
            preview_files(new_files);
        }
        else
        {
            preview_files(new_files);
        }
        //////////////////////////////////////////////////        
    }
    
    function merge_cloud_files(new_files){
        // console.log(new_files, 4444);        
        if(multiple)
        {            
            preview_files(new_files, 1);
        }
        else
        {          
            preview_files(new_files,1);
        }
        for(var file of new_files)
        {
            file.file_name = file.name;
        }
    }

    window['merge_cloud_files'][current_cloud_number] = merge_cloud_files;
    
    function upload_files(files, invalid_files , cloud=false)
    {
        // console.log(files, 13);
        for(var obj of files){
            if(!obj.file_name)
            {
                obj.file_name = obj.name;
            }
        }

        $('.file-drop-zone-title').addClass('loading').html('Uploading '+files.length+' files...');
        var url = window['site_config'].server_base_url+'/docs/upload-files';
        var formData = new FormData();
        if(!cloud)
        {
            var i= 0;
            for(var file of files){
                formData.append('file['+i+']', file);
                i++;
            }
        }
        else
        {
            formData.append('cloud_data', JSON.stringify(files));
        }
        
        formData.append('res_app', resInfo.res_app);
        formData.append('res_model', resInfo.res_model);
        formData.append('res_id', resInfo.res_id);        

        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        headers = {'Authorization': 'Token '+user.token};
        $.ajax({
            url: url,
            data: formData,
            type: 'POST',
            // dataType: 'JSON',
            headers: headers,
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            success: function(data){
                try{
                    data = JSON.parse(data);
                }
                catch(er){
                    console.log('Invalid data from post files', data);
                }
                if(Array.isArray(data))
                {
                    if(on_files_uploaded)
                    {
                        parent.find('.file-box').remove();
                        parent.find('.preview-conatiner').html('');
                        on_files_uploaded(data);
                    }
                }
                else{
                    console.log(data, ' invalid data from file save');
                }
            },
            error: function(a,b,c,d){
                $('.feedback-message').append('<p id="success-message" class="alert-danger">Fail to Upload Files </p>').fadeIn("slow");
                function hideMsg(){
                    $("#success-message").fadeOut();
                    $(".feedback-message").remove($("#success-message"));
                    $(".feedback-message").fadeOut()
                    }
                    setTimeout(hideMsg,12000);
            },
            complete:function(){        
                $('.file-drop-zone-title').removeClass('loading').html('Drag & drop files here …');
                $(".feedback-message").append('<p id="success-message" class="alert-success">'+ files.length +' File(s) Uploaded Successfully </p>').fadeIn("slow");
                function hideMsg(){
                    $("#success-message").fadeOut();
                    $(".feedback-message").remove($("#success-message"));
                    $(".feedback-message").fadeOut()
                }
                setTimeout(hideMsg,12000);
                if(invalid_files){
                    for(const invalid of invalid_files){
                        $(".feedback-message").append('<p class="alert-danger inv_f" id="'+invalid.name +'"> Invalid File ('+ invalid.name + ')</p>').fadeIn("slow");
                        function hideMsg(){
                            $(".feedback-message").fadeOut("slow");    
                            $(".feedback-message").remove($("#"+invalid.name));
                        }
                        setTimeout(hideMsg,12000);
                    }
                }

        
            }

        });
    }

    function preview_files(incoming_files, cloud){
        let files = [];
        let invalid_files= [];
        for (const file of incoming_files) {
            file_name = file.name.split('.');
            if(['pdf', 'odt', 'doc', 'docx', 'xlsx', 'xls', 'ppt', 'pptx'].indexOf(file_name[file_name.length-1]) > -1)
            {
                files.push(file);
            }else{
                invalid_files.push(file);
            }
        }
        if (!files.length)
        {
            $(".feedback-message").append('<p class="alert-danger" id="invalid_message"> Invalid File(s).</p>').fadeIn("slow")
            // $('.feedback-message').addClass('alert-danger').html('Invalid File(s).').fadeIn();
            function hideMsg(){
                $("#invalid_message").fadeOut();
                $(".feedback-message").remove($("#invalid_message"));
                // $(".feedback-message").fadeOut();
                }
                setTimeout(hideMsg,6000);
            return;
        }

        parent.find('.feedback-message').html('');
        var thumbnail = `
        <div class="file-preview-other file-box border p-1">
            <div class="text-right pb-1 del">
                <img src="/static/assets/images/delete.jpg" width="20px">
            </div>
            <div class="text-center" style="">
                <img src="/static/assets/images/doc.png" width="100%">
            </div>
            <input name="name" />
        </div>
        `;

        if(multiple)
        {
            for(const file of files)
            {
                var nail1 = $(thumbnail);
                var name_box = nail1.find('input[name="name"]');
                name_box.val(file.name);
                if(file.url)
                {
                    name_box.append('<input name="url" value="'+file.url+'"/>');
                }
            }
            upload_files(files, invalid_files ,cloud);
        }
        else
        {
            var nail2 = $(thumbnail);            
            var name_box = parent.closest('form').find('input[name="name"]');            
            var single_file = files[0];
            name_box.val(single_file.name);
            // console.log(name_box.length, name_box);
            parent.closest('fieldset').find('[name="file_name"]').val(single_file.name);            
            if(single_file.url)
            {
                parent.closest('fieldset').find('input[name="cloud_url"]').val(single_file.url);
                parent.closest('fieldset').find('input[name="access_token"]').val(single_file.access_token);
            }
            else
            {
                window['js_utils'].read_file(single_file, function(data){
                    parent.closest('fieldset').find('[name="binary_data"]').val(data);
                });
            }
            parent.find('.preview-conatiner').html(nail2);            
        }
        if(parent.find('.file-box').length)
        {
            parent.find('.file-drop-zone-title').hide();
        }
        else
        {
            parent.find('.file-drop-zone-title').show();
        }
    }

    input.change(function(e){
        merge_local_files(element.files);
    });
}


(function(){    
    // console.log(99999999999,  window['merge_cloud_files']);
    window.addEventListener("message", function(response){        
        // this.console.log(response, 1444504);
        if(response.data)
        {
            var received_data = response.data;
            var files = received_data.files;
            var cloud_number = received_data.cloud_number;
            if(Array.isArray(files) && files.length)
            {
                if(files[0].url)
                {
                    window['merge_cloud_files'][cloud_number](files);
                }
            }    
        }
    })
})()

window['apply_drag_drop'] = apply_drag_drop;
$(document).on('dragenter dragover drop', function(evn){
    evn.stopPropagation();
    evn.preventDefault();
});
