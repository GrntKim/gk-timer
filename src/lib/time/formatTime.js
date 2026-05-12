export function formatTime(ms, penalty='none') {
    const totalCentiseconds = Math.floor(ms/10);
    const centiseconds = totalCentiseconds % 100;
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    let seconds = totalSeconds % 60;
    seconds = (penalty === '+2') ? seconds + 2 : seconds;
    const minutes = Math.floor(totalSeconds / 60);

    if (minutes > 0) {
        return `${penalty==='+2'?'+':''}${minutes}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
    }

    return `${penalty==='+2'?'+':''}${seconds}.${String(centiseconds).padStart(2, '0')}`;
}
