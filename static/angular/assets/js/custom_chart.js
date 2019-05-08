(function(){
    function drawChart(chartData, canvas_selector)
    {
        let labels = [];
        let data = [];
        let total_votings = 0
        for(let i = 0; i < chartData.length; i++)
        {
            total_votings += chartData[i]['option_result']
        }
        for(let i = 0; i < chartData.length; i++)
        {
            labels.push(chartData[i]['option_name'] + 
            ' ('+chartData[i]['option_result']+' - '+(chartData[i]['option_result']/total_votings*100).toFixed(2)+'%)');
            data.push(chartData[i]['option_result']);
        }
        
        chartData = {
            datasets: [{
                data: data,
                backgroundColor: [
                    'red',
                    'green',
                    'blue',
                ],
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: labels
        };
        var ctx = $(canvas_selector)[0].getContext('2d');
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            backgroundColor: 'rgb(255, 99, 132)',
            data: chartData
        });
    }
    window['drawChart'] = drawChart;
})()