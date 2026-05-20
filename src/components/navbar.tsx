'use client'
import { Link } from "react-router-dom";




export function Pager(){
    return(
        <>
            <nav>
                <button><Link to="/" >&nbsp;&nbsp;&nbsp;&nbsp;CLOCK</Link></button>
                <button><Link to="/stopwatch" >STOPWATCH</Link></button>
                <button><Link to="/timer" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TIMER</Link></button>
            </nav>
        </>
    )
}