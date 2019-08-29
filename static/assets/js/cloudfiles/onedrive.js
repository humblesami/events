$(function(){
    function launchOneDrivePicker() {
        var odOptions = {
            clientId: "df45ae45-68bd-4568-a473-4159a1b16fc1",
            action: "download",
            multiSelect: true,
            openInNewWindow: true,
            advanced: {
               filter: "folder,.pdf,.doc,.docx,.html,.xls,.pptx,.ppt,.txt"
            },
            success: function (response) {
                console.log(555, response); 
            },
            cancel: function (response) { console.log(response); },
            error: function (e) { console.log(e); }
        };
        OneDrive.open(odOptions);
    }
    
    $("#OpenOneDrive").click(launchOneDrivePicker);
})