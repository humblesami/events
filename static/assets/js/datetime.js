function getDateString(dt)
{
    if (!dt)
        dt = new Date();
    else if (typeof dt == 'string')
        dt = new Date(dt);

    var m = dt.getMonth() + 1;
    var y = dt.getFullYear();
    var d = dt.getDate();
    if (m < 10)
        m = "0" + m;
    if (d < 10)
        d = "0" + d;
    return y + "-" + m + "-" + d;
}
function getTimeString(dt)
{
    if (!dt)
        dt = new Date();
    else if (typeof dt == 'string')
        dt = new Date(dt);

    var mm = dt.getMinutes();
    var h = dt.getHours();
    var s = dt.getSeconds();
    if (h < 10)
        h = "0" + h;
    if (mm < 10)
        mm = "0" + mm;
    if (s < 10)
        s = "0" + s;
    return h + ":" + mm + ":" + s;
}
function getDateTimeString(dt) {
    if (!dt)
        dt = new Date();
    else if (typeof dt == 'string')
        dt = new Date(dt);
    var dat = getDateString(dt);
    var tam = getTimeString(dt);
    return dat + " " + tam;
}
function hours_to_hoursNminutes(hours) {
    var res = parseInt(hours);
    var minutes = hours % res;
    minutes = minutes * 60;
    minutes = Math.round(minutes);
    if(res < 10)
        res = "0"+res;
    if (minutes < 10)
        minutes = "0"+minutes;
    res = res +":"+ minutes;
    return res;
}
function standeredTime(time) {
    return moment(time).format('MMM DD YYYY, h:mm:ss A');
}
window['dt_functions'] = {
    standeredTime: standeredTime,
}