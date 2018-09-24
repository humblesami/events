$(function()
{
    var kanban_record = $('.o_view_manager_content .o_kanban_record:not(.loaded):first');
    kanban_record.addClass('loaded');
    //console.clear();
    //console.log($('.o_kanban_record.loaded').length);
    if($('.o_kanban_record.loaded').length == 1)
    {
        $('.o_kanban_record.loaded').parent().addClass('committees-container');
        $('.committees-container').prepend('<link rel="stylesheet" href="/meeting_point/static/css/committee.css" />');
    }
    var committee_id = kanban_record.find('.committee_id span').first().html();
    if(!committee_id)
    {
        console.log("Sorry");
        return;
    }
    var req_url = '/meeting_point/get_committee/'+committee_id;
    try
    {
        dn_json_rpc_object.showLoader = false;
        dn_json_rpc(req_url, {}, function(data) {

            var image_url = dn_base_web_url + '/web/image?model=meeting_point.users&field=image_medium&id=';
            var members_html = '';
            data.forEach(function(member, i)
            {
                members_html += '<div class="member" style="background-image:url('+image_url+member.id+')"></div>';
            });
            kanban_record.append('<div class="members">'+members_html+'</div>');
            dn_json_rpc_object.showLoader = true;
        });
    }
    catch(er)
    {
        console.log(er);
    }
});