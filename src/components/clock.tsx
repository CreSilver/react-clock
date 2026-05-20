'use client'
import { useState, useEffect } from 'react'





export function useTime(){
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {setTime(new Date())}, 1000)
        return () => clearInterval(timer)
    }, [])

    return time.toLocaleTimeString()
}

export function useClockStyle(){
    const total_styles = 6
    const [styleIndex, setStyleIndex] = useState<number>(() => {
        const saved = sessionStorage.getItem('clock_style')
        return saved ? parseInt(saved, 10) : 0
    })

    useEffect(() => {
        const key_handler = (e: KeyboardEvent) => {
            if (e.key === 'Spacebar' || e.code === 'Space') {
                e.preventDefault()
                setStyleIndex(prev => {
                    const index = (prev+1) % total_styles
                    sessionStorage.setItem('clock_style', index.toString())
                    return index
                })
            }
        }

        document.addEventListener('keydown', key_handler)
        return () => document.removeEventListener('keydown', key_handler)
    }, [])

    const current_class_name = `clock-style0${styleIndex}`
    return (current_class_name)
}




export function Clock() {
    return (useTime())
}





