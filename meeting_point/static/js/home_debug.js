$(function(){
    $('.slider_div .o_kanban_ungrouped').addClass('related-products');
    $('.related-products .o_kanban_record').addClass('item');
    $('.slider_div .o_kanban_ghost').remove();

    var main_container = $(".o_field_x2many_kanban[name='pending_documents']");
    var items = main_container.find('.owl-item');
    for (i in items)
    {
        var item = items.eq(i);
        var to_move = item.find(".oe_module_icon");
        var to_place = item.find(".oe_kanban_content");
        to_place.append(to_move);
    }

    $('.home_btns').children().click(function(){
        showRelatedTab($(this));
    });

    function showRelatedTab(el)
    {
        if(el && el.is('.btn-primary'))
        {
            console.log(585, el.index());
            return;
        }
        else
        {
            $('.mphome_wrapper').children().hide();
            if(el)
            {
                item_number = odoo.home_btn_active;
                $('.home_btns:first').children('.btn-primary:first').removeClass('btn-primary');
                item_number = el.index();
            }
            else if(!odoo.home_btn_active){
                el = $('.home_btns .btn:first');
                odoo.home_btn_active = 0;
                item_number = 0;
            }
            else
            {
                item_number = odoo.home_btn_active;
                el = $('.home_btns:first').children().eq(item_number);
            }
        }
        el.addClass('btn-primary');
        $('.mphome_wrapper').children().eq(item_number).show();
        odoo.home_btn_active = item_number;

        //to load calendar
        if(el.is('.calendar_btn'))
        {
            if(!odoo.home_page_calendar)
            {
                odoo.home_page_calendar = 1;
                $('body').append('<script src="/meeting_point/static/js/calendar/fullcalendar.js"></script>');
                $('body').append(' <link rel="stylesheet" href="/meeting_point/static/css/calendar.css"/>');
            }
            $('.o_form_view:first').append('<script src="/meeting_point/static/js/calendar/calendar.js"></script>');
        }
    }
    showRelatedTab();

    $('notification_icon.seen_not_seen').html('18');
//    $('.seen_by_me').each(function(i, el){
//        el = $(el.children[0]);
//        if(el.html() == "0")
//        {
//            //el.closest('.o_kanban_record').css('border','2px solid #9c4784');
//        }
//        else
//        {
//            el.closest('.o_kanban_record').css('border','none');
//        }
//    });
    $('.survey_kanban_reocord').click(function(){
        $(this).css('border','none');
    });
    $('.fa.oe_kanban_action').click(function(){
        $(this).closest('.o_kanban_record').css('border','none');
    });

//    var meeting_records = $('div[name="pending_meetings"]:first .o_kanban_record:not(.o_kanban_ghost)');
//    var surveys_to_do = $('div[name="pending_surveys"]:first .o_kanban_record:not(.o_kanban_ghost)').length;
//    var documents_to_do = $('div[name="pending_documents"]:first .o_kanban_record:not(.o_kanban_ghost)').length;
//    var meetings_to_do = 0;
//
//    meeting_records.each(function(i, el){
//        if($(el).find('.acceptancebuttonsactive').length == 0)
//        {
//            $(el).addClass('waiting_response').prepend('<span class="needs_action"></span>');
//            meetings_to_do++;
//        }
//    });
    var to_do_count = $('.to_do_items_count_server').html();

    if(to_do_count>0)
    {
        $('.seen_not_seen').html(to_do_count).css('display', 'block');
    }

    $('.HeadLogo .img-responsive').css('cursor','pointer').click(function(ev)
    {
        ev.preventDefault();
        ev.stopPropagation();
        window.open(this.src);
    });


    var owlOptions = {
        navigation: true,
        pagination: false,
        autoPlay: 9000, //Set AutoPlay to 5 seconds
        navigationText: ['<i class="fa fa - chevron - left "/>', '<i class="fa fa - chevron - right "/>' ],
        slideSpeed: 600,
        items: 4,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [1190, 3],
        itemsTablet: [900, 2],
        itemsMobile: [585, 1]
    }
    $(".related-products").owlCarousel(owlOptions);
})