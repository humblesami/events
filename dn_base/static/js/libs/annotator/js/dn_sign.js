var sign_lib = 0;

$(document).ready(function () {
    var dataURL = '';
    var doc_id = 0;
    var img = new Image();
    var signature_url = {
        get:'',
        post:''
    }

    var signature_editor = $('#signature_editor');
    var auto_sign = $('#auto-sig');
    var insert_sign = $('#insert-sig');

    function set_up_signature()
    {
        var save_btn = $('#save-sig');
        var upload_clicker = $('#upload-sig-btn');
        var upload_btn = $('#upload-sig');

        var clear_btn = $('#clear-sig');
        var draw_sign_btn = $('#draw-sig');


        upload_clicker = $(upload_clicker);
        upload_clicker.click(function () {
            upload_btn.click();
        });


        upload_btn.change(function () {
            if (!this.files)
                return;
            if (this.files.length < 1)
                return;
            var file_tag = this;
            var reader = new FileReader();
            auto_clicked = false;

            var upload_file = this.files[0];
            reader.readAsDataURL(upload_file);
            reader.onload = function () {
                var dataURL = reader.result;
                canvas_context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                img.src = dataURL;
            }
        });

        auto_sign.click(function (e) {
            var input_data = {
                document_id: doc_id,
                binary_signature: "",
                type: "auto"
            };
            dn_rpc_object({
                url:signature_url.post,
                data: input_data,
                onSuccess: load_signature, 
                type:'post'
            });
        });

        insert_sign.click(function (e) {
            var input_data = {
                document_id: doc_id,
            };
            dn_rpc_object({
                url:'/profile/get_signature',data: input_data, onSuccess: load_signature
            });
        })


        save_btn.click(function (e) {
            var type = "draw";
            dataURL = myCanvas.toDataURL();
            
            $('.strt_sign.pdfjs').hide();
            dataURL = dataURL.replace('data:image/png;base64,', '');
            var input_data = {
                document_id: doc_id,
                binary_signature: dataURL,
                type: type
            };                        
            dn_rpc_object({
                url:signature_url.post, 
                data:input_data,
                onSuccess: function (data) {                    
                    if(signature_url.post.indexOf('meeting_point')> -1)
                    {
                        pdf_js_module.render({doc:data.doc, id: doc_id, first_time: 1, type : 'signature'});
                    }
                }, type:'post'
            });
            $('#signModal .modal-footer button').click();
        });

        clear_btn.click(function () {
            signature_editor.signature('clear');
        });

        draw_sign_btn.click(function () {
            signature_editor.signature('clear');
        });

        $('body').prepend('<script src="assets/js/signature.js"></script>');

        signature_editor.signature({thickness:4});

        var myCanvas = signature_editor.find('canvas')[0];
        var canvas_context = myCanvas.getContext('2d');

        img.onload = function () {
            canvas_context.drawImage(img, 0, 0, signature_editor.width(), signature_editor.height());
        };
    }

    function load_signature(data) {

        signature_editor.signature({thickness:4});
        signature_editor.signature('clear');
        var signature_value = data.signature;
        if (signature_value && signature_value.length > 0) {
            dataURL = 'data:image/png;base64,' + data.signature;
            img.src = dataURL;
        }
    }

    $('body').on('click', '.strt_sign', function () {
        if(sign_lib !=1)
        {
            set_up_signature();
            sign_lib = 1;
        }

        var input_data = {};
        signature_url.post = $(this).attr('url');
        signature_url.get = signature_url.post.replace('/save','/get');
        signature_url.get = signature_url.get.replace('_doc','');

        console.log(signature_url);
        if($(this).hasClass('profile')){
            var profile_id = $('.strt_sign').attr('id');
            input_data = {
                uid: profile_id
            };
        }
        else{
            doc_id = $('.strt_sign').attr('doc_id');
            input_data = {
                document_id: doc_id
            };
        }

        dn_rpc_object({
            url:signature_url.get, data: input_data,
            onSuccess: function (d) {
                $('#signModal').modal('show');
                setTimeout(function () {
                    load_signature(d);
                }, 200);
            }
        });
    });

});
