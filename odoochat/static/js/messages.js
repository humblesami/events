(function(){
$('head').prepend('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">');
$('head').prepend('<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"/>')
$('body').append(`

<div style="display:none"><app-root></app-root><app-comments></app-comments><app-messenger></app-messenger><app-chat></app-chat></div>

`)
})()