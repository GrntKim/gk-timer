import { formatTime } from '../../../../lib/time/formatTime';
import { useEffect, useState } from 'react';
import './RecordsDisplay.css';

export default function RecordsDisplay({ solves, timerStatus, resetSolves, deleteSolve }) {
    const [openScramble, setOpenScramble] = useState(null);

    useEffect(() => {
        if (!openScramble) return;

        function handleKeyDown(e) {
            if (e.code === 'Escape') setOpenScramble(null);
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [openScramble]);

    return (
        <div className="record-table-wrap">
            <table className='solve-list'>
                <thead>
                    <tr>
                        <th colSpan={6}>
                            <button className="timer-reset-btn"
                                onClick={() => {
                                    if(solves.length !== 0 && confirm("Are you sure you want to delete all records?")) {
                                        resetSolves();
                                    }
                                }}
                                disabled={timerStatus !== 'idle'}>
                                Reset
                            </button>
                        </th>
                    </tr>
                    <tr>
                        <th>NO.</th>
                        <th>Time</th>
                        <th>Event</th>
                        <th>Penalty</th>
                        <th>Scramble</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {solves.map((solve, index) => {
                        const timeText = formatTime(solve.timeMs, solve.penalty);
                        return (
                            <tr key={solve.id}>
                                <td>{solves.length - index}. </td>
                                <td>
                                    {solve.penalty === 'DNF'
                                    ? (<s>{timeText}</s>)
                                    : (timeText)
                                    }
                                </td>
                                <td>{solve.eventId}</td>
                                <td>{solve.penalty === 'none' ? '' : solve.penalty}</td>
                                <td>
                                    <button className="show-btn" onClick={() => setOpenScramble(solve.scramble.scrambleText)}>Show</button>
                                </td>
                                <td>
                                    <button className="delete-btn" onClick={() => {
                                        if(confirm("Are you sure you want to delete this record?")) {
                                            deleteSolve(solve.id);
                                        }
                                    }}>
                                    Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {openScramble && (
                <div className="scramble-modal-backdrop" onClick={() => setOpenScramble(null)}>
                    <div className="scramble-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="scramble-modal-close" onClick={() => setOpenScramble(null)}>×</button>
                        <p className="scramble-modal-text">{openScramble}</p>
                    </div>
                </div>
            )}
        </div>
    );
}