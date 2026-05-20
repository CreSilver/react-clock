import {useEffect, useState} from "react";
import {useSound} from "react-sounds";
import {useTime} from './clock'




export function useNotificationPermission() {
    const [status, setStatus] = useState<NotificationPermission>(
        typeof Notification !== 'undefined' ? Notification.permission : 'default'
    )

    const request = () => {
        const win = (window as any);

        if (typeof win !== 'undefined' && win.Notification) {
            win.Notification.requestPermission()["then"](function(permission: any) {
                setStatus(permission);
            });
        }
    };

    return { status, request }
}

export function useAlarm(target_time: string){
    const current_time = useTime()
    const { play } = useSound("notification/info")

    useEffect(() => {
        if(current_time == target_time){
            void play()
            sendNotification("alarm!", `Its ${current_time}`)
        }
    }, [current_time, target_time])
}

export function useAlarmBool(activate: boolean){
    const { play } = useSound("notification/info")

    useEffect(() => {
        if(activate){
            void play()
            sendNotification("alarm!", `Timer ticking`)
        }
    }, [activate])
}

export function useAlarmState() {
    const [alarmTime, setAlarmTime] = useState("")

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlarmTime(e.target.value)
    }

    return { alarmTime, handleInput }
}





export function sendNotification(title: string, body: string) {
    const win = (window as any);
    if (typeof win !== 'undefined' && win.Notification && win.Notification.permission === 'granted') {
        new win.Notification(title, {
            body: body,
            icon: '/favicon.ico'
        });
    }
}





export function AlarmInput({ value, onChange }: { value: string, onChange: (e: any) => void }) {
    return (
        <input
            type="time"
            step="1"
            value={value}
            onChange={onChange}
            className="alarm-input"
        />
    )
}



