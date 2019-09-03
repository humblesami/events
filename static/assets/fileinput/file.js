function apply_drag_drop(input){
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
            <div class="file-drop-zone-title">Drag & drop files here …</div>
            <div class="preview-conatiner">
            </div>
        </div>
        <div`+multiple+` class="cloud_pickers_container d-flex justify-content-center pb-1">
            <div class="google_drive_picker picker border">
                <img class="img-fluid" src="/static/assets/images/cloud/gdrive.png" title="Google Drive">
                <div class="selected_files"></div>
            </div>
            <div class="one_drive_picker picker border">
                <img class="img-fluid" src="/static/assets/images/cloud/onedrive.png" title="OneDrive">
                <div class="selected_files"></div>
            </div>
            <div class="drop_box_picker picker border">
                <img class="img-fluid" src="/static/assets/images/cloud/dropbox.png" title="Dropbox">
                <div class="selected_files"></div>
            </div>
            <div class="local_picker picker border btn btn-primary btn-file">
                <i class="glyphicon glyphicon-folder-open"></i>&nbsp;  
                <span class="hidden-xs">Browse …</span>
            </div>
        </div>
        <div class="feedback">
        </div>
    </div>
    `;
    input.hide();
    input.after(uploader);    
    parent.find('.cloud_pickers_container .picker').click(function(){
        // console.log(6565);
        window['merge_cloud_files'] = merge_cloud_files;
    });

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

    var added_files = [];
    input.cloud_urls = [];
    input.cloud_files = []    
    input.local_files = [];
    input.selected_files = [];

    merge_local_files = function(new_files){
        added_files = [];
        if(multiple)
        {
            for(const file1 of new_files)
            {
                var already_exists = false;
                for(const file2 of input.local_files)
                {
                    if(file1.name == file2.name && file1.size == file2.size)
                    {
                        already_exists = true;
                    }
                }
                if(!already_exists)
                {
                    input.local_files.push(file1);
                    added_files.push(file1);
                }
            }
            input.selected_files = input.local_files.concat(input.cloud_files);
            preview_files(added_files);
        }
        else
        {
            input.selected_files = input.local_files = added_files = new_files;
            preview_files(added_files);
        }
    }
    
    merge_cloud_files = function(new_files){
        // console.log(new_files, 4444);
        added_files = [];
        if(multiple)
        {
            for(const file1 of new_files)
            {
                var already_exists = false;
                for(const file2 of input.cloud_files)
                {
                    if(file1.url == file2.url)
                    {
                        already_exists = true;
                    }
                }
                if(!already_exists)
                {
                    input.cloud_files.push(file1);
                    added_files.push(file1);
                }
            }
            input.selected_files = input.local_files.concat(input.cloud_files);
            preview_files(added_files);
        }
        else
        {
            input.selected_files = input.cloud_files = added_files = new_files;            
            preview_files(added_files);
        }
    }    

    function remove_file(e)
    {
        var thumbnail = $(e.target).closest('.file-box');
        if(multiple)
        {
            var index = thumbnail.index();
            console.log(input.selected_files.length, 187);
            input.selected_files.splice(index, 1);
            console.log(input.selected_files.length, 186);
        }
        else
        {
            input.selected_files = [];
        }
        thumbnail.remove();
        if(parent.find('.file-box').length)
        {
            parent.find('.file-drop-zone-title').hide();
        }
        else
        {
            parent.find('.file-drop-zone-title').show();
        }
        parent.closest('fieldset').find('[name="binary_data"]').val('');v
    }    

    function preview_files(incoming_files){
        parent.find('.feedback').html('');
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
            for(const file of incoming_files)
            {
                var nail1 = $(thumbnail);
                var name_box = nail1.find('input[name="name"]');
                name_box.val(file.name);
                if(file.url)
                {
                    name_box.append('<input name="url" value="'+file.url+'"/>');
                }
                nail1.find('.del').click(remove_file);
                parent.find('.preview-conatiner').append(nail1);
            }
        }
        else
        {
            var nail2 = $(thumbnail);
            var name_box = nail2.find('input[name="name"]');
            var single_file = incoming_files[0];
            name_box.val(single_file.name);
            parent.closest('fieldset').find('[name="file_name"]').val(single_file.name);
            var single_file_prefix = window['js_utils'].get_dataurl_prefix(single_file.name);
            if(!single_file_prefix)
            {
                parent.find('.feedback').html('Invalid file type');
                return;
            }
            if(single_file.url)
            {
                name_box.append('<input name="url" value="'+single_file.url+'"/>');                
                // download(single_file.url, single_file.access_token, function(data){
                //     data = btoa(unescape(encodeURIComponent(data)));                    
                //     data = single_file_prefix + data;
                //     parent.closest('fieldset').find('[name="binary_data"]').val(data);
                // });
                parent.closest('fieldset').find('input[name="cloud_url"]').val(single_file.url);
                parent.closest('fieldset').find('input[name="access_token"]').val(single_file.access_token);
            }
            else
            {
                window['js_utils'].read_file(single_file, function(data){
                    parent.closest('fieldset').find('[name="binary_data"]').val(data);
                });
            }            
            nail2.find('.del').click(remove_file);
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
$(document).on('dragenter dragover drop', function(evn){
    evn.stopPropagation();
    evn.preventDefault();
});