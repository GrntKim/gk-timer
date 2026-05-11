import { useState } from 'react';
import { useScramble } from '../../hooks/useScramble';
import ScrambleDisplay from './components/ScrambleDisplay/ScrambleDisplay';
import Stopwatch from './components/Stopwatch/Stopwatch';
import './TimerPage.css';

export default function Timer() {
    const { scramble, isLoading, nextScramble } = useScramble('333');
    // idle, ready, running, stopped
    const [timerStatus, setTimerStatus] = useState('idle');
    const [penalty, setPenalty] = useState('none');

    function handleStop(finalTimeMs, penalty, timeText) {
        if (!scramble) return;
        console.log({
            timeMs: finalTimeMs,
            scramble,
            penalty: penalty,
            timeText: timeText,
        });
        nextScramble();
    }

    return (
        <div className="cube-timer">
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
        </div>
    );
}
