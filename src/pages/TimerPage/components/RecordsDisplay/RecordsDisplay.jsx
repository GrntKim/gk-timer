import { formatTime } from '../../../../lib/time/formatTime';
import './RecordsDisplay.css';

export default function RecordsDisplay({ solves, timerStatus, resetSolves, editSolve, deleteSolve }) {
    return (
        <div className="record-container">
            <table className='solve-list'>
                <thead>
                    <tr>
                        <th colSpan={7}>
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
                        <th>Scramble</th>
                        <th>Penalty</th>
                        <th>Delete</th>
                        <th>Edit</th>
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
                                <td>{solve.scramble.scrambleText}</td>
                                <td>{solve.penalty === 'none' ? '' : solve.penalty}</td>
                                <td>
                                    <button onClick={() => {
                                        if(confirm("Are you sure you want to delete this record?")) {
                                            deleteSolve(solve.id);
                                        }
                                    }}>
                                    Delete
                                    </button>
                                </td>
                                <td><button onClick={() => editSolve(solve.id)}>Edit</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}