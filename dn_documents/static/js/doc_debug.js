(function(){
    var path_name = window.location.toString();
    path_name = path_name.split('?');
    path_name = path_name[1];
    path_name = path_name.split('#');
    path_name = path_name[1];

    var params = path_name.split('&');
    var dict = {}
    for(var i in params)
    {
        var par = params[i].split('=');
        dict[par[0]] = par[1];
    }
    var model_dict = {
        'meeting_point.doc':'meeting'
    }
    var res_id = dict['id'];
    var model_name = dict['model'];
    var doc_type = model_dict[model_name];

    var doc_iframe_base_path = window.location.origin+'/meetvue/';
    var doc_src = doc_iframe_base_path + doc_type+'/iframe/'+res_id+'/demo/token';

    var iframe = '<iframe class="doc_iframe" src="'+doc_src+'" style="width: 100%;height: calc(100vh - 130px);"></iframe>';
    $('.o_form_view.o_form_nosheet:first').css({padding:0, overflow:'hidden'});
    $('#pdf_div').html(iframe);
})();