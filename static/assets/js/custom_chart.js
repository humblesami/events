(function(){
    window['chart_colors'] = [
        'Red',
        'Green',
        'Purple',
        'HotPink',
        'DodgerBlue',
        'Yellow',
        'Orange'
    ];
    function drawChart(chartData, canvas_selector)
    {
        // console.log($(canvas_selector).length, canvas_selector);
        let labels = [];
        let data = [];
        let total_votings = 0;
        let chart_type = '';
        for(let i = 0; i < chartData.length; i++)
        {
            total_votings += chartData[i]['option_result']
        }
        for(let i = 0; i < chartData.length; i++)
        {
            if (total_votings > 0)
            {
                labels.push(chartData[i]['option_name'] + 
                    ' ('+chartData[i]['option_result']+' - '+
                    (chartData[i]['option_result']/total_votings*100).toFixed(2)+'%)');
            }
            else{
                labels.push(chartData[i]['option_name'] + 
                ' ('+chartData[i]['option_result']+' - 0%)');
            }
            data.push(chartData[i]['option_result']);
        }
        if (canvas_selector == '#progress-chart'){
            chart_type = 'doughnut'
        }else{
            chart_type = 'pie'
        }

        chartData = {
            datasets: [{
                data: data,
                backgroundColor: window['chart_colors'],
                hoverBackgroundColor: window['chart_colors']
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: labels,
        };
        var ctx = $(canvas_selector)[0].getContext('2d');
        var myPieChart = new Chart(ctx, {
            type: chart_type,
            backgroundColor: 'rgb(255, 99, 132)',
            data: chartData,
            options: {
                aspectRatio: 1,
                legend: {
                    display: false
                },
                responsive: true,
            }
        });
    }
    window['drawChart'] = drawChart;
})()