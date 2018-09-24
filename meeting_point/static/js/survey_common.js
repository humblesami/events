$(function(){
	$(document).on('change','select.survey_type',function(){
		if(this.selectedIndex == 0)
			$('.o_notebook.survey_questions').hide();
		else
			$('.o_notebook.survey_questions').show();
	});

	var surveyTypeDropDown = $('select.survey_type');
	if(surveyTypeDropDown.length > 0 && surveyTypeDropDown.children().length>1)
		surveyTypeDropDown[0].selectedIndex = 1;
	setTimeout(function(){
	    surveyTypeDropDown.change();
        var seen = $('.survey_seen.o_hidden:first').html();
        if(seen != 1)
        {
            var res_id = $('.survey_id.o_hidden:first').html();
            if(res_id)
            {
                update_seen_by('survey.survey', res_id);
            }
        }
	}, 500);
});