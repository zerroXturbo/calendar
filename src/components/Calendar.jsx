import { useState } from 'react';
import React from 'react';
import CalendarReact from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = props => {
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <CalendarReact onClickDay={props.changeDay} onChange={onChange} value={value} />
        </div>);
}

export default Calendar;