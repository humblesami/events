$('#loaderContainerajax').show();
setTimeout(function(){
$(function(){
    var str = $('span[name="public_event"]').html();
    var events = JSON.parse(str);
    $('#calendar').fullCalendar({

        header: {
            left: 'year,month,agendaWeek,agendaDay',
            center: 'title',
            right: 'prev,next, today'
        },
          views: {
    agendaFourDay: {
      type: 'agenda',
      duration: { days: 4 },
      buttonText: 'Schedule'
    }
  },
        //defaultDate: '2018-03-12',
        navLinks: true, // can click day/week names to navigate views
        yearColumns: 3,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: events
    });

    if ($('.fc-schedule-button').length == 0) {



        function hour_minutes(dt) {
            if (typeof (dt) == "string")
                dt = new Date(dt);
            var hour = dt.getHours()+5;
            var minut = dt.getMinutes();
            if (minut < 10) {
                minut = '0' + minut;
            }
            return hour + ':' + minut;
}


        var str = $('span[name="public_event"]').html();
        var events = JSON.parse(str);



        var schedule = '<div class="container-fluid schedule-container schedule-wrap">';
        for (var i = 0; i < events.length; i++) {
                if (events[i].attendee) {
                   var parts = events[i].datestart .split('-')
                   var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
                   parts = mydate.toDateString()
                   parts = parts.split(' ')
                   dateValue = parts[1] + ' '+parts[2]+ ',' + parts[3]
                schedule += '<div event_id='+events[i].id+' class="scheduleDetailOpener row fc-event">';
                schedule += '<div class="col"> <span>' + dateValue + '</span></div>';
                schedule += '<div class="col">'+ hour_minutes(new Date(events[i].startSchedule)) + ' - ' + hour_minutes(new Date(events[i].endSchedule)) + '</div>';
                schedule += '<div class="col fc-title">' + events[i].title + '</div>';
                schedule += '</div>'
            }
        }
        schedule += '</div>';
//        schedule = $(schedule);
//        schedule.find('.scheduleDetailOpener').click(scheduleDetails);
        var btn = $('<button type="button" class="fc-schedule-button fc-button fc-state-default fc-corner-right">Schedule</button>')
        $('.fc-button-group:first').append(btn);

        btn.click(function showSchedule() {
            $('.schedule-container').show();
            $('.fc-view-container').empty().html(schedule);
            $('.fc-prev-button').hide();
            $('.fc-next-button').hide();
            $('.fc-center').hide();
            $('.fc-today-button').hide();
            $('.fc-state-active').removeClass('fc-state-active');
            btn.addClass('fc-state-active');
        });
    }


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
$('#loaderContainerajax').hide();
},100)

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