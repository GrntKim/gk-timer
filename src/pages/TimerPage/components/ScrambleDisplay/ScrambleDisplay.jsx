import './ScrambleDisplay.css';

export default function ScrambleDisplay({ timerStatus, scramble, isLoading, onRegenerate }) {
    return (
        <div className='scramble-container'>
            <p className='scramble-text'>
                {isLoading || !scramble
                 ? 'Generating scramble..'
                 : timerStatus === 'stopped'
                 ? 'Press Spacebar to reset'
                 : scramble.scrambleText}
            </p>
            <button 
                className='regen-button'
                type="button"
                onClick={() => onRegenerate()}
                disabled={isLoading || timerStatus !== 'idle'}
            >
                Next Scramble
            </button>
        </div>
    )
}
