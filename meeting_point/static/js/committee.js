$(function(){
    var req_url = '/meeting_point/get_committees';
    try
    {
        dn_json_rpc(req_url, {}, function(data) {
            console.log(data);
            var html = '<div class="o_kanban_view o_kanban_ungrouped">';
            var image_url = dn_base_web_url + '/web/image?model=meeting_point.users&field=image_medium&id=';
            data.forEach(function(committee, i)
            {
                var record_html = '<div class="o_kanban_record">';
                record_html += '<h2>c1</h2>';
                record_html += '<div class="members">';
                committee.members.forEach(function(member, j)
                {
                    record_html += '<img src="'+image_url+member.id+'" alt="NA" title="'+member.name+'"/>';
                });
                record_html += '</div>';
                html += record_html;
            });
            html += '</div>';
            $('.committees-container').html(html);
        });
    }
    catch(er)
    {
        console.log(er);
    }
});