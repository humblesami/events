var sign_lib = 0;

$(document).ready(function () {
    $('#signModal').remove();
    $('body').append(`<div class="modal fade" id="signModal" role="dialog" style="z-index:1053" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div id="signature-body" class="modal-body" >
                    <div class="DocsButtonWrapper">
                        <span class="btn btn-primary btn-sm DocsBtn" id="draw-sig">Draw</span>
                        <button id="upload-sig-btn" class="btn btn-sm btn-primary DocsBtn o_select_file_button" title="Select" type="button">Upload</button>
                        <input id="upload-sig" accept=".jpg,.png,.jpeg" style="display:none" type="file">
                        <span class="btn btn-primary btn-sm DocsBtn" id="auto-sig">Auto</span>
                        <!-- <span class="btn btn-primary btn-sm DocsBtn" id="insert-sig">Insert</span> -->
                    </div>
                    <div id="signature_editor" class="kbw-signature">
                    </div>
                    <span class="btn btn-danger btn-sm DocsBtn" id="clear-sig">Clear</span>
                    <span class="btn btn-primary btn-sm DocsBtn" id="save-sig">Save</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`);

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
            dn_json_rpc(
                signature_url.post,
                input_data,
                load_signature

            );
        });

        insert_sign.click(function (e) {
            var input_data = {
                document_id: doc_id,
            };
            dn_json_rpc(
                '/profile/get_signature',input_data, load_signature
            );
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
            dn_json_rpc(
                signature_url.post,
                input_data,
                function (data) {
                        load_signature({signature:dataURL});
//                    if(signature_url.post.indexOf('meeting_point')> -1)
//                    {
//                        pdf_js_module.render({doc:data.doc, id: doc_id, first_time: 1, type : 'signature'});
//                    }
//                    if(signature_url.post.indexOf('profile')> -1)
//                    {
//                        var d = Date.now();
//                        $('img.strt_sign')[0].src=$('img.strt_sign')[0].src+"&d="+d;
//                    }

                }            );
            $('#signModal .modal-footer button').click();
        });

        clear_btn.click(function () {
            signature_editor.signature('clear');
        });

        draw_sign_btn.click(function () {
            signature_editor.signature('clear');
        });



        signature_editor.signature({thickness:4});

        var myCanvas = signature_editor.find('canvas')[0];
        var myCanvas1 = $('canvas.jSignature')[0]
        var canvas_context = myCanvas.getContext('2d');
        var canvas_context1 = myCanvas1.getContext('2d');

        img.onload = function () {
            canvas_context.drawImage(img, 0, 0,signature_editor.width(),signature_editor.height());
            canvas_context1.drawImage(img, 0, 0,signature_editor.width(),signature_editor.height());
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
    $("body").off( "click" ,".strt_sign");
    $('body').on('click', '.strt_sign', function () {
        if(sign_lib !=1)
        {
            set_up_signature();
            sign_lib = 1;
        }

        var input_data = {};
        signature_url.post = "/profile/save_signature";
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

        dn_json_rpc(
            signature_url.get,  input_data,
             function (d) {
                $('#signModal').modal('show');
                setTimeout(function () {
                    load_signature(d);
                }, 200);
            }
        );
    });

});
