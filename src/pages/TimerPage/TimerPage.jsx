import { useSolves } from '../../hooks/useSolves';
import { useEffect, useState } from 'react';
import { useScramble } from '../../hooks/useScramble';
import ScrambleDisplay from './components/ScrambleDisplay/ScrambleDisplay';
import Stopwatch from './components/Stopwatch/Stopwatch';
import './TimerPage.css';

export default function Timer() {
    const { scramble, isLoading, nextScramble } = useScramble('333');
    const { solves, addSolve } = useSolves();
    // idle, ready, running, stopped
    const [timerStatus, setTimerStatus] = useState('idle');
    const [penalty, setPenalty] = useState('none');

    function handleStop(timeMs, penalty) {
        if (!scramble) return;
        const solve = addSolve({
            eventId: scramble.eventName,
            timeMs,
            penalty,
            scramble,
        });
        nextScramble();
        console.log(solve);
    }

    useEffect(() => {
        console.log(solves);
    }, [solves])

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
