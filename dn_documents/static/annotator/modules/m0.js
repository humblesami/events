var annot_save_timeout = undefined;
var loadALlCommentsOnDocument = function(){console.log("Load comment not defined");}
var saveAnnotationsAtServer = function(){console.log("Save annotation not defined");};

function initDocCookies(documentId)
{
	localStorage.setItem(documentId+'/version', 0);
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

        var socket_obj = dn_current_site_user.socket;

		var save_drawing = function(){};
        var activeAnnotationId = undefined;
        var activePointId = undefined;
		var documentId = 'a.pdf';
		var dh = $(document).height();
		var dw = $(document).width();
		var comments_wrapper = $('#comment-wrapper');
		var comment_list = comments_wrapper.find('.comment-list-container:first');

		$('.ContextMenuPopup.toolbar:first .copy:first').click(function(){
            document.execCommand("copy");
            $(this).parent().parent().hide();
        });

        var copyer = new HtmlToClipboard({
            limitTarget: "#viewer"
        });

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

		$(window).unload(function(){
			on_leave_document();
		});

		function on_leave_document() {
            $('#annotated-doc-conatiner').hide();
            comments_shown = false;
            comments_wrapper.hide();
			$('#main-div').show();
			saveAnnotationsAtServer('Leaving');
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
            if(!comments_shown)
            {
                comments_wrapper.show();
                viewerLeftMargin();
            }
            if(!activePointId)
            {
                $('.comment-list-form').hide();
            }
            else
                $('.comment-list-form').show();
            comments_shown = comments_to_show;
            localStorage.setItem(documentId+'/comments_shown', comments_shown);
		}

		var force_download = 0;
		var loadAnnotationsFromServer = undefined;
		(function(){
			var message = '';
			function getLocalAnnotations() {
				var res = getCookieStrict(documentId, documentId + '/annotations');
				if (!res)
					res = [];
				else
					res = JSON.parse(res);
				return res;
			}

			(function(){

				loadAnnotationsFromServer = function ()
				{
					if(!documentId)
					{
						bootbox.alert("Invalid Document Id");
						return;
					}
					var document_version = getDocumentVersion(documentId);
					var input_data = {doc_id:documentId, version:document_version};
					if(force_download == 1)
						input_data['force'] = 1;
					dn_rpc_object({
						url:'/get-annotations',
						data:input_data,
						no_loader:1,
						onSuccess: onAnnotationsDownloaded,
						onError:onAnnotationsLoadingFailed
					});
				}

				function onAnnotationsDownloaded(data)
				{
					var comments = data.comments;
					if(!Array.isArray(comments))
					{
						comments = [];
						console.log("Why not comments");
                    }
                    if(!data.annotations)
                    {
                        return;
                    }
                    else if(data.version == 0)
                    {
                        return;
                    }
                    var document_version = getDocumentVersion(documentId);
                    var document_dirty = isDocumentDirty(documentId);
                    if(data.version < document_version)
                    {
                        return;
                    }
                    var message = "Document annotation version="+data.version+" available from server,";
                    if(data.version == document_version)
                    {
                        if(document_dirty == 1)
                        {
                            message += "<br>You have same version="+document_version+" at local.";
                            message += "<br> If you download, it will discard your recent changes,";
                            message += "<br>Do you still want to download?";
                        }
                        else
                        {
                            return;
                        }
                    }
                    else
                    {
                        if(document_dirty == 1)
                        {
                            message += "<br>You have older version="+document_version+" at local.";
                            message += "<br>If you download, it will discard your recent changes,";
                            message += "<br>Do you still want to download?";
                        }
                        else
                        {
                            message += "<br>You have older version="+document_version+" at local.";
                            message += "<br>Please click ok to download latest version of your annotations";
                        }
                    }

                    bootbox.confirm(message, function(dr){
                        if(dr)
                        {
                            updateLocalAnnotationsFromServer(data.annotations, data.version, comments);
                        }
                    });
				}

				function updateLocalAnnotationsFromServer(annotations, version, comments) {

					annotations = annotations.filter(annot => annot.type != 'point' || annot.sub_type)
					annotations = annotations.concat(comments);
					annotations.forEach(function(item){
						item.class = 'Annotation';
					});
					var annotation_cookie = "";
					if(Array.isArray(annotations))
						annotation_cookie  = JSON.stringify(annotations);
					else
					{
						bootbox.alert("invalid annotations");
						return;
					}
					setCookieStrict(documentId, documentId + '/annotations', annotation_cookie);
					setDocVersion(documentId, version);
                    unSetDocDirty(documentId);
					render();
				}

				function onAnnotationsLoadingFailed(er){
					console.log(er);
				}

				$('body').on('click','.download-annotations',function(){
					force_download = 1;
					loadAnnotationsFromServer();
				});

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
						onSuccess: function(data){
							onAnnotationsUploaded(data, save_type);
						},
						onError: onAnnotationSaveFailed,
						type:'post'
					});
				}

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
		var RENDER_OPTIONS = {
			documentId: documentId,
			pdfDocument: null,
			scale: getCookieStrict(documentId, documentId + '/scale') || 1.33,
			rotate: getCookieStrict(documentId, documentId + '/rotate') || 0
		};

		_2.default.setStoreAdapter(new _2.default.LocalStoreAdapter());
		//PDFJS.workerSrc = './shared/pdf.worker.js';

		var NUM_PAGES = 0;
		var pdf_doc_data = undefined;
		var document_data = false;

		function render(doc_data) {
            site_functions.showLoader("renderdoc");
		    setTimeout(function(){
		        render_details(doc_data);
		    },20);
             setTimeout(function(){
                 site_functions.hideLoader("renderdoc");
             }, 6000);
		}

		function render_details(doc_data) {
			try{
                var pdfData = false;
				if(doc_data && doc_data.first_time)
				{
                    $('.topbar:first .annotation_button').hide();
                    $('#content-wrapper').hide();
                    $('.strt_sign.pdfjs').hide();
                    $('#main-div').hide();
                    $('.doc-reseter').hide();
                    $('.toolbar.topbar:first').show();
                    $('#annotated-doc-conatiner').show();
                    hideComments();

					if(doc_data.type)
					{
                        documentId = doc_data.type+'-'+doc_data.id+'.pdf';
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
                            force_download = 0;
                            RENDER_OPTIONS.documentId = documentId;
                            var cookieVal = localStorage.getItem(documentId+'/dirty');
                            if(!cookieVal)
                            {
                                initDocCookies(documentId);
                            }
                            if(doc_data.type == 'meeting'||doc_data.type == 'topic')
                            {
                                RENDER_OPTIONS.showAnnotations = true;
                            }
                            else{
                                RENDER_OPTIONS.showAnnotations = false;
                                if(doc_data.type == 'signature')
                                {
                                    $('.strt_sign').attr('doc_id', doc_data.id);
                                    if(doc_data.mp_signature_status == "Pending")
                                    {
                                        $('.strt_sign.pdfjs').show();
                                    }

                                    if(doc_data.mp_signature_status == "Completed") {
                                        $('.sign_completed.pdfjs').show();
                                    }
                                }
                            }
                            renderPdfData(pdf_doc_data);
                        });
					}
					else
					{
                        bootbox.alert("Invalid document data ", doc_data);
                        site_functions.hideLoader("renderdoc");
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
                        site_functions.hideLoader("renderdoc");
                        return;
					}
					renderPdfData(pdf_doc_data)
                }

                if(RENDER_OPTIONS.showAnnotations)
                {
                    $('.topbar:first .annotation_button').show();
                }

				function renderPdfData(pdfContent) {
					if(!pdfContent)
					{
                        alert("PDF not loaded");
                        site_functions.hideLoader("renderdoc");
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
                    if(!RENDER_OPTIONS.showAnnotations)
                    {
                        $('#content-wrapper').show();
                        site_functions.hideLoader("renderdoc");
                    }
                    var cb_page_renderd = undefined;
					for(var i = 1; i <= NUM_PAGES; i++){
					    cb_page_renderd = undefined;
						if(i == 1)
						{
                            cb_page_renderd = function(){
                                if(RENDER_OPTIONS.showAnnotations)
                                {
                                    $('#content-wrapper').show();
                                    site_functions.hideLoader("renderdoc");
                                }
                                if(RENDER_OPTIONS.showAnnotations && doc_data && doc_data.first_time)
                                {
                                    setTimeout(function(){
                                        comments_wrapper.css({'top':'96px', 'height':'calc(100vh - 96px)'});
                                        comment_list.css('min-height', 'calc(100vh - 246px)');
                                        setTimeout(function(){
                                            loadAnnotationsFromServer();
                                        }, 5000);
                                    }, 1001);
                                }
                            }
                        }
                        UI.renderPage(i, RENDER_OPTIONS, cb_page_renderd);
                    }
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
			var penSize = void 0;
			var penColor = void 0;

			function initPen() {
				//sami disabled
				// var size = document.querySelector('.toolbar .pen-size');
				// for (var i = 0; i < 20; i++) {
				//     size.appendChild(new Option(i + 1, i + 1));
				// }
				setPen(getCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/pen/size') || 1, getCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/pen/color') || '#000000');
				//var somefun = (0, _initColorPicker2.default);
				var somefun = _initColorPicker2.default;
				somefun(document.querySelector('.pen-color'), penColor, function(value) {
					setPen(penSize, value);
				});
			}

			function setPen(size, color) {
				var modified = false;

				if (penSize !== size) {
					modified = true;
					penSize = size;
					setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/pen/size', penSize);
					//document.querySelector('.toolbar .pen-size').value = penSize;
				}

				if (penColor !== color) {
					modified = true;
					penColor = color;
					//setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/pen/color', penColor);

					var selected = document.querySelector('.toolbar .pen-color.color-selected');
					if (selected) {
						selected.classList.remove('color-selected');
						selected.removeAttribute('aria-selected');
					}

					selected = document.querySelector('.toolbar .pen-color[data-color="' + color + '"]');
					if (selected) {
						selected.classList.add('color-selected');
						selected.setAttribute('aria-selected', true);
					}
				}

				if (modified) {
					UI.setPen(penSize, penColor);
				}
			}

			function handlePenSizeChange(e) {
				setPen(e.target.value, penColor);
			}
			//document.querySelector('.toolbar .pen-size').addEventListener('change', handlePenSizeChange);

			initPen();
		})();

		// Toolbar buttons
		(function() {
			var tooltype = 'cursor';
			function setActiveToolbarItem(type, button) {
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
				if(target.hasClass('pen') && active_btn.hasClass('pen'))
				{
					$('.topbar:first .cursor').click();
				}
				else
				{
					setActiveToolbarItem(e.target.getAttribute('data-tooltype'), e.target);
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

			$('.toolbar button').click(handleToolbarClick);
			$('.toolbar:first .cursor').click();
		})();

		// Scale/rotate
		(function() {
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
					setCookieStrict(RENDER_OPTIONS.documentId, RENDER_OPTIONS.documentId + '/rotate', RENDER_OPTIONS.rotate % 360);
                    render();
				}
            }

			var scale_select = document.querySelector('.toolbar select.scale');

			function handleScaleChange() {
				setScaleRotate(scale_select.value, RENDER_OPTIONS.rotate);
			}

			function handleRotateCWClick() {
				setScaleRotate(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate + 90);
			}

			function handleRotateCCWClick() {
				setScaleRotate(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate - 90);
			}

			if(!RENDER_OPTIONS.scale)
				RENDER_OPTIONS.scale = 1;
			scale_select.value = RENDER_OPTIONS.scale;
			scale_select.addEventListener('change', handleScaleChange);
			document.querySelector('.toolbar .rotate-ccw').addEventListener('click', handleRotateCCWClick);
			document.querySelector('.toolbar .rotate-cw').addEventListener('click', handleRotateCWClick);

			if(RENDER_OPTIONS.scale == 1.33)
				RENDER_OPTIONS.scale = 1;
			if(!scale_select.value)
			{
				if(!RENDER_OPTIONS.scale)
					RENDER_OPTIONS.scale = 1;
			}

			scale_select.value = RENDER_OPTIONS.scale;
			$('.zoomin').click(function(){
				if(RENDER_OPTIONS.scale>=5)
					return;
				var selected_option = scale_select.children[scale_select.selectedIndex];
				scale_select.value = $(selected_option).next().val();
				handleScaleChange();
			});
			$('.zoomout').click(function(){
				if(RENDER_OPTIONS.scale<=0.25)
					return;
				var selected_option = scale_select.children[scale_select.selectedIndex];
				scale_select.value = $(selected_option).prev().val();
				handleScaleChange();
			});
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
			var commentText = $('#commentText');
			function supportsComments(target) {
				var type = target.getAttribute('data-pdf-annotate-type');
				return ['point'].indexOf(type) > -1;
			}

			var pdfStoreAdapter = _2.default.getStoreAdapter();
			var onCommentAdded = function() {
				commentText.val('');
				commentText.focus();
				setTimeout(function(){
					comments_wrapper.scrollTop(5000);
				},100);
			};

			commentText.keyup(function(e) {
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
						user_name:dn_current_site_user.cookie.name,
						uid:dn_current_site_user.cookie.id,
						content:commentValue
					};
					//console.log(commentText.content)
					if(!comment.content)
						return false;
					pdfStoreAdapter.addComment(documentId, activePointId, comment).then(insertComment).then(onCommentAdded);
				}
			});

			loadALlCommentsOnDocument = function ()
			{
				comment_list.html('');
                var point_type = false;
                if(comments_to_show == 'notes')
                    point_type = 'personal';
				pdfStoreAdapter.getPointAnnotations(documentId, point_type).then(function(pointAnnotations) {
                    pointAnnotations = pointAnnotations.annotations;
					pointAnnotations.sort(function(a, b) {
						return a["page"] - b["page"] || a["y"] - b["y"] || a["x"] - b["x"];
					});
					//console.log(pointAnnotations);
					var cnt = -1;
					var counter = -1;
					var count = pointAnnotations.length;
					for(var i in pointAnnotations)
					{
						++cnt;
						pdfStoreAdapter.getComments(documentId, pointAnnotations[cnt].uuid).then(function(comments){
							//console.log(comments);
							++counter;
							var annotationItem = pointAnnotations[counter];
							renderCommentsByAnnotation(comments, annotationItem.uuid, annotationItem.sub_type);
						});

                    }
                    showCommentsContainer(comments_to_show);
				});
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

			$('.update-comment:first .delete').click(function(e){
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

            $('body').on('click','.show-all-comments', hideComments);

			$('body').on('click','#comment-wrapper .groupcomment',function(e){
				if($(e.target).is('.buttons'))
				{
					return;
				}
				var annotationId = $(this).attr('annotationId');
				if(!annotationId)
				{
					console.log("No attribute annotation");
					return;
				}
				var target = $('svg.annotationLayer').find('svg[data-pdf-annotate-id="'+annotationId+'"]')
				if(target)
				{
					target = target[0];
					UI.enableEdit(target);
					handleAnnotationClick(target);
					var rect = target.getBoundingClientRect();
					var vh = $('#viewer').height();
					var st = $('#content-wrapper').scrollTop();
					var ts = st + rect.y - wh/2;
					//console.log(rect.y, st, wh, ts,99);
					$('#content-wrapper').animate({ scrollTop: ts }, 400);
				}
				else
				{
					console.log(target, "Not found");
				}
			});

			function makeCommentItem(aComment)
			{
				//console.log(aComment);
				var child = document.createElement('div');
				child.className = 'comment-list-item';
				var child_info = '<div>'+ aComment.content+'</div>';
				aComment.date_time = getTimeString(aComment.date_time);
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

			function insertComment(aComment) {
				var child = makeCommentItem(aComment);
				comment_list.append(child);
            }
			var activeAnnotationItem = undefined;
			var annotationBiengEdited = false;
			function handleAnnotationClick(target) {
				activeAnnotationId = target.getAttribute('data-pdf-annotate-id');
				pdfStoreAdapter.getAnnotation(documentId, activeAnnotationId).then(function(item)
				{
					activeAnnotationItem = item;
					if (supportsComments(target)) {
                        activePointId = activeAnnotationId;
						site_functions.update_notification_list(activeAnnotationId);
						pdfStoreAdapter.getComments(documentId, activeAnnotationId).then(renderComments);
						if(activeAnnotationItem.sub_type)
						{
							showCommentsContainer('notes');
						}
						else
						{
							$('#pdf-annotate-edit-overlay a' ).remove();
							showCommentsContainer('comments');
						}
						setTimeout(function(){
							$('form.comment-list-form textarea').focus();
							setTimeout(function(){
								comments_wrapper.scrollTop(5000);
							},100);
						},100);
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
			save_drawing = function (onsave){
				if (hand_drawings.length > 1) {
					var annotations  = getCookieStrict(documentId, documentId + '/annotations');
					annotations = JSON.parse(annotations);
					var combined_drawing = hand_drawings[0];
					combined_drawing.to_merge = 0;
					annotations = annotations.filter( el => el.type != "drawing" );
					for(var i = 1; i < hand_drawings.length; i++){
						// annotations = annotations.filter( el => el.uuid != hand_drawings[i].uuid );
						combined_drawing.lines = combined_drawing.lines.concat(hand_drawings[i].lines);
					}
					annotations.push(combined_drawing);
					localStorage.setItem(documentId + '/annotations', JSON.stringify(annotations));
					hand_drawings = [];
					combined_drawing = {};
					if(!onsave)
						pdf_js_module.render();
				}
			}
			$(document).mousedown(function(e){
				var $target = $(e.target);
				if(contextMenuShown && !$target.is('.ContextMenuPopup button') && !$target.is('.ContextMenuPopup .colored'))
					$('.ContextMenuPopup').hide();
				if($('.topbar:first .pen:first').hasClass('active')){
					if($target.closest('#viewer').length == 0){
						save_drawing();
						$('.topbar:first .cursor:first').click();
					}
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
			});

			var ww = $(window).width();
			var wh = $(window).height();
			var dh = $(document).height();

			function handleAnnotationBlur(target) {
                annotationBiengEdited = false;
				if (supportsComments(target)) {
                    if($(target).children('svg').length > 0)
                        comments_to_show = 'comments';
                    else
                        comments_to_show = 'notes';
					loadALlCommentsOnDocument();
				}
			}

            $('.toolbar:first .comment').click(function(){
                UI.destroyEditOverlay();
                if($(this).is('.personal'))
                    comments_to_show = 'notes';
                else
                comments_to_show = 'comments';
                    loadALlCommentsOnDocument();
			});

			$('.cell.colored').click(function(){
				var obj = $(this);
				var color_value = obj.attr('hex').substring(1);
				if(activeAnnotationItem.color != color_value)
				{
					activeAnnotationItem.color = color_value;
					pdfStoreAdapter.editAnnotation(documentId, activeAnnotationId, activeAnnotationItem).then(function(res){
						obj.append($('#applied_color').show());
					});
				}
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