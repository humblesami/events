$(function(){

    var cbs = $('div[name="groups_id"] input');
    cbs.change(function(){
      cbs.removeAttr('checked');
      $(this).prop('checked',true);
    });

    $('a[name=user_id]').addClass( "btn btn-default" ).html('Change Password');


});
