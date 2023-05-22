import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimer } from '../redux/timerapi/timerAction';


export default function Timer({ eventTime, interval }) {
    const [time, setTime] = useState(eventTime);
    const [responseTime, setResponseTime] = useState(0);
    const actualTime = useSelector(state => state.time);
    const dispatch = useDispatch();



    useEffect(() => {
        if(!actualTime.success) {
            dispatch(fetchTimer());
     
        }
    }, [actualTime.success, dispatch]);

    useEffect(() => {
        if (actualTime.success) {
            setResponseTime(actualTime.timestamp);
        }
    }, [actualTime.success]);

    const handleTimer = () => {
        if (actualTime.success) {
            setResponseTime(responseTime + 1);
        }
    }



    const [timeLeft, setTimeLeft] = useState('00:00:00');
    const [difTime, setDifTime] = useState(0);





    const calculateTimeLeft = () => {
        let diff_time = moment.duration(moment(responseTime * 1000).diff(moment(time * 1000)));
        setDifTime(diff_time);
        let month = diff_time.months().toString().length === 1 ? '0' + diff_time.months().toString() : diff_time.months().toString().replace('-', '');
        let days = diff_time.days().toString().replace('-', '');
        let diff_hours = diff_time.hours().toString().replace('-', '') > 9 ? diff_time.hours().toString().replace('-', '') : `0${diff_time.hours().toString().replace('-', '')}`;
        let diff_minutes = diff_time.minutes().toString().replace('-', '') > 9 ? diff_time.minutes().toString().replace('-', '') : `0${diff_time.minutes().toString().replace('-', '')}`;
        let diff_seconds = diff_time.seconds().toString().replace('-', '') > 9 ? diff_time.seconds().toString().replace('-', '') : `0${diff_time.seconds().toString().replace('-', '')}`;
        if (month > 0) {
            return `${month}m ${days}d ${diff_hours}h ${diff_minutes} ${diff_seconds}`;
        }
        if (days > 0) {
            return `${days}d ${diff_hours}h ${diff_minutes} ${diff_seconds}`;
        }
        else {
            return `${diff_hours} ${diff_minutes} ${diff_seconds}`;
        }
    }

    const timerCallback = useCallback(() => {
        setTimeLeft(calculateTimeLeft());
        setTime(eventTime)
        handleTimer();
    }, [eventTime, responseTime]);

    useEffect(() => {
        let t = setInterval(timerCallback, interval);
        return () => clearInterval(t);

    }, [eventTime, interval, timerCallback]);

    return (
        <>
            {difTime > 0 ?
                <div className='btn-select'>00:00:00</div>
                :
                <div className='btn-select block-button'>{timeLeft}</div>

            }
        </>
    )
}
