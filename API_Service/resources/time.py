from datetime import datetime
from pytz import timezone


def get_pacific_time():
    pac_timezone = timezone('US/Pacific') 
    time = datetime.now(pac_timezone)
    return time
