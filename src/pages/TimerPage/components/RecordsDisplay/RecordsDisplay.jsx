import { formatTime } from '../../../../lib/time/formatTime';
import './RecordsDisplay.css';

export default function RecordsDisplay({ solve, num, onEdit, onDelete}) {
    const timeText = formatTime(solve.timeMs, solve.penalty);
    return (
        <tr className='solve-item'>
            <td>{num}. </td>
            <td>
                {solve.penalty === 'DNF' 
                ? (<s>{timeText}</s>) 
                : (timeText)
                }
            </td>
            <td>{solve.eventId}</td>
            <td>{solve.scramble.scrambleText}</td>
            <td>{solve.penalty === 'none' ? '' : solve.penalty}</td>
            <td><button onClick={onDelete}>Delete</button></td>
            <td><button onClick={onEdit}>Edit</button></td>
        </tr>
    );
}