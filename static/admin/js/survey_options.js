function selectionEvent() {
    $('#questions-group .field-type select:visible').each(
        function(i, el) {
            addChoicesButton(el)
        }
    ).change(function() {
        addChoicesButton(this);
    })
}

// function on_add_choice_click(el) {
//     let element = this;
//     let choices = $(element).parent().next().find('textarea').val();
//     config = {
//         on_load: function() {
//             $('#appModal .modal-body').html('<input type="text" value="' + choices + '" class="tag_input" placeholder="Pres Enter to Add your choices"/>');
//             $('.tag_input').tagsInput({
//                 placeholder: 'Type your choice and press enter to add it.'
//             });
//         },
//         on_close: function() {
//             let choices = $('.tag_input').val()
//             choices_list = choices_to_list(choices);
//             let parent = $(element).parent();
//             if (choices_list.length <= 1) {
//                 parent.find('.choice_error').remove();
//                 parent.append('<span class="choice_error" style="color:red">Please add more than 1 choices</span>');
//                 $('.submit-row').find('input[type="submit"]').attr('disabled', 'disabled');
//             } else {
//                 parent.find('.choice_error').remove();
//                 $('.submit-row').find('input[type="submit"]').removeAttr('disabled');
//                 $('#appModal').modal('hide');
//             }
//             append_choices(parent, choices);
//         }
//     }
//     window['init_popup'](config);
// }
selectionEvent();

// function append_choices(el, choices) {
//     let selection_value = el.find('select')[0].value;
//     let choices_list = choices_to_list(choices);
//     el.next().find('textarea').val(choices);
//     var choice_list_td = el.closest('tr').find('.field-text:first');    
//     var choice_list_container = undefined;
//     if(choice_list_td.find('.choice_list').length > 0)
//     {
//         choice_list_container = choice_list_td.find('.choice_list:first');
//         choice_list_container.html('');
//     }
//     else
//     {
//         choice_list_td.append('<div class="added_choices"><b>Added Choices</b><div class="choice_list"></div><div>');
//         choice_list_container = choice_list_td.find('.choice_list:first');
//     }
//     for (let i in choices_list) {
//         if (selection_value == 'radio') {
//             choice_list_container.append('<div class="choice"><input name="' + choices_list[i] + '" type="radio" disabled><label for="scales">' + choices_list[i] + '</label></div>');
//         } else if (selection_value == 'select-multiple') {
//             choice_list_container.append('<div class="choice"><input name="' + choices_list[i] + '" type="checkbox" disabled><label for="scales">' + choices_list[i] + '</label></div>');
//         }
//     }
// }

function choices_to_list(choices) {
    if (choices) {
        return choices.split(',');
    } else {
        return [];
    }
}
// console.log('abc', 2134);
function addChoicesButton(el) {
    $('#questions-group table tr td:nth-child(4)').hide();
    $('#questions-group table tr th:nth-child(4)').hide();
    var parent = $(el).parent();
    parent.find('button').remove();
    if (el.value == 'radio' || el.value == 'select-multiple') 
    {   
        $('.submit-row').find('input[type="submit"]').attr('disabled', 'disabled');
        $(el).parent().find('.tagsinput').show();
        var choices_tag_input = $(el).parent().next().find('textarea');
        parent.append(choices_tag_input);
        choices_tag_input.tagsInput({
            placeholder: 'Type your choice and press enter to add it.',
            onAddTag: function(){
                $(el).parent().next().find('textarea').val($(this).val());
                let choices = $(this).val();
                choices = choices_to_list(choices);
                if (choices.length <=1)
                {
                    parent.find('.choice_error').remove();
                    parent.append('<span class="choice_error" style="color:red">Please add more than 1 choices</span>');
                    $('.submit-row').find('input[type="submit"]').attr('disabled', 'disabled');
                }
                else
                {
                    parent.find('.choice_error').remove();
                    $('.submit-row').find('input[type="submit"]').removeAttr('disabled');
                }
            },
            onRemoveTag: function(){
                parent.next().find('textarea').val($(this).val());
                let choices = $(this).val();
                choices = choices_to_list(choices);
                // if (!choices.length)
                // {
                //     parent.find('.choice_error').remove();
                //     $('.submit-row').find('input[type="submit"]').removeAttr('disabled');
                // }
                // else if( choices.length == 1)
                if( choices.length == 1)
                {
                    parent.find('.choice_error').remove();
                    parent.append('<span class="choice_error" style="color:red">Please add more than 1 choices</span>');
                    $('.submit-row').find('input[type="submit"]').attr('disabled', 'disabled');
                }
            }
        });

    } else {
        $(el).parent().find('.tagsinput').hide();
        parent.find('.choice_error').remove();
        $('.submit-row').find('input[type="submit"]').removeAttr('disabled');
    }
    $('.add-row').click(function() {
        selectionEvent();
    });
}