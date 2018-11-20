import pytz
from pytz import timezone
from datetime import datetime
from dateutil import parser, relativedelta
relativedelta = relativedelta.relativedelta

def now():
    res = datetime.now()
    return res

def nowStr():
    res = datetime.now()
    res = dtTostr(res)
    return res

def nowtostr():
    res = datetime.now()
    res = dtTostr(res)
    return res

def strTodt(time_string):
    res = parser.parse(time_string)
    return res

def convert_time_zone(tz, val):
    if not val:
        return '0000:00:00 00:00:00'
    is_str = type(val) is str
    if is_str:
        val = strTodt(val)
    local_tz = timezone(tz).localize(val)
    seconds = local_tz.tzinfo._utcoffset.seconds
    val = addInterval(val, 's', seconds)
    if is_str:
        val = val.strftime('%Y-%m-%d %H:%M:%S')
    return val

def today():
    res = datetime.today().date()
    return res

def strdateTostrtime(str_date_time):
    dt = parser.parse(str_date_time)
    res = dt.strftime('%H:%M:%S')
    return res

def dtTostrtime(dt):
    res = dt.strftime('%H:%M:%S')
    return res

def embedTime(dt, time_str):
    res = dt.strftime('%Y-%m-%d') + ' '+time_str
    res = parser.parse(res)
    return res

def change_format(time_string, sting_format=None):
    if not sting_format:
        sting_format = '%Y-%m-%d %H:%M:%S'
    dt = parser.parse(time_string)
    res = dt.strftime(sting_format)
    return res

def dtTostr(dt, sting_format=None):
    if not sting_format:
        sting_format = '%Y-%m-%d %H:%M:%S'
    res = dt.strftime(sting_format)
    return res

def dayOfweek(dt):
    if type(dt) is not datetime:
        dt = strTodt(dt)
    dow = dt.strftime("%A")
    return dow

def hours_to_time(dt, h):
    res = dt.strftime('%Y-%m-%d') + ' '+str(h)+':00'
    res = parser.parse(res)
    return res

def dtTodatestr(dt, sting_format=None):
    if not sting_format:
        sting_format = '%Y-%m-%d'
    res = dt.strftime(sting_format)
    return res

def strdtTostrdate(time_string):
    dt = parser.parse(time_string)
    sting_format = '%Y-%m-%d'
    res = dt.strftime(sting_format)
    return res


def addInterval(dt, interval_type, amt):
    if type(dt) is not datetime:
        dt = strTodt(dt)
    if interval_type == 'y':
        res = dt + relativedelta(years=amt)
    if interval_type == 'm':
        res = dt + relativedelta(months=amt)
    if interval_type == 'd':
        res = dt + relativedelta(days=amt)
    if interval_type == 'h':
        res = dt + relativedelta(hours=amt)
    if interval_type == 'min':
        res = dt + relativedelta(minutes=amt)
    if interval_type == 's':
        res = dt + relativedelta(seconds=amt)
    if interval_type == 'ms':
        res = dt + relativedelta(milliseconds=amt)
    return res


def downumber(today_day):
    mydict = {
            '0': 'Monday',
            '1': 'Tuesday',
            '2': 'Wednesday',
            '3': 'Thursday',
            '4': 'Friday',
            '5': 'Saturday',
            '6': 'Sunday'}
    dayAlternateValue = list(mydict.keys())[list(mydict.values()).index(today_day)]
    return dayAlternateValue

def decimal2time(decimalTime):
    clockTime = '00:00'
    try:
        hrs = int(decimalTime);
        min = round((decimalTime - hrs) * 60);
        hrs = addZeroToUnder10(hrs);
        min = addZeroToUnder10(int(min));
        clockTime = str(hrs) + ':' + str(min);
    except:
        a = 1
    return clockTime;

def addZeroToUnder10(d):
    if d < 10:
        d = "0" + str(d);
    return d

def timespan(later_dt, old_dt):
    diff = False
    try:
        if type(later_dt) is not datetime:
            later_dt = strTodt(later_dt)
    except:
        a = 1
    try:
        if type(old_dt) is not datetime:
            old_dt = strTodt(old_dt)
    except:
        a = 1
    try:
        diff = later_dt - old_dt
    except:
        a = 1
    return diff

def timespan_minutes(later_dt, old_dt):
    diff = timespan(later_dt, old_dt)
    seconds = diff.seconds
    minutes = float(seconds)/60
    return minutes

def hours_to_hoursNminutes(hours):
    try:
        hours = float(hours)
    except:
        a = 1
        return ''
    if not hours:
        return ''
    res = int(hours)
    if res > 0:
        minutes = hours % res
        minutes = minutes * 60
    else:
        minutes = hours * 60
    minutes = round(minutes)
    if res < 10:
        res = str(res)
        res = "0"+res
    else:
        res = str(res)
    if minutes < 10:
        minutes = str(minutes)
        minutes = "0"+minutes
    else:
        minutes = str(minutes)
    res = res +":"+ minutes
    return res