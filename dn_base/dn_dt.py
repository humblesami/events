from datetime import datetime
from dateutil import parser, relativedelta
relativedelta = relativedelta.relativedelta

def now():
    res = datetime.now()
    return res

def today():
    res = datetime.today().date()
    return res

def strTodt(time_string):
    res = parser.parse(time_string)
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
        res = dt + relativedelta(secods=amt)
    if interval_type == 'ms':
        res = dt + relativedelta(milliseconds=amt)
    return res