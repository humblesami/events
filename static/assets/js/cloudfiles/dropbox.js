function init_token(){
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
            open_files();
        }
        else
        {
            // console.log('Pata ni kon kari janda');
        }
    }, false);
}
init_token();




function open_files() {
    var token = localStorage.getItem('/dropbox/token');    
    console.log(token, 24);
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
}
$(function(){
    console.log($("#OpenDropboxFilePicker").length ,4344);
    $("#OpenDropboxFilePicker").click(open_files);
})