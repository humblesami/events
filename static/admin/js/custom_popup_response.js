/*global opener */
(function() {
console.log(77777)
var path = window.location.pathname.split('/')
var length = path.length
var model = path[3]
var action = path[length-2]
var id = path[4]
var data = {"model":model,"action":action,"id":id}
window.parent.postMessage(data, '*');

})();
