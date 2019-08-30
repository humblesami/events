function addFileInputs()
{
    var fileinputs = $(".attachment").not('.fileinput');
    fileinputs.fileinput();
    fileinputs.addClass('fileinput');
    return;

    setTimeout(() => {
        var topic_containers = $('#topic_set-group .djn-item.dynamic-form');
            // console.log(topic_containers.length)
            // let container = $('div[data-inline-model="meetings-topic"].inline-group [data-inline-formset]:visible');
            topic_containers.each((i,el)=>{
                let check = $(el).find('#topic_attachment-'+i);
                if (!check.length)
                {
                    let fileInput = `<input 
                                        id="topic_attachment-${i}" 
                                        name="topic_attachment-${i}" 
                                        class="topic_attachment file" 
                                        type="file" 
                                        multiple data-min-file-count="1" 
                                        data-theme="fas">`;
                    $(el).append(fileInput).append('Selected cloud files <input class="cloud_files" />');
                    $('#topic_attachment-'+i).fileinput();
                }
            });
    }, 1000);
}
$(function () {
    setTimeout(() => {
        console.log($('.document_set .add-row a').length, 3434);
        $('.document_set .add-row a').click(function(){
            console.log(4444);        
            setTimeout(addFileInputs, 500);
        });
    }, 500);
    
});