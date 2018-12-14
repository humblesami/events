$(function(){
    var img = new Image();
    img.onload = function() {
        var validator_field = $('input[name="validated"]');
        validator_field.val(new Date()).change();
//        var width = img.naturalWidth;
//        var height = img.naturalHeight;
//        //window.URL.revokeObjectURL(img.src);
//        var err = '';
//        var min_width = 600;
//        var max_width = 2000;
//        var min_height = 400;
//        var max_height = 1600;
//        if( width < min_width || width > max_width) {
//            err += 'Image with this width('+width+') is not allowed, Please choose an image with width between '+min_width+' and '+max_width+'<br/><br/>';
//        }
//
//        if( height < min_height || height > max_height) {
//            err += 'Image with this height('+height+') is not allowed, Please choose image with height between '+min_height+' and '+max_height+'<br/><br/>';
//        }
//
//        var wh_ratio = width / height;
//        if( wh_ratio > 2 || wh_ratio < 1) {
//            err += 'Width='+width+' and Height='+height+' gives an invalid ratio=>'+wh_ratio;
//            err += '<br/>Please choose an image with width/height ratio between 1 and 2<br/><br/>';
//        }
//
//        if(err.length > 0)
//        {
//            //err = '<h4>An ideal image will be with dimensions<br/>Width=1200, Height=800</h4>' + err;
//            err = "<b>"+err+"</b>";
//            dntoast.error(err, 480);
//            validator_field.val('invalid').change();
//        }
//        else
//            validator_field.val(new Date()).change();
    };

    var lastFile = false;
    var file_tag = $('input[name="ufile"]');
    file_tag.change(function(e){
        dntoast.hide();
        var el = this;
        if(!el.files)
            return;
        if(el.files.length == 0)
            return;
        file = el.files[0];
        if(file.lastModified == lastFile.lastModified
        && file.size == lastFile.size && file.name == lastFile.name)
            return;
        $('input[name="filename"]').val(file.name).change();
        img.src = window.URL.createObjectURL(file);
    });
});