(function() {
    var annotation_user_m2;
    var annotation_mode = 0;
    var hand_drawings = [];
    var prev_doc_url = '';
    var shown_comment_type = false;
    var slected_comment_type = false;
    var comment_sub_type = false;
    var contextMenuShown = false;
    var comment_doc_id = false;
    var comment_item_focused = false;
    var select_comment_item = undefined;
    var activeAnnotationId = undefined;
    var activeAnnotationItem = undefined;
    var handleAnnotationBlur = undefined;
    var handleAnnotationClick = undefined;
    var activate_annotation = undefined;
    var mention_list = undefined;
    var handlePointAnnotationClick = undefined;
    var doc_loading_step = undefined;
    var documentId = undefined;
    var annot_save_timeout = undefined;
    var annotation_save_wait_time = 8000;
    var loadALlCommentsOnDocument = function() {
        console.log("Load comment not defined");
    }
    var saveAnnotationsAtServer = function() {
        console.log("Save annotation not defined");
    };
    var is_localhost = window.location.toString().indexOf('localhost:') > -1;

    var programtic_cursor = false;
    function select_cursor() {
        // window['functions'].get_trace(1);
        $('.topbar:first .active:not(.cursor)').removeClass('active');
        if (!$('.topbar:first .cursor:first').hasClass('active')) {
            programtic_cursor = true;
            $('.topbar:first .cursor:first').click();                        
        }        
    }

    $(document).on('click', '.topbar .cursor:first', function(e){
        if(programtic_cursor)
        {
            programtic_cursor = false;
            return;
        }
        console.log(isDocumentDirty(documentId), 555667);
        if (isDocumentDirty(documentId)) {
            saveAnnotationsAtServer();
        }
    });


    function getDocumentVersion(documentId) {
        var res = getCookieStrict(documentId, documentId + '/version');
        if (res != 0 && isNaN(res)) {            
            setCookieStrict(documentId, documentId + '/version', '0');
            res = 0;
            console.log('Set version by force');
        }
        return res;
    }

    function isDocumentDirty(documentId) {
        var res = getCookieStrict(documentId, documentId + '/dirty');
        if (res != 0 && isNaN(res)) {
            setCookieStrict(documentId, documentId + '/dirty', 0);
            console.log('Set dirty by force');
            res = 0;
        }
        return res;
    }

    function setDocDirty(documentId) {
        var document_dirty = isDocumentDirty(documentId);
        if (document_dirty != 1) {
            var document_version = getCookieStrict(documentId, documentId + '/version');
            document_version += 1;
            setCookieStrict(documentId, documentId + '/version', document_version)
            setCookieStrict(documentId, documentId + '/dirty', 1);
        }
    }

    function unSetDocDirty(documentId) {
        setCookieStrict(documentId, documentId + '/dirty', 0);
    }

    function setDocVersion(documentId, version) {
        setCookieStrict(documentId, documentId + '/version', version);
    }

    function getCookieStrict(documentId, key) {
        validate_key(documentId, key);
        var val = localStorage.getItem(key);
        if(key.endsWith('annotations'))
        {
            var a = 1;
        }
        if (!isNaN(val))
            val = parseFloat(val);
        return val;
    }

    function _getAnnotations(documentId) {
        var res = getCookieStrict(documentId, documentId + '/annotations');
        try{
            res = JSON.parse(res);
        }
        catch(er)
        {
            res = [];
        }
        return res;
    }

    function addAnnotationLocal(documentId, annotation, is_comment){                
        var current_annotations = _getAnnotations(documentId);
        var index = findAnnotationLocal(documentId, annotation.uuid);
        if(index == -1)
        {
            current_annotations.push(annotation);            
            updateAnnotations(documentId, current_annotations, 'op=add');
        }
        else{            
            alert('Invalid addrition');
            console.log("Invalid annot adding",  annotation, 444);
            console.trace();
        }
    }

    function updateAnnotations(documentId, annotations, operation){            
        try{            
            if(!Array.isArray(annotations)){
                console.log('Invalid annotations values', annotations);
                console.trace();
                return;
            }
            if(operation == 'comment_point_moved'){
                return;
            }
            
            var i = 0;
            var l1 = annotations.length;
            for(var i=0; i< l1; i++)
            {
                var j = 0;
                var l2 = annotations.length;
                for(var j=0; j < l2; j++)
                {
                    if(i != j)
                    {
                        if(annotations[i].uuid == annotations[j].uuid)
                        {
                            console.log('Invalid scene');
                            annotations.splice(j, 1);
                            j--;
                            l2--;
                            l1--;
                        }
                    }
                    j++;
                }
                i++;
            }
            var val = JSON.stringify(annotations);
            localStorage.setItem(documentId + '/annotations', val);
            setDocDirty(documentId);
            if(annot_save_timeout)
            {
                clearTimeout(annot_save_timeout);
            }
            annot_save_timeout = setTimeout(function(){
                saveAnnotationsAtServer();
            }, annotation_save_wait_time);            
        }
        catch(er){
            console.log(er, 'Invalid annotations', annotations);
        }
    }

    function findAnnotationLocal(documentId, annotationId){
        var index = -1;
        var annotations = _getAnnotations(documentId);
        var l = annotations.length;
        for (var i = 0; i < l; i++) {
            if (annotations[i].uuid === annotationId) {
                if(index == -1)
                {
                    index = i;
                }
                else{
                    console.log('More found');
                    annotations.splice(i, 1);
                    i -= 1;
                    l -= 1;
                }                
            }
        }
        return index;
    }    

    function setCookieStrict(documentId, key, val) {
        var temp_key = validate_key(documentId, key);
        if(key.endsWith('annotations'))
        {
            console.log('Invalid key to set in cookie');
            return;
        }
        localStorage.setItem(key, val);
    }

    function validate_key(documentId, key) {
        var keys = ['version', 'shown_comment_type', 'annotations', 'dirty', 'scale', 'rotate', 'pen/size', 'pen/color', 'text/size', 'text/color'];
        var temp_key = key.replace(documentId + '/', '');
        if (keys.indexOf(temp_key) == -1) {
            console.trace();
            bootbox.alert("Please report this issue2 with " + key + " for " + documentId);
        }
        return temp_key;
    }

    function supportsComments(target) {
        var type = target.getAttribute('data-pdf-annotate-type');
        return ['point'].indexOf(type) > -1;
    }

    var comments_wrapper; // = $('#comment-wrapper');
    function on_leave_document() {
        if (comments_wrapper && comments_wrapper.length > 0) {
            $('#annotated-doc-conatiner').hide();
            shown_comment_type = false;
            comments_wrapper.hide();
            $('.router-outlet').show();
            saveAnnotationsAtServer('Leaving');
        }
    }

    function move_to_point (point_id){
        let annot_id = $('div[db_id="'+point_id+'"]:first').attr('point_id');
        $('.toolbar:first .comment:not(.personal):first').click();
        $('#comment-wrapper .comment-list .groupcomment[annotationid="'+annot_id+'"]').click();
    }

    function process_notification_url(item_url){        
        var url_origin = window.location.origin.toString();        
        if(item_url.indexOf(url_origin) == -1)
        {
            if(!item_url.startsWith('/'))
            {
                item_url = '/' +item_url;
            }
            item_url = url_origin + item_url;
        }
        console.log(item_url);
        var arr = item_url.split('/');
        var third_last = undefined;        
        try{
            third_last = arr[arr.length - 3];
        } 
        catch(er){
            // console.log(er)
        }
        if(third_last != 'doc'){
            return;
        }
        var point_id = arr[arr.length -1];
        arr = arr.splice(0, arr.length - 1);
        var url_without_point = arr.join('/');
        
        var url_now = prev_doc_url;
        arr = url_now.split('/');
        arr = arr.splice(0, arr.length - 1);
        url_now = arr.join('/');
        if(url_without_point == url_now){
            move_to_point(point_id);
        }
        else{
            item_url = item_url.replace(window.location.origin+'', '');
            // console.log(item_url, 999);
            window.open(item_url, '_self');            
        }
    }

    var scroll_div;
    var content_wrapper;


    $(function() {
        var last_active_was_comment = false;
        $(document).on('mouseup', '#viewer', function(e) {
            if (e.button == 2)
                return;
            if (annotation_mode != 1)
                return;
            setTimeout(function() {
                var selection = window.getSelection();
                if (annotation_mode == 1 && selection.type == 'Range' && (selection.baseOffset != 0 || selection.focusOffset != 0)) {
                    var ctxMenu = $('.annotation-options.ContextMenuPopup');
                    ctxMenu.css({
                        'left': e.pageX - ctxMenu.width() / 2,
                        'top': e.clientY + 12
                    }).show();
                    // console.log(ctxMenu.position());
                    contextMenuShown = true;
                } else {
                    var comment_active = $('.toolbar .comment').hasClass('active');
                    if (comment_active) {
                        if (last_active_was_comment)
                            last_active_was_comment = true;
                        else {
                            last_active_was_comment = false;
                        }
                    }
                    contextMenuShown = false;
                    $('.annotation-options.ContextMenuPopup').hide();
                    var pen_active = $('.toolbar .pen').hasClass('active');
                    if(!pen_active){
                        select_cursor();
                    }
                }
            }, 10);
        });
    
        var notification_list = $('.notification-list:first');
        // console.log(337773);
        notification_list.on('click','.chat-items>li', function() {
            // console.log(this);
            var el = $(this);
            var link = el.find('a');
            if(!link.length)
            {
                return;
            }
            var item_url = link.attr('link');            
            if(!item_url){
                return;
            }
            process_notification_url(item_url);            
        });      
    });

    var UI = undefined;
    var RENDER_OPTIONS = undefined;


    function module0(module, exports, __webpack_require__) {
        try {
            'use strict';
            var _ = __webpack_require__(2);
            var _2 = _interopRequireDefault(_);
            var _initColorPicker = __webpack_require__(4);
            var _initColorPicker2 = _interopRequireDefault(_initColorPicker);
            
            var activePointId = undefined;            
            var commentText; // = comments_wrapper.find('#commentText');
            var comment_list_div; // = comments_wrapper.find('.comment-list:first');
            var comment_list; // = comments_wrapper.find('.comment-list-container:first');

            window['init_doc_comments'] = function() {
                comments_wrapper = $('#comment-wrapper');
                comments_wrapper.resizable();
                commentText = comments_wrapper.find('#commentText');
                comment_list_div = comments_wrapper.find('.comment-list:first');
                comment_list = comments_wrapper.find('.comment-list-container:first');
                commentText.focus(function() {
                    comment_item_focused = true;
                });                

                $(window).unbind("unload", on_leave_document);
                $(window).bind("unload", on_leave_document);
                scroll_div = $('.PdfViewerWrapper');
                content_wrapper = $('#content-wrapper');
            }

            annotation_user_m2 = localStorage.getItem('user');
            annotation_user_m2 = JSON.parse(annotation_user_m2);

            var comments_loaded = false;            

            var _slicedToArray = function() {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;
                    try {
                        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function(arr, i) {
                    if (Array.isArray(arr)) {
                        return arr;
                    } else if (Symbol.iterator in Object(arr)) {
                        return sliceIterator(arr, i);
                    } else {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    }
                };
            }();

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }

            UI = _2.default.UI;
            var PAGE_HEIGHT = void 0;


            RENDER_OPTIONS = {};

            _2.default.setStoreAdapter(new _2.default.LocalStoreAdapter());
            //PDFJS.workerSrc = './shared/pdf.worker.js';

            var NUM_PAGES = 0;
            var pdf_doc_data = undefined;
            var pdfStoreAdapter = _2.default.getStoreAdapter();

            (function() {
                var message = '';

                (function() {
                    function onAnnotationsUploaded(data) {
                        if (data != "done") {
                            if (isNaN(data)) {
                                bootbox.alert("Could not save:");
                                console.log(data);
                                return;
                            }
                            var document_version = getDocumentVersion(documentId);
                            message = "Server already has version=" + data;
                            message += "<br>Do you want to overwrite server version with local=" + document_version + "?";
                            bootbox.confirm(message, function(dr) {
                                if (dr) {
                                    document_version = data + 1;
                                    setDocVersion(document_version);
                                    saveAnnotationsAtServer();
                                }
                            });
                        } else {
                            unSetDocDirty(documentId);
                            console.log("Saved");
                        }
                    }

                    saveAnnotationsAtServer = function(save_type) {                        
                        console.log('Saving');
                        if(save_type != 'reset')
                        {
                            if (isDocumentDirty(documentId) != 1)
                            {
                                return;
                            }
                            select_cursor();
                        }

                        unSetDocDirty(documentId);
                        if (!documentId) {
                            console.log("Save must be called after document id is set")
                            return;
                        }

                        var document_version = getDocumentVersion(documentId);
                        var input_data = {
                            id: doc_id,
                            doc_id: documentId
                        };
                        var annotations_array = _getAnnotations(documentId);
                        if (save_type == 'reset') {
                            window['bootbox'].confirm('Are you sure to reset all the annotations', function(dr){
                                if(dr)
                                {
                                    input_data['reset'] = 1;
                                    call_save_annotations(input_data);
                                    var comment_annots = annotations_array.filter(function(el) {
                                        return el.type == 'point' && !el.sub_type;
                                    });
                                    updateAnnotations(documentId, comment_annots, 'op=reset');
                                    render_details();
                                }
                            });
                        } else {                            
                            var non_comment = annotations_array.filter(function(el) {
                                return el.type != 'point' || el.sub_type;
                            });
                            console.log(non_comment, ' saved aonts');                                
                            input_data['annotations'] = JSON.stringify(non_comment);                            
                            if (document_version == 0) {
                                setDocVersion(documentId, 1);
                            }
                            input_data['version'] = document_version;
                            call_save_annotations(input_data);
                        }                        
                    }

                    window['saveAnnotationsAtServer'] = saveAnnotationsAtServer;
                    var last_save_call = {};
                    function call_save_annotations(input_data){
                        var dt_now = new Date();
                        if(last_save_call.dt){
                            var diff = dt_now - last_save_call.dt;
                            if(diff <= annotation_save_wait_time)
                            {
                                var trace_now = undefined;
                                try { var a = {}; a.debug(); } catch(ex) { trace_now = ex.stack; }
                                console.log(last_save_call.trace, trace_now);
                                return;
                            }
                        }
                        last_save_call.dt = dt_now;
                        try { var a = {}; a.debug(); } catch(ex) { last_save_call.trace = ex.stack; }
                        var args = {
                            app: 'documents',
                            model: 'AnnotationDocument',
                            method: 'add_annotation'
                        };
                        var final_input_data = {
                            args: args,
                            params: input_data
                        };
                        dn_rpc_object({
                            data: final_input_data,
                            no_loader: 1,
                            onSuccess: function(data) {
                                onAnnotationsUploaded(data);                                
                            },
                            type: 'post'
                        });
                    }

                })();



                $('body').on('click', '.reset', function() {
                    setCookieStrict(documentId, documentId +'/annotations', '');                    
                    saveAnnotationsAtServer('reset');                    
                    // console.log(4343);
                });

                $('body').on('click', '.toolbar .back', function() {
                    on_leave_document();
                });

            })();

            $('body').on('click', '.ContextMenuPopup.toolbar:first .copy:first', function() {
                document.execCommand("copy");
                $(this).closest('.ContextMenuPopup').hide();
            });

            $(document).mousedown(function(e) {
                // console.log(contextMenuShown, 4544);
                if (e.button == 2)
                    return;
                var $target = $(e.target);
                if ($target.closest('#viewer').length == 0) {
                    $target.closest('#viewer').css('cursor', 'auto');
                }
                if (comment_item_focused) {
                    var not_in_comments = $target.closest('#comment-wrapper').length == 0;
                    if (not_in_comments) {
                        comment_item_focused = false;
                        loadALlCommentsOnDocument();
                    }
                }                
                
                if(!contextMenuShown)
                {
                    if ($('.topbar:first .pen:first').hasClass('active')) {
                        
                    } else {
                        if (activePointId && $target.closest('#comment-wrapper').length == 0) {
                            activePointId = undefined;
                            $('.comment-list-form').hide();
                        }
                    }
                }
            });

            $('body').on('click', '.cell.colored', function() {
                var obj = $(this);
                var color_value = obj.attr('hex').substring(1);
                if (!activeAnnotationItem) {
                    $('.topbar .pen-color:first').css('background', color_value);
                    $('.topbar .pen-color:first').attr('color', color_value);
                    setPen(null, color_value);
                    obj.append($('#applied_color').show());
                } else if (activeAnnotationItem.color != color_value) {
                    activeAnnotationItem.color = color_value;
                    pdfStoreAdapter.editAnnotation(documentId, activeAnnotationId, activeAnnotationItem).then(function(res) {
                        obj.append($('#applied_color').show());
                    });
                }
            });

            function onPenLeave() {

            }

            var setPen = function(a, b) {}

            var vertical = 'top';
            var horizontal = 'left';
            var sclae_value = undefined;

            function addCommentCount(annotations_of_page, pange_number) {
                var point_annotations = annotations_of_page.filter(function(a) {
                    return a.type == 'point' && !a.sub_type;
                });
                // console.log(point_annotations, 444);                
                for (var p_index in point_annotations) {
                    var c_point = point_annotations[p_index];
                    // console.log(c_point);
                    var notif_counters_html = '<div db_id=' + c_point.id + ' point_id=' + c_point.uuid + ' class="new_comments_count"';
                    var point_top = c_point.y * sclae_value - 15;
                    var point_left = c_point.x * sclae_value + 15;
                    var y_dim = vertical + ':' + point_top + 'px;';
                    var x_dim = horizontal + ':' + point_left + 'px;';
                    var style = y_dim + x_dim;
                    //to be changed
                    // if (c_point.counter == 0) {
                    //     style += 'display:none;'
                    // }
                    notif_counters_html += ' style="' + style + '" comment_count="' + c_point.counter + '">' + c_point.counter + '</div>';
                    $('#pageContainer' + pange_number + ' .canvasWrapper').append(notif_counters_html);
                }
            }

            function setViewerWrapperBottom(source) {
                var topbar_rect = $('.toolbar.topbar')[0].getBoundingClientRect();
                // console.log(diff, 5555, source, topbar_rect);
                content_wrapper.height(window.innerHeight - topbar_rect.top - topbar_rect.height);
            }

            function hideComments() {
                comments_wrapper.hide();
                shown_comment_type = false;
                localStorage.removeItem(documentId + '/shown_comment_type');
                setViewerWrapperBottom('comment hide');
            }

            function showCommentsContainer(comment_sub_type) {
                if (comment_sub_type) {
                    slected_comment_type = comment_sub_type;
                }
                if (slected_comment_type == 'notes') {

                    comments_wrapper.removeClass('comments');
                    comments_wrapper.addClass('notes');

                    comments_wrapper.find('.title:first').html('Personal Notes');
                    comments_wrapper.removeClass('comments').addClass('notes');
                } else {

                    comments_wrapper.removeClass('notes');
                    comments_wrapper.addClass('comments');

                    comments_wrapper.find('.title:first').html('Comments');
                    comments_wrapper.removeClass('notes').addClass('comments');
                }
                comments_wrapper.show();
                if (!activePointId) {
                    $('.comment-list-form').hide();
                } else
                    $('.comment-list-form').show();
                shown_comment_type = slected_comment_type;
                setCookieStrict(documentId, documentId + '/shown_comment_type', shown_comment_type)                
                setViewerWrapperBottom('comment show')
            }

            function setAnnotationMode(){
                var doc_data = RENDER_OPTIONS.document_data;
                var doc_type = doc_data.type;                
                var rotateBy = RENDER_OPTIONS.rotate;
                var rotate_degree = rotateBy % 360;
                if (rotate_degree == 0 && doc_data.is_respondent && (doc_type == 'meeting' || doc_type == 'topic')) {
                    annotation_mode = 1;
                }
                else{                                   
                    if ((doc_type == 'meeting' || doc_type == 'topic') && doc_data.is_respondent)
                    {
                        annotation_mode = 2;
                    }
                    else{
                        annotation_mode = 0;
                    }
                }
            }

            function showHideAnnotations() {
                var doc_data = RENDER_OPTIONS.document_data;                
                if (annotation_mode == 1) {
                    annotation_mode = 1;
                    RENDER_OPTIONS.showAnnotations = true;
                    var pen_size = getCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/pen/size') || 1;
                    var pen_color = getCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/pen/color') || '#000000';
                    setPen(pen_size, pen_color);
                    $('.topbar:first .annotation_button').show();
                    $('.annot-toggler').show();
                } else if(annotation_mode == 2){
                    $('.annot-toggler').hide();                    
                    RENDER_OPTIONS.showAnnotations = false;
                    $('.topbar:first .annotation_button').hide();
                    $('.topbar:first').show();
                    if (doc_data.type == 'signature') {
                        $('.strt_sign').attr('doc_id', doc_data.id);
                        if (doc_data.mp_signature_status == "Pending") {
                            $('.sign_completed.pdfjs').hide();
                            $('.strt_sign.pdfjs').show();
                        }                        
                        if (doc_data.mp_signature_status == "Completed") {
                            $('.strt_sign.pdfjs').hide();
                            $('.sign_completed.pdfjs').show();
                        }
                    }
                }
                setViewerWrapperBottom('Loaded')
            }

            function onCOmmentAdded() {
                commentText.html('');
                commentText.parent().show();
                // comment_list_div.scrollTop(999999000);
                commentText.focus();
            }

            function discard_point_notifications(point, count) {
                point.counter = 0;
                embed_comment_count(point, 0);
            }

            function embed_comment_count(point, count, cookie_only) {
                var annotations = _getAnnotations(documentId);
                for (var i in annotations) {
                    if (annotations[i].uuid == point.uuid) {
                        var newVal = 0;
                        //to be changed
                        if (count != 0) {
                            newVal = count;
                            if (annotations[i].counter)
                                newVal = newVal + annotations[i].counter
                        }
                        point.counter = newVal;
                        annotations[i].counter = newVal;
                        if (!cookie_only) {
                            var elem = $('.new_comments_count[point_id="' + point.uuid + '"]');
                            if (newVal == 0) {
                                elem.hide();
                            } else {
                                elem.show();
                            }
                            elem.html(newVal).attr('comment_count', newVal);
                        }
                        break;
                    }
                }
                updateAnnotations(documentId, annotations, 'op=embed comment count');
            }

            function pdf_render(doc_data) {
                annotation_user_m2 = window['current_user'].cookie;
                site_functions.hideLoader("Document Data");
                doc_loading_step = "Document Render Data";
                site_functions.showLoader(doc_loading_step);
                if (doc_data && doc_data.first_time) {
                    prev_doc_url = window.location.toString();
                    comments_wrapper = $('#comment-wrapper');
                    commentText = comments_wrapper.find('#commentText');
                    comment_list_div = comments_wrapper.find('.comment-list:first');
                    comment_list = comments_wrapper.find('.comment-list-container:first');
                    comment_doc_id = doc_data.type + '-' + doc_data.id + '.pdf';
                    documentId = doc_data.type + '-' + doc_data.id + '-' + annotation_user_m2.id + '.pdf';
                    doc_id = doc_data.id;
                    RENDER_OPTIONS.documentId = documentId;
                    //to be updated
                    if (doc_data.type == 'meeting' || doc_data.type == 'topic') {
                        var annotation_data = doc_data.annotation_data;
                        var server_annotations = annotation_data.annotations;
                        var server_comments = annotation_data.comments;
                        if(!Array.isArray(server_annotations))
                        {
                            server_annotations = [];
                        }
                        // console.log(server_annotations, 33);
                        for(var annot_obj of server_annotations)
                        {
                            if(annot_obj.type == 'drawing'){
                                for(var i in annot_obj.lines){
                                    var line_obj = annot_obj.lines[i];
                                    annot_obj.lines[i] = [line_obj.x, line_obj.y];
                                }
                            }
                        }
                        // console.log(server_annotations, 44);
                        if(!Array.isArray(server_comments))
                        {
                            server_comments = [];
                        }
                        var local_annots = server_annotations;                        
                        if(isDocumentDirty(documentId))
                        {
                            local_annots = _getAnnotations(documentId);
                        }
                        local_annots = local_annots.concat(server_comments);
                        updateAnnotations(documentId, local_annots, 'op=init');
                        comments_loaded = false;
                    }
                }
                render_details(doc_data);
            }

            // Scale/rotate
            function init_ScaleRotate() {
                function setScaleRotate(scale, rotate) {

                    scale = parseFloat(scale, 10);
                    rotate = parseInt(rotate, 10);
                    var vcw = $('#viewer').width();
                    var vuw = 0;
                    vuw = scale / RENDER_OPTIONS.scale * vcw;
                    if (RENDER_OPTIONS.scale !== scale || RENDER_OPTIONS.rotate !== rotate) {
                        RENDER_OPTIONS.scale = scale;
                        RENDER_OPTIONS.rotate = rotate;
                        setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/scale', RENDER_OPTIONS.scale);
                        var newScale = getCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/scale');
                        setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/rotate', RENDER_OPTIONS.rotate % 360);
                        pdf_render();
                    }
                }

                var scale_select = document.querySelector('.toolbar select.scale');
                scale_select.onchange = handleScaleChange;

                function handleScaleChange() {
                    setScaleRotate(scale_select.value, RENDER_OPTIONS.rotate);
                }

                function handleRotateCWClick() {
                    setScaleRotate(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate + 90);
                }

                function handleRotateCCWClick() {
                    setScaleRotate(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate - 90);
                }

                document.querySelector('.toolbar .rotate-ccw').addEventListener('click', handleRotateCCWClick);
                document.querySelector('.toolbar .rotate-cw').addEventListener('click', handleRotateCWClick);

                $('.toolbar:first .zoomin')[0].onclick = function() {
                    if (RENDER_OPTIONS.scale >= 5)
                        return;
                    var selected_option = scale_select.children[scale_select.selectedIndex];
                    scale_select.value = $(selected_option).next().val();
                    handleScaleChange();
                };
                $('.toolbar:first .zoomout')[0].onclick = function() {
                    if (RENDER_OPTIONS.scale <= 0.25)
                        return;
                    var selected_option = scale_select.children[scale_select.selectedIndex];
                    scale_select.value = $(selected_option).prev().val();
                    handleScaleChange();
                };
            }

            function render_details(doc_data) {
                try {
                    var pdfData = false;
                    var pages_rendered = 0;
                    if (doc_data && doc_data.first_time) {
                        try {
                            if (doc_data.is_respondent && (doc_data.type == 'meeting' || doc_data.type == 'topic')) {
                                window['show_annotation'] = true;
                            } else {
                                window['show_annotation'] = false
                            }
                            $('.topbar:first .annotation_button').hide();
                            scroll_div.hide();
                            $('.strt_sign.pdfjs').hide();
                            $('.sign_completed.pdfjs').hide();
                            $('.router-outlet').hide();
                            $('.doc-reseter').hide();
                            $('.toolbar.topbar:first').show();
                            $('#annotated-doc-conatiner').show();
                            select_cursor();
                            hideComments();
                            init_ScaleRotate();
                            var scale_select = $('.toolbar select.scale:first');
                            RENDER_OPTIONS = {
                                documentId: documentId,
                                scale: getCookieStrict(documentId, documentId + '/scale'),
                                rotate: getCookieStrict(documentId, documentId + '/rotate'),
                                pdfDocument: null
                            }
                            if (!RENDER_OPTIONS.rotate) {
                                RENDER_OPTIONS.rotate = 360;
                                setCookieStrict(documentId, documentId + '/rotate', 360);
                            }

                            if (!RENDER_OPTIONS.scale) {
                                RENDER_OPTIONS.scale = 1;
                                setCookieStrict(documentId, documentId + '/scale', 1)
                            }
                            scale_select.val(RENDER_OPTIONS.scale);
                            var topbar_rect = $('.toolbar.topbar')[0].getBoundingClientRect();
                            content_wrapper.height(window.innerHeight - topbar_rect.top - topbar_rect.height);
                        } catch (er) {
                            console.log(er);
                        }

                        if (doc_data.type) {
                            try {
                                if (!doc_data.url) {
                                    if (doc_data.doc.startsWith('data:application/pdf;base64,')) {
                                        doc_data.doc = doc_data.doc.replace('data:application/pdf;base64,', '');
                                    }
                                    var raw = atob(doc_data.doc);
                                    var uint8Array = new Uint8Array(raw.length);
                                    for (var i = 0; i < raw.length; i++) {
                                        uint8Array[i] = raw.charCodeAt(i);
                                    }
                                    doc_data.doc = uint8Array;
                                    // console.log(window['dt_functions'].now_full(), 'skipped download ');
                                } else {
                                    var doc_url = window['site_config'].server_base_url + doc_data.url;
                                    doc_data.doc = doc_url;
                                    console.log(window['dt_functions'].now_full(), 'downloading doc data at client from ' + doc_url);
                                }
                                RENDER_OPTIONS.document_data = doc_data;
                                site_functions.hideLoader(doc_loading_step);
                                doc_loading_step = 'document content';
                                site_functions.showLoader(doc_loading_step);
                                PDFJS.getDocument(doc_data.doc).then(function(pdf_data) {
                                    console.log(window['dt_functions'].now_full(), 'download completed');
                                    pdf_doc_data = pdf_data;
                                    $('.page-count').html(pdf_doc_data.numPages);
                                    if (pdf_doc_data.numPages > 1) {
                                        $('.page-next-btn').removeAttr('disabled');
                                    }
                                    site_functions.hideLoader(doc_loading_step);
                                    doc_loading_step = 'document pages';
                                    site_functions.showLoader(doc_loading_step);
                                    renderPdfData(pdf_doc_data);
                                });
                            } catch (er) {
                                console.log(er);
                            }
                        } else {
                            bootbox.alert("Invalid document data ", doc_data);
                            site_functions.hideLoader(doc_loading_step);
                            return;
                        }
                    } else {
                        if (RENDER_OPTIONS.document_data) {
                            pdfData = RENDER_OPTIONS.document_data.doc;
                            documentId = RENDER_OPTIONS.documentId;
                        } else {
                            bootbox.alert("Invalid render options data ", RENDER_OPTIONS);
                            site_functions.hideLoader(doc_loading_step);
                            return;
                        }
                        renderPdfData(pdf_doc_data)
                    }

                    function renderPdfData(pdfContent) {
                        try {
                            // console.log('Render pdf data');
                            if (!pdfContent) {
                                alert("PDF not loaded");
                                site_functions.hideLoader(doc_loading_step);
                                return;
                            }
                            RENDER_OPTIONS.pdfDocument = pdfContent;
                            var viewer = document.getElementById('viewer');
                            viewer.innerHTML = '';
                            NUM_PAGES = pdfContent.pdfInfo.numPages;
                            for (var i = 0; i < NUM_PAGES; i++) {
                                var page = UI.createPage(i + 1);
                                viewer.appendChild(page);
                            }
                            sclae_value = $('select.scale').val();
                            var rotateBy = RENDER_OPTIONS.rotate;

                            var rotate_degree = rotateBy % 360;

                            switch (rotate_degree) {
                                case 90:
                                    vertical = 'right';
                                    horizontal = 'top';
                                    break;
                                case 180:
                                    vertical = 'bottom';
                                    horizontal = 'right';
                                    break;
                                case 270:
                                    vertical = 'left';
                                    horizontal = 'bottom';
                                    break;
                            }
                        } catch (er) {
                            console.log(er);
                        }

                        function onPageDone(annotations_of_page, pange_number) {
                            try {
                                pages_rendered++;
                                if (pange_number == 1) {
                                    site_functions.hideLoader(doc_loading_step);
                                    first_page_rendered = 1;
                                    if (doc_data && doc_data.first_time) {
                                        $('body').addClass('pdf-viewer');
                                    }
                                    scroll_div.show();
                                    console.log(window['dt_functions'].now_full(), 'first page rendered');
                                }
                                if (annotation_mode == 1) {
                                    addCommentCount(annotations_of_page, pange_number);
                                }
                                // console.log(pange_number, NUM_PAGES);
                                if (pange_number == NUM_PAGES) {
                                    on_document_rendered();
                                    // console.log(window['dt_functions'].now_full(), 'document done');
                                }
                            } catch (er) {
                                console.log(er);
                            }
                        }

                        function on_document_rendered() {
                            try {
                                $('.ToolBarWrapper>div').css({
                                    display: 'flex'
                                });
                                // var rotateBy = RENDER_OPTIONS.rotate;
                                // var rotate_degree = rotateBy % 360;
                                showHideAnnotations();
                                if (!(doc_data && doc_data.first_time)) {
                                    return;
                                }
                                if (!annotation_mode) {
                                    return;
                                }
                                
                                window['route_changing'] = false;
                                process_notification_url(window.location.toString());

                                var socket_manager = window['socket_manager'];
                                socket_manager.execute_on_verified(function() {
                                    var n_list = socket_manager.notificationList;
                                    $('.canvasWrapper .new_comments_count').each(function(i, el) {
                                        var address = {
                                            res_app: 'documents',
                                            res_model: 'PointAnnotation',
                                            res_id: parseInt($(el).attr('db_id')),
                                        }
                                        for (var j in n_list) {

                                            if (n_list[j].address.res_app == address.res_app &&
                                                n_list[j].address.res_model == address.res_model &&
                                                n_list[j].address.res_id == address.res_id) {
                                                // console.log(i, j, n_list[j].count, 134);
                                                $(el).attr('counter', $(el).attr('counter') + n_list[j].count);
                                            }
                                        }
                                    });
                                })
                            } catch (er) {
                                console.log(er);
                            }
                        }
                        try {
                            setAnnotationMode();
                            UI.renderPage(1, RENDER_OPTIONS, function(cb_data, page_num) {
                                onPageDone(cb_data, page_num, 1);
                                for (var i = 2; i <= NUM_PAGES; i++) {
                                    UI.renderPage(i, RENDER_OPTIONS, function(cb_data, page_num) {
                                        onPageDone(cb_data, page_num);
                                    });
                                }
                            });
                        } catch (er) {
                            console.log(er);
                        }
                    }
                    if (window['show_annotation']) {
                        $('.annotationLayer').show();
                        $('.annotation_button').show();
                    } else {
                        $('.annotationLayer').hide();
                        $('.annotation_button').hide();
                    }
                } catch (er) {
                    console.log(er);
                }
            }

            // Text stuff
            (function() {
                var textSize = void 0;
                var textColor = void 0;

                function initText() {
                    var size = document.querySelector('.toolbar .text-size');
                    [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96].forEach(function(s) {
                        size.appendChild(new Option(s, s));
                    });

                    var textSizeCookies = getCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/text/size');
                    setText(textSizeCookies || 10, getCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/text/color') || '#000000');

                    (0, _initColorPicker2.default)(document.querySelector('.text-color'), textColor, function(value) {
                        setText(textSize, value);
                    });
                }

                function setText(size, color) {
                    var modified = false;

                    if (textSize !== size) {
                        modified = true;
                        textSize = size;
                        setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/text/size', textSize);
                        document.querySelector('.toolbar .text-size').value = textSize;
                    }

                    if (textColor !== color) {
                        modified = true;
                        textColor = color;
                        setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/text/color', textColor);

                        var selected = document.querySelector('.toolbar .text-color.color-selected');
                        if (selected) {
                            selected.classList.remove('color-selected');
                            selected.removeAttribute('aria-selected');
                        }

                        selected = document.querySelector('.toolbar .text-color[data-color="' + color + '"]');
                        if (selected) {
                            selected.classList.add('color-selected');
                            selected.setAttribute('aria-selected', true);
                        }
                    }

                    if (modified) {
                        UI.setText(textSize, textColor);
                    }
                }

                function handleTextSizeChange(e) {
                    setText(e.target.value, textColor);
                }

                //Sami disabled text
                //document.querySelector('.toolbar .text-size').addEventListener('change', handleTextSizeChange);
                //initText();
            })();

            // Pen stuff
            (function() {
                var penSize = undefined;
                var penColor = undefined;

                setPen = function(size, color) {
                    var modified = false;
                    if (size && typeof(size) != 'number') {
                        size = parseInt(size);
                    }
                    if (color && color.length == 6) {
                        color = '#' + color;
                    }
                    //console.log(size, penSize, color, penColor);
                    if (size && penSize !== size) {
                        modified = true;
                        penSize = size;
                        setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/pen/size', penSize);
                        document.querySelector('.toolbar .pen-size').value = penSize;
                    }

                    if (color && penColor !== color) {
                        modified = true;
                        penColor = color;
                        setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/pen/color', penColor);
                        $('.toolbar .pen-color:first').css('background-color', penColor);
                        $('.toolbar .pen-color:first').attr('color', color);

                        $('select.pen-size').css('color', color);
                        $('select.pen-size option').css('color', color);
                    }
                    if (modified) {
                        UI.setPen(penSize, penColor);
                    }
                }

                function handlePenSizeChange(e) {
                    setPen(e.target.value, penColor);
                }

                function handlePenColorChange(e) {
                    var topbar_width = $('.topbar:first').width();
                    var color_popup = $('.ColorPalettePopup:first');
                    var btn_rect = this.getBoundingClientRect();

                    var popup_postion = {
                        top: btn_rect.y + 20
                    };
                    if (topbar_width / 2 > btn_rect.x) {
                        popup_postion.left = btn_rect.x;
                    } else {
                        popup_postion.left = btn_rect.x - color_popup.width();
                    }
                    color_popup.css(popup_postion).show();
                    var c_color = $(this).attr('color');
                    color_popup.find('div[hex="' + c_color + '"]:first').click();
                }
                $('body').on('click', '.toolbar .pen-color:first', handlePenColorChange);
                $('body').on('change', '.toolbar .pen-size:first', handlePenSizeChange);
            })();

            // Toolbar buttons
            (function() {
                var tooltype = 'cursor';

                function setActiveToolbarItem(type, button) {
                    var clicked_annotation_button = $(button);
                    clicked_annotation_button = clicked_annotation_button.closest('.annotation_button');
                    button = clicked_annotation_button[0];
                    UI.disablePoint();
                    var oldButton = $('.toolbar button.active');
                    if (oldButton.length > 0) {
                        oldButton.removeClass('active');
                        switch (tooltype) {
                            case 'cursor':
                                UI.disableEdit();
                                break;
                            case 'draw':
                                UI.disablePen();
                                break;
                            case 'text':
                                UI.disableText();
                                break;
                            case 'point':
                                UI.disablePoint();
                                break;
                            case 'area':
                            case 'highlight':
                            case 'strikeout':
                            case 'underline':
                                UI.disableRect();
                                break;
                        }
                    }

                    tooltype = type;

                    switch (type) {
                        case 'cursor':
                            $('#viewer').css('cursor', 'auto');
                            UI.enableEdit();
                            break;
                        case 'draw':
                            UI.enablePen();
                            break;
                        case 'text':
                            UI.enableText();
                            break;
                        case 'point':
                            $('.pdfViewer').css("cursor", "crosshair");
                            UI.enablePoint();
                            break;
                        case 'area':
                        case 'highlight':
                        case 'strikeout':
                        case 'underline':
                            console.log(tooltype, 444);
                            UI.enableRect(type);
                            break;
                    }
                    clicked_annotation_button.addClass('active');
                }

                function handleToolbarClick(e) {
                    var active_btn = $('.topbar:first .active');
                    var target = $(e.target);
                    target = target.closest('button');
                    if (target.hasClass('pen') && active_btn.hasClass('pen')) {
                        select_cursor();
                        return;
                    } else {
                        var tooltype = $(e.target).closest('[data-tooltype]').data('tooltype');
                        if (tooltype)
                            setActiveToolbarItem(tooltype, e.target);
                    }
                    if (target.hasClass('comment')) {
                        if (target.hasClass('personal')) {
                            comment_sub_type = 'personal';
                        } else {
                            comment_sub_type = false;
                        }
                    }
                }

                $('body').on('click', '.toolbar.topbar:first button, .annotation-options:first button', handleToolbarClick);
            })();


            // Comment stuff
            (function(window, document) {
                var on_annotation_comment_received = function(data) {
                    var annot_doc = $('#annotated-doc-conatiner');
                    if (annot_doc.length < 1) {
                        return;
                    }
                    annot_doc = annot_doc.is(':visible');
                    if (!annot_doc) {
                        return;
                    }
                    if (annotation_mode != 1 || !annot_doc || data.point.comment_doc_id != comment_doc_id) {
                        return;
                    }
                    var annot_id = comment_list.attr('annotation-id');
                    if (data['new_point']) {
                        data.point.counter = 1;
                        addAnnotationLocal(documentId, data.point);
                        UI.renderPage(data.point.page, RENDER_OPTIONS, function(cb_data, page_num) {
                            pdfStoreAdapter.addComment(documentId, data.point.uuid, data.point.comment, 1).then(function(aComment) {
                                insertComment(aComment, 1);
                                var new_comment = comments_wrapper.find('.comment-list-item:last');
                                new_comment.css({
                                    'background': 'green',
                                    color: 'white'
                                });
                            });
                            addCommentCount(cb_data, page_num);
                            embed_comment_count(data.point, 1, 1);
                        });
                    } else {
                        if (data.point.uuid == annot_id) {
                            //when same point opened
                            pdfStoreAdapter.addComment(documentId, data.point.uuid, data.point.comment, 1).then(function(aComment) {
                                insertComment(aComment, 1);
                                var new_comment = comments_wrapper.find('.comment-list-item:last');
                                new_comment.css({
                                    'background': 'green',
                                    color: 'white'
                                });
                            });
                            discard_point_notifications(data.point, 1);
                        } else {
                            pdfStoreAdapter.addComment(documentId, data.point.uuid, data.point.comment, 1);
                            embed_comment_count(data.point, 1);
                        }
                    }
                }

                window['on_annotation_comment_received'] = on_annotation_comment_received;

                var annotation_user = localStorage.getItem('user');
                annotation_user = JSON.parse(annotation_user);
                $('body').on('keyup', '#commentText', function(e) {
                    if (!activePointId) {
                        console.log("Comment not added because, no active annotationId");
                        return;
                    }
                    if (!e.shiftKey && e.keyCode == 13) {
                        e.preventDefault();
                        postComment();
                    }
                });

                $('body').on('click', '.commentText1', function(e) {
                    postComment();
                });

                function postComment() {
                    if (!window['should_save']) {
                        window['should_save'] = true;
                        return;
                    }
                    mention_list = []
                    $('.active-mention a.mention').each(function(i, el) {
                        var mentioned_id = $(el).attr('mentioned_id');
                        if (mention_list.indexOf(mentioned_id) == -1) {
                            mention_list.push(parseInt(mentioned_id));
                        }
                    });

                    var commentValue = commentText.html(); // commentText.val().trim();
                    commentValue = commentValue.substr(0, commentValue.length - 1);
                    if (commentValue == '') {
                        commentText.html('');
                        return;
                    }
                    //console.log(commentValue);
                    var comment = {
                        date_time: new Date(),
                        user_name: annotation_user_m2.name,
                        uid: annotation_user_m2.id,
                        user_image: annotation_user_m2.photo,
                        content: commentValue
                    };
                    //console.log(commentText.content)
                    if (!comment.content)
                        return false;
                    pdfStoreAdapter.addComment(documentId, activePointId, comment).then(function(comment) {
                        insertComment(comment, 1);
                    });
                }

                loadALlCommentsOnDocument = function(point_uuid) {
                    comment_list.html('');
                    comments_wrapper.removeClass('all_point_comments').removeClass('single_point_comments');
                    comment_list.removeAttr('annotation-id');
                    $('.comment-list-container').addClass('full-discussion');
                    var point_type = false;
                    if (slected_comment_type == 'notes')
                        point_type = 'personal';

                    pdfStoreAdapter.getPointAnnotations(documentId, point_type).then(function(pointAnnotations) {
                        pointAnnotations = pointAnnotations.annotations;
                        pointAnnotations.sort(function(a, b) {
                            return a["page"] - b["page"] || a["y"] - b["y"] || a["x"] - b["x"];
                        });
                        for (var annotationItem of pointAnnotations) {
                            var comments = annotationItem.comments;
                            // if(annotationItem.sub_type)
                            // console.log(comments, 5333);
                            renderCommentsByAnnotation(comments, annotationItem.uuid, annotationItem.sub_type);
                        }
                        onAllCommentsRendered(point_uuid)
                    });
                    if(comments_wrapper.hasClass('comments'))
                    {
                        comments_wrapper.addClass('all_point_comments');
                    }
                }

                function onAllCommentsRendered(point_uuid) {
                    comments_loaded = 1;
                    setTimeout(function() {
                        if (point_uuid) {
                            select_comment_item(point_uuid);
                        } else {
                            showCommentsContainer(slected_comment_type);
                            commentText.closest('form').hide();
                        }
                    }, 11);
                }

                function renderCommentsByAnnotation(comments, annotationId, sub_type) {
                    var group = document.createElement('div');
                    group.classList.add("groupcomment");
                    for (var i in comments) {
                        var aComment = comments[i];
                        var child = makeCommentItem(aComment);
                        group.appendChild(child);
                    }
                    $(group).attr('annotationId', annotationId);
                    comment_list.append(group);
                }

                function renderComments(comments) {
                    comment_list.html('');
                    // console.log(comments, 1007);
                    comments.forEach(insertComment);
                }
                var selected_comment_item = false;
                $('body').on('click', '#comment-wrapper .buttons', function(e) {
                    e.preventDefault();
                    selected_comment_item = $(this).closest('.comment-list-item');
                    $('.update-comment:first').css({
                        'top': e.pageY,
                        'left': e.pageX
                    }).show();
                });

                $('body').on('click', '.annotation_button.unread', function() {
                    var els = $('.canvasWrapper .new_comments_count');
                    var lenth = els.length;
                    for (var i = 0; i < lenth; i++) {
                        var el = els.eq(i);
                        var cnt = parseInt(el.html());
                        if (cnt > 0) {
                            select_comment_item(el.attr('point_id'))
                            break;
                        }
                    }
                });

                $('body').on('click', '.update-comment:first .delete', function(e) {
                    var comment_parent = selected_comment_item.closest('.groupcomment');
                    var comment_id = selected_comment_item.attr('comment-id');
                    var annotationId = selected_comment_item.attr('annotation');
                    pdfStoreAdapter.deleteComment(documentId, annotationId, comment_id).then(function() {
                        if (comment_parent.children('.comment-list-item').length == 1) {
                            comment_parent.remove();
                        } else
                            selected_comment_item.remove();
                        $('.update-comment').hide();
                    });
                });

                $('body').on('click', '.show-all-comments', function() {
                    setTimeout(hideComments, 50);
                });

                select_comment_item = function(point_identifier, is_new) {
                    // console.log(666,6);
                    comments_wrapper.removeClass('all_point_comments').removeClass('single_point_comments');
                    if (!comments_loaded) {
                        loadALlCommentsOnDocument(point_identifier);
                        return;
                    }
                    var annotationId = undefined;
                    if (typeof(point_identifier) == 'string')
                        annotationId = point_identifier;
                    else
                        annotationId = point_identifier.attr('annotationId');
                    if (!annotationId) {
                        console.log("Invalid point id");
                        return;
                    }
                    var dom_item_to_focus = $('.canvasWrapper .new_comments_count[point_id="' + annotationId + '"]');
                    if(!dom_item_to_focus.length)
                    {
                        return;
                    }                    
                    var c_svg = $('svg.annotationLayer').find('svg[data-pdf-annotate-id="' + annotationId + '"]')
                    if (c_svg.length > 0) {
                        handleAnnotationClick(c_svg[0]);
                        if(!is_new)
                        {
                            window['js_utils'].scroll_to_element(dom_item_to_focus, scroll_div);
                        }                        
                    }
                }

                $('body').on('click', '#comment-wrapper .groupcomment', function(e) {
                    if ($(e.target).is('.buttons')) {
                        return;
                    }
                    select_comment_item($(this));
                });

                function makeCommentItem(aComment) {
                    if (!aComment.date_time) {
                        console.log('No time for comment ' + aComment.id + ' - ' + aComment.uuid);
                    }
                    var child = document.createElement('div');
                    child.className = 'comment-list-item';
                    var user_name = aComment.user_name;
                    var user_image = '';
                    if (aComment.user) {
                        username = aComment.user.name;
                        user_image = aComment.user.image;
                        if (user_image) {
                            user_image = window['site_config'].server_base_url + aComment.user.image;
                        }
                    }

                    var child_info = '';
                    child_info += '<div class="user-pic-time-infoWrapper">';
                    if (user_image) {
                        child_info += '<div class="userSmpic icon-user-single">';
                        child_info += '<img src="' + user_image + '" />';
                        child_info += '</div>';
                    }

                    child_info += '<div class="user-time-info pt-2">';
                    if (user_name) {
                        child_info += '<span class="user text-primary">';
                        child_info += user_name + '</span>';
                    }

                    if (aComment.date_time) {
                        child_info += '<span class="time small">';
                        child_info += window['dt_functions'].timeAgo(aComment.date_time)
                        child_info += '</span>';
                    }
                    child_info += '</div>';
                    child_info += '</div>';
                    child_info += '<div class="comment-details pt-1 pl-1">';
                    child_info += '<p>' + aComment.content + '</p>';
                    child_info += '</div>';

                    $(child).attr('comment-id', aComment.uuid);
                    $(child).attr('annotation', aComment.annotation);
                    child.innerHTML = child_info;
                    return child;
                }

                function insertComment(aComment, textBox) {
                    var child = makeCommentItem(aComment);
                    comment_list.append(child);
                    if (textBox)
                        onCOmmentAdded();
                }
                activate_annotation = function(target) {
                    pdfStoreAdapter.getAnnotation(documentId, activeAnnotationId).then(function(item) {
                        activeAnnotationItem = item;
                        if (supportsComments(target)) {
                            handlePointAnnotationClick(item);
                        } else {
                            var ctxMenu = $('.colors.ContextMenuPopup:first');
                            var pos = $(target).position();
                            var tw = $('#pdf-annotate-edit-overlay:visible').width();
                            var cmw = ctxMenu.width();
                            var left_pos = pos.left + tw / 2 - cmw / 2;
                            var color = $(target).attr('fill');
                            if (!color) {
                                color = $(target).attr('stroke');
                            }
                            if (color == 'none' || !color)
                                color = '#000000';

                            var selected = ctxMenu.find('.row>.cell[hex="' + color + '"]');
                            if (selected.length == 0) {
                                $('#applied_color').hide();
                            } else
                                selected.append($('#applied_color').show());
                            ctxMenu.css({
                                'left': left_pos,
                                'top': pos.top + 30
                            }).show();
                        }
                    });
                }
                handlePointAnnotationClick = function(item) {
                    activePointId = activeAnnotationId;
                    pdfStoreAdapter.getComments(documentId, activeAnnotationId).then(renderComments).then(function() {
                        if (item.counter > 0) {
                            var lenth = comments_wrapper.find('.comment-list-item').length;
                            lenth = lenth - item.counter - 1;
                            var new_comments = comments_wrapper.find('.comment-list-item:gt(' + lenth + ')');
                            new_comments.css({
                                'background': 'green',
                                color: 'white'
                            })
                            discard_point_notifications(item, item.counter);
                        }
                    });
                    if (activeAnnotationItem.sub_type) {
                        $('.comment-list-container').addClass('full-discussion');
                        comment_list.removeAttr('annotation-id');
                        showCommentsContainer('notes');
                    } else {
                        $('.comment-list-container').removeClass('full-discussion');
                        comment_list.attr('annotation-id', activeAnnotationId);
                        $('#pdf-annotate-edit-overlay a').remove();
                        showCommentsContainer('comments');
                    }
                    // console.log(4343434);
                    comments_wrapper.removeClass('all_point_comments').removeClass('single_point_comments');
                    onCOmmentAdded();
                }

                handleAnnotationBlur = function() {                    
                    activeAnnotationItem = false;
                }


                $('body').on('click', '#btn_show_all_point_comments', function() {
                    $('.toolbar:first .comment:not(.personal):first').click();
                })

                $('body').on('click', '.toolbar:first .comment', function() {
                    UI.destroyEditOverlay();
                    if ($(this).is('.personal'))
                        slected_comment_type = 'notes';
                    else {
                        slected_comment_type = 'comments';
                    }
                    loadALlCommentsOnDocument();
                });

                UI.addEventListener('annotation:click', handleAnnotationClick);
                UI.addEventListener('annotation:blur', handleAnnotationBlur);
            })(window, document);
            exports.pdf_render = pdf_render;
        } catch (err) {
            console.log(err)
        }
    }

    function module1(module, exports, __webpack_require__) {
        (function() {
            if (typeof twttr === "undefined" || twttr === null) {
                var twttr = {};
            }
            twttr.txt = {};
        })();
    }

    function module2(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; /* WEBPACK VAR INJECTION */

        (function(module) {
            'use strict';
            var resFun = undefined;
            var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };
            (function webpackUniversalModuleDefinition(root, factory) {
                if ((false ? 'undefined' : _typeof2(exports)) === 'object' && (false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();
                else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["PDFAnnotate"] = factory();
                else root["PDFAnnotate"] = factory();
            })(undefined, function() {
                return (function(modules) { // webpackBootstrap
                    // The module cache

                    var installedModules = {}; // The require function

                    function __webpack_require__(moduleId) { // Check if module is in cache

                        if (installedModules[moduleId]) return installedModules[moduleId].exports; // Create a new module (and put it into the cache)

                        var module = installedModules[moduleId] = {
                            exports: {},
                            id: moduleId,
                            loaded: false
                        }; // Execute the module function

                        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); // Flag the module as loaded

                        module.loaded = true; // Return the exports of the module

                        return module.exports;
                    } // expose the modules object (__webpack_modules__)

                    __webpack_require__.m = modules; // expose the module cache

                    __webpack_require__.c = installedModules; // __webpack_public_path__

                    __webpack_require__.p = ""; // Load entry module and return exports

                    return __webpack_require__(0);
                }([ /* 0 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _PDFJSAnnotate = __webpack_require__(1);
                    var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    exports.default = _PDFJSAnnotate2.default;
                    module.exports = exports['default']; /***/
                }, /* 1 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _StoreAdapter = __webpack_require__(2);
                    var _StoreAdapter2 = _interopRequireDefault(_StoreAdapter);
                    var _LocalStoreAdapter = __webpack_require__(8);
                    var _LocalStoreAdapter2 = _interopRequireDefault(_LocalStoreAdapter);
                    var _render = __webpack_require__(10);
                    var _render2 = _interopRequireDefault(_render);
                    var _UI = __webpack_require__(28);
                    var _UI2 = _interopRequireDefault(_UI);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    exports.default = {
                        /**
                         * Abstract class that needs to be defined so PDFJSAnnotate
                         * knows how to communicate with your server.
                         */
                        StoreAdapter: _StoreAdapter2.default,
                        /**
                         * Implementation of StoreAdapter that stores annotation data to localStorage.
                         */
                        LocalStoreAdapter: _LocalStoreAdapter2.default,
                        /**
                         * Abstract instance of StoreAdapter
                         */
                        __storeAdapter: new _StoreAdapter2.default(),
                        /**
                         * Getter for the underlying StoreAdapter property
                         *
                         * @return {StoreAdapter}
                         */
                        getStoreAdapter: function getStoreAdapter() {
                            return this.__storeAdapter;
                        },
                        /**
                         * Setter for the underlying StoreAdapter property
                         *
                         * @param {StoreAdapter} adapter The StoreAdapter implementation to be used.
                         */
                        setStoreAdapter: function setStoreAdapter(adapter) { // TODO this throws an error when bundled
                            // if (!(adapter instanceof StoreAdapter)) {
                            //   throw new Error('adapter must be an instance of StoreAdapter');
                            // }
                            this.__storeAdapter = adapter;
                        },
                        /**
                         * UI is a helper for instrumenting UI interactions for creating,
                         * editing, and deleting annotations in the browser.
                         */
                        UI: _UI2.default,
                        /**
                         * Render the annotations for a page in the PDF Document
                         *
                         * @param {SVGElement} svg The SVG element that annotations should be rendered to
                         * @param {PageViewport} viewport The PDFPage.getViewport data
                         * @param {Object} data The StoreAdapter.getAnnotations data
                         * @return {Promise}
                         */
                        render: _render2.default,
                        /**
                         * Convenience method for getting annotation data
                         *
                         * @alias StoreAdapter.getAnnotations
                         * @param {String} documentId The ID of the document
                         * @param {String} pageNumber The page number
                         * @return {Promise}
                         */
                        getAnnotations: function getAnnotations(documentId, pageNumber) {
                            var _getStoreAdapter;
                            return (_getStoreAdapter = this.getStoreAdapter()).getAnnotations.apply(_getStoreAdapter, arguments);
                        }
                    };
                    module.exports = exports['default']; /***/
                }, /* 2 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _createClass = function() {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor) descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        return function(Constructor, protoProps, staticProps) {
                            if (protoProps) defineProperties(Constructor.prototype, protoProps);
                            if (staticProps) defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    }();
                    var _abstractFunction = __webpack_require__(3);
                    var _abstractFunction2 = _interopRequireDefault(_abstractFunction);
                    var _event = __webpack_require__(4);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }

                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) {
                            throw new TypeError("Cannot call a class as a function");
                        }
                    } // Adapter should never be invoked publicly
                    var StoreAdapter = function() {
                        /**
                         * Create a new StoreAdapter instance
                         *
                         * @param {Object} [definition] The definition to use for overriding abstract methods
                         */
                        function StoreAdapter() {
                            var _this = this;
                            var definition = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                            _classCallCheck(this, StoreAdapter); // Copy each function from definition if it is a function we know about
                            Object.keys(definition).forEach(function(key) {
                                if (typeof definition[key] === 'function' && typeof _this[key] === 'function') {
                                    _this[key] = definition[key];
                                }
                            });
                        }
                        /**
                         * Get all the annotations for a given document and page number.
                         *
                         * @param {String} documentId The ID for the document the annotations belong to
                         * @param {Number} pageNumber The number of the page the annotations belong to
                         * @return {Promise}
                         */
                        _createClass(StoreAdapter, [{
                            key: '__getAnnotations',
                            value: function __getAnnotations(documentId, pageNumber) {
                                (0, _abstractFunction2.default)('getAnnotations');
                            }
                        }, {
                            key: 'getAnnotation',
                            /**
                             * Get the definition for a specific annotation.
                             *
                             * @param {String} documentId The ID for the document the annotation belongs to
                             * @param {String} annotationId The ID for the annotation
                             * @return {Promise}
                             */
                            value: function getAnnotation(documentId, annotationId) {
                                (0, _abstractFunction2.default)('getAnnotation');
                            }
                            /**
                             * Add an annotation
                             *
                             * @param {String} documentId The ID for the document to add the annotation to
                             * @param {String} pageNumber The page number to add the annotation to
                             * @param {Object} annotation The definition for the new annotation
                             * @return {Promise}
                             */
                        }, {
                            key: 'getCommentAnnotations',
                            value: function getCommentAnnotations(documentId) {
                                (0, _abstractFunction2.default)('getCommentAnnotations');
                            }
                        }, {
                            key: 'getPointAnnotations',
                            value: function getCommentAnnotations(documentId, sub_type) {
                                (0, _abstractFunction2.default)('getPointAnnotations');
                            }
                        }, {
                            key: '__addAnnotation',
                            value: function __addAnnotation(documentId, pageNumber, annotation) {
                                (0, _abstractFunction2.default)('addAnnotation');
                            }
                        }, {
                            key: '__editAnnotation',
                            value: function __editAnnotation(documentId, annotationId, annotation) {
                                (0, _abstractFunction2.default)('editAnnotation');
                                destroyEditOverlay();
                            }
                        }, {
                            key: '__deleteAnnotation',
                            /**
                             * Delete an annotation
                             *
                             * @param {String} documentId The ID for the document
                             * @param {String} annotationId The ID for the annotation
                             * @return {Promise}
                             */
                            value: function __deleteAnnotation(documentId, annotationId) {
                                (0, _abstractFunction2.default)('deleteAnnotation');
                            }
                        }, {
                            key: 'getComments',
                            /**
                             * Get all the comments for an annotation
                             *
                             * @param {String} documentId The ID for the document
                             * @param {String} annotationId The ID for the annotation
                             * @return {Promise}
                             */
                            value: function getComments(documentId, annotationId) {
                                (0, _abstractFunction2.default)('getComments');
                            }
                            /**
                             * Add a new comment
                             *
                             * @param {String} documentId The ID for the document
                             * @param {String} annotationId The ID for the annotation
                             * @param {Object} content The definition of the comment
                             * @return {Promise}
                             */
                        }, {
                            key: 'getAllComments',
                            /**
                             * Get all the comments on document
                             *
                             * @param {String} documentId The ID for the document
                             * @return {Promise}
                             */
                            value: function getAllComments(documentId) {
                                (0, _abstractFunction2.default)('getAllComments');
                            }
                        }, {
                            key: '__addComment',
                            value: function __addComment(documentId, annotationId, content) {
                                (0, _abstractFunction2.default)('addComment');
                            }
                        }, {
                            key: '__editComment',
                            /**
                             * Delete a comment
                             *
                             * @param {String} documentId The ID for the document
                             * @param {String} commentId The ID for the comment
                             * @return {Promise}
                             */
                            value: function __editComment(documentId, commentId) {
                                (0, _abstractFunction2.default)('editComment');
                            }
                        }, {
                            key: '__deleteComment',
                            /**
                             * Delete a comment
                             *
                             * @param {String} documentId The ID for the document
                             * @param {String} commentId The ID for the comment
                             * @return {Promise}
                             */
                            value: function __deleteComment(documentId, annotationId, commentId) {
                                (0, _abstractFunction2.default)('deleteComment');
                            }
                        }, {
                            key: 'getAnnotations',
                            get: function get() {
                                return this.__getAnnotations;
                            },
                            set: function set(fn) {
                                this.__getAnnotations = function getAnnotations(documentId, pageNumber) {
                                    return fn.apply(undefined, arguments).then(function(annotations) { // TODO may be best to have this happen on the server
                                        if (annotations.annotations) {
                                            annotations.annotations.forEach(function(a) {
                                                a.documentId = documentId;
                                            });
                                        }
                                        return annotations;
                                    });
                                };
                            }
                        }, {
                            key: 'addAnnotation',
                            get: function get() {
                                return this.__addAnnotation;
                            },
                            set: function set(fn) {
                                this.__addAnnotation = function addAnnotation(documentId, pageNumber, annotation) {
                                    return fn.apply(undefined, arguments).then(function(annotation) {
                                        (0, _event.fireEvent)('annotation:add', documentId, pageNumber, annotation);
                                        return annotation;
                                    });
                                };
                            }
                        }, {
                            key: 'editAnnotation',
                            get: function get() {
                                return this.__editAnnotation;
                            },
                            set: function set(fn) {
                                this.__editAnnotation = function editAnnotation(documentId, annotationId, annotation) {
                                    return fn.apply(undefined, arguments).then(function(annotation) {
                                        (0, _event.fireEvent)('annotation:edit', documentId, annotationId, annotation);
                                        return annotation;
                                    });
                                };
                            }
                        }, {
                            key: 'deleteAnnotation',
                            get: function get() {
                                return this.__deleteAnnotation;
                            },
                            set: function set(fn) {
                                this.__deleteAnnotation = function deleteAnnotation(documentId, annotationId) {
                                    return fn.apply(undefined, arguments).then(function(success) {
                                        if (success) {
                                            (0, _event.fireEvent)('annotation:delete', documentId, annotationId);
                                        }
                                        return success;
                                    });
                                };
                            }
                        }, {
                            key: 'addComment',
                            get: function get() {
                                return this.__addComment;
                            },
                            set: function set(fn) {
                                this.__addComment = function addComment(documentId, annotationId, content) {
                                    return fn.apply(undefined, arguments).then(function(comment) {
                                        (0, _event.fireEvent)('comment:add', documentId, annotationId, comment);
                                        return comment;
                                    });
                                };
                            }
                        }, {
                            key: 'editComment',
                            get: function get() {
                                return this.__editComment;
                            },
                            set: function set(fn) {
                                this.__editComment = function editComment(documentId, commentId) {
                                    return fn.apply(undefined, arguments).then(function(success) {
                                        if (success) {
                                            (0, _event.fireEvent)('comment:edit', documentId, commentId);
                                        }
                                        return success;
                                    });
                                };
                            }
                        }, {
                            key: 'deleteComment',
                            get: function get() {
                                return this.__deleteComment;
                            },
                            set: function set(fn) {
                                this.__deleteComment = function deleteComment(documentId, annotationId, commentId) {
                                    return fn.apply(undefined, arguments).then(function(success) {
                                        if (success) {
                                            (0, _event.fireEvent)('comment:delete', documentId, annotationId, commentId);
                                        }
                                        return success;
                                    });
                                };
                            }
                        }]);
                        return StoreAdapter;
                    }();
                    exports.default = StoreAdapter;
                    module.exports = exports['default']; /***/
                }, /* 3 */ function(module, exports) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = abstractFunction;
                    /**
                     * Throw an Error for an abstract function that hasn't been implemented.
                     *
                     * @param {String} name The name of the abstract function
                     */
                    function abstractFunction(name) {
                        throw new Error(name + ' is not implemented');
                    }
                    module.exports = exports['default']; /***/
                }, /* 4 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.fireEvent = fireEvent;
                    exports.addEventListener = addEventListener;
                    exports.removeEventListener = removeEventListener;
                    var _events = __webpack_require__(5);
                    var _events2 = _interopRequireDefault(_events);
                    var _utils = __webpack_require__(6);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    var emitter = new _events2.default();
                    var clickNode = void 0;
                    /**
                     * Handle document.click event
                     *
                     * @param {Event} e The DOM event to be handled
                     */
                    document.addEventListener('click', function(e) {
                        // console.log(7887);
                        if (!$('.toolbar .cursor').hasClass('active')) {
                            return;
                        }
                        if (!(0, _utils.findSVGAtPoint)(e.clientX, e.clientY)) {
                            return;
                        }
                        var target = (0, _utils.findAnnotationAtPoint)(e.clientX, e.clientY); // Emit annotation:blur if clickNode is no longer clicked
                        if (clickNode && clickNode !== target) {
                            emitter.emit('annotation:blur', clickNode);
                        } // Emit annotation:click if target was clicked
                        if (target) {
                            emitter.emit('annotation:click', target);
                            clickNode = target;
                        }
                    });

                    function fireEvent() {
                        emitter.emit.apply(emitter, arguments);
                    };

                    function addEventListener() {
                        emitter.on.apply(emitter, arguments);
                    };

                    function removeEventListener() {
                        emitter.removeListener.apply(emitter, arguments);
                    }; /***/
                }, /* 5 */ function(module, exports) { // Copyright Joyent, Inc. and other Node contributors.
                    //

                    function EventEmitter() {
                        this._events = this._events || {};
                        this._maxListeners = this._maxListeners || undefined;
                    }
                    module.exports = EventEmitter; // Backwards-compat with node 0.10.x
                    EventEmitter.EventEmitter = EventEmitter;
                    EventEmitter.prototype._events = undefined;
                    EventEmitter.prototype._maxListeners = undefined;
                    /*
                    By default EventEmitters will print a warning if more than 10 listeners are
                    added to it. This is a useful default which helps finding memory leaks.
                    EventEmitter.defaultMaxListeners = 10; // Obviously not all Emitters should be limited to 10. This function allows
                    that to be increased. Set to zero for unlimited.
                    */

                    EventEmitter.prototype.setMaxListeners = function(n) {
                        if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
                        this._maxListeners = n;
                        return this;
                    };
                    EventEmitter.prototype.emit = function(type) {
                        var er, handler, len, args, i, listeners;
                        if (!this._events) this._events = {}; // If there is no 'error' event listener then throw.
                        if (type === 'error') {
                            if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
                                er = arguments[1];
                                if (er instanceof Error) {
                                    throw er; // Unhandled 'error' event
                                }
                                throw TypeError('Uncaught, unspecified "error" event.');
                            }
                        }
                        handler = this._events[type];
                        if (isUndefined(handler)) return false;
                        if (isFunction(handler)) {
                            switch (arguments.length) { // fast cases
                                case 1:
                                    handler.call(this);
                                    break;
                                case 2:
                                    handler.call(this, arguments[1]);
                                    break;
                                case 3:
                                    handler.call(this, arguments[1], arguments[2]);
                                    break; // slower
                                default:
                                    args = Array.prototype.slice.call(arguments, 1);
                                    handler.apply(this, args);
                            }
                        } else if (isObject(handler)) {
                            args = Array.prototype.slice.call(arguments, 1);
                            listeners = handler.slice();
                            len = listeners.length;
                            for (i = 0; i < len; i++) {
                                listeners[i].apply(this, args);
                            }
                        }
                        return true;
                    };
                    EventEmitter.prototype.addListener = function(type, listener) {
                        var m;
                        if (!isFunction(listener)) throw TypeError('listener must be a function');
                        if (!this._events) this._events = {}; // To avoid recursion in the case that type === "newListener"! Before
                        // adding it to the listeners, first emit "newListener".
                        if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
                        if (!this._events[type]) // Optimize the case of one listener. Don't need the extra array object.
                            this._events[type] = listener;
                        else if (isObject(this._events[type])) // If we've already got an array, just append.
                            this._events[type].push(listener);
                        else // Adding the second element, need to change to array.
                            this._events[type] = [this._events[type], listener]; // Check for listener leak
                        if (isObject(this._events[type]) && !this._events[type].warned) {
                            if (!isUndefined(this._maxListeners)) {
                                m = this._maxListeners;
                            } else {
                                m = EventEmitter.defaultMaxListeners;
                            }
                            if (m && m > 0 && this._events[type].length > m) {
                                this._events[type].warned = true;
                                console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
                                if (typeof console.trace === 'function') { // not supported in IE 10
                                    console.trace();
                                }
                            }
                        }
                        return this;
                    };
                    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
                    EventEmitter.prototype.once = function(type, listener) {
                        if (!isFunction(listener)) throw TypeError('listener must be a function');
                        var fired = false;

                        function g() {
                            this.removeListener(type, g);
                            if (!fired) {
                                fired = true;
                                listener.apply(this, arguments);
                            }
                        }
                        g.listener = listener;
                        this.on(type, g);
                        return this;
                    }; // emits a 'removeListener' event iff the listener was removed
                    EventEmitter.prototype.removeListener = function(type, listener) {
                        var list, position, length, i;
                        if (!isFunction(listener)) throw TypeError('listener must be a function');
                        if (!this._events || !this._events[type]) return this;
                        list = this._events[type];
                        length = list.length;
                        position = -1;
                        if (list === listener || isFunction(list.listener) && list.listener === listener) {
                            delete this._events[type];
                            if (this._events.removeListener) this.emit('removeListener', type, listener);
                        } else if (isObject(list)) {
                            for (i = length; i-- > 0;) {
                                if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                                    position = i;
                                    break;
                                }
                            }
                            if (position < 0) return this;
                            if (list.length === 1) {
                                list.length = 0;
                                delete this._events[type];
                            } else {
                                list.splice(position, 1);
                            }
                            if (this._events.removeListener) this.emit('removeListener', type, listener);
                        }
                        return this;
                    };
                    EventEmitter.prototype.removeAllListeners = function(type) {
                        var key, listeners;
                        if (!this._events) return this; // not listening for removeListener, no need to emit
                        if (!this._events.removeListener) {
                            if (arguments.length === 0) this._events = {};
                            else if (this._events[type]) delete this._events[type];
                            return this;
                        } // emit removeListener for all listeners on all events
                        if (arguments.length === 0) {
                            for (key in this._events) {
                                if (key === 'removeListener') continue;
                                this.removeAllListeners(key);
                            }
                            this.removeAllListeners('removeListener');
                            this._events = {};
                            return this;
                        }
                        listeners = this._events[type];
                        if (isFunction(listeners)) {
                            this.removeListener(type, listeners);
                        } else if (listeners) { // LIFO order
                            while (listeners.length) {
                                this.removeListener(type, listeners[listeners.length - 1]);
                            }
                        }
                        delete this._events[type];
                        return this;
                    };
                    EventEmitter.prototype.listeners = function(type) {
                        var ret;
                        if (!this._events || !this._events[type]) ret = [];
                        else if (isFunction(this._events[type])) ret = [this._events[type]];
                        else ret = this._events[type].slice();
                        return ret;
                    };
                    EventEmitter.prototype.listenerCount = function(type) {
                        if (this._events) {
                            var evlistener = this._events[type];
                            if (isFunction(evlistener)) return 1;
                            else if (evlistener) return evlistener.length;
                        }
                        return 0;
                    };
                    EventEmitter.listenerCount = function(emitter, type) {
                        return emitter.listenerCount(type);
                    };

                    function isFunction(arg) {
                        return typeof arg === 'function';
                    }

                    function isNumber(arg) {
                        return typeof arg === 'number';
                    }

                    function isObject(arg) {
                        return (typeof arg === 'undefined' ? 'undefined' : _typeof2(arg)) === 'object' && arg !== null;
                    }

                    function isUndefined(arg) {
                        return arg === void 0;
                    } /***/
                }, /* 6 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.BORDER_COLOR = undefined;
                    exports.findSVGContainer = findSVGContainer;
                    exports.findSVGAtPoint = findSVGAtPoint;
                    exports.findAnnotationAtPoint = findAnnotationAtPoint;
                    exports.pointIntersectsRect = pointIntersectsRect;
                    exports.getOffsetAnnotationRect = getOffsetAnnotationRect;
                    exports.getAnnotationRect = getAnnotationRect;
                    exports.scaleUp = scaleUp;
                    exports.scaleDown = scaleDown;
                    exports.getScroll = getScroll;
                    exports.getOffset = getOffset;
                    exports.disableUserSelect = disableUserSelect;
                    exports.enableUserSelect = enableUserSelect;
                    exports.getMetadata = getMetadata;
                    var _createStylesheet = __webpack_require__(7);
                    var _createStylesheet2 = _interopRequireDefault(_createStylesheet);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    var BORDER_COLOR = exports.BORDER_COLOR = '#00BFFF';
                    var userSelectStyleSheet = (0, _createStylesheet2.default)({
                        body: {
                            '-webkit-user-select': 'none',
                            '-moz-user-select': 'none',
                            '-ms-user-select': 'none',
                            'user-select': 'none'
                        }
                    });
                    userSelectStyleSheet.setAttribute('data-pdf-annotate-user-select', 'true');
                    /**
                     * Find the SVGElement that contains all the annotations for a page
                     *
                     * @param {Element} node An annotation within that container
                     * @return {SVGElement} The container SVG or null if it can't be found
                     */
                    function findSVGContainer(node) {
                        var parentNode = node;
                        while ((parentNode = parentNode.parentNode) && parentNode !== document) {
                            if (parentNode.nodeName.toUpperCase() === 'SVG' && parentNode.getAttribute('data-pdf-annotate-container') === 'true') {
                                return parentNode;
                            }
                        }
                        return null;
                    }
                    /**
                     * Find an SVGElement container at a given point
                     *
                     * @param {Number} x The x coordinate of the point
                     * @param {Number} y The y coordinate of the point
                     * @return {SVGElement} The container SVG or null if one can't be found
                     */
                    function findSVGAtPoint(x, y) {
                        var elements = document.querySelectorAll('svg[data-pdf-annotate-container="true"]');
                        for (var i = 0, l = elements.length; i < l; i++) {
                            var el = elements[i];
                            var rect = el.getBoundingClientRect();
                            if (pointIntersectsRect(x, y, rect)) {
                                return el;
                            }
                        }
                        return null;
                    }
                    /**
                     * Find an Element that represents an annotation at a given point
                     *
                     * @param {Number} x The x coordinate of the point
                     * @param {Number} y The y coordinate of the point
                     * @return {Element} The annotation element or null if one can't be found
                     */
                    function findAnnotationAtPoint(x, y) {
                        var svg = findSVGAtPoint(x, y);
                        if (!svg) {
                            return;
                        }
                        var elements = svg.querySelectorAll('[data-pdf-annotate-type]'); // Find a target element within SVG
                        for (var i = 0, l = elements.length; i < l; i++) {
                            var el = elements[i];
                            if (pointIntersectsRect(x, y, getOffsetAnnotationRect(el))) {
                                return el;
                            }
                        }
                        return null;
                    }

                    /**
                     * Determine if a point intersects a rect
                     *
                     * @param {Number} x The x coordinate of the point
                     * @param {Number} y The y coordinate of the point
                     * @param {Object} rect The points of a rect (likely from getBoundingClientRect)
                     * @return {Boolean} True if a collision occurs, otherwise false
                     */
                    function pointIntersectsRect(x, y, rect) {
                        return y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right;
                    }
                    /**
                     * Get the rect of an annotation element accounting for offset.
                     *
                     * @param {Element} el The element to get the rect of
                     * @return {Object} The dimensions of the element
                     */
                    function getOffsetAnnotationRect(el) {
                        var rect = getAnnotationRect(el);
                        var _getOffset = getOffset(el);
                        var offsetLeft = _getOffset.offsetLeft;
                        var offsetTop = _getOffset.offsetTop;
                        return {
                            top: rect.top + offsetTop,
                            left: rect.left + offsetLeft,
                            right: rect.right + offsetLeft,
                            bottom: rect.bottom + offsetTop
                        };
                    }
                    /**
                     * Get the rect of an annotation element.
                     *
                     * @param {Element} el The element to get the rect of
                     * @return {Object} The dimensions of the element
                     */
                    function getAnnotationRect(el) {
                        var h = 0,
                            w = 0,
                            x = 0,
                            y = 0;
                        var rect = el.getBoundingClientRect(); // TODO this should be calculated somehow
                        var LINE_OFFSET = 16;
                        switch (el.nodeName.toLowerCase()) {
                            case 'path':
                                var minX = void 0,
                                    maxX = void 0,
                                    minY = void 0,
                                    maxY = void 0;
                                el.getAttribute('d').replace(/Z/, '').split('M').splice(1).forEach(function(p) {
                                    var s = p.split(' ').map(function(i) {
                                        return parseInt(i, 10);
                                    });
                                    if (typeof minX === 'undefined' || s[0] < minX) {
                                        minX = s[0];
                                    }
                                    if (typeof maxX === 'undefined' || s[2] > maxX) {
                                        maxX = s[2];
                                    }
                                    if (typeof minY === 'undefined' || s[1] < minY) {
                                        minY = s[1];
                                    }
                                    if (typeof maxY === 'undefined' || s[3] > maxY) {
                                        maxY = s[3];
                                    }
                                });
                                h = maxY - minY;
                                w = maxX - minX;
                                x = minX;
                                y = minY;
                                break;
                            case 'line':
                                h = parseInt(el.getAttribute('y2'), 10) - parseInt(el.getAttribute('y1'), 10);
                                w = parseInt(el.getAttribute('x2'), 10) - parseInt(el.getAttribute('x1'), 10);
                                x = parseInt(el.getAttribute('x1'), 10);
                                y = parseInt(el.getAttribute('y1'), 10);
                                if (h === 0) {
                                    h += LINE_OFFSET;
                                    y -= LINE_OFFSET / 2;
                                }
                                break;
                            case 'text':
                                h = rect.height;
                                w = rect.width;
                                x = parseInt(el.getAttribute('x'), 10);
                                y = parseInt(el.getAttribute('y'), 10) - h;
                                break;
                            case 'g':
                                var _getOffset2 = getOffset(el);
                                var offsetLeft = _getOffset2.offsetLeft;
                                var offsetTop = _getOffset2.offsetTop;
                                h = rect.height;
                                w = rect.width;
                                x = rect.left - offsetLeft;
                                y = rect.top - offsetTop;
                                if (el.getAttribute('data-pdf-annotate-type') === 'strikeout') {
                                    h += LINE_OFFSET;
                                    y -= LINE_OFFSET / 2;
                                } else if (el.getAttribute('data-pdf-annotate-type') === 'underline') {
                                    h += LINE_OFFSET;
                                    y -= LINE_OFFSET - 2;
                                }
                                break;
                            case 'rect':
                            case 'svg':
                                h = parseInt(el.getAttribute('height'), 10);
                                w = parseInt(el.getAttribute('width'), 10);
                                x = parseInt(el.getAttribute('x'), 10);
                                y = parseInt(el.getAttribute('y'), 10);
                                break;
                        } // Result provides same properties as getBoundingClientRect
                        var result = {
                            top: y,
                            left: x,
                            width: w,
                            height: h,
                            right: x + w,
                            bottom: y + h
                        }; // For the case of nested SVG (point annotations) and grouped
                        // lines or rects no adjustment needs to be made for scale.
                        // I assume that the scale is already being handled
                        // natively by virtue of the "transform" attribute.
                        if (!['svg', 'g'].includes(el.nodeName.toLowerCase())) {
                            result = scaleUp(findSVGAtPoint(rect.left, rect.top), result);
                        }
                        return result;
                    }
                    /**
                     * Adjust scale from normalized scale (100%) to rendered scale.
                     *
                     * @param {SVGElement} svg The SVG to gather metadata from
                     * @param {Object} rect A map of numeric values to scale
                     * @return {Object} A copy of "rect" with values scaled up
                     */
                    function scaleUp(svg, rect) {
                        var result = {};
                        var _getMetadata = getMetadata(svg);
                        var viewport = _getMetadata.viewport;
                        Object.keys(rect).forEach(function(key) {
                            result[key] = rect[key] * viewport.scale;
                        });
                        return result;
                    }
                    /**
                     * Adjust scale from rendered scale to a normalized scale (100%).
                     *
                     * @param {SVGElement} svg The SVG to gather metadata from
                     * @param {Object} rect A map of numeric values to scale
                     * @return {Object} A copy of "rect" with values scaled down
                     */
                    function scaleDown(svg, rect) {
                        var result = {};
                        var _getMetadata2 = getMetadata(svg);
                        var viewport = _getMetadata2.viewport;
                        Object.keys(rect).forEach(function(key) {
                            result[key] = rect[key] / viewport.scale;
                        });
                        return result;
                    }
                    /**
                     * Get the scroll position of an element, accounting for parent elements
                     *
                     * @param {Element} el The element to get the scroll position for
                     * @return {Object} The scrollTop and scrollLeft position
                     */
                    function getScroll(el) {
                        var scrollTop = 0;
                        var scrollLeft = 0;
                        var parentNode = el;
                        while ((parentNode = parentNode.parentNode) && parentNode !== document) {
                            scrollTop += parentNode.scrollTop;
                            scrollLeft += parentNode.scrollLeft;
                        }
                        return {
                            scrollTop: scrollTop,
                            scrollLeft: scrollLeft
                        };
                    }
                    /**
                     * Get the offset position of an element, accounting for parent elements
                     *
                     * @param {Element} el The element to get the offset position for
                     * @return {Object} The offsetTop and offsetLeft position
                     */
                    function getOffset(el) {
                        var parentNode = el;
                        while ((parentNode = parentNode.parentNode) && parentNode !== document) {
                            if (parentNode.nodeName.toUpperCase() === 'SVG') {
                                break;
                            }
                        }
                        var rect = parentNode.getBoundingClientRect();
                        return {
                            offsetLeft: rect.left,
                            offsetTop: rect.top
                        };
                    }
                    /**
                     * Disable user ability to select text on page
                     */
                    function disableUserSelect() {
                        if (!userSelectStyleSheet.parentNode) {
                            document.head.appendChild(userSelectStyleSheet);
                        }
                    }
                    /**
                     * Enable user ability to select text on page
                     */
                    function enableUserSelect() {
                        if (userSelectStyleSheet.parentNode) {
                            userSelectStyleSheet.parentNode.removeChild(userSelectStyleSheet);
                        }
                    }
                    /**
                     * Get the metadata for a SVG container
                     *
                     * @param {SVGElement} svg The SVG container to get metadata for
                     */
                    function getMetadata(svg) {
                        return {
                            documentId: svg.getAttribute('data-pdf-annotate-document'),
                            pageNumber: parseInt(svg.getAttribute('data-pdf-annotate-page'), 10),
                            viewport: JSON.parse(svg.getAttribute('data-pdf-annotate-viewport'))
                        };
                    } /***/
                }, /* 7 */ function(module, exports) {
                    module.exports = function createStyleSheet(blocks) {
                        var style = document.createElement('style');
                        var text = Object.keys(blocks).map(function(selector) {
                            return processRuleSet(selector, blocks[selector]);
                        }).join('\n');
                        style.setAttribute('type', 'text/css');
                        style.appendChild(document.createTextNode(text));
                        return style;
                    };

                    function processRuleSet(selector, block) {
                        return selector + ' {\n' + processDeclarationBlock(block) + '\n}';
                    }

                    function processDeclarationBlock(block) {
                        return Object.keys(block).map(function(prop) {
                            return processDeclaration(prop, block[prop]);
                        }).join('\n');
                    }

                    function processDeclaration(prop, value) {
                        if (!isNaN(value) && value != 0) {
                            value = value + 'px';
                        }
                        return hyphenate(prop) + ': ' + value + ';';
                    }

                    function hyphenate(prop) {
                        return prop.replace(/[A-Z]/g, function(match) {
                            return '-' + match.toLowerCase();
                        });
                    } /***/
                }, /* 8 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _uuid = __webpack_require__(9);
                    var _uuid2 = _interopRequireDefault(_uuid);
                    var _StoreAdapter2 = __webpack_require__(2);
                    var _StoreAdapter3 = _interopRequireDefault(_StoreAdapter2);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }

                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) {
                            throw new TypeError("Cannot call a class as a function");
                        }
                    }

                    function _possibleConstructorReturn(self, call) {
                        if (!self) {
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        }
                        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
                    }

                    function _inherits(subClass, superClass) {
                        if (typeof superClass !== "function" && superClass !== null) {
                            throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
                        }
                        subClass.prototype = Object.create(superClass && superClass.prototype, {
                            constructor: {
                                value: subClass,
                                enumerable: false,
                                writable: true,
                                configurable: true
                            }
                        });
                        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
                    } // StoreAdapter for working with localStorage
                    // This is ideal for testing, examples, and prototyping

                    var LocalStoreAdapter = function(_StoreAdapter) {
                        _inherits(LocalStoreAdapter, _StoreAdapter);

                        function updateAnnotationColor(annotationId, aType, aColor) {
                            var nodes = document.querySelectorAll('[data-pdf-annotate-id="' + annotationId + '"]');
                            nodes.forEach(function(n) {
                                var prop_to_change = false;
                                switch (aType) {
                                    case 'strikeout':
                                    case 'underline':
                                        prop_to_change = 'stroke';
                                        break;
                                    case 'highlight':
                                        prop_to_change = 'fill';
                                        break;
                                    case 'drawing':
                                        if (aColor.indexOf('#') == -1)
                                            aColor = '#' + aColor;
                                        $(n).attr('stroke', aColor);
                                        prop_to_change = 'fill';
                                        break;
                                }
                                if (prop_to_change) {
                                    $(n).attr(prop_to_change, '#' + aColor);
                                }
                            });
                        }

                        function LocalStoreAdapter() {
                            _classCallCheck(this, LocalStoreAdapter);
                            return _possibleConstructorReturn(this, Object.getPrototypeOf(LocalStoreAdapter).call(this, {
                                getAnnotations: function getAnnotations(documentId, pageNumber) {
                                    return new Promise(function(resolve, reject) {
                                        var annotations = _getAnnotations(documentId).filter(function(i) {
                                            return i.page === pageNumber && (i.uid == annotation_user_m2.id || (i.type == 'point' && !i.sub_type));
                                        });
                                        // if(pageNumber == 1)
                                        // console.log(annotations);
                                        resolve({
                                            documentId: documentId,
                                            pageNumber: pageNumber,
                                            annotations: annotations
                                        });
                                    });
                                },
                                getCommentAnnotations: function(documentId, sub_type) {
                                    return new Promise(function(resolve, reject) {
                                        var annotations = _getAnnotations(documentId).filter(function(i) {
                                            return i.type == 'point' && (i.uid == annotation_user_m2.id || !i.sub_type);
                                        });
                                        resolve({
                                            documentId: documentId,
                                            annotations: annotations
                                        });
                                    });
                                },
                                getPointAnnotations: function(documentId, sub_type) {
                                    return new Promise(function(resolve, reject) {
                                        var annotations = _getAnnotations(documentId);
                                        annotations = annotations.filter(function(i) {
                                            if (sub_type)
                                                return i.type == 'point' && i.uid == annotation_user_m2.id && i.sub_type;
                                            else
                                                return i.type == 'point' && !i.sub_type;
                                        });
                                        resolve({
                                            documentId: documentId,
                                            annotations: annotations
                                        });
                                    });
                                },
                                getCommentPoints: function(documentId) {
                                    return this.getCommentAnnotations(documentId)
                                },
                                getNotePoints: function(documentId) {
                                    return this.getCommentAnnotations(documentId, sub_type)
                                },
                                getAnnotation: function getAnnotation(documentId, annotationId) {
                                    return Promise.resolve(_getAnnotations(documentId)[findAnnotation(documentId, annotationId)]);
                                },
                                addAnnotation: function addAnnotation(documentId, pageNumber, annotation) {
                                    return new Promise(function(resolve, reject) {
                                        if (typeof annotation.type != 'string') {
                                            console.log("Invalid annotation", annotation);
                                            //console.trace();
                                            return;
                                        }

                                        if (!annotation_user_m2.id) {
                                            bootbox.alert("No user Id given");
                                            return;
                                        }
                                        annotation.class = 'Annotation';
                                        annotation.uuid = (0, _uuid2.default)();
                                        annotation.page = pageNumber;
                                        annotation.date_time = new Date();
                                        if (!annotation_user_m2.id) {
                                            console.log("oops no user id");
                                            return;
                                        }
                                        annotation.uid = annotation_user_m2.id;                                        
                                        addAnnotationLocal(documentId, annotation);
                                        resolve(annotation);
                                    });
                                },
                                editAnnotation: function editAnnotation(documentId, annotationId, annotation) {
                                    return new Promise(function(resolve, reject) {
                                        if(!annotation){
                                            console.log('Invalid annotation in edit');
                                            resolve({});
                                            return;
                                        }
                                        var annotations = _getAnnotations(documentId);
                                        var annotationIndex = findAnnotation(documentId, annotationId);
                                        annotations[annotationIndex] = annotation;
                                        var is_comment = 'op=edit point'
                                        if (annotation.type == 'point' && !annotation.sub_type) {
                                            is_comment = 'op=point moved';
                                        }                                        
                                        updateAnnotations(documentId, annotations, is_comment);
                                        updateAnnotationColor(annotationId, annotation.type, annotation.color);
                                        resolve(annotation);
                                    });
                                },
                                deleteAnnotation: function deleteAnnotation(documentId, annotationId) {
                                    return new Promise(function(resolve, reject) {
                                        var index = findAnnotation(documentId, annotationId);
                                        if (index > -1) {
                                            var annotations = _getAnnotations(documentId);
                                            var annotation = annotations[index];
                                            if (annotation.type == 'point' && !annotation.sub_type) {
                                                resolve(true);
                                            }
                                            else{
                                                annotations.splice(index, 1);
                                                updateAnnotations(documentId, annotations, 'op=delete');
                                            }
                                        }
                                        resolve(true);
                                    });
                                },
                                getComments: function getComments(documentId, annotationId) {
                                    return new Promise(function(resolve, reject) {
                                        var all_annotaions = _getAnnotations(documentId);
                                        var points = all_annotaions.filter(function(i) {
                                            return i.uuid === annotationId;
                                        });
                                        var comments_array = [];
                                        if (Array.isArray(points) && points.length > 0) {
                                            comments_array = points[0].comments;
                                        } else {
                                            comments_array = [];
                                        }
                                        if (!Array.isArray(comments_array))
                                            comments_array = [];
                                        resolve(comments_array);
                                    });
                                },
                                getAllComments: function getComments(documentId) {
                                    return new Promise(function(resolve, reject) {
                                        var points = _getAnnotations(documentId).filter(function(i) {
                                            return i.type === 'point';
                                        }).sort(function(a, b) {
                                            return a["page"] - b["page"] || a["y"] - b["y"] || a["x"] - b["x"];
                                        });
                                        resolve(points || []);
                                    });
                                },
                                addComment: function addComment(documentId, annotationId, values, received_comment) {
                                    return new Promise(function(resolve, reject) {
                                        if (!annotationId) {
                                            console.log("Comment not added because, no active annotationId");
                                            return;
                                        }
                                        var comment = {
                                            class: 'Comment',
                                            uuid: (0, _uuid2.default)(),
                                            point_id: annotationId,
                                            content: values.content,
                                            uid: values.uid,
                                            user_name: values.user_name,
                                            user: {
                                                image: values.user_image
                                            },
                                            date_time: values.date_time,
                                        };
                                        var doc_info = documentId.split('-');
                                        var input_data = {
                                            doc_type: doc_info[0],
                                            document_id: doc_info[1],
                                            comment_doc_name: comment_doc_id,
                                        };
                                        // console.log(input_data);

                                        var annotations = _getAnnotations(documentId);
                                        var point = {};

                                        var index = -1;
                                        for (var i in annotations) {
                                            if (annotations[i].uuid == annotationId) {
                                                index = i;
                                                var annotation = annotations[i];
                                                for (var key in annotation) {
                                                    if (key != 'comments') {
                                                        point[key] = annotation[key];
                                                    }
                                                }
                                                break;
                                            }
                                        }
                                        if (index == -1) {
                                            console.log("Annotation not found " + annotationId);
                                            return;
                                        }
                                        if (!annotations[index].comments) {
                                            annotations[index].comments = [comment];
                                        } else {
                                            annotations[index].comments.push(comment);
                                        }
                                        // console.log(comment);
                                        point.comment = comment;
                                        point.doc_id = documentId;
                                        point.document_id = doc_info[1];
                                        point.comment_doc_id = comment_doc_id;
                                        input_data['point'] = point;
                                        input_data['mentioned_list'] = mention_list;
                                        var is_comment = point.sub_type != 'personal';
                                        if (is_comment && !received_comment) {
                                            var args = {
                                                app: 'documents',
                                                model: 'CommentAnnotation',
                                                method: 'save_comment',
                                            }
                                            var options = {
                                                args: args,
                                                params: input_data
                                            }
                                            dn_rpc_object({
                                                data: options,
                                                no_loader: 1,
                                                onSuccess: function(annotaions_data) {
                                                    mention_list = [];
                                                    console.log('comment saved')
                                                }
                                            });
                                            setTimeout(function() {
                                                $('.comment-list-container:first').scrollTop(9999);
                                            }, 10);
                                        }
                                        updateAnnotations(documentId, annotations, 'op=add comment');
                                        resolve(comment);
                                    });
                                },

                                editComment: function editComment(documentId, uuid, annotationId, content) {
                                    return new Promise(function(resolve, reject) {
                                        var annotations = _getAnnotations(documentId);
                                        for (var i = 0; i < annotations.length; i++) {
                                            if (annotationId === annotations[i].annotation && uuid === annotations[i].uuid) {
                                                annotations[i].content = content;
                                            }
                                        }
                                        alert('Should never be called')
                                        updateAnnotations(documentId, annotations, 'op=edit comment');
                                        resolve(true);
                                    });
                                },
                                deleteComment: function deleteComment(documentId, annotationId, commentId) {
                                    return new Promise(function(resolve, reject) {
                                        _getAnnotations(documentId);
                                        var index = -1;
                                        var annotations = _getAnnotations(documentId);
                                        for (var i = 0, l = annotations.length; i < l; i++) {
                                            if (annotations[i].uuid === commentId) {
                                                index = i;
                                                break;
                                            }
                                        }
                                        if (index > -1) {
                                            annotations.splice(index, 1);
                                            alert('should never be called')
                                            updateAnnotations(documentId, annotations, 'op=delete comment');
                                        }
                                        resolve(true);
                                    });
                                }
                            }));
                        }
                        return LocalStoreAdapter;
                    }(_StoreAdapter3.default);
                    exports.default = LocalStoreAdapter;

                    function findAnnotation(documentId, annotationId) {
                        return findAnnotationLocal(documentId, annotationId);
                    }
                    module.exports = exports['default']; /***/
                }, /* 9 */ function(module, exports) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = uuid;
                    var REGEXP = /[xy]/g;
                    var PATTERN = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

                    function replacement(c) {
                        var r = Math.random() * 16 | 0;
                        var v = c == 'x' ? r : r & 0x3 | 0x8;
                        return v.toString(16);
                    }
                    /**
                     * Generate a univierally unique identifier
                     *
                     * @return {String}
                     */
                    function uuid() {
                        return PATTERN.replace(REGEXP, replacement);
                    }
                    module.exports = exports['default']; /***/
                }, /* 10 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = render;
                    var _PDFJSAnnotate = __webpack_require__(1);
                    var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);
                    var _appendChild = __webpack_require__(11);
                    var _appendChild2 = _interopRequireDefault(_appendChild);
                    var _renderScreenReaderHints = __webpack_require__(20);
                    var _renderScreenReaderHints2 = _interopRequireDefault(_renderScreenReaderHints);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    /**
                     * Render the response from PDFJSAnnotate.getStoreAdapter().getAnnotations to SVG
                     *
                     * @param {SVGElement} svg The SVG element to render the annotations to
                     * @param {Object} viewport The page viewport data
                     * @param {Object} data The response from PDFJSAnnotate.getStoreAdapter().getAnnotations
                     * @return {Promise} Settled once rendering has completed
                     *  A settled Promise will be either:
                     *    - fulfilled: SVGElement
                     *    - rejected: Error
                     */
                    function render(svg, viewport, data) {

                        return new Promise(function(resolve, reject) { // Reset the content of the SVG
                            svg.innerHTML = '';
                            svg.setAttribute('data-pdf-annotate-container', true);
                            svg.setAttribute('data-pdf-annotate-viewport', JSON.stringify(viewport));
                            svg.removeAttribute('data-pdf-annotate-document');
                            svg.removeAttribute('data-pdf-annotate-page'); // If there's no data nothing can be done
                            if (!data) {
                                return resolve(svg);
                            }
                            svg.setAttribute('data-pdf-annotate-document', data.documentId);
                            svg.setAttribute('data-pdf-annotate-page', data.pageNumber); // Make sure annotations is an array
                            if (!Array.isArray(data.annotations) || data.annotations.length === 0) {
                                return resolve(svg);
                            } // Append annotation to svg
                            data.annotations.forEach(function(a) {
                                (0, _appendChild2.default)(svg, a, viewport);
                            });
                            resolve(svg);
                        });
                    }
                    module.exports = exports['default']; /***/
                }, /* 11 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = appendChild;
                    var _renderLine = __webpack_require__(13);
                    var _renderLine2 = _interopRequireDefault(_renderLine);
                    var _renderPath = __webpack_require__(16);
                    var _renderPath2 = _interopRequireDefault(_renderPath);
                    var _renderPoint = __webpack_require__(17);
                    var _renderPoint2 = _interopRequireDefault(_renderPoint);
                    var _renderRect = __webpack_require__(18);
                    var _renderRect2 = _interopRequireDefault(_renderRect);
                    var _renderText = __webpack_require__(19);
                    var _renderText2 = _interopRequireDefault(_renderText);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    var isFirefox = /firefox/i.test(navigator.userAgent);
                    /**
                     * Get the x/y translation to be used for transforming the annotations
                     * based on the rotation of the viewport.
                     *
                     * @param {Object} viewport The viewport data from the page
                     * @return {Object}
                     */
                    function getTranslation(viewport) {
                        var x = void 0;
                        var y = void 0; // Modulus 360 on the rotation so that we only
                        var viewport_rotation = viewport.rotation % 360;
                        if (viewport_rotation < 0)
                            viewport_rotation += 360;

                        switch (viewport_rotation) {
                            case 0:
                                x = y = 0;
                                break;
                            case 90:
                                x = 0;
                                y = viewport.width / viewport.scale * -1;
                                break;
                            case 180:
                                x = viewport.width / viewport.scale * -1;
                                y = viewport.height / viewport.scale * -1;
                                break;
                            case 270:
                                x = viewport.height / viewport.scale * -1;
                                y = 0;
                                break;
                        }
                        return {
                            x: x,
                            y: y
                        };
                    }
                    /**
                     * Transform the rotation and scale of a node using SVG's native transform attribute.
                     *
                     * @param {Node} node The node to be transformed
                     * @param {Object} viewport The page's viewport data
                     * @return {Node}
                     */
                    function transform(node, viewport) {
                        var trans = getTranslation(viewport);
                        var scale_rotate = 'scale(' + viewport.scale + ')';
                        scale_rotate += ' rotate(' + viewport.rotation + ')';
                        scale_rotate += ' translate(' + trans.x + ', ' + trans.y + ')';
                        node.setAttribute('transform', scale_rotate);
                        if (!isFirefox && node.nodeName.toLowerCase() === 'svg') {
                            node.setAttribute('x', parseInt(node.getAttribute('x'), 10) * viewport.scale);
                            node.setAttribute('y', parseInt(node.getAttribute('y'), 10) * viewport.scale);
                            var x = parseInt(node.getAttribute('x', 10));
                            var y = parseInt(node.getAttribute('y', 10));
                            var width = parseInt(node.getAttribute('width'), 10);
                            var height = parseInt(node.getAttribute('height'), 10);
                            var path = node.querySelector('path');
                            var arr = [node];
                            var svgs = node.querySelector('svg');
                            var paths = node.querySelector('path')
                            var rects = node.querySelector('rect');
                            var gs = node.querySelector('g');
                            if (svgs)
                                arr.push(svgs);
                            if (paths)
                                arr.push(paths);
                            if (rects)
                                arr.push(rects);
                            if (gs)
                                arr.push(gs);

                            var viewport_rotation = viewport.rotation % 360;
                            if (viewport_rotation < 0)
                                viewport_rotation += 360;

                            switch (viewport_rotation) {
                                case 90:
                                    node.setAttribute('x', viewport.width - y - width);
                                    node.setAttribute('y', x);
                                    if (svgs) {
                                        svgs.setAttribute('x', 1);
                                        svgs.setAttribute('y', 0);
                                    }

                                    break;
                                case 180:
                                    node.setAttribute('x', viewport.width - x - width);
                                    node.setAttribute('y', viewport.height - y - height);
                                    if (svgs)
                                        svgs.setAttribute('y', 2);
                                    break;
                                case 270:
                                    node.setAttribute('x', y);
                                    node.setAttribute('y', viewport.height - x - height);
                                    if (svgs) {
                                        svgs.setAttribute('x', -1);
                                        svgs.setAttribute('y', 0);
                                    }

                                    break;
                            }
                        }
                        return node;
                    }
                    /**
                     * Append an annotation as a child of an SVG.
                     *
                     * @param {SVGElement} svg The SVG element to append the annotation to
                     * @param {Object} annotation The annotation definition to render and append
                     * @param {Object} viewport The page's viewport data
                     * @return {SVGElement} A node that was created and appended by this function
                     */
                    function appendChild(svg, annotation, viewport) {
                        if (!viewport) {
                            viewport = JSON.parse(svg.getAttribute('data-pdf-annotate-viewport'));
                        }
                        var child = void 0;
                        // console.log(annotation.type, 55588);
                        switch (annotation.type) {
                            case 'area':
                            case 'highlight':
                                child = (0, _renderRect2.default)(annotation);
                                break;
                            case 'strikeout':
                            case 'underline':
                                child = (0, _renderLine2.default)(annotation);
                                break;
                            case 'point':
                                child = (0, _renderPoint2.default)(annotation);
                                break;
                            case 'textbox':
                                child = (0, _renderText2.default)(annotation);
                                break;
                            case 'drawing':
                                child = (0, _renderPath2.default)(annotation);
                                break;
                        } // If no type was provided for an annotation it will result in node being null.
                        // Skip appending/transforming if node doesn't exist.
                        if (child) { // Set attributes
                            child.setAttribute('data-pdf-annotate-id', annotation.uuid);
                            child.setAttribute('data-pdf-annotate-type', annotation.type);
                            child.setAttribute('aria-hidden', true);
                            svg.appendChild(transform(child, viewport));
                        }
                        return child;
                    }
                    module.exports = exports['default']; /***/
                }, /* 12 */ function(module, exports) {
                    /* eslint-disable no-unused-vars */
                    'use strict';
                    var hasOwnProperty = Object.prototype.hasOwnProperty;
                    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

                    function toObject(val) {
                        if (val === null || val === undefined) {
                            throw new TypeError('Object.assign cannot be called with null or undefined');
                        }
                        return Object(val);
                    }
                    module.exports = Object.assign || function(target, source) {
                        var from;
                        var to = toObject(target);
                        var symbols;
                        for (var s = 1; s < arguments.length; s++) {
                            from = Object(arguments[s]);
                            for (var key in from) {
                                if (hasOwnProperty.call(from, key)) {
                                    to[key] = from[key];
                                }
                            }
                            if (Object.getOwnPropertySymbols) {
                                symbols = Object.getOwnPropertySymbols(from);
                                for (var i = 0; i < symbols.length; i++) {
                                    if (propIsEnumerable.call(from, symbols[i])) {
                                        to[symbols[i]] = from[symbols[i]];
                                    }
                                }
                            }
                        }
                        return to;
                    }; /***/
                }, /* 13 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = renderLine;
                    var _setAttributes = __webpack_require__(14);
                    var _setAttributes2 = _interopRequireDefault(_setAttributes);
                    var _normalizeColor = __webpack_require__(15);
                    var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    /**
                     * Create SVGLineElements from an annotation definition.
                     * This is used for anntations of type "strikeout".
                     *
                     * @param {Object} a The annotation definition
                     * @return {SVGGElement} A group of all lines to be rendered
                     */
                    function renderLine(a) {
                        var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                        (0, _setAttributes2.default)(group, {
                            stroke: (0, _normalizeColor2.default)(a.color || '#f00'),
                            strokeWidth: 1
                        });
                        a.rectangles.forEach(function(r) {
                            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                            (0, _setAttributes2.default)(line, {
                                x1: r.x,
                                y1: r.y,
                                x2: r.x + r.width,
                                y2: r.y
                            });
                            group.appendChild(line);
                        });
                        return group;
                    }
                    module.exports = exports['default']; /***/
                }, /* 14 */ function(module, exports) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = setAttributes;
                    var UPPER_REGEX = /[A-Z]/g; // Don't convert these attributes from camelCase to hyphenated-attributes
                    var BLACKLIST = ['viewBox'];
                    var keyCase = function keyCase(key) {
                        if (BLACKLIST.indexOf(key) === -1) {
                            key = key.replace(UPPER_REGEX, function(match) {
                                return '-' + match.toLowerCase();
                            });
                        }
                        return key;
                    };
                    /**
                     * Set attributes for a node from a map
                     *
                     * @param {Node} node The node to set attributes on
                     * @param {Object} attributes The map of key/value pairs to use for attributes
                     */
                    function setAttributes(node, attributes) {
                        var attr = Object.keys(attributes);
                        attr.forEach(function(key) {
                            node.setAttribute(keyCase(key), attributes[key]);
                        });
                    }
                    module.exports = exports['default']; /***/
                }, /* 15 */ function(module, exports) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = normalizeColor;
                    var REGEX_HASHLESS_HEX = /^([a-f0-9]{6}|[a-f0-9]{3})$/i;
                    /**
                     * Normalize a color value
                     *
                     * @param {String} color The color to normalize
                     * @return {String}
                     */
                    function normalizeColor(color) {
                        if (REGEX_HASHLESS_HEX.test(color)) {
                            color = "#" + color;
                        }
                        return color;
                    }
                    module.exports = exports["default"]; /***/
                }, /* 16 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = renderPath;
                    var _setAttributes = __webpack_require__(14);
                    var _setAttributes2 = _interopRequireDefault(_setAttributes);
                    var _normalizeColor = __webpack_require__(15);
                    var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    /**
                     * Create SVGPathElement from an annotation definition.
                     * This is used for anntations of type "drawing".
                     *
                     * @param {Object} a The annotation definition
                     * @return {SVGPathElement} The path to be rendered
                     */
                    function renderPath(a) {
                        var d = [];
                        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        for (var i = 0, l = a.lines.length; i < l; i++) {
                            var p1 = a.lines[i];
                            var p2 = a.lines[i + 1];
                            if(p1 && p2 && p1.length > 1 && p2.length > 1)
                            {
                                var diff1 = Math.abs(p1[0] - p2[0]);
                                var diff2 = Math.abs(p1[1] - p2[1]);
                                // console.log(diff1, diff2)
                                if(diff1 < 40 &&  diff2 < 40)
                                {
                                    d.push('M' + p1[0] + ' ' + p1[1] + ' ' + p2[0] + ' ' + p2[1]);
                                }
                            }

                            // if (p1 && p1.length != 3 && p2 && p2.length != 3) {
                            //     d.push('M' + p1[0] + ' ' + p1[1] + ' ' + p2[0] + ' ' + p2[1]);
                            // }
                        }

                        (0, _setAttributes2.default)(path, {
                            d: d.join(' ') + 'Z',
                            stroke: (0, _normalizeColor2.default)(a.color || '#000'),
                            strokeWidth: a.width || 1,
                            fill: 'none'
                        });
                        return path;
                    }
                    module.exports = exports['default']; /***/
                }, /* 17 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = renderPoint;
                    var _setAttributes = __webpack_require__(14);
                    var _setAttributes2 = _interopRequireDefault(_setAttributes);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    var SIZE = 25;
                    var D = 'M499.968 214.336q-113.832 0 -212.877 38.781t-157.356 104.625 -58.311 142.29q0 62.496 39.897 119.133t112.437 97.929l48.546 27.9 -15.066 53.568q-13.392 50.778 -39.06 95.976 84.816 -35.154 153.45 -95.418l23.994 -21.204 31.806 3.348q38.502 4.464 72.54 4.464 113.832 0 212.877 -38.781t157.356 -104.625 58.311 -142.29 -58.311 -142.29 -157.356 -104.625 -212.877 -38.781z';
                    /**
                     * Create SVGElement from an annotation definition.
                     * This is used for anntations of type "comment".
                     *
                     * @param {Object} a The annotation definition
                     * @return {SVGElement} A svg to be rendered
                     */
                    function renderPoint(a) {
                        //console.log(a);
                        var outerSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        var outer_width = 25;
                        if (a.sub_type)
                        {
                            outer_width= 18;
                        }
                        (0, _setAttributes2.default)(outerSVG, {
                            width: outer_width,
                            height: 25,
                            x: a.x,
                            y: a.y
                        });
                        if(!a.sub_type)
                        {
                            let inner_svg = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="23.571" height="22" viewBox="0 0 23.571 22">
                                <g id="Chat-filled" transform="translate(-1188.214 -273)">
                                    <path id="Path_8943" data-name="Path 8943" d="M0,4.357V17.321a2.389,2.389,0,0,0,2.357,2.357H5.5v3.929a.393.393,0,0,0,.251.367.394.394,0,0,0,.433-.1L10,19.679H21.214a2.389,2.389,0,0,0,2.357-2.357V4.357A2.389,2.389,0,0,0,21.214,2H2.357A2.389,2.389,0,0,0,0,4.357Z" transform="translate(1188.214 271)" fill="#4b74b5"/>
                                    <path id="Path_8944" data-name="Path 8944" d="M15.714,10.643a1.571,1.571,0,1,1,1.571,1.571A1.573,1.573,0,0,1,15.714,10.643Zm-5.5,0a1.571,1.571,0,1,1,1.571,1.571A1.573,1.573,0,0,1,10.214,10.643Zm-5.5,0a1.571,1.571,0,1,1,1.571,1.571A1.573,1.573,0,0,1,4.714,10.643Z" transform="translate(1188.214 271)" fill="#fff"/>
                                </g>
                            </svg>
                            `;
                            outerSVG.innerHTML = inner_svg;
                        }
                        else
                        {
                            let inner_svg = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="18.001" height="22" viewBox="0 0 18.001 22">
                                <path id="note_blue" d="M6555-1566h-12a3,3,0,0,1-3-3v-16a3,3,0,0,1,3-3h12a3,3,0,0,1,3,3v16A3,3,0,0,1,6555-1566Zm-4.952-6a.69.69,0,0,0-.688.69.69.69,0,0,0,.688.69h4.185a.69.69,0,0,0,.688-.69.69.69,0,0,0-.688-.69Zm-6.36,0a.69.69,0,0,0-.689.69.69.69,0,0,0,.689.69h4.113a.69.69,0,0,0,.689-.69.69.69,0,0,0-.689-.69Zm6.36-3a.689.689,0,0,0-.688.688.69.69,0,0,0,.688.69h4.185a.69.69,0,0,0,.688-.69.689.689,0,0,0-.688-.688Zm-6.36,0a.689.689,0,0,0-.689.688.69.69,0,0,0,.689.69h4.113a.69.69,0,0,0,.689-.69.689.689,0,0,0-.689-.688Zm6.36-3a.69.69,0,0,0-.688.69.689.689,0,0,0,.688.688h4.185a.689.689,0,0,0,.688-.688.69.69,0,0,0-.688-.69Zm-6.36,0a.69.69,0,0,0-.689.69.689.689,0,0,0,.689.688h4.113a.689.689,0,0,0,.689-.688.69.69,0,0,0-.689-.69Zm6.36-3a.69.69,0,0,0-.688.69.689.689,0,0,0,.688.688h4.185a.689.689,0,0,0,.689-.688.69.69,0,0,0-.689-.69Zm-6.36,0a.69.69,0,0,0-.689.69.689.689,0,0,0,.689.688h4.113a.689.689,0,0,0,.689-.688.69.69,0,0,0-.689-.69Zm6.36-3a.689.689,0,0,0-.688.688.69.69,0,0,0,.688.69h4.185a.69.69,0,0,0,.688-.69.689.689,0,0,0-.688-.688Zm-6.36,0a.689.689,0,0,0-.689.688.69.69,0,0,0,.689.69h4.113a.69.69,0,0,0,.689-.69.689.689,0,0,0-.689-.688Z" transform="translate(-6540 1588)" fill="#4b74b5"/>
                            </svg>
                            `;
                            outerSVG.innerHTML = inner_svg;
                        }
                        
                        return outerSVG;
                    }
                    module.exports = exports['default']; /***/
                }, /* 18 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function(obj) {
                        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                    } : function(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                    };
                    exports.default = renderRect;
                    var _setAttributes = __webpack_require__(14);
                    var _setAttributes2 = _interopRequireDefault(_setAttributes);
                    var _normalizeColor = __webpack_require__(15);
                    var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    /**
                     * Create SVGRectElements from an annotation definition.
                     * This is used for anntations of type area and highlight.
                     *
                     * @param {Object} a The annotation definition
                     * @return {SVGGElement|SVGRectElement} A group of all rects to be rendered
                     */
                    function renderRect(a) {
                        if (a.type === 'highlight') {
                            var _ret = function() {
                                var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                                (0, _setAttributes2.default)(group, {
                                    fill: (0, _normalizeColor2.default)(a.color || '#ff0'),
                                    fillOpacity: 0.2
                                });
                                a.rectangles.forEach(function(r) {
                                    group.appendChild(createRect(r));
                                });
                                return {
                                    v: group
                                };
                            }();
                            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                        } else {
                            var rect = createRect(a);
                            (0, _setAttributes2.default)(rect, {
                                stroke: (0, _normalizeColor2.default)(a.color || '#f00'),
                                fill: 'none'
                            });
                            return rect;
                        }
                    }

                    function createRect(r) {
                        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        (0, _setAttributes2.default)(rect, {
                            x: r.x,
                            y: r.y,
                            width: r.width,
                            height: r.height
                        });
                        return rect;
                    }
                    module.exports = exports['default']; /***/
                }, /* 19 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = renderText;
                    var _setAttributes = __webpack_require__(14);
                    var _setAttributes2 = _interopRequireDefault(_setAttributes);
                    var _normalizeColor = __webpack_require__(15);
                    var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    /**
                     * Create SVGTextElement from an annotation definition.
                     * This is used for anntations of type textbox.
                     *
                     * @param {Object} a The annotation definition
                     * @return {SVGTextElement} A text to be rendered
                     */
                    function renderText(a) {
                        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        (0, _setAttributes2.default)(text, {
                            x: a.x,
                            y: a.y + parseInt(a.size, 10),
                            fill: (0, _normalizeColor2.default)(a.color || '#000'),
                            fontSize: a.size
                        });
                        text.innerHTML = a.content;
                        return text;
                    }
                    module.exports = exports['default']; /***/
                }, /* 20 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = renderScreenReaderHints;
                    var _insertScreenReaderHint = __webpack_require__(21);
                    var _insertScreenReaderHint2 = _interopRequireDefault(_insertScreenReaderHint);
                    var _initEventHandlers = __webpack_require__(27);
                    var _initEventHandlers2 = _interopRequireDefault(_initEventHandlers);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    } // TODO This is not the right place for this to live
                    (0, _initEventHandlers2.default)();
                    /**
                     * Insert hints into the DOM for screen readers.
                     *
                     * @param {Array} annotations The annotations that hints are inserted for
                     */
                    function renderScreenReaderHints(annotations) {
                        annotations = Array.isArray(annotations) ? annotations : []; // Insert hints for each type
                        Object.keys(SORT_TYPES).forEach(function(type) {
                            var sortBy = SORT_TYPES[type];
                            annotations.filter(function(a) {
                                return a.type === type;
                            }).sort(sortBy).forEach(function(a, i) {
                                return (0, _insertScreenReaderHint2.default)(a, i + 1);
                            });
                        });
                    } // Sort annotations first by y, then by x.
                    // This allows hints to be injected in the order they appear,
                    // which makes numbering them easier.
                    function sortByPoint(a, b) {
                        if (a.y < b.y) {
                            return a.x - b.x;
                        } else {
                            return 1;
                        }
                    } // Sort annotation by it's first rectangle
                    function sortByRectPoint(a, b) {
                        return sortByPoint(a.rectangles[0], b.rectangles[0]);
                    } // Sort annotation by it's first line
                    function sortByLinePoint(a, b) {
                        var lineA = a.lines[0];
                        var lineB = b.lines[0];
                        return sortByPoint({
                            x: lineA[0],
                            y: lineA[1]
                        }, {
                            x: lineB[0],
                            y: lineB[1]
                        });
                    } // Arrange supported types and associated sort methods
                    var SORT_TYPES = {
                        'highlight': sortByRectPoint,
                        'strikeout': sortByRectPoint,
                        'underline': sortByRectPoint,
                        'drawing': sortByLinePoint,
                        'textbox': sortByPoint,
                        'point': sortByPoint,
                        'area': sortByPoint
                    };
                    module.exports = exports['default']; /***/
                }, /* 21 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = insertScreenReaderHint;
                    var _createScreenReaderOnly = __webpack_require__(22);
                    var _createScreenReaderOnly2 = _interopRequireDefault(_createScreenReaderOnly);
                    var _insertElementWithinChildren = __webpack_require__(23);
                    var _insertElementWithinChildren2 = _interopRequireDefault(_insertElementWithinChildren);
                    var _insertElementWithinElement = __webpack_require__(24);
                    var _insertElementWithinElement2 = _interopRequireDefault(_insertElementWithinElement);
                    var _renderScreenReaderComments = __webpack_require__(25);
                    var _renderScreenReaderComments2 = _interopRequireDefault(_renderScreenReaderComments);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    } // Annotation types that support comments
                    var COMMENT_TYPES = ['highlight', 'point', 'area'];
                    /**
                     * Insert a hint into the DOM for screen readers for a specific annotation.
                     *
                     * @param {Object} annotation The annotation to insert a hint for
                     * @param {Number} num The number of the annotation out of all annotations of the same type
                     */
                    function insertScreenReaderHint(annotation) {
                        var num = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                        switch (annotation.type) {
                            case 'highlight':
                            case 'strikeout':
                            case 'underline':
                                var rects = annotation.rectangles;
                                var first = rects[0];
                                var last = rects[rects.length - 1];
                                resFun = (0, _createScreenReaderOnly2.default)('Begin ' + annotation.type + ' annotation ' + num, annotation.uuid);
                                (0, _insertElementWithinElement2.default)(resFun, first.x, first.y, annotation.page, true);
                                resFun = (0, _createScreenReaderOnly2.default)('End ' + annotation.type + ' annotation ' + num, annotation.uuid + '-end');
                                (0, _insertElementWithinElement2.default)(resFun, last.x + last.width, last.y, annotation.page, false);
                                break;
                            case 'textbox':
                            case 'point':
                                var text = annotation.type === 'textbox' ? ' (content: ' + annotation.content + ')' : '';
                                resFun = (0, _createScreenReaderOnly2.default)(annotation.type + ' annotation ' + num + text, annotation.uuid);
                                (0, _insertElementWithinChildren2.default)(resFun, annotation.x, annotation.y, annotation.page);
                                break;
                            case 'drawing':
                            case 'area':
                                var x = typeof annotation.x !== 'undefined' ? annotation.x : annotation.lines[0][0];
                                var y = typeof annotation.y !== 'undefined' ? annotation.y : annotation.lines[0][1];
                                resFun = (0, _createScreenReaderOnly2.default)('Unlabeled drawing', annotation.uuid);
                                (0, _insertElementWithinChildren2.default)(resFun, x, y, annotation.page);
                                break;
                        } // Include comments in screen reader hint
                        // if (COMMENT_TYPES.includes(annotation.type)) {
                        //     (0, _renderScreenReaderComments2.default)(annotation.documentId, annotation.uuid);
                        // }
                    }
                    module.exports = exports['default']; /***/
                }, /* 22 */ function(module, exports) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = createScreenReaderOnly;
                    /**
                     * Create a node that is only visible to screen readers
                     *
                     * @param {String} content The text content that should be read by screen reader
                     * @param {String} [annotationId] The ID of the annotation assocaited
                     * @return {Element} An Element that is only visible to screen readers
                     */
                    function createScreenReaderOnly(content, annotationId) {
                        var node = document.createElement('div');
                        var text = document.createTextNode(content);
                        node.appendChild(text);
                        node.setAttribute('id', 'pdf-annotate-screenreader-' + annotationId);
                        node.style.position = 'absolute';
                        node.style.left = '-10000px';
                        node.style.top = 'auto';
                        node.style.width = '1px';
                        node.style.height = '1px';
                        node.style.overflow = 'hidden';
                        return node;
                    }
                    module.exports = exports['default']; /***/
                }, /* 23 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = insertElementWithinChildren;
                    var _insertElementWithinElement = __webpack_require__(24);
                    var _insertElementWithinElement2 = _interopRequireDefault(_insertElementWithinElement);
                    var _utils = __webpack_require__(6);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }

                    function _toConsumableArray(arr) {
                        if (Array.isArray(arr)) {
                            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                                arr2[i] = arr[i];
                            }
                            return arr2;
                        } else {
                            return Array.from(arr);
                        }
                    }
                    /**
                     * Insert an element at a point within the document.
                     * This algorithm will try to insert between elements if possible.
                     * It will however use "insertElementWithinElement" if it is more accurate.
                     *
                     * @param {Element} el The element to be inserted
                     * @param {Number} x The x coordinate of the point
                     * @param {Number} y The y coordinate of the point
                     * @param {Number} pageNumber The page number to limit elements to
                     * @return {Boolean} True if element was able to be inserted, otherwise false
                     */
                    function insertElementWithinChildren(el, x, y, pageNumber) { // Try and use most accurate method of inserting within an element
                        if ((0, _insertElementWithinElement2.default)(el, x, y, pageNumber, true)) {
                            return true;
                        } // Fall back to inserting between elements
                        var svg = document.querySelector('svg[data-pdf-annotate-page="' + pageNumber + '"]');
                        var rect = svg.getBoundingClientRect();
                        var nodes = [].concat(_toConsumableArray(svg.parentNode.querySelectorAll('.textLayer > div')));
                        y = (0, _utils.scaleUp)(svg, {
                            y: y
                        }).y + rect.top;
                        x = (0, _utils.scaleUp)(svg, {
                            x: x
                        }).x + rect.left; // Find the best node to insert before
                        for (var i = 0, l = nodes.length; i < l; i++) {
                            var n = nodes[i];
                            var r = n.getBoundingClientRect();
                            if (y <= r.top) {
                                n.parentNode.insertBefore(el, n);
                                return true;
                            }
                        } // If all else fails try to append to the bottom
                        var textLayer = svg.parentNode.querySelector('.textLayer');
                        if (textLayer) {
                            var textRect = textLayer.getBoundingClientRect();
                            if ((0, _utils.pointIntersectsRect)(x, y, textRect)) {
                                textLayer.appendChild(el);
                                return true;
                            }
                        }
                        return false;
                    }
                    module.exports = exports['default']; /***/
                }, /* 24 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = insertElementWithinElement;
                    var _utils = __webpack_require__(6);

                    function _toConsumableArray(arr) {
                        if (Array.isArray(arr)) {
                            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                                arr2[i] = arr[i];
                            }
                            return arr2;
                        } else {
                            return Array.from(arr);
                        }
                    }
                    /**
                     * Insert an element at a point within the document.
                     * This algorithm will only insert within an element amidst it's text content.
                     *
                     * @param {Element} el The element to be inserted
                     * @param {Number} x The x coordinate of the point
                     * @param {Number} y The y coordinate of the point
                     * @param {Number} pageNumber The page number to limit elements to
                     * @param {Boolean} insertBefore Whether the element is to be inserted before or after x
                     * @return {Boolean} True if element was able to be inserted, otherwise false
                     */
                    function insertElementWithinElement(el, x, y, pageNumber, insertBefore) {
                        var OFFSET_ADJUST = 2; // If inserting before adjust "x" by looking for element a few px to the right
                        // Otherwise adjust a few px to the left
                        // This is to allow a little tolerance by searching within the box, instead
                        // of getting a false negative by testing right on the border.
                        x = Math.max(x + OFFSET_ADJUST * (insertBefore ? 1 : -1), 0);
                        var node = textLayerElementFromPoint(x, y + OFFSET_ADJUST, pageNumber);
                        if (!node) {
                            return false;
                        } // Now that node has been found inverse the adjustment for "x".
                        // This is done to accomodate tolerance by cutting off on the outside of the
                        // text boundary, instead of missing a character by cutting off within.
                        x = x + OFFSET_ADJUST * (insertBefore ? -1 : 1);
                        var svg = document.querySelector('svg[data-pdf-annotate-page="' + pageNumber + '"]');
                        var left = (0, _utils.scaleDown)(svg, {
                            left: node.getBoundingClientRect().left
                        }).left - svg.getBoundingClientRect().left;
                        var temp = node.cloneNode(true);
                        var head = temp.innerHTML.split('');
                        var tail = []; // Insert temp off screen
                        temp.style.position = 'absolute';
                        temp.style.top = '-10000px';
                        temp.style.left = '-10000px';
                        document.body.appendChild(temp);
                        while (head.length) { // Don't insert within HTML tags
                            if (head[head.length - 1] === '>') {
                                while (head.length) {
                                    tail.unshift(head.pop());
                                    if (tail[0] === '<') {
                                        break;
                                    }
                                }
                            } // Check if width of temp based on current head value satisfies x
                            temp.innerHTML = head.join('');
                            var width = (0, _utils.scaleDown)(svg, {
                                width: temp.getBoundingClientRect().width
                            }).width;
                            if (left + width <= x) {
                                break;
                            }
                            tail.unshift(head.pop());
                        } // Update original node with new markup, including element to be inserted
                        node.innerHTML = head.join('') + el.outerHTML + tail.join('');
                        temp.parentNode.removeChild(temp);
                        return true;
                    }
                    /**
                     * Get a text layer element at a given point on a page
                     *
                     * @param {Number} x The x coordinate of the point
                     * @param {Number} y The y coordinate of the point
                     * @param {Number} pageNumber The page to limit elements to
                     * @return {Element} First text layer element found at the point
                     */
                    function textLayerElementFromPoint(x, y, pageNumber) {
                        var svg = document.querySelector('svg[data-pdf-annotate-page="' + pageNumber + '"]');
                        // console.log(pageNumber, 443, 2);
                        var rect = svg.getBoundingClientRect();
                        y = (0, _utils.scaleUp)(svg, {
                            y: y
                        }).y + rect.top;
                        x = (0, _utils.scaleUp)(svg, {
                            x: x
                        }).x + rect.left;
                        return [].concat(_toConsumableArray(svg.parentNode.querySelectorAll('.textLayer [data-canvas-width]'))).filter(function(el) {
                            return (0, _utils.pointIntersectsRect)(x, y, el.getBoundingClientRect());
                        })[0];
                    }
                    module.exports = exports['default']; /***/
                }, /* 25 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = renderScreenReaderComments;
                    var _PDFJSAnnotate = __webpack_require__(1);
                    var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);
                    var _insertScreenReaderComment = __webpack_require__(26);
                    var _insertScreenReaderComment2 = _interopRequireDefault(_insertScreenReaderComment);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    /**
                     * Insert the comments into the DOM to be available by screen reader
                     *
                     * Example output:
                     *   <div class="screenReaderOnly">
                     *    <div>Begin highlight 1</div>
                     *    <ol aria-label="Comments">
                     *      <li>Foo</li>
                     *      <li>Bar</li>
                     *      <li>Baz</li>
                     *      <li>Qux</li>
                     *    </ol>
                     *  </div>
                     *  <div>Some highlighted text goes here...</div>
                     *  <div class="screenReaderOnly">End highlight 1</div>
                     *
                     * NOTE: "screenReaderOnly" is not a real class, just used for brevity
                     *
                     * @param {String} documentId The ID of the document
                     * @param {String} annotationId The ID of the annotation
                     * @param {Array} [comments] Optionally preloaded comments to be rendered
                     * @return {Promise}
                     */
                    function renderScreenReaderComments(documentId, annotationId, comments) {
                        var promise = void 0;
                        if (Array.isArray(comments)) {
                            promise = Promise.resolve(comments);
                        } else {
                            promise = _PDFJSAnnotate2.default.getStoreAdapter().getComments(documentId, annotationId);
                        }
                        return promise.then(function(comments) { // Node needs to be found by querying DOM as it may have been inserted as innerHTML
                            // leaving "screenReaderNode" as an invalid reference (see "insertElementWithinElement").
                            var node = document.getElementById('pdf-annotate-screenreader-' + annotationId);
                            if (node) {
                                var list = document.createElement('ol');
                                list.setAttribute('id', 'pdf-annotate-screenreader-comment-list-' + annotationId);
                                list.setAttribute('aria-label', 'Comments');
                                node.appendChild(list);
                                comments.forEach(_insertScreenReaderComment2.default);
                            }
                        });
                    }
                    module.exports = exports['default']; /***/
                }, /* 26 */ function(module, exports) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = insertScreenReaderComment;
                    /**
                     * Insert a comment into the DOM to be available by screen reader
                     *
                     * @param {Object} comment The comment to be inserted
                     */
                    function insertScreenReaderComment(comment) {
                        if (!comment) {
                            return;
                        }
                        var list = document.querySelector('#pdf-annotate-screenreader-' + comment.annotation + ' ol');
                        if (list) {
                            var item = document.createElement('li');
                            item.setAttribute('id', 'pdf-annotate-screenreader-comment-' + comment.uuid);
                            item.appendChild(document.createTextNode('' + comment.content));
                            list.appendChild(item);
                        }
                    }
                    module.exports = exports['default']; /***/
                }, /* 27 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = initEventHandlers;
                    var _insertScreenReaderHint = __webpack_require__(21);
                    var _insertScreenReaderHint2 = _interopRequireDefault(_insertScreenReaderHint);
                    var _renderScreenReaderHints = __webpack_require__(20);
                    var _renderScreenReaderHints2 = _interopRequireDefault(_renderScreenReaderHints);
                    var _insertScreenReaderComment = __webpack_require__(26);
                    var _insertScreenReaderComment2 = _interopRequireDefault(_insertScreenReaderComment);
                    var _renderScreenReaderComments = __webpack_require__(25);
                    var _renderScreenReaderComments2 = _interopRequireDefault(_renderScreenReaderComments);
                    var _event = __webpack_require__(4);
                    var _PDFJSAnnotate = __webpack_require__(1);
                    var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    /**
                     * Initialize the event handlers for keeping screen reader hints synced with data
                     */
                    function initEventHandlers() {
                        (0, _event.addEventListener)('annotation:add', function(documentId, pageNumber, annotation) {
                            reorderAnnotationsByType(documentId, pageNumber, annotation.type);
                        });
                        (0, _event.addEventListener)('annotation:edit', function(documentId, annotationId, annotation) {
                            reorderAnnotationsByType(documentId, annotation.page, annotation.type);
                        });
                        (0, _event.addEventListener)('annotation:delete', removeAnnotation);
                        (0, _event.addEventListener)('comment:add', insertComment);
                        (0, _event.addEventListener)('comment:delete', removeComment);
                    }
                    /**
                     * Reorder the annotation numbers by annotation type
                     *
                     * @param {String} documentId The ID of the document
                     * @param {Number} pageNumber The page number of the annotations
                     * @param {Strig} type The annotation type
                     */
                    function reorderAnnotationsByType(documentId, pageNumber, type) {
                        _PDFJSAnnotate2.default.getStoreAdapter().getAnnotations(documentId, pageNumber).then(function(annotations) {
                            return annotations.annotations.filter(function(a) {
                                return a.type === type;
                            });
                        }).then(function(annotations) {
                            annotations.forEach(function(a) {
                                removeAnnotation(documentId, a.uuid);
                            });
                            return annotations;
                        }).then(_renderScreenReaderHints2.default);
                    }
                    /**
                     * Remove the screen reader hint for an annotation
                     *
                     * @param {String} documentId The ID of the document
                     * @param {String} annotationId The Id of the annotation
                     */
                    function removeAnnotation(documentId, annotationId) {
                        removeElementById('pdf-annotate-screenreader-' + annotationId);
                        removeElementById('pdf-annotate-screenreader-' + annotationId + '-end');
                    }
                    /**
                     * Insert a screen reader hint for a comment
                     *
                     * @param {String} documentId The ID of the document
                     * @param {String} annotationId The ID of tha assocated annotation
                     * @param {Object} comment The comment to insert a hint for
                     */
                    function insertComment(documentId, annotationId, comment) {
                        var list = document.querySelector('pdf-annotate-screenreader-comment-list-' + annotationId);
                        var promise = void 0;
                        if (!list) {
                            promise = (0, _renderScreenReaderComments2.default)(documentId, annotationId, []).then(function() {
                                list = document.querySelector('pdf-annotate-screenreader-comment-list-' + annotationId);
                                return true;
                            });
                        } else {
                            promise = Promise.resolve(true);
                        }
                        promise.then(function() {
                            (0, _insertScreenReaderComment2.default)(comment);
                        });
                    }
                    /**
                     * Remove a screen reader hint for a comment
                     *
                     * @param {String} documentId The ID of the document
                     * @param {String} commentId The ID of the comment
                     */
                    function removeComment(documentId, commentId) {
                        removeElementById('pdf-annotate-screenreader-comment-' + commentId);
                    }
                    /**
                     * Remove an element from the DOM by it's ID if it exists
                     *
                     * @param {String} elementID The ID of the element to be removed
                     */
                    function removeElementById(elementId) {
                        var el = document.getElementById(elementId);
                        if (el) {
                            el.parentNode.removeChild(el);
                        }
                    }
                    module.exports = exports['default']; /***/
                }, /* 28 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _event = __webpack_require__(4);
                    var _edit = __webpack_require__(29);
                    var _pen = __webpack_require__(30);
                    var _point = __webpack_require__(31);
                    var _rect = __webpack_require__(32);
                    var _text = __webpack_require__(33);
                    var _page = __webpack_require__(34);
                    exports.default = {
                        addEventListener: _event.addEventListener,
                        removeEventListener: _event.removeEventListener,
                        fireEvent: _event.fireEvent,
                        disableEdit: _edit.disableEdit,
                        enableEdit: _edit.enableEdit,
                        destroyEditOverlay: _edit.destroyEditOverlay,
                        disablePen: _pen.disablePen,
                        enablePen: _pen.enablePen,
                        setPen: _pen.setPen,
                        disablePoint: _point.disablePoint,
                        enablePoint: _point.enablePoint,
                        disableRect: _rect.disableRect,
                        enableRect: _rect.enableRect,
                        disableText: _text.disableText,
                        enableText: _text.enableText,
                        setText: _text.setText,
                        createPage: _page.createPage,
                        renderPage: _page.renderPage,
                        renderPageWithoutAnnotations: _page.renderPageWithoutAnnotations
                    };
                    module.exports = exports['default']; /***/
                }, /* 29 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _slicedToArray = function() {
                        function sliceIterator(arr, i) {
                            var _arr = [];
                            var _n = true;
                            var _d = false;
                            var _e = undefined;
                            try {
                                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                                    _arr.push(_s.value);
                                    if (i && _arr.length === i) break;
                                }
                            } catch (err) {
                                _d = true;
                                _e = err;
                            } finally {
                                try {
                                    if (!_n && _i["return"]) _i["return"]();
                                } finally {
                                    if (_d) throw _e;
                                }
                            }
                            return _arr;
                        }
                        return function(arr, i) {
                            if (Array.isArray(arr)) {
                                return arr;
                            } else if (Symbol.iterator in Object(arr)) {
                                return sliceIterator(arr, i);
                            } else {
                                throw new TypeError("Invalid attempt to destructure non-iterable instance");
                            }
                        };
                    }();
                    exports.enableEdit = enableEdit;
                    exports.disableEdit = disableEdit;
                    exports.destroyEditOverlay = destroyEditOverlay;
                    var _PDFJSAnnotate = __webpack_require__(1);
                    var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);
                    var _appendChild = __webpack_require__(11);
                    var _appendChild2 = _interopRequireDefault(_appendChild);
                    var _event = __webpack_require__(4);
                    var _utils = __webpack_require__(6);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }

                    function _toConsumableArray(arr) {
                        if (Array.isArray(arr)) {
                            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                                arr2[i] = arr[i];
                            }
                            return arr2;
                        } else {
                            return Array.from(arr);
                        }
                    }
                    var _enabled = false;
                    var isDragging = false,
                        overlay = void 0;
                    var dragOffsetX = void 0,
                        dragOffsetY = void 0,
                        dragStartX = void 0,
                        dragStartY = void 0;
                    var OVERLAY_BORDER_SIZE = 3;
                    /**
                     * Create an overlay for editing an annotation.
                     *
                     * @param {Element} target The annotation element to apply overlay for
                     */
                    function createEditOverlay(target) {
                        // console.log(targe166);
                        destroyEditOverlay();
                        overlay = document.createElement('div');
                        var anchor = document.createElement('a');
                        var svgTaret = (0, _utils.findSVGContainer)(target);
                        var parentNode = svgTaret.parentNode;
                        var id = target.getAttribute('data-pdf-annotate-id');
                        var rect = (0, _utils.getAnnotationRect)(target);
                        var styleLeft = rect.left - OVERLAY_BORDER_SIZE;
                        var styleTop = rect.top - OVERLAY_BORDER_SIZE;
                        overlay.setAttribute('id', 'pdf-annotate-edit-overlay');
                        overlay.setAttribute('data-target-id', id);
                        overlay.style.boxSizing = 'content-box';
                        overlay.style.position = 'absolute';
                        overlay.style.top = styleTop + 'px';
                        overlay.style.left = styleLeft + 'px';
                        overlay.style.width = rect.width + 'px';
                        overlay.style.height = rect.height + 'px';
                        overlay.style.border = OVERLAY_BORDER_SIZE + 'px solid ' + _utils.BORDER_COLOR;
                        overlay.style.borderRadius = OVERLAY_BORDER_SIZE + 'px';
                        anchor.innerHTML = '×';
                        anchor.setAttribute('href', 'javascript://');
                        anchor.style.background = '#fff';
                        anchor.style.borderRadius = '20px';
                        anchor.style.border = '1px solid #bbb';
                        anchor.style.color = '#bbb';
                        anchor.style.fontSize = '16px';
                        anchor.style.padding = '2px';
                        anchor.style.textAlign = 'center';
                        anchor.style.textDecoration = 'none';
                        anchor.style.position = 'absolute';
                        anchor.style.top = '-13px';
                        anchor.style.right = '-13px';
                        anchor.style.width = '25px';
                        anchor.style.height = '25px';
                        overlay.appendChild(anchor);
                        parentNode.appendChild(overlay);
                        document.addEventListener('click', click29);
                        document.addEventListener('keyup', key_up29);
                        document.addEventListener('mousedown', mouse_down29);
                        anchor.addEventListener('click', deleteAnnotation);
                        anchor.addEventListener('mouseover', function() {
                            anchor.style.color = '#35A4DC';
                            anchor.style.borderColor = '#999';
                            anchor.style.boxShadow = '0 1px 1px #ccc';
                        });
                        anchor.addEventListener('mouseout', function() {
                            anchor.style.color = '#bbb';
                            anchor.style.borderColor = '#bbb';
                            anchor.style.boxShadow = '';
                        });
                        overlay.addEventListener('mouseover', function() {
                            if (!isDragging) {
                                anchor.style.display = '';
                            }
                        });
                        overlay.addEventListener('mouseout', function() {
                            anchor.style.display = 'none';
                        });
                    }


                    /**
                     * Destroy the edit overlay if it exists.
                     */
                    function destroyEditOverlay() {
                        if (overlay) {
                            overlay.parentNode.removeChild(overlay);
                            overlay = null;
                        }
                        document.removeEventListener('click', click29);
                        document.removeEventListener('keyup', key_up29);
                        document.removeEventListener('mousedown', mouse_down29);
                        document.removeEventListener('mousemove', mouse_move29);
                        document.removeEventListener('mouseup', mouse_up29);
                        (0, _utils.enableUserSelect)();
                    }
                    /**
                     * Delete currently selected annotation
                     */
                    function deleteAnnotation() {
                        if (!overlay) {
                            return;
                        }
                        var annotationId = overlay.getAttribute('data-target-id');
                        var nodes = document.querySelectorAll('[data-pdf-annotate-id="' + annotationId + '"]');
                        var svg = overlay.parentNode.querySelector('svg.annotationLayer');
                        var _getMetadata = (0, _utils.getMetadata)(svg);
                        documentId = _getMetadata.documentId;                        
                        var annotations = _getAnnotations(documentId);
                        var point = annotations.filter(function(annot) {
                            return annot.uuid == annotationId
                        });
                        if (point.length > 0) {
                            if (point[0].type == 'point' && !point[0].sub_type) {
                                return;
                            }
                        }

                        [].concat(_toConsumableArray(nodes)).forEach(function(n) {
                            n.parentNode.removeChild(n);
                        });
                        _PDFJSAnnotate2.default.getStoreAdapter().deleteAnnotation(documentId, annotationId);
                        destroyEditOverlay();
                    }

                    /**
                     * Handle document.click event
                     *
                     * @param {Event} e The DOM event that needs to be handled
                     */
                    function click29(e) {
                        if (!(0, _utils.findSVGAtPoint)(e.clientX, e.clientY)) {
                            return;
                        } // Remove current overlay
                        var overlay = document.getElementById('pdf-annotate-edit-overlay');
                        if (overlay) {
                            if (isDragging || e.target === overlay) {
                                return;
                            }
                            destroyEditOverlay();
                        }
                    }
                    /**
                     * Handle document.keyup event
                     *
                     * @param {Event} e The DOM event that needs to be handled
                     */
                    function key_up29(e) {
                        if (overlay && e.keyCode === 46 && e.target.nodeName.toLowerCase() !== 'textarea' && e.target.nodeName.toLowerCase() !== 'input') {
                            deleteAnnotation();
                        }
                    }

                    var object_to_move = undefined;
                    /**
                     * Handle document.mousedown event
                     *
                     * @param {Event} e The DOM event that needs to be handled
                     */
                    function mouse_down29(e) {

                        if (e.target !== overlay) {
                            return;
                        } // Highlight and strikeout annotations are bound to text within the document.
                        // It doesn't make sense to allow repositioning these types of annotations.
                        var annotationId = overlay.getAttribute('data-target-id');
                        var target = document.querySelector('[data-pdf-annotate-id="' + annotationId + '"]');
                        var type = target.getAttribute('data-pdf-annotate-type');
                        if (type === 'highlight' || type === 'strikeout' || type === 'underline') {
                            return;
                        }
                        isDragging = true;
                        dragOffsetX = e.clientX;
                        dragOffsetY = e.clientY;

                        dragStartX = overlay.offsetLeft;
                        dragStartY = overlay.offsetTop;
                        overlay.style.background = 'rgba(255, 255, 255, 0.7)';
                        overlay.style.cursor = 'move';
                        var delbtn = overlay.querySelector('a');
                        if (delbtn && delbtn.style)
                            delbtn.style.display = 'none';

                        document.addEventListener('mousemove', mouse_move29);
                        document.addEventListener('mouseup', mouse_up29);
                        (0, _utils.disableUserSelect)();
                        object_to_move = $('.new_comments_count[point_id="' + annotationId + '"]');
                        if (object_to_move.length == 0)
                            object_to_move = false;
                        else
                            object_to_move = object_to_move[0];
                    }
                    /**
                     * Handle document.mousemove event
                     *
                     * @param {Event} e The DOM event that needs to be handled
                     */
                    function mouse_move29(e) {
                        var annotationId = overlay.getAttribute('data-target-id');
                        var parentNode = overlay.parentNode;
                        var rect = parentNode.getBoundingClientRect();
                        var y = dragStartY + (e.clientY - dragOffsetY);
                        var x = dragStartX + (e.clientX - dragOffsetX);
                        var minY = 0;
                        var maxY = rect.height;
                        var minX = 0;
                        var maxX = rect.width;
                        if (y > minY && y + overlay.offsetHeight < maxY) {
                            overlay.style.top = y + 'px';
                            if (object_to_move)
                                object_to_move.style.top = (y - 15) + 'px';
                        }

                        if (x > minX && x + overlay.offsetWidth < maxX) {
                            overlay.style.left = x + 'px';
                            if (object_to_move)
                                object_to_move.style.left = (x + 20) + 'px';
                        }
                    }
                    /**
                     * Handle document.mouseup event
                     *
                     * @param {Event} e The DOM event that needs to be handled
                     */
                    function mouse_up29(e) {
                        var annotationId = overlay.getAttribute('data-target-id');
                        var target = document.querySelectorAll('[data-pdf-annotate-id="' + annotationId + '"]');
                        var type = target[0].getAttribute('data-pdf-annotate-type');
                        var svg = overlay.parentNode.querySelector('svg.annotationLayer');
                        var _getMetadata2 = (0, _utils.getMetadata)(svg);
                        documentId = _getMetadata2.documentId;
                        var delbtn = overlay.querySelector('a');
                        if (delbtn && delbtn.style)
                            delbtn.style.display = '';

                        function getDelta(propX, propY) {
                            return calcDelta(parseInt(target[0].getAttribute(propX), 10), parseInt(target[0].getAttribute(propY), 10));
                        }

                        function calcDelta(x, y) {
                            return {
                                deltaX: OVERLAY_BORDER_SIZE + (0, _utils.scaleDown)(svg, {
                                    x: overlay.offsetLeft
                                }).x - x,
                                deltaY: OVERLAY_BORDER_SIZE + (0, _utils.scaleDown)(svg, {
                                    y: overlay.offsetTop
                                }).y - y
                            };
                        }
                        _PDFJSAnnotate2.default.getStoreAdapter().getAnnotation(documentId, annotationId).then(function(annotation) {
                            if (['area', 'highlight', 'point', 'textbox'].indexOf(type) > -1) {
                                (function() {
                                    var _getDelta = getDelta('x', 'y');
                                    var deltaX = _getDelta.deltaX;
                                    var deltaY = _getDelta.deltaY;
                                    [].concat(_toConsumableArray(target)).forEach(function(t, i) {
                                        if (deltaY !== 0) {
                                            var modelY = parseInt(t.getAttribute('y'), 10) + deltaY;
                                            var viewY = modelY;
                                            if (type === 'textbox') {
                                                viewY += annotation.size;
                                            }
                                            if (type === 'point') {
                                                viewY = (0, _utils.scaleUp)(svg, {
                                                    viewY: viewY
                                                }).viewY;
                                            }
                                            t.setAttribute('y', viewY);
                                            if (annotation.rectangles) {
                                                annotation.rectangles[i].y = modelY;
                                            } else if (annotation.y) {
                                                annotation.y = modelY;
                                            }
                                        }
                                        if (deltaX !== 0) {
                                            var modelX = parseInt(t.getAttribute('x'), 10) + deltaX;
                                            var viewX = modelX;
                                            if (type === 'point') {
                                                viewX = (0, _utils.scaleUp)(svg, {
                                                    viewX: viewX
                                                }).viewX;
                                            }
                                            t.setAttribute('x', viewX);
                                            if (annotation.rectangles) {
                                                annotation.rectangles[i].x = modelX;
                                            } else if (annotation.x) {
                                                annotation.x = modelX;
                                            }
                                        }
                                    });
                                })();
                            } else if (type === 'drawing') {
                                (function() {
                                    var rect = (0, _utils.scaleDown)(svg, (0, _utils.getAnnotationRect)(target[0]));
                                    var _annotation$lines$ = _slicedToArray(annotation.lines[0], 2);
                                    var originX = _annotation$lines$[0];
                                    var originY = _annotation$lines$[1];
                                    var _calcDelta = calcDelta(originX, originY);
                                    var deltaX = _calcDelta.deltaX;
                                    var deltaY = _calcDelta.deltaY; // origin isn't necessarily at 0/0 in relation to overlay x/y
                                    // adjust the difference between overlay and drawing coords
                                    deltaY += originY - rect.top;
                                    deltaX += originX - rect.left;
                                    annotation.lines.forEach(function(line, i) {
                                        var _annotation$lines$i = _slicedToArray(annotation.lines[i], 2);
                                        var x = _annotation$lines$i[0];
                                        var y = _annotation$lines$i[1];
                                        annotation.lines[i][0] = x + deltaX;
                                        annotation.lines[i][1] = y + deltaY;
                                    });
                                    target[0].parentNode.removeChild(target[0]);
                                    (0, _appendChild2.default)(svg, annotation);
                                })();
                            }
                            _PDFJSAnnotate2.default.getStoreAdapter().editAnnotation(documentId, annotationId, annotation);
                        });
                        setTimeout(function() {
                            isDragging = false;
                        }, 0);
                        overlay.style.background = '';
                        overlay.style.cursor = '';
                        document.removeEventListener('mousemove', mouse_move29);
                        document.removeEventListener('mouseup', mouse_up29);
                        (0, _utils.enableUserSelect)();
                    }
                    /**
                     * Handle annotation.click event
                     *
                     * @param {Element} e The annotation element that was clicked
                     */
                    handleAnnotationClick = function(target) {
                        // console.log(561);
                        setTimeout(function() {
                            activeAnnotationId = target.getAttribute('data-pdf-annotate-id');
                            createEditOverlay(target);
                            activate_annotation(target);
                        }, 15);
                    }
                    /**
                     * Enable edit mode behavior.
                     */
                    function enableEdit(target) {
                        // console.log(_enabled, 679);
                        if (_enabled) {
                            return;
                        }
                        if (target) {
                            //console.log(target);
                            createEditOverlay(target);
                            return;
                        }
                        _enabled = true;
                        (0, _event.addEventListener)('annotation:click', handleAnnotationClick);
                    };
                    /**
                     * Disable edit mode behavior.
                     */
                    function disableEdit() {
                        destroyEditOverlay();
                        if (!_enabled) {
                            return;
                        }
                        _enabled = false;
                        (0, _event.removeEventListener)('annotation:click', handleAnnotationClick);
                    }; /***/
                }, /* 30 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.setPen = setPen;
                    exports.enablePen = enablePen;
                    exports.disablePen = disablePen;
                    var _PDFJSAnnotate = __webpack_require__(1);
                    var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);
                    var _appendChild = __webpack_require__(11);
                    var _appendChild2 = _interopRequireDefault(_appendChild);
                    var _utils = __webpack_require__(6);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    var _enabled = false;
                    var _penSize = void 0;
                    var _penColor = void 0;
                    var path = void 0;
                    var lines = void 0;
                    /**
                     * Handle document.mousedown event
                     */
                    var old_svg = undefined;
                    function mouse_down30(e) {
                        //console.log(e, 777);
                        if (is_mobile_device)
                        {
                            $('body').css('overflow', 'hidden');
                        }
                        if(!$('.topbar .pen').hasClass('active'))
                        {
                            return;
                        }
                        var svg = (0, _utils.findSVGAtPoint)(e.clientX, e.clientY);
                        var local_annots = _getAnnotations(documentId);
                        if(local_annots.length > 0)
                        {
                            var last_item = local_annots[local_annots.length - 1];
                            if(old_svg && old_svg != svg)
                            {
                                last_item.to_merge = 0;
                            }
                            else{
                                if(last_item.type == 'drawing')
                                {
                                    last_item.to_merge = 1;
                                }                                
                            }
                        }                        
                        old_svg = svg;
                        path = null;
                        lines = [];                        

                        document.addEventListener('mousemove', mouse_move30);
                        document.addEventListener('mouseup', mouse_up30);

                        document.addEventListener('touchmove', mouse_move30, {
                            passive: false
                        });
                        document.addEventListener('touchend', mouse_up30);
                    }
                    /**
                     * Handle document.mouseup event
                     *
                     * @param {Event} e The DOM event to be handled
                     */

                    function mouse_up30(e) {
                        //console.log(777);
                        if (e.changedTouches)
                        {
                            e = e.changedTouches[0];
                        }
                        var svg = void 0;
                        if (lines.length > 1 && (svg = (0, _utils.findSVGAtPoint)(e.clientX, e.clientY))) {
                            var _getMetadata = (0, _utils.getMetadata)(svg);
                            documentId = _getMetadata.documentId;
                            var pageNumber = _getMetadata.pageNumber;
                            lines[lines.length - 1].push(-1);
                            _PDFJSAnnotate2.default.getStoreAdapter().addAnnotation(documentId, pageNumber, {
                                type: 'drawing',
                                width: _penSize,
                                color: _penColor,
                                lines: lines
                            }).then(function(annotation) {
                                var local_annots = _getAnnotations(documentId);
                                if(!local_annots.length)
                                {
                                    console.log('Invalid annotation length')
                                    return;
                                }
                                if(local_annots[local_annots.length - 1].type != 'drawing')
                                {
                                    console.log('Invalid last annotation')
                                    return;
                                }
                                if (path) {
                                    svg.removeChild(path);
                                }
                                (0, _appendChild2.default)(svg, annotation);                                
                                var merged = 0;
                                if(local_annots.length > 1)
                                {
                                    var second_last = local_annots[local_annots.length - 2];
                                    if(second_last.to_merge)
                                    {
                                        second_last.lines = second_last.lines.concat(annotation.lines);
                                        local_annots[local_annots.length - 2] = second_last;
                                        local_annots.splice(local_annots.length - 1);
                                        merged = 1;
                                    }
                                }
                                local_annots[local_annots.length - 1].to_merge = 1;
                                updateAnnotations(documentId, local_annots, 'op=drawing');
                                if(merged){
                                    UI.renderPage(annotation.page, RENDER_OPTIONS);
                                }
                            });
                        }
                        document.removeEventListener('mousemove', mouse_move30);
                        document.removeEventListener('mouseup', mouse_up30);

                        document.removeEventListener('touchmove', mouse_move30);
                        document.removeEventListener('touchend', mouse_up30);
                        if (is_mobile_device)
                            $('body').css('overflow', 'auto');
                    }
                    /**
                     * Handle document.mousemove event
                     *
                     * @param {Event} e The DOM event to be handled
                     */

                    function mouse_move30(e) {
                        e.preventDefault();
                        //console.log(e); 
                        if (e.touches) {
                            e = e.touches[0];
                        }
                        savePoint(e.clientX, e.clientY);
                    }
                    /**
                     * Handle document.keyup event
                     *
                     * @param {Event} e The DOM event to be handled
                     */
                    function key_up30(e) { // Cancel rect if Esc is pressed
                        if (e.keyCode === 27) {
                            lines = null;
                            path.parentNode.removeChild(path);
                            document.removeEventListener('mousemove', mouse_move30);
                            document.removeEventListener('mouseup', mouse_up30);
                        }
                    }
                    /**
                     * Save a point to the line being drawn.
                     *
                     * @param {Number} x The x coordinate of the point
                     * @param {Number} y The y coordinate of the point
                     */
                    function savePoint(x, y) {
                        var svg = (0, _utils.findSVGAtPoint)(x, y);
                        if (!svg) {
                            return;
                        }
                        var rect = svg.getBoundingClientRect();
                        var point = (0, _utils.scaleDown)(svg, {
                            x: x - rect.left,
                            y: y - rect.top
                        });
                        lines.push([point.x, point.y]);
                        if (lines.length <= 1) {
                            return;
                        }
                        if (path) {
                            svg.removeChild(path);
                        }
                        path = (0, _appendChild2.default)(svg, {
                            type: 'drawing',
                            color: _penColor,
                            width: _penSize,
                            lines: lines
                        });
                    }
                    /**
                     * Set the attributes of the pen.
                     *
                     * @param {Number} penSize The size of the lines drawn by the pen
                     * @param {String} penColor The color of the lines drawn by the pen
                     */
                    function setPen() {
                        var penSize = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
                        var penColor = arguments.length <= 1 || arguments[1] === undefined ? '000000' : arguments[1];
                        _penSize = parseInt(penSize, 10);
                        _penColor = penColor;
                    }
                    /**
                     * Enable the pen behavior
                     */
                    function enablePen() {
                        //console.log(777);                    
                        if (_enabled) {
                            return;
                        }
                        if (is_mobile_device)
                            $('body').css('overflow', 'hidden');
                        _enabled = true;
                        document.addEventListener('mousedown', mouse_down30);
                        document.addEventListener('touchstart', mouse_down30);
                        (0, _utils.disableUserSelect)();
                    }
                    /**
                     * Disable the pen behavior
                     */
                    function disablePen() {
                        if (!_enabled) {
                            return;
                        }
                        _enabled = false;
                        document.removeEventListener('mousedown', mouse_down30);
                        document.removeEventListener('touchstart', mouse_down30);
                        (0, _utils.enableUserSelect)();
                    } /***/
                }, /* 31 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function(obj) {
                        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                    } : function(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                    };
                    exports.enablePoint = enablePoint;
                    exports.disablePoint = disablePoint;
                    var _PDFJSAnnotate = __webpack_require__(1);
                    var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);
                    var _appendChild = __webpack_require__(11);
                    var _appendChild2 = _interopRequireDefault(_appendChild);
                    var _utils = __webpack_require__(6);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    var _enabled = false;
                    var input = void 0;
                    /**
                     * Handle document.mouseup event
                     *
                     * @param {Event} The DOM event to be handled
                     */
                    function mouse_up31(e) {
                        if (input || !(0, _utils.findSVGAtPoint)(e.clientX, e.clientY)) {
                            return;
                        }
                        input = document.createElement('input');
                        input.setAttribute('id', 'pdf-annotate-point-input');
                        input.setAttribute('placeholder', 'Enter comment');
                        input.style.border = '3px solid ' + _utils.BORDER_COLOR;
                        input.style.borderRadius = '3px';
                        input.style.position = 'fixed';
                        input.style.top = e.clientY + 'px';
                        input.style.left = e.clientX + 'px';
                        input.addEventListener('blur', handleInputBlur);
                        input.addEventListener('keyup', handleInputKeyup);
                        document.body.appendChild(input);
                        input.focus();
                    }
                    /**
                     * Handle input.blur event
                     */
                    function handleInputBlur() {
                        savePoint();
                    }
                    /**
                     * Handle input.keyup event
                     *
                     * @param {Event} e The DOM event to handle
                     */
                    function handleInputKeyup(e) {
                        if (e.keyCode === 27) {
                            closeInput();
                        } else if (e.keyCode === 13) {
                            savePoint();
                        }
                    }
                    /**
                     * Save a new point annotation from input
                     */
                    function savePoint() {
                        $('.pdfViewer').css("cursor", "auto");
                        if (input.value.trim().length == 0) {
                            closeInput();
                            return;
                        }
                        if (input.value.trim().length > 0) {
                            var _ret = function() {
                                var clientX = parseInt(input.style.left, 10);
                                var clientY = parseInt(input.style.top, 10);
                                var content = input.value.trim();
                                var svg = (0, _utils.findSVGAtPoint)(clientX, clientY);
                                if (!svg) {
                                    return {
                                        v: void 0
                                    };
                                }
                                var rect = svg.getBoundingClientRect();
                                var _getMetadata = (0, _utils.getMetadata)(svg);
                                documentId = _getMetadata.documentId;
                                var pageNumber = _getMetadata.pageNumber;
                                var annotation = Object.assign({
                                    type: 'point'
                                }, (0, _utils.scaleDown)(svg, {
                                    x: clientX - rect.left,
                                    y: clientY - rect.top
                                }));
                                var pdfStoreAdapter = _PDFJSAnnotate2.default.getStoreAdapter();
                                annotation.sub_type = comment_sub_type;
                                //console.log(43333);
                                annotation.counter = 0;
                                pdfStoreAdapter.addAnnotation(documentId, pageNumber, annotation).then(function(annotation) {
                                    var values = {
                                        content: content,
                                        date_time: new Date(),
                                        uid: annotation_user_m2.id,
                                        user_name: annotation_user_m2.name,
                                        user_image: annotation_user_m2.photo
                                    }
                                    pdfStoreAdapter.addComment(documentId, annotation.uuid, values);
                                    (0, _appendChild2.default)(svg, annotation);
                                    var new_point_id = annotation.uuid;

                                    var sval = $('select.scale').val();
                                    var notif_counters_html = '<div point_id=' + annotation.uuid + ' class="new_comments_count"';
                                    var point_top = annotation.y * sval - 15;
                                    var point_left = annotation.x * sval + 15;
                                    var y_dim = 'top:' + point_top + 'px;';
                                    var x_dim = 'left:' + point_left + 'px;';
                                    notif_counters_html += ' comment_count="0" style="' + y_dim + x_dim + ';display:none;">0</div>';
                                    notif_counters_html = $(notif_counters_html);
                                    $('#pageContainer' + pageNumber + ' .canvasWrapper').append(notif_counters_html);
                                    setTimeout(function(){
                                        select_comment_item(new_point_id, 'new');
                                    }, 10)
                                });
                            }();
                            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                        }
                        closeInput();
                    }
                    /**
                     * Close the input element
                     */
                    function closeInput() {
                        input.removeEventListener('blur', handleInputBlur);
                        input.removeEventListener('keyup', handleInputKeyup);
                        document.body.removeChild(input);
                        input = null;
                    }
                    /**
                     * Enable point annotation behavior
                     */
                    function enablePoint() {
                        //console.log(4233423);
                        if (_enabled) {
                            return;
                        }
                        _enabled = true;
                        document.addEventListener('mouseup', mouse_up31);
                    }
                    /**
                     * Disable point annotation behavior
                     */
                    function disablePoint() {
                        if (!_enabled) {
                            return;
                        }
                        _enabled = false;
                        document.removeEventListener('mouseup', mouse_up31);
                    } /***/
                }, /* 32 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.enableRect = enableRect;
                    exports.disableRect = disableRect;
                    var _PDFJSAnnotate = __webpack_require__(1);
                    var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);
                    var _appendChild = __webpack_require__(11);
                    var _appendChild2 = _interopRequireDefault(_appendChild);
                    var _utils = __webpack_require__(6);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }

                    function _toConsumableArray(arr) {
                        if (Array.isArray(arr)) {
                            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                                arr2[i] = arr[i];
                            }
                            return arr2;
                        } else {
                            return Array.from(arr);
                        }
                    }
                    var _enabled = false;
                    var _type = void 0;
                    var overlay = void 0;
                    var originY = void 0;
                    var originX = void 0;
                    /**
                     * Get the current window selection as rects
                     *
                     * @return {Array} An Array of rects
                     */
                    function getSelectionRects() {
                        try {
                            var selection = window.getSelection();
                            var range = selection.getRangeAt(0);
                            var rects = range.getClientRects();
                            if (rects.length > 0 && rects[0].width > 0 && rects[0].height > 0) {
                                return rects;
                            }
                        } catch (e) {}
                        return null;
                    }
                    /**
                     * Handle document.mousedown event
                     *
                     * @param {Event} e The DOM event to handle
                     */
                    function mouse_down32(e) {
                        var svg = void 0;
                        if (_type !== 'area' || !(svg = (0, _utils.findSVGAtPoint)(e.clientX, e.clientY))) {
                            return;
                        }
                        var rect = svg.getBoundingClientRect();
                        originY = e.clientY;
                        originX = e.clientX;
                        overlay = document.createElement('div');
                        overlay.style.position = 'absolute';
                        overlay.style.top = originY - rect.top + 'px';
                        overlay.style.left = originX - rect.left + 'px';
                        overlay.style.border = '3px solid ' + _utils.BORDER_COLOR;
                        overlay.style.borderRadius = '3px';
                        svg.parentNode.appendChild(overlay);
                        document.addEventListener('mousemove', mouse_move32);
                        (0, _utils.disableUserSelect)();
                    }
                    /**
                     * Handle document.mousemove event
                     *
                     * @param {Event} e The DOM event to handle
                     */
                    function mouse_move32(e) {
                        var svg = overlay.parentNode.querySelector('svg.annotationLayer');
                        var rect = svg.getBoundingClientRect();
                        if (originX + (e.clientX - originX) < rect.right) {
                            overlay.style.width = e.clientX - originX + 'px';
                        }
                        if (originY + (e.clientY - originY) < rect.bottom) {
                            overlay.style.height = e.clientY - originY + 'px';
                        }
                    }

                    /**
                     * Handle document.keyup event
                     *
                     * @param {Event} e The DOM event to handle
                     */
                    function keyup_32(e) { // Cancel rect if Esc is pressed
                        if (e.keyCode === 27) {
                            var selection = window.getSelection();
                            selection.removeAllRanges();
                            if (overlay && overlay.parentNode) {
                                overlay.parentNode.removeChild(overlay);
                                overlay = null;
                                document.removeEventListener('mousemove', mouse_move32);
                            }
                        }
                    }
                    /**
                     * Save a rect annotation
                     *
                     * @param {String} type The type of rect (area, highlight, strikeout)
                     * @param {Array} rects The rects to use for annotation
                     * @param {String} color The color of the rects
                     */
                    function saveRect(type, rects, color) {
                        var svg = (0, _utils.findSVGAtPoint)(rects[0].left, rects[0].top);
                        var node = void 0;
                        var annotation = void 0;
                        if (!svg) {
                            return;
                        }
                        var boundingRect = svg.getBoundingClientRect();
                        if (!color) {
                            if (type === 'highlight') {
                                color = 'FFFF00';
                            } else if (type === 'strikeout') {
                                color = 'FF0000';
                            } else if (type === 'underline') {
                                color = '00FF00';
                            }
                        } // Initialize the annotation
                        annotation = {
                            type: type,
                            color: color,
                            rectangles: [].concat(_toConsumableArray(rects)).map(function(r) {
                                var offset = 0;
                                if (type === 'strikeout') {
                                    offset = r.height / 2;
                                } else if (type === 'underline') {
                                    offset = r.height - 2;
                                }
                                return (0, _utils.scaleDown)(svg, {
                                    y: r.top + offset - boundingRect.top,
                                    x: r.left - boundingRect.left,
                                    width: r.width,
                                    height: r.height
                                });
                            }).filter(function(r) {
                                return r.width > 0 && r.height > 0 && r.x > -1 && r.y > -1;
                            })
                        }; // Short circuit if no rectangles exist
                        if (annotation.rectangles.length === 0) {
                            return;
                        } // Special treatment for area as it only supports a single rect
                        if (type === 'area') {
                            var rect = annotation.rectangles[0];
                            delete annotation.rectangles;
                            annotation.x = rect.x;
                            annotation.y = rect.y;
                            annotation.width = rect.width;
                            annotation.height = rect.height;
                        }
                        var _getMetadata = (0, _utils.getMetadata)(svg);
                        documentId = _getMetadata.documentId;
                        var pageNumber = _getMetadata.pageNumber; // Add the annotation
                        var pdfStoreAdapter = _PDFJSAnnotate2.default.getStoreAdapter();
                        var onAnnotationAdded = function(annotation) {
                            var somefg = (0, _appendChild2.default);
                            somefg(svg, annotation);
                        };
                        pdfStoreAdapter.addAnnotation(documentId, pageNumber, annotation).then(onAnnotationAdded);
                    }

                    /**
                     * Handle document.mouseup event
                     *
                     * @param {Event} e The DOM event to handle
                     */
                    function mouseup32(e) {
                        var data_tool_type = e;
                        if(typeof(e) != 'string')
                        {
                            var annotation_option = $(e.target).closest('.annotation-options>.Button');
                            if(annotation_option.length)
                            {
                                data_tool_type = annotation_option.find('button:first').attr('data-tooltype');
                            }                            
                        }
                        if (typeof data_tool_type != 'string') {
                            return;
                        }
                        _type = data_tool_type;
                        var rects = void 0;
                        if (_type !== 'area' && (rects = getSelectionRects())) {
                            var svg = (0, _utils.findSVGAtPoint)(rects[0].left, rects[0].top);
                            var consumableArray = _toConsumableArray(rects);
                            var mappedFun = function(r) {
                                return {
                                    top: r.top,
                                    left: r.left,
                                    width: r.width,
                                    height: r.height
                                };
                            };
                            consumableArray = [].concat(consumableArray);
                            var resFun = consumableArray.map(mappedFun);
                            saveRect(_type, resFun);
                        } else if (_type === 'area' && overlay) {
                            var _svg = overlay.parentNode.querySelector('svg.annotationLayer');
                            var rect = _svg.getBoundingClientRect();
                            saveRect(_type, [{
                                top: parseInt(overlay.style.top, 10) + rect.top,
                                left: parseInt(overlay.style.left, 10) + rect.left,
                                width: parseInt(overlay.style.width, 10),
                                height: parseInt(overlay.style.height, 10)
                            }]);
                            overlay.parentNode.removeChild(overlay);
                            overlay = null;
                            document.removeEventListener('mousemove', mouse_move32);
                            (0, _utils.enableUserSelect)();
                        }
                    }
                    // Enabling Main Annotations
                    /**
                     * Enable rect behavior
                     */
                    function enableRect(type) {
                        _type = type;
                        if (_enabled) {
                            return;
                        }
                        _enabled = true;
                        document.addEventListener('mouseup', mouseup32);
                        document.addEventListener('mousedown', mouse_down32);
                        document.addEventListener('keyup', keyup_32);
                        mouseup32(type);
                    }
                    /**
                     * Disable rect behavior
                     */
                    function disableRect() {
                        if (!_enabled) {
                            return;
                        }
                        _enabled = false;
                        document.removeEventListener('mouseup', mouseup32);
                        document.removeEventListener('mousedown', mouse_down32);
                        document.removeEventListener('keyup', keyup_32);
                    } /***/
                }, /* 33 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function(obj) {
                        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                    } : function(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                    };
                    exports.setText = setText;
                    exports.enableText = enableText;
                    exports.disableText = disableText;
                    var _PDFJSAnnotate = __webpack_require__(1);
                    var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);
                    var _appendChild = __webpack_require__(11);
                    var _appendChild2 = _interopRequireDefault(_appendChild);
                    var _utils = __webpack_require__(6);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    }
                    var _enabled = false;
                    var input = void 0;
                    var _textSize = void 0;
                    var _textColor = void 0;
                    /**
                     * Handle document.mouseup event
                     *
                     * @param {Event} e The DOM event to handle
                     */
                    function mouse_up_enable_text(e) {
                        if (input || !(0, _utils.findSVGAtPoint)(e.clientX, e.clientY)) {
                            return;
                        }
                        input = document.createElement('input');
                        input.setAttribute('id', 'pdf-annotate-text-input');
                        input.setAttribute('placeholder', 'Enter text');
                        input.style.border = '3px solid ' + _utils.BORDER_COLOR;
                        input.style.borderRadius = '3px';
                        input.style.position = 'absolute';
                        input.style.top = e.clientY + 'px';
                        input.style.left = e.clientX + 'px';
                        input.style.fontSize = _textSize + 'px';
                        input.addEventListener('blur', handleInputBlur);
                        input.addEventListener('keyup', handleInputKeyup);
                        document.body.appendChild(input);
                        input.focus();
                    }
                    /**
                     * Handle input.blur event
                     */
                    function handleInputBlur() {
                        saveText();
                    }
                    /**
                     * Handle input.keyup event
                     *
                     * @param {Event} e The DOM event to handle
                     */
                    function handleInputKeyup(e) {
                        if (e.keyCode === 27) {
                            closeInput();
                        } else if (e.keyCode === 13) {
                            saveText();
                        }
                    }
                    /**
                     * Save a text annotation from input
                     */
                    function saveText() {
                        if (input.value.trim().length > 0) {
                            var _ret = function() {
                                var clientX = parseInt(input.style.left, 10);
                                var clientY = parseInt(input.style.top, 10);
                                var svg = (0, _utils.findSVGAtPoint)(clientX, clientY);
                                if (!svg) {
                                    return {
                                        v: void 0
                                    };
                                }
                                var _getMetadata = (0, _utils.getMetadata)(svg);
                                documentId = _getMetadata.documentId;
                                var pageNumber = _getMetadata.pageNumber;
                                var rect = svg.getBoundingClientRect();
                                var annotation = Object.assign({
                                    type: 'textbox',
                                    size: _textSize,
                                    color: _textColor,
                                    content: input.value.trim()
                                }, (0, _utils.scaleDown)(svg, {
                                    x: clientX - rect.left,
                                    y: clientY - rect.top,
                                    width: input.offsetWidth,
                                    height: input.offsetHeight
                                }));
                                _PDFJSAnnotate2.default.getStoreAdapter().addAnnotation(documentId, pageNumber, annotation).then(function(annotation) {
                                    (0, _appendChild2.default)(svg, annotation);
                                });
                            }();
                            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                        }
                        closeInput();
                    }
                    /**
                     * Close the input
                     */
                    function closeInput() {
                        if (input) {
                            input.removeEventListener('blur', handleInputBlur);
                            input.removeEventListener('keyup', handleInputKeyup);
                            document.body.removeChild(input);
                            input = null;
                        }
                    }
                    /**
                     * Set the text attributes
                     *
                     * @param {Number} textSize The size of the text
                     * @param {String} textColor The color of the text
                     */
                    function setText() {
                        var textSize = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];
                        var textColor = arguments.length <= 1 || arguments[1] === undefined ? '000000' : arguments[1];
                        _textSize = parseInt(textSize, 10);
                        _textColor = textColor;
                    }
                    /**
                     * Enable text behavior
                     */
                    function enableText() {
                        if (_enabled) {
                            return;
                        }
                        _enabled = true;
                        document.addEventListener('mouseup', mouse_up_enable_text);
                    }
                    /**
                     * Disable text behavior
                     */
                    function disableText() {
                        if (!_enabled) {
                            return;
                        }
                        _enabled = false;
                        document.removeEventListener('mouseup', mouse_up_enable_text);
                    } /***/
                }, /* 34 */ function(module, exports, __webpack_require__) {
                    'use strict';
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var _slicedToArray = function() {
                        function sliceIterator(arr, i) {
                            var _arr = [];
                            var _n = true;
                            var _d = false;
                            var _e = undefined;
                            try {
                                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                                    _arr.push(_s.value);
                                    if (i && _arr.length === i) break;
                                }
                            } catch (err) {
                                _d = true;
                                _e = err;
                            } finally {
                                try {
                                    if (!_n && _i["return"]) _i["return"]();
                                } finally {
                                    if (_d) throw _e;
                                }
                            }
                            return _arr;
                        }
                        return function(arr, i) {
                            if (Array.isArray(arr)) {
                                return arr;
                            } else if (Symbol.iterator in Object(arr)) {
                                return sliceIterator(arr, i);
                            } else {
                                throw new TypeError("Invalid attempt to destructure non-iterable instance");
                            }
                        };
                    }();
                    exports.createPage = createPage;
                    exports.renderPage = renderPage;
                    exports.renderPageWithoutAnnotations = renderPageWithoutAnnotations;
                    var _PDFJSAnnotate = __webpack_require__(1);
                    var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);
                    var _renderScreenReaderHints = __webpack_require__(20);
                    var _renderScreenReaderHints2 = _interopRequireDefault(_renderScreenReaderHints);

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            default: obj
                        };
                    } // Template for creating a new page
                    var PAGE_TEMPLATE = '\n  <div style="visibility: hidden;" class="page" data-loaded="false">\n    <div class="canvasWrapper">\n      <canvas></canvas>\n    </div>\n    <svg class="annotationLayer"></svg>\n    <div class="textLayer"></div>\n  </div>\n';
                    /**
                     * Create a new page to be appended to the DOM.
                     *
                     * @param {Number} pageNumber The page number that is being created
                     * @return {HTMLElement}
                     */
                    function createPage(pageNumber) {
                        var temp = document.createElement('div');
                        temp.innerHTML = PAGE_TEMPLATE;
                        var page = temp.children[0];
                        var canvas = page.querySelector('canvas');
                        page.setAttribute('id', 'pageContainer' + pageNumber);
                        page.setAttribute('data-page-number', pageNumber);
                        canvas.mozOpaque = true;
                        canvas.setAttribute('id', 'page' + pageNumber);
                        return page;
                    }

                    /**
                     * Render a page that has already been created.
                     *
                     * @param {Number} pageNumber The page number to be rendered
                     * @param {Object} renderOptions The options for rendering
                     * @return {Promise} Settled once rendering has completed
                     *  A settled Promise will be either:
                     *    - fulfilled: [pdfPage, annotations]
                     *    - rejected: Error
                     */

                    function renderPage(pageNumber, renderOptions, onPageRendered) {
                        documentId = renderOptions.documentId;
                        // console.log('rendering page =>' pageNumber);
                        var pdfDocument = renderOptions.pdfDocument;
                        var scale = renderOptions.scale;
                        var rotate = renderOptions.rotate;
                        var pageToRender = pdfDocument.getPage(pageNumber);
                        var pageAnnotations = _PDFJSAnnotate2.default.getAnnotations(documentId, pageNumber);
                        // console.log(pageAnnotations, pageNumber, 444);
                        var promise_params = [pageToRender, pageAnnotations];
                        return Promise.all(promise_params).then(function(_ref) {
                            var _ref2 = _slicedToArray(_ref, 2);
                            var pdfPage = _ref2[0];
                            var annotations = _ref2[1];
                            var page = document.getElementById('pageContainer' + pageNumber);
                            if (!page) {
                                console.log('1. Invalid page container ' + 'pageContainer' + pageNumber);
                                return;
                            }
                            var svg = page.querySelector('.annotationLayer');
                            var canvas = page.querySelector('.canvasWrapper canvas');
                            // console.log(pageNumber, 223);
                            var canvasContext = canvas.getContext('2d', {
                                alpha: false
                            });
                            var viewport = pdfPage.getViewport(scale, rotate);
                            if (!viewport) {
                                console.log(scale, rotate, pdfPage, 'Invalid view port');
                                return;
                            }
                            var transform = scalePage(pageNumber, viewport, canvasContext); // Render the page
                            var fun1 = pdfPage.render({
                                canvasContext: canvasContext,
                                viewport: viewport,
                                transform: transform
                            });
                            var fun2 = _PDFJSAnnotate2.default.render(svg, viewport, annotations);
                            return Promise.all([fun1, fun2]).then(function() { // Text content is needed for a11y, but is also necessary for creating
                                // highlight and strikeout annotations which require selecting text.
                                return pdfPage.getTextContent({
                                    normalizeWhitespace: true
                                }).then(function(textContent) {
                                    return new Promise(function(resolve, reject) { // Render text layer for a11y of text content
                                        var textLayer = page.querySelector('.textLayer');
                                        var textLayerFactory = new PDFJS.DefaultTextLayerFactory();
                                        var textLayerBuilder = textLayerFactory.createTextLayerBuilder(textLayer, pageNumber - 1, viewport);
                                        textLayerBuilder.setTextContent(textContent);
                                        textLayerBuilder.render(); // Enable a11y for annotations
                                        // Timeout is needed to wait for "textLayerBuilder.render"
                                        setTimeout(function() {
                                            try {
                                                (0, _renderScreenReaderHints2.default)(annotations.annotations);
                                                resolve();
                                            } catch (e) {
                                                reject(e);
                                            }
                                        });
                                    });
                                });
                            }).then(function() { // Indicate that the page was loaded
                                page.setAttribute('data-loaded', 'true');
                                if (onPageRendered)
                                    onPageRendered(annotations.annotations, pageNumber);
                                return [pdfPage, annotations];
                            });
                        });
                    }

                    function renderPageWithoutAnnotations(pageNumber, renderOptions, onPageRendered) {
                        documentId = renderOptions.documentId;
                        var pdfDocument = renderOptions.pdfDocument;
                        var scale = renderOptions.scale;
                        var rotate = renderOptions.rotate;
                        var pageToRender = pdfDocument.getPage(pageNumber);
                        var pageAnnotations = [];
                        var promise_params = [pageToRender, pageAnnotations];
                        return Promise.all(promise_params).then(function(_ref) {
                            var _ref2 = _slicedToArray(_ref, 2);
                            var pdfPage = _ref2[0];
                            var annotations = [];
                            var page = document.getElementById('pageContainer' + pageNumber);
                            if (!page) {
                                console.log('2. Invalid page container ' + 'pageContainer' + pageNumber);
                                return;
                            }
                            var svg = page.querySelector('.annotationLayer');
                            var canvas = page.querySelector('.canvasWrapper canvas');
                            var canvasContext = canvas.getContext('2d', {
                                alpha: false
                            });
                            var viewport = pdfPage.getViewport(scale, rotate);
                            if (!viewport) {
                                console.log(scale, rotate, pdfPage, 'Invalid view port');
                                return;
                            }
                            var transform = scalePage(pageNumber, viewport, canvasContext); // Render the page
                            var fun1 = pdfPage.render({
                                canvasContext: canvasContext,
                                viewport: viewport,
                                transform: transform
                            });
                            var fun2 = _PDFJSAnnotate2.default.render(svg, viewport, annotations);
                            return Promise.all([fun1, fun2]).then(function() { // Text content is needed for a11y, but is also necessary for creating
                                // highlight and strikeout annotations which require selecting text.
                                return pdfPage.getTextContent({
                                    normalizeWhitespace: true
                                }).then(function(textContent) {
                                    return new Promise(function(resolve, reject) { // Render text layer for a11y of text content
                                        var textLayer = page.querySelector('.textLayer');
                                        var textLayerFactory = new PDFJS.DefaultTextLayerFactory();
                                        var textLayerBuilder = textLayerFactory.createTextLayerBuilder(textLayer, pageNumber - 1, viewport);
                                        textLayerBuilder.setTextContent(textContent);
                                        textLayerBuilder.render(); // Enable a11y for annotations
                                        // Timeout is needed to wait for "textLayerBuilder.render"
                                        setTimeout(function() {
                                            try {
                                                (0, _renderScreenReaderHints2.default)(annotations.annotations);
                                                if (onPageRendered)
                                                    onPageRendered();
                                                resolve();
                                            } catch (e) {
                                                reject(e);
                                            }
                                        });
                                    });
                                });
                            }).then(function() { // Indicate that the page was loaded
                                page.setAttribute('data-loaded', 'true');
                                return [pdfPage, annotations];
                            });
                        });
                    }
                    /**
                     * Scale the elements of a page.
                     *
                     * @param {Number} pageNumber The page number to be scaled
                     * @param {Object} viewport The viewport of the PDF page (see pdfPage.getViewport(scale, rotate))
                     * @param {Object} context The canvas context that the PDF page is rendered to
                     * @return {Array} The transform data for rendering the PDF page
                     */
                    function scalePage(pageNumber, viewport, context) {
                        var page = document.getElementById('pageContainer' + pageNumber);
                        if (!page) {
                            console.log('3. Invalid page container ' + 'pageContainer' + pageNumber);
                            return;
                        }
                        var svg = page.querySelector('.annotationLayer');
                        var canvas = page.querySelector('.canvasWrapper canvas');
                        var wrapper = page.querySelector('.canvasWrapper');
                        var textLayer = page.querySelector('.textLayer');
                        var outputScale = getOutputScale(context);
                        var transform = !outputScale.scaled ? null : [outputScale.sx, 0, 0, outputScale.sy, 0, 0];
                        var sfx = approximateFraction(outputScale.sx);
                        var sfy = approximateFraction(outputScale.sy); // Adjust width/height for scale
                        page.style.visibility = '';
                        canvas.width = roundToDivide(viewport.width * outputScale.sx, sfx[0]);
                        canvas.height = roundToDivide(viewport.height * outputScale.sy, sfy[0]);
                        canvas.style.width = roundToDivide(viewport.width, sfx[1]) + 'px';
                        canvas.style.height = roundToDivide(viewport.height, sfx[1]) + 'px';
                        svg.setAttribute('width', viewport.width);
                        svg.setAttribute('height', viewport.height);
                        svg.style.width = viewport.width + 'px';
                        svg.style.height = viewport.height + 'px';
                        //page.style.width = viewport.height + 'px';
                        page.style.width = '100%';
                        page.style.height = viewport.height + 'px';
                        wrapper.style.width = viewport.width + 'px';
                        wrapper.style.height = viewport.height + 'px';
                        //textLayer.style.width = viewport.width + 'px';
                        textLayer.style.width = '100%';
                        textLayer.style.height = viewport.height + 'px';
                        $('#viewer').width(viewport.width);
                        return transform;
                    }
                    /**
                     * Approximates a float number as a fraction using Farey sequence (max order of 8).
                     *
                     * @param {Number} x Positive float number
                     * @return {Array} Estimated fraction: the first array item is a numerator,
                     *                 the second one is a denominator.
                     */
                    function approximateFraction(x) { // Fast path for int numbers or their inversions.
                        if (Math.floor(x) === x) {
                            return [x, 1];
                        }
                        var xinv = 1 / x;
                        var limit = 8;
                        if (xinv > limit) {
                            return [1, limit];
                        } else if (Math.floor(xinv) === xinv) {
                            return [1, xinv];
                        }
                        var x_ = x > 1 ? xinv : x; // a/b and c/d are neighbours in Farey sequence.
                        var a = 0,
                            b = 1,
                            c = 1,
                            d = 1; // Limit search to order 8.
                        while (true) { // Generating next term in sequence (order of q).
                            var p = a + c,
                                q = b + d;
                            if (q > limit) {
                                break;
                            }
                            if (x_ <= p / q) {
                                c = p;
                                d = q;
                            } else {
                                a = p;
                                b = q;
                            }
                        } // Select closest of neighbours to x.
                        if (x_ - a / b < c / d - x_) {
                            return x_ === x ? [a, b] : [b, a];
                        } else {
                            return x_ === x ? [c, d] : [d, c];
                        }
                    }

                    function getOutputScale(ctx) {
                        var devicePixelRatio = window.devicePixelRatio || 1;
                        var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
                        var pixelRatio = devicePixelRatio / backingStoreRatio;
                        return {
                            sx: pixelRatio,
                            sy: pixelRatio,
                            scaled: pixelRatio !== 1
                        };
                    }

                    function roundToDivide(x, div) {
                        var r = x % div;
                        return r === 0 ? x : Math.round(x - r + div);
                    } /***/
                }]));
            });;
            /* WEBPACK VAR INJECTION */
        }.call(exports, __webpack_require__(3)(module)))
    }

    function module3(module, exports) {

        module.exports = function(module) {
            if (!module.webpackPolyfill) {
                module.deprecate = function() {};
                module.paths = [];
                // module.parent = undefined by default
                module.children = [];
                module.webpackPolyfill = 1;
            }
            return module;
        }
    }

    function module4(module, exports) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = initColorPicker;
        // Color picker component
        var COLORS = [{
            hex: '#000000',
            name: 'Black'
        }, {
            hex: '#EF4437',
            name: 'Red'
        }, {
            hex: '#E71F63',
            name: 'Pink'
        }, {
            hex: '#8F3E97',
            name: 'Purple'
        }, {
            hex: '#65499D',
            name: 'Deep Purple'
        }, {
            hex: '#4554A4',
            name: 'Indigo'
        }, {
            hex: '#2083C5',
            name: 'Blue'
        }, {
            hex: '#35A4DC',
            name: 'Light Blue'
        }, {
            hex: '#09BCD3',
            name: 'Cyan'
        }, {
            hex: '#009688',
            name: 'Teal'
        }, {
            hex: '#43A047',
            name: 'Green'
        }, {
            hex: '#8BC34A',
            name: 'Light Green'
        }, {
            hex: '#FDC010',
            name: 'Yellow'
        }, {
            hex: '#F8971C',
            name: 'Orange'
        }, {
            hex: '#F0592B',
            name: 'Deep Orange'
        }, {
            hex: '#F06291',
            name: 'Light Pink'
        }];

        function initColorPicker(el, value, onChange) {
            function setColor(value) {
                var fireOnChange = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

                currentValue = value;
                a.setAttribute('data-color', value);
                a.style.background = value;
                if (fireOnChange && typeof onChange === 'function') {
                    onChange(value);
                }
                closePicker();
            }

            function togglePicker() {
                if (isPickerOpen) {
                    closePicker();
                } else {
                    openPicker();
                }
            }

            function closePicker() {
                document.removeEventListener('keyup', key_up4);
                if (picker && picker.parentNode) {
                    picker.parentNode.removeChild(picker);
                }
                isPickerOpen = false;
                a.focus();
            }

            function openPicker() {
                if (!picker) {
                    picker = document.createElement('div');
                    picker.style.background = '#fff';
                    picker.style.border = '1px solid #ccc';
                    picker.style.padding = '2px';
                    picker.style.position = 'absolute';
                    picker.style.width = '122px';
                    el.style.position = 'relative';

                    COLORS.map(createColorOption).forEach(function(c) {
                        c.style.margin = '2px';
                        c.onclick = function() {
                            setColor(c.getAttribute('data-color'));
                        };
                        picker.appendChild(c);
                    });
                }

                document.addEventListener('keyup', key_up4);
                el.appendChild(picker);
                isPickerOpen = true;
            }

            function createColorOption(color) {
                var e = document.createElement('a');
                e.className = 'color';
                e.setAttribute('href', 'javascript://');
                e.setAttribute('title', color.name);
                e.setAttribute('data-color', color.hex);
                e.style.background = color.hex;
                return e;
            }

            function key_up4(e) {
                if (e.keyCode === 27) {
                    closePicker();
                }
            }

            var picker = void 0;
            var isPickerOpen = false;
            var currentValue = void 0;
            var a = createColorOption({
                hex: value
            });
            a.onclick = togglePicker;
            //el.appendChild(a);
            setColor(value, false);
        }

    }

    function loadAnnotationnModules(modules) { // webpackBootstrap
        // The module cache
        var installedModules = {};

        // The require function
        function __webpack_require__(moduleId) {

            // Check if module is in cache
            if (installedModules[moduleId])
                return installedModules[moduleId].exports;

            // Create a new module (and put it into the cache)
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            };

            // Execute the module function
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

            // Flag the module as loaded
            module.loaded = true;

            // Return the exports of the module
            return module.exports;
        }

        // expose the modules object (__webpack_modules__)
        __webpack_require__.m = modules;

        // expose the module cache
        __webpack_require__.c = installedModules;

        // __webpack_public_path__
        __webpack_require__.p = "";

        // Load entry module and return exports
        return __webpack_require__(0);
    }
    var pdf_js_module = loadAnnotationnModules([
        module0,
        module1,
        module2,
        module3,
        module4
    ]);
    window['pdf_js_module'] = pdf_js_module;
})();