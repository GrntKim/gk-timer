import './ScrambleDisplay.css';


export default function ScrambleDisplay({ scramble, isLoading, onRegenerate }) {
    if (isLoading || !scramble) {
        return <div className='scramble-container'>Generating scramble..</div>
    }

    return (
        <div className='scramble-container'>
            [{scramble.event}] : {scramble.sequence}
            <button 
                className='regen-button'
                type="button"
                onClick={() => onRegenerate()}
                disabled={isLoading}
            >
                Next Scramble
            </button>
        </div>
    )
}
