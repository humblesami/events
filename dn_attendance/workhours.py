from odoo.addons.dn_base import dn_dt

def work_minutes_in_span(schedule_on_day, checkIn, checkOut):
    expectedCheckInTime = schedule_on_day['check_in']
    expectedCheckOutTime = schedule_on_day['check_out']

    expectedBreakStart = schedule_on_day['break_start']
    expectedBreakEnd = schedule_on_day['break_end']
    if checkIn == False or checkOut == False:
        return 0
    elif checkIn< expectedCheckInTime and checkOut <= expectedCheckInTime:
       return 0

    elif checkIn >=expectedCheckInTime and checkOut <= expectedBreakStart:
       work_minutes = dn_dt.timespan_minutes(checkOut,checkIn)
       return work_minutes


    elif checkIn >=expectedCheckInTime and checkOut > expectedBreakStart and checkOut <=expectedBreakEnd:
       work_minutes = dn_dt.timespan_minutes(expectedBreakStart,checkIn)
       return work_minutes


    elif checkIn >=expectedCheckInTime and checkIn >=expectedBreakEnd and checkOut <=expectedCheckOutTime and checkOut>=expectedBreakEnd:
       work_minutes = dn_dt.timespan_minutes(checkOut,checkIn)
       return work_minutes

    elif checkIn>=expectedCheckOutTime and checkOut >expectedCheckOutTime:
        return 0


    elif checkIn >= expectedBreakStart and checkIn <=expectedBreakEnd and checkOut > expectedBreakEnd and checkOut <= expectedCheckOutTime:
        work_minutes = dn_dt.timespan_minutes(checkOut, expectedBreakEnd)
        return work_minutes

    elif checkIn >= expectedBreakStart and checkIn <= expectedBreakEnd and checkOut > expectedBreakEnd and checkOut >= expectedCheckOutTime:
        work_minutes = dn_dt.timespan_minutes(expectedCheckOutTime, expectedBreakEnd)
        return work_minutes


    elif checkIn >= expectedBreakStart and checkIn >=expectedBreakEnd and checkOut > expectedBreakEnd and checkOut > expectedCheckOutTime:
        work_minutes = dn_dt.timespan_minutes(expectedCheckOutTime, checkIn)
        return work_minutes
    elif checkIn >= expectedCheckInTime and checkOut <= expectedCheckOutTime and checkOut >=  expectedBreakEnd and checkIn <expectedBreakStart:
        virtualTime =dn_dt.timespan_minutes(checkOut, checkIn)
        breakTime =dn_dt.timespan_minutes(expectedBreakEnd, expectedBreakStart)
        work_minutes = virtualTime - breakTime
        return work_minutes

    elif checkIn <= expectedCheckInTime and checkOut >= expectedCheckOutTime :
        virtualTime = dn_dt.timespan_minutes(expectedCheckOutTime, expectedCheckInTime)
        breakTime = dn_dt.timespan_minutes(expectedBreakEnd, expectedBreakStart)
        work_minutes = virtualTime - breakTime
        return work_minutes

    elif checkIn <= expectedCheckInTime and checkOut >= expectedBreakEnd and checkOut <= expectedCheckOutTime :
        virtualTime = dn_dt.timespan_minutes(checkOut, expectedCheckInTime)
        breakTime = dn_dt.timespan_minutes(expectedBreakEnd, expectedBreakStart)
        work_minutes = virtualTime - breakTime
        return work_minutes


    elif checkIn > expectedBreakEnd and  checkOut > expectedCheckOutTime :
        virtualTime = dn_dt.timespan_minutes(checkOut, checkIn)
        work_minutes = virtualTime
        return work_minutes

    elif checkIn <= expectedCheckInTime and  checkOut <= expectedBreakStart and checkOut <= expectedBreakEnd :
        virtualTime = dn_dt.timespan_minutes(checkOut, expectedCheckInTime)
        work_minutes = virtualTime
        return work_minutes
    elif checkIn >= expectedCheckInTime and checkOut >= expectedCheckOutTime :
        virtualTime = dn_dt.timespan_minutes(expectedCheckOutTime, checkIn)
        breakTime = dn_dt.timespan_minutes(expectedBreakEnd, expectedBreakStart)
        work_minutes = virtualTime - breakTime
        return work_minutes

    else:
        return 0

def on_date_schedule(schedule, work_date):
    schedule_on_day = {}
    schedule_on_day['check_in'] = work_date + ' ' + dn_dt.decimal2time((schedule.hour_from-5)) + ':00'
    if(schedule.break_start>5):
        schedule_on_day['break_start'] = work_date + ' ' + dn_dt.decimal2time((schedule.break_start-5)) + ':00'
    else:
        schedule_on_day['break_start'] = work_date + ' ' + dn_dt.decimal2time(schedule.break_start) + ':00'
    if(schedule.break_end>5):
        schedule_on_day['break_end'] = work_date + ' ' + dn_dt.decimal2time((schedule.break_end-5)) + ':00'
    else:
        schedule_on_day['break_end'] = work_date + ' ' + dn_dt.decimal2time(schedule.break_end) + ':00'
    schedule_on_day['check_out'] = work_date + ' ' + dn_dt.decimal2time((schedule.hour_to-5)) + ':00'
    return schedule_on_day

def calc_work_hours(obj, finalSchedule):
    work_date = obj['work_date']
    time_records = obj['time_records']
    schedule_on_day = on_date_schedule(finalSchedule, work_date)
    day_work_minutes = dn_dt.timespan_minutes(schedule_on_day['check_out'], schedule_on_day['check_in'])
    break_work_minutes = dn_dt.timespan_minutes(schedule_on_day['break_end'], schedule_on_day['break_start'])
    required_work_minutes = day_work_minutes - break_work_minutes

    validated_work_minutes = 0
    for tr in time_records:
        workhour = work_minutes_in_span(schedule_on_day, tr['check_in'], tr['check_out'])
        validated_work_minutes = validated_work_minutes + workhour
    late_minutes = required_work_minutes - validated_work_minutes
    validated_work_hours = float(validated_work_minutes)/60
    return validated_work_hours, late_minutes