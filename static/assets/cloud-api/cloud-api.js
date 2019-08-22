// <!-- The Google Drive API Loader script. -->
//     <script type="text/javascript" src="https://apis.google.com/js/api.js?onload=loadPicker"></script>
//     <!-- The Google API -->

// <!-- Box javascript library. -->
//     <script type="text/javascript" src="https://app.box.com/js/static/select.js"></script>

// <!-- DROPBOX APi javascript library -->
//     <script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs"
//         data-app-key="8hpet5mhvtiv9zq"></script>

// box Api
$(document).ready(function () {
    var boxSelect = new BoxSelect();
    // Register a success callback handler
    boxSelect.success(function (response) {
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            fileName = response[i].name;
            fileUrl = response[i].url;
            fileId = response[i].id;
            fileSize = response[i].size;
            CloudApiAjax(fileName, fileUrl,fileSize);
        }
    });
    // Register a cancel callback handler
    boxSelect.cancel(function () {
        console.log("The user clicked cancel or closed the popup");
    });
});

// google drive Api
$(document).ready(function () {
    $('body').delegate('#clickMe', 'click', function (event) {
        var oauthToken;
        $.ajax({
            // url: 'http://localhost:8081/PayAsYouGo/DriveAuthAjax/',
            url: webUrl+'/PayAsYouGo/DriveAuthAjax/',

            type: 'POST',
            error: function (request, error) {
                console.log(error);
                alert(" Can't do because: " + error);
            },
            success: function (token) {
                oauthToken = token;
                loadPicker();
            }
        });
        // The Browser API key obtained from the Google API Console.
        // Replace with your own Browser API key, or your own key.
        var developerKey = 'AIzaSyDp0oPDK3HOjiYKl-4gbnCbo8SUCygQKnQ';

        // The Client ID obtained from the Google API Console. Replace with your own Client ID.
        var clientId = "468104378810-gtgeibgi99enksqrkfvusk1on05kl2bh.apps.googleusercontent.com"

        // Replace with your own project number from console.developers.google.com.
        // See "Project number" under "IAM & Admin" > "Settings"
        var appId = "468104378810";

        // Scope to use to access user's Drive items.
        var scope = ['https://www.googleapis.com/auth/drive'];

        var pickerApiLoaded = false;
        


        
        // Use the Google API Loader script to load the google.picker script.
        function loadPicker() {
            gapi.load('picker', { 'callback': onPickerApiLoad });
        }

        function onPickerApiLoad() {
            pickerApiLoaded = true;
            createPicker();
        }
        // Create and render a Picker object for searching images.
        function createPicker() {
            if (pickerApiLoaded && oauthToken) {
                var view = new google.picker.View(google.picker.ViewId.DOCS);
                view.setMimeTypes("image/png,image/jpeg,image/jpg,application/pdf");
                var picker = new google.picker.PickerBuilder()
                    .enableFeature(google.picker.Feature.NAV_HIDDEN)
                    .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                    .setAppId(appId)
                    .setOAuthToken(oauthToken)
                    .addView(view)
                    .addView(new google.picker.DocsUploadView())
                    .addView(new google.picker.DocsView())
                    .setDeveloperKey(developerKey)
                    .setCallback(pickerCallback)
                    .build();
                picker.setVisible(true);
            }
        }

        // A simple callback implementation.
        function pickerCallback(data) {
            console.log(data);

            if (data.action == google.picker.Action.PICKED) {
                for (var i = 0; i < data.docs.length; i++) {
                    var fileId = data.docs[i].id;
                    $.ajax({
                        // url: 'http://localhost:8081/PayAsYouGo/DriveApi/',
                        url: webUrl+'/PayAsYouGo/DriveApi/',

                        
                        data: { 'fileId': fileId },
                        type: 'POST',
                        error: function (request, error) {
                            console.log(error);
                            alert(" Can't do because: " + error);
                        },
                        success: function (filename) {
                            if(filename=='sizeexceed'){
                                $("#sizealert").fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
                            }
                            else{
                                updateAttachmentsList(filename);
                            }
                        }
                    });
                }
            }
        }
    });
});

// dropbox Api
options = {
    success: function (files) {
        files.forEach(function (file) {
            var fileUrl = file.link;
            var fileName = file.name;
            fileSize = file.bytes;
            console.log(file);
            CloudApiAjax(fileName, fileUrl,fileSize);
        });
    },
    cancel: function () {
        //optional
    },
    linkType: "direct", // "preview" or "direct"
    multiselect: true, // true or false
    extensions: ['.png', '.jpg', '.pdf', '.jpeg', '.gif','.PNG', '.JPG', '.PDF', '.JPEG', '.GIF'],
};

var button = Dropbox.createChooseButton(options);
document.getElementById("dropbox-container").appendChild(button);

// Cloud Api Ajax Call
function CloudApiAjax(fileName, fileUrl, fileSize) {
    function download(path, token){  
        var url = fileUrl
        var result;
        var xhr = new XMLHttpRequest(); 
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
            result = xhr.responseText;
            }
        }
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.send();  
    }
    download();
    console.log(fileName, fileSize, fileUrl);
    let values = $('#cloud-file-urls_tag').val();
    if (values)
    {
        values += fileUrl + ',';
        $('#cloud-file-urls_tag').val(values);
    }
    else
    {
        $('#cloud-file-urls_tag').val(fileUrl + ',');
    }
    // $.ajax({
    //     url: webUrl+'/PayAsYouGo/cloudApi/',
    //     data: { 'filename': fileName, 'url': fileUrl, 'fileSize':fileSize },
    //     type: 'POST',
    //     error: function (request, error) {
    //         console.log(arguments);
    //         alert(" Can't do because: " + error);
    //     },
    //     success: function (filename) {
    //         if(filename=='sizeexceed'){
    //             $("#sizealert").fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    //         }
    //         else{
    //             updateAttachmentsList(filename);
    //         }
    //     }
    // });
}
function updateAttachmentsList(filename){
    var filesList = '';
    filesList = '<li class="media" id="uploaderFilev4ub9ai21k"><div class="media-body mb-1"><div class="UploadFileBox"><p class="mb-2 UploadInfoBox"><strong id="fileName">' + filename + '</strong>Status:<span class="status text-success">Upload Complete&nbsp;&nbsp;&nbsp;</span></p><div class="cncl">Delete <i class="fa fa-trash"></i></div></div><div class="progress mb-2"><div class="progress-bar bg-primary bg- bg-info" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">100%</div></div></div></li>'
    var fl = $('#files').append(filesList);
}