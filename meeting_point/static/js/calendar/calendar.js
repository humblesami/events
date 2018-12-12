

$(function(){
    var str = $('span[name="public_event"]').html();
    var events = JSON.parse(str);
    $('#calendar').fullCalendar({

        header: {
            left: 'prevYear,prev,next,nextYear, today',
            center: 'title',
            right: 'month,basicWeek,basicDay,year'
        },

        //defaultDate: '2018-03-12',
        navLinks: true, // can click day/week names to navigate views
        yearColumns: 3,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: events
    });



    if(!odoo['meeting_point_calendar_js'])
    {
//    console.log('events',)
        odoo['meeting_point_calendar_js'] = 1;
        $(document).on("click",".fc-event", function(e){
//            console.log('here the click',e,events)
            var id = $(this).find('.fc-title').text();
//            console.log('value of id',id)
            data = 0
            for(val in events){
//            console.log(events[val].id,'11')
//            a = events[val].title
//            b = id
//            console.log('value of a ',a)
//            console.log('value of b',b)
//            console.log('result',a==b)
            if(events[val].title === id ){
                data = events[val].id
               }
            }
            $('.pblic_evnt_id:contains('+data+')').click();


        });
    }
});

//   customButtons: {
//        add_event: {
//            text: 'Year View',
//            click: function() {
//                  var calendar = $("#calendar").calendar(
//				{
//					tmpl_path: "/meeting_point/static/tmpls/",
//					events_source: function () { return []; }
//				});
//
//            }
//        }
//    },