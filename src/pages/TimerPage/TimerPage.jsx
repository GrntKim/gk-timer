import { useState } from 'react';
import { useScramble } from '../../hooks/useScramble';
import ScrambleDisplay from './components/ScrambleDisplay/ScrambleDisplay';
import Stopwatch from './components/Stopwatch/Stopwatch';
import './TimerPage.css';

export default function Timer() {
    const { scramble, isLoading, nextScramble } = useScramble('333');
    const [canRegenerate, setCanRegenrate] = useState(true);

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
                scramble={scramble}
                isLoading={isLoading}
                canRegenerate={canRegenerate}
                onRegenerate={nextScramble}
            />

            <Stopwatch 
                onStart={() => setCanRegenrate(false)}
                onStop={handleStop} 
                onReset={() => {
                    nextScramble();
                    setCanRegenrate(true)}
                }
            />
        </div>
    );
}
