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
            <div className="timer">
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
            </div>
            <div className="records">
                <button className="timer-reset-btn"
                        onClick={() => {
                            if(solves.length !== 0 && confirm("Are you sure you want to delete all records?")) {
                                resetSolves();
                            }
                        }}>Reset</button>
                <table className='solve-list'>
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>Time</th>
                            <th>Event</th>
                            <th>Scramble</th>
                            <th>Penalty</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solves.map((solve, index) => (
                            <RecordsDisplay 
                                num={solves.length - index} 
                                key={solve.id} 
                                solve={solve} 
                                onEdit={() => editSolve(solve.id)}
                                onDelete={() => {
                                    if(confirm("Are you sure you want to delete this record?")) {
                                        deleteSolve(solve.id)
                                    }
                                }}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
