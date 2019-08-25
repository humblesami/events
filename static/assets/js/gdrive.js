(function() {

    var oauthToken = "ya29.GlxvB2TL6InowGSCeZH1dlP20-tKIRZAbf6rOoIXouu8neYmT0PLAwy4oHaxrt9cvVG9JavWBPRuCTkBTqYPqHS7-O3Cp5bLBRVExN6ScqIfRjnPvRqjURNovTqPhA";
    function download()
    {
        var req_url = "https://www.googleapis.com/drive/v3/files/0Byhetnb2DhmFWVlZcEV0cTNLSWM/export?mimeType=application%2Frtf&key=AIzaSyDtYxh2q_KL6Gm0mX7TNCrkuEFEcWGolqw"
            req_url = "https://drive.google.com/uc?id=0Byhetnb2DhmFcFpZVDBUWkc0aVk&export=download"
            ajax_options = {
                headers:{
                    'Authorization': "Bearer "+oauthToken,
                    'Accept': 'application/json',
                },
                data: {},
                trace:1,
                url: req_url,
                onSuccess:function(data){
                    console.log(data);
                }
            }
            ajax_request(ajax_options);
    }
    // download();

    function onAuthApiLoad() {
        console.log('APi Loaded');
        window.gapi.auth.authorize({
            'client_id': '883270356067-4ib2bm6t9jnp8j5ef73nqkgth35oq19r.apps.googleusercontent.com',
            'scope': ['https://www.googleapis.com/auth/drive']
        }, handleAuthResult);
    }
    window['onGPAuthApiLoad'] = onAuthApiLoad;

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

    function pickerCallback(data) {
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var docs = data[google.picker.Response.DOCUMENTS];
            if(!docs.length)
            {
                return;
            }
            
            var file_id = docs[0].id;
            var download_url = "https://drive.google.com/uc?id="+file_id+"&export=download";
            download_url = "https://www.googleapis.com/drive/v3/files/"+file_id+"?alt=media"
            console.log()
            console.log(file_id, docs[0]);
            console.log(oauthToken);
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
