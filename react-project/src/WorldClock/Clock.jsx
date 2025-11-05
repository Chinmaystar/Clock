import React, {useState, useEffect} from "react"

function Clock(props){
    const[time, setTime] = useState(new Date());
    
    let tz_hours = Math.floor(props.timezone/100) - 5;
    let tz_mins = props.timezone%100 - 30;

    useEffect(() => {
        const intervalId= setInterval(()=>{
            setTime(new Date());
        }, 1000)
        console.log(time);
        return () =>{
            clearInterval(intervalId);
        }
    }, [])

    function formatTime(){
        const utc = time.getTime() + time.getTimezoneOffset() * 60000;

        const offsetHours = Math.floor(props.timezone / 100);
        const offsetMinutes = props.timezone % 100;
        const totalOffset = (offsetHours * 60 + offsetMinutes) * 60000;

        const localTime = new Date(utc + totalOffset);

        let hours = localTime.getHours();
        let minutes = localTime.getMinutes();
        let seconds = localTime.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        return `${props.country}(${props.zoneName}): ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }

    function padZero(number){
        return (number<10? "0": "")+number
    }

    return(
        <div className="clock-container">
            <div className="clock">
                <span>{formatTime()}</span>
            </div>
        </div>
    )
}

export default Clock