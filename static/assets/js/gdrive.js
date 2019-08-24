(function() {
    function onAuthApiLoad() {
        console.log('APi Loaded');
        window.gapi.auth.authorize({
            'client_id': '883270356067-4ib2bm6t9jnp8j5ef73nqkgth35oq19r.apps.googleusercontent.com',
            'scope': ['https://www.googleapis.com/auth/drive']
        }, handleAuthResult);
    }
    window['onGPAuthApiLoad'] = onAuthApiLoad;
    var oauthToken;

    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
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
        var allowed_types = 'application/vnd.google.drive.ext-type.pdf';
        allowed_types += 'application/vnd.google.drive.ext-type.doc';
        allowed_types += 'application/vnd.google.drive.ext-type.ppt';
        allowed_types += 'application/vnd.google.drive.ext-type.pptx';
        allowed_types += 'application/vnd.google.drive.ext-type.odt';
        allowed_types += 'application/vnd.google.drive.ext-type.txt';

        //2nd method I tried

        allowed_types += "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        allowed_types += ",application/x-vnd.oasis.opendocument.spreadsheet";
        
        allowed_types += ",application/vnd.openxmlformats-officedocument.presentationml.presentation";
        allowed_types += ",application/vnd.oasis.opendocument.presentation";

        allowed_types += ",application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        allowed_types += ",application/vnd.oasis.opendocument.text";
        allowed_types += ",application/rtf";
        allowed_types += ",application/pdf";
        allowed_types += ",text/plain";
        allowed_types += ",text/csv";
        

        console.log(allowed_types);
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        // view.setQuery('*.doc,*.docx,*.ppt,*.pptx');
        view.setMimeTypes(allowed_types);
        var picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId('boreal-quarter-250721')
            .setOAuthToken(oauthToken)
            .addView(view)
            .addView(new google.picker.DocsUploadView())
            // .setDeveloperKey('my sercret key')
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
    }

    function pickerCallback(data) {
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var docs = data[google.picker.Response.DOCUMENTS];
            console.log(docs);
        }
    }
    document.getElementById('google_drive_picker').click(function(){
        if(gdrive_picker)
        {
            gdrive_picker.setVisible(true);
            console.log('Tried setting picker visibile');
        }
        else{
            console.log('Picker not loaded yet');
        }
    });
})();