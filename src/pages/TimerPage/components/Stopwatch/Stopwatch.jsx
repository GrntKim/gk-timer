import { useEffect, useRef, useState } from 'react';
import './Stopwatch.css';

export default function Stopwatch({ onStart, onStop, onReset }) {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedMs, setElapsedMs] = useState(0);
    const [canRun, setCanRun] = useState(true);
    // idle, ready, running, stopped
    const [timerStatus, setTimerStatus] = useState('idle');

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
        if (!canRun) return;
        setCanRun(false);
        startTimeRef.current = performance.now() - elapsedMs;
        setIsRunning(true);
        onStart();
    }

    function stop() {
        const finalTimeMs = performance.now() - startTimeRef.current;

        setElapsedMs(finalTimeMs);
        setIsRunning(false);
        onStop(finalTimeMs);
    }

    function reset() {
        setElapsedMs(0);
        startTimeRef.current = null;
        setCanRun(true);
        onReset();
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
                setTimerStatus('idle');
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
    }, [timerStatus])

    useEffect(() => {
        if (!isRunning) return;

        function tick(now) {
            setElapsedMs(now - startTimeRef.current);
            frameRef.current = requestAnimationFrame(tick);
        }

        frameRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frameRef.current);
        }
    }, [isRunning]);

    return (
        <div className='stopwatch-container'>
            <div className={timerStatus === 'ready' 
                            ? 'time-display ready'
                            : 'time-display'}
            >
                {formatTime(elapsedMs)}
            </div>
            <button 
                className='reset-button' 
                onClick={reset} 
                hidden={isRunning || canRun}>
                Reset
            </button>
        </div>
    );
}