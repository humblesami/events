$(function(){
    $("#icr").change(function(){

    var files = this.files;
            if(files.length < 1)
            {
                document.getElementById('img2').src = '';
                $('#text2').html("");
                return;
            }
            var file = files[0];
            var reader = new FileReader();

            reader.onload = function(e) {
                document.getElementById('img2').src = e.target.result;
                req_url = '/simplehtr/gettext';
                input_data = {dataURL:e.target.result,type:'icr' };
                dn_json_rpc(req_url,input_data, function(data){
                    console.log(data.text);
                    $('#text2').html(data.text);

                });
            }
            reader.readAsDataURL(file);
            var dataURL = reader.result;

    });






    $("#ocr").change(function(){

    var files = this.files;
            if(files.length < 1)
            {
                document.getElementById('img1').src = '';
                $('#text1').html("");
                return;
            }
            var file = files[0];
            var reader = new FileReader();

            reader.onload = function(e) {
                document.getElementById('img1').src = e.target.result;
                req_url = '/simplehtr/gettext';
                input_data = {dataURL:e.target.result,type:'ocr' };
                dn_json_rpc(req_url,input_data, function(data){
                    console.log(data.text);
                    $('#text1').html(data.text);

                });
            }
            reader.readAsDataURL(file);
            var dataURL = reader.result;




    });



});