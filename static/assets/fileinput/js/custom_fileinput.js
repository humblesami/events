function addFileInputs()
{
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
    $("#attachment").fileinput();
    addFileInputs();
    $('a.add-handler.djn-model-meetings-topic').click(function(){
        setTimeout(() => {
            addFileInputs();
        }, 500);
    });
});