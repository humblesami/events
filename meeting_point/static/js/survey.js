odoo.define('custom.survey', function(require){
    if(!odoo.custom_survey)
    {
        odoo.custom_survey = 1;
        require('web.dom_ready');
        $('body').append('<script src="/meeting_point/static/js/survey_debug.js" />');
    }
    else
    {

    }
});
