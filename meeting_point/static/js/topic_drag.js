$(function(){
    var table = $(this).find('.meetingtopic_tree table');
    table.children('tbody').find('.o_data_row td:nth-child(3)').attr('colspan',3);
    table.children('thead').find('th:nth-child(3)').attr('colspan',3);
    $('.mtopic_tree>.o_form_sheet').mouseenter(function(){
        table = $(this).find('.meetingtopic_tree table');
        if(!table.hasClass('tempoo'))
        {
            table.addClass('tempoo');
            table.children('tbody').find('.o_data_row td:nth-child(3)').attr('colspan',3);
            table.children('thead').find('th:nth-child(3)').attr('colspan',3);
            $('.meetingtopic_tree tbody').sortable();
            $('.meetingtopic_tree tr').mousedown(tr_mousedown);
            $('.meetingtopic_tree tr').mouseup(tr_mouseup);
        }
    });

    var before_index = 0;
    var after_index = 0;
    var might_drag = false;
    function tr_mousedown(ev){
        var target = $(ev.target);
        if(target.is('td'))
        {
            if(!target.parent().hasClass('o_data_row'))
            {
              ev.preventDefault();
              ev.stopPropagation();
            }
            else
            {
                might_drag = true;
                $(this).addClass('being_dragged');
                before_index = $(this).index();
            }
        }
    }

    function tr_mouseup(e){
        if(!might_drag)
            return;
        might_drag = false;
        var tr = $(this);
        setTimeout(function(){
            var tbody = tr.parent();
            var prev_row = tr.prev();
            if(prev_row.length != 0)
            {
                if(!prev_row.hasClass('o_data_row'))
                {
                    last_data_row = tbody.children('.o_data_row:not(.being_dragged)').last();
                    if(last_data_row.length == 0)
                        tbody.prepend(tr);
                    else
                        last_data_row.after(tr);
                }
            }
            tbody.children('.being_dragged').removeClass('being_dragged');
            after_index = tr.index();
            if(before_index != after_index)
            {
                var data = [];
                tbody.children('.o_data_row').each(function(i,el){
                    $(el).children().eq(3).html(i)
//                    var topic_id = $(el).children().eq(4).html();
//                    if(!topic_id)
//                        topic_id = -1;
//                    data.push({id : topic_id, priority : i})
                });
//                console.log(data);
//                data = { data: JSON.stringify(data) };
//                console.log(data);
//                dn_json_rpc('meeting_point/topic_priority',data,function(dat){
//                    console.log(dat);
//                });
            }
        }, 20);
    }
});