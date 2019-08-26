$(function(){
    var oauthToken = undefined;    
    function download()
    {
        var files_data = [];
        for(var i in selected_files)
        {
            files_data.push({
                id: selected_files[i].id,
                name: selected_files[i].name,
            })
        }
        var req_url = window.location.origin +'/temp/download';
        ajax_options = {            
            data: {
                selected_files: files_data,
                auth_token : oauthToken
            },
            trace:1,
            url: req_url,
            onSuccess:function(data){
                console.log(data);
            },

        }
        ajax_request(ajax_options);
    }

    function onAuthApiLoad() {
        console.log('APi Loaded');
        window.gapi.auth.authorize({
            'client_id': '921039722572-u3aq7gvjgk42gj590ve3qf5fc1schjf0.apps.googleusercontent.com',
            'scope': ['https://www.googleapis.com/auth/drive']
        }, handleAuthResult);
    }

    function handleAuthResult(authResult) {
        if (oauthToken || (authResult && !authResult.error)) {
            oauthToken = authResult.access_token;
            window['gdrive_accessed'] = true;
            createPicker();
        }
        else
        {
        console.log(authResult);
        }
    }

    var gdrive_picker = undefined;

    function createPicker() {
        var appId = 'boreal-quarter-250721';
        var allowed_types = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/x-vnd.oasis.opendocument.spreadsheet",
            
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.oasis.opendocument.presentation",

            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.oasis.opendocument.text",
            "application/rtf",
            "application/pdf",
            "text/csv"
        ];
        // console.log(allowed_types);
        allowed_types = allowed_types.join(',');
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes(allowed_types);
        var gdrive_picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            .setCallback(pickerCallback)
            .build();
        gdrive_picker.setVisible(true);        
    }

    var selected_files = [];

    function pickerCallback(data) {
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var docs = data[google.picker.Response.DOCUMENTS];
            if(!docs.length)
            {
                return;
            }

            for(var i in docs)
            {
                var found = false;
                for(var j in selected_files)
                {
                    if(selected_files[j].id == docs[i].id)
                    {
                        found = true;
                    }                    
                }
                if(!found)
                {
                    selected_files.push(docs[i]);
                }
            }            
            // console.log(oauthToken);
            console.log(selected_files);
            // download();
            $('#google_drive_picker').removeAttr('disabled');
        }
    }
    if($('#google_drive_picker').length)
    {
        $('#google_drive_picker').click(function(){
            if(!window['google_picker'])
            {
                console.log('Google Picker API not loaded yet');
                return;
            }
            else
            {
                gapi.load('auth', { 'callback': onAuthApiLoad });
                gapi.load('picker');
            }
        });
    }
    else
    {
        console.log('google_drive_picker not loaded yet')
    }
})
