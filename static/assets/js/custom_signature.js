function init_sign(config) {    
    if($('#signature_modal').length >0)
    {
        $('#signature_modal').hide();
        $('.modal-backdrop').hide();
    }
    $('#signature_modal').remove();
    $('body').append(`<div class="modal fade" id="signature_modal" role="dialog" style="z-index:1053" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <div class="mb-1">
                    <button class="btn btn-primary DocsBtn" id="draw-sig">Draw</button>
                    <button id="upload-sig-btn" class="btn btn-primary DocsBtn o_select_file_button" title="Select" type="button">Upload</button>
                    <input id="upload-sig" accept=".jpg,.png,.jpeg" style="display:none" type="file">
                    <button class="btn btn-primary DocsBtn" id="auto-signature-btn">Auto</button>
                    <input type="range" class="slider range-slider" id="range-slider" value="4" min="1" max="20" title="Pen Size">
                    <span id="output_value"></span>
                </div>
                <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div id="signature-body" class="modal-body" >
                    
                    <div id="signature-editor-div" class="kbw-signature">
                        <canvas id="signature_canvas" height="300" width="465"></canvas>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger DocsBtn" id="clear-signature-btn">Clear</button>
                    <button class="btn btn-primary DocsBtn" id="save-signature-btn">Save</button>
                    <button class="btn btn-default" id="close-signature-btn" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`);

    

    var dataURL = '';
    var img = new Image();
    
    var signature_editor = $('#signature-editor-div');
    var auto_sign = $('#auto-signature-btn');
    var insert_sign = $('#insert-sig');

    function load_signature(signature_value) {
        var clear_btn = $('#clear-signature-btn');
        // signature_editor.find('canvas').sign({
        //     resetButton: clear_btn,
        //     lineWidth:8
        // });
        clear_btn.click();

        if (signature_value && signature_value.length > 0) {
            var binary_prefix = 'data:image/png;base64,';
            if (signature_value.startsWith('data:'))
            {
                binary_prefix = '';
            }
            dataURL = binary_prefix + signature_value;
            img.src = dataURL;
        }
    }

    var patternCanvas = undefined;
    function setup_signature(){
        var save_btn = $('#save-signature-btn');
        var upload_clicker = $('#upload-sig-btn');
        var upload_btn = $('#upload-sig');

        var clear_btn = $('#clear-signature-btn');
        var draw_sign_btn = $('#draw-sig');
        
        load_signature(config.signature_data);

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
                load_signature(dataURL);
            }
        });

        function on_auto_sign(){

        }

        auto_sign.click(function (e) {
            if (config.on_auto_sign)
            {
                let sign_data = config.on_auto_sign();
                console.log(sign_data);
                load_signature(sign_data);
            }
            else
            {
                on_auto_sign();
            }

            //load_signature(config.signature);
        });

        insert_sign.click(function (e) {
            load_signature(config.signature);
        });

        save_btn.click(function (e) {            
            var type = "draw";
            dataURL = myCanvas.toDataURL();
            $('.strt_sign.pdfjs').hide();            
            if(!dataURL)
            {
                console.log('No signs');
                return;
            }
            $('.strt_sign.pdfjs').hide();
            if(!config.include_prefix)
            {
                dataURL = dataURL.replace('data:image/png;base64,', '');
            }
            config.on_signed(dataURL);
            $('#signature_modal #close-signature-btn').click();
        });

        draw_sign_btn.click(function () {
            clear_btn.click();
        });        

        var myCanvas = signature_editor.find('canvas')[0];        
        var canvas_context = myCanvas.getContext('2d');
        // signature_editor.find('canvas').sign({
        //     resetButton: clear_btn,
        //     lineWidth:4
        // });

        patternCanvas = new fabric.Canvas('signature_canvas', {isDrawingMode: true});
        patternCanvas.freeDrawingBrush.width = parseInt($('#range-slider').val());
        
        img.onload = function () {
            canvas_context.drawImage(img, 0, 0,signature_editor.width(),signature_editor.height());
            // $('#signature_modal').show();
        };
    };

    $('#signature_modal').modal('show');
    $('#range-slider').change(function(){
        // patternCanvas.freeDrawingBrush.color = '#f0f';
        patternCanvas.freeDrawingBrush.width = parseInt(this.value);
    })
    $( "#signature_modal" ).on('shown.bs.modal', setup_signature);
    // $('#signature_modal').hide();
    var slider = document.getElementById("range-slider");
    var output = document.getElementById("output_value");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    }
};
window['init_sign'] = init_sign;
