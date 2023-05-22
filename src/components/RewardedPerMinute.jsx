import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';




export default function RewarderPerMinute({ claimingDate, tokenAmount, apr, interval, tokenPrice }) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [responseTime, setResponseTime] = useState(0);
    const actualTime = useSelector(state => state.time);
    const dispatch = useDispatch();

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

    const calculateTimeLeft = () => {
        let aprPerSecond = apr/365/ 24 / 60 / 60 /100;
        let TimePased = moment.duration(moment(responseTime*1000).diff(moment(claimingDate*1000)));
        let amountRewarded = (TimePased.asSeconds() * aprPerSecond) * tokenAmount;
        return amountRewarded*tokenPrice;
    }

    const timerCallback = useCallback(() => {
        setTimeLeft(calculateTimeLeft());
        handleTimer();
    }, [claimingDate, responseTime]);

    useEffect(() => {
        let t = setInterval(timerCallback, interval);
        return () => clearInterval(t);

    }, [claimingDate, interval, timerCallback]);

    return (
        <>
   
                <div className='btn-select block-button'>{timeLeft.toFixed(8)}</div>


        </>
    )
}
