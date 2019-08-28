document.getElementById("OpenDropboxFilePicker").addEventListener("click", e => {
    var options = {
        success: function (files) {
             for (const file of files) {
                    const name = file.name;
                    const url = file.link;
                    console.log(file);
                }
        },
        cancel: function () {
        },
        linkType: "direct", // or "preview"
        multiselect: true,
        folderselect: false, // or true
        extensions: ['.pdf', '.doc', '.docx', '.html'],
        sizeLimit: 4096, // or any positive number
    };

    Dropbox.choose(options);
});


$(function(){
    $.ajax({
        url:'https://www.dropbox.com/oauth2/authorize?client_id=pvbda3hm0tpwnod&response_type=code',
        success:function(data){
            console.log(data)
        },
        error:function(a,b,c,d){
            console.log(a,b,c,d);
        },
    })
})
