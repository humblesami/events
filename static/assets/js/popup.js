
function init_popup(config) {    
    $('#signModal #save-sig').off('click');
    $('#signModal #save-sig').click(function(){        
        if (config.on_save)
        {
            config.on_save();
        }
        if(config.hide_on_save || config.hide)
        {
            $('#signModal').modal('hide');
        }
    });
    $('#signModal #close-btn').off('click');
    $('#signModal #close-btn').click(function(){
        if (config.on_close)
        {
            config.on_close();
        }
        $('#signModal').modal('hide');
    });
    if(config.on_load)
    {
        config.on_load();
    }
    $('#signModal').modal('show');

};
window['init_popup'] = init_popup;
$(function(){
    $(document).on('click', 'label.overflow-hidden', function(){
        var c_label = this;        
        var label_show = {
            on_load: function(){
                $('#signModal .modal-body').html(c_label.innerHTML);
            }
        }
        init_popup(label_show);
    })
})
