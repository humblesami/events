(function(){
$('head').prepend('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">');
$('body').append(`

<div style="display:none"><app-root></app-root><app-comments></app-comments><app-messenger></app-messenger><app-chat></app-chat></div>

`)
})()