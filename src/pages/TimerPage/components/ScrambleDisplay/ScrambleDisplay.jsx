import './ScrambleDisplay.css';

export default function ScrambleDisplay({ scramble, isLoading }) {
    if (isLoading || !scramble) {
        return <div>Generating scramble..</div>
    }

    return (
        <div>
            {scramble.sequence}
        </div>
    )
}