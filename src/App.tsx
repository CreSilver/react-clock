import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Pager} from './components/navbar';
import {ClockPage} from './components/clockPage';
import {StopwatchPage} from "./components/stopwatchPage";
import {TimerPage} from "./components/timerPage";



function App() {
    return (
        <BrowserRouter>
            <header>
                <Pager />
            </header>
            <section id="clock">
                <Routes>
                    <Route path="/" element={<ClockPage />} />
                    <Route path="/stopwatch" element={<StopwatchPage />} />
                    <Route path="/timer" element={<TimerPage />} />
                </Routes>
            </section>
        </BrowserRouter>
    )
}



export default App
