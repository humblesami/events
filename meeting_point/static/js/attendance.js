$(function()
{
    $('.mtopic_tree table tbody tr td:nth-child(6)').html('<span class="btn btn-primary btn-sm">View Details</span>');
    $('.kanban_document button.o-kanban-button-new').html("Attach");
    $('input[placeholder="Select attendees..."]:first').focus(function(){
        setTimeout(function(){
            $('.o_m2o_dropdown_option').hide();
        }, 500);
    });
    $('.dnroster .o_kanban_view.o_kanban_ungrouped .oe_kanban_global_click').parent().addClass('o_dropdown_kanban');
    setTimeout(function(){
        var seen = $('.meeting_seen.o_hidden:first').html();
        if(seen != 1)
        {
            var res_id = $('.meeting_id.o_hidden:first').html();
            if(res_id)
            {
                update_seen_by('calendar.event', res_id);
            }
        }
    },900);
});