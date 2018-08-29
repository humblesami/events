if(odoo.session_info && odoo.session_info.is_superuser)
{
    $('#oe_main_menu_navbar').show();
    $('body.o_connected_user').attr('style','padding-top:34px !important');
}
else
{
    $('#wrap>.container:first, #wrap>hr:first').hide();
    $('body.o_connected_user').attr('style','padding-top:0px !important');
    $('.oe_structure.oe_empty').html('<h1 style="text-align:center;">404: Page not found!</h1>').show();
}