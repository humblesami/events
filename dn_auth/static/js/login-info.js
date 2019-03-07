
        $(function(){
            $('.o_form_buttons_edit').hide();
            $('.breadcrumb:first li:first').html('');
                $('#date-div').hide();
                $("#ungrouped-logins").hide();
                var dt = new Date();
                dt = getDateString(dt);
                $('#date-from').val(dt);
                $('#date-to').val(dt);
                $('select').change(function()
                {
                    if ($(this).val() == 'Date'){
                        $('#duration-div').hide();
                        $('#date-div').show();
                    }
                    else{
                        $('#duration-div').show();
                        $('#date-div').hide();
                    }
                });
                $('body').on('click', "#chkall",function(){
                    $("input:checkbox[name=chk]").prop('checked', $(this).prop("checked"));
                });
                $('#unique-user').click(fetch_logins);
                $('#grouped-by-user').click(function(){
                    if($(this).prop('checked'))                    
                        $('#unique-user').prop('checked', false).parent().hide();
                    else
                        $('#unique-user').parent().show();
                    fetch_logins(); 
                });
                dn_json_rpc('/dn_auth/site_users',{},function(data){ 
                    load_users(data);
                    $('#chkall').click();
                    fetch_logins();                
                });
            });

        var users = [
            {id:1,name:'sami akram',eamil:'sami@live.com'},
            {id:2,name:'sami a1kram',eamil:'sami1@live.com'},
            {id:3,name:'sami a2kram',eamil:'sami1@live.com'},
            {id:4,name:'sami a3kram',eamil:'sami1@live.com'}
        ];
        var logins = [];

        function load_users(users)
        {
            var usersContent = '';
            //console.log(users);
            var opt_val = '0';
            users.forEach(function(user, i) {
                if (user.id)
                    opt_val = 'value='+ user.id;
                else
                    opt_val = 'value=0';
                usersContent += '<option '+ opt_val + ' pid='+user.pid+' email="'+ user.email + '">'+user.name+'</option>';
            });
            $('#user-drop-down').html(usersContent).select2({
                placeholder:'All Users...'
            });
        }

        var change_from_code = false;
        $('#user-drop-down').change(function(el){
            if(change_from_code)
            {
                change_from_code = false;
                return;
            }
            var added = el.added;
            var removed = el.removed;
            if(added && added.id == 0)
            {
                var drop_down = $(this);
                var now_selected = drop_down.find('option:selected:last');
                var option = added.element["0"];
                var pid = $(option).attr('pid');
                var all_options = $(this).children();
                dn_json_rpc('/committee_to_users',{pid:pid},function(data){
                    //option.selected = false;
                    $(option).remove();
                    data.forEach(function(uid){
                        all_options.each(function(i, el){
                            if(el.value == uid)
                                el.selected = true;
                        });
                    });
                    change_from_code = true;
                    drop_down.trigger('change');
                });
            }
        });


        function fetch_logins(){
            var selected_users = [];
            $('#user-drop-down option:selected').each(function(el, i){
                selected_users.push(parseInt($(this).attr("value")));
            });
            //console.log(selected_users);

            data = {
                interval_type : $('#interval-type option:selected').text(),
                date_from : $('#date-from').val(),
                date_to : $('#date-to').val(),
                duration_type: $('#duration-type option:selected').text(),
                interval : $('#duration').val(),
                gmt : new Date().getTimezoneOffset()/60
            }
            if(selected_users.length > 0)
                data['user_ids']= selected_users;
            if($('#grouped-by-user').prop('checked'))
                data['grouped']= 1;
            if ($('#unique-user').prop('checked'))
                data['unique_user'] =1;
            var a = 1;
            $("#grouped-logins,#ungrouped-logins,#prev-logins").hide();
            data = {input_data: JSON.stringify(data)};
            dn_json_rpc('/dn_auth/login_info',data,function(data){
                logins = data;
                show_login_info(data);
            });
        }

        function show_login_info(logins_array){
            logins = logins_array;
            if($('#grouped-by-user').prop('checked'))
                showGroupedLogins(logins_array);
            else
                showLinearLogins(logins_array);
        }


        function showGroupedLogins(logins_array)
        {
            var loginContent = '<h1>Login Records: '+logins_array.length+'</h1>';
            loginContent+='Click any of following record to select a user to view logs (below the following list view) for the selected user';
            loginContent +='<table>';
            loginContent += '<thead><tr><th>Name</th><th>Email</th><th>Last Login</th><th>Login History</th></tr><thead><tbody>';
            logins_array.forEach(function(login, i){
                 var parts = login.last_login.login_time.split(' ')
                 var dateValue = parts[0].split('-')
                  var mydate = new Date(dateValue[0], dateValue[1] - 1, dateValue[2]);
                  var dataValue = mydate.toDateString()
                  dataValue = dataValue.split(' ')
                  var final_date = dataValue[1] + ' '+dataValue[2]+ ',' + dataValue[3] +' ' + parts[1]
                loginContent += '<tr>';
                loginContent += '<td>' + login.name + '</td><td>' + login.email + '</td>';
                loginContent += '<td><div class="last_login">';
                loginContent += '<div><b>Login Time : </b>' + final_date + '</div>';
                loginContent += '<div><b>OS         : </b>' + login.last_login.platform + '</div>';
                loginContent += '<div><b>Browser    : </b>' + login.last_login.browser + '</div>';
                loginContent += '<div><b>IP         : </b>' + login.last_login.ip + '</div>';
                if(login.last_login.location)
                    loginContent += '<div><b>Location   : </b>' + login.last_login.location + '</div>';
                loginContent += '</div></td>';
                loginContent += '<td><button onclick="showPreviousLogins(this)" style="cursor: pointer;">'+login.prev_logins.length+' Records</button></td>';
                loginContent += '</tr>';
            });
            loginContent += "</tbody></table>"
            $("#grouped-logins").html(loginContent).show();
            var tr = $("#grouped-logins tbody tr:first");
            if(tr && tr.length> 0)
            {
                tr.click();
            }
        }

        function showPreviousLogins(el){
            var index = $(el).closest('tr').index();
            if($(el).hasClass('opened'))
            {
                return;
            }
            $('#grouped-logins td.opened:first').removeClass('opened');
            $(el).parent().addClass('opened');
            last_row_index = index;
            var login_object = logins[index];
            var logins_array = login_object.prev_logins;
            var loginContent = '<h1>Login history of '+login_object.name+': '+logins_array.length+'</h1>';
            loginContent += '<table><tr><th>Login Time</th><th>OS</th><th>Browser</th><th>IP</th><th>Location</th></tr>';
            logins_array.forEach(function(login, i){
                loginContent += '<tr>';
                loginContent += '<td>' + login.login_time + '</td>';
                loginContent += '<td>' + login.platform + '</td>';
                loginContent += '<td>' + login.browser + '</td>';
                loginContent += '<td>' + login.ip + '</td>';
                loginContent += '<td>' + login.location + '</td>';
            });
            loginContent += "</table>"
            //$('.youtubeVideoModal .modal-body').html(loginContent);
            //$('.youtubeVideoModal').modal('show');
            doc_preview.html_content(loginContent);
        }

        function showLinearLogins(logins_array){
            var loginContent = '<h1>Latest Logins: '+logins_array.length+'</h1><table>';
            loginContent += '<tr><th>Name</th><th>Email</th><th>Login Time</th><th>OS</th><th>Browser</th><th>IP</th><th>Location</th></tr>';
            logins_array.forEach(function(login, i){
                loginContent += '<tr>';
                loginContent += '<td>' + login.name + '</td>';
                loginContent += '<td>' + login.email + '</td>';
                loginContent += '<td>' + login.login_time + '</td>';
                loginContent += '<td>' + login.platform + '</td>';
                loginContent += '<td>' + login.browser + '</td>';
                loginContent += '<td>' + login.ip + '</td>';
                loginContent += '<td>' + login.location + '</td>';
            });
            loginContent += "</table>"
            $("#ungrouped-logins").html(loginContent).show();
        }

