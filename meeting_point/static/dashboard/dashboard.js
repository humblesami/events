if(!odoo.meeting_point_dashboard_js)	
{
	odoo['meeting_point_dashboard_js'] = 1;
	odoo.define('meeting_point_dashboard', function (require) {
				var baseUrl = window.location.origin +"";
		function prepareDashborad(responseFromServer) {
			try{ responseFromServer = JSON.parse(responseFromServer);  } catch(er){ }			
			data = responseFromServer.data;
			console.log(data);

			data.counts = { meetingCount: data.meetings.length, surveyCount: data.surveydata.names.length, directorCount: data.directorProfiles.length }
			CheckObj(data.meetings);

			$("#tb1").html(tag);
			$('#meetingCount .title').text(data.counts.meetingCount);
			$('#surveyCount .title').text(data.counts.surveyCount);
			$('#directorCount .title').text(data.counts.directorCount);
			$('#userCount .title').text(data.directorProfiles.length);
			
			var tag = '';
			function CheckObj(inst) {
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
			var temp = "";
			var y = 0;
			for (var p = 0; p < data.directorProfiles.length; p++) {
				y++;
				var val = data.directorProfiles[p];
				temp += "<div class='col-lg-3 col-md-6 col-sm-6' id='dectorProfile'>";
				temp += "<div class='card card-stats'>";
				temp += "<div class='card-header' data-background-color='orange'>";
				if(!val.image)
				    val.image = baseUrl+'/web/image?model=res.users&field=image_small&id=1';
				else
				    val.image = 'data:image/png;base64,'+val.image;
				temp += "<i class='material-icons'><img src="+val.image+"/></i></div>";
				temp += "<div class='card-content'>";
				temp += "<h3 class='title'>" + val.name + "</h3></div>";
				temp += "<div class='card-footer'><div class='stats'>";
				temp += "<p>" + val.company + "</p>";
				temp += "<p>" + val.location + "</p>";
				temp += "</div></div></div></div>";
			}

			$('#profilesAppend').html(temp);

			var dataDailySalesChart = {
				labels: data.surveydata.names,
				series: [
				data.surveydata.responses
				]
			};

			var optionsDailySalesChart = {
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

		$.ajax({url:baseUrl+'/meeting_point/dashboard', success:

		    function(){
		        try
		        {
		            prepareDashborad(data);
		        }
		        catch(er)
		        {
		            console.log(er);
		        }
		    }

		});
	});
}