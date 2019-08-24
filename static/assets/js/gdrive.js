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

        var allowed_types = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/x-vnd.oasis.opendocument.spreadsheet",
        
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.presentation",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.oasis.opendocument.text",
        "application/rtf",
        "application/pdf",
        "text/plain",
        "text/csv"];
        allowed_types = allowed_types.slice(allowed_types.length - 5, allowed_types.length - 4);
        console.log(allowed_types);
        allowed_types = allowed_types.join(',');

        var appId = 'boreal-quarter-250721';

        var view = new google.picker.View(google.picker.ViewId.DOCS);
        // view.setMimeTypes("image/png,image/jpeg,image/jpg");
        view.setMimeTypes(allowed_types);
        var gdrive_picker = new google.picker.PickerBuilder()
            // .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            // .addView(new google.picker.DocsUploadView())
            // .setDeveloperKey(developerKey)
            .setCallback(pickerCallback)
            .build();
        gdrive_picker.setVisible(true);
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