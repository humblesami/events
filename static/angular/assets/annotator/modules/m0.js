var hand_drawings = [];
var comment_item_focused = false;
var select_comment_item = undefined;
var handleAnnotationClick = undefined;
var loadALlCommentsOnDocument = function(){console.log("Load comment not defined");}
var saveAnnotationsAtServer = function(){console.log("Save annotation not defined");};
var onAnnotationsDownloaded = function(){console.log("onAnnotationsDownloaded not defined");}
function initDocCookies(documentId)
{
    localStorage.setItem(documentId+'/version', 0);
    localStorage.setItem(documentId+'/scale', 1);
    localStorage.setItem(documentId+'/roate', 0);
	localStorage.setItem(documentId+'/dirty', 0);
	localStorage.setItem(documentId+'/annotations', "[]");
}

function resetCookies(documentId)
{
	localStorage.setItem(documentId+'/version', 0);
	localStorage.setItem(documentId+'/annotations', "[]");
}

function getDocumentVersion(documentId)
{
	var res = getCookieStrict(documentId, documentId + '/version');
	if(isNaN(res))
	{
		bootbox.alert("Cookie1 must have been se, plz contact support");
	}
	return res;
}
function isDocumentDirty(documentId)
{
    var res = getCookieStrict(documentId, documentId + '/dirty');    
	if(isNaN(res))
	{
		bootbox.alert("Cookie2 must have been set for "+documentId+", plz contact support");
	}
	return res;
}
function setDocDirty(documentId)
{
	var document_dirty = isDocumentDirty(documentId);
	if(document_dirty != 1)
	{
		var document_version = getCookieStrict(documentId, documentId+'/version');
		document_version += 1;
		localStorage.setItem(documentId+'/version', document_version);
		localStorage.setItem(documentId+'/dirty', 1);
	}
}
function unSetDocDirty(documentId,)
{
	localStorage.setItem(documentId+'/dirty', 0);
}
function setDocVersion(documentId, version)
{
	localStorage.setItem(documentId+'/version', version);
}

function getCookieStrict(documentId, key)
{
	validate_key(documentId, key);
	var val = localStorage.getItem(key);
	if(!isNaN(val))
		val = parseFloat(val);
	return val;
}
function setCookieStrict(documentId, key, val)
{
	var temp_key = validate_key(documentId, key);
	if(temp_key == 'dirty' || temp_key == 'version')
	{
		bootbox.alert("Should not happend");
		console.trace();
	}
	localStorage.setItem(key, val);
}
function validate_key(documentId, key)
{
	var keys = ['version','annotations','dirty','scale','rotate','pen/size','pen/color','text/size','text/color'];
	var temp_key = key.replace(documentId + '/', '');
	if(keys.indexOf(temp_key) == -1)
	{
		console.trace();
		bootbox.alert("Please report this issue2 with "+key +" for "+ documentId);
	}
	return temp_key;
}

function module0(module, exports, __webpack_require__) {
	try{
        'use strict';
		var _ = __webpack_require__(2);
		var _2 = _interopRequireDefault(_);
		var _initColorPicker = __webpack_require__(4);
		var _initColorPicker2 = _interopRequireDefault(_initColorPicker);        

		var save_drawing = function(){};
        var activeAnnotationId = undefined;
        var activePointId = undefined;
		var documentId = false;
		var dh = $(document).height();
		var dw = $(document).width();
        // var note_wrapper = $('#notification-wrapper');                
        var comments_wrapper = $('#comment-wrapper');
        var commentText = comments_wrapper.find('#commentText');
        var comment_list_div = comments_wrapper.find('.comment-list:first');
		var comment_list = comments_wrapper.find('.comment-list-container:first');

		var activeAnnotationItem = undefined;
        var annotationBiengEdited = false;
        var comments_loaded = false;

		var force_download = 0;
        var loadAnnotationsFromServer = undefined;
        
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

		var UI = _2.default.UI;
        var PAGE_HEIGHT = void 0;
        

		var RENDER_OPTIONS = {};        

		_2.default.setStoreAdapter(new _2.default.LocalStoreAdapter());
		//PDFJS.workerSrc = './shared/pdf.worker.js';

		var NUM_PAGES = 0;
		var pdf_doc_data = undefined;
        var document_data = false;
        var pdfStoreAdapter = _2.default.getStoreAdapter(); 

        var copyer = new HtmlToClipboard({
            limitTarget: "#viewer"
        });

        (function(){
			var message = '';			
			(function(){
				onAnnotationsDownloaded = function(data, doc_data)
				{
					var comments = data.comments;
					if(!Array.isArray(comments))
					{
						comments = [];
						console.log("Why not comments");
                    }
                    var document_version = getDocumentVersion(documentId);
                    if(!data.annotations)
                    {
						data.annotations = [];
                    }  
                    var message = undefined;                
                    var document_dirty = isDocumentDirty(documentId);
                    var to_send = [];
                    if(data.version > document_version)
                    {                           
                        if(document_dirty == 1)
                        {
                            message = "Document annotation version="+data.version+" available from server,";
                            message += "<br>You have older version="+document_version+" at local.";
                            message += "<br>If you download, it will discard your recent changes,";
                            message += "<br>Do you still want to download?"; 
                            bootbox.confirm(message, function(dr){
                                if(dr)
                                {
                                    updateLocalAnnotationsFromServer(data.annotations, data.version, comments, doc_data);
                                }
                                else{
                                    updateLocalAnnotationsFromServer([], data.version, comments, doc_data);
                                }
                            });                                                       
                        }
                        else{
                            updateLocalAnnotationsFromServer(data.annotations, data.version, comments, doc_data);
                        }
                    }
                    else
                    {
                        updateLocalAnnotationsFromServer([], data.version, comments, doc_data);
                    }
				}

				function updateLocalAnnotationsFromServer(annotations, version, comments, doc_data) {
					if(annotations.length == 0){
						annotations = getLocalAnnotations();
					}
					if(annotations.length == 0 && comments.length == 0){
                        if(doc_data && doc_data.first_time)
                        {
                            render_details(doc_data);
                        }
                        return;
					}
					annotations = annotations.filter(annot => annot.type != 'point' || annot.sub_type)
					annotations = annotations.concat(comments);
					annotations.forEach(function(item){
						item.class = 'Annotation';
					});
					var annotation_cookie = "";
					if(Array.isArray(annotations))
					{
						annotation_cookie  = JSON.stringify(annotations);
					}
					else
					{
						bootbox.alert("invalid annotations");
						return;
					}
					setCookieStrict(documentId, documentId + '/annotations', annotation_cookie);
					setDocVersion(documentId, version);
                    unSetDocDirty(documentId);
					render_details(doc_data);
				}

			})();

			(function(){
				function onAnnotationsUploaded(data, reset){
					if(data != "done")
					{
						if(isNaN(data))
						{
							bootbox.alert("Could not save:");
							console.log(data);
							return;
						}
						var document_version = getDocumentVersion(documentId);
						message = "Server already has version=" + data;
						message += "<br>Do you want to overwrite server version with local="+document_version+"?";
						bootbox.confirm(message, function(dr){
							if(dr)
							{
								document_version = data + 1;
								setDocVersion(document_version);
								saveAnnotationsAtServer();
							}
						});
					}
					else
					{
						if(reset == 'reset')
						{
                            initDocCookies(documentId);
							render();
						}
						else
							unSetDocDirty(documentId);
						console.log("Saved");
					}
				}

				function onAnnotationSaveFailed(er){
					console.log(er);
				}

				saveAnnotationsAtServer = function (save_type)
				{
                    save_drawing(1);
                    if(!documentId)
                    {
                        console.log("saveAnnotationsAtServer must be called after document id is set")
                        return;
                    }
                    var document_dirty = isDocumentDirty(documentId);
                    if(document_dirty != 1)
                        return;

					var document_version = getDocumentVersion(documentId);
					var input_data = {doc_id:documentId};
					delete input_data['reset'];
					if(save_type == 'reset')
					{
						input_data['reset'] = 1;
					}
					else {
						var annotationString = localStorage.getItem(documentId+'/annotations');
						if(!annotationString || annotationString == '[]')
						{
							console.log("No annotations");
							return;
						}
						if(document_version == 0)
						{
                            setDocDirty(documentId);
							setDocVersion(documentId, 1);
						}
						input_data['annotations'] = annotationString;
						input_data['version'] = document_version;
					}

					dn_rpc_object({
						url:'/save-annotations',
                        data:input_data,
                        no_loader:1,
						onSuccess: function(data){
							onAnnotationsUploaded(data, save_type);
						},
						onError: onAnnotationSaveFailed,
						type:'post'
					});
                }
                
                window['saveAnnotationsAtServer'] = saveAnnotationsAtServer;

				$('body').on('click','.doc-saver',function(){
					saveAnnotationsAtServer();
				});

			})();

			$('body').on('click','.cb-container.autosave input',function(){
				if($(this).prop('checked'))
					saveAnnotationsAtServer();
			});

			$('body').on('click','.toolbar .back',function(){
				on_leave_document();
			});

			$('body').on('click','.doc-clearer',function(){
				message = "Do you want to erase all annotations on document.";
				message += "<br>Warning: it will disable autosave to not affect the online vesion.";
				bootbox.confirm(message, function(dr){
					if(dr)
					{
						resetCookies(documentId);
                        $('.cb-container.autosave input').prop('checked', false);
						render();
					}
				});
			});

			$('body').on('click','.doc-reseter',function(){
				message = "Do you want to erase all annotations on document.";
				message += "<br>Warning: It will also reset.";
				//message += "<br>You can cancel or uncheck auto save if you do not want to reset online";
				bootbox.confirm(message, function(dr){
					if(dr)
					{
						var annotations = localStorage.getItem(documentId + '/annotations');
						annotations = JSON.parse(annotations);
						annotations = annotations.filter(annot => annot.type == 'point' && !annot.sub_type);
						annotations = JSON.stringify(annotations);
						localStorage.removeItem(documentId + '/annotations');
						localStorage.setItem(documentId + '/annotations', annotations);
						setDocDirty(documentId);
						saveAnnotationsAtServer('reset');
					}
				});
			});

		})();

        $(window).unload(function(){
			on_leave_document();
        });                
		
		$('body').on('click','.ContextMenuPopup.toolbar:first .copy:first', function(){
            document.execCommand("copy");
            $(this).parent().parent().hide();
		});
		
        $(document).mousedown(function(e){
            if(e.button == 2)
                return;
            var $target = $(e.target);
            if(comment_item_focused)
            {                    
                var not_in_comments = $target.closest('#comment-wrapper').length == 0;                    
                if(not_in_comments)
                {
                    comment_item_focused = false;
                    loadALlCommentsOnDocument();
                }
            }
            if(contextMenuShown && !$target.is('.ContextMenuPopup button') && !$target.is('.ContextMenuPopup .colored'))
                $('.ContextMenuPopup').hide();
            if($('.topbar:first .pen:first').hasClass('active')){
                if(hand_drawings.length > 0 && $target.closest('#viewer').length == 0){
                    save_drawing();
                }
            }
            else
            {
                $('.pdfViewer').css("cursor", "default");
                if($target.closest('.annotation_button.prop').length > 0)
                {
                    $('.topbar:first .pen:first').click();
                }
                else
                {
                    if(activePointId && $target.closest('#comment-wrapper').length == 0)
                    {
                        activePointId = undefined;
                        $('.comment-list-form').hide();
                    }
                    else
                    {
                        var comment_active = $('.toolbar .comment').hasClass('active');
                        if(comment_active && $target.closest('#viewer').length == 0)
                        $('.toolbar .cursor').click();
                    }
                }                    
            }
        });

        $('body').on('click', '.cell.colored', function(){
            var obj = $(this);
            var color_value = obj.attr('hex').substring(1);
            if(!activeAnnotationItem)
            {
                $('.topbar .pen-color:first').css('background', color_value);
                $('.topbar .pen-color:first').attr('color', color_value);
                setPen(null, color_value);
                obj.append($('#applied_color').show());
            }
            else if(activeAnnotationItem.color != color_value)
            {
                activeAnnotationItem.color = color_value;
                pdfStoreAdapter.editAnnotation(documentId, activeAnnotationId, activeAnnotationItem).then(function(res){
                    obj.append($('#applied_color').show());
                });                
            }
        });                
		
        $('.notification-list:first').on('click, li.list-group-item contact',function(){
            console.log(1344);
        });

        function onPenLeave()
        {

        }

		var setPen = function(a, b){}
		
		var vertical = 'top';
		var horizontal = 'left';
		var sclae_value = undefined;
		function addCommentCount(annotations_of_page, pange_number)
		{
			var annotations_of_page = annotations_of_page.filter(a=>{
				return a.type=='point' && !a.sub_type;
            });
			for(var p_index in annotations_of_page)
			{   
				var c_point = annotations_of_page[p_index];                             
				var notif_counters_html = '<div point_id='+c_point.uuid+' class="new_comments_count"';
				var point_top = c_point.y * sclae_value - 15;
				var point_left = c_point.x * sclae_value + 15;
				var y_dim = vertical+':'+point_top+'px;';
                var x_dim = horizontal+':'+point_left+'px;';
                var style = y_dim + x_dim;
                if(c_point.counter == 0)
                {
                    style +='display:none;'
                }
				notif_counters_html += ' style="' + style + '" comment_count="'+c_point.counter+'">' + c_point.counter + '</div>';
				$('#pageContainer'+pange_number+' .canvasWrapper').append(notif_counters_html);                
			}			
		}

        function hideComments()
        {            
            comments_wrapper.hide();
            viewerLeftMargin();
            comments_shown = false;
            localStorage.removeItem(documentId+'/comments_shown');            
		}
		
		function viewerLeftMargin(vuw)
		{
			if(comments_wrapper.is(':visible'))
			{
				var margin_left = parseFloat($('#viewer').css('margin-left'));
				var comment_width = comments_wrapper.width();
				if(margin_left < comment_width)
					margin_left = comment_width;
				$('#viewer').css('margin-left', margin_left+'px');
			}
			else
			{
				$('#viewer').css('margin-left', 'auto');
			}
		}

        function showCommentsContainer(comment_type)
		{
            if (comment_type)
            {
                comments_to_show = comment_type;
            }
            if(comments_to_show == 'notes')
			{
				comments_wrapper.find('.title:first').html('Personal Notes');
			}
			else
			{
				comments_wrapper.find('.title:first').html('Comments');
            }
            comments_wrapper.show();
            viewerLeftMargin();
            if(!activePointId)
            {
                $('.comment-list-form').hide();
            }
            else
                $('.comment-list-form').show();
            comments_shown = comments_to_show;
            localStorage.setItem(documentId+'/comments_shown', comments_shown);
        }     
        
        function on_leave_document() {
            $('#annotated-doc-conatiner').hide();
            comments_shown = false;
            comments_wrapper.hide();
			$('#main-div').show();
			saveAnnotationsAtServer('Leaving');
        }

        function onDocLoaded()
        {
            site_functions.hideLoader("renderdoc");
            site_functions.hideLoader("loaddocwaiter");
        }
        
        function showHideAnnotations(rotate_degree)
        {
            var doc_data =  RENDER_OPTIONS.document_data;
            var doc_type = doc_data.type;
            if(rotate_degree == 0 && (doc_type == 'meeting'|| doc_type == 'topic'))
            {
                annotation_mode = 1;
                RENDER_OPTIONS.showAnnotations = true;
                var pen_size = getCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/pen/size') || 1;
                var pen_color = getCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/pen/color') || '#000000';                    
                setPen(pen_size, pen_color);
                $('.topbar:first .annotation_button').show();
                $('.annot-toggler').show();
            }
            else{
                annotation_mode = 0;
                $('.annot-toggler').hide();
                if(doc_type == 'meeting'|| doc_type == 'topic')
                    annotation_mode = 2;                    
                RENDER_OPTIONS.showAnnotations = false;
                $('.topbar:first .annotation_button').hide();
                if(doc_data.type == 'signature')
                {
                    $('.strt_sign').attr('doc_id', doc_data.id);
                    if(doc_data.mp_signature_status == "Pending")
                    {
                        $('.sign_completed.pdfjs').hide();
                        $('.strt_sign.pdfjs').show();
                    }

                    if(doc_data.mp_signature_status == "Completed") {
                        $('.strt_sign.pdfjs').hide();
                        $('.sign_completed.pdfjs').show();
                    }
                }
            }
		}
		
		function getLocalAnnotations() {
			var res = getCookieStrict(documentId, documentId + '/annotations');
			if (!res)
				res = [];
			else
				res = JSON.parse(res);
			return res;
		}

        function onCOmmentAdded()
        {
            commentText.val('');
            commentText.parent().show();
            comment_list.css('padding-bottom','65px');
            comment_list_div.scrollTop(999999000);
            commentText.focus();
        }

		function discard_point_notifications(point, count){
            point.counter = 0;
            embed_comment_count(point, 0);
            window['socket_manager'].removeNotification('annotations', 'Point', point.id);
        }

        function embed_comment_count(point, count, cookie_only){
            var annotations = getCookieStrict(documentId, documentId + '/annotations');			
			if (!annotations)
				annotations = [];
			else
				annotations = JSON.parse(annotations);
			for(var i in annotations)
			{
				if(annotations[i].uuid == point.uuid)
				{
                    var newVal = 0;
                    if(count != 0)
                    {
                        newVal = count;
                        if(annotations[i].counter)    
                            newVal = newVal + annotations[i].counter
                    }
                    point.counter = newVal;
                    annotations[i].counter = newVal;
                    if(!cookie_only)
                    {
                        var elem = $('.new_comments_count[point_id="'+point.uuid+'"]');
                        if(newVal == 0)
                        {
                            elem.hide();						
                        }
                        else
                        {                        
                            elem.show();
                        }
                        elem.html(newVal).attr('comment_count', newVal);
                    }
                    localStorage.setItem(documentId + '/annotations', JSON.stringify(annotations));
                    break;
				}
			}
        }
        
        save_drawing = function (onsave){
            if (hand_drawings.length > 0) {
                var annotations  = getCookieStrict(documentId, documentId + '/annotations');
                annotations = JSON.parse(annotations);
                var combined_drawing = hand_drawings[0];
                //console.log(annotations);
                annotations = annotations.filter( el => el.to_merge != 1);
                //console.log(annotations);
                for(var i = 1; i < hand_drawings.length; i++){
                    // annotations = annotations.filter( el => el.uuid != hand_drawings[i].uuid );
                    combined_drawing.lines = combined_drawing.lines.concat(hand_drawings[i].lines);
                }
                combined_drawing.to_merge = 0;
                annotations.push(combined_drawing);
                //console.log(annotations);
                localStorage.setItem(documentId + '/annotations', JSON.stringify(annotations));
                hand_drawings = [];
                combined_drawing = {};
                if(!onsave)
                    render_details();
            }
        }

		function render(doc_data) {
			// usersList = doc_data.attendees;
			// listMarkup = document.createElement('ul');
			// listMarkup.style.position = 'fixed';
			// listMarkup.classList.add("list-group");
			// listMarkup.style.zIndex = 18;
			//
			// for(var i = 0; i < usersList.length; i++){
			// 	var user = usersList[i];
			// 	var li = document.createElement('li');
			// 	li.setAttribute('id', user.id);
			// 	var a = document.createElement('a');
			// 	a.innerHTML = user.name;
			// 	li.classList.add('list-group-item');
			// 	li.append(a);
			// 	listMarkup.append(li);
			// }
            site_functions.showLoader("renderdoc");            
            if(doc_data && doc_data.first_time)
            {

                comments_wrapper = $('#comment-wrapper');
                commentText = comments_wrapper.find('#commentText');
                comment_list_div = comments_wrapper.find('.comment-list:first');
                comment_list = comments_wrapper.find('.comment-list-container:first');

                documentId = doc_data.type+'-'+doc_data.id+'.pdf';
                RENDER_OPTIONS.documentId = documentId;
                comments_loaded = false;
                var cookieVal = localStorage.getItem(documentId+'/dirty');
                if(!cookieVal)
                {
                    initDocCookies(documentId);
                }
                if(doc_data.type == 'meeting' || doc_data.type == 'topic')
                {
                    var document_version = getDocumentVersion(documentId);
                    var input_data = {doc_id:documentId, version:document_version};                
                    // dn_rpc_object({
                    //     url:'/get-annotations',
                    //     data:input_data,
                    //     no_loader:1,
                    //     onSuccess: function (annotaions_data) {
                    //         onAnnotationsDownloaded(annotaions_data, doc_data);
                    //     },
                    //     onError:function(er){
                    //         console.log(er, 34444);
                    //     }
					// });
					onAnnotationsDownloaded([], doc_data);
                }
                else{
                    render_details(doc_data);
                }
            }
            else
            {
                setTimeout(render_details, 100);                
            }
        }

        // Scale/rotate
		function init_ScaleRotate() {            
			function setScaleRotate(scale, rotate) {

				scale = parseFloat(scale, 10);
				rotate = parseInt(rotate, 10);
				var vcw = $('#viewer').width();
				var vuw = 0;
				vuw = scale/RENDER_OPTIONS.scale * vcw;
				viewerLeftMargin(vuw);
				if (RENDER_OPTIONS.scale !== scale || RENDER_OPTIONS.rotate !== rotate) {
					RENDER_OPTIONS.scale = scale;
                    RENDER_OPTIONS.rotate = rotate;                    
                    setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/scale', RENDER_OPTIONS.scale);
                    var newScale = getCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/scale');                    
					setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/rotate', RENDER_OPTIONS.rotate % 360);
                    render();
				}
            }

            var scale_select = document.querySelector('.toolbar select.scale');            
            scale_select.addEventListener('change', handleScaleChange);            
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
			
			$('body').on('click','.toolbar:first .zoomin', function(){
				if(RENDER_OPTIONS.scale>=5)
					return;
				var selected_option = scale_select.children[scale_select.selectedIndex];
				scale_select.value = $(selected_option).next().val();
				handleScaleChange();
			});
			$('body').on('click','.toolbar:first .zoomout', function(){
				if(RENDER_OPTIONS.scale<=0.25)
					return;
				var selected_option = scale_select.children[scale_select.selectedIndex];
				scale_select.value = $(selected_option).prev().val();
				handleScaleChange();
			});
		}

		function render_details(doc_data) {
			try{
                var pdfData = false;
                var pages_rendered = 0;
				if(doc_data && doc_data.first_time)
				{
					if(doc_data.type == 'meeting'|| doc_data.type == 'topic'){
						window['show_annotation'] = true;
					}
					else{
						window['show_annotation'] = false
					}
                    $('.topbar:first .annotation_button').hide();
                    $('#content-wrapper').hide();
                    $('.strt_sign.pdfjs').hide();
					$('.sign_completed.pdfjs').hide();
                    $('#main-div').hide();
                    $('.doc-reseter').hide();
                    $('.toolbar.topbar:first').show();
                    $('#annotated-doc-conatiner').show();
                    hideComments();
                    init_ScaleRotate();
                    var scale_select = $('.toolbar select.scale:first');
                    RENDER_OPTIONS = {
                        documentId: documentId,
                        scale: getCookieStrict(documentId, documentId+'/scale'),
                        rotate: getCookieStrict(documentId, documentId+'/rotate'),
                        pdfDocument : null
                    }
                    if(!RENDER_OPTIONS.rotate)
                    {
                        RENDER_OPTIONS.rotate = 360;
                        setCookieStrict(documentId, documentId+'/rotate',360);
                    }
                    
                    if(!RENDER_OPTIONS.scale)
                    {
                        RENDER_OPTIONS.scale = 1;
                        setCookieStrict(documentId, documentId+'/scale', 1)
                    }
                    scale_select.val(RENDER_OPTIONS.scale);

					if(doc_data.type)
					{                        
                        if(doc_data.doc.startsWith('data:application/pdf;base64,'))
                        {
                            doc_data.doc = doc_data.doc.replace('data:application/pdf;base64,', '');
                        }
						var raw = atob(doc_data.doc);
						var uint8Array = new Uint8Array(raw.length);
						for (var i = 0; i < raw.length; i++) {
							uint8Array[i] = raw.charCodeAt(i);
						}
						doc_data.doc = uint8Array;
                        RENDER_OPTIONS.document_data = doc_data;                        

                        PDFJS.getDocument(doc_data.doc).then(function(pdf_data){
                            pdf_doc_data = pdf_data;
                            $('.page-count').html(pdf_doc_data.numPages);
                            if(pdf_doc_data.numPages > 1)
                            	$('.page-next-btn').removeAttr('disabled');                            
                            renderPdfData(pdf_doc_data);
                        });
					}
					else
					{
                        bootbox.alert("Invalid document data ", doc_data);
                        onDocLoaded();
                        return;
                    }                					
				}
				else{
					if(RENDER_OPTIONS.document_data)
					{
						pdfData = RENDER_OPTIONS.document_data.doc;
						documentId = RENDER_OPTIONS.documentId;
					}
					else
					{
                        bootbox.alert("Invalid render options data ", RENDER_OPTIONS);
                        onDocLoaded();
                        return;
					}
					renderPdfData(pdf_doc_data)
                }

				function renderPdfData(pdfContent) {
					if(!pdfContent)
					{
                        alert("PDF not loaded");
                        onDocLoaded();
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
                    
                    var rotate_degree = rotateBy%360;
                    showHideAnnotations(rotate_degree);
                                        
                    switch(rotate_degree)
                    {
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
                    
                    function onPageDone(annotations_of_page, pange_number)
                    {                        
                        pages_rendered++;
                        if(pages_rendered == 1)
                        {
                            first_page_rendered = 1;
                            if(doc_data && doc_data.first_time)
                            {
                                var header_height = $('.headerheight').height();
                                var toolbar_rect = $('.topbar:first')[0].getBoundingClientRect();
                                var toolbar_height = toolbar_rect.height;
                                var height = header_height + toolbar_height;
                                var path_url = window['pathname'];
                                var ar_path = path_url.split('/');
                                //console.log(path_url);                                
                                if(ar_path[1] == 'iframe')
                                    height += 137;
                                $('#viewer-wrapper').css({ height: 'calc(100vh - ' + height + 'px)' });
                                comments_wrapper.css({top: (height+2) });
                                var c_div_height = 'calc(100vh - '+(height + 55)+'px)';                                
                                comment_list_div.css('height',c_div_height);
                                $('body').addClass('pdf-viewer');
                            }
                            $('#content-wrapper').show();
                            onDocLoaded();
                        }

                        if(annotation_mode == 1)
                        {
							addCommentCount(annotations_of_page, pange_number);
                        }
					}					
					
					UI.renderPage(1, RENDER_OPTIONS, function(cb_data, page_num){                            
						onPageDone(cb_data, page_num);
						for(var i = 2; i <= NUM_PAGES; i++){
							UI.renderPage(i, RENDER_OPTIONS, function(cb_data, page_num){                            
								onPageDone(cb_data, page_num);
							});
						}
					});
				}
				if(window['show_annotation']){
					$('.annotationLayer').show();
					$('.annotation_button').show();
				}
				else{
					$('.annotationLayer').hide();
					$('.annotation_button').hide();
				}
			}
			catch(er)
			{
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
                if(size && typeof(size) != 'number')
                {
                    size = parseInt(size);
                }
                if(color && color.length == 6)
                {
                    color = '#'+color;
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
            function handlePenColorChange(e)
            {
                var topbar_width = $('.topbar:first').width();
                var color_popup = $('.ColorPalettePopup:first');
                var btn_rect = this.getBoundingClientRect();                

                var popup_postion = {top: btn_rect.y + 20};
                if(topbar_width/2 > btn_rect.x)
                {
                    popup_postion.left = btn_rect.x;
                }
                else
                {                    
                    popup_postion.left = btn_rect.x - color_popup.width();
                }
                color_popup.css(popup_postion).show();
                var c_color = $(this).attr('color');
                color_popup.find('div[hex="'+c_color+'"]:first').click();
            }
            $('body').on('click','.toolbar .pen-color:first', handlePenColorChange);
			$('body').on('change','.toolbar .pen-size:first',handlePenSizeChange);			
		})();

		// Toolbar buttons
		(function() {
			var tooltype = 'cursor';
			function setActiveToolbarItem(type, button) {                
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
				$(button).addClass('active');

				tooltype = type;

				switch (type) {
					case 'cursor':
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
						UI.enableRect(type);
						break;
				}
			}

			function handleToolbarClick(e) {
				var active_btn = $('.topbar:first .active');
                var target = $(e.target);
                target = target.closest('button');
				if(target.hasClass('pen') && active_btn.hasClass('pen'))
				{
					$('.topbar:first .cursor').click();
				}
				else
				{
					var tooltype = $(e.target).closest('[data-tooltype]').data('tooltype');
					if(tooltype)
						setActiveToolbarItem(tooltype, e.target);
				}

				if(target.hasClass('comment'))
				{
					if(target.hasClass('personal'))
					{
						comment_sub_type = 'personal';
					}
					else
					{
						comment_sub_type = false;
					}
                }
			}

			$('body').on('click', '.toolbar.topbar:first button, .toolbar.annotation-options:first button', handleToolbarClick);
			$('.toolbar:first .cursor').click();
		})();		

		// Clear toolbar button
		(function() {
			function handleClearClick(e) {
				if (confirm('Are you sure you want to clear annotations?')) {
					for (var i = 0; i < NUM_PAGES; i++) {
						document.querySelector('div#pageContainer' + (i + 1) + ' svg.annotationLayer').innerHTML = '';
					}
					setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/annotations', '[]');
				}
			}
			//document.querySelector('a.clear').addEventListener('click', handleClearClick);
		})();


		// Comment stuff
		(function(window, document) {
			var obj_this = this;			
			function supportsComments(target) {
				var type = target.getAttribute('data-pdf-annotate-type');
				return ['point'].indexOf(type) > -1;
			}
			window['socket_manager'].server_events['point_comment_received'] = function(data) {                
				var annot_doc = $('#annotated-doc-conatiner');
				if(annot_doc.length < 1)
				{
					return;
				}
				annot_doc = annot_doc.is(':visible');                
				if(!annot_doc)
				{
					return;
				}
                if(annotation_mode != 1 ||  !annot_doc || data.point.doc_id != documentId)
                {
                    return;
                }
                if(annotation_mode != 1 ||  !annot_doc || data.point.doc_id != documentId)
                {
                    return;
                }
                var annot_id = comment_list.attr('annotation-id');                       
				if(data['new_point']){
                    data.point.counter = 1;
                    var current_annotations = getLocalAnnotations();
                    current_annotations.push(data.point);
                    current_annotations  = JSON.stringify(current_annotations);
                    setCookieStrict(documentId, documentId + '/annotations', current_annotations);                    
					
					UI.renderPage(data.point.page, RENDER_OPTIONS, function(cb_data, page_num){                            
                        addCommentCount(cb_data, page_num);
                        embed_comment_count(data.point, 1, 1);
					});
				}
				else {
					if (data.point.uuid == annot_id) {
                        //when same point opened
						pdfStoreAdapter.addComment(documentId, data.point.uuid, data.point.comment, 1).then(function(aComment){
                            insertComment(aComment, 1);
							var new_comment = comments_wrapper.find('.comment-list-item:last');
							new_comment.css({'background':'green', color:'white'});                            
                        });
						discard_point_notifications(data.point, 1);
					}
					else {
                        pdfStoreAdapter.addComment(documentId, data.point.uuid, data.point.comment, 1);
                        embed_comment_count(data.point, 1);
					}
				}
            }
            
            var annotation_user = localStorage.getItem('user');
            annotation_user = JSON.parse(annotation_user);
            $('body').on('keyup', '#commentText', function(e) {
                if(!activePointId)
                {
                    console.log("Comment not added because, no active annotationId");
                    return;
                }
				if(!e.shiftKey && e.keyCode == 13)
				{
					e.preventDefault();
					var commentValue = commentText[0].value;// commentText.val().trim();
					commentValue = commentValue.substr(0, commentValue.length-1);
					if(commentValue == '') {
						commentText.val('');
						return;
					}
					//console.log(commentValue);
					var comment = {
						date_time: new Date(),
						user_name: annotation_user.name,
						uid: annotation_user.id,
						content: commentValue
					};
					//console.log(commentText.content)
					if(!comment.content)
						return false;
                        pdfStoreAdapter.addComment(documentId, activePointId, comment).then(function(comment){
                            insertComment(comment, 1);
                        });
				}
			});

			loadALlCommentsOnDocument = function (point_uuid)
			{
                comment_list.html('');
                comment_list.removeAttr('annotation-id');
                var point_type = false;
                if(comments_to_show == 'notes')
                    point_type = 'personal';                

				pdfStoreAdapter.getPointAnnotations(documentId, point_type).then(function(pointAnnotations) {
                    pointAnnotations = pointAnnotations.annotations;
					pointAnnotations.sort(function(a, b) {
						return a["page"] - b["page"] || a["y"] - b["y"] || a["x"] - b["x"];
                    });
					var cnt = -1;
					var counter = -1;
                    var count = pointAnnotations.length;                    
					for(var i in pointAnnotations)
					{
						++cnt;
						pdfStoreAdapter.getComments(documentId, pointAnnotations[cnt].uuid).then(function(comments){							
							++counter;
							var annotationItem = pointAnnotations[counter];
                            renderCommentsByAnnotation(comments, annotationItem.uuid, annotationItem.sub_type);
                            if(counter + 1 == count)
                            {
                                onAllCommentsRendered(point_uuid)
                            }
						});
                    }
                    if(cnt == -1)
                    {
                        onAllCommentsRendered(point_uuid);
                    }
                });
            }
            
            function onAllCommentsRendered(point_uuid)
            {
                comments_loaded = 1;
                setTimeout(function(){
                    if(point_uuid)
                    {
                        select_comment_item(point_uuid);
                    }
                    else
                    {
                        showCommentsContainer(comments_to_show);
                        commentText.closest('form').hide();                                        
                        comment_list.css('padding-bottom','5px');
                    }
                },11);
            }

			function renderCommentsByAnnotation(comments, annotationId, sub_type){
				var group = document.createElement('div');
				group.classList.add("groupcomment");
				for(var i in comments)
				{
					var aComment = comments[i];
					var child = makeCommentItem(aComment);
					group.appendChild(child);
				}
				$(group).attr('annotationId',annotationId);
				comment_list.append(group);
			}

			function renderComments(comments)
			{
				comment_list.html('');
				comments.forEach(insertComment);
			}
			var selected_comment_item = false;
			$('body').on('click','#comment-wrapper .buttons',function(e){
				e.preventDefault();
				contextMenuShown = true;
				selected_comment_item = $(this).closest('.comment-list-item');
				$('.update-comment:first').css({'top':e.pageY,'left':e.pageX}).show();
            });
            
            $('body').on('click','.annotation_button.unread', function(){                
                var els = $('.canvasWrapper .new_comments_count');                
                var lenth = els.length;
                for(var i=0; i<lenth; i++)
                {
                    var el = els.eq(i);
                    var cnt = parseInt(el.html());                    
                    if(cnt > 0)
                    {
                        select_comment_item(el.attr('point_id'))
                        break;
                    }
                }
            });

            commentText.focus(function(){
                comment_item_focused = true;
            });

			$('body').on('click','.update-comment:first .delete', function(e){
				var comment_parent = selected_comment_item.closest('.groupcomment');
				var comment_id = selected_comment_item.attr('comment-id');
				var annotationId = selected_comment_item.attr('annotation');
				pdfStoreAdapter.deleteComment(documentId, annotationId, comment_id).then(function(){
					if(comment_parent.children('.comment-list-item').length == 1)
					{
						comment_parent.remove();
					}
					else
						selected_comment_item.remove();
					contextMenuShown = false;
					$('.update-comment').hide();
				});
            });

            $('body').on('click','.show-all-comments', function(){
                setTimeout(hideComments, 50);
            });

            select_comment_item = function (point_identifier)
            {                
                if(!comments_loaded)
                {
                    loadALlCommentsOnDocument(point_identifier);
                    return;
                }
                var annotationId = undefined;
                if(typeof(point_identifier) == 'string')
                    annotationId = point_identifier; 
                else
                    annotationId = point_identifier.attr('annotationId');
                if(!annotationId)
                {
                    console.log("Invalid point id");
                    return;
                }				
				var c_svg = $('svg.annotationLayer').find('svg[data-pdf-annotate-id="'+annotationId+'"]')
				if(c_svg.length > 0)
				{                    
                    var target1 = $('.canvasWrapper .new_comments_count[point_id="'+annotationId+'"]');
                    setTimeout(function(){
                        
                        $('#viewer-wrapper').scrollTop(0);
                        var parent = target1.closest('.canvasWrapper');
                        var parent_height = parent.height();
                        var p_number= parent.closest('.page').index()
                        var page_top = parent_height * p_number;

                        var c_target = target1[0];
                        //console.log(c_target);
                        var my_top =  parseFloat(c_target.style.top) - 100;
                        var my_left =  parseFloat(c_target.style.left) - 100;
                        var scroll_to = page_top + my_top;
    
                        $('#viewer-wrapper').scrollLeft(my_left);
                        $('#viewer-wrapper').animate({scrollTop:scroll_to}, 500);                        
                        UI.enableEdit(c_svg[0]);
                        handleAnnotationClick(c_svg[0]);
                    }, 15);
				}
				else
				{
					console.log(target, "Not found");
				}
            }

			$('body').on('click','#comment-wrapper .groupcomment',function(e){                
                if($(e.target).is('.buttons'))
				{
					return;
                }
				select_comment_item($(this));
			});

			function makeCommentItem(aComment)
			{
				//console.log(aComment);
				var child = document.createElement('div');
				child.className = 'comment-list-item';
				var child_info = '<div>'+ aComment.content+'</div>';
				aComment.date_time = window["functions"]['standeredTime'](aComment.date_time);
				child_info += '<div class="user-time-info">';
				child_info +='<span class"time">'+aComment.date_time+'</span>';
				//child_info +='<span class="buttons">:</span>';
				child_info +='<span class="user">'+aComment.user_name+'</span>';
				child_info +='</div>';
				$(child).attr('comment-id',aComment.uuid);
				$(child).attr('annotation',aComment.annotation);
				child.innerHTML = child_info;
				return child;
			}

			function insertComment(aComment, textBox) {
				var child = makeCommentItem(aComment);
                comment_list.append(child);
                if(textBox)
                    onCOmmentAdded();
            }

			handleAnnotationClick = function(target) {
				activeAnnotationId = target.getAttribute('data-pdf-annotate-id');
				pdfStoreAdapter.getAnnotation(documentId, activeAnnotationId).then(function(item)
				{
					activeAnnotationItem = item;
					if (supportsComments(target)) {
                        activePointId = activeAnnotationId;
						pdfStoreAdapter.getComments(documentId, activeAnnotationId).then(renderComments).then(function(){
                            if(item.counter > 0)
                            {
                                var lenth = comments_wrapper.find('.comment-list-item').length;                                
                                lenth = lenth - item.counter - 1;
                                var new_comments = comments_wrapper.find('.comment-list-item:gt('+lenth+')');                                
                                new_comments.css({'background':'green', color:'white'})                                
                                discard_point_notifications(item, item.counter);
                            }
                        });
						if(activeAnnotationItem.sub_type)
						{
							comment_list.removeAttr('annotation-id');
							showCommentsContainer('notes');
						}
						else
						{
							comment_list.attr('annotation-id', activeAnnotationId);
							$('#pdf-annotate-edit-overlay a' ).remove();
							showCommentsContainer('comments');
                        }
                        onCOmmentAdded();
					}
					else
					{
						var ctxMenu = $('.colors.ContextMenuPopup:first');
						var pos = $(target).position();
						var tw = $('#pdf-annotate-edit-overlay:visible').width();
						var cmw = ctxMenu.width();
						var left_pos =  pos.left + tw/2 - cmw/2;
						var color = $(target).attr('fill');
						if(!color){
							color=$(target).attr('stroke');
						}
						if(color == 'none' || !color)
							color = '#000000';

						var selected = ctxMenu.find('.row>.cell[hex="'+color+'"]');
						if(selected.length == 0)
						{
							$('#applied_color').hide();
						}
						else
							selected.append($('#applied_color').show());


						ctxMenu.css({'left':left_pos, 'top':pos.top + 30}).show();
						contextMenuShown = true;
					}
				});
			}
			function handleAnnotationBlur(target) {
                annotationBiengEdited = false;
                activeAnnotationItem = false;
            }   
            
            var ww = $(window).width();
			var wh = $(window).height();
            var dh = $(document).height();			            
            
            $('body').on('click','.toolbar:first .comment', function(){                
                UI.destroyEditOverlay();
                if($(this).is('.personal'))
                    comments_to_show = 'notes';
                else
                {
                    comments_to_show = 'comments';
                }
                loadALlCommentsOnDocument();
			});

			
			UI.addEventListener('annotation:click', handleAnnotationClick);
			UI.addEventListener('annotation:blur', handleAnnotationBlur);
		})(window, document);
		exports.render = render;
	}
	catch(err){
		console.log(err)
	}
}
