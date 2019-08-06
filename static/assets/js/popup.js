
function init_popup(config) {    

    if($('#signModal').length == 0)
    {
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
                    <button type="button" class="btn btn-sm btn-default" id="close-btn">Close</button>
                    </div>
                </div>
            </div>
        </div>`);
        
    }
    else{
        // if(!$('#signModal').attr('onhidden'))
        // {
        //     $('#signModal').on('hidden.bs.modal', function (e) {
            
        //     });
        // }        
        // $('#signModal').attr('onhidden', 1);
        // if(!$('#signModal').attr('onshown'))
        // {
        //     $('#signModal').on('shown.bs.modal', function (e) {

        //     });
        // }        
        // $('#signModal').attr('onshown', 1);
    }
    document.getElementById('save-sig').onclick = function(){        
        if (config.on_save)
        {
            config.on_save();
            if(config.hide_on_save)
            {
                $('#signModal').modal('hide');
            }
        }
    }
    document.getElementById('close-btn').onclick = function(){
        if (config.on_close)
        {
            config.on_close();
        }
        $('#signModal').modal('hide');
    }
    if(config.on_load)
    {
        config.on_load();
    }
    $('#signModal').modal('show');

};
window['init_popup'] = init_popup;
