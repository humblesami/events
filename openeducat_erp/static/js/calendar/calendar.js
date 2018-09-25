

$(function(){
    var str = $('span[name="sessions"]').html();
//    var classes = $('span[name="classes"]').html();
//    classes=JSON.parse(classes);
    var events = JSON.parse(str);
   // console.log('events are here',events["1"])

//    $.each(classes, function() {
//         $('#dropdown').append($("<option />").val(this.id).text(this.title));
//        });

function showCalendar(e)
{
    $('#calendar').fullCalendar({


        header: {
            left: 'prevYear,prev,next,nextYear, today',
            center: 'title',
            right: 'year,month,basicWeek,basicDay'
        },

        //defaultDate: '2018-03-12',
        navLinks: true, // can click day/week names to navigate views
        yearColumns: 3,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: e
    });
}

showCalendar(events);

//var i =$('#dropdown').val();
//if(i){
//    console.log(i);
//    console.log(events[i]);
//    showCalendar(events[i]);
//}
//else{
//    showCalendar([]);
//}

$('span[name="sessions"]').on('DOMSubtreeModified', function() {
//  alert( this.value );
//    console.log(new Date());
  str = $('span[name="sessions"]').html();
  if(str){
    events = JSON.parse(str);
    $('#calendar').fullCalendar('removeEvents')
  $('#calendar').fullCalendar('addEventSource',events)
  }


});


    if(!odoo['openedu_calendar_js'])
    {
        odoo['openedu_calendar_js'] = 1;
        $(document).on("click",".fc-event-container", function(e){
            var id = $(this).find('.fc-title').attr("id");
            id=parseInt(id)
            console.log('value of id',id)

            //console.log($('.session_id span'))
            var spans = $('.session_id span');
            $.each(spans, function() {
                //console.log($(this).text())
                var t = $(this).text();
                t=parseInt(t)
                if(id==t){
                    console.log(t)
                    $(this).click();
                }
            });
//            $('.session_id:contains('+id+')').click();


        });
    }





});
