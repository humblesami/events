$(function () {

    var tag = "";

    var data = {
        "meetings":
        [{
            "subject": "meet1",
            "sdate": "1",
            "edate": "1",
            "attendee": "1",
            "location": "1",
            "duration": "1"
        },
        {
            "subject": "meet2",
            "sdate": "2",
            "edate": "2",
            "attendee": "2",
            "location": "2",
            "duration": "2"
        },
        {
            "subject": "meet2",
            "sdate": "3",
            "edate": "3",
            "attendee": "3",
            "location": "3",
            "duration": "3"
        }],
        "counts": { "directorCount": "2", "meetingCount": "4", "surveyCount": "23" },
        "directorProfiles": [
        {
            "name": "Waleed",
            "location": "Lahore",
            "company": "Digitalnet"
        },
        {
            "name": "Asfand",
            "location": "Peshawar",
            "company": "Digitalnet2"
        },
        {
            "name": "Faizan",
            "location": "Karachi",
            "company": "Digitalnet3"
        }
        ,
        {
            "name": "Faizan",
            "location": "Karachi",
            "company": "Digitalnet3"
        }
        ,
        {
            "name": "Faizan",
            "location": "Karachi",
            "company": "Digitalnet3"
        }],
        "surveydata": { "names": ["Survey 1", "Survey 2", "Survey 3", "Survey 4", "Survey 5", "Survey 6", ], "responses": [2, 11, 3, 11, 10, 5] },
        "surveysPerMonth": { "months": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "counts": [23, 14, 44, 51, 11, 3, 4, 11, 53, 22, 12, 8] }
    };
    

    

    //prepareDashborad(data);
	//console.log(data);

    function prepareDashborad(responseFromServer) {
		try{ responseFromServer = JSON.parse(responseFromServer);  } catch(er){ }

		data = responseFromServer.data;

        data.counts = { meetingCount: data.meetings.length, surveyCount: data.surveydata.names.length, directorCount: data.directorProfiles.length }
        CheckObj(data.meetings);

        $("#tb1").html(tag);
        $('#meetingCount .title').text(data.counts.meetingCount);
        $('#surveyCount .title').text(data.counts.surveyCount);
        $('#directorCount .title').text(data.counts.directorCount);
        $('#userCount .title').text(data.directorProfiles.length);

        function CheckObj(inst) {
            trm = 0;
            //tag += "<table class='t'><thead><tr class='t'>";

            if (typeof inst == "object") {

                if ($.isArray(inst)) {
                    for (var i1 = 0; i1 < inst.length; i1++) {
                        tag += "<tr>";
                        CheckObj(inst[i1]);
                        tag += "</tr>";
                    }
                }
                else {

                    for (var b in inst) {
                        CheckObj(inst[b]);
                    }

                }
            }
            else {
                tag += "<td class='t'>" + inst + "</td>";
            }
        }
        temp = "";
        var y = 0;
        for (var p = 0; p < data.directorProfiles.length; p++) {
            y++;
            var val = data.directorProfiles[p];
            temp += "<div class='col-lg-3 col-md-6 col-sm-6' id='dectorProfile'>"
            temp += "<div class='card card-stats'>"
            temp += "<div class='card-header' data-background-color='orange'>"
            temp += "<i class='material-icons'><img src='' /></i></div>"
            temp += "<div class='card-content'>"
            temp += "<h3 class='title'>" + val.name + "</h3></div>"
            temp += "<div class='card-footer'><div class='stats'>"
            temp += "<p>" + val.company + "</p>"
            temp += "<p>" + val.location + "</p>"
            temp += "</div></div></div></div>"
        }

        $('#profilesAppend').html(temp);

        dataDailySalesChart = {
            labels: data.surveydata.names,
            series: [
            data.surveydata.responses
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        }

        var dataEmailsSubscriptionChart = {
            labels: data.surveysPerMonth.months,
            series: [
            data.surveysPerMonth.counts
            ]
        };
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 100,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
            }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];

        
        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        md.startAnimationForLineChart(dailySalesChart);

        var emailsSubscriptionChart = Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);
        //start animation for the Emails Subscription Chart
        md.startAnimationForBarChart(emailsSubscriptionChart);
    }
	var baseUrl = window.location.origin +"";
	console.log(baseUrl)
	$.ajax({url:baseUrl + 'meeting_point/dashboard', success: prepareDashborad});
});