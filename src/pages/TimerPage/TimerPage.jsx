import { useSolves } from '../../hooks/useSolves';
import { useState } from 'react';
import { useScramble } from '../../hooks/useScramble';
import ScrambleDisplay from './components/ScrambleDisplay/ScrambleDisplay';
import Stopwatch from './components/Stopwatch/Stopwatch';
import './TimerPage.css';
import RecordsDisplay from './components/RecordsDisplay/RecordsDisplay';

export default function Timer() {
    const { scramble, isLoading, nextScramble } = useScramble('333');
    const { solves, addSolve, resetSolves, editSolve, deleteSolve } = useSolves();
    // idle, ready, running, stopped
    const [timerStatus, setTimerStatus] = useState('idle');
    const [penalty, setPenalty] = useState('none');

    function handleStop(timeMs, penalty) {
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
            <ScrambleDisplay
                timerStatus={timerStatus}
                scramble={scramble}
                isLoading={isLoading}
                onRegenerate={nextScramble}
            />
            <Stopwatch
                timerStatus={timerStatus}
                setTimerStatus={setTimerStatus}
                onReset={handleStop}
                penalty={penalty}
                setPenalty={setPenalty}
            />
            <RecordsDisplay 
                solves={solves}
                timerStatus={timerStatus}
                resetSolves={resetSolves}
                editSolve={editSolve}
                deleteSolve={deleteSolve}
            />
        </div>
    );
}
