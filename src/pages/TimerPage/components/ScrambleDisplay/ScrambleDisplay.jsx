import './ScrambleDisplay.css';

export default function ScrambleDisplay({ canRegenerate, scramble, isLoading, onRegenerate }) {
    if (isLoading || !scramble) {
        return <div className='scramble-container'>Generating scramble..</div>
    }

    return (
        <div className='scramble-container'>
            [{scramble.eventName}] : {scramble.scrambleText}
            <button 
                className='regen-button'
                type="button"
                onClick={() => onRegenerate()}
                disabled={isLoading || !canRegenerate}
            >
                Next Scramble
            </button>
        </div>
    )
}
