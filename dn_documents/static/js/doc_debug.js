(function(){
    setTimeout(loadDocument, 50);
    dn_json_rpc_object.loaderContainer.show();
    setTimeout(function(){
        dn_json_rpc_object.loaderContainer.hide();
    }, 10000);
    function loadDocument(){
        var annot_view_markup = `
        <div class="pdf-annotator" id="annotated-doc-conatiner">
            <link href="/dn_documents/static/annotator/shared/toolbar.css" rel="stylesheet" type="text/css" />
            <link href="/dn_documents/static/annotator/shared/custom.css" rel="stylesheet" type="text/css" />
            <link href="/dn_documents/static/annotator/annotator.css" rel="stylesheet" type="text/css" >
            <div class="toolbar topbar" style="display:none">
                <a disabled class="toolbarButton page-prev-btn">
                    <i class="fas fa-arrow-up"></i>
                </a>
                <a disabled class="toolbarButton page-next-btn">
                    <i class="fas fa-arrow-down"></i>
                </a>

                <div class="input-number">
                    <input class="form-control"
                           type="number" class="page-number"
                           value="1">
                    <span>of <span class="page-count">1</span></span>
                </div>

                <a class="icon back" title="Back">
                    <img style="border:1px solid silver" height="28" src="assets/img/back.png">
                </a>

                <button class="strt_sign pdfjs" url='/meeting_point/save_signature_doc' style="display: none">Sign</button>
                <button class="cursor annotation_button" type="button" title="Cursor" data-tooltype="cursor">
                    <div class="Icon">
                        <svg viewBox="0 0 24 24" id="ic_select_black_24px" width="100%" height="100%">
                            <g fill="none" fill-rule="evenodd">
                                <path d="M11.022 14.577l-2.92 1.047a1 1 0 0 1-1.33-1.036L7.817 3.465a1 1 0 0 1 1.701-.614l7.95 7.92a1 1 0 0 1-.37 1.651l-2.96 1.061 2.576 7.078a.996.996 0 0 1-.596 1.278l-1.23.448a.996.996 0 0 1-1.278-.596z" fill="currentColor"></path>
                                <path d="M0 0h24v24H0z"></path>
                            </g>
                        </svg>
                    </div>
                </button>

                <button class="pen annotation_button" type="button" title="Pen Tool" data-tooltype="draw">
                    <div class="Icon">
                        <svg viewBox="0 0 24 24" id="ic_annotation_freehand_black_24px" width="100%" height="100%">
                            <g fill="none" fill-rule="evenodd">
                                <path d="M0 0h24v24H0z"></path>
                                <path fill="currentColor" d="M9.662 8.523l4.242-4.243 7.071 7.071-4.242 4.243a1 1 0 0 1-1.414 0L9.662 9.937a1 1 0 0 1 0-1.414zm-.707 2.121l5.656 5.657L9.6 18.807a1 1 0 0 1-1.154-.187l-1.81-1.81a1 1 0 0 1-.186-1.154zm-2.829 7.071l1.414 1.414c-1.32 1.037-2.144 1.39-2.474 1.06-.33-.33.023-1.154 1.06-2.474z"></path>
                            </g>
                        </svg>
                    </div>
                </button>

                <button class="comment annotation_button" style="padding-top: 0" type="button" title="Comment" data-tooltype="point">
                    <span class="Icon">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="25px" height="25px" viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
                            <g>
                                <g>
                                    <g>
                                        <path d="M28.023,23.309C29.258,22.154,30,20.675,30,19.061c0-3.688-3.877-6.679-8.659-6.679s-8.66,2.99-8.66,6.679
                                            c0,3.688,3.877,6.681,8.66,6.681c1.511,0,2.931-0.3,4.166-0.824l3.153,1.608L28.023,23.309z M15.975,22.673
                                            c-1.292-0.997-2.003-2.279-2.003-3.612c0-1.332,0.711-2.615,2.003-3.611c1.418-1.093,3.322-1.695,5.366-1.695
                                            c2.043,0,3.949,0.603,5.366,1.695c1.292,0.996,2.003,2.279,2.003,3.611c0,1.333-0.711,2.615-2.003,3.612
                                            c-1.417,1.093-3.323,1.693-5.366,1.693C19.297,24.368,17.393,23.766,15.975,22.673z"></path>
                                        <g>
                                            <circle cx="18.27" cy="19.081" r="0.948"></circle>
                                            <circle cx="21.34" cy="19.081" r="0.948"></circle>
                                            <circle cx="24.413" cy="19.081" r="0.948"></circle>
                                        </g>
                                    </g>
                                    <g>
                                        <path d="M5.268,19.437c-2.066-1.594-3.205-3.645-3.205-5.776c0-2.131,1.138-4.183,3.205-5.776
                                            c2.267-1.748,5.315-2.711,8.583-2.711c3.269,0,6.316,0.963,8.583,2.711c1.564,1.207,2.598,2.676,3.006,4.243
                                            c0.787,0.197,1.533,0.463,2.229,0.789c-0.496-5.553-6.492-9.939-13.817-9.939C6.201,2.978,0,7.761,0,13.661
                                            c0,2.581,1.187,4.948,3.163,6.795l-2.691,6.566l6.715-3.995c1.774,0.752,3.786,1.214,5.926,1.3
                                            c-0.576-0.705-1.018-1.48-1.296-2.309C9.331,21.704,7.056,20.816,5.268,19.437z"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>
                </button>

                <button class="personal comment annotation_button" type="button" title="Personal Note" data-tooltype="point">
                    <div class="Icon">
                        <svg width="25" height="25" viewBox="0 0 30 30" x="461" y="185" data-pdf-annotate-id="e8114a67-e5e3-4bf3-be35-d25aa831f0e2" data-pdf-annotate-type="point" aria-hidden="true" transform="scale(1) rotate(0) translate(0, 0)">
                            <rect width="26.075428" height="21.096582" x="1.962286" y="1" style="fill:white;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1;stroke-opacity:1"></rect>
                            <rect width="18.4" height="1.5012145" x="5.8" y="5" style="fill:#000000;fill-opacity:1;stroke:none"></rect>
                            <rect width="18" height="0.86" x="6" y="10" style="fill:#000000;fill-opacity:1;stroke:none"></rect>
                            <rect width="18.4" height="0.86" x="5.8" y="14" style="fill:#000000;fill-opacity:1;stroke:none"></rect>
                            <rect width="18" height="0.86" x="6" y="18" style="fill:#000000;fill-opacity:1;stroke:none"></rect>
                        </svg>
                    </div>
                </button>

                <button class="zoomout">
                    <div class="Icon">
                        <svg viewBox="0 0 24 24" id="ic_zoom_out_black_24px" width="100%" height="100%">
                            <g fill="none" fill-rule="evenodd">
                                <path d="M7 11v2h10v-2zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" fill-rule="nonzero"></path>
                                <path d="M0 0h24v24H0z"></path>
                            </g>
                        </svg>
                    </div>
                </button>
                <div class="selectBox">
                    <style>
                        select {
                            background: transparent;
                            -webkit-appearance: none;
                            -moz-appearance: none;
                            text-indent: 1px;
                            text-overflow: '';
                            border: 0;
                            color: darkslategrey;
                        }
                    </style>
                    <select class="scale" disabled>
                        <option value="0.25">25%</option>
                        <option value="0.5">50%</option>
                        <option value="0.75">75%</option>
                        <option value="1">100%</option>
                        <option value="1.25">125%</option>
                        <option value="1.5">150%</option>
                        <option value="1.75">175%</option>
                        <option value="2">200%</option>
                        <option value="2.5">250%</option>
                        <option value="3">300%</option>
                        <option value="4">400%</option>
                        <option value="5">500%</option>
                    </select>
                </div>
                <button class="zoomin">
                    <div class="Icon">
                        <svg viewBox="0 0 24 24" id="ic_zoom_in_black_24px" width="100%" height="100%">
                            <g fill="none" fill-rule="evenodd">
                                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" fill-rule="nonzero"></path>
                                <path d="M0 0h24v24H0z"></path>
                            </g>
                        </svg>
                    </div>
                </button>
                <a href="javascript://" class="rotate-ccw" title="Rotate Counter Clockwise">
                    <div class="Icon">
                        <svg viewBox="0 0 24 24" id="ic_rotate_left_black_24px" width="100%" height="100%">
                            <g fill="none" fill-rule="evenodd">
                                <path d="M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z" fill="currentColor" fill-rule="nonzero"></path>
                                <path d="M0 0h24v24H0z"></path>
                            </g>
                        </svg>
                    </div>
                </a>
                <a href="javascript://" class="rotate-cw" title="Rotate Clockwise">
                    <div class="Icon">
                        <svg viewBox="0 0 24 24" id="ic_rotate_right_black_24px" width="100%" height="100%">
                            <g fill="none" fill-rule="evenodd">
                                <path d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10zM19.93 11a7.906 7.906 0 0 0-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z" fill="currentColor" fill-rule="nonzero"></path>
                                <path d="M0 0h24v24H0z"></path>
                            </g>
                        </svg>
                    </div>
                </a>
                <a class="comments-toggler annotation_button" title="Show Comments">
                    <div class="Icon">
                        <svg viewBox="0 0 24 24" id="ic_left_sidebar_black_24px" width="100%" height="100%">
                            <g fill="none" fill-rule="evenodd">
                                <path d="M21 4c1.1 0 2 .9 2 2v13c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 15V6H9v13zM3 10.5V12h4v-1.5zM3 8v1.5h4V8zm0 5v1.5h4V13zm0 2.5V17h4v-1.5z" fill="currentColor" fill-rule="nonzero"></path>
                                <path d="M0 0h24v24H0z"></path>
                            </g>
                        </svg>
                    </div>
                </a>
            </div>
            <div id="content-wrapper">
                <div id="viewer" class="pdfViewer"></div>
            </div>
            <div id="comment-wrapper">
                <div class="header comment-header">
                    <span class="show-all-comments">
                       <i class="fa fa-times-circle"></i>
                    </span>
                    <span class="title">Comments</span>
                </div>
                <div class="comment-list">
                    <div class="comment-list-container">
                        <div class="comment-list-item">No comments</div>
                    </div>
                </div>
                <form class="comment-list-form">
                    <textarea id="commentText" placeholder="Add a Comment"></textarea>
                </form>
            </div>

            <div class="toolbar annotation-options ContextMenuPopup">
                <div class="Button btn-icon">
                    <button class="underline" type="button" title="underline" data-tooltype="underline">
                        <div class="Icon">
                            <svg viewBox="0 0 24 24" id="ic_annotation_underline_black_24px" width="100%" height="100%">
                                <g fill="none" fill-rule="evenodd">
                                    <path fill="currentColor" d="M14.308 14.321H9.684L8.804 17H6l4.765-13h2.444L18 17h-2.804zm-3.912-2.17h3.2l-1.61-4.865zM5 18.5h14v2H5z"></path>
                                    <path d="M0 0h24v24H0z"></path>
                                </g>
                            </svg>
                        </div>
                    </button>
                </div>
                <div class="Button btn-icon">
                    <button class="strikeout" type="button" title="strikeout" data-tooltype="strikeout">
                        <div class="Icon">
                            <svg viewBox="0 0 24 24" id="ic_annotation_strikeout_black_24px" width="100%" height="100%">
                                <g fill="none" fill-rule="evenodd">
                                    <path fill="currentColor" d="M9.521 16l-.717 3H6l1.021-3zm-1.139-4l2.383-7h2.444l2.395 7h-2.39l-1.227-3.714L10.772 12zm8.591 4L18 19h-2.804l-.725-3zM5 13h14v2H5z"></path>
                                    <path d="M0 0h24v24H0z"></path>
                                </g>
                            </svg>
                        </div>
                    </button>
                </div>
                <div class="Button btn-icon">
                    <button class="highlight" type="button" title="Highlight" data-tooltype="highlight">
                        <div class="Icon">
                            <svg viewBox="0 0 24 24" id="ic_annotation_highlight_black_24px" width="100%" height="100%">
                                <g fill="none" fill-rule="evenodd">
                                    <path fill="currentColor" d="M19 3c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm-4.947 12.341l.789 2.344h2.492L13.076 6.31h-2.172L6.67 17.685h2.492l.781-2.344zm-3.477-1.898l1.414-4.258 1.43 4.258z"></path>
                                    <path d="M0 0h24v24H0z"></path>
                                </g>
                            </svg>
                        </div>
                    </button>
                </div>

                <div class="Button btn-icon">
                    <button class="copy" type="button" title="Copy" data-tooltype="copy">
                        <div class="Icon">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 34.555 34.555" style="enable-background:new 0 0 34.555 34.555;" xml:space="preserve">
                                <g>
                                    <g>
                                        <g>
                                            <path d="M24.065,34.555H5.489c-1.379,0-2.5-1.122-2.5-2.5V7.864c0-1.378,1.121-2.5,2.5-2.5h2.364c0.276,0,0.5,0.224,0.5,0.5
                                            s-0.224,0.5-0.5,0.5H5.489c-0.827,0-1.5,0.673-1.5,1.5v24.19c0,0.827,0.673,1.5,1.5,1.5h18.576c0.827,0,1.5-0.673,1.5-1.5v-2.365
                                            c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v2.365C26.565,33.433,25.444,34.555,24.065,34.555z"/>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path d="M29.065,29.19H10.489c-1.379,0-2.5-1.122-2.5-2.5V2.5c0-1.378,1.121-2.5,2.5-2.5h13.604c0.276,0,0.5,0.224,0.5,0.5
                                            S24.37,1,24.094,1H10.489c-0.827,0-1.5,0.673-1.5,1.5v24.19c0,0.827,0.673,1.5,1.5,1.5h18.576c0.827,0,1.5-0.673,1.5-1.5V7.661
                                            c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5V26.69C31.565,28.069,30.444,29.19,29.065,29.19z"/>
                                            <path d="M31.065,8.161h-6.972c-0.276,0-0.5-0.224-0.5-0.5V0.688c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v6.473h6.472
                                            c0.276,0,0.5,0.224,0.5,0.5S31.342,8.161,31.065,8.161z"/>
                                            <path d="M31.065,8.161c-0.13,0-0.26-0.051-0.358-0.151l-6.972-7.161c-0.192-0.198-0.188-0.514,0.01-0.707
                                            c0.197-0.191,0.516-0.187,0.707,0.01l6.972,7.161c0.192,0.198,0.188,0.514-0.01,0.707C31.317,8.114,31.191,8.161,31.065,8.161z"/>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </button>
                </div>

            </div>

            <div class="update-comment ContextMenuPopup">
                <div class="Button icon">
                    <button class="edit" type="button">
                        <div class="Icon">
                            Edit
                        </div>
                    </button>
                </div>
                <div class="Button icon">
                    <button class="delete" type="button">
                        <div class="Icon">
                            Delete
                        </div>
                    </button>
                </div>
            </div>

            <div class="Popup ColorPalettePopup ContextMenuPopup colors">
                <div class="Popup StylePopup">
                    <div class="row">
                        <div class="cell colored" hex="#000000" rgb="rgb(0,0,0)" style="background-color: rgb(0,0,0);">
                            <div id="applied_color" class="Icon check-mark dark" viewBox="0 0 24 24">
                                <svg viewBox="0 0 24 24" id="ic_check_black_24px" width="100%" height="100%">
                                    <g fill="none" fill-rule="evenodd">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" fill-rule="nonzero"></path>
                                        <path d="M0 0h24v24H0z"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div class="cell colored" hex="#FFFFFF" rgb="rgb(255,255,255)" style="background-color: rgb(255,255,255);"></div>
                        <div class="cell colored" hex="#FF0000" rgb="rgb(255,0,0)" style="background-color: rgb(255,0,0);"></div>
                        <div class="cell colored" hex="#00FF00" rgb="rgb(0,255,0)" style="background-color: rgb(0,255,0)"></div>
                    </div>
                    <div class="row">
                        <div class="cell colored" hex="#0000FF" rgb="rgb(0,0,255)" style="background-color: rgb(0,0,255);"></div>
                        <div class="cell colored" hex="#FFFF00" rgb="rgb(255,255,0)" style="background-color: rgb(255,255,0);"></div>
                        <div class="cell colored" hex="#00FFFF" rgb="rgb(0,255,255)" style="background-color: rgb(0,255,255);"></div>
                        <div class="cell colored" hex="#FF00FF" rgb="rgb(255,0,255)" style="background-color: rgb(255,0,255);"></div>

                    </div>
                    <div class="row">
                        <div class="cell colored" hex="#C0C0C0" rgb="rgb(192,192,192)" style="background-color: rgb(192,192,192);"></div>
                        <div class="cell colored" hex="#808080" rgb="rgb(128,128,128)" style="background-color: rgb(128,128,128);"></div>
                        <div class="cell colored" hex="#00cc63" rgb="rgb(128,0,0)" style="background-color: rgb(0, 204, 99);"></div>
                        <div class="cell colored" hex="#808000" rgb="rgb(128,128,0)" style="background-color: rgb(128,128,0);"></div>
                    </div>
                    <div class="row">
                        <div class="cell colored" hex="#008000" rgb="rgb(0,128,0)" style="background-color: rgb(0,128,0);"></div>
                        <div class="cell colored" hex="#800080" rgb="rgb(128,0,128)" style="background-color: rgb(128,0,128);"></div>
                        <div class="cell colored" hex="#008080" rgb="rgb(0,128,128)" style="background-color: rgb(0,128,121);"></div>
                        <div class="cell colored" hex="#000080" rgb="rgb(0,0,128)" style="background-color: rgb(0,0,128);"></div>
                    </div>
                </div>
            </div>
            <style>
            .modal.o_technical_modal .modal-dialog .modal-content
             {
                min-height: 90vh;
             }
            </style>
        </div>`;

        var changePage = function(pageToMove){
            var total_pages = $('.page-count').html();
            var page_num = 1;
            if(pageToMove < 1 || pageToMove > total_pages)
                page_num = pageToMove = 1;
            if(pageToMove == 1)
                $('.page-prev-btn').attr("disabled", "disabled");
            else
                $('.page-prev-btn').removeAttr('disabled');

            if(pageToMove == this.total_pages)
                $('.page-next-btn').attr("disabled", "disabled");
            else
                $('.page-next-btn').removeAttr('disabled');

            $('#content-wrapper').scrollTop(800 * (pageToMove - 1))
        }

        $('body').on('change', '.input-number input', function(){
            var curr_page = parseInt($(this).val());
            changePage(curr_page)
        });

        $('body').on('click', '.page-prev-btn', function(){
            var curr_page = parseInt($('.input-number input').val());
            changePage(curr_page-1)
        })

        $('body').on('click', '.page-next-btn', function(){
            var curr_page = parseInt($('.input-number input').val());
            changePage(curr_page+1)
        })

        $(function(){
           var input=$('input.doc_name');
           if(input){
                var page_loaded = false;
                $(document).on('focus', '.note-editable.panel-body',function(){
                    if(!page_loaded)
                    {
                        input.focus();
                        page_loaded = true;
                    }
                });
                input.blur(function(){
                    input.change();
                });
           }

           var req_url = '/doc/binary';
           var doc_id = $('.doc_meta > .doc_id').html();
           var doc_model = $('.doc_meta > .doc_model').html();
           var input_data = {
               "doc_id":doc_id,
               "doc_model": doc_model
           }

           dn_json_rpc(req_url,input_data, function(data)
           {
               data = {doc:data.doc, id: doc_id, first_time: 1, type : data.type};
               $('#pdf_div').append('<script src="/dn_documents/static/annotator/annotator.js"></script>');
               pdf_js_module.render(data);
           });


            if(!odoo.pdf_libs)
            {
                var libs = '';
                var dnow = Date.now();
                libs += '<script src="/dn_documents/static/annotator/rt_clipboard.js?v='+dnow+'"></script>';
                libs += '<script src="/dn_documents/static/annotator/color.js"></script>';
                libs += '<script src="/dn_documents/static/annotator/jsonlib.js"></script>';
                libs += '<script src="/dn_documents/static/annotator/main.js"></script>';
                libs += '<script src="/dn_documents/static/annotator/modules/m0.js?v='+dnow+'"></script>';
                libs += '<script src="/dn_documents/static/annotator/modules/m1.js"></script>';
                libs += '<script src="/dn_documents/static/annotator/modules/m2.js?v='+dnow+'"></script>';
                libs += '<script src="/dn_documents/static/annotator/modules/m3.js"></script>';
                libs += '<script src="/dn_documents/static/annotator/modules/m4.js"></script>';
                libs += '<link href="/dn_documents/static/annotator/shared/pdf.viewer.css" rel="stylesheet" type="text/css" />';
                libs += '<script src="/dn_documents/static/annotator/shared/pdf.viewer.js"></script>';
                $('body').append(libs);
                odoo.pdf_libs = 1;
            }
            $('#pdf_div').append(annot_view_markup);
            $('.o_technical_modal.in:first').show();

             $('#content-wrapper').scroll(function() {
                var page_num = 1;
                var scroll = $(this).scrollTop();
                if(scroll == 0 )
                    scroll = 1;
                page_num = Math.ceil(scroll / 780);
                $('.input-number input').val(page_num);
                if(page_num == 1)
                    $('.page-prev-btn').attr("disabled", "disabled");
                else
                    $('.page-prev-btn').removeAttr('disabled');

                if(page_num == $('.page-count').html())
                    $('.page-next-btn').attr("disabled", "disabled");
                else
                    $('.page-next-btn').removeAttr('disabled');
            });

            $('.input-number input').keyup(function(e){
                var curr_page = parseInt($(this).val());
                var total_page = parseInt($('.page-count').html());
                if(e.keyCode == 13){
                    if(curr_page < 1 || curr_page > total_page){
                        curr_page = 1;
                        $('.input-number input').val(curr_page);
                    }
                    changePage(curr_page);
                }
            });
        });
    }
})()