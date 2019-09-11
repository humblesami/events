
var dt_js = {
    monthNames : [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    hours_to_hoursNminutes: function (hours) {
        var res = parseInt(hours);
        var minutes = hours % res;
        minutes = minutes * 60;
        minutes = Math.round(minutes);
        if(res < 10)
            res = "0" + res;
        if (minutes < 10)
            minutes = "0"+minutes;
        res = res +":"+ minutes;
        return res;
    },
    standeredTime: function(dt){
        if(!dt)
        {
            dt = new Date();
        }
    },
    getTimeString: function (dt)
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
    },
    getDateTimeString: function(dt) {
        if (!dt)
            dt = new Date();
        else if (typeof dt == 'string')
            dt = new Date(dt);
        var dat = this.getDateString(dt);
        var tam = this.getTimeString(dt);
        return dat + " " + tam;
    },
    meeting_time: function(dt){
        var obj_this = this;
        if(typeof(dt) == 'string')
        {
            dt = new Date(dt);
        }
        var res = {
            month: obj_this.monthNames[dt.getMonth()],
            date: dt.getDate(),
            year: dt.getFullYear(),
        } 
        return res;
    },
    date: function(dt){
        this.getDateString(dt);
    },
    now: function(){
        return this.getDateTimeString()
    },
    addInterval: function(interval_type, n, dt=Date()){  
        // console.log(typeof(dt), dt, 455);      
        if(typeof(dt) == 'string')
        {
            dt = new Date(dt);
        }
        switch(interval_type){
            case 'y':
                dt.setFullYear(dt.getFullYear() + n);
                break;
            case 'M':
                dt.setMonth(dt.getMonth() + n);
                break;
            case 'd':
                    dt.setDate(dt.getDate() + n);
                break;
            case 'h':
                    dt.setHours(dt.getHours() + n);
                    break;
            case 'm':
                    dt.setMinutes(dt.getMinutes() + n);
                    break;
            case 's':
                    dt.setSeconds(dt.getSeconds() + n);
                break;
            case 'ms':
                    dt.setMilliseconds(dt.getMilliseconds() + n);
                break;        
        }
        return dt;
        // console.log(dt), 133;
    },
    timeAgo: function(value){
        if (value) {
            var seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29 && seconds > -1)
                return 'Just now';

            const intervals = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hour': 3600,
                'minute': 60,
                'second': 1
            };
            let counter;
            var is_minus = false;
            if(seconds < 0)
            {
                is_minus =true;
                seconds *= -1;
            }
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                {
                    if (counter === 1) {
                        if(is_minus)
                        {
                            return 'in '+counter +' '+i;
                        }
                        else
                        return counter + ' ' + i + ' ago'; // singular (1 day ago)
                    } else {
                        if(is_minus)
                        {
                            return 'in '+counter +' '+i+'s';
                        }
                        else
                        return counter + ' ' + i + 's ago'; // plural (2 days ago)
                    }
                }
            }
        }
        return value;
    }
}
window['dt_functions'] = dt_js;