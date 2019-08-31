$(function(){
    var multiSelect = false;
    function is_multi_select_enabled(e){
        multiSelect = $(e.target).closest('.cloud_pickers_container').attr('multiple');
        if(multiSelect)
        {
            multiSelect = true;
        }
        else
        {
            multiSelect = false;
        }
    }
    var download_urls = {
        google:{
            prefix: 'https://www.googleapis.com/drive/v3/files/',
            postfix:'?alt=media',
            access_token: '',
        },
        onedrive:{
            prefix: 'https://www.googleapis.com/drive/v3/files/',
            postfix:'?alt=media',
            access_token: '',
        },
        dropbox:{
            prefix: 'https://www.googleapis.com/drive/v3/files/',
            postfix:'?alt=media',
            access_token: '',
        }
    }

    function init_drop_box_picker(){
        var access_token = undefined;
        function open_cloud_picker(ev) {
            is_multi_select_enabled(ev);
            access_token = localStorage.getItem("dropbox/token");
            if(!access_token)
            {
                // init_token();
                // return;
            }
            var options = {
                success: function (files) {
                    for (const file of files) {
                        const name = file.name;
                        const url = file.link;
                    }
                    on_files_selected(files, 'dropbox');
                },
                cancel: function () {
                },
                linkType: "direct", // or "preview"
                multiselect: multiSelect,
                folderselect: false, // or true
                extensions: ['.pdf', '.doc', '.docx', '.html', '.odt','.xls','.pptx','.ppt'],
            //    sizeLimit: 4096, // or any positive number
            };
            Dropbox.choose(options);
        }
        function init_token(){
            if(access_token)
            {
                open_files();
                return;
            }
            var height = window.innerHeight;
            var width = window.innerWidth;
            window.open("/temp/dropbox-authorize", "Dropbox", "width="+width+",height="+height);
        
            var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
            // Listen to message from child window
            eventer(messageEvent,function(e) {
                if(e.data.secret == 'sadasecret')
                {
                    console.log('parent received message!: ', e.data);
                    access_token = e.data.token;
                    open_files();
                }
                else
                {
                    // console.log('Pata ni kon kari janda');
                }
            }, false);
        }
        $('body').on('click', '.drop_box_picker', open_cloud_picker);
    }


    function init_google_picker(){
        var access_token = undefined;
        function open_cloud_picker(ev){
            is_multi_select_enabled(ev);
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
        }
    
        function onAuthApiLoad() {
            console.log('APi Loaded');
            window.gapi.auth.authorize({
                'client_id': '921039722572-u3aq7gvjgk42gj590ve3qf5fc1schjf0.apps.googleusercontent.com',
                'scope': ['https://www.googleapis.com/auth/drive']
            }, handleAuthResult);
        }
    
        function handleAuthResult(authResult) {
            if (access_token || (authResult && !authResult.error)) {
                access_token = authResult.access_token;
                window['gdrive_accessed'] = true;
                createPicker();
            }
            else
            {
                console.log(authResult);
            }
        }

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
                .setAppId(appId)
                .setOAuthToken(access_token)
                .addView(view)
                .setCallback(pickerCallback);
            if(multiSelect)
            {
                gdrive_picker.enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            }
            gdrive_picker.build();
            gdrive_picker.setVisible(true);        
        }
    
        function pickerCallback(data) {
            if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                var docs = data[google.picker.Response.DOCUMENTS];
                if(!docs.length)
                {
                    return;
                }
                on_files_selected(docs,'gdrive');
            }
        }
        $('body').on('click', '.google_drive_picker', open_cloud_picker);
    }

    function init_one_drive_picker(){
        function open_cloud_picker(ev){
            is_multi_select_enabled(ev);
            var odOptions = {
                clientId: "df45ae45-68bd-4568-a473-4159a1b16fc1",
                action: "download",
                multiSelect: multiSelect,
                openInNewWindow: true,
                advanced: {
                   filter: "folder,.pdf,.doc,.docx,.html,.xls,.pptx,.ppt,.txt"
                },
                success: function (response) {
                    on_files_selected(response, 'onedrive');
                },
                cancel: function (response) { console.log(response); },
                error: function (e) { console.log(e); }
            };
            OneDrive.open(odOptions);
        }
        $('body').on('click', '.one_drive_picker', open_cloud_picker);
    }

    var selected_files = [];
    function on_files_selected(current_files, source){
        console.log(current_files, 1990, source);
        for(var i in current_files)
        {
            for(var j in selected_files)
            {
                if(selected_files[j].id == current_files[i].id && selected_files[j].source == source)
                {
                    found = true;
                }                    
            }
            if(!found)
            {
                current_files[i].source = source;
                selected_files.push(current_files[i]);
            }
        }
        console.log(selected_files, 88333);
    }
    
    init_google_picker();
    init_drop_box_picker();
    init_one_drive_picker();
})