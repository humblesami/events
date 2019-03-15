

$(function(){
    var str = $('span[name="sessions"]').html();
    var events = JSON.parse(str);


function showCalendar(e)
{
    $('#calendar').fullCalendar({


        header: {
            left: 'prevYear,prev,next,nextYear, today',
            center: 'title',
            right: 'year,month,basicWeek,basicDay'
        },

        //defaultDatemeeting_point_kanban: '2018-03-12',
        navLinks: true, // can click day/week names to navigate views
        yearColumns: 3,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: e
    });
}
$('.o_form_buttons_edit ul.nav-tabs').remove();
$('.o_form_buttons_edit').append($('ul.nav-tabs'));

//$('.o_breadcrumb_full .nav-tabs').remove();
//$('.o_breadcrumb_full').append($('ul.nav-tabs'));


showCalendar(events);

$('span[name="sessions"]').on('DOMSubtreeModified', function() {
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
                var t = $(this).text();
                t=parseInt(t)
                if(id==t){
                    console.log(t)
                    $(this).click();
                }
            });


        });


//          $(document).on('click', '.o_menu_sections a', function(){
//
//                $('.modal-footer:last .btn-primary').click();
//                  });


    }
     setTimeout(function()
    {
            $('div[name="click"] input:last').click();
            setTimeout(function() {
                    $('div[name="click"] input:last').click();
                                  }, 1000);
    }, 50);


});
