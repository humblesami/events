/*
 * Signature Plugin
 * HTML5 Canvas Jquery plugin
 *
 * Examples and documentation at: http://tiendasdigitales.net
 *
 * Copyright (c) 2018 Lucas Gabriel Martinez
 *
 * Version: 1.0.0 - 2018/07/24
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
jQuery(document).ready(function(e) {
    jQuery.fn.sign = function(options) {
        var params = jQuery.fn.extend({
            reset: options.resetButton ? options.resetButton : null,
            width: options.width ? options.width : 466,
            height: options.height ? options.height :  260,
            lineWidth: options.lineWidth ? options.lineWidth : 10,
        }, options);

        var canvas = jQuery(this);
        
        var lineWidth = params.lineWidth;
        
        var context = canvas.get(0).getContext('2d');
        context.lineJoin = context.lineCap = 'round';

        var fixFingerPosition = 15;            

        canvas.attr("width",params.width);
        canvas.attr("height", params.height); 

        var points = [];
        var last = {x:null,y:null};
        var holdClick = false;

        var touch = function(e)
        {
            var touch = null;
            if (e.type !== 'click' && e.type !== 'mousedown' && e.type !== 'mousemove') {
                touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            } else {
                touch = e;
            }

            return ({x: touch.pageX, y: touch.clientY});
        }

        var getMousePosition = function(canvas, evt)
        {
            var rect = canvas.get(0).getBoundingClientRect();
            var pos = touch(evt);
            return {
                x: pos.x - rect.left,
                y: pos.y - rect.top
            };
        }

        var draw = function(ctx, x, y)
        {
            points.push({x: x, y: y, break: false});
            //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            var p1 = points[0];
            var p2 = points[1];

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);  

            for (var i = 1; i < points.length; i++) {
                var midPoint = calculateMiddlePoint(p1, p2);
                if (p1.break) {
                    ctx.moveTo(p2.x, p2.y); 
                } else {
                    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                }
                p1 = points[i];
                p2 = points[i+1];
            }
            
            ctx.lineWidth = lineWidth;
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
        }

        var calculateMiddlePoint = function(pointStart, pointEnd)
        {
            return {
                x: pointStart.x + (pointEnd.x - pointStart.x) / 2 ,
                y: pointStart.y + (pointEnd.y - pointStart.y) / 2
            }
        }
        // Mouse & touch events
        canvas.on('touchstart mousedown', function(e) {
            holdClick = true;
            var mousePosition = getMousePosition(canvas, e);                   
            points.push({x: mousePosition.x , y: mousePosition.y, break: false});
            return false;
        }).on('touchmove mousemove', function(e)
        {
            if (holdClick) {
                var mousePosition = getMousePosition(canvas, e);                    
                draw(context, mousePosition.x, mousePosition.y);
            }
            return false;
        }).on('touchend mouseup', function(e) {
            e.preventDefault();
            holdClick = false;
            points[points.length - 1].break = true;
            return false;
        });

        // Reset canvas
        var reset = function()
        {
            context.clearRect(0, 0, canvas.width(), canvas.height());
            points.length = 0;
        }

        if (params.reset !== null) {
            params.reset.on('click touchend', function()
            {
                reset();
            });
        }
  };
});


function init_sign(config) {
    var sign_lib = 0;
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
                <div class="DocsButtonWrapper">
                        <span class="btn btn-primary btn-sm DocsBtn" id="draw-sig">Draw</span>
                        <button id="upload-sig-btn" class="btn btn-sm btn-primary DocsBtn o_select_file_button" title="Select" type="button">Upload</button>
                        <input id="upload-sig" accept=".jpg,.png,.jpeg" style="display:none" type="file">
                        <span class="btn btn-primary btn-sm DocsBtn" id="auto-signature-btn">Auto</span>
                        <!-- <span class="btn btn-primary btn-sm DocsBtn" id="insert-sig">Insert</span> -->
                    </div>   
                <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div id="signature-body" class="modal-body" >
                    
                    <div id="signature-editor-div" class="kbw-signature">
                        <canvas height="100" width="100"></canvas>
                    </div>
                    
                </div>
                <div class="modal-footer">
                <button class="btn btn-danger btn-sm DocsBtn" id="clear-signature-btn">Clear</button>
                <button class="btn btn-primary btn-sm DocsBtn" id="save-signature-btn">Save</button>
                <button class="btn btn-sm btn-default" id="close-signature-btn" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`);

    var dataURL = '';
    var doc_id = 0;
    var img = new Image();
    
    var signature_editor = $('#signature-editor-div');
    var auto_sign = $('#auto-signature-btn');
    var insert_sign = $('#insert-sig');

    function load_signature(signature_value) {
        var clear_btn = $('#clear-signature-btn');
        signature_editor.find('canvas').sign({
            resetButton: clear_btn,
            lineWidth:4
        });
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
        signature_editor.find('canvas').sign({
            resetButton: clear_btn,
            lineWidth:4
        });

        img.onload = function () {
            canvas_context.drawImage(img, 0, 0,signature_editor.width(),signature_editor.height());
            // $('#signature_modal').show();
        };
    };

    $('#signature_modal').modal('show');
    $( "#signature_modal" ).on('shown.bs.modal', setup_signature);
    // $('#signature_modal').hide();

};
window['init_sign'] = init_sign;
