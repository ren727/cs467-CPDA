from datetime import datetime
from pytz import timezone

def get_pacific_time():
    pst_timezone = timezone('US/Pacific') 
    return datetime.now(pst_timezone)
