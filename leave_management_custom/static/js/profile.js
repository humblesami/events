$(function(){
//    if($('.o_form_buttons_view button').length > 1)
//    {
//      $('.o_form_buttons_view').show();
//      $('.o_form_statusbar').show();
//      $('.o_form_statusbar')[0].style.setProperty('display','flex','important');
//    }
    var cbs = $('div[name="groups_id"] input');
    cbs.change(function(){
      cbs.removeAttr('checked');
      $(this).prop('checked',true);
    });

    $('a[name=user_id]').addClass( "btn btn-default" ).html('Change Password');

});
