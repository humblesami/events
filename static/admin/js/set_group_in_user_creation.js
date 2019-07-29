$(function(){
    $('.field-groups').hide();
    var url = new URL(window.location.toString());
    var group = url.searchParams.get("group");
    var groups = $('select[name="groups"]');
    var tries = 0;
    function select_group(){
        if(groups.length == 0)
        {
            console.log('Sorry, group field not found')
        }
        tries++;
        if(tries>5)
        {
            console.log('No groups sorry')
            return;
        }
        setTimeout(function(){
            groups = groups.children();
            if(groups.length == 0)
            {
                console.log('No data in groups, retrying')
                select_group();
                return;
            }
            groups.each(function(i, el){
                if(group == el.innerHTML.toLowerCase())
                {
//                    console.log(group, el);
                    el.selected = true;
                }
            })
        }, 1000)
    }
    select_group();
})
