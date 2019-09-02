function file_input(input){
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
            <div class="upload_files">
            
            </div>
        </div>
        <input name="upload" />
    </div>
    `;
    // input.hide();
    input.after(uploader);    
    parent.find('.cloud_pickers_container .picker').click(function(){
        // console.log(this);
        window['merge_cloud_files'] = merge_cloud_files;
    });

    parent.find('.local_picker').click(function(){
        input.click();
    });
    var drop_zone = parent.find('.file-drop-zone');
    drop_zone.on('dragenter', function(e){
        $(this).addClass('dragenter');
    });
    drop_zone.on('dragleave', function(e){
        $(this).removeClass('dragenter');
    });
    drop_zone.on('drop', function(e){
        $(this).removeClass('dragenter');
        var new_files = e.dataTransfer.items;
        if(!multiple)
        {
            new_files = [new_files[0]];
        }
        merge_local_files(new_files);
    });

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
    }

    function preview_files(incoming_files){
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
            if(single_file.url)
            {
                name_box.append('<input name="url" value="'+single_file.url+'"/>');
            }
            else
            {
                window['js_utils'].read_file(single_file, function(data){                    
                    parent.find('input[name="name"]').val(single_file.name);
                    parent.find('input[name="upload"]').val(data);
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
$(document).on('dragenter dragover drop', function(e){
    e.stopPropagation();
    e.preventDefault();
});