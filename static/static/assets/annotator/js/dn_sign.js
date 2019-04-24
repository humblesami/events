var sign_lib = 0;

$(document).ready(function () {
    var dataURL = '';
    var doc_id = 0;
    var img = new Image();
    var signature_url = {
        get:'',
        post:''
    }
    var btn_sign;
    var voting_id = -1;
    var request_url;
    var signature_editor = $('#signature_editor');
    var auto_sign = $('#auto-sig');
    var insert_sign = $('#insert-sig');
    var vote_sign_data = {};

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
            voting_id = getVotingId();
            if(voting_id != -1)
            {
                signature_url.post = '/voting/submit';
                input_data = {
                    voting_id: voting_id,
                    voting_option_id : window['voting_option_id'],
                    signature_data: "",
                    type: "auto"
                }
            }
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
            voting_id = getVotingId();
            if(voting_id != -1)
            {
                signature_url.post = '/voting/submit';
                input_data = {
                    voting_id: voting_id,
                    voting_option_id : window['voting_option_id'],
                    signature_data: dataURL                    
                }
            }

            if (voting_id == -1)
            {
                signature_url.post = '/profile/save_signature';
            }
            dn_rpc_object({
                url:signature_url.post,data: input_data, onSuccess: load_signature
            });
        })


        save_btn.click(function (e) {
            e.stopPropagation();
            var type = "draw";
            dataURL = myCanvas.toDataURL();
            // console.log("empty",isCanvasBlank(myCanvas));
            // if(isCanvasBlank(myCanvas)){
            //     dataURL ="";
            //     console.log("empty",signature_editor.signature('isEmpty'));
            // }
            
            $('.strt_sign.pdfjs').hide();
            dataURL = dataURL.replace('data:image/png;base64,', '');
            var input_data = {
                document_id: doc_id,
                binary_signature: dataURL,
                type: type
            }; 
            voting_id = getVotingId();
            if(voting_id != -1)
            {
                signature_url.post = '/voting/submit';
                input_data = {
                    voting_id: voting_id,
                    voting_option_id : window['voting_option_id'],
                    signature_data: dataURL                    
                }
            }
            
            if (voting_id == -1)
            {
                signature_url.post = '/profile/save_signature';
            }
            dn_rpc_object({
                url:signature_url.post, 
                data:input_data,
                onSuccess: function (data) {                      
                    if(signature_url.post.indexOf('meeting_point')> -1)
                    {
                        pdf_js_module.render({doc:data.doc, id: doc_id, first_time: 1, type : 'signature'});
                    }
                    if(signature_url.post.indexOf('profile')> -1)
                    {
                        voting_id = -1;
                        var d = Date.now();
                        $('img.strt_sign')[0].src=`${site_config.server_base_url}/image/meeting_point.users/${data.id}/signature_img/${current_user.cookie.db}/${current_user.cookie.token}?d=${d}`
                    }
                    if(voting_id != -1)
                    {
                        window['on_vote_sign_saved'](data.signature_data);
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

        $('body').prepend('<script src="/static/assets/js/signature.js"></script>');

        signature_editor.signature({thickness:4});

        var myCanvas = signature_editor.find('canvas')[0];
        var canvas_context = myCanvas.getContext('2d');

        img.onload = function () {
            canvas_context.drawImage(img, 0, 0,signature_editor.width(),signature_editor.height());
        };
    }

    function isCanvasBlank(canvas) {
        const blank = document.createElement('canvas');
      
        blank.width = canvas.width;
        blank.height = canvas.height;
      
        return canvas.toDataURL() === blank.toDataURL();
      }

    function load_signature(data) {

        signature_editor.signature({thickness:4});
        signature_editor.signature('clear');
        var signature_value = data.signature;
        if(data.signature_data)
        {
            signature_value = data.signature_data;
        }        
        if (signature_value && signature_value.length > 0) {
            dataURL = 'data:image/png;base64,' + signature_value;
            img.src = dataURL;
        }
        // if(voting_id != -1 && !data.signature_data && window['on_vote_sign_saved'])
        // {
        //     window['on_vote_sign_saved']();
        // }
    }
    function getVotingId(){
        voting_id = window['voting_id'];
            if(!voting_id)
                voting_id = -1;
        return voting_id;
    }
    $("body").off( "click" ,".strt_sign");
    $('body').on('click', '.strt_sign', function () {        
        btn_sign = this;
        voting_id = getVotingId();
        
        if(sign_lib !=1 )
        {
            set_up_signature();
            sign_lib = 1;
        }

        signature_url.post = $(this).attr('url');
        signature_url.get = signature_url.post.replace('/save','/get');
        signature_url.get = signature_url.get.replace('_doc','');
        signature_url.post = signature_url.post.replace('/'+voting_id, '');

        if ($(btn_sign).hasClass('voting'))
        {
            request_url = '/voting/get_signature';            
        }
        else
        {
            window['voting_id'] = -1;
            request_url = '/profile/get_signature';
        }
        var input_data = {};
        signature_url.post = $(this).attr('url');
        signature_url.get = signature_url.post.replace('/save','/get');
        signature_url.get = signature_url.get.replace('_doc','');

        
        if($(this).hasClass('profile')){
            var profile_id = $('.strt_sign').attr('id');
            voting_id = -1;
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

        if (voting_id != -1)
        {
            input_data = {
                voting_id: voting_id
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
