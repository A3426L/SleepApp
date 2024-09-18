
from datetime import datetime as dt

def format_datetime_to_string(dt_obj):
    return dt_obj.strftime('%Y%m%d%H%M%S%f')


@app.route('/date')
def get_current_datetime():
    datetime = dt.now()
    strdatatime = format_datetime_to_string(datetime)
    return strdatatime




