import { useState } from 'react';
import { useScramble } from '../../hooks/useScramble';
import ScrambleDisplay from './components/ScrambleDisplay/ScrambleDisplay';
import Stopwatch from './components/Stopwatch/Stopwatch';
import './TimerPage.css';

export default function Timer() {
    const { scramble, isLoading, nextScramble } = useScramble('333');
    const [canRegenerate, setCanRegenrate] = useState(true);
    // idle, ready, running, stopped
    const [timerStatus, setTimerStatus] = useState('idle');

    function handleStop(finalTimeMs) {
        if (!scramble) return;
        console.log({
            timeMs: finalTimeMs,
            scramble,
        });
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
                onStart={() => setCanRegenrate(false)}
                onStop={handleStop} 
                onReset={nextScramble}
            />
        </div>
    );
}
