var show_comments = false;
var mouse_dragged = false;
var comments_shown = false;
var comment_sub_type = false;
var contextMenuShown = false;
var colorPickerShown = false;
var editingAnnotation = false;
var annotation_mode = 1;

var sign_lib = 0;

$(function(){           
    var comment_to_be_added = false;
    function comment_case()
    {
        if(!comment_to_be_added)
        {
            comment_to_be_added = true;
        }
        else
        {
            comment_to_be_added = false;
            $('.toolbar:first .cursor').click();
        }
    }

    var isdown = false;
    // var downpoint = undefined;
    // $(document).on('mousedown', '#viewer', function(e) {
    //     downpoint = e;
    //     isdown = true;
    // });
    // $(document).on('mousemove', '#viewer', function(e) {
    //     if(isdown)
    //     {    
    //     }
    // });    



    var last_active_was_comment = false;
    $(document).on('mouseup', '#viewer', function(e) {
        if(isdown)
        {            
            
        }
        isdown = false;
        if(annotation_mode != 1)
            return;
        setTimeout(function(){                
            var selection = window.getSelection();                
            if(selection.type == 'Range' && (selection.baseOffset != 0 || selection.focusOffset != 0 ))
            {
                var ctxMenu = $('.annotation-options.ContextMenuPopup');
                ctxMenu.css({'left':e.pageX - ctxMenu.width()/2, 'top':e.clientY+12}).show();
                //console.log(ctxMenu.position());
                contextMenuShown = true;
            }
            else
            {
                var pen_active = $('.toolbar .pen').hasClass('active');
                var cursor_active = $('.toolbar .cursor').hasClass('active');
                var comment_active = $('.toolbar .comment').hasClass('active');
                if(comment_active)
                {
                    if(last_active_was_comment)
                        last_active_was_comment = true;
                    else
                    {
                        last_active_was_comment = false;
                        if(!cursor_active)
                            $('.toolbar .cursor').click();
                    }
                }
                else if(!pen_active && !cursor_active)                
                    $('.toolbar .cursor').click();                
            }
        },10);
    });        
});
