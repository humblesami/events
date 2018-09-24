$(function(){
    $('body').append('<link rel="stylesheet" href="/doc_viewer/static/video.css" />');
});
odoo.define('doc_viewer.doc', function(require) {
    "use strict";

    var field_registry = require('web.field_registry');
    var AbstractField = require('web.AbstractField');
    var rpc = require('web.rpc');

    var FieldColorPicker = AbstractField.extend({
        template: 'doc_video',
        _renderReadonly: function () {
            var widgetObject = this;
            displayHomeNews(widgetObject, rpc);
        },
    });
	field_registry.add('doc_video', FieldColorPicker);
	return {'doc_video': FieldColorPicker};
});

function displayHomeNews(widgetObject, rpc)
{
    var $widgetElement = widgetObject.$el;
    var isDoc = false, isVideo=false;
    var docIds = [];
    var args = [];
    if(widgetObject.name == 'doc_ids')
    {
        docIds = widgetObject.record.data.doc_ids.res_ids;
        args = [docIds,['name','path']]
        isDoc = true;
    }
    else if(widgetObject.name == 'video_ids')
    {
        docIds = widgetObject.record.data.video_ids.res_ids;
        args = [docIds,['name','url']]
        isVideo = true;
    }
    else
    {
        console.log("No video no doc", widgetObject.name);
        return;
    }
    if(docIds.length == 0)
        return;

var model_name = widgetObject.field.relation;
    rpc.query({
          model: model_name,
          method: 'read',
          args: args
    }).then(function(responseFromServer) {
        var docsContainer = $('<div class="docs_container"/>');
        var videosContainer = $('<div class="videos_container"/>');
        for(var i in responseFromServer)
        {
            var elHtml = '';
            if(isVideo)
            {
                var videoUrl = responseFromServer[i].url;
                videoUrl = videoUrl.replace("watch?v=","embed/");
                videoUrl = "'"+ videoUrl + "'";
                var elHtml = '<div class="thumbnail"><label class="docname"></label>';
                elHtml += '<iframe class="docThumbnail" frameborder=0 src=' + videoUrl + '></iframe>';
                elHtml += '<div class="videoOverLayWrapper" url="' + videoUrl + '"  onclick="doc_preview.video('+videoUrl+')">';
                elHtml += '</div></div>';
                if(i == 0)
                    $widgetElement.html('<h2>Videos</h2>').append(videosContainer);
                videosContainer.append(elHtml);
            }
            else if(isDoc)
            {
                var thumbnailUrl = '/meeting_point/static/img/document.png';
                var docUrl = responseFromServer[i].path;
                docUrl = "'"+ docUrl + "'";
                docUrl = "'/web/content?model=" + model_name + "&field=pdf_doc&id=" + responseFromServer[i].id+"'";
                var elHtml = '<div class="thumbnail" url=' + docUrl + ' onclick="doc_preview.doc('+docUrl+')">';
                elHtml += ' <label class="docname"></label><img src="' + thumbnailUrl + '" class="docThumbnail" " />';
                elHtml += '</div>';
                if(i == 0)
                    $widgetElement.html('<h2>Documents</h2>').append(docsContainer);
                docsContainer.append(elHtml);
            }
        }
    });
}
