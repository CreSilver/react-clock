import { useState, useEffect } from 'react'
import {useClockStyle} from './clock'



function stopwatchControl(miliseconds : number, seconds: number, minutes: number, hours: number,)  {
    miliseconds += 10

    if (miliseconds >= 1000) {
        miliseconds = 0
        seconds += 1
    }
    if (seconds >= 60) {
        seconds = 0
        minutes += 1
    }
    if (minutes >= 60) {
        minutes = 0
        hours += 1
    }


    const numToString = function(num: number, isMs: boolean) {
        let text:string
        if(!isMs) text = (num < 10 ? "0" : "") + num
        else{
            if(num < 10) text = "00" + num
            else if(num < 100) text = "0" + num
            else text = "" + num
        }

        return text
    }

    return(
        numToString(hours, false) + ":" + numToString(minutes, false) + ":" + numToString(seconds, false) + "." + numToString(miliseconds, true)
    )
}




export function StopwatchPage(){
    const [time, set_time] = useState("00:00:00.000")
    const [is_running, set_is_running] = useState<boolean>(false)
    const [saved_times, set_saved_times] = useState<string[]>([])


    useEffect(() => {
        if (!is_running) return

        const timer = setInterval(() => {
            set_time((prevTime) => {
                let time_parts = prevTime.split(/[:.]/)
                let hours       = parseInt(time_parts[0], 10)
                let minutes     = parseInt(time_parts[1], 10)
                let seconds     = parseInt(time_parts[2], 10)
                let miliseconds = parseInt(time_parts[3], 10)

                return stopwatchControl(miliseconds, seconds, minutes, hours)
            })
        }, 10)
        return () => clearInterval(timer)
    }, [is_running])


    const handleStartPause = () => set_is_running(!is_running)
    const handleReset = () => {
        set_is_running(false)
        set_time("00:00:00:000")
        set_saved_times([])
    }
    const handleSaveTime = () => {
        set_saved_times(prev => [time, ...prev].slice(0, 3))
    }


    return(
        <>
            <div id="clock_time">
                <div className={useClockStyle()}>
                    {time}
                </div>
            </div>
            <div id="stopwatch_buttons">
                <button onClick={handleStartPause}>
                    {is_running ? "Pozastavit" : "Spustit"}
                </button>
                <button onClick={handleSaveTime} disabled={time === "00:00:00.000" || time === "00:00:00:000"}>
                    Uložit čas
                </button>
                <button onClick={handleReset}>
                    Restart
                </button>
            </div>
            <div id="stopwatch_laps">
                <h3>Poslední 3 hodnoty:</h3>
                <ul>
                    {saved_times.map((lap, index) => (
                        <li key={index}>{lap}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}