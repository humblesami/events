$(function()
{
    if(!$('.o_view_manager_content .o_kanban_view:first').hasClass('k_script_flag'))
    {
        $('.o_view_manager_content .o_kanban_view:first').addClass('k_script_flag');
        var cssfile = '<link rel="stylesheet" href="/meeting_point/static/css/meeting_kanban.css" />';
        $('.o_view_manager_content .o_kanban_view').before(cssfile);
        $('body').on('click','.acceptancebtn.oe_kanban_action',function(){
            $(this).parent().find('.acceptancebuttonsactive').removeClass('acceptancebuttonsactive');
            $(this).addClass('acceptancebuttonsactive');
        });
    }
});