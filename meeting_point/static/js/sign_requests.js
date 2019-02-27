$(function(){
console.log(6666666)

$('.request_sign').click(function()
{
     $('.upload_file_esign').click();
})




odoo.define('dn.esign', function (require) {

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}




$('.upload_file_esign').change(function()
{
    var file = this.files[0];
    if(!file){
        return
    }
    getBase64(file).then(
    data => {
        console.log(data)
        var req_url = '/document/mp/save_doc';
        var base64 = data.split(",")[1]
        var input_data = {name:file.name,filename:file.name,attachment:base64};
        dn_json_rpc(req_url,input_data, function(data)
        {
            var web_client = require('web.web_client');
            web_client.do_action({
            type: 'ir.actions.act_window',
            res_model: 'meeting_point.document',
            res_id: data.doc_id,
            view_mode: 'form',
            views: [[data.view_id, 'form']],
            context: {'form_view_initial_mode': 'edit', 'force_detailed_view': 'true'},
            target: 'current'
            });
        });
    }
    );








})





});



});