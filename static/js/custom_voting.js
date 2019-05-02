$(function(){  
    var option_id   , option_name;
    var sign_data;
    function get_results(options_id, option_name, sign_data){
        var pathName = window.location.pathname;
        if (pathName.indexOf('admin') != -1){
            pathName = pathName.replace('admin/voting/voting','voting');
            pathName = pathName.replace('/change/','');
        }
        var options = {
            url : pathName + '/answer',
            data : {
                answer_id: options_id,
                signature_data: sign_data
            },
            success:function(data){
                // console.log(data);
                if (!(option_name)){
                    $('.fa-check').remove();
//                    var obj = {};
//                    try{
//                        obj = JSON.parse(data);
//                    }
//                    catch(er){
//                        console.log(er);
//                        return;
//                    }
                    var obj = JSON.parse(data);
                    $('.' + obj.answer).prepend('<i class="fa fa-check fa-lg" style="color:white"/>');
                    if(obj.signature_data)
                    {
                        window['sign_data'] = obj.signature_data;
                        img_src ='data:image/png;base64,' + obj.signature_data;
                    }
                    if($('[name=signature_required]').prop('checked') && window['sign_data'])
                    {
                        $('.voting-options-container').append('<div><img src="'+img_src+'" class="user-sign" height="150px" width="150px" /></div>')
                    }
                    else
                    {
                        $('.user-sign').hide();
                        
                    }

                }
                else
                {
                    $('.fa-check').remove()
                    $('.' + option_name).prepend('<i class="fa fa-check fa-lg" style="color:white"/>');
                    // $('.voting-options-container').hide();                    
                    window.location = '';
                }

                if(obj.chart_data)
                {
                    drawChart(obj.chart_data);
                }

            }
        }
        $.ajax(options);
    }
    get_results();
    topicsOfMeeting('topic');
    votingResults();
    checkUserSignature();


    $("button").click(function(e)
    {
        option_buttn = $(this).attr('data-id');
        if (!option_buttn)
        {
            return;
        }
        e.preventDefault();
        option_id = $(this).attr('data-id');
        option_name = $(this).text();
        var pathName = window.location.pathname;
        if (pathName.indexOf('admin') != -1){
            pathName = pathName.replace('admin/voting/voting','voting');
            pathName = pathName.replace('/change/','');
            pathName += '/signature'
        }
        config={
            url: pathName,
            fieldName: 'signature_data',
            save_now: false,
            signature: window['sign_data'],
            callBack: function(data){
                $('.fa-check').remove()
                console.log(data);
                get_results(option_id, option_name, data);
            }
        }
        if($('[name=signature_required]').prop('checked'))
        {
            init_sign(config)
            $('#signModal').modal('show');        
            return;
        }
        else
        {
            $('.user-sign').hide();
            $('.fa-check').remove()
            get_results(option_id, option_name, '');
        }
        
        option_id = $(this).attr('data-id');
        option_name = $(this).text();
        if (!($(this).hasClass('public-visibility')))
        {
            if($('[name=signature-required]').length > 0)
            {
                let result = confirm('Signature is required...');
                if (result)
                {
                    $('.fa-check').remove();
                    
                    get_results(option_id, option_name);        
                }
            }
            else
            {   
                $('.fa-check').remove();
                get_results(option_id, option_name);
            }
        }
    });


    $('[name=meeting]').change(function(){
        
        meeting_id =$(this).val();
        if(meeting_id)
        {           
            getTopics(meeting_id);
        }
    });

    $('[name=signature_required]').change(function(){
        checkUserSignature();
    });

    $('[name=public_visibility]').change(function(){
        votingResults();
    });

    function topicsOfMeeting(name)
    {
        meeting_id = $('[name=meeting]').val();
        if(meeting_id)
        {
            getTopics(meeting_id)
        }
        else
        {
            removeOption('topic');
        }
    }

    function getTopics(meeting_id)
    {
        var baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
            pathName = baseUrl +'/voting/'+meeting_id+'/topic';
            console.log(pathName);
            var options = {
                url : pathName,
                data : {
                    meeting_id: meeting_id,
                },
                success:function(data){
                    let obj = JSON.parse(data);
                    removeOption('topic')
                    const TOPIC_EL = $('[name=topic]');
                    for(let i = 0; i < obj['topics'].length; i++)
                    {
                        TOPIC_EL.append('<option value='+obj['topics'][i].id+'>'+obj['topics'][i].name+'</option>');
                    }
                }
            }
            $.ajax(options);
    }

    function votingResults()
    {        
        const VOTING_RESULTS = $('.voting-results-container');
        if (VOTING_RESULTS)
        {
            let public_visibility = $('[name=public_visibility]').prop('checked');
            if(public_visibility)
            {
                VOTING_RESULTS.show();
            }
            else
            {
                VOTING_RESULTS.hide();
            }

        }
    }

    function removeOption(name)
    {
        const TOPIC_SELECT = $('[name=topic]');
        TOPIC_SELECT.find('option').remove();
        TOPIC_SELECT.append('<option value>---------</option>');
    }

    function checkUserSignature()
    {
        let signature_required = $('[name=signature_required]').prop('checked');
        userSignatureIMGVisibility(signature_required);
    }
    

    function userSignatureIMGVisibility(signature_required)
    {
        const IMG_EL = $('.user-sign');
        if (IMG_EL.length < 1)
        {
            return;
        }
        if(signature_required)
        {
            IMG_EL.show();
        }
        else
        {
            IMG_EL.hide();
        }
    }


    function drawChart(chartData)
    {
        let labels = [];
        let data = [];
        for(let i = 0; i < chartData.length; i++)
        {
            labels.push(chartData[i]['option_name']);
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
        var ctx = document.getElementById('myChart').getContext('2d');
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            backgroundColor: 'rgb(255, 99, 132)',
            data: chartData
        });
    }

    

})