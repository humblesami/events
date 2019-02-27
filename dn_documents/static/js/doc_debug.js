(function(){
//    var path_name = window.location.toString();
//    path_name = path_name.split('?');
//    path_name = path_name[1];
//    path_name = path_name.split('#');
//    path_name = path_name[1];
//
//    var params = path_name.split('&');
//    var dict = {}
//    for(var i in params)
//    {
//        var par = params[i].split('=');
//        dict[par[0]] = par[1];
//    }
//    var model_dict = {
//        'meeting_point.doc':'meeting'
//    }
//    var id = dict['id'];
//    var model_name = dict['model'];
//    var doc_type = model_dict[model_name];
//
//    var page_url = 'iframe/'+doc_type+'/'+id+'/'+odoo.session_info.token;
//
//    var iframe_base_path = window.location.origin+'/meetvue/';
//    var iframe_src = iframe_base_path+page_url;

//    var height_to_minus = $('.o_content').css('overflow','hidden').position().top - 139 + 'px';
//    console.log(iframe_src, height_to_minus);
//    var iframe = '<iframe class="doc_iframe" src="'+iframe_src+'" style="width: 100%;height: calc(100vh - '+height_to_minus+');"></iframe>';
//    $('.o_form_view.o_form_nosheet:first').css({padding:0, overflow:'hidden'});
//    $('#pdf_div').html(iframe);
})();