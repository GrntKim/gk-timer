import { useSolves } from '../../hooks/useSolves';
import { useState } from 'react';
import { useScramble } from '../../hooks/useScramble';
import ScrambleDisplay from './components/ScrambleDisplay/ScrambleDisplay';
import Stopwatch from './components/Stopwatch/Stopwatch';
import RecordsDisplay from './components/RecordsDisplay/RecordsDisplay';
import './TimerPage.css';

export default function TimerPage() {
    const { scramble, isLoading, nextScramble } = useScramble('333');
    const { solves, addSolve, resetSolves, editSolve, deleteSolve } = useSolves();
    // idle, holding, ready, running, stopped
    const [timerStatus, setTimerStatus] = useState('idle');
    const [penalty, setPenalty] = useState('none');

    function fetchSolve(timeMs, penalty) {
        if (!scramble) return;
        addSolve({
            eventId: scramble.eventName,
            timeMs,
            penalty,
            scramble,
        });
        nextScramble();
    }

    return (
        <div className='container'>
            <div className="timer-scramble">
                <ScrambleDisplay
                    timerStatus={timerStatus}
                    scramble={scramble}
                    isLoading={isLoading}
                    onRegenerate={nextScramble}
                />
                <Stopwatch
                    timerStatus={timerStatus}
                    setTimerStatus={setTimerStatus}
                    onReset={fetchSolve}
                    penalty={penalty}
                    setPenalty={setPenalty}
                />
            </div>
            <div className="record-container">
                <RecordsDisplay
                    solves={solves}
                    timerStatus={timerStatus}
                    resetSolves={resetSolves}
                    editSolve={editSolve}
                    deleteSolve={deleteSolve}
                />
            </div>
        </div>
    );
}
