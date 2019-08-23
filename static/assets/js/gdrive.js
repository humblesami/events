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
        gdrive_picker = new google.picker.PickerBuilder()
            // .addView(new google.picker.DocsUploadView())
            .addView(new google.picker.DocsView())
            .setOAuthToken(oauthToken)
            //.setDeveloperKey('AIzaSyDPs9U-dgOC9h1jRFNwOwhRtARCph8_3HM')
            .setCallback(pickerCallback)
            .build();
            console.log('Setting picker visible');
            document.getElementById('google_drive_picker').removeAttribute('disabled');
        gdrive_picker.setVisible(true);
        
    }

    function pickerCallback(data) {
        var url = 'nothing';
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            url = doc[google.picker.Document.URL];
        }
        var message = 'You picked: ' + url;
        document.getElementById('accessed_file').innerHTML = message;
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

    
})()