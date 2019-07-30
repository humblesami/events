
function init_popup(config) {
    var sign_lib = 0;    
    $('#signModal').remove();
    $('body').append(`<div class="modal fade" id="signModal" role="dialog" style="z-index:1053" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <div class="DocsButtonWrapper">
                
                </div>
                <button type="button" class="close">×</button>
                </div>
                <div id="signature-body" class="modal-body" >
                
                </div>
                <div class="modal-footer">
                    <span class="btn btn-primary btn-sm DocsBtn" id="save-sig">Save</span>
                <button type="button" class="btn btn-default" id="close-btn">Close</button>
                </div>
            </div>
        </div>
    </div>`);


    var dataURL = '';
    var img = new Image();
    
    var signature_editor = $('#signature_editor');

    function load_signature(signature_value) {
        var clear_btn = $('#clear-sig');
        //console.log(signature_editor.find('canvas')[0], 199);
        signature_editor.find('canvas').sign({
            resetButton: clear_btn,
            lineWidth:4
        });
        clear_btn.click();
    }


    function setup_signature(){
        if(config.on_load)
        {
            config.on_load();
        }
    };

    $('#save-sig').click(function(){        
        if (config.on_save)
        {
            config.on_save();
        }        
    });

    $('#close-btn, .close').click(function(){
        if (config.on_close)
        {
            config.on_close();
        }
        $('#signModal').modal('hide');
    });

    $('#signModal').modal('show');
    
    $( "#signModal" ).on('shown.bs.modal', setup_signature);
    // $('#signModal').hide();

};
window['init_popup'] = init_popup;
