import {Clock, useClockStyle} from './clock'
import {useAlarmState, useNotificationPermission, useAlarm, AlarmInput} from './alarm'





export function ClockPage(){
    const { alarmTime, handleInput } = useAlarmState()
    const { status, request } = useNotificationPermission()
    useAlarm(alarmTime)

    return (
        <>
            <div id="clock_time">
                <div className={useClockStyle()}>
                    <Clock/>
                </div>
            </div>
            <div id="clock_alarm">
                {status !== 'granted' && (<button onClick={request}>Povolit oznámení</button>)} &nbsp;
                <span>Set alarm:</span> &nbsp;
                <AlarmInput value={alarmTime} onChange={handleInput} />
            </div>
        </>
    )
}