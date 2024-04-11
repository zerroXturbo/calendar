import React, {useEffect} from 'react';
import './Time.css'

const Time = () => {
    const [date, setDate] = React.useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const showTime = date.getHours()
        + ':' + (date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes())
        + ":" + (date.getSeconds() <= 9 ? "0" + date.getSeconds() : date.getSeconds());

    return(
        <div>
            <h2 className="time">Current Time: {showTime.toString()}</h2>
        </div>
    )
}

export default Time;