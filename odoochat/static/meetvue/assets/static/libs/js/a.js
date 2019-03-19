buildSkeleton: function(monthsPerRow, showNumbers) {
    var i, n, y, h = 0, monthsRow = 0;
    var miYear = this.intervalStart.year();
    var year_calendar_str, headerClass = this.tm + "-widget-header";
    var weekNames = [];

    this.rowCnt = 0;
    // init days based on 2013-12 (1st is Sunday)
    for (n=0; n<7; n++) {
        weekNames[n] = fc.moment([2013,11,1+n]).locale(this.lang).format('ddd');
    }
    year_calendar_str = '<div class="fc-year-main-table fc-border-separate" style="width:100%;">';
    year_calendar_str += '<div class="row">';
    year_calendar_str += '<div class="td fc-year-month-border fc-first"></div>';
    for (n=0; n < this.nbMonths; n++) {

        var m = (this.intervalStart.month() + n);
        var hiddenMonth = ($.inArray((m % 12), this.hiddenMonths) != -1);
        var display = (hiddenMonth ? 'display:none;' : '');
        var di = fc.moment([miYear+(m / 12),(m % 12),1]).locale(this.lang);
        var monthName = capitaliseFirstLetter(di.format('MMMM'));
        var monthID = di.format('YYYYMM');
        y = di.year();
        if (this.firstMonth + this.nbMonths > 12) {
            monthName = monthName + ' ' + y;
        }

        // new month line
        if ((n%monthsPerRow)===0 && n > 0 && !hiddenMonth) {
            monthsRow++;
            year_calendar_str +='<div class="td fc-year-month-border fc-last"></div>';
            year_calendar_str += '</div>';
            year_calendar_str += '<div class="row">';
            year_calendar_str += '<div class="td fc-year-month-border fc-first"></div>';
        }

        // if ((n%monthsPerRow) < monthsPerRow && (n%monthsPerRow) > 0 && !hiddenMonth) {
        //     year_calendar_str +='<div class="td fc-year-month-separator"></div>';
        // }

        year_calendar_str +='<div class="td fc-year-monthly-td" style="' + display + '">';

        year_calendar_str +='<div class="fc-year-monthly-name'+(monthsRow===0 ? ' fc-first' : '')+'">' +'<a name="'+monthID+'" data-year="'+y+'" data-month="'+m+'" href="#">' + htmlEscape(monthName) + '</a>' +'</div>';

        year_calendar_str +='<div class="fc-row '+headerClass+'">';

        year_calendar_str +='<div class="fc-year-month-header thead">';
        year_calendar_str += '<div class="fc-year-week-days umair-year">';

        year_calendar_str += this.headIntroHtml();

        for (i = this.firstDay; i < (this.colCnt+this.firstDay); i++) {
            year_calendar_str += '<div class="td fc-day-header fc-year-weekly-head fc-'+dayIDs[i%7]+' '+headerClass+'">'+ weekNames[i%7] + '</div>';
        }

        year_calendar_str += '</div><div>' +'</div></div>'; // fc-year-month-header
        year_calendar_str += '</div>'; // fc-row
        
        year_calendar_str += '<div class="fc-day-grid-container">';
        year_calendar_str += '<div class="fc-day-grid">';
        year_calendar_str += '</div>';
        year_calendar_str += '</div>'; // fc-day-grid fc-day-grid-container

        //year_calendar_str += '<div class="fc-year-monthly-footer"></div>';

        year_calendar_str += '</div>'; // fc-year-monthly-td

        if (hiddenMonth) {
            h++;
        }
    }
    year_calendar_str += '<div class="td fc-year-month-border fc-last"></div>';
    year_calendar_str += '</div>';
    year_calendar_str += '</div>';

    this.table = $(year_calendar_str).appendTo(this.el);

    this.bodyRows = this.table.find('.fc-day-grid .fc-week');
    this.bodyCells = this.bodyRows.find('td.fc-day');
    this.bodyFirstCells = this.bodyCells.filter(':first-child');

    this.subTables = this.table.find('.td.fc-year-monthly-td');

    this.head = this.table.find('thead');
    this.head.find('.row.fc-year-week-days th.fc-year-weekly-head:first').addClass('fc-first');
    this.head.find('.row.fc-year-week-days th.fc-year-weekly-head:last').addClass('fc-last');

    this.table.find('.fc-year-monthly-name a').click(this.calendar, function(ev) {
        ev.data.changeView('month');
        ev.data.gotoDate([$(this).attr('data-year'), $(this).attr('data-month'), 1]);
    });

    this.dayBind(this.bodyCells);
    this.daySegmentContainer = $('<div style="position:absolute;z-index:8;top:0;left:0;"/>').appendTo(this.table);
}