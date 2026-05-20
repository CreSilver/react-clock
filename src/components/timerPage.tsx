import {useEffect, useState} from "react";
import {useAlarmState, useAlarmBool} from './alarm'
import {useClockStyle} from './clock'




function timerControl(seconds: number, minutes: number, hours: number) {
    seconds -= 1

    if (seconds < 0) {
        seconds = 59;
        minutes -= 1;
    }
    if (minutes < 0) {
        minutes = 59;
        hours -= 1;
    }
    if (hours < 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
    }

    const numToString = function(num: number) {
        return (num < 10 ? "0" : "") + num
    }

    return(
        numToString(hours) + ":" + numToString(minutes) + ":" + numToString(seconds)
    )
}

function TimerInput({ value, onChange }: { value: string, onChange: (e: any) => void }) {
    return (
        <input
            type="time"
            step="1"
            value={value}
            onChange={onChange}
            className="timer-input"
        />
    )
}




export function TimerPage(){
    const [time, set_time] = useState("00:00:00")
    const [is_running, set_is_running] = useState(false)
    const [timer_has_changet, set_timer_has_changet] = useState<boolean>(false)
    let { alarmTime, handleInput } = useAlarmState()

    useEffect(() => {
        if(alarmTime == "") alarmTime = "00:00:00"
        if(alarmTime != "00:00:00") set_timer_has_changet(true)
        set_time(alarmTime)
    }, [alarmTime])


    useEffect(() => {
        const timer = setInterval(() => {
            let time_parts = time.split(":")
            let seconds = parseInt(time_parts[2], 10)
            let minutes = parseInt(time_parts[1], 10)
            let hours = parseInt(time_parts[0], 10)

            set_time(timerControl(seconds, minutes, hours))
            if(time == "00:00:00" && timer_has_changet) set_is_running(true)
            else set_is_running(false)

        }, 1000)
        return () => clearInterval(timer)
    }, [time])

    useAlarmBool(is_running)

    return(
        <>
            <div id="clock_time">
                <div className={useClockStyle()}>
                    {time}
                </div>
            </div>
            <div id="clock_alarm">
                <br/><span> <TimerInput value={alarmTime} onChange={handleInput} /> </span>
            </div>
        </>
    )
}