import { formatTime } from '../../../../lib/time/formatTime';
import { getCurrentAverage, getBestAverage, getBestSingle } from '../../../../lib/solves/calculateStats';
import './StatsSummary.css';

function formatStat(result) {
    if (result === undefined) return '-';
    if (result === null) return 'DNF';
    return formatTime(result);
}

export default function StatsSummary({ solves }) {
    const stats = [
        { label: 'Ao5', value: getCurrentAverage(solves, 5) },
        { label: 'Ao12', value: getCurrentAverage(solves, 12) },
        { label: 'Best', value: getBestSingle(solves) },
        { label: 'Best Ao5', value: getBestAverage(solves, 5) },
        { label: 'Best Ao12', value: getBestAverage(solves, 12) },
    ];

    return (
        <div className="stats-container">
            <table className="stats-list">
                <tbody>
                    {stats.map(({ label, value }) => (
                        <tr key={label}>
                            <th>{label}</th>
                            <td>{formatStat(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
