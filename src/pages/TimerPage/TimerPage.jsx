import { useScramble } from '../../hooks/useScramble';
import ScrambleDisplay from './components/ScrambleDisplay/ScrambleDisplay';
import './TimerPage.css';

export default function Timer() {
    const { scramble, isLoading, nextScramble } = useScramble('333');

    return (
        <div className="cube-timer">
            <ScrambleDisplay
                scramble={scramble}
                isLoading={isLoading}
                onNextScramble={nextScramble}
            />
        </div>
    );
}
