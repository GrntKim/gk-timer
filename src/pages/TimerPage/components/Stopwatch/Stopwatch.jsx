import { useEffect, useRef, useState } from 'react';
import './Stopwatch.css';

export default function Stopwatch({ timerStatus, setTimerStatus, onReset, penalty, setPenalty}) {
    const [elapsedMs, setElapsedMs] = useState(0);

    const startTimeRef = useRef(null);
    const frameRef = useRef(null);

    function formatTime(ms) {
        const totalCentiseconds = Math.floor(ms/10);
        const centiseconds = totalCentiseconds % 100;
        const totalSeconds = Math.floor(totalCentiseconds / 100);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60);

        if (minutes > 0) {
            return `${minutes}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
        }

        return `${seconds}.${String(centiseconds).padStart(2, '0')}`;
    }

    function start() {
        startTimeRef.current = performance.now() - elapsedMs;
    }

    function stop() {
        const finalTimeMs = performance.now() - startTimeRef.current;

        setElapsedMs(finalTimeMs);
    }

    function reset() {
        onReset(elapsedMs, penalty, getDisplayTime());
        setPenalty('none');
        setElapsedMs(0);
        startTimeRef.current = null;
        setTimerStatus('idle');
    }

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.code !== 'Space' || e.repeat) return;
            e.preventDefault();

            if (timerStatus === 'idle') {
                setTimerStatus('ready');
                return;
            }

            if (timerStatus === 'running') {
                stop();
                setTimerStatus('stopped');
                return;
            }

            if (timerStatus === 'stopped') {
                reset();
                return;
            }
        }

        function handleKeyUp(e) {
            if (e.code !== 'Space') return;
            e.preventDefault();

            if (timerStatus === 'ready') {
                start();
                setTimerStatus('running');
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [timerStatus, elapsedMs, penalty])

    useEffect(() => {
        if (timerStatus !== 'running') return;

        function tick(now) {
            setElapsedMs(now - startTimeRef.current);
            frameRef.current = requestAnimationFrame(tick);
        }

        frameRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frameRef.current);
        }
    }, [timerStatus, elapsedMs, penalty]);

    function getDisplayTime() {
        if (penalty === 'DNF') {
            return 'DNF';
        }

        if (penalty === '+2') {
            return `+${formatTime(elapsedMs + 2000)}`;
        }
        
        return formatTime(elapsedMs);
    }

    return (
        <div className='stopwatch-container'>
            <div className={timerStatus === 'ready' 
                            ? 'time-display ready'
                            : timerStatus === 'running'
                            ? 'time-display running'
                            : 'time-display'}
            >
                {getDisplayTime()}
            </div>
            <div className="btn-container">
                <button
                    className='reset-button'
                    onClick={reset}
                    hidden={timerStatus !== 'stopped'}>
                    Continue
                </button>
                <button
                    className='plus-two-button'
                    onClick={() => {
                        if (penalty === 'none') setPenalty('+2');
                        else if (penalty === '+2') setPenalty('none');
                    }}
                    disabled={penalty === 'DNF'}
                    hidden={timerStatus !== 'stopped'}>
                    +2
                </button>
                <button
                    className='dnf-button'
                    onClick={() => {
                        if (penalty === 'none') setPenalty('DNF');
                        else if (penalty === 'DNF') setPenalty('none');
                    }}
                    disabled={penalty === '+2'}
                    hidden={timerStatus !== 'stopped'}>
                    DNF
                </button>
            </div>
        </div>
    );
}