$(function(){
    if($('.o_form_buttons_view button').length > 1)
    {
        $('.o_cp_sidebar>.btn-group').show();
        $('.o_form_buttons_view').show();
    }
    var cbs = $('div[name="groups_id"] input');
    if(cbs.eq(0).prop('checked'))
    {
      cbs.removeAttr('checked');
      cbs.eq(0).prop('checked',true);
    }
    if(cbs.eq(1).prop('checked'))
    {
      cbs.removeAttr('checked');
      cbs.eq(1).prop('checked',true);
    }
    if(cbs.eq(2).prop('checked'))
    {
      cbs.removeAttr('checked');
      cbs.eq(2).prop('checked',true);
    }
    cbs.change(function(){
        cbs.removeAttr('checked');
        $(this).prop('checked',true);
    });
    $('a[name=user_id]').addClass( "btn btn-default" ).html('Change Password');
});
