(function(){
    //var doc_src = 'http://localhost:4200/meeting/doc/69';
    var doc_src = 'http://localhost:4200/meeting/iframe/69/demo/token';
    var iframe = '<iframe src="'+doc_src+'" style="width: 100%;height: calc(100vh - 113px);"></iframe>';
    $('.modal-dialog .o_form_view.o_form_nosheet:first').css({padding:0});
    $('#pdf_div').html(iframe);
    console.log($('.modal-footer').length, 1333);
    $('.modal-footer:first').hide();
})()