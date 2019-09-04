$(function(){
    function launchOneDrivePicker() {
        // alert(cloud_number+'---'+3232);
        var odOptions = {
            clientId: "df45ae45-68bd-4568-a473-4159a1b16fc1",
            action: "download",
            multiSelect: true,
            openInNewWindow: true,
            advanced: {
               filter: "folder,.pdf,.doc,.docx,.html,.xls,.pptx,.ppt,.txt"
            },
            success: function (response) {
                // console.log(555, response);
                var selection_info = [];
                for(var file of response.value)
                {
                    // console.log(file, 188);
                    selection_info.push({
                        id: file.id,
                        name: file.name,
                        url: file["@microsoft.graph.downloadUrl"],
                    })
                }
                
                var post_data = {files:selection_info, cloud_number: cloud_number};
                console.log(post_data, 566);
                window.parent.postMessage(post_data, '*');
            },
            cancel: function (response) { console.log(response); },
            error: function (e) { console.log(e); }
        };
        OneDrive.open(odOptions);
    }    
    $("#OpenOne").click(launchOneDrivePicker);
})