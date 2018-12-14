(function(){
    var dnow = Date.now();
    var script_path = '<script src="/dn_documents/static/js/doc_debug.js?v='+dnow+'"></script>';
    $('#doc_js').before(script_path);
})()