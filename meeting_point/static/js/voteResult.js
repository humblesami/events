console.log(312)
window.onload = function(){
//var chart = new CanvasJS.Chart("chartContainer", {
//	animationEnabled: true,
//	theme: "light2", // "light1", "light2", "dark1", "dark2"
//	title:{
//		text: "Approval"
//	},
//	axisY: {
//		title: "Responses"
//	},
//	data: [{
//		type: "column",
//		showInLegend: true,
//		legendMarkerColor: "grey",
//		dataPoints: [
//			{ y: 5, label: "Accept" },
//			{ y: 2,  label: "Reject" },
//					]
//	}]
//});
//console.log('char value',chart)
//chart.render();
var options = {
	animationEnabled: true,
	title: {
		text: "Voting Result"
	},
	axisY: {
		title: "Vote",


	},
	axisX: {
		title: "Vote"
	},
	data: [{
		type: "column",
		yValueFormatString: "#,##0.0#"%"",
		dataPoints: [
			{ label: "Accept", y: 1 },
			{ label: "Reject", y: 1 },

		]
	}]
};
console.log('label',options)
$("#chartContainer").CanvasJSChart(options);

};




